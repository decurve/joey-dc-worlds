"use client";

import { useRef, useMemo, useState, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

/* ─── Deterministic random ─── */
function sr(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

/* ─── Create gear profile shape ─── */
function createGearShape(innerRadius: number, outerRadius: number, teeth: number) {
  const shape = new THREE.Shape();
  const toothDepth = (outerRadius - innerRadius) * 0.5;
  const bodyRadius = outerRadius - toothDepth;
  const tipRadius = outerRadius;
  const anglePerTooth = (Math.PI * 2) / teeth;
  const toothWidth = anglePerTooth * 0.4; // tooth takes 40% of the slot

  // Start at first tooth base
  shape.moveTo(Math.cos(0) * bodyRadius, Math.sin(0) * bodyRadius);

  for (let i = 0; i < teeth; i++) {
    const baseAngle = i * anglePerTooth;

    // Rise to tooth tip
    const riseStart = baseAngle + anglePerTooth * 0.05;
    const tipStart = baseAngle + anglePerTooth * 0.15;
    const tipEnd = baseAngle + anglePerTooth * 0.15 + toothWidth;
    const fallEnd = baseAngle + anglePerTooth * 0.55;
    const nextBase = baseAngle + anglePerTooth;

    shape.lineTo(Math.cos(riseStart) * bodyRadius, Math.sin(riseStart) * bodyRadius);
    shape.lineTo(Math.cos(tipStart) * tipRadius, Math.sin(tipStart) * tipRadius);
    shape.lineTo(Math.cos(tipEnd) * tipRadius, Math.sin(tipEnd) * tipRadius);
    shape.lineTo(Math.cos(fallEnd) * bodyRadius, Math.sin(fallEnd) * bodyRadius);
    shape.lineTo(Math.cos(nextBase) * bodyRadius, Math.sin(nextBase) * bodyRadius);
  }

  shape.closePath();

  // Hub hole
  const holePath = new THREE.Path();
  const hubRadius = innerRadius;
  holePath.moveTo(Math.cos(0) * hubRadius, Math.sin(0) * hubRadius);
  for (let i = 1; i <= 32; i++) {
    const a = (i / 32) * Math.PI * 2;
    holePath.lineTo(Math.cos(a) * hubRadius, Math.sin(a) * hubRadius);
  }
  shape.holes.push(holePath);

  // Spoke cutouts for larger gears
  if (outerRadius > 0.8 && teeth > 8) {
    const spokeCount = Math.min(6, Math.max(3, Math.floor(teeth / 3)));
    const cutoutInner = innerRadius * 1.4;
    const cutoutOuter = bodyRadius * 0.75;
    const cutoutWidth = (Math.PI * 2) / spokeCount * 0.35;

    for (let s = 0; s < spokeCount; s++) {
      const ca = (s / spokeCount) * Math.PI * 2;
      const hole = new THREE.Path();
      const steps = 12;

      // Inner arc
      for (let j = 0; j <= steps; j++) {
        const t = j / steps;
        const a = ca - cutoutWidth + t * cutoutWidth * 2;
        const r = cutoutInner;
        if (j === 0) hole.moveTo(Math.cos(a) * r, Math.sin(a) * r);
        else hole.lineTo(Math.cos(a) * r, Math.sin(a) * r);
      }
      // Outer arc (reverse)
      for (let j = steps; j >= 0; j--) {
        const t = j / steps;
        const a = ca - cutoutWidth + t * cutoutWidth * 2;
        const r = cutoutOuter;
        hole.lineTo(Math.cos(a) * r, Math.sin(a) * r);
      }

      shape.holes.push(hole);
    }
  }

  return shape;
}

/* ─── Gear data type ─── */
type GearData = {
  x: number;
  y: number;
  z: number;
  radius: number;
  teeth: number;
  thickness: number;
  speed: number;
  dir: number;
  layer: number;
  seed: number;
};

/* ─── Generate gear layout ─── */
function generateGears(): { gears: GearData[]; axles: { a: number; b: number }[] } {
  const gears: GearData[] = [];

  // Three depth layers — fewer gears for breathing room
  const layers = [
    { z: -2.5, count: 6, rMin: 0.5, rMax: 2.4, layer: 0 },
    { z: 0, count: 7, rMin: 0.4, rMax: 2.0, layer: 1 },
    { z: 2.0, count: 5, rMin: 0.3, rMax: 1.4, layer: 2 },
  ];

  let idx = 0;
  for (const cfg of layers) {
    const sizes: number[] = [];
    for (let i = 0; i < cfg.count; i++) {
      sizes.push(cfg.rMin + sr(idx * 17 + i * 31) * (cfg.rMax - cfg.rMin));
    }
    sizes.sort((a, b) => b - a);

    for (let i = 0; i < cfg.count; i++) {
      const radius = sizes[i];
      let bestX = 0, bestY = 0, placed = false;

      for (let attempt = 0; attempt < 60; attempt++) {
        const tx = (sr(idx * 13 + attempt * 7 + i * 53) - 0.5) * 7;
        const ty = (sr(idx * 19 + attempt * 11 + i * 67) - 0.5) * 5;
        let ok = true;

        for (const g of gears) {
          if (g.layer !== cfg.layer) continue;
          const dx = tx - g.x, dy = ty - g.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minGap = (radius + g.radius) * 1.05;
          if (dist < minGap * 0.55) { ok = false; break; }
        }
        if (ok) { bestX = tx; bestY = ty; placed = true; break; }
      }
      if (!placed) {
        bestX = (sr(idx * 41 + i * 73) - 0.5) * 7;
        bestY = (sr(idx * 43 + i * 79) - 0.5) * 5;
      }

      const teeth = Math.max(8, Math.round(radius * 8 + (sr(idx + i * 97) - 0.5) * 4));
      const thickness = 0.15 + radius * 0.15 + sr(idx + i * 113) * 0.1;

      gears.push({
        x: bestX,
        y: bestY,
        z: cfg.z + (sr(idx + i * 37) - 0.5) * 0.8,
        radius,
        teeth,
        thickness,
        speed: (1 / Math.max(0.3, radius)) * (0.3 + sr(idx + i * 59) * 0.4),
        dir: 1,
        layer: cfg.layer,
        seed: idx + i * 137,
      });
      idx++;
    }
  }

  // Assign meshing directions via BFS
  const neighbours: number[][] = gears.map(() => []);
  for (let i = 0; i < gears.length; i++) {
    for (let j = i + 1; j < gears.length; j++) {
      const a = gears[i], b = gears[j];
      const dx = a.x - b.x, dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const meshDist = (a.radius + b.radius) * 1.15;
      if (dist < meshDist && dist > Math.abs(a.radius - b.radius) * 0.3) {
        neighbours[i].push(j);
        neighbours[j].push(i);
      }
    }
  }

  const visited = new Uint8Array(gears.length);
  for (let start = 0; start < gears.length; start++) {
    if (visited[start]) continue;
    visited[start] = 1;
    gears[start].dir = 1;
    const queue = [start];
    while (queue.length > 0) {
      const ci = queue.shift()!;
      for (const ni of neighbours[ci]) {
        if (!visited[ni]) {
          visited[ni] = 1;
          gears[ni].dir = -gears[ci].dir;
          queue.push(ni);
        }
      }
    }
  }

  // Axle connections between nearby meshing gears
  const axles: { a: number; b: number }[] = [];
  const usedAxles = new Set<string>();
  for (let i = 0; i < gears.length; i++) {
    for (const ni of neighbours[i]) {
      if (ni <= i) continue;
      const key = `${i}-${ni}`;
      if (usedAxles.has(key)) continue;
      const a = gears[i], b = gears[ni];
      const dx = a.x - b.x, dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > 1.5 && sr(i * 7 + ni * 13) > 0.6 && axles.length < 10) {
        axles.push({ a: i, b: ni });
        usedAxles.add(key);
      }
    }
  }

  return { gears, axles };
}

/* ─── Single Gear mesh component ─── */
function Gear({
  data,
  mouseRef,
}: {
  data: GearData;
  mouseRef: React.MutableRefObject<{ x: number; y: number; active: boolean }>;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  const { geometry, material } = useMemo(() => {
    const shape = createGearShape(
      data.radius * 0.2,
      data.radius,
      data.teeth
    );

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: data.thickness,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 1,
    };

    const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    // Center the extrusion
    geo.translate(0, 0, -data.thickness / 2);

    // Material varies by layer
    const brightness = data.layer === 0 ? 0.06 : data.layer === 1 ? 0.1 : 0.14;
    const metalness = data.layer === 0 ? 0.7 : data.layer === 1 ? 0.8 : 0.85;
    const roughness = data.layer === 0 ? 0.45 : data.layer === 1 ? 0.35 : 0.25;

    // Fade out gears near the edges — center gears are fully visible
    const distFromCenter = Math.sqrt(data.x * data.x + data.y * data.y);
    const fadeStart = 2.0;
    const fadeEnd = 5.0;
    const edgeFade = Math.max(0.15, 1 - Math.max(0, (distFromCenter - fadeStart) / (fadeEnd - fadeStart)));
    const baseOpacity = data.layer === 0 ? 0.6 : 1;
    const finalOpacity = baseOpacity * edgeFade;

    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(brightness, brightness, brightness * 1.05),
      metalness,
      roughness,
      transparent: true,
      opacity: finalOpacity,
    });

    return { geometry: geo, material: mat };
  }, [data]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    // Mouse proximity speed boost
    let speedMult = 1;
    if (mouseRef.current.active) {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const dx = data.x - mx * 4;
      const dy = data.y - my * 3;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 3) {
        speedMult = 1 + (1 - dist / 3) * 3;
      }
    }

    // Layer speed modifier
    const layerMult = data.layer === 0 ? 0.6 : data.layer === 1 ? 0.85 : 1;

    meshRef.current.rotation.z += data.speed * data.dir * delta * speedMult * layerMult;
  });

  return (
    <mesh
      ref={meshRef}
      position={[data.x, data.y, data.z]}
      geometry={geometry}
      material={material}
    />
  );
}

