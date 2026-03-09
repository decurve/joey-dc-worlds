"use client";

import { useRef, useMemo, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

/* ─── Deterministic random ─── */
function sr(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

/* ─── Build tree data (once) ─── */
type Segment = { ax: number; ay: number; az: number; bx: number; by: number; bz: number; depth: number; order: number };
type Leaf = { x: number; y: number; z: number; nx: number; ny: number; nz: number; order: number; phase: number; size: number };

function buildTree(maxDepth: number) {
  const segments: Segment[] = [];
  const leaves: Leaf[] = [];
  let order = 0;

  function branch(
    sx: number, sy: number, sz: number,
    dx: number, dy: number, dz: number,
    len: number, depth: number, seed: number
  ) {
    if (depth > maxDepth || len < 0.015) return;

    // Slight curve via midpoint offset
    const bend = 0.08 + sr(seed + 10) * 0.1;
    const mx = sx + dx * len * 0.5 + (sr(seed + 20) - 0.5) * bend;
    const my = sy + dy * len * 0.5 + (sr(seed + 21) - 0.5) * bend * 0.3;
    const mz = sz + dz * len * 0.5 + (sr(seed + 22) - 0.5) * bend;

    const ex = sx + dx * len + (sr(seed + 30) - 0.5) * bend * 0.5;
    const ey = sy + dy * len;
    const ez = sz + dz * len + (sr(seed + 31) - 0.5) * bend * 0.5;

    // Two segments per branch for slight curve
    const o = order++;
    segments.push({ ax: sx, ay: sy, az: sz, bx: mx, by: my, bz: mz, depth, order: o });
    segments.push({ ax: mx, ay: my, az: mz, bx: ex, by: ey, bz: ez, depth, order: o });

    // Leaves at deeper branches
    if (depth >= maxDepth - 2) {
      const leafCount = depth >= maxDepth ? 3 : 2;
      for (let i = 0; i < leafCount; i++) {
        const t = 0.4 + sr(seed + i * 77) * 0.6;
        const lx = sx + (ex - sx) * t + (sr(seed + i * 33) - 0.5) * 0.15;
        const ly = sy + (ey - sy) * t + (sr(seed + i * 44) - 0.5) * 0.1;
        const lz = sz + (ez - sz) * t + (sr(seed + i * 55) - 0.5) * 0.15;
        leaves.push({
          x: lx, y: ly, z: lz,
          nx: dx + (sr(seed + i * 88) - 0.5) * 0.5,
          ny: dy + 0.3,
          nz: dz + (sr(seed + i * 99) - 0.5) * 0.5,
          order: o,
          phase: sr(seed + i * 66) * Math.PI * 2,
          size: 0.03 + sr(seed + i * 11) * 0.04,
        });
      }
    }

    // Sub-branches
    const spread = 0.25 + sr(seed + 1) * 0.35;
    const shrink = 0.62 + sr(seed + 2) * 0.15;
    const twist = (sr(seed + 3) - 0.5) * 0.6;

    // Direction from midpoint to end (natural continuation)
    const cdx = ex - mx, cdy = ey - my, cdz = ez - mz;
    const cl = Math.sqrt(cdx * cdx + cdy * cdy + cdz * cdz) || 1;
    const ndx = cdx / cl, ndy = cdy / cl, ndz = cdz / cl;

    // Perpendicular vectors
    let px = ndz, py = 0, pz = -ndx;
    const pl = Math.sqrt(px * px + pz * pz) || 1;
    px /= pl; pz /= pl;

    // Branch A
    const adx = ndx + px * spread + (sr(seed + 4) - 0.5) * twist;
    const ady = ndy + 0.05;
    const adz = ndz + pz * spread + (sr(seed + 5) - 0.5) * twist;
    const al = Math.sqrt(adx * adx + ady * ady + adz * adz) || 1;
    branch(ex, ey, ez, adx / al, ady / al, adz / al, len * shrink, depth + 1, seed * 2 + 7);

    // Branch B
    const bdx = ndx - px * spread + (sr(seed + 6) - 0.5) * twist;
    const bdy = ndy + 0.05;
    const bdz = ndz - pz * spread + (sr(seed + 7) - 0.5) * twist;
    const bl2 = Math.sqrt(bdx * bdx + bdy * bdy + bdz * bdz) || 1;
    branch(ex, ey, ez, bdx / bl2, bdy / bl2, bdz / bl2, len * shrink, depth + 1, seed * 2 + 13);

    // Extra branches — more frequent for a fuller tree
    if (sr(seed + 8) > 0.3) {
      const cdx2 = ndx + (sr(seed + 9) - 0.5) * 0.6;
      const cdz2 = ndz + (sr(seed + 10) - 0.5) * 0.6;
      const cl2 = Math.sqrt(cdx2 * cdx2 + ndy * ndy + cdz2 * cdz2) || 1;
      branch(ex, ey, ez, cdx2 / cl2, ndy / cl2, cdz2 / cl2, len * shrink * 0.7, depth + 1, seed * 3 + 19);
    }
    // Another extra on lower branches
    if (depth < 3 && sr(seed + 12) > 0.4) {
      const edx = ndx + (sr(seed + 13) - 0.5) * 0.8;
      const edz = ndz + (sr(seed + 14) - 0.5) * 0.8;
      const el2 = Math.sqrt(edx * edx + ndy * ndy + edz * edz) || 1;
      branch(ex, ey, ez, edx / el2, ndy / el2, edz / el2, len * shrink * 0.65, depth + 1, seed * 5 + 23);
    }
  }

  // Main trunk — shifted right so canopy fills the visible staircase area
  branch(0.1, -1.6, 0, 0.06, 1, 0, 0.95, 0, 42);

  // Roots
  branch(0.1, -1.6, 0, -0.3, -0.9, -0.15, 0.35, 4, 101);
  branch(0.1, -1.6, 0, 0.25, -0.95, 0.1, 0.3, 4, 202);
  branch(0.1, -1.6, 0, 0.05, -1, -0.2, 0.25, 4, 303);

  return { segments, leaves, maxOrder: order };
}

/* ─── Leaf geometry: flat diamond/teardrop shape ─── */
function createLeafGeometry() {
  const shape = new THREE.Shape();
  // Teardrop leaf
  shape.moveTo(0, 0.5);       // tip
  shape.quadraticCurveTo(0.25, 0.25, 0.2, 0);
  shape.quadraticCurveTo(0.15, -0.15, 0, -0.3);  // bottom point
  shape.quadraticCurveTo(-0.15, -0.15, -0.2, 0);
  shape.quadraticCurveTo(-0.25, 0.25, 0, 0.5);

  const geo = new THREE.ShapeGeometry(shape, 4);
  return geo;
}

/* ─── All branches as one LineSegments ─── */
function Branches({ segments, maxOrder }: { segments: Segment[]; maxOrder: number }) {
  // Only render fine branches (depth 4+) as lines — trunk is handled by Trunk component
  const fineSegments = useMemo(() => segments.filter(s => s.depth > 3), [segments]);
  const ref = useRef<THREE.LineSegments>(null);
  const growthRef = useRef(0.55);

  // Pre-allocate position buffer (2 vertices per segment)
  const positions = useMemo(() => new Float32Array(fineSegments.length * 2 * 3), [fineSegments]);
  const colors = useMemo(() => new Float32Array(fineSegments.length * 2 * 3), [fineSegments]);

  // Store original positions
  const originals = useMemo(() => {
    const arr = new Float32Array(fineSegments.length * 2 * 3);
    for (let i = 0; i < fineSegments.length; i++) {
      const s = fineSegments[i];
      arr[i * 6] = s.ax; arr[i * 6 + 1] = s.ay; arr[i * 6 + 2] = s.az;
      arr[i * 6 + 3] = s.bx; arr[i * 6 + 4] = s.by; arr[i * 6 + 5] = s.bz;
    }
    return arr;
  }, [fineSegments]);

  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return g;
  }, [positions, colors]);

  useFrame(({ clock }) => {
    const line = ref.current;
    if (!line) return;
    const t = clock.getElapsedTime();
    const growth = growthRef.current;
    const threshold = growth * maxOrder;

    const posAttr = geom.attributes.position as THREE.BufferAttribute;
    const colAttr = geom.attributes.color as THREE.BufferAttribute;
    const pos = posAttr.array as Float32Array;
    const col = colAttr.array as Float32Array;

    for (let i = 0; i < fineSegments.length; i++) {
      const seg = fineSegments[i];
      const segGrowth = Math.min(1, Math.max(0, (threshold - seg.order) / 3));

      if (segGrowth <= 0) {
        // Hide by collapsing to same point
        pos[i * 6] = pos[i * 6 + 3] = 0;
        pos[i * 6 + 1] = pos[i * 6 + 4] = -10;
        pos[i * 6 + 2] = pos[i * 6 + 5] = 0;
      } else {
        // Sway
        const sway = Math.sin(t * 0.8 + seg.depth * 0.5 + seg.order * 0.1) * seg.depth * 0.004;

        pos[i * 6] = originals[i * 6] + sway;
        pos[i * 6 + 1] = originals[i * 6 + 1];
        pos[i * 6 + 2] = originals[i * 6 + 2] + sway * 0.5;

        // Grow end point toward target
        const ox = originals[i * 6 + 3], oy = originals[i * 6 + 4], oz = originals[i * 6 + 5];
        pos[i * 6 + 3] = pos[i * 6] + (ox + sway - pos[i * 6]) * segGrowth;
        pos[i * 6 + 4] = pos[i * 6 + 1] + (oy - pos[i * 6 + 1]) * segGrowth;
        pos[i * 6 + 5] = pos[i * 6 + 2] + (oz + sway * 0.5 - pos[i * 6 + 2]) * segGrowth;
      }

      // Color: darker for trunk, slightly lighter for tips
      const brightness = 0.08 + seg.depth * 0.015;
      const alpha = segGrowth * (0.6 + seg.depth * 0.05);
      col[i * 6] = col[i * 6 + 3] = brightness * alpha;
      col[i * 6 + 1] = col[i * 6 + 4] = brightness * alpha;
      col[i * 6 + 2] = col[i * 6 + 5] = brightness * alpha;
    }

    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;
  });

  // Expose growthRef for parent to drive
  (Branches as any)._growthRef = growthRef;

  return (
    <lineSegments ref={ref} geometry={geom}>
      <lineBasicMaterial vertexColors transparent opacity={0.9} />
    </lineSegments>
  );
}

