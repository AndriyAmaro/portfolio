"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { AdditiveBlending, BufferAttribute, type Points } from "three";

type Props = {
  count?: number;
  reducedMotion: boolean;
};

/**
 * Background ambient particles · drift floating no espaço.
 * Não é GPGPU ainda (vem na Fase 5) · CPU update mas com count baixo (~200) ok.
 */
export function AmbientParticles({ count = 200, reducedMotion }: Props) {
  const pointsRef = useRef<Points>(null);

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 22;
      pos[i3 + 1] = (Math.random() - 0.5) * 16;
      pos[i3 + 2] = (Math.random() - 0.5) * 10 - 2;
      vel[i3] = (Math.random() - 0.5) * 0.012;
      vel[i3 + 1] = (Math.random() - 0.5) * 0.012;
      vel[i3 + 2] = (Math.random() - 0.5) * 0.006;
    }
    return { positions: pos, velocities: vel };
  }, [count]);

  useFrame(() => {
    if (reducedMotion || !pointsRef.current) return;
    const geo = pointsRef.current.geometry;
    const posAttr = geo.attributes.position as BufferAttribute;
    const arr = posAttr.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      arr[i3] += velocities[i3];
      arr[i3 + 1] += velocities[i3 + 1];
      arr[i3 + 2] += velocities[i3 + 2];
      // Wrap around · mantém particles no espaço
      if (Math.abs(arr[i3]) > 12) arr[i3] *= -1;
      if (Math.abs(arr[i3 + 1]) > 9) arr[i3 + 1] *= -1;
      if (Math.abs(arr[i3 + 2] + 2) > 6) arr[i3 + 2] = -2 + (Math.random() - 0.5) * 4;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        color="#a5f3fc"
        transparent
        opacity={0.55}
        depthWrite={false}
        blending={AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}
