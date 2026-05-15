"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import {
  HTML5Logo,
  CSS3Logo,
  JavaScriptLogo,
  TypeScriptLogo,
  NextJSLogo,
  ReactLogo,
  ViteLogo,
  TailwindLogo,
  FramerMotionLogo,
  TanStackLogo,
  ZustandLogo,
  ZodLogo,
  ReactHookFormLogo,
  RadixUILogo,
  ShadcnLogo,
  LucideLogo,
  RechartsLogo,
  TiptapLogo,
  XyflowLogo,
  DndKitLogo,
  KonvaLogo,
  NextIntlLogo,
  NextThemesLogo,
  CVALogo,
  ClsxLogo,
} from "./BrandLogos";

type Skill = { name: string; version?: string; Logo: React.ComponentType<{ size?: number; className?: string }> };
type SkillGroup = { label: string; skills: Skill[] };

// Typing loop hook · igual hero (escreve → pausa → apaga → repete)
function useTypingLoop(word: string, typingSpeed = 95, deletingSpeed = 55, pauseTime = 2200) {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseTime);
      return () => clearTimeout(pauseTimer);
    }

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          const next = word.slice(0, text.length + 1);
          setText(next);
          if (next.length === word.length) setIsPaused(true);
        } else {
          const next = word.slice(0, text.length - 1);
          setText(next);
          if (next.length === 0) setIsDeleting(false);
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );
    return () => clearTimeout(timeout);
  }, [text, isDeleting, isPaused, word, typingSpeed, deletingSpeed, pauseTime]);

  return text;
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    label: "FOUNDATIONS",
    skills: [
      { name: "HTML5", Logo: HTML5Logo },
      { name: "CSS3", Logo: CSS3Logo },
      { name: "JavaScript", version: "ES2024", Logo: JavaScriptLogo },
      { name: "TypeScript", version: "5.x strict", Logo: TypeScriptLogo },
    ],
  },
  {
    label: "FRAMEWORKS",
    skills: [
      { name: "Next.js", version: "14 · 16", Logo: NextJSLogo },
      { name: "React", version: "18 · 19", Logo: ReactLogo },
      { name: "Vite", version: "8.x", Logo: ViteLogo },
    ],
  },
  {
    label: "STYLING",
    skills: [
      { name: "Tailwind", version: "3 · 4", Logo: TailwindLogo },
      { name: "CVA", Logo: CVALogo },
      { name: "clsx + merge", Logo: ClsxLogo },
    ],
  },
  {
    label: "STATE & FORMS",
    skills: [
      { name: "TanStack Query", version: "5.90", Logo: TanStackLogo },
      { name: "Zustand", version: "5.0", Logo: ZustandLogo },
      { name: "Zod", version: "3 · 4", Logo: ZodLogo },
      { name: "React Hook Form", version: "7.71", Logo: ReactHookFormLogo },
    ],
  },
  {
    label: "UI / A11Y / VIZ",
    skills: [
      { name: "Radix UI", version: "12 primitives", Logo: RadixUILogo },
      { name: "shadcn patterns", Logo: ShadcnLogo },
      { name: "Lucide", Logo: LucideLogo },
      { name: "Recharts", version: "3.7", Logo: RechartsLogo },
    ],
  },
  {
    label: "MOTION & RICH",
    skills: [
      { name: "Framer Motion", version: "12.38", Logo: FramerMotionLogo },
      { name: "Tiptap", version: "3.19", Logo: TiptapLogo },
      { name: "xyflow", version: "12.10", Logo: XyflowLogo },
      { name: "@dnd-kit", Logo: DndKitLogo },
      { name: "Konva", Logo: KonvaLogo },
      { name: "next-intl", Logo: NextIntlLogo },
      { name: "next-themes", Logo: NextThemesLogo },
    ],
  },
];

const FULL_TITLE = "Frontend & UI";
const SEP_START = "Frontend".length; // 8
const SEP_END = SEP_START + 3; // " & " · index 11
// Part 1 (Frontend): 0..8 · Part separator " & ": 8..11 · Part 2 (UI): 11..13

export function FrontendCardPremium() {
  const t = useTranslations("skills.carousel.frontendPremium");
  const typed = useTypingLoop(FULL_TITLE);

  const part1 = typed.slice(0, SEP_START);
  const sepRaw = typed.slice(SEP_START, SEP_END);
  const part2 = typed.slice(SEP_END);
  const sepHasAmp = sepRaw.includes("&");

  return (
    <div className="frontend-premium">
      <header className="fp-header">
        <span className="fp-eyebrow">{t("eyebrow")}</span>

        <div className="fp-title-row">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/icons/frontend.gif"
            alt=""
            className="fp-title-icon"
            aria-hidden
            loading="lazy"
          />
          <h3 className="fp-title">
            {part1 && (
              <span className="fp-title-gradient" data-text={part1}>{part1}</span>
            )}
            {sepHasAmp && <span className="fp-title-sep">&amp;</span>}
            {part2 && (
              <span className="fp-title-gradient" data-text={part2}>{part2}</span>
            )}
            <span className="fp-title-cursor" aria-hidden>▎</span>
          </h3>
        </div>

        <p className="fp-desc">{t("desc")}</p>
      </header>

      <div className="fp-divider" aria-hidden />

      <section className="fp-stack">
        {SKILL_GROUPS.map((group, gIdx) => (
          <div key={group.label} className="fp-row">
            <span className="fp-row-label">{group.label}</span>
            <div className="fp-pills">
              {group.skills.map((s, i) => (
                <div
                  key={s.name}
                  className="fp-pill"
                  style={{ animationDelay: `${(gIdx * 4 + i) * 24}ms` }}
                >
                  <span className="fp-pill-logo">
                    <s.Logo size={14} />
                  </span>
                  <span className="fp-pill-name">{s.name}</span>
                  {s.version && <span className="fp-pill-version">{s.version}</span>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