/* ─── Thick trunk/branches as instanced tapered cylinders (depth 0-3) ─── */
function Trunk({ segments, maxOrder }: { segments: Segment[]; maxOrder: number }) {
  // Filter to only thick branches
  const thickSegs = useMemo(() => segments.filter(s => s.depth <= 3), [segments]);
  const ref = useRef<THREE.InstancedMesh>(null);
  const tempObj = useMemo(() => new THREE.Object3D(), []);
  const tempColor = useMemo(() => new THREE.Color(), []);
  const growthRef = useRef(0.55);

  // Tapered cylinder: top radius smaller than bottom
  const geo = useMemo(() => new THREE.CylinderGeometry(0.5, 1, 1, 8, 1), []);

  useFrame(({ clock }) => {
    const mesh = ref.current;
    if (!mesh) return;
    const t = clock.getElapsedTime();
    const growth = growthRef.current;
    const threshold = growth * maxOrder;

    for (let i = 0; i < thickSegs.length; i++) {
      const seg = thickSegs[i];
      const segGrowth = Math.min(1, Math.max(0, (threshold - seg.order) / 3));

      if (segGrowth <= 0.01) {
        tempObj.scale.set(0, 0, 0);
        tempObj.updateMatrix();
        mesh.setMatrixAt(i, tempObj.matrix);
        continue;
      }

      const sway = Math.sin(t * 0.8 + seg.depth * 0.5 + seg.order * 0.1) * seg.depth * 0.004;

      const ax = seg.ax + sway;
      const ay = seg.ay;
      const az = seg.az + sway * 0.5;

      const bx = ax + (seg.bx + sway - ax) * segGrowth;
      const by = ay + (seg.by - ay) * segGrowth;
      const bz = az + (seg.bz + sway * 0.5 - az) * segGrowth;

      // Position at midpoint
      tempObj.position.set((ax + bx) / 2, (ay + by) / 2, (az + bz) / 2);

      // Orient along segment direction
      const dx = bx - ax, dy = by - ay, dz = bz - az;
      const len = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (len < 0.001) {
        tempObj.scale.set(0, 0, 0);
        tempObj.updateMatrix();
        mesh.setMatrixAt(i, tempObj.matrix);
        continue;
      }

      const dir = new THREE.Vector3(dx / len, dy / len, dz / len);
      tempObj.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);

      // Thickness tapers with depth: trunk=thick, depth 3=thin
      const radiusBase = seg.depth === 0 ? 0.035 : seg.depth === 1 ? 0.022 : seg.depth === 2 ? 0.014 : 0.008;
      const radius = radiusBase * segGrowth;
      tempObj.scale.set(radius, len, radius);

      tempObj.updateMatrix();
      mesh.setMatrixAt(i, tempObj.matrix);

      // Color — dark bark
      const brightness = 0.06 + seg.depth * 0.02;
      tempColor.setRGB(brightness, brightness * 0.95, brightness * 0.9);
      mesh.setColorAt(i, tempColor);
    }

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });

  (Trunk as any)._growthRef = growthRef;

  return (
    <instancedMesh ref={ref} args={[geo, undefined, thickSegs.length]}>
      <meshStandardMaterial
        vertexColors
        roughness={0.9}
        metalness={0.05}
      />
    </instancedMesh>
  );
}

