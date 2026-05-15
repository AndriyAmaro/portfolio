"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration, Vignette, Noise } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Vector2 } from "three";
import { useReducedMotion } from "framer-motion";
import { Suspense } from "react";
import { DevStationModel, type ScenePalette } from "./DevStationModel";

type Props = { paused?: boolean };

// Fase 4 · dark palette (Fase 5 troca via observer do html.light-mode)
const DARK_PALETTE: ScenePalette = {
  alu: 0xf2f3f6,
  aluMetal: 0.5,
  aluRough: 0.34,
  envIntensity: 1.8,
  glassColor: 0x0a0c12,
  glassOpacity: 0.34,
  haloOpacity: 0.13,
  keyDark: 0x14151c,
};

export function DevStationCanvas({ paused = false }: Props) {
  const prefersReduced = useReducedMotion();

  return (
    <Canvas
      className="devstation-canvas"
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 2]}
      camera={{ position: [0, 3, 37], fov: 45, near: 0.1, far: 300 }}
      frameloop={paused ? "never" : "always"}
      shadows
      aria-hidden
    >
      <Suspense fallback={null}>
        <Environment preset="studio" background={false} environmentIntensity={0.45} />
      </Suspense>

      {/* Lighting · 3-point + macbook fill */}
      <ambientLight intensity={0.28} />
      <directionalLight
        position={[8, 14, 10]}
        intensity={1.3}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0005}
        shadow-camera-left={-22}
        shadow-camera-right={22}
        shadow-camera-top={22}
        shadow-camera-bottom={-22}
      />
      <directionalLight position={[-8, 4, 6]} intensity={0.3} />
      <pointLight position={[-10, 4, -6]} intensity={1.5} distance={40} decay={2} color="#6ee7ff" />
      <pointLight position={[10, 4, -6]} intensity={1.3} distance={40} decay={2} color="#818cf8" />
      <spotLight
        position={[0, 10, 18]}
        intensity={1.05}
        distance={70}
        angle={Math.PI / 4.5}
        penumbra={0.65}
        decay={1.4}
        color="#ffffff"
        target-position={[0, 1.4, 0]}
      />

      <Suspense fallback={null}>
        <DevStationModel reducedMotion={!!prefersReduced} palette={DARK_PALETTE} />
      </Suspense>

      <OrbitControls
        enableDamping
        dampingFactor={0.06}
        enablePan={false}
        enableZoom={false}
        minPolarAngle={0.5}
        maxPolarAngle={Math.PI * 0.6}
        minAzimuthAngle={-Math.PI / 3.5}
        maxAzimuthAngle={Math.PI / 3.5}
        target={[0, 1.4, 0]}
      />

      {/* Post · contained bloom + subtle CA + grain + vignette */}
      <EffectComposer multisampling={0}>
        <Bloom
          intensity={0.5}
          luminanceThreshold={0.86}
          luminanceSmoothing={0.3}
          mipmapBlur
          radius={0.6}
        />
        <ChromaticAberration
          offset={new Vector2(0.0012, 0.0012)}
          radialModulation={false}
          modulationOffset={0}
        />
        <Noise premultiply blendFunction={BlendFunction.OVERLAY} opacity={0.035} />
        <Vignette eskil={false} offset={0.25} darkness={0.62} blendFunction={BlendFunction.NORMAL} />
      </EffectComposer>
    </Canvas>
  );
}
