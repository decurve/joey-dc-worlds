"use client";

import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import { OrbitControls, Effects } from "@react-three/drei";
import { UnrealBloomPass } from "three-stdlib";

extend({ UnrealBloomPass });
import * as THREE from "three";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

/* ─── Constants ─── */
const COUNT = 15000;
const PHASE_DUR = 6.0;
const MORPH_DUR = 2.0;
const TOTAL_PHASES = 6;

const PHASES = [
  { title: "STORY SYSTEM", desc: "Your brand narrative" },
  { title: "GROWTH ENGINE", desc: "Systematic growth mechanics" },
  { title: "FLYWHEEL", desc: "Compounding momentum" },
  { title: "ACQUISITION FUNNEL", desc: "Top-of-funnel strategy" },
  { title: "RETENTION LOOP", desc: "Keeping customers forever" },
  { title: "GROWTH CATALYST", desc: "Accelerating breakthroughs" },
];

/* ─── Deterministic hash for per-particle randomness ─── */
function hash(i: number): number {
  let x = i * 2654435761;
  x = ((x >> 16) ^ x) * 0x45d9f3b;
  x = ((x >> 16) ^ x) * 0x45d9f3b;
  x = (x >> 16) ^ x;
  return (x & 0xffff) / 0xffff;
}

/* ─── Sample points on a mesh surface ─── */
function sampleMesh(geometries: THREE.BufferGeometry[], count: number): Float32Array {
  const merged = mergeGeometries(geometries);
  const mesh = new THREE.Mesh(merged, new THREE.MeshBasicMaterial());
  const sampler = new MeshSurfaceSampler(mesh).build();
  const points = new Float32Array(count * 3);
  const pos = new THREE.Vector3();
  for (let i = 0; i < count; i++) {
    sampler.sample(pos);
    points[i * 3] = pos.x;
    points[i * 3 + 1] = pos.y;
    points[i * 3 + 2] = pos.z;
  }
  merged.dispose();
  return points;
}

/* ─── Build book geometry and sample points ─── */
function buildBookPoints(): Float32Array {
  const geos: THREE.BufferGeometry[] = [];

  // Left page block (thick slab, angled open)
  const leftPage = new THREE.BoxGeometry(9, 13, 1.5);
  const mL = new THREE.Matrix4();
  // Rotate around the spine (left edge) and translate
  mL.makeRotationY(0.45); // angle pages open
  mL.setPosition(-5.5, 0, -1.5);
  leftPage.applyMatrix4(mL);
  geos.push(leftPage);

  // Right page block
  const rightPage = new THREE.BoxGeometry(9, 13, 1.5);
  const mR = new THREE.Matrix4();
  mR.makeRotationY(-0.45);
  mR.setPosition(5.5, 0, -1.5);
  rightPage.applyMatrix4(mR);
  geos.push(rightPage);

  // Spine (curved cylinder connecting the two pages)
  const spine = new THREE.CylinderGeometry(1.2, 1.2, 13, 12, 1);
  const mS = new THREE.Matrix4();
  mS.setPosition(0, 0, -2.2);
  spine.applyMatrix4(mS);
  geos.push(spine);

  // Front cover (thin slab on top of left page)
  const coverL = new THREE.BoxGeometry(9.5, 13.5, 0.3);
  const mCL = new THREE.Matrix4();
  mCL.makeRotationY(0.45);
  mCL.setPosition(-5.5, 0, -0.8);
  coverL.applyMatrix4(mCL);
  geos.push(coverL);

  // Back cover
  const coverR = new THREE.BoxGeometry(9.5, 13.5, 0.3);
  const mCR = new THREE.Matrix4();
  mCR.makeRotationY(-0.45);
  mCR.setPosition(5.5, 0, -2.2);
  coverR.applyMatrix4(mCR);
  geos.push(coverR);

  return sampleMesh(geos, COUNT);
}

