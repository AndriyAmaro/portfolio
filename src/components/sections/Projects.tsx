"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  ArrowRight,
  Lightbulb,
  Zap,
  AlertTriangle,
  TestTubes,
  Layers,
  Globe,
  Shield,
  Cpu,
  Database,
  Radio,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { AbstractBackground, AbstractBackgroundLight } from "../ui/AbstractBackground";

// ---------------------------------------------------------------------------
// Project Logo SVG Components
// ---------------------------------------------------------------------------
function PulseDSLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="pulse-ds-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366F1" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="8" fill="url(#pulse-ds-grad)" />
      <path d="M8 20H14L17 12L20 28L23 16L26 20H32" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PulseChatLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="2 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="pulse-chat-grad" x1="2" y1="2" x2="62" y2="58" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2DD1B1" />
          <stop offset="1" stopColor="#0D7768" />
        </linearGradient>
      </defs>
      <path d="M12 2H52A10 10 0 0 1 62 12V32A10 10 0 0 1 52 42H22L10 58L14 42A10 10 0 0 1 2 32V12A10 10 0 0 1 12 2Z" fill="url(#pulse-chat-grad)" />
      <polyline points="8,22 16,22 20,22 24,8 30,36 34,14 37,22 44,22 56,22" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PulseFinanceLogo({ className }: { className?: string }) {
  return (
    <Image src="/projects/finance-icon.png" alt="Pulse Finance" width={64} height={48} className={className + " !w-16 !h-12 object-contain"} />
  );
}

// ---------------------------------------------------------------------------
// Enhanced project data
// ---------------------------------------------------------------------------
interface ProjectData {
  id: string;
  name: string;
  tKey: string;
  logoComponent: "pulse-ds" | "pulse-chat" | "pulse-finance";
  color: "indigo" | "teal" | "emerald";
  metricValues: { key: string; value: string }[];
  highlightIcons: (typeof Layers)[];
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  screenshots: string[];
}

const projectsData: ProjectData[] = [
  {
    id: "pulse-ds",
    name: "Pulse Design System",
    tKey: "pulseDs",
    logoComponent: "pulse-ds",
    color: "indigo",
    metricValues: [
      { key: "components", value: "100+" },
      { key: "pages", value: "56" },
      { key: "dashboards", value: "25" },
      { key: "languages", value: "3" },
    ],
    highlightIcons: [Layers, Globe, Shield],
    tech: ["Next.js 16", "React 19", "TypeScript", "Tailwind 4", "Radix UI", "next-intl"],
    liveUrl: "https://pulse-saas-theme.andrifullstack.workers.dev",
    githubUrl: "https://github.com/AndriyAmaro/pulse-saas-theme",
    screenshots: ["/projects/ds-1.jpeg", "/projects/ds-2.jpeg", "/projects/ds-3.jpeg"],
  },
  {
    id: "pulse-chat",
    name: "Pulse Chat",
    tKey: "pulseChat",
    logoComponent: "pulse-chat",
    color: "teal",
    metricValues: [
      { key: "tests", value: "98" },
      { key: "wsEvents", value: "32" },
      { key: "components", value: "40+" },
      { key: "uptime", value: "99%" },
    ],
    highlightIcons: [Radio, Cpu, Database],
    tech: ["React 19", "Express 5", "Socket.io", "Prisma 7", "PostgreSQL", "Docker"],
    liveUrl: "https://realtime-chat.andrifullstack.workers.dev",
    githubUrl: "https://github.com/AndriyAmaro/realtime-chat",
    screenshots: ["/projects/chat-1.jpeg", "/projects/chat-2.jpeg", "/projects/chat-3.jpeg"],
  },
  {
    id: "pulse-finance",
    name: "Pulse Finance",
    tKey: "pulseFinance",
    logoComponent: "pulse-finance",
    color: "emerald",
    metricValues: [
      { key: "tests", value: "143" },
      { key: "architecture", value: "Clean" },
      { key: "cache", value: "Redis" },
      { key: "jobs", value: "BullMQ" },
    ],
    highlightIcons: [Shield, Cpu, Database],
    tech: ["Next.js 15", "Hono 4", "Prisma 6", "PostgreSQL", "Redis", "BullMQ"],
    liveUrl: "https://dashboard-finance.andrifullstack.workers.dev",
    githubUrl: "https://github.com/AndriyAmaro/finance-flow",
    screenshots: ["/projects/finance-1.jpeg", "/projects/finance-2.jpeg", "/projects/finance-3.jpeg"],
  },
];

