"use client";

import { motion, useInView } from "framer-motion";
import {
  BookOpen,
  Palette,
  MessageCircle,
  BarChart3,
  Rocket,
  Sparkles,
  Code2,
  Layers,
  GitBranch,
  Globe,
  TestTubes,
  ArrowRight,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ---------------------------------------------------------------------------
// Timeline Data
// ---------------------------------------------------------------------------
interface TimelineEntry {
  id: string;
  date: string;
  title: string;
  description: string;
  icon: typeof BookOpen;
  color: "indigo" | "violet" | "teal" | "emerald" | "amber" | "cyan";
  achievements: string[];
  tech?: string[];
  type: "learning" | "project" | "milestone";
}

const timelineData: TimelineEntry[] = [
  {
    id: "start",
    date: "2024",
    title: "Inicio da Jornada",
    description:
      "Comecei a estudar desenvolvimento web do zero. HTML, CSS, JavaScript e os fundamentos que constroem tudo.",
    icon: BookOpen,
    color: "amber",
    achievements: [
      "Fundamentos de HTML, CSS e JavaScript",
      "Primeiro contato com React",
      "Logica de programacao e algoritmos",
    ],
    type: "learning",
  },
  {
    id: "react-deep",
    date: "2024",
    title: "Deep Dive em React & TypeScript",
    description:
      "Mergulhei no ecossistema React com TypeScript. Entendi componentizacao, hooks, state management e o poder do tipo forte.",
    icon: Code2,
    color: "indigo",
    achievements: [
      "React com TypeScript strict mode",
      "Hooks avancados e custom hooks",
      "Tailwind CSS e design responsivo",
    ],
    tech: ["React", "TypeScript", "Tailwind CSS"],
    type: "learning",
  },
  {
    id: "pulse-ds",
    date: "2025",
    title: "Pulse Design System",
    description:
      "Construi um design system completo do zero com Atomic Design. 100+ componentes, 56 paginas, 25 dashboards, i18n em 3 idiomas.",
    icon: Palette,
    color: "violet",
    achievements: [
      "100+ componentes reutilizaveis",
      "25 variantes de dashboard",
      "i18n com pathname routing",
      "Dark/light mode com Radix UI",
    ],
    tech: ["Next.js 16", "React 19", "Radix UI", "Tailwind 4"],
    type: "project",
  },
  {
    id: "pulse-chat",
    date: "2025",
    title: "Pulse Chat · Real-Time",
    description:
      "Primeiro app full-stack do ecossistema. WebSocket com 32 eventos tipados, queue offline, voice messages e 98 testes.",
    icon: MessageCircle,
    color: "teal",
    achievements: [
      "WebSocket com reconnection sync",
      "32 eventos tipados end-to-end",
      "Queue offline com exponential backoff",
      "98 testes automatizados",
    ],
    tech: ["React 19", "Socket.io", "Express 5", "Prisma 7"],
    type: "project",
  },
  {
    id: "pulse-finance",
    date: "2025",
    title: "Pulse Finance · Clean Architecture",
    description:
      "Dashboard financeiro multi-tenant com Clean Architecture, API Hono type-safe, cache Redis e background jobs. 143 testes.",
    icon: BarChart3,
    color: "emerald",
    achievements: [
      "Clean Architecture com camadas definidas",
      "Multi-tenancy com isolamento",
      "Redis cache + BullMQ jobs",
      "143 testes automatizados",
    ],
    tech: ["Next.js 15", "Hono 4", "Redis", "BullMQ"],
    type: "project",
  },
  {
    id: "ecosystem",
    date: "2025",
    title: "Pulse Ecosystem Completo",
    description:
      "O ecossistema se conectou. Design system alimentando 3 SaaS apps com tokens compartilhados, 380+ testes e CI/CD em todos os repos.",
    icon: Sparkles,
    color: "cyan",
    achievements: [
      "3 SaaS apps interligados",
      "380+ testes no ecossistema",
      "CI/CD com GitHub Actions",
      "Documentacao tecnica com ADRs",
    ],
    type: "milestone",
  },
];

// ---------------------------------------------------------------------------
// Color System
// ---------------------------------------------------------------------------
const colorMap = {
  amber: {
    gradient: "from-amber-500 to-orange-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    text: "text-amber-400",
    ring: "ring-amber-500/30",
    dot: "bg-amber-400",
    line: "from-amber-500/40",
  },
  indigo: {
    gradient: "from-indigo-500 to-blue-500",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/30",
    text: "text-indigo-400",
    ring: "ring-indigo-500/30",
    dot: "bg-indigo-400",
    line: "from-indigo-500/40",
  },
  violet: {
    gradient: "from-violet-500 to-purple-500",
    bg: "bg-violet-500/10",
    border: "border-violet-500/30",
    text: "text-violet-400",
    ring: "ring-violet-500/30",
    dot: "bg-violet-400",
    line: "from-violet-500/40",
  },
  teal: {
    gradient: "from-teal-500 to-cyan-500",
    bg: "bg-teal-500/10",
    border: "border-teal-500/30",
    text: "text-teal-400",
    ring: "ring-teal-500/30",
    dot: "bg-teal-400",
    line: "from-teal-500/40",
  },
  emerald: {
    gradient: "from-emerald-500 to-green-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    text: "text-emerald-400",
    ring: "ring-emerald-500/30",
    dot: "bg-emerald-400",
    line: "from-emerald-500/40",
  },
  cyan: {
    gradient: "from-cyan-400 to-blue-500",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/30",
    text: "text-cyan-400",
    ring: "ring-cyan-500/30",
    dot: "bg-cyan-400",
    line: "from-cyan-500/40",
  },
} as const;

const typeLabels = {
  learning: { label: "Aprendizado", className: "tl-type-learning" },
  project: { label: "Projeto", className: "tl-type-project" },
  milestone: { label: "Marco", className: "tl-type-milestone" },
} as const;

// ---------------------------------------------------------------------------
// Timeline Entry Component
// ---------------------------------------------------------------------------
function TimelineItem({
  entry,
  index,
  isLast,
}: {
  entry: TimelineEntry;
  index: number;
  isLast: boolean;
}) {
  const c = colorMap[entry.color];
  const Icon = entry.icon;
  const isLeft = index % 2 === 0;
  const typeInfo = typeLabels[entry.type];

  return (
    <div className="relative flex items-start gap-6 md:gap-0">
      {/* Desktop: alternating layout */}
      {/* Left content (even items) */}
      <div className={`hidden md:block w-[calc(50%-28px)] ${isLeft ? "" : "order-3"}`}>
        {isLeft && (
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <TimelineCard entry={entry} colors={c} typeInfo={typeInfo} />
          </motion.div>
        )}
      </div>

      {/* Center line + icon */}
      <div className="relative flex flex-col items-center z-10 md:mx-4 shrink-0">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2, type: "spring", stiffness: 300 }}
          className={`w-12 h-12 rounded-2xl ${c.bg} flex items-center justify-center ring-2 ${c.ring} tl-icon-container`}
        >
          <Icon className={`w-5 h-5 ${c.text}`} />
        </motion.div>
        {/* Vertical line */}
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-[2px] flex-1 min-h-[40px] origin-top tl-connector-line"
          />
        )}
      </div>

      {/* Right content (odd items) */}
      <div className={`hidden md:block w-[calc(50%-28px)] ${isLeft ? "order-3" : ""}`}>
        {!isLeft && (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <TimelineCard entry={entry} colors={c} typeInfo={typeInfo} />
          </motion.div>
        )}
      </div>

      {/* Mobile: always right */}
      <div className="md:hidden flex-1">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <TimelineCard entry={entry} colors={c} typeInfo={typeInfo} />
        </motion.div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Timeline Card