/* ─── Build gear geometry and sample points ─── */
function buildGearPoints(): Float32Array {
  const geos: THREE.BufferGeometry[] = [];
  const TEETH = 14;
  const outerR = 12;
  const innerR = 9;
  const toothH = 3.5;
  const depth = 2.5;

  // Main ring (thick washer shape)
  const ring = new THREE.CylinderGeometry(outerR, outerR, depth, 48, 1);
  // Cut inner hole by adding an inner cylinder we'll subtract visually
  // Instead, use a torus-like approach: outer cylinder + inner disc
  geos.push(ring);

  // Teeth: rectangular boxes around the perimeter
  for (let t = 0; t < TEETH; t++) {
    const angle = (t / TEETH) * Math.PI * 2;
    const toothW = (2 * Math.PI * outerR) / TEETH * 0.5; // tooth width
    const tooth = new THREE.BoxGeometry(toothH, depth, toothW);
    const m = new THREE.Matrix4();
    m.makeRotationY(-angle);
    const tM = new THREE.Matrix4();
    tM.setPosition(outerR + toothH / 2, 0, 0);
    m.multiply(tM);
    tooth.applyMatrix4(m);
    geos.push(tooth);
  }

  // 6 spokes (thin rectangular bars from hub to ring)
  for (let s = 0; s < 6; s++) {
    const angle = (s / 6) * Math.PI * 2;
    const spoke = new THREE.BoxGeometry(innerR - 2.5, depth * 0.6, 1);
    const m = new THREE.Matrix4();
    m.makeRotationY(-angle);
    const tM = new THREE.Matrix4();
    tM.setPosition((innerR + 2.5) / 2, 0, 0);
    m.multiply(tM);
    spoke.applyMatrix4(m);
    geos.push(spoke);
  }

  // Center hub
  const hub = new THREE.CylinderGeometry(2.5, 2.5, depth, 16, 1);
  geos.push(hub);

  // Center hole (small cylinder)
  const hole = new THREE.CylinderGeometry(1, 1, depth * 1.2, 12, 1);
  geos.push(hole);

  return sampleMesh(geos, COUNT);
}

/* ─── Shape generators ─── */
// Each returns [x, y, z] for particle i out of COUNT, at given time

// Pre-sampled points (lazy-initialized)
let _bookPoints: Float32Array | null = null;
function getBookPoints(): Float32Array {
  if (!_bookPoints) _bookPoints = buildBookPoints();
  return _bookPoints;
}

let _gearPoints: Float32Array | null = null;
function getGearPoints(): Float32Array {
  if (!_gearPoints) _gearPoints = buildGearPoints();
  return _gearPoints;
}

function shapeBook(i: number, time: number): [number, number, number] {
  const pts = getBookPoints();
  const x = pts[i * 3];
  const y = pts[i * 3 + 1];
  const z = pts[i * 3 + 2];
  // Gentle breathing animation
  const breath = 1.0 + Math.sin(time * 1.2) * 0.02;
  // Floating bob — whole book drifts up and down slowly
  const float = Math.sin(time * 0.6) * 2.5;
  // Slight tilt that shifts with time (like rocking on water)
  const tiltX = Math.sin(time * 0.4) * 0.06;
  const tiltZ = Math.cos(time * 0.35) * 0.04;
  const bx = x * breath;
  const by = y * breath + float;
  const bz = z * breath;
  // Apply gentle rocking rotation around Y axis
  const cosT = Math.cos(tiltX);
  const sinT = Math.sin(tiltX);
  const rx = bx * cosT - bz * sinT;
  const rz = bx * sinT + bz * cosT;
  // Apply forward/back tilt
  const cosZ = Math.cos(tiltZ);
  const sinZ = Math.sin(tiltZ);
  const ry = by * cosZ - rz * sinZ;
  const rz2 = by * sinZ + rz * cosZ;
  return [rx, ry, rz2];
}

