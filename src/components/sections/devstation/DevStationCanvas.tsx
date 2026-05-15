"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { Environment, OrbitControls, ContactShadows } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration, Vignette, Noise } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Vector2, type PerspectiveCamera } from "three";
import { useReducedMotion } from "framer-motion";
import { Suspense, useEffect } from "react";
import { DevStationModel, type ScenePalette } from "./DevStationModel";
import { useThemeObserver } from "./useThemeObserver";

type Props = { paused?: boolean };

/**
 * Widens the camera FOV on narrow / portrait viewports so the laptop + cube
 * swarm always fit. Only touches `fov` (OrbitControls owns distance/target),
 * so it never fights the controls.
 */
function ResponsiveRig() {
  const camera = useThree((s) => s.camera) as PerspectiveCamera;
  const size = useThree((s) => s.size);
  useEffect(() => {
    const a = size.width / size.height;
    camera.fov = a < 0.7 ? 62 : a < 1.0 ? 54 : a < 1.5 ? 48 : 45;
    camera.updateProjectionMatrix();
  }, [camera, size]);
  return null;
}

const DARK_PALETTE: ScenePalette = {
  alu: 0xf2f3f6,
  aluMetal: 0.5,
  aluRough: 0.34,
  envIntensity: 1.8,
  glassColor: 0x0a0c12,
  glassOpacity: 0.34,
  haloOpacity: 0.13,
  lineOpacity: 0.6,
  additive: true,
  keyDark: 0x14151c,
};

// White laptop on a light bg → keep it white (user choice) but raise metalness
// for crisp specular separation, drop env intensity to avoid white-out, and
// make the cubes opaque dark glass chips with solid (non-additive) edges so
// the logos/edges read on white instead of vanishing.
const LIGHT_PALETTE: ScenePalette = {
  alu: 0xf4f5f8,
  aluMetal: 0.72,
  aluRough: 0.26,
  envIntensity: 0.85,
  glassColor: 0x161a26,
  glassOpacity: 0.6,
  haloOpacity: 0.0,
  lineOpacity: 0.92,
  additive: false,
  keyDark: 0x0d0e14,
};

export function DevStationCanvas({ paused = false }: Props) {
  const prefersReduced = useReducedMotion();
  const theme = useThemeObserver();
  const light = theme === "light";
  const palette = light ? LIGHT_PALETTE : DARK_PALETTE;

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
        <Environment preset="studio" background={false} environmentIntensity={light ? 0.7 : 0.45} />
      </Suspense>

      {/* Lighting · 3-point + macbook fill */}
      <ambientLight intensity={light ? 0.55 : 0.28} />
      <directionalLight
        position={[8, 14, 10]}
        intensity={light ? 1.6 : 1.3}
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

      <ResponsiveRig />

      <Suspense fallback={null}>
        <DevStationModel reducedMotion={!!prefersReduced} palette={palette} />
      </Suspense>

      {/* Contact shadow · grounds the white laptop on the (white) light bg */}
      <ContactShadows
        position={[0, -2.4, 0]}
        scale={38}
        blur={2.6}
        far={9}
        opacity={light ? 0.5 : 0.32}
        color={light ? "#1b2233" : "#000000"}
        resolution={1024}
      />

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

      {/* Post · bloom/vignette dialed down in light (white bg blooms out) */}
      <EffectComposer multisampling={0}>
        <Bloom
          intensity={light ? 0.22 : 0.5}
          luminanceThreshold={light ? 0.93 : 0.86}
          luminanceSmoothing={0.3}
          mipmapBlur
          radius={0.6}
        />
        <ChromaticAberration
          offset={new Vector2(0.0012, 0.0012)}
          radialModulation={false}
          modulationOffset={0}
        />
        <Noise premultiply blendFunction={BlendFunction.OVERLAY} opacity={light ? 0.02 : 0.035} />
        <Vignette
          eskil={false}
          offset={light ? 0.3 : 0.25}
          darkness={light ? 0.35 : 0.62}
          blendFunction={BlendFunction.NORMAL}
        />
      </EffectComposer>
    </Canvas>
  );
}
