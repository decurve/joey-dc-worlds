"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { OrbitControls, Html, Effects } from "@react-three/drei";
import * as THREE from "three";
import { UnrealBloomPass } from "three-stdlib";

extend({ UnrealBloomPass });

function GrowthReactor() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 15000;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const target = useMemo(() => new THREE.Vector3(), []);
  const pColor = useMemo(() => new THREE.Color(), []);
  const hueRef = useRef(0);

  const positions = useMemo(() => {
    return Array.from({ length: count }, () =>
      new THREE.Vector3(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100
      )
    );
  }, []);

  const material = useMemo(() => new THREE.MeshBasicMaterial({ color: 0xffffff }), []);
  const geometry = useMemo(() => new THREE.TetrahedronGeometry(0.25), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime() * 0.8;

    // Read rainbow hue from CSS variable
    const rawHue = document.documentElement.style.getPropertyValue("--rainbow-hue");
    if (rawHue) hueRef.current = parseFloat(rawHue) / 360;
    const hue = hueRef.current;

    let idx = 0;

    /* ── Containment Rings: 6 rings, ~1200 particles each ── */
    const ringParticles = 1200;
    for (let ring = 0; ring < 6; ring++) {
      const ringRadius = 8 + ring * 3;
      const direction = ring % 2 === 0 ? 1 : -1;
      const ringSpeed = 0.3 + ring * 0.05;
      const verticalOffset = Math.sin(time * 0.5 + ring * 1.2) * 1.5;
      const pulse = 1.0 + Math.sin(time * 1.5 + ring * 0.8) * 0.15;

      for (let p = 0; p < ringParticles; p++) {
        const angle =
          (p / ringParticles) * Math.PI * 2 +
          time * ringSpeed * direction;

        const tubeRadius = 1.2 + Math.sin(angle * 3 + time) * 0.3;
        const tubeAngle = (p * 7.3 + ring * 137) % (Math.PI * 2);

        const mainX = Math.cos(angle) * ringRadius * pulse;
        const mainZ = Math.sin(angle) * ringRadius * pulse;

        target.set(
          mainX + Math.cos(angle) * Math.cos(tubeAngle) * tubeRadius,
          verticalOffset + Math.sin(tubeAngle) * tubeRadius,
          mainZ + Math.sin(angle) * Math.cos(tubeAngle) * tubeRadius
        );
        positions[idx].lerp(target, 0.1);

        // Rainbow hue, medium saturation, dimmer
        const brightness = 0.5 + Math.sin(time * 2 + angle * 2) * 0.1;
        pColor.setHSL(hue, 0.55, 0.25 * brightness * pulse);

        dummy.position.copy(positions[idx]);
        dummy.updateMatrix();
        meshRef.current!.setMatrixAt(idx, dummy.matrix);
        meshRef.current!.setColorAt(idx, pColor);
        idx++;
      }
    }

    /* ── Core: 3000 particles — turbulent plasma ball ── */
    const coreCount = 3000;
    for (let p = 0; p < coreCount; p++) {
      const phi = (p / coreCount) * Math.PI * 2 * 20 + time * 2;
      const theta = (p / coreCount) * Math.PI + time * 0.7;
      const coreRadius =
        4.5 +
        Math.sin(phi * 3 + time * 3) * 1.5 +
        Math.cos(theta * 5 + time * 2) * 0.8;

      const tx = Math.sin(theta) * Math.cos(phi) * coreRadius;
      const ty = Math.sin(theta) * Math.sin(phi) * coreRadius * 0.6;
      const tz = Math.cos(theta) * coreRadius;

      const turbX = Math.sin(time * 4 + p * 0.1) * 0.8;
      const turbY = Math.cos(time * 3.5 + p * 0.13) * 0.8;
      const turbZ = Math.sin(time * 3 + p * 0.17) * 0.8;

      target.set(tx + turbX, ty + turbY, tz + turbZ);
      positions[idx].lerp(target, 0.1);

      // Core: brightest, full saturation rainbow
      const cBright = 0.5 + Math.sin(time * 5 + p * 0.5) * 0.15;
      pColor.setHSL(hue, 0.7, 0.35 * cBright);

      dummy.position.copy(positions[idx]);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(idx, dummy.matrix);
      meshRef.current!.setColorAt(idx, pColor);
      idx++;
    }

    /* ── Energy Arcs: 6 arcs × 800 particles ── */
    const arcCount = 800;
    for (let arc = 0; arc < 6; arc++) {
      const arcAngleBase = (arc / 6) * Math.PI * 2 + time * 0.2;
      const innerR = 6;
      const outerR = 20 + Math.sin(time + arc * 1.5) * 3;

      for (let p = 0; p < arcCount; p++) {
        const t01 = p / arcCount;
        const arcProgress = (t01 + time * 0.5 + arc * 0.3) % 1.0;

        const r = innerR + (outerR - innerR) * arcProgress;
        const arcAngle = arcAngleBase + (arcProgress - 0.5) * 0.8;

        const jitterScale = 2.0 * Math.sin(arcProgress * Math.PI);
        const jitterX = Math.sin(p * 13.7 + time * 8) * jitterScale;
        const jitterY = Math.cos(p * 17.3 + time * 7) * jitterScale;
        const jitterZ = Math.sin(p * 11.1 + time * 9) * jitterScale;

        target.set(
          Math.cos(arcAngle) * r + jitterX,
          jitterY + Math.sin(time * 2 + arc) * 2,
          Math.sin(arcAngle) * r + jitterZ
        );
        positions[idx].lerp(target, 0.1);

        // Arcs: slightly shifted hue, fade at ends
        const fade = Math.sin(arcProgress * Math.PI);
        const flicker = 0.5 + Math.sin(time * 10 + p * 3) * 0.2;
        pColor.setHSL((hue + 0.05) % 1, 0.6, 0.2 * fade * flicker);

        dummy.position.copy(positions[idx]);
        dummy.updateMatrix();
        meshRef.current!.setMatrixAt(idx, dummy.matrix);
        meshRef.current!.setColorAt(idx, pColor);
        idx++;
      }
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor)
      meshRef.current.instanceColor.needsUpdate = true;
  });

  return <instancedMesh ref={meshRef} args={[geometry, material, count]} />;
}

