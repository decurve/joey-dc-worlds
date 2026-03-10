"use client";

import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";

import * as THREE from "three";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

/* ─── Constants ─── */
const COUNT = 15000;
const MORPH_DUR = 2.0;
const TOTAL_PHASES = 7; // rocket + 6 components

/* Per-phase durations: rocket stays longer so you can admire it */
const PHASE_DURS = [10, 6, 6, 6, 6, 6, 6]; // seconds each phase holds
const CYCLE_TOTAL = PHASE_DURS.reduce((a, b) => a + b, 0); // total cycle time

/* Scale factor applied to the rocket so it matches the standalone rocket scene */
const ROCKET_SCALE = 0.38;

const PHASES = [
  { title: "GROWTH SYSTEM", desc: "The full machine" },
  { title: "GROWTH ENGINE", desc: "Systematic growth mechanics" },
  { title: "STORY SYSTEM", desc: "Your brand narrative" },
  { title: "ACQUISITION FUNNEL", desc: "Top-of-funnel strategy" },
  { title: "RETENTION LOOP", desc: "Keeping customers forever" },
  { title: "FLYWHEEL", desc: "Compounding momentum" },
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

/* ─── Build book geometry ─── */
function buildBookPoints(): Float32Array {
  const geos: THREE.BufferGeometry[] = [];
  const leftPage = new THREE.BoxGeometry(9, 13, 1.5);
  const mL = new THREE.Matrix4();
  mL.makeRotationY(0.45);
  mL.setPosition(-5.5, 0, -1.5);
  leftPage.applyMatrix4(mL);
  geos.push(leftPage);

  const rightPage = new THREE.BoxGeometry(9, 13, 1.5);
  const mR = new THREE.Matrix4();
  mR.makeRotationY(-0.45);
  mR.setPosition(5.5, 0, -1.5);
  rightPage.applyMatrix4(mR);
  geos.push(rightPage);

  const spine = new THREE.CylinderGeometry(1.2, 1.2, 13, 12, 1);
  const mS = new THREE.Matrix4();
  mS.setPosition(0, 0, -2.2);
  spine.applyMatrix4(mS);
  geos.push(spine);

  const coverL = new THREE.BoxGeometry(9.5, 13.5, 0.3);
  const mCL = new THREE.Matrix4();
  mCL.makeRotationY(0.45);
  mCL.setPosition(-5.5, 0, -0.8);
  coverL.applyMatrix4(mCL);
  geos.push(coverL);

  const coverR = new THREE.BoxGeometry(9.5, 13.5, 0.3);
  const mCR = new THREE.Matrix4();
  mCR.makeRotationY(-0.45);
  mCR.setPosition(5.5, 0, -2.2);
  coverR.applyMatrix4(mCR);
  geos.push(coverR);

  return sampleMesh(geos, COUNT);
}

/* ─── Build gear geometry ─── */
function buildGearPoints(): Float32Array {
  const geos: THREE.BufferGeometry[] = [];
  const TEETH = 14;
  const outerR = 12;
  const depth = 2.5;

  const ring = new THREE.CylinderGeometry(outerR, outerR, depth, 48, 1);
  geos.push(ring);

  for (let t = 0; t < TEETH; t++) {
    const angle = (t / TEETH) * Math.PI * 2;
    const toothW = (2 * Math.PI * outerR) / TEETH * 0.5;
    const tooth = new THREE.BoxGeometry(3.5, depth, toothW);
    const m = new THREE.Matrix4();
    m.makeRotationY(-angle);
    const tM = new THREE.Matrix4();
    tM.setPosition(outerR + 1.75, 0, 0);
    m.multiply(tM);
    tooth.applyMatrix4(m);
    geos.push(tooth);
  }

  for (let s = 0; s < 6; s++) {
    const angle = (s / 6) * Math.PI * 2;
    const spoke = new THREE.BoxGeometry(6.5, depth * 0.6, 1);
    const m = new THREE.Matrix4();
    m.makeRotationY(-angle);
    const tM = new THREE.Matrix4();
    tM.setPosition(5.75, 0, 0);
    m.multiply(tM);
    spoke.applyMatrix4(m);
    geos.push(spoke);
  }

  const hub = new THREE.CylinderGeometry(2.5, 2.5, depth, 16, 1);
  geos.push(hub);

  return sampleMesh(geos, COUNT);
}

/* ─── Lazy point caches ─── */
let _bookPts: Float32Array | null = null;
function getBookPoints(): Float32Array {
  if (!_bookPts) _bookPts = buildBookPoints();
  return _bookPts;
}

let _gearPts: Float32Array | null = null;
function getGearPoints(): Float32Array {
  if (!_gearPts) _gearPts = buildGearPoints();
  return _gearPts;
}

/* ─── Shape functions ─── */

// Phase 0: Rocket — procedural rocket, stretched taller
function shapeRocket(i: number, time: number): [number, number, number] {
  const u = (i * 0.618033988749895) % 1.0;
  const v = (i * 0.7548776662466927) % 1.0;
  const w = (i * 0.5698402909980532) % 1.0;
  const scale = ROCKET_SCALE;
  const yStretch = 1.35; // make the rocket taller
  const spinSpeed = 0.4;
  const flowSpeed = 0.15;

  let x = 0, y = 0, z = 0;

  if (u < 0.55) {
    // Main hull
    const flow_v = (v + time * flowSpeed) % 1.0;
    y = -25 + 55 * flow_v;
    let r: number;
    if (y < 5) {
      r = 7;
    } else if (y < 20) {
      const t = (y - 5) / 15;
      r = 7 * (1 - t * t);
    } else {
      r = 0.3;
    }
    const theta = w * Math.PI * 2;
    x = r * Math.cos(theta);
    z = r * Math.sin(theta);
  } else if (u < 0.80) {
    // 4 swept-back fins
    const finIdx = Math.floor(v * 4);
    const finAngle = (finIdx / 4) * Math.PI * 2 + Math.PI / 4;
    const finT = (v * 4) - finIdx;
    const finW = w;
    const finHeight = 20;
    const finY = -25 + finT * finHeight;
    const finMaxExtent = 14;
    const finExtent = finMaxExtent * (1 - finT) * finW;
    const finThickness = 0.4;
    const cosF = Math.cos(finAngle);
    const sinF = Math.sin(finAngle);
    const hullR = 7;
    x = cosF * (hullR + finExtent);
    z = sinF * (hullR + finExtent);
    y = finY;
    x += sinF * (((i * 0.9123) % 1) - 0.5) * finThickness;
    z -= cosF * (((i * 0.9123) % 1) - 0.5) * finThickness;
  } else {
    // Exhaust
    const flow_w = (w + time * 2) % 1.0;
    const exhaustR = 5 * (1 - flow_w * 0.5);
    const theta = v * Math.PI * 2;
    x = Math.cos(theta) * exhaustR * flow_w;
    z = Math.sin(theta) * exhaustR * flow_w;
    y = -25 - flow_w * 12;
  }

  // Spin
  const angle = time * spinSpeed + Math.PI / 4;
  const cosA = Math.cos(angle);
  const sinA = Math.sin(angle);
  const rotX = x * cosA - z * sinA;
  const rotZ = x * sinA + z * cosA;

  return [rotX * scale, y * scale * yStretch + 5, rotZ * scale];
}

// Phase 1: Book (story system)
function shapeBook(i: number, time: number): [number, number, number] {
  const pts = getBookPoints();
  const x = pts[i * 3];
  const y = pts[i * 3 + 1];
  const z = pts[i * 3 + 2];
  const breath = 1.0 + Math.sin(time * 1.2) * 0.02;
  const float = Math.sin(time * 1.3) * 1.5 + 2;
  const tiltX = Math.sin(time * 1.2) * 0.06;
  const tiltZ = Math.cos(time * 1.0) * 0.04;
  const bx = x * breath;
  const by = y * breath + float;
  const bz = z * breath;
  const cosT = Math.cos(tiltX);
  const sinT = Math.sin(tiltX);
  const rx = bx * cosT - bz * sinT;
  const rz = bx * sinT + bz * cosT;
  const cosZ = Math.cos(tiltZ);
  const sinZ = Math.sin(tiltZ);
  const ry = by * cosZ - rz * sinZ;
  const rz2 = by * sinZ + rz * cosZ;
  return [rx, ry, rz2];
}

// Phase 2: Gear (growth engine)
function shapeGear(i: number, time: number): [number, number, number] {
  const pts = getGearPoints();
  const x = pts[i * 3];
  const geoY = pts[i * 3 + 1];
  const z_raw = pts[i * 3 + 2];
  const rot = time * 0.3;
  const cosR = Math.cos(rot);
  const sinR = Math.sin(rot);
  const rx = x * cosR - z_raw * sinR;
  const rz = x * sinR + z_raw * cosR;
  return [rx, rz + 2, geoY];
}

// Phase 3: Funnel (acquisition) — scaled down, shifted up, more particle scatter
function shapeFunnel(i: number, time: number): [number, number, number] {
  const norm = i / COUNT;
  const s = 0.65; // shrink factor
  const yUp = 4.5; // push up
  // Per-particle jitter for a more scattered, particle-y feel
  const jx = (hash(i + 200) - 0.5) * 1.8;
  const jy = (hash(i + 300) - 0.5) * 1.2;
  const jz = (hash(i + 600) - 0.5) * 1.8;
  if (norm < 0.92) {
    const t = norm / 0.92;
    const funnelRadius = (15 - 13 * t) * s;
    const spiralAngle = t * Math.PI * 2 * 20 + time * 3;
    const x = Math.cos(spiralAngle) * funnelRadius + jx;
    const z = Math.sin(spiralAngle) * funnelRadius + jz;
    const y = (15 - 30 * t) * s + yUp + jy;
    return [x, y, z];
  } else {
    const dripNorm = (norm - 0.92) / 0.08;
    const dripT = (dripNorm + time * 0.5) % 1.0;
    const x = (hash(i + 400) - 0.5) * 4 * s + jx;
    const z = (hash(i + 500) - 0.5) * 4 * s + jz;
    const y = (-15 - dripT * 10) * s + yUp + jy;
    return [x, y, z];
  }
}

// Phase 4: Torus (retention loop)
function shapeTorus(i: number, time: number): [number, number, number] {
  const norm = i / COUNT;
  const R = 12;
  const r = 3;
  const u = norm * Math.PI * 2 + time * 1.2;
  const v = hash(i) * Math.PI * 2;
  const x = (R + r * Math.cos(v)) * Math.cos(u);
  const y = (R + r * Math.cos(v)) * Math.sin(u) + 2;
  const z = r * Math.sin(v);
  return [x, y, z];
}

// Phase 5: Infinity (flywheel) — shifted up a bit
function shapeInfinity(i: number, time: number): [number, number, number] {
  const norm = i / COUNT;
  const t = norm * Math.PI * 2 + time * 0.8;
  const a = 14;
  const sinT = Math.sin(t);
  const denom = 1 + sinT * sinT;
  const baseX = (a * Math.cos(t)) / denom;
  const baseY = (a * sinT * Math.cos(t)) / denom;
  const z = (hash(i) - 0.5) * 4;
  const x = baseX + (hash(i + 1000) - 0.5) * 2.5;
  const y = baseY + (hash(i + 2000) - 0.5) * 2.5 + 3;
  return [x, y, z];
}

// Phase 6: Spiral (growth catalyst) — particles flowing outward from center
function shapeSpiral(i: number, time: number): [number, number, number] {
  const norm = i / COUNT;
  // 3 spiral arms, particles distributed along them and flowing outward
  const NUM_ARMS = 3;
  const armIdx = Math.floor(norm * NUM_ARMS);
  const armT = (norm * NUM_ARMS) - armIdx;

  // Base angle for this arm
  const armOffset = (armIdx / NUM_ARMS) * Math.PI * 2;
  // How far along the spiral (0 = center, 1 = outer edge)
  const flow = (armT + time * 0.15) % 1.0;
  // Spiral radius grows with distance
  const maxR = 14;
  const r = flow * maxR;
  // Total rotation: ~2.5 turns from center to edge + slow global spin
  const angle = armOffset + flow * Math.PI * 5 + time * 0.5;

  const x = Math.cos(angle) * r;
  const y = Math.sin(angle) * r + 2;
  const z = (hash(i) - 0.5) * 3;

  // Per-particle scatter for thickness
  const jx = (hash(i + 100) - 0.5) * (1.0 + flow * 1.5);
  const jy = (hash(i + 200) - 0.5) * (1.0 + flow * 1.5);

  return [x + jx, y + jy, z];
}

const shapeFns = [shapeRocket, shapeGear, shapeBook, shapeFunnel, shapeTorus, shapeInfinity, shapeSpiral];

/* ─── Phase color configs [sat, lit] — dark particles on light background ─── */
const phaseColors: [number, number][] = [
  [0.3, 0.06],   // Rocket
  [0.3, 0.06],   // Gear
  [0.3, 0.08],   // Book
  [0.3, 0.08],   // Funnel
  [0.4, 0.10],   // Torus
  [0.4, 0.08],   // Infinity
  [0.5, 0.12],   // Starburst
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

/* ─── 3D label styles (same as standalone rocket scene) ─── */
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
  borderRadius: 6,
  padding: "3px 8px",
  whiteSpace: "nowrap",
  pointerEvents: "none",
};

const dotStyle3D: React.CSSProperties = {
  width: 5,
  height: 5,
  borderRadius: "50%",
  background: "rgba(0,0,0,0.4)",
  flexShrink: 0,
};

const lineStyle3D: React.CSSProperties = {
  width: 32,
  height: 1,
  background: "rgba(0,0,0,0.2)",
  flexShrink: 0,
};

/* ─── Phase label styles (top-right overlay) ─── */
const titleStyle: React.CSSProperties = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  color: "rgba(0,0,0,0.7)",
  border: "1px solid rgba(0,0,0,0.15)",
  background: "rgba(249,249,248,0.7)",
  backdropFilter: "blur(4px)",
  borderRadius: 6,
  padding: "4px 10px",
  whiteSpace: "nowrap",
};