function shapeGear(i: number, time: number): [number, number, number] {
  const pts = getGearPoints();
  // Gear sampled with Y as the "up" axis from CylinderGeometry —
  // swap Y and Z so the gear faces the camera (lies flat in XY plane)
  const x = pts[i * 3];
  const geoY = pts[i * 3 + 1]; // this is the depth/thickness axis
  const z_raw = pts[i * 3 + 2];
  // Slow rotation
  const rot = time * 0.3;
  const cosR = Math.cos(rot);
  const sinR = Math.sin(rot);
  const rx = x * cosR - z_raw * sinR;
  const rz = x * sinR + z_raw * cosR;
  return [rx, rz, geoY];
}

function shapeTorus(i: number, time: number): [number, number, number] {
  const norm = i / COUNT;
  const R = 12;
  const r = 3;
  const u = norm * Math.PI * 2 + time * 1.2; // flowing along torus
  const v = hash(i) * Math.PI * 2;
  const x = (R + r * Math.cos(v)) * Math.cos(u);
  const y = (R + r * Math.cos(v)) * Math.sin(u);
  const z = r * Math.sin(v);
  return [x, y, z];
}

function shapeFunnel(i: number, time: number): [number, number, number] {
  const norm = i / COUNT;

  if (norm < 0.92) {
    const t = norm / 0.92;
    const funnelRadius = 15 - 13 * t;
    const spiralAngle = t * Math.PI * 2 * 20 + time * 3;
    const x = Math.cos(spiralAngle) * funnelRadius;
    const z = Math.sin(spiralAngle) * funnelRadius;
    const y = 15 - 30 * t;
    return [x, y, z];
  } else {
    // Dripping particles out the bottom
    const dripNorm = (norm - 0.92) / 0.08;
    const dripT = (dripNorm + time * 0.5) % 1.0;
    const x = (hash(i + 400) - 0.5) * 3;
    const z = (hash(i + 500) - 0.5) * 3;
    const y = -15 - dripT * 10;
    return [x, y, z];
  }
}

function shapeInfinity(i: number, time: number): [number, number, number] {
  const norm = i / COUNT;
  const t = norm * Math.PI * 2 + time * 0.8;
  const a = 14;
  const sinT = Math.sin(t);
  const denom = 1 + sinT * sinT;
  const baseX = (a * Math.cos(t)) / denom;
  const baseY = (a * sinT * Math.cos(t)) / denom;
  // Add tube thickness
  const z = (hash(i) - 0.5) * 4;
  const x = baseX + (hash(i + 1000) - 0.5) * 2.5;
  const y = baseY + (hash(i + 2000) - 0.5) * 2.5;
  return [x, y, z];
}

function shapeStarburst(i: number, time: number): [number, number, number] {
  const norm = i / COUNT;
  const pulse = 10 + Math.sin(time * 2) * 2;

  if (norm < 0.7) {
    // Base sphere (Fibonacci distribution)
    const golden = (1 + Math.sqrt(5)) / 2;
    const theta = (2 * Math.PI * i) / golden;
    const phi = Math.acos(1 - (2 * (norm / 0.7)));
    const r = pulse;
    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);
    return [x, y, z];
  } else if (norm < 0.9) {
    // Sparks shooting outward and back
    const sparkNorm = (norm - 0.7) / 0.2;
    const golden = (1 + Math.sqrt(5)) / 2;
    const theta = (2 * Math.PI * i) / golden;
    const phi = Math.acos(1 - 2 * hash(i + 700));
    const sparkPhase = (time * 2 + hash(i + 800) * 6.28) % 6.28;
    const sparkR = pulse + Math.abs(Math.sin(sparkPhase)) * (10 + hash(i + 900) * 10);
    const x = sparkR * Math.sin(phi) * Math.cos(theta);
    const y = sparkR * Math.sin(phi) * Math.sin(theta);
    const z = sparkR * Math.cos(phi);
    return [x, y, z];
  } else {
    // Electric arcs between random points
    const arcNorm = (norm - 0.9) / 0.1;
    const arcIdx = Math.floor(arcNorm * 8);
    const arcT = (arcNorm * 8) - arcIdx;
    // Two random points on sphere
    const theta1 = hash(arcIdx * 2 + 3000) * Math.PI * 2;
    const phi1 = Math.acos(1 - 2 * hash(arcIdx * 2 + 3001));
    const theta2 = hash(arcIdx * 2 + 4000) * Math.PI * 2;
    const phi2 = Math.acos(1 - 2 * hash(arcIdx * 2 + 4001));
    const r = pulse;
    const x1 = r * Math.sin(phi1) * Math.cos(theta1);
    const y1 = r * Math.sin(phi1) * Math.sin(theta1);
    const z1 = r * Math.cos(phi1);
    const x2 = r * Math.sin(phi2) * Math.cos(theta2);
    const y2 = r * Math.sin(phi2) * Math.sin(theta2);
    const z2 = r * Math.cos(phi2);
    // Lerp with jitter for electric arc look
    const jitter = Math.sin(time * 20 + arcT * 50) * 2;
    const x = x1 + (x2 - x1) * arcT + jitter * (hash(i + 5000) - 0.5);
    const y = y1 + (y2 - y1) * arcT + jitter * (hash(i + 5001) - 0.5);
    const z = z1 + (z2 - z1) * arcT + jitter * (hash(i + 5002) - 0.5);
    return [x, y, z];
  }
}