/* ─── Floating 3D labels with leader lines ─── */
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

function ReactorLabel({ position, text }: { position: [number, number, number]; text: string }) {
  return (
    <Html position={position} center={false} style={{ pointerEvents: "none" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <div style={dotStyle} />
        <div style={lineStyle} />
        <div style={labelStyle}>{text}</div>
      </div>
    </Html>
  );
}

function ReactorLabels() {
  return (
    <>
      <ReactorLabel position={[6, 0, 0]} text="GROWTH ENGINE" />
      <ReactorLabel position={[18, -3, 8]} text="FLYWHEEL RING" />
      <ReactorLabel position={[-12, 2, -10]} text="ACQUISITION" />
      <ReactorLabel position={[14, 4, -6]} text="CATALYST ARC" />
      <ReactorLabel position={[-8, -2, 14]} text="RETENTION FIELD" />
    </>
  );
}

export default function ReactorScene({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  return (
    <Canvas
      camera={{ position: [0, 30, 60], fov: 50 }}
      gl={{ alpha: true }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <GrowthReactor />
      <ReactorLabels />
      <OrbitControls
        autoRotate
        autoRotateSpeed={0.5}
        enableZoom={false}
        enablePan={false}
      />
      <Effects disableGamma>
        {/* @ts-expect-error — R3F JSX for extended three-stdlib pass */}
        <unrealBloomPass threshold={0.2} strength={0.8} radius={0.3} />
      </Effects>
    </Canvas>
  );
}
