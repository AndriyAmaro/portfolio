"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { AdditiveBlending, type Mesh } from "three";

type Props = { reducedMotion: boolean };

/**
 * Crystal Core · IcosahedronGeometry 1.2 raio (referência exata)
 * + 2 anéis de energia (cyan + purple) com additive blending
 */
export function CrystalCore({ reducedMotion }: Props) {
  const coreRef = useRef<Mesh>(null);
  const ring1Ref = useRef<Mesh>(null);
  const ring2Ref = useRef<Mesh>(null);

  useFrame(() => {
    if (reducedMotion) return;
    if (coreRef.current) {
      coreRef.current.rotation.y += 0.002;
      coreRef.current.rotation.z += 0.001;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z -= 0.001;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x += 0.001;
      ring2Ref.current.rotation.y += 0.002;
    }
  });

  return (
    <group>
      {/* Core cristal · transmission alta */}
      <mesh ref={coreRef} castShadow>
        <icosahedronGeometry args={[1.2, 2]} />
        <meshPhysicalMaterial
          color="#ffffff"
          emissive="#06b6d4"
          emissiveIntensity={0.5}
          metalness={0.1}
          roughness={0}
          transmission={0.9}
          thickness={2}
          clearcoat={1}
          ior={1.5}
        />
      </mesh>

      {/* Anel 1 · cyan · plano XZ */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2, 0.02, 16, 100]} />
        <meshBasicMaterial
          color="#06b6d4"
          transparent
          opacity={0.3}
          blending={AdditiveBlending}
          toneMapped={false}
        />
      </mesh>

      {/* Anel 2 · purple · plano XZ rotacionado */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 2, Math.PI / 4, 0]}>
        <torusGeometry args={[2.5, 0.01, 16, 100]} />
        <meshBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.2}
          blending={AdditiveBlending}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