const shapeFns = [shapeBook, shapeGear, shapeTorus, shapeFunnel, shapeInfinity, shapeStarburst];

/* ─── Phase color configs [sat, lit] — bright particles on dark background ─── */
const phaseColors: [number, number][] = [
  [0.4, 0.4],   // Book: warm
  [0.3, 0.35],  // Gear: metallic
  [0.6, 0.5],   // Torus: energetic
  [0.5, 0.45],  // Funnel: gradient (base)
  [0.5, 0.4],   // Infinity: deep
  [0.8, 0.6],   // Starburst: bright
];

/* ─── Mouse tracker ─── */
function MouseTracker({
  mouseRef,
}: {
  mouseRef: React.MutableRefObject<THREE.Vector3>;
}) {
  const { camera } = useThree();
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const pointer = useMemo(() => new THREE.Vector2(), []);
  const plane = useMemo(
    () => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0),
    []
  );
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

/* ─── Label styles ─── */
const titleStyle: React.CSSProperties = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.9)",
  border: "1px solid rgba(255,255,255,0.25)",
  background: "rgba(0,0,0,0.5)",
  backdropFilter: "blur(4px)",
  padding: "4px 10px",
  whiteSpace: "nowrap",
};

const descStyle: React.CSSProperties = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: 8,
  fontWeight: 400,
  letterSpacing: "0.1em",
  color: "rgba(255,255,255,0.55)",
  marginTop: 3,
  whiteSpace: "nowrap",
};

const dotStyle: React.CSSProperties = {
  width: 5,
  height: 5,
  borderRadius: "50%",
  background: "rgba(255,255,255,0.6)",
  margin: "0 auto 4px",
};

const lineStyleV: React.CSSProperties = {
  width: 1,
  height: 24,
  background: "rgba(255,255,255,0.3)",
  margin: "0 auto 4px",
};

/* ─── Morph label (fixed in top-right of the container, outside the Canvas) ─── */
function MorphLabel({ phase }: { phase: number }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 12,
        right: 12,
        textAlign: "right",
        pointerEvents: "none",
        zIndex: 10,
      }}
    >
      <div style={titleStyle}>{PHASES[phase].title}</div>
      <div style={descStyle}>{PHASES[phase].desc}</div>
    </div>
  );
}

