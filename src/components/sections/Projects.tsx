"use client";

import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  ExternalLink,
  Github,
  ArrowRight,
  Lightbulb,
  Zap,
  AlertTriangle,
  Palette,
  MessageCircle,
  BarChart3,
  TestTubes,
  Layers,
  Globe,
  Shield,
  Cpu,
  Database,
  Radio,
} from "lucide-react";
import { useRef } from "react";
import { ProjectsBackground, ProjectsBackgroundLight } from "../ui/ProjectsBackground";

// ---------------------------------------------------------------------------
// Enhanced project data (self-contained for maximum control)
// ---------------------------------------------------------------------------
interface ProjectData {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: typeof Palette;
  color: "indigo" | "teal" | "emerald";
  metrics: { label: string; value: string }[];
  highlights: { icon: typeof Layers; text: string }[];
  problem: string;
  solution: string;
  challenges: string[];
  tech: string[];
  liveUrl: string;
  githubUrl: string;
}

const projectsData: ProjectData[] = [
  {
    id: "pulse-ds",
    name: "Pulse Design System",
    tagline: "A fundação do ecossistema",
    description:
      "Design system production-grade com Atomic Design, 25 variantes de dashboard, animacoes SVG customizadas e acessibilidade completa com Radix UI.",
    icon: Palette,
    color: "indigo",
    metrics: [
      { label: "Componentes", value: "100+" },
      { label: "Paginas", value: "56" },
      { label: "Dashboards", value: "25" },
      { label: "Idiomas", value: "3" },
    ],
    highlights: [
      { icon: Layers, text: "Atomic Design · Tokens → Pages" },
      { icon: Globe, text: "i18n com pathname routing" },
      { icon: Shield, text: "Acessibilidade Radix UI" },
    ],
    problem:
      "Componentes repetidos em cada projeto, sem consistencia visual nem reutilizacao real.",
    solution:
      "Design system unificado com tokens, primitivos e padroes que alimenta todos os SaaS do ecossistema.",
    challenges: [
      "100+ componentes consistentes",
      "i18n em 3 idiomas",
      "Animacoes SVG sem JS",
    ],
    tech: ["Next.js 16", "React 19", "TypeScript", "Tailwind 4", "Radix UI", "next-intl"],
    liveUrl: "https://pulse-saas-theme.vercel.app",
    githubUrl: "https://github.com/AndriyAmaro/pulse-saas-theme",
  },
  {
    id: "pulse-chat",
    name: "Pulse Chat",
    tagline: "Real-time communication",
    description:
      "Chat full-stack com WebSocket, 32 eventos tipados, queue offline com retry exponencial e 40+ componentes adaptados do Design System.",
    icon: MessageCircle,
    color: "teal",
    metrics: [
      { label: "Testes", value: "98" },
      { label: "Eventos WS", value: "32" },
      { label: "Componentes", value: "40+" },
      { label: "Uptime", value: "99%" },
    ],
    highlights: [
      { icon: Radio, text: "WebSocket com reconnection sync" },
      { icon: Cpu, text: "Queue offline + exponential backoff" },
      { icon: Database, text: "3-layer backend architecture" },
    ],
    problem:
      "Ir alem de CRUD · comunicacao real-time com estado concorrente e resiliencia.",
    solution:
      "Arquitetura event-driven com type safety end-to-end e mecanismos de recuperacao automatica.",
    challenges: [
      "Estado concorrente multi-user",
      "Queue offline com retry",
      "40+ componentes adaptados",
    ],
    tech: ["React 19", "Express 5", "Socket.io", "Prisma 7", "PostgreSQL", "Docker"],
    liveUrl: "https://realtime-chat-eight-beryl.vercel.app",
    githubUrl: "https://github.com/AndriyAmaro/realtime-chat",
  },
  {
    id: "pulse-finance",
    name: "Pulse Finance",
    tagline: "Financial dashboard",
    description:
      "SaaS financeiro multi-tenant com Clean Architecture, API Hono type-safe, cache Redis e background jobs com BullMQ.",
    icon: BarChart3,
    color: "emerald",
    metrics: [
      { label: "Testes", value: "143" },
      { label: "Arquitetura", value: "Clean" },
      { label: "Cache", value: "Redis" },
      { label: "Jobs", value: "BullMQ" },
    ],
    highlights: [
      { icon: Shield, text: "Multi-tenancy com isolamento" },
      { icon: Cpu, text: "Background jobs assincronos" },
      { icon: Database, text: "Cache invalidation Redis" },
    ],
    problem:
      "Demonstrar arquitetura production-ready com multi-tenancy, cache e processamento assincrono.",
    solution:
      "Clean Architecture com camadas definidas, Redis para performance e BullMQ para jobs pesados.",
    challenges: [
      "Multi-tenancy isolado",
      "Cache invalidation",
      "CSV import background",
    ],
    tech: ["Next.js 15", "Hono 4", "Prisma 6", "PostgreSQL", "Redis", "BullMQ"],
    liveUrl: "https://dashboard-finance-swart.vercel.app",
    githubUrl: "https://github.com/AndriyAmaro/finance-flow",
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
    challengeBg: "bg-indigo-500/8",
    challengeBorder: "border-indigo-500/15",
  },
  teal: {
    gradient: "from-teal-500 to-cyan-500",
    bg: "bg-teal-500/10",
    border: "border-teal-500/20",
    text: "text-teal-400",
    dot: "bg-teal-400",
    glow: "shadow-teal-500/25",
    ring: "ring-teal-500/30",
    challengeBg: "bg-teal-500/8",
    challengeBorder: "border-teal-500/15",
  },
  emerald: {
    gradient: "from-emerald-500 to-green-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    text: "text-emerald-400",
    dot: "bg-emerald-400",
    glow: "shadow-emerald-500/25",
    ring: "ring-emerald-500/30",
    challengeBg: "bg-emerald-500/8",
    challengeBorder: "border-emerald-500/15",
  },
} as const;

