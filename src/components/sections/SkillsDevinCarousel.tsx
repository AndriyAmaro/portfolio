"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CardKey = "frontend" | "backend" | "devops";
const CARDS: CardKey[] = ["frontend", "backend", "devops"];

const STACK: Record<CardKey, { featured: string[]; rest: string[] }> = {
  frontend: {
    featured: ["Next.js 14", "React 18"],
    rest: ["TypeScript", "Tailwind CSS", "Framer Motion", "TanStack Query", "Zustand", "Tiptap", "xyflow"],
  },
  backend: {
    featured: ["Node.js", "TypeScript"],
    rest: ["Express", "Prisma", "PostgreSQL", "pgvector", "Redis", "BullMQ", "Zod"],
  },
  devops: {
    featured: ["Docker", "Cloudflare"],
    rest: ["Railway", "GitHub Actions", "Sentry", "Winston", "Vitest", "Playwright", "Turborepo"],
  },
};

const VISUAL_TILES: Record<CardKey, string[]> = {
  frontend: ["Next.js", "React 18", "Tailwind", "Framer", "TypeScript", "TanStack", "Tiptap", "xyflow", "shadcn"],
  backend: ["Postgres", "REST", "pgvector", "Prisma", "Redis", "Webhooks", "Socket.io", "BullMQ", "Zod"],
  devops: ["Docker", "Cloudflare", "Railway", "GitHub CI", "Sentry", "Vitest", "Playwright", "Winston", "Turborepo"],
};

function CardIconSVG({ k }: { k: CardKey }) {
  if (k === "frontend") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    );
  }
  if (k === "backend") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
        <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}

function VisualTileIcon({ idx, k }: { idx: number; k: CardKey }) {
  // Reuse same set of generic tech icons mapped by index per card
  const icons: Record<CardKey, React.ReactNode[]> = {
    frontend: [
      <svg key="0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 18.5 8.5 18.5 15.5 12 22 5.5 15.5 5.5 8.5" /></svg>,
      <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="2" /><ellipse cx="12" cy="12" rx="11" ry="4.5" /><ellipse cx="12" cy="12" rx="11" ry="4.5" transform="rotate(60 12 12)" /><ellipse cx="12" cy="12" rx="11" ry="4.5" transform="rotate(120 12 12)" /></svg>,
      <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round"><path d="M3 3h18v18H3z" /><path d="M9 9h6v6H9z" /></svg>,
      <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round"><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /><path d="M12 2L2 7l10 5 10-5z" /></svg>,
      <svg key="4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" /></svg>,
      <svg key="5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M2 12h20M12 2a15 15 0 010 20" /></svg>,
      <svg key="6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>,
      <svg key="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="3" /><circle cx="18" cy="18" r="3" /><path d="M9 6h9a3 3 0 013 3v6" /></svg>,
      <svg key="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>,
    ],
    backend: [
      <svg key="0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" /><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" /></svg>,
      <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 010 18" /></svg>,
      <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 18.5 8.5 18.5 15.5 12 22 5.5 15.5 5.5 8.5" /><circle cx="12" cy="12" r="2" /></svg>,
      <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L4 7l8 5 8-5-8-5z" /><path d="M4 12l8 5 8-5M4 17l8 5 8-5" /></svg>,
      <svg key="4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /></svg>,
      <svg key="5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>,
      <svg key="6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" /></svg>,
      <svg key="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 9h6v6H9z" /></svg>,
      <svg key="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" /></svg>,
    ],
    devops: [
      <svg key="0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="9" width="18" height="10" rx="1" /><rect x="6" y="6" width="12" height="3" /></svg>,
      <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round"><path d="M8 17l-4-4 4-4" /><path d="M16 17l4-4-4-4" /><line x1="14" y1="6" x2="10" y2="20" /></svg>,
      <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>,
      <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="12" r="3" /><path d="M6 9v6M9 6h6M9 18h6" /></svg>,
      <svg key="4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 22h20L12 2z" /><path d="M12 16v.01M12 9v4" /></svg>,
      <svg key="5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" /></svg>,
      <svg key="6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /><polyline points="9 11 12 14 17 9" /></svg>,
      <svg key="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><line x1="6" y1="8" x2="18" y2="8" /><line x1="6" y1="12" x2="14" y2="12" /></svg>,
      <svg key="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" /></svg>,
    ],
  };
  return icons[k][idx] ?? null;
}

