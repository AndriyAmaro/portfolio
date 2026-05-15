"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { ARCHITECTURE_NODES, type ArchitectureNode } from "../data/skillGraph";
import { SkillNode } from "./SkillNode";
import { SkillConnection } from "./SkillConnection";
import { CrystalCore } from "./CrystalCore";
import { AmbientParticles } from "./AmbientParticles";

type Props = {
  reducedMotion: boolean;
  onHoverChange?: (node: ArchitectureNode | null) => void;
};

/**
 * Constellation completa · core + anéis + 5 architecture nodes + connections radiais
 * OrbitControls (no Canvas) cuida do auto-rotate · este só faz entrance animation.
 */
export function SkillConstellation({ reducedMotion, onHoverChange }: Props) {
  const startTimeRef = useRef<number | null>(null);
  const [entranceProgress, setEntranceProgress] = useState<number[]>(
    () => ARCHITECTURE_NODES.map(() => (reducedMotion ? 1 : 0))
  );

  useFrame((state) => {
    if (reducedMotion) return;
    if (startTimeRef.current === null) {
      startTimeRef.current = state.clock.elapsedTime;
    }
    const elapsed = state.clock.elapsedTime - startTimeRef.current;
    if (elapsed > 4) return;

    const newProgress = ARCHITECTURE_NODES.map((_, i) => {
      const delay = i * 0.2;
      const t = Math.max(0, Math.min(1, (elapsed - delay) / 1.5));
      if (t === 0) return 0;
      if (t === 1) return 1;
      return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1;
    });
    setEntranceProgress(newProgress);
  });

  return (
    <>
      <AmbientParticles count={200} reducedMotion={reducedMotion} />

      <CrystalCore reducedMotion={reducedMotion} />

      {ARCHITECTURE_NODES.map((node) => (
        <SkillConnection key={`conn-${node.id}`} node={node} />
      ))}

      {ARCHITECTURE_NODES.map((node, i) => (
        <SkillNode
          key={node.id}
          node={node}
          reducedMotion={reducedMotion}
          entranceScale={entranceProgress[i] ?? 1}
          onHoverChange={onHoverChange}
        />
      ))}
    </>
  );
}