// ---------------------------------------------------------------------------
// App Mockup SVG (mini preview of what the app looks like)
// ---------------------------------------------------------------------------
function AppMockup({ color, type }: { color: string; type: string }) {
  const c = colors[color as keyof typeof colors];

  return (
    <div className={`proj-mockup relative w-full aspect-[16/9] rounded-xl overflow-hidden ${c.border} border`}>
      {/* Browser chrome */}
      <div className="proj-mockup-chrome flex items-center gap-1.5 px-3 py-2">
        <div className="w-2 h-2 rounded-full bg-red-400/60" />
        <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
        <div className="w-2 h-2 rounded-full bg-green-400/60" />
        <div className="proj-mockup-url ml-2 flex-1 h-4 rounded-md" />
      </div>
      {/* App content mockup */}
      <div className="p-3 space-y-2">
        {type === "design-system" && (
          <>
            <div className="flex gap-2">
              <div className={`w-8 h-full min-h-[60px] rounded-lg ${c.bg} proj-mockup-sidebar`} />
              <div className="flex-1 space-y-2">
                <div className="proj-mockup-bar h-3 rounded-md w-3/4" />
                <div className="grid grid-cols-3 gap-1.5">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className={`proj-mockup-card h-8 rounded-lg ${i === 0 ? c.bg : ''}`} />
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
        {type === "chat" && (
          <>
            <div className="flex gap-2 h-[68px]">
              <div className="w-16 space-y-1.5 proj-mockup-sidebar rounded-lg p-1.5">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className={`proj-mockup-bar h-2.5 rounded-md ${i === 0 ? c.bg : ''}`} />
                ))}
              </div>
              <div className="flex-1 flex flex-col justify-end gap-1">
                <div className="proj-mockup-msg-left w-2/3 h-4 rounded-lg rounded-bl-sm" />
                <div className={`proj-mockup-msg-right self-end w-1/2 h-4 rounded-lg rounded-br-sm ${c.bg}`} />
                <div className="proj-mockup-msg-left w-3/5 h-4 rounded-lg rounded-bl-sm" />
              </div>
            </div>
          </>
        )}
        {type === "finance" && (
          <>
            <div className="space-y-2">
              <div className="flex gap-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className={`flex-1 proj-mockup-card h-7 rounded-lg ${i === 0 ? c.bg : ''}`} />
                ))}
              </div>
              <div className={`proj-mockup-chart h-10 rounded-lg ${c.bg} relative overflow-hidden`}>
                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 40">
                  <path
                    d="M0 35 Q15 30, 25 25 T50 18 T75 12 T100 8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={c.text}
                    opacity="0.5"
                  />
                </svg>
              </div>
              <div className="flex gap-1.5">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex-1 proj-mockup-bar h-2 rounded-md" />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      {/* Shimmer overlay */}
      <div className="absolute inset-0 proj-mockup-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </div>
  );
}

