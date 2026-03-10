"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";

/* ─── Gear definitions ─── */
const gears = [
  { cx: 0, cz: 0, y: 0, radius: 12, teeth: 16, speed: 0.3, dir: 1 },
  { cx: 18, cz: 5, y: 1, radius: 8, teeth: 12, speed: -0.45, dir: -1 },
  { cx: -15, cz: -3, y: -1, radius: 10, teeth: 14, speed: 0.36, dir: -1 },
  { cx: 8, cz: -14, y: 0.5, radius: 6, teeth: 10, speed: 0.6, dir: 1 },
  { cx: -8, cz: 12, y: -0.5, radius: 9, teeth: 12, speed: -0.4, dir: 1 },
  { cx: 22, cz: -10, y: 1.5, radius: 5, teeth: 8, speed: 0.72, dir: -1 },
  { cx: -20, cz: 8, y: -1, radius: 7, teeth: 10, speed: -0.51, dir: 1 },
];

/* ─── Particle roles ─── */
const ROLE_RING = 0;
const ROLE_TOOTH = 1;
const ROLE_HUB = 2;
const ROLE_AMBIENT = 3;

type ParticleAssignment = {
  gearIdx: number;
  role: number;
  angle: number;
  radialOffset: number;
  toothExtent: number;
  hubDist: number;
  hubAngle: number;
  driftX: number;
  driftY: number;
  driftZ: number;
  driftSpeed: number;
  yOffset: number;
};

/* ─── Mouse tracker (projects pointer into 3D) ─── */
function MouseTracker({ mouseRef }: { mouseRef: React.MutableRefObject<THREE.Vector3> }) {
  const { camera, size } = useThree();
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const pointer = useMemo(() => new THREE.Vector2(), []);
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), []);
  const intersection = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ pointer: p }) => {
    pointer.set(p.x, p.y);
    raycaster.setFromCamera(pointer, camera);
    raycaster.ray.intersectPlane(plane, intersection);
    if (intersection) {
      mouseRef.current.copy(intersection);
    }
  });

  return null;
}

