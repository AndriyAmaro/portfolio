"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import {
  DoubleSide,
  Group,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  PlaneGeometry,
  SRGBColorSpace,
  Texture,
} from "three";

// sprite sheet 10×6 (60 frames · 256px · RGBA transparente) gerado do
// devops-infinity.gif · animado por offset de UV (1 textura · barato)
const COLS = 10;
const ROWS = 6;
const FRAMES = 60;
const FPS = 25;

type Props = {
  center: Object3D; // esfera central cannon-driven · ∞ vira filho (DENTRO)
  rCenter: number;
  reducedMotion: boolean;
};

export function InfinityCore({ center, rCenter, reducedMotion }: Props) {
  const camera = useThree((s) => s.camera);
  const holderRef = useRef<Group>(null);
  const tex = useTexture("/icons/devops-infinity.png") as Texture;

  const mesh = useMemo(() => {
    tex.colorSpace = SRGBColorSpace;
    tex.repeat.set(1 / COLS, 1 / ROWS);
    tex.offset.set(0, 1 - 1 / ROWS);
    const size = rCenter * 2.5; // ∞ maior · preenche a bolha (Andri)
    const m = new Mesh(
      new PlaneGeometry(size, size),
      new MeshBasicMaterial({
        map: tex,
        transparent: true,
        depthWrite: false,
        toneMapped: false,
        side: DoubleSide,
      })
    );
    m.renderOrder = 0; // antes da casca de vidro (renderOrder 5) → aparece dentro
    return m;
  }, [tex, rCenter]);

  useEffect(() => {
    const holder = holderRef.current;
    if (!holder) return;
    holder.add(mesh);
    center.add(holder); // herda a posição cannon → segue o mouse, no centro
    return () => {
      center.remove(holder);
      holder.remove(mesh);
    };
  }, [center, mesh]);

  useFrame((state) => {
    const h = holderRef.current;
    if (!h) return;
    h.quaternion.copy(camera.quaternion); // billboard · sempre de frente
    if (reducedMotion) return;
    const idx = Math.floor(state.clock.elapsedTime * FPS) % FRAMES;
    const col = idx % COLS;
    const row = Math.floor(idx / COLS);
    tex.offset.set(col / COLS, 1 - (row + 1) / ROWS);
  });

  return <group ref={holderRef} />;
}