const mockupTypes: Record<string, string> = {
  "pulse-ds": "design-system",
  "pulse-chat": "chat",
  "pulse-finance": "finance",
};

// ---------------------------------------------------------------------------
// Project Card Component
// ---------------------------------------------------------------------------
function ProjectCard({ project, index }: { project: ProjectData; index: number }) {
  const c = colors[project.color];
  const Icon = project.icon;
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group"
    >
      <div className={`proj-card relative rounded-2xl overflow-hidden border ${c.border} transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${c.glow}`}>
        {/* Top gradient bar */}
        <div className={`h-1 bg-gradient-to-r ${c.gradient}`} />

        {/* Glow blob */}
        <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${c.gradient} opacity-0 group-hover:opacity-[0.06] rounded-full blur-3xl transition-opacity duration-700`} />

        {/* Mockup preview */}
        <div className="p-5 pb-0">
          <AppMockup color={project.color} type={mockupTypes[project.id]} />
        </div>

        <div className="p-5 pt-4">
          {/* Header */}
          <div className="flex items-start gap-3 mb-3">
            <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center ring-1 ${c.ring} shrink-0 transition-transform duration-300 group-hover:scale-110`}>
              <Icon className={`w-5 h-5 ${c.text}`} />
            </div>
            <div className="min-w-0">
              <h3 className="proj-card-title text-lg font-bold leading-tight">{project.name}</h3>
              <p className={`text-xs font-medium ${c.text} proj-card-tagline`}>{project.tagline}</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed mb-4 proj-card-description">{project.description}</p>

          {/* Metrics grid */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            {project.metrics.map((m) => (
              <div key={m.label} className="proj-metric text-center py-2 rounded-lg">
                <div className={`text-sm font-bold ${c.text}`}>{m.value}</div>
                <div className="text-[9px] font-semibold uppercase tracking-wider proj-metric-label">{m.label}</div>
              </div>
            ))}
          </div>

          {/* Architecture highlights */}
          <div className="space-y-1.5 mb-4">
            {project.highlights.map((h) => (
              <div key={h.text} className="flex items-center gap-2 proj-highlight">
                <h.icon className={`w-3.5 h-3.5 ${c.text} shrink-0`} />
                <span className="text-xs proj-highlight-text">{h.text}</span>
              </div>
            ))}
          </div>

          {/* Expandable Problem → Solution */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full flex items-center justify-between py-2 px-3 rounded-lg mb-3 proj-expand-btn transition-all duration-200"
            aria-expanded={expanded}
          >
            <span className="text-xs font-semibold proj-expand-label flex items-center gap-1.5">
              <Lightbulb className={`w-3.5 h-3.5 ${c.text}`} />
              Problema → Solucao
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
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400/80">Problema</span>
                  <p className="text-xs proj-problem-text leading-relaxed">{project.problem}</p>
                </div>
              </div>
              {/* Solution */}
              <div className="flex gap-2">
                <Zap className={`w-4 h-4 ${c.text} shrink-0 mt-0.5`} />
                <div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${c.text} opacity-80`}>Solucao</span>
                  <p className="text-xs proj-solution-text leading-relaxed">{project.solution}</p>
                </div>
              </div>
              {/* Challenges */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.challenges.map((ch) => (
                  <span key={ch} className={`proj-challenge-chip px-2 py-0.5 rounded-md text-[10px] font-medium`}>
                    {ch}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Tech */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech.map((t) => (
              <span key={t} className="proj-tech-chip px-2.5 py-1 rounded-lg text-[11px] font-medium">
                {t}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
              <button className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 bg-gradient-to-r ${c.gradient} text-white hover:shadow-lg ${c.glow} hover:opacity-90`}>
                <ExternalLink className="w-3.5 h-3.5" />
                Live Demo
              </button>
            </a>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
              <button className="w-full proj-btn-code flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300">
                <Github className="w-3.5 h-3.5" />
                Codigo
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
      {isLightMode ? <ProjectsBackgroundLight /> : <ProjectsBackground />}

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
              <span ref={totalTests.ref} className="tabular-nums">{totalTests.count}</span>+ Testes no Ecossistema
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Projetos <span className="gradient-text">Production-Ready</span>
          </h2>
          <p className="projects-subtitle max-w-2xl mx-auto">
            Cada projeto e um case study completo · do problema a solucao, com arquitetura documentada, testes e deploy automatizado
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
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
              <span>Ver Todos no GitHub</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