function GearSystem() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 20000;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const target = useMemo(() => new THREE.Vector3(), []);
  const pColor = useMemo(() => new THREE.Color(), []);
  const mouseRef = useRef(new THREE.Vector3(9999, 9999, 9999));
  const hueRef = useRef(0);

  const positions = useMemo(
    () =>
      Array.from({ length: count }, () =>
        new THREE.Vector3(
          (Math.random() - 0.5) * 80,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 80
        )
      ),
    []
  );

  const material = useMemo(() => new THREE.MeshBasicMaterial({ color: 0xffffff }), []);
  const geometry = useMemo(() => new THREE.TetrahedronGeometry(0.2), []);

  /* ─── Pre-compute particle assignments ─── */
  const assignments = useMemo(() => {
    const arr: ParticleAssignment[] = [];
    const ringCount = Math.floor(count * 0.65);
    const teethCount = Math.floor(count * 0.22);
    const hubCount = Math.floor(count * 0.11);
    const ambientCount = count - ringCount - teethCount - hubCount; // ~2%
    const totalCirc = gears.reduce((s, g) => s + g.radius, 0);

    let seed = 42;
    function rand() {
      seed = (seed * 16807 + 0) % 2147483647;
      return (seed - 1) / 2147483646;
    }

    for (let i = 0; i < ringCount; i++) {
      const r = rand();
      let cumul = 0;
      let gi = 0;
      for (let g = 0; g < gears.length; g++) {
        cumul += gears[g].radius / totalCirc;
        if (r < cumul) { gi = g; break; }
      }
      arr.push({
        gearIdx: gi, role: ROLE_RING,
        angle: rand() * Math.PI * 2,
        radialOffset: (rand() - 0.5) * 1.0,
        toothExtent: 0, hubDist: 0, hubAngle: 0,
        driftX: 0, driftY: 0, driftZ: 0, driftSpeed: 0,
        yOffset: (rand() - 0.5) * 0.6,
      });
    }

    for (let i = 0; i < teethCount; i++) {
      const r = rand();
      let cumul = 0;
      let gi = 0;
      for (let g = 0; g < gears.length; g++) {
        cumul += gears[g].radius / totalCirc;
        if (r < cumul) { gi = g; break; }
      }
      const gear = gears[gi];
      const toothIdx = Math.floor(rand() * gear.teeth);
      const toothAngle = (toothIdx / gear.teeth) * Math.PI * 2;
      arr.push({
        gearIdx: gi, role: ROLE_TOOTH,
        angle: toothAngle + (rand() - 0.5) * (0.3 / gear.teeth * Math.PI * 2),
        radialOffset: 0,
        toothExtent: 1.0 + rand() * 1.5,
        hubDist: 0, hubAngle: 0,
        driftX: 0, driftY: 0, driftZ: 0, driftSpeed: 0,
        yOffset: (rand() - 0.5) * 0.4,
      });
    }

    for (let i = 0; i < hubCount; i++) {
      const gi = Math.floor(rand() * gears.length);
      const gear = gears[gi];
      const isSpoke = rand() > 0.4;
      const spokeCount = 5;
      const spokeAngle = (Math.floor(rand() * spokeCount) / spokeCount) * Math.PI * 2;
      arr.push({
        gearIdx: gi, role: ROLE_HUB,
        angle: 0, radialOffset: 0, toothExtent: 0,
        hubDist: isSpoke ? 1.5 + rand() * (gear.radius - 2) : rand() * 1.5,
        hubAngle: isSpoke ? spokeAngle + (rand() - 0.5) * 0.1 : rand() * Math.PI * 2,
        driftX: 0, driftY: 0, driftZ: 0, driftSpeed: 0,
        yOffset: (rand() - 0.5) * 0.3,
      });
    }

    for (let i = 0; i < ambientCount; i++) {
      arr.push({
        gearIdx: -1, role: ROLE_AMBIENT,
        angle: 0, radialOffset: 0, toothExtent: 0,
        hubDist: 0, hubAngle: 0,
        driftX: (rand() - 0.5) * 60,
        driftY: (rand() - 0.5) * 8,
        driftZ: (rand() - 0.5) * 60,
        driftSpeed: 0.2 + rand() * 0.5,
        yOffset: 0,
      });
    }

    return arr;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime() * 0.8;

    // Read rainbow hue from CSS variable (set by RainbowProvider)
    const rawHue = document.documentElement.style.getPropertyValue("--rainbow-hue");
    if (rawHue) hueRef.current = parseFloat(rawHue) / 360; // normalize to 0-1

    const hue = hueRef.current;
    const mx = mouseRef.current.x;
    const mz = mouseRef.current.z;

    for (let i = 0; i < count; i++) {
      const a = assignments[i];

      if (a.role === ROLE_AMBIENT) {
        const shimmer = 0.5 + Math.sin(time * 2 + i) * 0.5;
        // Ambient particles: dark with subtle shimmer
        pColor.setHSL(hue, 0.3, 0.03 + shimmer * 0.02);
        target.set(
          a.driftX + Math.sin(time * a.driftSpeed + i * 0.1) * 3,
          a.driftY + Math.cos(time * a.driftSpeed * 0.7 + i * 0.2) * 1,
          a.driftZ + Math.sin(time * a.driftSpeed * 0.5 + i * 0.3) * 3
        );
      } else {
        const gear = gears[a.gearIdx];
        const rot = time * gear.speed * gear.dir;

        if (a.role === ROLE_RING) {
          const ang = a.angle + rot;
          const r = gear.radius + a.radialOffset;
          target.set(
            gear.cx + Math.cos(ang) * r,
            gear.y + a.yOffset,
            gear.cz + Math.sin(ang) * r
          );
          // Ring: low saturation, dark
          pColor.setHSL(hue, 0.3, 0.06);
        } else if (a.role === ROLE_TOOTH) {
          const ang = a.angle + rot;
          const r = gear.radius + a.toothExtent;
          target.set(
            gear.cx + Math.cos(ang) * r,
            gear.y + a.yOffset,
            gear.cz + Math.sin(ang) * r
          );
          // Teeth: moderate saturation, dark
          pColor.setHSL(hue, 0.4, 0.10);
        } else if (a.role === ROLE_HUB) {
          const ang = a.hubAngle + rot;
          target.set(
            gear.cx + Math.cos(ang) * a.hubDist,
            gear.y + a.yOffset,
            gear.cz + Math.sin(ang) * a.hubDist
          );
          // Hub: moderate saturation, dark
          pColor.setHSL(hue, 0.4, 0.12);
        }
      }

      // Mouse reactivity: push particles away + darken near cursor
      const dx = target.x - mx;
      const dz = target.z - mz;
      const distSq = dx * dx + dz * dz;
      const mouseRadius = 64; // radius² for effect
      if (distSq < mouseRadius && distSq > 0.01) {
        const dist = Math.sqrt(distSq);
        const force = (1 - dist / 8) * 3; // push strength
        target.x += (dx / dist) * force;
        target.z += (dz / dist) * force;
        const darkBoost = (1 - dist / 8) * 0.05;
        pColor.r = Math.max(0, pColor.r - darkBoost);
        pColor.g = Math.max(0, pColor.g - darkBoost);
        pColor.b = Math.max(0, pColor.b - darkBoost);
      }

      positions[i].lerp(target, 0.1);
      dummy.position.copy(positions[i]);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
      meshRef.current.setColorAt(i, pColor);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor)
      meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <>
      <MouseTracker mouseRef={mouseRef} />
      <instancedMesh ref={meshRef} args={[geometry, material, count]} />
    </>
  );
}