const descStyle: React.CSSProperties = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: 8,
  fontWeight: 400,
  letterSpacing: "0.1em",
  color: "rgba(0,0,0,0.45)",
  marginTop: 3,
  whiteSpace: "nowrap",
};

/* ─── 3D label component ─── */
function RocketLabel3D({
  position,
  text,
  side = "right",
  opacity = 1,
}: {
  position: [number, number, number];
  text: string;
  side?: "left" | "right";
  opacity?: number;
}) {
  const isLeft = side === "left";
  return (
    <Html position={position} center={false} style={{ pointerEvents: "none", opacity, transition: "opacity 0.3s" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          flexDirection: isLeft ? "row-reverse" : "row",
          transform: isLeft ? "translateX(-100%)" : undefined,
        }}
      >
        <div style={dotStyle3D} />
        <div style={lineStyle3D} />
        <div style={labelStyle}>{text}</div>
      </div>
    </Html>
  );
}

/* ─── Rotating 3D labels that appear only during rocket phase ─── */
function RocketLabels({ visible, phaseTimeRef }: { visible: boolean; phaseTimeRef: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null);
  const [opacity, setOpacity] = useState(visible ? 1 : 0);
  const prevVisible = useRef(visible);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    const angle = time * 0.4 + Math.PI / 4;
    groupRef.current.rotation.y = angle;

    // Reset opacity to 1 when rocket phase starts
    if (visible && !prevVisible.current) {
      setOpacity(1);
    }
    prevVisible.current = visible;

    if (visible) {
      const rocketDur = PHASE_DURS[0];
      const pt = phaseTimeRef.current;
      const fadeStart = rocketDur * 0.55;
      const fadeDur = rocketDur * 0.15;
      const newOp = Math.max(0, Math.min(1, 1 - (pt - fadeStart) / fadeDur));
      setOpacity(newOp);
    }
  });

  if (!visible || opacity <= 0) return null;

  const s = ROCKET_SCALE;
  const ys = 1.35; // match yStretch
  const yOff = 5; // match Y offset
  return (
    <group ref={groupRef} position={[0, yOff, 0]}>
      <RocketLabel3D position={[8 * s, 15 * s * ys, 0]} text="GROWTH ENGINE" side="right" opacity={opacity} />
      <RocketLabel3D position={[-8 * s, -20 * s * ys, 0]} text="ACQUISITION" side="left" opacity={opacity} />
      <RocketLabel3D position={[8 * s, -5 * s * ys, 0]} text="RETENTION" side="right" opacity={opacity} />
      <RocketLabel3D position={[-8 * s, 5 * s * ys, 0]} text="STORY SYSTEM" side="left" opacity={opacity} />
      <RocketLabel3D position={[15 * s, -15 * s * ys, 0]} text="FLYWHEEL" side="right" opacity={opacity} />
    </group>
  );
}