/* ─── Hub (axle center dot) for each gear ─── */
function GearHubs({ gears }: { gears: GearData[] }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const tempObj = useMemo(() => new THREE.Object3D(), []);
  const tempColor = useMemo(() => new THREE.Color(), []);

  const geo = useMemo(() => new THREE.CylinderGeometry(1, 1, 1, 16), []);

  useMemo(() => {
    // Set initial transforms — hubs don't animate
    setTimeout(() => {
      const mesh = ref.current;
      if (!mesh) return;
      for (let i = 0; i < gears.length; i++) {
        const g = gears[i];
        const hubR = g.radius * 0.08;
        tempObj.position.set(g.x, g.y, g.z);
        tempObj.rotation.set(Math.PI / 2, 0, 0);
        tempObj.scale.set(hubR, g.thickness * 1.2, hubR);
        tempObj.updateMatrix();
        mesh.setMatrixAt(i, tempObj.matrix);

        const b = g.layer === 0 ? 0.04 : g.layer === 1 ? 0.07 : 0.1;
        tempColor.setRGB(b, b, b);
        mesh.setColorAt(i, tempColor);
      }
      mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    }, 0);
  }, [gears, tempObj, tempColor]);

  return (
    <instancedMesh ref={ref} args={[geo, undefined, gears.length]}>
      <meshStandardMaterial vertexColors metalness={0.9} roughness={0.2} />
    </instancedMesh>
  );
}

