"use client";

import { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group, Mesh } from "three";
import { AdditiveBlending } from "three";
import type { ArchitectureNode } from "../data/skillGraph";

type Props = {
  node: ArchitectureNode;
  reducedMotion: boolean;
  entranceScale?: number;
  onHoverChange?: (node: ArchitectureNode | null) => void;
};

export function SkillNode({ node, reducedMotion, entranceScale = 1, onHoverChange }: Props) {
  const groupRef = useRef<Group>(null);
  const meshRef = useRef<Mesh>(null);
  const glowRef = useRef<Mesh>(null);
  const particlesRef = useRef<Group>(null);

  const [hovered, setHovered] = useState(false);

  const phase = useMemo(
    () => node.position[0] * 0.6 + node.position[1] * 0.4 + node.position[2] * 0.3,
    [node.position]
  );

  const orbitParticles = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      angle: (i / 8) * Math.PI * 2,
      radius: 1.2 + Math.random() * 0.3,
      speed: 0.5 + Math.random() * 0.5,
      yOffset: Math.random() * Math.PI * 2,
    }));
  }, []);

  useFrame((state) => {
    if (reducedMotion) return;
    const t = state.clock.elapsedTime;

    if (meshRef.current) {
      meshRef.current.rotation.x += hovered ? 0.012 : 0.005;
      meshRef.current.rotation.y += hovered ? 0.022 : 0.01;
    }

    if (groupRef.current) {
      const baseY = node.position[1];
      groupRef.current.position.y = baseY + Math.sin(t + phase) * 0.12;
      // Scale combinado · entrance + hover boost
      const hoverBoost = hovered ? 1.18 : 1;
      const targetScale = entranceScale * hoverBoost;
      // Lerp smooth pro target
      const current = groupRef.current.scale.x;
      const next = current + (targetScale - current) * 0.18;
      groupRef.current.scale.setScalar(next);
    }

    if (glowRef.current) {
      const mat = glowRef.current.material as { opacity?: number };
      const targetOpacity = hovered ? 0.28 : 0.10;
      const current = mat.opacity ?? 0.10;
      mat.opacity = current + (targetOpacity - current) * 0.15;
    }

    if (particlesRef.current) {
      particlesRef.current.children.forEach((child, i) => {
        const p = orbitParticles[i];
        if (!p) return;
        p.angle += p.speed * (hovered ? 0.04 : 0.02);
        child.position.x = Math.cos(p.angle) * p.radius;
        child.position.z = Math.sin(p.angle) * p.radius;
        child.position.y = Math.sin(t * 2 + p.yOffset) * 0.3;
      });
    }
  });

  const handleEnter = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setHovered(true);
    onHoverChange?.(node);
    document.body.style.cursor = "pointer";
  };
  const handleLeave = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setHovered(false);
    onHoverChange?.(null);
    document.body.style.cursor = "default";
  };

  return (
    <group
      ref={groupRef}
      position={node.position}
      onPointerOver={handleEnter}
      onPointerOut={handleLeave}
    >
      {/* Core mesh */}
      <mesh ref={meshRef} castShadow receiveShadow>
        {node.shape === "torusKnot" && <torusKnotGeometry args={[0.6, 0.2, 128, 32]} />}
        {node.shape === "icosahedron" && <icosahedronGeometry args={[0.7, 1]} />}
        {node.shape === "dodecahedron" && <dodecahedronGeometry args={[0.7, 0]} />}
        {node.shape === "octahedron" && <octahedronGeometry args={[0.7, 0]} />}
        {node.shape === "torus" && <torusGeometry args={[0.5, 0.3, 16, 100]} />}
        <meshPhysicalMaterial
          color={node.color}
          emissive={node.color}
          emissiveIntensity={hovered ? 0.7 : 0.25}
          metalness={0.9}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          reflectivity={1}
          iridescence={0.85}
          iridescenceIOR={1.35}
          iridescenceThicknessRange={[100, 400]}
          sheen={0.5}
          sheenColor={node.secondary}
          transmission={0.18}
          thickness={0.5}
        />
      </mesh>

      {/* Glow sphere envolvente */}
      <mesh ref={glowRef} scale={[1.5, 1.5, 1.5]}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshBasicMaterial
          color={node.color}
          transparent
          opacity={0.10}
          blending={AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* 8 partículas orbitando */}
      {!reducedMotion && (
        <group ref={particlesRef}>
          {orbitParticles.map((p, i) => (
            <mesh
              key={i}
              position={[Math.cos(p.angle) * p.radius, 0, Math.sin(p.angle) * p.radius]}
            >
              <sphereGeometry args={[0.04, 10, 10]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={0.85} toneMapped={false} />
            </mesh>
          ))}
        </group>
      )}
    </group>
  );
}