/* ─── Phase label overlay (top-right) ─── */
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
function RocketMorphSwarm({
  onPhaseChange,
  phaseRef,
  phaseTimeRef,
}: {
  onPhaseChange: (p: number) => void;
  phaseRef: React.MutableRefObject<number>;
  phaseTimeRef: React.MutableRefObject<number>;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const target = useMemo(() => new THREE.Vector3(), []);
  const pColor = useMemo(() => new THREE.Color(), []);
  const mouseRef = useRef(new THREE.Vector3(9999, 9999, 9999));
  const hueRef = useRef(0);
  const internalPhaseRef = useRef(0);

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
  const geometry = useMemo(() => new THREE.TetrahedronGeometry(0.15), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const gTime = state.clock.getElapsedTime();

    const rawHue =
      document.documentElement.style.getPropertyValue("--rainbow-hue");
    if (rawHue) hueRef.current = parseFloat(rawHue) / 360;
    const hue = hueRef.current;

    // Phase / morph logic (variable-length phases)
    const cycle = gTime % CYCLE_TOTAL;
    let cumul = 0;
    let pIdx = 0;
    for (let p = 0; p < TOTAL_PHASES; p++) {
      if (cycle < cumul + PHASE_DURS[p]) { pIdx = p; break; }
      cumul += PHASE_DURS[p];
    }
    const nIdx = (pIdx + 1) % TOTAL_PHASES;
    const phaseT = cycle - cumul; // time within this phase
    const phaseDur = PHASE_DURS[pIdx];
    const morphT = Math.max(0, (phaseT - (phaseDur - MORPH_DUR)) / MORPH_DUR);
    const blend = morphT * morphT * (3 - 2 * morphT);

    if (pIdx !== internalPhaseRef.current) {
      internalPhaseRef.current = pIdx;
      phaseRef.current = pIdx;
      onPhaseChange(pIdx);
    }
    phaseTimeRef.current = phaseT;

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

      const iNorm = i / COUNT;
      let sat = blendSat;
      let lit = blendLit + (hash(i + 100) - 0.5) * 0.1;

      // Rocket phase: use same lighting as standalone rocket
      if (pIdx === 0 && blend < 0.5) {
        const u = (i * 0.618033988749895) % 1.0;
        if (u < 0.55) {
          const w = (i * 0.5698402909980532) % 1.0;
          const theta = w * Math.PI * 2;
          lit = 0.02 + Math.pow(Math.max(0, Math.sin(theta + gTime * 1.5 - finalY * 0.05 / ROCKET_SCALE)), 8) * 0.06;
          sat = 0.3;
        } else if (u < 0.80) {
          lit = 0.02 + (finalZ > 0 ? 0.02 : 0.06);
          sat = 0.3;
        } else {
          const w = (i * 0.5698402909980532) % 1.0;
          const flow_w = (w + gTime * 2) % 1.0;
          lit = 0.05 + (1 - flow_w) * 0.08;
          sat = 0.5;
        }
      }

      // Funnel gradient fix
      if (pIdx === 3 && blend < 0.5) {
        lit = 0.04 + iNorm * 0.06;
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
      <instancedMesh ref={meshRef} args={[geometry, material, COUNT]} />
    </>
  );
}

/* ─── Main scene ─── */
export default function RocketMorphScene({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  const [currentPhase, setCurrentPhase] = useState(0);
  const phaseRef = useRef(0);
  const phaseTimeRef = useRef(0);

  const isRocketPhase = currentPhase === 0;

  return (
    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
      <Canvas
        camera={{ position: [0, 0, 55], fov: 50 }}
        gl={{ alpha: true }}
        style={{
          position: "absolute",
          top: "-8%",
          left: "5%",
          width: "100%",
          height: "100%",
        }}
      >
        <RocketMorphSwarm onPhaseChange={setCurrentPhase} phaseRef={phaseRef} phaseTimeRef={phaseTimeRef} />
        <RocketLabels visible={isRocketPhase} phaseTimeRef={phaseTimeRef} />
        <OrbitControls
          enableRotate={false}
          enableZoom={false}
          enablePan={false}
          target={[0, 0, 0]}
        />
      </Canvas>
      <MorphLabel phase={currentPhase} />
    </div>
  );
}