/* ─── Axle rods connecting gears ─── */
function Axles({ axles, gears }: { axles: { a: number; b: number }[]; gears: GearData[] }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const tempObj = useMemo(() => new THREE.Object3D(), []);

  const geo = useMemo(() => new THREE.CylinderGeometry(0.03, 0.03, 1, 6), []);

  useMemo(() => {
    setTimeout(() => {
      const mesh = ref.current;
      if (!mesh) return;
      for (let i = 0; i < axles.length; i++) {
        const a = gears[axles[i].a];
        const b = gears[axles[i].b];
        const mx = (a.x + b.x) / 2;
        const my = (a.y + b.y) / 2;
        const mz = (a.z + b.z) / 2;
        const dx = b.x - a.x, dy = b.y - a.y, dz = b.z - a.z;
        const len = Math.sqrt(dx * dx + dy * dy + dz * dz);

        tempObj.position.set(mx, my, mz);
        const dir = new THREE.Vector3(dx / len, dy / len, dz / len);
        tempObj.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
        tempObj.scale.set(1, len, 1);
        tempObj.updateMatrix();
        mesh.setMatrixAt(i, tempObj.matrix);
      }
      mesh.instanceMatrix.needsUpdate = true;
    }, 0);
  }, [axles, gears, tempObj]);

  return (
    <instancedMesh ref={ref} args={[geo, undefined, Math.max(1, axles.length)]}>
      <meshStandardMaterial color="#1a1a1a" metalness={0.85} roughness={0.3} />
    </instancedMesh>
  );
}