// ---------------------------------------------------------------------------
function TimelineCard({
  entry,
  colors: c,
  typeInfo,
}: {
  entry: TimelineEntry;
  colors: (typeof colorMap)[keyof typeof colorMap];
  typeInfo: (typeof typeLabels)[keyof typeof typeLabels];
}) {
  return (
    <div className={`tl-card group relative rounded-2xl border ${c.border} overflow-hidden transition-all duration-300 hover:-translate-y-1`}>
      {/* Top gradient */}
      <div className={`h-0.5 bg-gradient-to-r ${c.gradient}`} />

      {/* Hover glow */}
      <div className={`absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-br ${c.gradient} opacity-0 group-hover:opacity-[0.05] rounded-full blur-3xl transition-opacity duration-500`} />

      <div className="p-5">
        {/* Type badge */}
        <div className="flex items-center mb-3">
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${typeInfo.className}`}>
            {typeInfo.label}
          </span>
        </div>

        {/* Title */}
        <h3 className="tl-card-title text-base font-bold mb-2">{entry.title}</h3>

        {/* Description */}
        <p className="text-xs leading-relaxed mb-4 tl-card-description">{entry.description}</p>

        {/* Achievements */}
        <ul className="space-y-1.5 mb-3">
          {entry.achievements.map((a) => (
            <li key={a} className="flex items-start gap-2">
              <ArrowRight className={`w-3 h-3 mt-0.5 shrink-0 ${c.text} opacity-60`} />
              <span className="text-[11px] tl-achievement-text">{a}</span>
            </li>
          ))}
        </ul>

        {/* Tech chips */}
        {entry.tech && (
          <div className="flex flex-wrap gap-1.5 pt-2 border-t tl-tech-border">
            {entry.tech.map((t) => (
              <span key={t} className="tl-tech-chip px-2 py-0.5 rounded-md text-[10px] font-medium">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Timeline Section
// ---------------------------------------------------------------------------
export function Timeline() {
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsLightMode(document.documentElement.classList.contains("light-mode"));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="journey" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-indigo-500/[0.03] rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-violet-500/[0.03] rounded-full blur-[100px]" />
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
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
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full tl-section-badge mb-6"
          >
            <GitBranch className="w-3.5 h-3.5 tl-badge-icon" />
            <span className="text-xs font-semibold tracking-wider uppercase tl-badge-text">
              Do Zero ao Ecossistema
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Minha <span className="gradient-text">Jornada</span>
          </h2>
          <p className="tl-subtitle max-w-2xl mx-auto">
            De estudante autodidata a criador de um ecossistema com 3 SaaS apps ·
            cada passo construido com intencao e documentado com rigor
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto mt-16 space-y-2">
          {timelineData.map((entry, index) => (
            <TimelineItem
              key={entry.id}
              entry={entry}
              index={index}
              isLast={index === timelineData.length - 1}
            />
          ))}
        </div>

        {/* Bottom "What's Next" teaser */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-16"
        >
          <div className="tl-next-card inline-flex items-center gap-3 px-6 py-3 rounded-full">
            <Rocket className="w-4 h-4 tl-next-icon" />
            <span className="text-sm font-semibold tl-next-text">
              Proximo: mais 3 apps no ecossistema
            </span>
            <span className="flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