/* ─── Floating 3D labels ─── */
const labelStyle: React.CSSProperties = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: 9,
  fontWeight: 600,
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  color: "rgba(0,0,0,0.6)",
  border: "1px solid rgba(0,0,0,0.2)",
  background: "rgba(249,249,248,0.7)",
  backdropFilter: "blur(4px)",
  padding: "3px 8px",
  whiteSpace: "nowrap",
  pointerEvents: "none",
};

const dotStyle: React.CSSProperties = {
  width: 5,
  height: 5,
  borderRadius: "50%",
  background: "rgba(0,0,0,0.4)",
  flexShrink: 0,
};

const lineStyle: React.CSSProperties = {
  width: 32,
  height: 1,
  background: "rgba(0,0,0,0.2)",
  flexShrink: 0,
};

function GearLabel({ position, text, side = "right" }: { position: [number, number, number]; text: string; side?: "left" | "right" }) {
  const isLeft = side === "left";
  return (
    <Html position={position} center={false} style={{ pointerEvents: "none" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 4, flexDirection: isLeft ? "row-reverse" : "row", transform: isLeft ? "translateX(-100%)" : undefined }}>
        <div style={dotStyle} />
        <div style={lineStyle} />
        <div style={labelStyle}>{text}</div>
      </div>
    </Html>
  );
}

function GearLabels() {
  // All 7 gears labeled. Side chosen to keep labels inside the staircase container.
  // Gears on the right side get labels pointing left, and vice versa.
  return (
    <>
      <GearLabel position={[0, 2, 0]} text="GROWTH SYSTEM" />
      <GearLabel position={[18, 3, 5]} text="ACQUISITION" side="left" />
      <GearLabel position={[-15, 2, -3]} text="RETENTION" />
      <GearLabel position={[8, 2, -14]} text="CATALYST" side="left" />
      <GearLabel position={[-8, 2, 12]} text="FLYWHEEL" />
      <GearLabel position={[22, 3, -10]} text="STORY SYSTEM" side="left" />
      <GearLabel position={[-20, 2, 8]} text="CONTENT ENGINE" />
    </>
  );
}

export default function GearParticleSceneLight({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  return (
    <Canvas
      camera={{ position: [0, 40, 35], fov: 50 }}
      gl={{ alpha: true }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <GearSystem />
      <GearLabels />
      <OrbitControls
        autoRotate
        autoRotateSpeed={0.3}
        enableZoom={false}
        enablePan={false}
      />
    </Canvas>
  );
}