/* ─── Background plane with radial gradient: dark center → cream edges ─── */
function BackgroundPlane() {
  const meshRef = useRef<THREE.Mesh>(null);

  const { geometry, material } = useMemo(() => {
    // Large plane that sits behind everything
    const geo = new THREE.PlaneGeometry(16, 12, 64, 64);

    // Create a radial gradient via vertex colors
    const posAttr = geo.getAttribute("position");
    const count = posAttr.count;
    const colors = new Float32Array(count * 3);

    // Dark center color (metallic dark)
    const darkR = 0.04, darkG = 0.04, darkB = 0.05;
    // Cream edge color (#f9f9f8)
    const creamR = 0.976, creamG = 0.976, creamB = 0.973;

    for (let i = 0; i < count; i++) {
      const x = posAttr.getX(i);
      const y = posAttr.getY(i);
      // Normalize distance from center (0 = center, 1 = edge)
      const dist = Math.sqrt((x / 8) * (x / 8) + (y / 6) * (y / 6));
      // Smooth falloff — dark in center, cream at edges
      const t = Math.min(1, Math.pow(dist, 1.5));

      colors[i * 3] = darkR + (creamR - darkR) * t;
      colors[i * 3 + 1] = darkG + (creamG - darkG) * t;
      colors[i * 3 + 2] = darkB + (creamB - darkB) * t;
    }

    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.MeshBasicMaterial({
      vertexColors: true,
    });

    return { geometry: geo, material: mat };
  }, []);

  return (
    <mesh
      ref={meshRef}
      position={[0, 0, -4]}
      geometry={geometry}
      material={material}
    />
  );
}

/* ─── Mouse tracker inside R3F ─── */
function MouseTracker({
  mouseRef,
  onHover,
}: {
  mouseRef: React.MutableRefObject<{ x: number; y: number; active: boolean }>;
  onHover: (active: boolean) => void;
}) {
  const { gl } = useThree();

  useMemo(() => {
    const el = gl.domElement;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      // Normalize to -1..1
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      mouseRef.current.active = true;
    };
    const handleLeave = () => {
      mouseRef.current.active = false;
      onHover(false);
    };
    const handleEnter = () => {
      onHover(true);
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    el.addEventListener("mouseenter", handleEnter);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
      el.removeEventListener("mouseenter", handleEnter);
    };
  }, [gl, mouseRef, onHover]);

  return null;
}

/* ─── Scene contents ─── */
function MachineInternals() {
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const handleHover = useCallback(() => {}, []);

  const { gears, axles } = useMemo(() => generateGears(), []);

  return (
    <>
      <MouseTracker mouseRef={mouseRef} onHover={handleHover} />

      {/* Background plane — dark metallic center fading to cream edges */}
      <BackgroundPlane />

      {/* Lighting */}
      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 8, 4]} intensity={0.8} color="#fff5e6" />
      <directionalLight position={[-3, -2, -5]} intensity={0.3} color="#e6eeff" />
      <pointLight position={[0, 0, 5]} intensity={0.2} color="#ffffff" />

      {/* Gears */}
      <group>
        {gears.map((g, i) => (
          <Gear key={i} data={g} mouseRef={mouseRef} />
        ))}
      </group>

      {/* Hub dots */}
      <GearHubs gears={gears} />

      {/* Axle connections */}
      <Axles axles={axles} gears={gears} />

      {/* Post-processing */}
      <EffectComposer>
        <Bloom
          intensity={0.2}
          luminanceThreshold={0.25}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
}

/* ─── Export ─── */
export default function MachineScene({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <MachineInternals />
      </Canvas>
    </div>
  );
}
