"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import {
  DockerLogo,
  DockerComposeLogo,
  NginxLogo,
  CloudflareWorkersLogo,
  CloudflareR2Logo,
  RailwayLogo,
  VercelLogo,
  AwsLogo,
  AzureLogo,
  NixpacksLogo,
  OpenNextLogo,
  WranglerLogo,
  TurborepoLogo,
  PnpmLogo,
  GithubActionsLogo,
  CICDLogo,
  ConventionalCommitsLogo,
  AdrLogo,
  VitestLogo,
  PlaywrightLogo,
  TestingLibraryLogo,
  EslintLogo,
  PrettierLogo,
} from "./DevOpsBrandLogos";

type Skill = { name: string; version?: string; Logo: React.ComponentType<{ size?: number; className?: string }> };
type SkillGroup = { label: string; skills: Skill[] };

// Typing loop hook · igual hero
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

export const SKILL_GROUPS: SkillGroup[] = [
  {
    label: "CONTAINERS",
    skills: [
      { name: "Docker", Logo: DockerLogo },
      { name: "Docker Compose", Logo: DockerComposeLogo },
      { name: "Nginx", Logo: NginxLogo },
    ],
  },
  {
    label: "HOSTING & EDGE",
    skills: [
      { name: "Cloudflare Workers", Logo: CloudflareWorkersLogo },
      { name: "Cloudflare R2", Logo: CloudflareR2Logo },
      { name: "Railway", Logo: RailwayLogo },
      { name: "Vercel", Logo: VercelLogo },
      { name: "AWS", Logo: AwsLogo },
      { name: "Azure", Logo: AzureLogo },
    ],
  },
  {
    label: "BUILD TOOLS",
    skills: [
      { name: "Nixpacks", Logo: NixpacksLogo },
      { name: "OpenNext.js", version: "1.19", Logo: OpenNextLogo },
      { name: "wrangler", version: "4.87", Logo: WranglerLogo },
    ],
  },
  {
    label: "MONOREPO",
    skills: [
      { name: "Turborepo", Logo: TurborepoLogo },
      { name: "pnpm", Logo: PnpmLogo },
    ],
  },
  {
    label: "CI/CD",
    skills: [
      { name: "CI/CD pipelines", Logo: CICDLogo },
      { name: "GitHub Actions", Logo: GithubActionsLogo },
      { name: "Conventional commits", Logo: ConventionalCommitsLogo },
      { name: "ADRs", Logo: AdrLogo },
    ],
  },
  {
    label: "TESTING & QUALITY",
    skills: [
      { name: "Vitest", Logo: VitestLogo },
      { name: "Playwright", Logo: PlaywrightLogo },
      { name: "Testing Library", Logo: TestingLibraryLogo },
      { name: "ESLint", version: "9", Logo: EslintLogo },
      { name: "Prettier", version: "3", Logo: PrettierLogo },
    ],
  },
];

const FULL_TITLE = "DevOps & Edge";
const SEP_START = "DevOps".length; // 6
const SEP_END = SEP_START + 3; // " & " · index 9

export function DevOpsCardPremium() {
  const t = useTranslations("skills.carousel.devopsPremium");
  const typed = useTypingLoop(FULL_TITLE);

  const part1 = typed.slice(0, SEP_START);
  const sepRaw = typed.slice(SEP_START, SEP_END);
  const part2 = typed.slice(SEP_END);
  const sepHasAmp = sepRaw.includes("&");

  return (
    <div className="frontend-premium devops-premium">
      <header className="fp-header">
        <span className="fp-eyebrow">{t("eyebrow")}</span>

        <div className="fp-title-row">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/icons/devops.gif"
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
