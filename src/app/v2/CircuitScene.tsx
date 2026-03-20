"use client";

import { useRef, useMemo, useState, useCallback, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

/* ─── Deterministic random ─── */
function sr(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

/* ─── Chip definitions ─── */
const CHIP_DEFS = [
  { label: "GROWTH SYSTEM", position: [0, 0.076, 0] as [number, number, number], w: 1.4, h: 0.9 },
  { label: "FLYWHEEL", position: [3.2, 0.076, 0.3] as [number, number, number], w: 1.0, h: 0.7 },
  { label: "CATALYST", position: [1.0, 0.076, -2.8] as [number, number, number], w: 1.0, h: 0.7 },
  { label: "ACQUISITION", position: [-3.0, 0.076, -0.2] as [number, number, number], w: 1.0, h: 0.7 },
  { label: "RETENTION", position: [-0.8, 0.076, 2.8] as [number, number, number], w: 1.0, h: 0.7 },
  { label: "STORY SYSTEM", position: [-1.2, 0.076, -1.0] as [number, number, number], w: 1.0, h: 0.7 },
];

/* ─── Beam path: visits each chip in order then loops ─── */
// GROWTH SYSTEM(0) → ACQUISITION(3) → CATALYST(2) → FLYWHEEL(1) → RETENTION(4) → STORY SYSTEM(5) → loop
const VISIT_ORDER = [0, 3, 2, 1, 4, 5];

function buildBeamPath(): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const order = [...VISIT_ORDER, VISIT_ORDER[0]]; // loop back

  for (let i = 0; i < order.length - 1; i++) {
    const from = CHIP_DEFS[order[i]].position;
    const to = CHIP_DEFS[order[i + 1]].position;
    // Route with 90° turns: go X first, then Z
    const midX = (from[0] + to[0]) / 2;
    points.push(new THREE.Vector3(from[0], 0.08, from[2]));
    points.push(new THREE.Vector3(midX, 0.08, from[2]));
    points.push(new THREE.Vector3(midX, 0.08, to[2]));
  }
  // Final point back at start
  const last = CHIP_DEFS[VISIT_ORDER[0]].position;
  points.push(new THREE.Vector3(last[0], 0.08, last[2]));
  return points;
}

function getPathLength(points: THREE.Vector3[]) {
  let total = 0;
  for (let i = 0; i < points.length - 1; i++) {
    total += points[i].distanceTo(points[i + 1]);
  }
  return total;
}

function getPointAtDistance(points: THREE.Vector3[], dist: number): THREE.Vector3 {
  let remaining = dist;
  for (let i = 0; i < points.length - 1; i++) {
    const segLen = points[i].distanceTo(points[i + 1]);
    if (remaining <= segLen) {
      const t = segLen > 0 ? remaining / segLen : 0;
      return new THREE.Vector3().lerpVectors(points[i], points[i + 1], t);
    }
    remaining -= segLen;
  }
  return points[points.length - 1].clone();
}

/* Which chip index does the beam reach at what fraction of path? */
function getChipVisitFractions(points: THREE.Vector3[]): number[] {
  const totalLen = getPathLength(points);
  const fractions: number[] = [];
  const order = [...VISIT_ORDER, VISIT_ORDER[0]];
  // Each chip is at index i*3 in the points array
  let cumDist = 0;
  for (let i = 0; i < points.length - 1; i++) {
    cumDist += points[i].distanceTo(points[i + 1]);
    // Every 3 points we arrive at a chip
    if ((i + 1) % 3 === 0) {
      const chipIdx = order[Math.floor((i + 1) / 3)];
      fractions[chipIdx] = cumDist / totalLen;
    }
  }
  return fractions;
}

/* ─── Build trace segments ─── */
type TraceSegment = { x1: number; z1: number; x2: number; z2: number; thick: boolean };

function buildTraces(): TraceSegment[] {
  const traces: TraceSegment[] = [];
  const boardR = 12;

  // Dense grid of signal traces — spread across the larger board
  for (let i = 0; i < 80; i++) {
    const x1 = (sr(i * 17 + 3) - 0.5) * boardR * 2;
    const z1 = (sr(i * 23 + 7) - 0.5) * boardR * 2;
    const horiz = sr(i * 31 + 11) > 0.4;
    const len = 0.3 + sr(i * 41 + 13) * 2.5;
    const diagonal = sr(i * 51 + 17) > 0.8;

    if (diagonal) {
      const dx = (sr(i * 61 + 19) > 0.5 ? 1 : -1) * len * 0.707;
      const dz = (sr(i * 71 + 23) > 0.5 ? 1 : -1) * len * 0.707;
      traces.push({ x1, z1, x2: x1 + dx, z2: z1 + dz, thick: false });
    } else if (horiz) {
      traces.push({ x1, z1, x2: x1 + len, z2: z1, thick: false });
    } else {
      traces.push({ x1, z1, x2: x1, z2: z1 + len, thick: false });
    }
  }

  // Bus traces radiating from chips
  for (let ci = 0; ci < CHIP_DEFS.length; ci++) {
    const c = CHIP_DEFS[ci];
    for (let j = 0; j < 4; j++) {
      const ang = sr(ci * 100 + j * 37) * Math.PI * 2;
      const len = 0.8 + sr(ci * 100 + j * 43) * 1.5;
      const ex = c.position[0] + Math.cos(ang) * len;
      const ez = c.position[2] + Math.sin(ang) * len;
      // H then V routing
      traces.push({ x1: c.position[0], z1: c.position[2], x2: ex, z2: c.position[2], thick: true });
      traces.push({ x1: ex, z1: c.position[2], x2: ex, z2: ez, thick: true });
    }
  }

  return traces;
}

/* ─── Build passive component positions ─── */
type PassiveDef = { x: number; z: number; type: "resistor" | "capacitor" | "via"; angle: number };

function buildPassives(): PassiveDef[] {
  const items: PassiveDef[] = [];
  const boardR = 10;

  for (let i = 0; i < 25; i++) {
    items.push({
      x: (sr(i * 13 + 100) - 0.5) * boardR * 2,
      z: (sr(i * 17 + 200) - 0.5) * boardR * 2,
      type: "resistor",
      angle: sr(i * 19 + 300) > 0.5 ? 0 : Math.PI / 2,
    });
  }
  for (let i = 0; i < 16; i++) {
    items.push({
      x: (sr(i * 23 + 400) - 0.5) * boardR * 2,
      z: (sr(i * 29 + 500) - 0.5) * boardR * 2,
      type: "capacitor",
      angle: 0,
    });
  }
  for (let i = 0; i < 35; i++) {
    items.push({
      x: (sr(i * 31 + 600) - 0.5) * boardR * 2,
      z: (sr(i * 37 + 700) - 0.5) * boardR * 2,
      type: "via",
      angle: 0,
    });
  }
  return items;
}

/* ═══════════════════════════════════════════════════
   Board — flat dark PCB base with subtle grid
   ═══════════════════════════════════════════════════ */
function Board() {
  return (
    <group>
      {/* Main board — oversized warm cream surface, no visible edges */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[30, 0.05, 24]} />
        <meshStandardMaterial color="#f5f0e8" roughness={0.9} metalness={0.0} />
      </mesh>
      {/* Subtle grid lines */}
      <GridLines />
    </group>
  );
}

function GridLines() {
  const geo = useMemo(() => {
    const positions: number[] = [];
    const step = 0.5;
    for (let x = -14; x <= 14; x += step) {
      positions.push(x, 0.026, -11, x, 0.026, 11);
    }
    for (let z = -11; z <= 11; z += step) {
      positions.push(-14, 0.026, z, 14, 0.026, z);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return g;
  }, []);

  return (
    <lineSegments geometry={geo}>
      <lineBasicMaterial color="#e0d8cc" transparent opacity={0.35} />
    </lineSegments>
  );
}

/* ═══════════════════════════════════════════════════
   Traces — copper pathways on the board
   ═══════════════════════════════════════════════════ */
function Traces() {
  const traces = useMemo(() => buildTraces(), []);

  return (
    <group>
      {traces.map((t, i) => {
        const dx = t.x2 - t.x1;
        const dz = t.z2 - t.z1;
        const len = Math.sqrt(dx * dx + dz * dz);
        if (len < 0.01) return null;
        const cx = (t.x1 + t.x2) / 2;
        const cz = (t.z1 + t.z2) / 2;
        const angle = Math.atan2(dx, dz);
        const width = t.thick ? 0.06 : 0.03;

        return (
          <mesh
            key={i}
            position={[cx, 0.036, cz]}
            rotation={[0, angle, 0]}
          >
            <boxGeometry args={[width, 0.02, len]} />
            <meshStandardMaterial
              color="#3a3530"
              metalness={0.3}
              roughness={0.6}
            />
          </mesh>
        );
      })}
    </group>
  );
}

/* ═══════════════════════════════════════════════════
   IC Chip — a single chip on the board
   ═══════════════════════════════════════════════════ */
function ICChip({
  position,
  w,
  h,
  label,
  powered,
  glowIntensity,
}: {
  position: [number, number, number];
  w: number;
  h: number;
  label: string;
  powered: boolean;
  glowIntensity: number;
}) {
  const bodyRef = useRef<THREE.Mesh>(null);
  const pinRefs = useRef<THREE.InstancedMesh>(null);

  // Pin positions along edges
  const pinData = useMemo(() => {
    const pins: { x: number; z: number }[] = [];
    const pinSpacing = 0.15;
    const pinsPerSideW = Math.floor(w / pinSpacing);
    const pinsPerSideH = Math.floor(h / pinSpacing);

    // Top and bottom edges
    for (let i = 0; i < pinsPerSideW; i++) {
      const px = -w / 2 + (i + 0.5) * (w / pinsPerSideW);
      pins.push({ x: px, z: -h / 2 - 0.06 });
      pins.push({ x: px, z: h / 2 + 0.06 });
    }
    // Left and right edges
    for (let i = 0; i < pinsPerSideH; i++) {
      const pz = -h / 2 + (i + 0.5) * (h / pinsPerSideH);
      pins.push({ x: -w / 2 - 0.06, z: pz });
      pins.push({ x: w / 2 + 0.06, z: pz });
    }
    return pins;
  }, [w, h]);

  const emissiveColor = useMemo(() => new THREE.Color("#5a4a3a"), []);

  return (
    <group position={position}>
      {/* Chip body */}
      <mesh ref={bodyRef} position={[0, 0, 0]} castShadow>
        <boxGeometry args={[w, 0.15, h]} />
        <meshStandardMaterial
          color="#2a2520"
          roughness={0.5}
          metalness={0.2}
          emissive={emissiveColor}
          emissiveIntensity={glowIntensity}
        />
      </mesh>

      {/* Notch/dot on chip */}
      <mesh position={[-w / 2 + 0.1, 0.076, -h / 2 + 0.1]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#4a4540" />
      </mesh>

      {/* Pins */}
      {pinData.map((pin, i) => (
        <mesh key={i} position={[pin.x, -0.02, pin.z]}>
          <boxGeometry args={[0.04, 0.06, 0.08]} />
          <meshStandardMaterial color="#8a8078" metalness={0.6} roughness={0.4} />
        </mesh>
      ))}
    </group>
  );
}

/* ═══════════════════════════════════════════════════
   Passive Components — resistors, caps, vias
   ═══════════════════════════════════════════════════ */
function PassiveComponents() {
  const passives = useMemo(() => buildPassives(), []);

  return (
    <group>
      {passives.map((p, i) => {
        if (p.type === "resistor") {
          return (
            <mesh key={i} position={[p.x, 0.06, p.z]} rotation={[0, p.angle, 0]}>
              <boxGeometry args={[0.2, 0.06, 0.08]} />
              <meshStandardMaterial color="#3a3530" roughness={0.6} metalness={0.3} />
            </mesh>
          );
        }
        if (p.type === "capacitor") {
          return (
            <mesh key={i} position={[p.x, 0.075, p.z]}>
              <cylinderGeometry args={[0.05, 0.05, 0.1, 8]} />
              <meshStandardMaterial color="#2a2520" roughness={0.5} metalness={0.4} />
            </mesh>
          );
        }
        // via
        return (
          <mesh key={i} position={[p.x, 0.03, p.z]}>
            <cylinderGeometry args={[0.025, 0.025, 0.06, 8]} />
            <meshStandardMaterial color="#8a8078" metalness={0.7} roughness={0.3} />
          </mesh>
        );
      })}
    </group>
  );
}

/* ═══════════════════════════════════════════════════
   Beam — glowing sphere traveling along traces + trail
   ═══════════════════════════════════════════════════ */
const TRAIL_COUNT = 20;
const LOOP_DURATION = 15; // seconds for full loop

function Beam({
  path,
  pathLength,
  onBeamProgress,
}: {
  path: THREE.Vector3[];
  pathLength: number;
  onBeamProgress: (progress: number) => void;
}) {
  const sphereRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const trailRef = useRef<THREE.InstancedMesh>(null);
  const tempObj = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const progress = (t % LOOP_DURATION) / LOOP_DURATION;
    const dist = progress * pathLength;
    const pos = getPointAtDistance(path, dist);

    // Move beam sphere
    if (sphereRef.current) {
      sphereRef.current.position.copy(pos);
    }
    // Move point light with beam
    if (lightRef.current) {
      lightRef.current.position.copy(pos);
      lightRef.current.position.y += 0.3;
    }

    // Trail particles
    if (trailRef.current) {
      for (let i = 0; i < TRAIL_COUNT; i++) {
        const trailProgress = progress - (i / TRAIL_COUNT) * 0.05;
        const tp = trailProgress < 0 ? trailProgress + 1 : trailProgress;
        const trailDist = tp * pathLength;
        const trailPos = getPointAtDistance(path, trailDist);
        const fade = 1 - i / TRAIL_COUNT;
        const scale = 0.04 * fade;
        tempObj.position.copy(trailPos);
        tempObj.position.y += 0.01;
        tempObj.scale.set(scale, scale, scale);
        tempObj.updateMatrix();
        trailRef.current.setMatrixAt(i, tempObj.matrix);
      }
      trailRef.current.instanceMatrix.needsUpdate = true;
    }

    onBeamProgress(progress);
  });

  return (
    <group>
      {/* Main beam sphere */}
      <mesh ref={sphereRef}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color="#fff5e0"
          emissive="#ffcc88"
          emissiveIntensity={2.5}
          toneMapped={false}
        />
      </mesh>

      {/* Moving point light */}
      <pointLight
        ref={lightRef}
        color="#ffddaa"
        intensity={0.6}
        distance={3}
        decay={2}
      />

      {/* Trail */}
      <instancedMesh ref={trailRef} args={[undefined, undefined, TRAIL_COUNT]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial
          color="#ffcc88"
          emissive="#ffcc88"
          emissiveIntensity={1.5}
          transparent
          opacity={0.6}
          toneMapped={false}
        />
      </instancedMesh>
    </group>
  );
}

/* ═══════════════════════════════════════════════════
   Mouse tilt tracker
   ═══════════════════════════════════════════════════ */
function MouseTilt() {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const { gl } = useThree();

  useEffect(() => {
    const el = gl.domElement;
    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouse.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.current.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    const handleLeave = () => {
      mouse.current.x = 0;
      mouse.current.y = 0;
    };
    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [gl]);

  useFrame(() => {
    if (groupRef.current) {
      const maxTilt = 0.08; // ~5 degrees
      groupRef.current.rotation.x = -0.5 + mouse.current.y * maxTilt;
      groupRef.current.rotation.y = mouse.current.x * maxTilt;
    }
  });

  return <group ref={groupRef} />;
}

/* ═══════════════════════════════════════════════════
   CircuitBoard — main scene group
   ═══════════════════════════════════════════════════ */
function CircuitBoard() {
  const beamPath = useMemo(() => buildBeamPath(), []);
  const pathLength = useMemo(() => getPathLength(beamPath), [beamPath]);
  const chipVisitFractions = useMemo(() => getChipVisitFractions(beamPath), [beamPath]);

  const [chipPowered, setChipPowered] = useState<boolean[]>(new Array(6).fill(false));
  const [chipGlow, setChipGlow] = useState<number[]>(new Array(6).fill(0));
  const chipPoweredRef = useRef<boolean[]>(new Array(6).fill(false));
  const chipGlowRef = useRef<number[]>(new Array(6).fill(0));

  const groupRef = useRef<THREE.Group>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { gl } = useThree();

  // Mouse tracking for tilt
  useEffect(() => {
    const el = gl.domElement;
    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseRef.current.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    const handleLeave = () => {
      mouseRef.current.x = 0;
      mouseRef.current.y = 0;
    };
    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [gl]);

  // Tilt + gentle sway
  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime();
      const maxTilt = 0.08;
      const swayX = Math.sin(t * 0.3) * 0.01;
      const swayZ = Math.cos(t * 0.25) * 0.01;
      groupRef.current.rotation.x = -0.5 + mouseRef.current.y * maxTilt + swayX;
      groupRef.current.rotation.y = mouseRef.current.x * maxTilt + swayZ;
    }

    // Smoothly increase glow for powered chips
    let glowChanged = false;
    const newGlow = [...chipGlowRef.current];
    for (let i = 0; i < 6; i++) {
      const target = chipPoweredRef.current[i] ? 1.2 : 0;
      if (Math.abs(newGlow[i] - target) > 0.01) {
        newGlow[i] += (target - newGlow[i]) * 0.05;
        glowChanged = true;
      }
    }
    if (glowChanged) {
      chipGlowRef.current = newGlow;
      setChipGlow([...newGlow]);
    }
  });

  const handleBeamProgress = useCallback((progress: number) => {
    let changed = false;
    const newPowered = [...chipPoweredRef.current];
    for (let i = 0; i < 6; i++) {
      if (chipVisitFractions[i] !== undefined && progress >= chipVisitFractions[i] && !newPowered[i]) {
        newPowered[i] = true;
        changed = true;
      }
    }
    // Reset all when loop restarts (progress near 0)
    if (progress < 0.02) {
      for (let i = 0; i < 6; i++) {
        if (newPowered[i]) {
          newPowered[i] = false;
          changed = true;
        }
      }
    }
    if (changed) {
      chipPoweredRef.current = newPowered;
      setChipPowered([...newPowered]);
    }
  }, [chipVisitFractions]);

  return (
    <group ref={groupRef} rotation={[-0.5, 0, 0]}>
      <Board />
      <Traces />
      {CHIP_DEFS.map((chip, i) => (
        <ICChip
          key={chip.label}
          position={chip.position}
          w={chip.w}
          h={chip.h}
          label={chip.label}
          powered={chipPowered[i]}
          glowIntensity={chipGlow[i]}
        />
      ))}
      <PassiveComponents />
      <Beam
        path={beamPath}
        pathLength={pathLength}
        onBeamProgress={handleBeamProgress}
      />
    </group>
  );
}

/* ═══════════════════════════════════════════════════
   Export — Canvas wrapper
   ═══════════════════════════════════════════════════ */
export default function CircuitScene({ width, height }: { width: number; height: number }) {
  return (
    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
      <Canvas
        camera={{ position: [0, 5, 2.5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        shadows
      >
        <ambientLight intensity={0.5} color="#fff8f0" />
        <spotLight
          position={[4, 8, 2]}
          intensity={0.6}
          angle={0.5}
          penumbra={0.5}
          castShadow
          shadow-mapSize-width={512}
          shadow-mapSize-height={512}
          color="#fff5e6"
        />
        <CircuitBoard />
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.6}
            intensity={0.8}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