/* ─── Leaves as instanced teardrop shapes ─── */
function Leaves({ leaves, maxOrder }: { leaves: Leaf[]; maxOrder: number }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const tempObj = useMemo(() => new THREE.Object3D(), []);
  const leafGeo = useMemo(() => createLeafGeometry(), []);
  const growthRef = useRef(0.55);

  useFrame(({ clock }) => {
    const mesh = ref.current;
    if (!mesh) return;
    const t = clock.getElapsedTime();
    const growth = growthRef.current;
    const leafStart = 0.2;
    const leafGrowth = Math.max(0, (growth - leafStart) / (1 - leafStart));
    const threshold = leafGrowth * maxOrder;

    for (let i = 0; i < leaves.length; i++) {
      const leaf = leaves[i];
      const lg = Math.min(1, Math.max(0, (threshold - leaf.order) / 5));

      if (lg <= 0) {
        tempObj.scale.set(0, 0, 0);
      } else {
        const sway = Math.sin(t * 1.2 + leaf.phase) * 0.02;
        const bob = Math.sin(t * 0.7 + leaf.phase * 1.5) * 0.01;

        tempObj.position.set(leaf.x + sway, leaf.y + bob, leaf.z + sway * 0.5);

        // Orient leaf to face outward from branch + slight random tilt
        tempObj.lookAt(
          leaf.x + leaf.nx,
          leaf.y + leaf.ny,
          leaf.z + leaf.nz
        );
        // Add gentle rotation animation
        tempObj.rotateZ(Math.sin(t * 0.5 + leaf.phase) * 0.2);

        const s = leaf.size * lg * (0.85 + Math.sin(t * 2 + leaf.phase) * 0.15);
        tempObj.scale.set(s, s, s);
      }
      tempObj.updateMatrix();
      mesh.setMatrixAt(i, tempObj.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  // Expose growthRef
  (Leaves as any)._growthRef = growthRef;

  return (
    <instancedMesh ref={ref} args={[leafGeo, undefined, leaves.length]}>
      <meshStandardMaterial
        color="#1a1a1a"
        side={THREE.DoubleSide}
        transparent
        opacity={0.55}
        roughness={0.6}
        metalness={0.1}
      />
    </instancedMesh>
  );
}

/* ─── Dust particles ─── */
function Dust() {
  const count = 50;
  const ref = useRef<THREE.InstancedMesh>(null);
  const tempObj = useMemo(() => new THREE.Object3D(), []);
  const growthRef = useRef(0.55);

  const data = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      bx: (sr(i * 11) - 0.5) * 3,
      by: sr(i * 22) * 3.5 - 1.5,
      bz: (sr(i * 33) - 0.5) * 3,
      speed: 0.1 + sr(i * 44) * 0.25,
      size: 0.003 + sr(i * 55) * 0.005,
      phase: sr(i * 66) * Math.PI * 2,
    })),
  []);

  useFrame(({ clock }) => {
    const mesh = ref.current;
    if (!mesh) return;
    const t = clock.getElapsedTime();
    const vis = growthRef.current > 0.15 ? Math.min(1, (growthRef.current - 0.15) / 0.3) : 0;

    for (let i = 0; i < count; i++) {
      const d = data[i];
      if (vis <= 0) {
        tempObj.scale.set(0, 0, 0);
      } else {
        tempObj.position.set(
          d.bx + Math.sin(t * d.speed + d.phase) * 0.3,
          d.by + Math.cos(t * d.speed * 0.7 + d.phase) * 0.2,
          d.bz + Math.sin(t * d.speed * 0.5 + d.phase * 2) * 0.3
        );
        const s = d.size * vis * (0.7 + Math.sin(t * 3 + d.phase) * 0.3);
        tempObj.scale.set(s, s, s);
      }
      tempObj.updateMatrix();
      mesh.setMatrixAt(i, tempObj.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  (Dust as any)._growthRef = growthRef;

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 4, 3]} />
      <meshStandardMaterial
        color="#333"
        emissive="#555"
        emissiveIntensity={0.6}
        transparent
        opacity={0.4}
      />
    </instancedMesh>
  );
}

/* ─── Mouse tracker ─── */
function MouseTracker({ onChange }: { onChange: (a: boolean) => void }) {
  const { gl } = useThree();
  useEffect(() => {
    const el = gl.domElement;
    const enter = () => onChange(true);
    const leave = () => onChange(false);
    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);
    return () => { el.removeEventListener("mouseenter", enter); el.removeEventListener("mouseleave", leave); };
  }, [gl, onChange]);
  return null;
}