/* ─── Main particle swarm ─── */
function MorphSwarm({ onPhaseChange }: { onPhaseChange: (p: number) => void }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const target = useMemo(() => new THREE.Vector3(), []);
  const pColor = useMemo(() => new THREE.Color(), []);
  const mouseRef = useRef(new THREE.Vector3(9999, 9999, 9999));
  const hueRef = useRef(0);
  const phaseRef = useRef(0);

  const positions = useMemo(
    () =>
      Array.from({ length: COUNT }, () =>
        new THREE.Vector3(
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 100
        )
      ),
    []
  );

  const material = useMemo(
    () => new THREE.MeshBasicMaterial({ color: 0xffffff }),
    []
  );
  const geometry = useMemo(() => new THREE.TetrahedronGeometry(0.2), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const gTime = state.clock.getElapsedTime();

    // Read rainbow hue from CSS
    const rawHue =
      document.documentElement.style.getPropertyValue("--rainbow-hue");
    if (rawHue) hueRef.current = parseFloat(rawHue) / 360;
    const hue = hueRef.current;

    // Phase / morph logic
    const cycle = gTime % (TOTAL_PHASES * PHASE_DUR);
    const pIdx = Math.floor(cycle / PHASE_DUR);
    const nIdx = (pIdx + 1) % TOTAL_PHASES;
    const phaseT = cycle % PHASE_DUR;
    const morphT = Math.max(0, (phaseT - (PHASE_DUR - MORPH_DUR)) / MORPH_DUR);
    const blend = morphT * morphT * (3 - 2 * morphT); // smooth hermite

    // Update label when phase changes
    if (pIdx !== phaseRef.current) {
      phaseRef.current = pIdx;
      onPhaseChange(pIdx);
    }

    const currentShapeFn = shapeFns[pIdx];
    const nextShapeFn = shapeFns[nIdx];

    const [pSat, pLit] = phaseColors[pIdx];
    const [nSat, nLit] = phaseColors[nIdx];
    const blendSat = pSat + (nSat - pSat) * blend;
    const blendLit = pLit + (nLit - pLit) * blend;

    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    for (let i = 0; i < COUNT; i++) {
      const [px, py, pz] = currentShapeFn(i, gTime);
      const [nx, ny, nz] = nextShapeFn(i, gTime);

      const finalX = px + (nx - px) * blend;
      const finalY = py + (ny - py) * blend;
      const finalZ = pz + (nz - pz) * blend;

      target.set(finalX, finalY, finalZ);

      // Per-particle color variation
      const iNorm = i / COUNT;
      let sat = blendSat;
      let lit = blendLit + (hash(i + 100) - 0.5) * 0.1;

      // Funnel gradient: lighter at top, brighter at bottom
      if (pIdx === 3 && blend < 0.5) {
        lit = 0.3 + iNorm * 0.3;
      }

      pColor.setHSL(hue, Math.max(0, Math.min(1, sat)), Math.max(0, Math.min(1, lit)));

      // Mouse interaction
      const dx = target.x - mx;
      const dy = target.y - my;
      const distSq = dx * dx + dy * dy;
      const mouseRadius = 64;
      if (distSq < mouseRadius && distSq > 0.01) {
        const dist = Math.sqrt(distSq);
        const force = (1 - dist / 8) * 1.5;
        target.x += (dx / dist) * force;
        target.y += (dy / dist) * force;
        const brightBoost = (1 - dist / 8) * 0.3;
        pColor.r = Math.min(1, pColor.r + brightBoost);
        pColor.g = Math.min(1, pColor.g + brightBoost);
        pColor.b = Math.min(1, pColor.b + brightBoost);
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
      <instancedMesh ref={meshRef} args={[geometry, material, COUNT]} />
    </>
  );
}

/* ─── Main scene ─── */
export default function MorphScene({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  const [currentPhase, setCurrentPhase] = useState(0);

  return (
    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
      <Canvas
        camera={{ position: [0, 0, 55], fov: 50 }}
        gl={{ alpha: true }}
        style={{
          position: "absolute",
          top: 0,
          left: "15%",
          width: "100%",
          height: "100%",
        }}
      >
        <MorphSwarm onPhaseChange={setCurrentPhase} />
        <OrbitControls
          autoRotate
          autoRotateSpeed={0.5}
          enableZoom={false}
          enablePan={false}
          target={[0, 0, 0]}
        />
        <Effects disableGamma>
          {/* @ts-expect-error — R3F JSX for extended three-stdlib pass */}
          <unrealBloomPass threshold={0.1} strength={1.0} radius={0.4} />
        </Effects>
      </Canvas>
      <MorphLabel phase={currentPhase} />
    </div>
  );
}
