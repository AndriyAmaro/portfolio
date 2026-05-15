"use client";

import { useMemo } from "react";
import { QuadraticBezierCurve3, Vector3, AdditiveBlending } from "three";
import { Line } from "@react-three/drei";
import type { ArchitectureNode } from "../data/skillGraph";

type Props = {
  /** Node de destino · sempre conecta a partir do crystal core (0,0,0) */
  node: ArchitectureNode;
};

/**
 * Conexão radial · curve Bezier do crystal core até o node
 * Mid-point com Z offset +2 (dá curve real saindo pra frente)
 * Additive blending = glow soft cinematic
 */
export function SkillConnection({ node }: Props) {
  const points = useMemo(() => {
    const start = new Vector3(0, 0, 0);
    const end = new Vector3(...node.position);
    // Mid-point: position * 0.5 + (0,0,2) · referência exata
    const mid = end.clone().multiplyScalar(0.5).add(new Vector3(0, 0, 2));
    const curve = new QuadraticBezierCurve3(start, mid, end);
    return curve.getPoints(50);
  }, [node.position]);

  return (
    <Line
      points={points}
      color={node.color}
      lineWidth={1.2}
      transparent
      opacity={0.32}
      blending={AdditiveBlending}
      depthWrite={false}
      toneMapped={false}
    />
  );
}
