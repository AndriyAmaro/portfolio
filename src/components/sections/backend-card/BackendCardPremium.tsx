"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import {
  NodejsLogo,
  TypeScriptLogo,
  RestApiLogo,
  ExpressLogo,
  HonoLogo,
  RedisLogo,
  BullMQLogo,
  SocketIOLogo,
  JwtLogo,
  JoseLogo,
  BcryptLogo,
  HelmetLogo,
  ZodLogo,
  CorsLogo,
  RateLimitLogo,
  SentryLogo,
  WinstonLogo,
  PinoLogo,
  SwaggerLogo,
  StripeLogo,
  ResendLogo,
  SharpLogo,
  MulterLogo,
  PuppeteerLogo,
} from "./BackendBrandLogos";

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

const SKILL_GROUPS: SkillGroup[] = [
  {
    label: "FOUNDATIONS",
    skills: [
      { name: "Node.js", version: "22.x", Logo: NodejsLogo },
      { name: "TypeScript", version: "5.x strict", Logo: TypeScriptLogo },
      { name: "REST API", Logo: RestApiLogo },
    ],
  },
  {
    label: "FRAMEWORKS",
    skills: [
      { name: "Express", version: "4 · 5", Logo: ExpressLogo },
      { name: "Hono", version: "4.7", Logo: HonoLogo },
    ],
  },
  {
    label: "REAL-TIME",
    skills: [
      { name: "Socket.io", version: "4.8", Logo: SocketIOLogo },
      { name: "Redis Pub/Sub", Logo: RedisLogo },
      { name: "BullMQ", version: "5.70", Logo: BullMQLogo },
    ],
  },
  {
    label: "AUTH & SECURITY",
    skills: [
      { name: "JWT", Logo: JwtLogo },
      { name: "Jose", version: "6.0", Logo: JoseLogo },
      { name: "bcrypt", Logo: BcryptLogo },
      { name: "Helmet", Logo: HelmetLogo },
      { name: "Zod", version: "3 · 4", Logo: ZodLogo },
      { name: "CORS", Logo: CorsLogo },
      { name: "Rate Limit", Logo: RateLimitLogo },
    ],
  },
  {
    label: "OBSERVABILITY",
    skills: [
      { name: "Sentry", version: "10.43", Logo: SentryLogo },
      { name: "Winston", version: "3.17", Logo: WinstonLogo },
      { name: "Pino", version: "10.3", Logo: PinoLogo },
      { name: "Swagger UI", Logo: SwaggerLogo },
    ],
  },
  {
    label: "INTEGRATIONS",
    skills: [
      { name: "Stripe", version: "20.3", Logo: StripeLogo },
      { name: "Resend", version: "6.9", Logo: ResendLogo },
      { name: "Sharp", version: "0.34", Logo: SharpLogo },
      { name: "Multer", version: "2.1", Logo: MulterLogo },
      { name: "Puppeteer", Logo: PuppeteerLogo },
    ],
  },
];

const FULL_TITLE = "Backend & APIs";
const SEP_START = "Backend".length; // 7
const SEP_END = SEP_START + 3; // " & " · index 10

export function BackendCardPremium() {
  const t = useTranslations("skills.carousel.backendPremium");
  const typed = useTypingLoop(FULL_TITLE);

  const part1 = typed.slice(0, SEP_START);
  const sepRaw = typed.slice(SEP_START, SEP_END);
  const part2 = typed.slice(SEP_END);
  const sepHasAmp = sepRaw.includes("&");

  return (
    <div className="frontend-premium backend-premium">
      <header className="fp-header">
        <span className="fp-eyebrow">{t("eyebrow")}</span>

        <div className="fp-title-row">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/icons/backend.gif"
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
