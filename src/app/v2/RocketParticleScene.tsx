"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import { OrbitControls, Html, Effects } from "@react-three/drei";
import * as THREE from "three";
import { UnrealBloomPass } from "three-stdlib";

extend({ UnrealBloomPass });

/* ─── Mouse tracker (projects pointer onto vertical XY plane) ─── */
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

const SCALE = 0.28;
const X_OFFSET = 0;
const CANVAS_SHIFT = "15%"; // shift entire canvas right

/* ─── Rocket particle swarm ─── */
function RocketSwarm() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 15000;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const target = useMemo(() => new THREE.Vector3(), []);
  const pColor = useMemo(() => new THREE.Color(), []);
  const mouseRef = useRef(new THREE.Vector3(9999, 9999, 9999));
  const hueRef = useRef(0);

  const positions = useMemo(
    () =>
      Array.from({ length: count }, () =>
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
    const time = state.clock.getElapsedTime() * 0.8;

    const rawHue =
      document.documentElement.style.getPropertyValue("--rainbow-hue");
    if (rawHue) hueRef.current = parseFloat(rawHue) / 360;
    const hue = hueRef.current;

    const scale = SCALE;
    const spinSpeed = 0.4;
    const flowSpeed = 0.15;

    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    for (let i = 0; i < count; i++) {
      const u = (i * 0.618033988749895) % 1.0;
      const v = (i * 0.7548776662466927) % 1.0;
      const w = (i * 0.5698402909980532) % 1.0;

      let x = 0,
        y = 0,
        z = 0;
      let lit = 0.5,
        sat = 0.15;
      const isRight = i % 2 === 0 ? 1 : -1;
      let theta = 0;

      if (u < 0.55) {
        // Main hull — wider body, sharper nose cone
        const flow_v = (v + time * flowSpeed) % 1.0;
        y = -25 + 55 * flow_v;
        // Hull radius: wide body tapering sharply to a point
        let r: number;
        if (y < 5) {
          // Lower body — wide cylinder
          r = 7;
        } else if (y < 20) {
          // Upper body — taper to nose
          const t = (y - 5) / 15;
          r = 7 * (1 - t * t); // quadratic taper for sharp nose
        } else {
          r = 0.3; // tip
        }
        theta = w * Math.PI * 2;
        x = r * Math.cos(theta);
        z = r * Math.sin(theta);

        // Bright particles — shading via lightness variation
        if (z > 0) {
          const tileX = Math.cos(theta * 18);
          const tileY = Math.cos(y * 4);
          const tilePattern = Math.pow((tileX + tileY) * 0.5, 2);
          lit = 0.05 + tilePattern * 0.05;
          sat = 0.2;
        } else {
          const viewAngle = theta + time * 1.5 - y * 0.05;
          const shimmer = Math.pow(Math.max(0, Math.sin(viewAngle)), 8);
          const rimLight = Math.pow(Math.max(0, Math.cos(viewAngle)), 4) * 0.3;
          const weldLines = Math.pow(Math.max(0, Math.cos(y * Math.PI * 1.5)), 100) * 0.3;
          lit = 0.3 + shimmer * 0.6 + rimLight + weldLines;
          sat = 0.25;
        }
      } else if (u < 0.80) {
        // 4 large swept-back fins at bottom — triangular, angled
        const finIdx = Math.floor(v * 4);
        const finAngle = (finIdx / 4) * Math.PI * 2 + Math.PI / 4;
        const finT = (v * 4) - finIdx; // 0-1 along fin height
        const finW = w; // 0-1 across fin width

        // Fin: starts at hull bottom, sweeps back and out
        const finHeight = 20;
        const finY = -25 + finT * finHeight; // bottom portion of rocket
        const finMaxExtent = 14; // how far fins stick out
        const finExtent = finMaxExtent * (1 - finT) * finW; // wider at bottom, narrows up
        const finThickness = 0.4;

        const cosF = Math.cos(finAngle);
        const sinF = Math.sin(finAngle);
        const hullR = 7; // match hull radius at bottom
        x = cosF * (hullR + finExtent);
        z = sinF * (hullR + finExtent);
        y = finY;
        // Add slight thickness
        x += sinF * (((i * 0.9123) % 1) - 0.5) * finThickness;
        z -= cosF * (((i * 0.9123) % 1) - 0.5) * finThickness;

        lit = z > 0 ? 0.08 : 0.4;
        sat = z > 0 ? 0.1 : 0.2;
      } else {
        // Exhaust/thruster particles at bottom
        const flow_w = (w + time * 2) % 1.0;
        const exhaustR = 5 * (1 - flow_w * 0.5);
        theta = v * Math.PI * 2;
        x = Math.cos(theta) * exhaustR * flow_w;
        z = Math.sin(theta) * exhaustR * flow_w;
        y = -25 - flow_w * 12;
        lit = 0.5 + (1 - flow_w) * 0.4;
        sat = 0.6;
      }

      // Rotation around Y axis
      const angle = time * spinSpeed + Math.PI / 4;
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);
      const rotX = x * cosA - z * sinA;
      const rotZ = x * sinA + z * cosA;

      target.set(rotX * scale + X_OFFSET, y * scale, rotZ * scale);

      pColor.setHSL(hue, sat, Math.max(0, Math.min(1, lit)));

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
        // Brighten near mouse
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
  color: "rgba(255,255,255,0.8)",
  border: "1px solid rgba(255,255,255,0.25)",
  background: "rgba(0,0,0,0.5)",
  backdropFilter: "blur(4px)",
  padding: "3px 8px",
  whiteSpace: "nowrap",
  pointerEvents: "none",
};

const dotStyle: React.CSSProperties = {
  width: 5,
  height: 5,
  borderRadius: "50%",
  background: "rgba(255,255,255,0.6)",
  flexShrink: 0,
};

const lineStyle: React.CSSProperties = {
  width: 32,
  height: 1,
  background: "rgba(255,255,255,0.3)",
  flexShrink: 0,
};

function RocketLabel({
  position,
  text,
  side = "right",
}: {
  position: [number, number, number];
  text: string;
  side?: "left" | "right";
}) {
  const isLeft = side === "left";
  return (
    <Html position={position} center={false} style={{ pointerEvents: "none" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          flexDirection: isLeft ? "row-reverse" : "row",
          transform: isLeft ? "translateX(-100%)" : undefined,
        }}
      >
        <div style={dotStyle} />
        <div style={lineStyle} />
        <div style={labelStyle}>{text}</div>
      </div>
    </Html>
  );
}

/* Labels attached to a group that rotates with the rocket */
function RocketLabels() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime() * 0.8;
    const angle = time * 0.4 + Math.PI / 4;
    groupRef.current.rotation.y = angle;
  });

  const s = SCALE;
  return (
    <group ref={groupRef} position={[X_OFFSET, 0, 0]}>
      <RocketLabel position={[8 * s, 15 * s, 0]} text="GROWTH ENGINE" side="right" />
      <RocketLabel position={[-8 * s, -20 * s, 0]} text="ACQUISITION" side="left" />
      <RocketLabel position={[8 * s, -5 * s, 0]} text="RETENTION SHIELD" side="right" />
      <RocketLabel position={[-8 * s, 5 * s, 0]} text="STORY SYSTEM" side="left" />
      <RocketLabel position={[15 * s, -15 * s, 0]} text="THRUST FINS" side="right" />
    </group>
  );
}

/* ─── Main scene component ─── */
export default function RocketParticleScene({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 40], fov: 45 }}
      gl={{ alpha: true }}
      style={{
        position: "absolute",
        top: "-18%",
        left: CANVAS_SHIFT,
        width: "100%",
        height: "120%",
      }}
    >
      <RocketSwarm />
      <RocketLabels />
      <OrbitControls
        autoRotate
        autoRotateSpeed={0.4}
        enableZoom={false}
        enablePan={false}
        target={[0, 0, 0]}
      />
      <Effects disableGamma>
        {/* @ts-expect-error — R3F JSX for extended three-stdlib pass */}
        <unrealBloomPass threshold={0.2} strength={0.6} radius={0.3} />
      </Effects>
    </Canvas>
  );
}