/* ─── Falling Leaves ─── */
function FallingLeaves() {
  const count = 25;
  const ref = useRef<THREE.InstancedMesh>(null);
  const tempObj = useMemo(() => new THREE.Object3D(), []);
  const leafGeo = useMemo(() => createLeafGeometry(), []);
  const growthRef = useRef(0.55);

  // Each falling leaf: start position, drift speed, spin, etc.
  const data = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      // Start scattered above and within the canopy area
      startX: (sr(i * 17 + 3) - 0.3) * 2.5,
      startY: 0.5 + sr(i * 23 + 7) * 2.0,
      startZ: (sr(i * 31 + 11) - 0.5) * 2,
      // How fast it falls
      fallSpeed: 0.15 + sr(i * 41 + 13) * 0.2,
      // Horizontal drift (gentle sway)
      driftX: (sr(i * 53 + 17) - 0.5) * 0.4,
      driftZ: (sr(i * 61 + 19) - 0.5) * 0.3,
      // Spin/tumble
      spinSpeed: 0.5 + sr(i * 71 + 23) * 1.5,
      spinAxis: sr(i * 79 + 29),
      // Phase offset so they don't all start at the same time
      phase: sr(i * 83 + 31) * 20,
      // Size
      size: 0.025 + sr(i * 89 + 37) * 0.035,
    })),
  []);

  useFrame(({ clock }) => {
    const mesh = ref.current;
    if (!mesh) return;
    const t = clock.getElapsedTime();
    const vis = growthRef.current > 0.3 ? Math.min(1, (growthRef.current - 0.3) / 0.3) : 0;

    for (let i = 0; i < count; i++) {
      const d = data[i];
      if (vis <= 0) {
        tempObj.scale.set(0, 0, 0);
        tempObj.updateMatrix();
        mesh.setMatrixAt(i, tempObj.matrix);
        continue;
      }

      // Loop the fall: each leaf cycles through its own fall duration
      const cycleDuration = 6 + d.phase * 0.5;
      const progress = ((t + d.phase) % cycleDuration) / cycleDuration;

      // Y goes from startY down to below the viewport
      const y = d.startY - progress * 4.5;
      // X and Z drift with a sine wave for that fluttering feel
      const x = d.startX + Math.sin(t * d.driftX * 3 + d.phase) * 0.3 + d.driftX * progress * 2;
      const z = d.startZ + Math.cos(t * d.driftZ * 2.5 + d.phase) * 0.2;

      tempObj.position.set(x, y, z);

      // Tumbling rotation
      tempObj.rotation.set(
        t * d.spinSpeed * 0.5 + d.phase,
        t * d.spinSpeed * d.spinAxis,
        Math.sin(t * 1.5 + d.phase) * 0.8
      );

      // Fade in at top, fade out at bottom
      const fadeIn = Math.min(1, progress * 5);
      const fadeOut = Math.min(1, (1 - progress) * 5);
      const s = d.size * vis * fadeIn * fadeOut;
      tempObj.scale.set(s, s, s);

      tempObj.updateMatrix();
      mesh.setMatrixAt(i, tempObj.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  (FallingLeaves as any)._growthRef = growthRef;

  return (
    <instancedMesh ref={ref} args={[leafGeo, undefined, count]}>
      <meshStandardMaterial
        color="#2a2a2a"
        side={THREE.DoubleSide}
        transparent
        opacity={0.4}
        roughness={0.7}
      />
    </instancedMesh>
  );
}

/* ─── Scene ─── */
function TreeInner() {
  const [active, setActive] = useState(false);
  const growthRef = useRef(0.55);

  const tree = useMemo(() => buildTree(8), []);
  const handleMouse = useCallback((a: boolean) => setActive(a), []);

  // Drive all child growth refs imperatively (no re-renders)
  // Tree auto-grows to 0.55 on load, speeds up on hover, maxes at 1
  useFrame((_, delta) => {
    if (active) {
      growthRef.current = Math.min(1, growthRef.current + delta * 0.12);
    } else {
      // Slowly grow even without hover, settling at 0.65
      if (growthRef.current < 0.65) {
        growthRef.current = Math.min(0.65, growthRef.current + delta * 0.04);
      } else {
        growthRef.current = Math.max(0.65, growthRef.current - delta * 0.02);
      }
    }
    // Push growth to children via their exposed refs
    if ((Trunk as any)._growthRef) (Trunk as any)._growthRef.current = growthRef.current;
    if ((Branches as any)._growthRef) (Branches as any)._growthRef.current = growthRef.current;
    if ((Leaves as any)._growthRef) (Leaves as any)._growthRef.current = growthRef.current;
    if ((Dust as any)._growthRef) (Dust as any)._growthRef.current = growthRef.current;
    if ((FallingLeaves as any)._growthRef) (FallingLeaves as any)._growthRef.current = growthRef.current;
  });

  return (
    <>
      <MouseTracker onChange={handleMouse} />

      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 3]} intensity={0.9} />
      <directionalLight position={[-3, 4, -2]} intensity={0.25} />

      <group position={[0.3, -0.1, 0]} scale={0.88}>
        <Trunk segments={tree.segments} maxOrder={tree.maxOrder} />
        <Branches segments={tree.segments} maxOrder={tree.maxOrder} />
        <Leaves leaves={tree.leaves} maxOrder={tree.maxOrder} />
        <FallingLeaves />
        <Dust />
      </group>

      <EffectComposer>
        <Bloom intensity={0.15} luminanceThreshold={0.3} luminanceSmoothing={0.95} mipmapBlur />
      </EffectComposer>
    </>
  );
}

/* ─── Export ─── */
export default function TreeScene({ width, height }: { width: number; height: number }) {
  return (
    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
      <Canvas
        camera={{ position: [0, 0.2, 3], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <TreeInner />
      </Canvas>
    </div>
  );
}
