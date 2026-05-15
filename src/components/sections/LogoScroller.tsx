"use client";

/**
 * LogoScroller · Endless Flow seamless logo scroller with GSAP
 *
 * Adapted from CodePen `pvoaXRv` by Mark Sottek (MIT)
 * https://codepen.io/mark_sottek/pen/pvoaXRv
 *
 * Uses real brand SVG logos from the project's BrandLogos files.
 * Each row clones content until total width ≥ 2x viewport, then GSAP
 * timeline animates `x: -50%` infinitely. Pause on hover/touch.
 */

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

// Reuse existing brand logos (SVG inline · simple-icons brand-accurate)
import {
  NextJSLogo,
  ReactLogo,
  TypeScriptLogo,
  TailwindLogo,
  FramerMotionLogo,
  TanStackLogo,
  ZodLogo,
  SocketIOLogo,
} from "./frontend-card/BrandLogos";
import {
  NodejsLogo,
  ExpressLogo,
  HonoLogo,
  PrismaLogo,
  PostgresLogo,
  RedisLogo,
  StripeLogo,
} from "./backend-card/BackendBrandLogos";
import {
  DockerLogo,
  CloudflareR2Logo,
  RailwayLogo,
  VercelLogo,
  TurborepoLogo,
  PnpmLogo,
  GithubActionsLogo,
  VitestLogo,
  PlaywrightLogo,
} from "./devops-card/DevOpsBrandLogos";

type LogoEntry = {
  name: string;
  Logo: React.FC<{ size?: number; className?: string }>;
};

// Curated list · ONLY brand-accurate logos (removed generic-looking ones:
// Zustand, pgvector, BullMQ, JWT · they're abstract icons, not real brand marks).
const LOGOS: LogoEntry[] = [
  { name: "Next.js",        Logo: NextJSLogo },
  { name: "React",          Logo: ReactLogo },
  { name: "TypeScript",     Logo: TypeScriptLogo },
  { name: "Tailwind CSS",   Logo: TailwindLogo },
  { name: "Framer Motion",  Logo: FramerMotionLogo },
  { name: "TanStack Query", Logo: TanStackLogo },
  { name: "Zod",            Logo: ZodLogo },
  { name: "Socket.io",      Logo: SocketIOLogo },
  { name: "Node.js",        Logo: NodejsLogo },
  { name: "Express",        Logo: ExpressLogo },
  { name: "Hono",           Logo: HonoLogo },
  { name: "Prisma",         Logo: PrismaLogo },
  { name: "PostgreSQL",     Logo: PostgresLogo },
  { name: "Redis",          Logo: RedisLogo },
  { name: "Stripe",         Logo: StripeLogo },
  { name: "Docker",         Logo: DockerLogo },
  { name: "Cloudflare R2",  Logo: CloudflareR2Logo },
  { name: "Railway",        Logo: RailwayLogo },
  { name: "Vercel",         Logo: VercelLogo },
  { name: "Turborepo",      Logo: TurborepoLogo },
  { name: "pnpm",           Logo: PnpmLogo },
  { name: "GitHub Actions", Logo: GithubActionsLogo },
  { name: "Vitest",         Logo: VitestLogo },
  { name: "Playwright",     Logo: PlaywrightLogo },
];

export function LogoScroller() {
  const rowRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    // === Endless Flow GSAP setup · clone items until row ≥ 2x viewport ===
    const items = Array.from(row.children) as HTMLElement[];
    let rowWidth = row.scrollWidth;
    const containerWidth = window.innerWidth;

    if (!row.dataset.cloned) {
      let totalWidth = rowWidth;
      while (totalWidth < containerWidth * 2) {
        items.forEach((item) => {
          const clone = item.cloneNode(true) as HTMLElement;
          // aria-hidden on clones for screen readers
          clone.setAttribute("aria-hidden", "true");
          row.appendChild(clone);
          totalWidth += item.offsetWidth;
        });
      }
      rowWidth = row.scrollWidth;
      row.dataset.cloned = "true";
    }

    gsap.set(row, { x: 0 });

    // dynamic duration · proportional to total width
    const baseSpeed = 28;
    let duration = (rowWidth / containerWidth) * baseSpeed;
    if (window.innerWidth < 768) duration *= 1.5;

    const tl = gsap.timeline({ repeat: -1, defaults: { ease: "none" } });
    tl.to(row, {
      x: `-${rowWidth / 2}px`,
      duration,
      ease: "none",
      onComplete: () => {
        gsap.set(row, { x: 0 });
      },
    });
    timelineRef.current = tl;

    // pause/resume interactions
    const onEnter = () => tl.pause();
    const onLeave = () => tl.resume();
    row.addEventListener("mouseenter", onEnter);
    row.addEventListener("mouseleave", onLeave);
    row.addEventListener("touchstart", onEnter, { passive: true });
    row.addEventListener("touchend",   onLeave, { passive: true });

    return () => {
      tl.kill();
      timelineRef.current = null;
      row.removeEventListener("mouseenter", onEnter);
      row.removeEventListener("mouseleave", onLeave);
      row.removeEventListener("touchstart", onEnter);
      row.removeEventListener("touchend",   onLeave);
    };
  }, []);

  return (
    <div className="logo-scroller relative w-screen left-1/2 -translate-x-1/2 overflow-hidden py-14">
      {/* Edge fade mask · WebKit + standard */}
      <div
        className="overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
        }}
      >
        <div
          ref={rowRef}
          className="logo-scroller-row flex items-center gap-16 md:gap-20 will-change-transform"
          aria-label="Tech stack used across the portfolio"
        >
          {LOGOS.map(({ name, Logo }, i) => (
            <div
              key={`${name}-${i}`}
              className="logo-scroller-item flex-shrink-0 flex items-center gap-4 opacity-80 hover:opacity-100 transition-opacity duration-200"
              title={name}
            >
              <Logo size={48} />
              <span className="text-base md:text-lg font-medium text-white/85 whitespace-nowrap tracking-wide">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LogoScroller;