export function SkillsDevinCarousel() {
  const t = useTranslations("skills.carousel");
  const sectionRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(1); // backend default
  const [fullyOpen, setFullyOpen] = useState(false);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const AUTO_MS = 8000;

  const resetProgress = useCallback(() => {
    if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    setProgress(0);
    if (paused || !fullyOpen) return;
    const tick = AUTO_MS / 100;
    let p = 0;
    progressTimerRef.current = setInterval(() => {
      p += 1;
      setProgress(p);
      if (p >= 100) {
        if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      }
    }, tick);
  }, [paused, fullyOpen]);

  const autoAdvance = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (paused || !fullyOpen) return;
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % CARDS.length);
    }, AUTO_MS);
  }, [paused, fullyOpen]);

  const goTo = useCallback((idx: number) => {
    setActive(((idx % CARDS.length) + CARDS.length) % CARDS.length);
    setPaused(true);
    if (timerRef.current) clearInterval(timerRef.current);
    if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    setTimeout(() => setPaused(false), 9000);
  }, []);

  // Reset progress + auto-advance when active or open state changes
  useEffect(() => {
    resetProgress();
    autoAdvance();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, [active, fullyOpen, paused, resetProgress, autoAdvance]);

  // Scroll-driven progress
  useEffect(() => {
    let rafId = 0;
    const update = () => {
      const section = sectionRef.current;
      const shell = shellRef.current;
      if (!section || !shell) return;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const sectionHeight = section.offsetHeight;
      const scrolledInto = -rect.top;
      const totalScroll = sectionHeight - vh;
      const raw = Math.max(0, Math.min(1, scrolledInto / Math.max(1, totalScroll)));
      const easedP = raw * raw * (3 - 2 * raw);
      shell.style.setProperty("--p", easedP.toFixed(3));
      if (easedP >= 0.85 && !fullyOpen) {
        setFullyOpen(true);
      } else if (easedP < 0.5 && fullyOpen) {
        setFullyOpen(false);
      }
    };
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [fullyOpen]);

  return (
    <section ref={sectionRef} className="skills-carousel-section" aria-label="Skills overview">
      <div ref={shellRef} className={`skills-carousel-shell ${fullyOpen ? "is-fully-open" : ""}`}>
        <div className="skills-carousel-track">
          {CARDS.map((key, idx) => {
            const isActive = idx === active;
            return (
              <div
                key={key}
                data-color={key}
                data-idx={idx}
                className={`skill-carousel-card ${fullyOpen ? (isActive ? "is-active" : "is-peek") : ""}`}
                onClick={() => {
                  if (fullyOpen && !isActive) goTo(idx);
                }}
                onMouseEnter={() => {
                  if (!fullyOpen) return;
                  setPaused(true);
                  if (timerRef.current) clearInterval(timerRef.current);
                  if (progressTimerRef.current) clearInterval(progressTimerRef.current);
                }}
                onMouseLeave={() => {
                  if (!fullyOpen) return;
                  setPaused(false);
                }}
              >
                {/* Collapsed icon · phase 1 */}
                <div className="collapsed-icon" aria-hidden>
                  <div className="collapsed-icon-inner">
                    <CardIconSVG k={key} />
                  </div>
                </div>

                {/* Peek bar · vertical */}
                <div className="peek-hint" aria-hidden>
                  <span className="peek-num">0{idx + 1}</span>
                  <div className="peek-icon">
                    <CardIconSVG k={key} />
                  </div>
                  <span className="peek-title">{t(`${key}.eyebrow`).split(" · ")[1] ?? key}</span>
                </div>

                {/* Active full content */}
                <div className="card-content-active">
                  <div className="card-left">
                    <span className="card-eyebrow">{t(`${key}.eyebrow`)}</span>
                    <div className="card-icon-wrap">
                      <CardIconSVG k={key} />
                    </div>
                    <h3 className="card-title-h3" style={{ whiteSpace: "pre-line" }}>
                      {t(`${key}.title`)}
                    </h3>
                    <p className="card-desc">{t(`${key}.desc`)}</p>
                    <div className="card-stack">
                      {STACK[key].featured.map((tag) => (
                        <span key={tag} className="stack-tag featured">
                          {tag}
                        </span>
                      ))}
                      {STACK[key].rest.map((tag) => (
                        <span key={tag} className="stack-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="card-metrics">
                      {(t.raw(`${key}.metrics`) as Array<{ num: string; label: string }>).map((m) => (
                        <div key={m.label} className="metric">
                          <span className="metric-num">{m.num}</span>
                          <span className="metric-label">{m.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="card-right">
                    <div className="visual-grid">
                      {VISUAL_TILES[key].map((label, i) => (
                        <div key={label} className="visual-tile">
                          <VisualTileIcon idx={i} k={key} />
                          <span className="visual-tile-label">{label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className={`skills-carousel-controls ${fullyOpen ? "is-visible" : ""}`}>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="controls-right">
          <span className="counter">
            {String(active + 1).padStart(2, "0")} / {String(CARDS.length).padStart(2, "0")}
          </span>
          <div className="dots" role="tablist">
            {CARDS.map((_, i) => (
              <button
                key={i}
                className={`dot-btn ${i === active ? "active" : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Card ${i + 1}`}
              />
            ))}
          </div>
          <div className="nav-arrows">
            <button className="nav-btn" onClick={() => goTo(active - 1)} aria-label="Anterior">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="nav-btn" onClick={() => goTo(active + 1)} aria-label="Próximo">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
