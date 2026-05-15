"use client";

import { SkillConstellation } from "./components/SkillConstellation";
import type { ArchitectureNode } from "./data/skillGraph";

type Props = {
  reducedMotion: boolean;
  onHoverChange?: (node: ArchitectureNode | null) => void;
};

export function ConstellationScene({ reducedMotion, onHoverChange }: Props) {
  return <SkillConstellation reducedMotion={reducedMotion} onHoverChange={onHoverChange} />;
}