// ---------------------------------------------------------------------------
// Color system
// ---------------------------------------------------------------------------
const colors = {
  indigo: {
    gradient: "from-indigo-500 to-violet-500",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
    text: "text-indigo-400",
    dot: "bg-indigo-400",
    glow: "shadow-indigo-500/25",
    ring: "ring-indigo-500/30",
    dotActive: "bg-indigo-400",
    dotInactive: "bg-indigo-400/30",
  },
  teal: {
    gradient: "from-teal-500 to-cyan-500",
    bg: "bg-teal-500/10",
    border: "border-teal-500/20",
    text: "text-teal-400",
    dot: "bg-teal-400",
    glow: "shadow-teal-500/25",
    ring: "ring-teal-500/30",
    dotActive: "bg-teal-400",
    dotInactive: "bg-teal-400/30",
  },
  emerald: {
    gradient: "from-emerald-500 to-green-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    text: "text-emerald-400",
    dot: "bg-emerald-400",
    glow: "shadow-emerald-500/25",
    ring: "ring-emerald-500/30",
    dotActive: "bg-emerald-400",
    dotInactive: "bg-emerald-400/30",
  },
} as const;

// ---------------------------------------------------------------------------
// Screenshot Carousel
// ---------------------------------------------------------------------------
function ScreenshotCarousel({ screenshots, color, name }: { screenshots: string[]; color: keyof typeof colors; name: string }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const c = colors[color];

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % screenshots.length);
    }, 4000);
  }, [screenshots.length]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const go = (dir: number) => {
    setDirection(dir);
    setCurrent((prev) => (prev + dir + screenshots.length) % screenshots.length);
    startTimer();
  };

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
    startTimer();
  };

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <div className="proj-carousel relative w-full aspect-[16/9] rounded-xl overflow-hidden group/carousel">
      {/* Screenshots */}
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={screenshots[current]}
            alt={`${name} screenshot ${current + 1}`}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient overlay bottom */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

      {/* Navigation arrows */}
      <button
        onClick={() => go(-1)}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-200 hover:bg-black/60"
        aria-label="Previous"
      >
        <ChevronLeft className="w-4 h-4 text-white" />
      </button>
      <button
        onClick={() => go(1)}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-200 hover:bg-black/60"
        aria-label="Next"
      >
        <ChevronRight className="w-4 h-4 text-white" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1.5">
        {screenshots.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              i === current ? `${c.dotActive} w-4` : `${c.dotInactive} hover:opacity-60`
            }`}
            aria-label={`Screenshot ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Project Logo renderer
// ---------------------------------------------------------------------------
function ProjectLogo({ type, className }: { type: ProjectData["logoComponent"]; className?: string }) {
  switch (type) {
    case "pulse-ds":
      return <PulseDSLogo className={className} />;
    case "pulse-chat":
      return <PulseChatLogo className={className} />;
    case "pulse-finance":
      return <PulseFinanceLogo className={className} />;
  }
}

// ---------------------------------------------------------------------------
// Project Card Component
// ---------------------------------------------------------------------------
function ProjectCard({ project, index, t }: { project: ProjectData; index: number; t: { (key: string): string; raw: (key: string) => unknown } }) {
  const c = colors[project.color];
  const [expanded, setExpanded] = useState(false);
  const highlights = t.raw(`${project.tKey}.highlights`) as string[];
  const challenges = t.raw(`${project.tKey}.challenges`) as string[];

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group h-full"
    >
      <div className={`proj-card relative rounded-2xl overflow-hidden border ${c.border} transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${c.glow} h-full flex flex-col`}>
        {/* Top gradient bar */}
        <div className={`h-1 bg-gradient-to-r ${c.gradient}`} />

        {/* Glow blob */}
        <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${c.gradient} opacity-0 group-hover:opacity-[0.06] rounded-full blur-3xl transition-opacity duration-700`} />

        {/* Screenshot carousel */}
        <div className="p-4 pb-0">
          <ScreenshotCarousel screenshots={project.screenshots} color={project.color} name={project.name} />
        </div>

        <div className="p-5 pt-4 flex-1 flex flex-col">
          {/* Header with real logo */}
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <ProjectLogo type={project.logoComponent} className="w-10 h-10" />
            </div>
            <div className="min-w-0">
              <h3 className="proj-card-title text-lg font-bold leading-tight">{project.name}</h3>
              <p className={`text-xs font-medium ${c.text} proj-card-tagline`}>{t(`${project.tKey}.tagline`)}</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed mb-4 proj-card-description">{t(`${project.tKey}.description`)}</p>

          {/* Metrics grid - responsive text */}
          <div className="grid grid-cols-4 gap-1.5 mb-4">
            {project.metricValues.map((m) => (
              <div key={m.key} className="proj-metric text-center py-2 px-1 rounded-lg overflow-hidden">
                <div className={`text-sm font-bold ${c.text} truncate`}>{m.value}</div>
                <div className="text-[8px] sm:text-[9px] font-semibold uppercase tracking-wider proj-metric-label truncate">{t(`${project.tKey}.metrics.${m.key}`)}</div>
              </div>
            ))}
          </div>

          {/* Architecture highlights */}
          <div className="space-y-1.5 mb-4">
            {highlights.map((text, i) => {
              const Icon = project.highlightIcons[i];
              return (
                <div key={i} className="flex items-center gap-2 proj-highlight">
                  <Icon className={`w-3.5 h-3.5 ${c.text} shrink-0`} />
                  <span className="text-xs proj-highlight-text">{text}</span>
                </div>
              );
            })}
          </div>

          {/* Expandable Problem → Solution */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full flex items-center justify-between py-2 px-3 rounded-lg mb-3 proj-expand-btn transition-all duration-200"
            aria-expanded={expanded}
          >
            <span className="text-xs font-semibold proj-expand-label flex items-center gap-1.5">
              <Lightbulb className={`w-3.5 h-3.5 ${c.text}`} />
              {t("problemSolution")}
            </span>
            <ArrowRight
              className={`w-3.5 h-3.5 proj-expand-icon transition-transform duration-300 ${expanded ? "rotate-90" : ""}`}
            />
          </button>

          <motion.div
            initial={false}
            animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="space-y-3 pb-3">
              {/* Problem */}
              <div className="flex gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400/80">{t("problemLabel")}</span>
                  <p className="text-xs proj-problem-text leading-relaxed">{t(`${project.tKey}.problem`)}</p>
                </div>
              </div>
              {/* Solution */}
              <div className="flex gap-2">
                <Zap className={`w-4 h-4 ${c.text} shrink-0 mt-0.5`} />
                <div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${c.text} opacity-80`}>{t("solutionLabel")}</span>
                  <p className="text-xs proj-solution-text leading-relaxed">{t(`${project.tKey}.solution`)}</p>
                </div>
              </div>
              {/* Challenges */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {challenges.map((ch, i) => (
                  <span key={i} className="proj-challenge-chip px-2 py-0.5 rounded-md text-[10px] font-medium">
                    {ch}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Tech */}
          <div className="flex flex-wrap gap-1.5 mb-4 mt-auto">
            {project.tech.map((t) => (
              <span key={t} className="proj-tech-chip px-2.5 py-1 rounded-lg text-[11px] font-medium">
                {t}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-0">
              <button className={`w-full flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 bg-gradient-to-r ${c.gradient} text-white hover:shadow-lg ${c.glow} hover:opacity-90`}>
                <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{t("liveDemo")}</span>
              </button>
            </a>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-0">
              <button className="w-full proj-btn-code flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300">
                <Github className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{t("viewCode")}</span>
              </button>
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// ---------------------------------------------------------------------------
// Count-up for total tests
// ---------------------------------------------------------------------------
function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return { count, ref };
}

// ---------------------------------------------------------------------------
// Main Projects Section
// ---------------------------------------------------------------------------
export function Projects() {
  const t = useTranslations("projects");
  const [isLightMode, setIsLightMode] = useState(false);
  const totalTests = useCountUp(381, 2000);

  useEffect(() => {
    const checkTheme = () => {
      setIsLightMode(document.documentElement.classList.contains("light-mode"));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="relative py-24 md:py-32 overflow-hidden">
      {isLightMode ? <AbstractBackgroundLight /> : <AbstractBackground />}

      <div className="container-custom relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full proj-section-badge mb-6"
          >
            <TestTubes className="w-3.5 h-3.5 proj-badge-icon" />
            <span className="text-xs font-semibold tracking-wider uppercase proj-badge-text">
              <span ref={totalTests.ref} className="tabular-nums">{totalTests.count}</span>+ {t("badge")}
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t("title")} <span className="gradient-text">{t("titleHighlight")}</span>
          </h2>
          <p className="projects-subtitle max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} t={t} />
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/AndriyAmaro"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <div className="github-cta-btn group inline-flex items-center gap-3 px-6 py-3 rounded-full font-medium transition-all duration-300 hover:-translate-y-1">
              <Github className="w-5 h-5" />
              <span>{t("githubCta")}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
