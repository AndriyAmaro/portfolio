"use client";

import { motion } from "framer-motion";
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
  GraduationCap,
} from "lucide-react";
import { useTranslations } from "next-intl";

// ---------------------------------------------------------------------------
// Timeline Data
// ---------------------------------------------------------------------------
interface TimelineEntry {
  id: string;
  tKey: string;
  date: string;
  achievementCount: number;
  icon: typeof BookOpen;
  color: "indigo" | "violet" | "teal" | "emerald" | "amber" | "cyan";
  tech?: string[];
  type: "learning" | "project" | "milestone";
}

const timelineData: TimelineEntry[] = [
  {
    id: "start",
    tKey: "start",
    date: "",
    icon: BookOpen,
    color: "amber",
    achievementCount: 3,
    type: "learning",
  },
  {
    id: "courses",
    tKey: "courses",
    date: "",
    icon: GraduationCap,
    color: "indigo",
    achievementCount: 4,
    tech: ["Node.js", "Java", "React", "Full-Stack"],
    type: "learning",
  },
  {
    id: "practice",
    tKey: "practice",
    date: "",
    icon: Code2,
    color: "violet",
    achievementCount: 4,
    tech: ["React", "TypeScript", "Tailwind CSS", "Prisma"],
    type: "learning",
  },
  {
    id: "pulse-ds",
    tKey: "pulseDs",
    date: "",
    icon: Palette,
    color: "teal",
    achievementCount: 4,
    tech: ["Next.js 16", "React 19", "Radix UI", "Tailwind 4"],
    type: "project",
  },
  {
    id: "pulse-chat",
    tKey: "pulseChat",
    date: "",
    icon: MessageCircle,
    color: "emerald",
    achievementCount: 4,
    tech: ["React 19", "Socket.io", "Express 5", "Prisma 7"],
    type: "project",
  },
  {
    id: "pulse-finance",
    tKey: "pulseFinance",
    date: "",
    icon: BarChart3,
    color: "amber",
    achievementCount: 4,
    tech: ["Next.js 15", "Hono 4", "Redis", "BullMQ"],
    type: "project",
  },
  {
    id: "ecosystem",
    tKey: "ecosystem",
    date: "",
    icon: Sparkles,
    color: "cyan",
    achievementCount: 4,
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
    trail: "rgba(245, 158, 11, 0.5)",
  },
  indigo: {
    gradient: "from-indigo-500 to-blue-500",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/30",
    text: "text-indigo-400",
    ring: "ring-indigo-500/30",
    dot: "bg-indigo-400",
    line: "from-indigo-500/40",
    trail: "rgba(99, 102, 241, 0.5)",
  },
  violet: {
    gradient: "from-violet-500 to-purple-500",
    bg: "bg-violet-500/10",
    border: "border-violet-500/30",
    text: "text-violet-400",
    ring: "ring-violet-500/30",
    dot: "bg-violet-400",
    line: "from-violet-500/40",
    trail: "rgba(139, 92, 246, 0.5)",
  },
  teal: {
    gradient: "from-teal-500 to-cyan-500",
    bg: "bg-teal-500/10",
    border: "border-teal-500/30",
    text: "text-teal-400",
    ring: "ring-teal-500/30",
    dot: "bg-teal-400",
    line: "from-teal-500/40",
    trail: "rgba(20, 184, 166, 0.5)",
  },
  emerald: {
    gradient: "from-emerald-500 to-green-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    text: "text-emerald-400",
    ring: "ring-emerald-500/30",
    dot: "bg-emerald-400",
    line: "from-emerald-500/40",
    trail: "rgba(16, 185, 129, 0.5)",
  },
  cyan: {
    gradient: "from-cyan-400 to-blue-500",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/30",
    text: "text-cyan-400",
    ring: "ring-cyan-500/30",
    dot: "bg-cyan-400",
    line: "from-cyan-500/40",
    trail: "rgba(6, 182, 212, 0.5)",
  },
} as const;

// typeLabels moved inside Timeline component to use translations

// ---------------------------------------------------------------------------
// Circuit Fragment — subtle decorative SVG for empty column
// ---------------------------------------------------------------------------
const circuitPatterns = [
  // Pattern 0: horizontal line with branch down + nodes
  <svg key="p0" viewBox="0 0 120 60" className="w-full h-full">
    <line x1="10" y1="20" x2="80" y2="20" stroke="currentColor" strokeWidth="1" />
    <line x1="50" y1="20" x2="50" y2="50" stroke="currentColor" strokeWidth="1" />
    <line x1="80" y1="20" x2="110" y2="20" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
    <circle cx="10" cy="20" r="2" fill="currentColor" />
    <circle cx="50" cy="20" r="2" fill="currentColor" />
    <circle cx="80" cy="20" r="2.5" fill="none" stroke="currentColor" strokeWidth="1" />
    <circle cx="50" cy="50" r="2" fill="currentColor" />
  </svg>,
  // Pattern 1: L-shape with dashed extension
  <svg key="p1" viewBox="0 0 120 60" className="w-full h-full">
    <line x1="20" y1="10" x2="20" y2="40" stroke="currentColor" strokeWidth="1" />
    <line x1="20" y1="40" x2="90" y2="40" stroke="currentColor" strokeWidth="1" />
    <line x1="90" y1="40" x2="90" y2="15" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
    <circle cx="20" cy="10" r="2" fill="currentColor" />
    <circle cx="20" cy="40" r="2" fill="currentColor" />
    <circle cx="90" cy="40" r="2.5" fill="none" stroke="currentColor" strokeWidth="1" />
  </svg>,
  // Pattern 2: T-junction
  <svg key="p2" viewBox="0 0 120 60" className="w-full h-full">
    <line x1="15" y1="30" x2="105" y2="30" stroke="currentColor" strokeWidth="1" />
    <line x1="60" y1="30" x2="60" y2="8" stroke="currentColor" strokeWidth="1" />
    <line x1="60" y1="8" x2="95" y2="8" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
    <circle cx="15" cy="30" r="2" fill="currentColor" />
    <circle cx="60" cy="30" r="2" fill="currentColor" />
    <circle cx="105" cy="30" r="2.5" fill="none" stroke="currentColor" strokeWidth="1" />
    <circle cx="60" cy="8" r="2" fill="currentColor" />
  </svg>,
  // Pattern 3: zigzag path
  <svg key="p3" viewBox="0 0 120 60" className="w-full h-full">
    <polyline points="10,15 40,15 55,45 100,45" fill="none" stroke="currentColor" strokeWidth="1" />
    <line x1="100" y1="45" x2="100" y2="20" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
    <circle cx="10" cy="15" r="2" fill="currentColor" />
    <circle cx="55" cy="45" r="2" fill="currentColor" />
    <circle cx="100" cy="45" r="2.5" fill="none" stroke="currentColor" strokeWidth="1" />
  </svg>,
  // Pattern 4: fork
  <svg key="p4" viewBox="0 0 120 60" className="w-full h-full">
    <line x1="10" y1="30" x2="50" y2="30" stroke="currentColor" strokeWidth="1" />
    <line x1="50" y1="30" x2="100" y2="12" stroke="currentColor" strokeWidth="1" />
    <line x1="50" y1="30" x2="100" y2="48" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
    <circle cx="10" cy="30" r="2" fill="currentColor" />
    <circle cx="50" cy="30" r="2.5" fill="none" stroke="currentColor" strokeWidth="1" />
    <circle cx="100" cy="12" r="2" fill="currentColor" />
    <circle cx="100" cy="48" r="2" fill="currentColor" />
  </svg>,
  // Pattern 5: step pattern
  <svg key="p5" viewBox="0 0 120 60" className="w-full h-full">
    <polyline points="15,10 15,30 55,30 55,50 95,50" fill="none" stroke="currentColor" strokeWidth="1" />
    <line x1="95" y1="50" x2="110" y2="30" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
    <circle cx="15" cy="10" r="2" fill="currentColor" />
    <circle cx="55" cy="30" r="2" fill="currentColor" />
    <circle cx="95" cy="50" r="2.5" fill="none" stroke="currentColor" strokeWidth="1" />
  </svg>,
  // Pattern 6: cross junction
  <svg key="p6" viewBox="0 0 120 60" className="w-full h-full">
    <line x1="10" y1="30" x2="110" y2="30" stroke="currentColor" strokeWidth="1" />
    <line x1="60" y1="8" x2="60" y2="52" stroke="currentColor" strokeWidth="1" />
    <circle cx="60" cy="30" r="3" fill="none" stroke="currentColor" strokeWidth="1" />
    <circle cx="10" cy="30" r="2" fill="currentColor" />
    <circle cx="110" cy="30" r="2" fill="currentColor" />
    <circle cx="60" cy="8" r="2" fill="currentColor" />
    <circle cx="60" cy="52" r="2" fill="currentColor" />
  </svg>,
];

function CircuitFragment({ index, isLeft }: { index: number; isLeft: boolean }) {
  const pattern = circuitPatterns[index % circuitPatterns.length];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className={`w-24 h-14 text-indigo-400/[0.08] ${isLeft ? "ml-auto mr-8" : "mr-auto ml-8"} mt-6`}
      style={{ transform: isLeft ? "scaleX(-1)" : undefined }}
    >
      {pattern}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Timeline Entry Component
// ---------------------------------------------------------------------------
function TimelineItem({
  entry,
  index,
  isLast,
  t,
  typeLabels,
}: {
  entry: TimelineEntry;
  index: number;
  isLast: boolean;
  t: { (key: string): string; raw: (key: string) => unknown };
  typeLabels: Record<string, { label: string; className: string }>;
}) {
  const c = colorMap[entry.color];
  const Icon = entry.icon;
  const isLeft = index % 2 === 0;
  const typeInfo = typeLabels[entry.type];

  return (
    <div className="relative">
      {/* Desktop layout */}
      <div className="hidden md:grid md:grid-cols-[1fr_56px_1fr] md:gap-0 items-start">
        {/* Left column */}
        <div className="flex justify-end pr-6">
          {isLeft ? (
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="w-full max-w-md"
            >
              <TimelineCard entry={entry} colors={c} typeInfo={typeInfo} t={t} />
            </motion.div>
          ) : (
            <CircuitFragment index={index} isLeft />
          )}
        </div>

        {/* Center: icon + trail + line */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2, type: "spring", stiffness: 300 }}
              className={`w-12 h-12 rounded-2xl ${c.bg} flex items-center justify-center ring-2 ${c.ring} tl-icon-container relative z-[2]`}
            >
              <Icon className={`w-5 h-5 ${c.text}`} />
            </motion.div>

            {/* Gradient trail — horizontal line from icon to card */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className={`absolute top-1/2 -translate-y-1/2 h-[2px] w-[24px] z-[1] ${
                isLeft ? "right-full origin-right mr-0" : "left-full origin-left ml-0"
              }`}
              style={{
                background: isLeft
                  ? `linear-gradient(to left, ${c.trail}, transparent)`
                  : `linear-gradient(to right, ${c.trail}, transparent)`,
              }}
            />

            {/* Traveling dot on trail */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1 }}
              className={`absolute top-1/2 -translate-y-1/2 z-[3] ${
                isLeft ? "right-full mr-0" : "left-full ml-0"
              }`}
            >
              <motion.div
                animate={isLeft
                  ? { x: [0, -20, 0] }
                  : { x: [0, 20, 0] }
                }
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                className={`w-1 h-1 rounded-full ${colorMap[entry.color].dot} shadow-[0_0_6px_currentColor]`}
              />
            </motion.div>
          </div>
          {!isLast && (
            <div className="relative flex-1 min-h-[40px] flex justify-center">
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="w-[2px] h-full origin-top tl-connector-line"
              />
              {/* Traveling dot */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="absolute left-1/2 -translate-x-1/2 top-0"
              >
                <motion.div
                  animate={{ y: ["0%", "800%", "0%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
                  className={`w-1.5 h-1.5 rounded-full ${colorMap[entry.color].dot} shadow-[0_0_6px_currentColor]`}
                />
              </motion.div>
            </div>
          )}
        </div>

        {/* Right column */}
        <div className="flex justify-start pl-6">
          {!isLeft ? (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="w-full max-w-md"
            >
              <TimelineCard entry={entry} colors={c} typeInfo={typeInfo} t={t} />
            </motion.div>
          ) : (
            <CircuitFragment index={index} isLeft={false} />
          )}
        </div>
      </div>

      {/* Mobile layout: icon left, card right */}
      <div className="flex items-start gap-4 md:hidden">
        <div className="flex flex-col items-center shrink-0">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2, type: "spring", stiffness: 300 }}
            className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center ring-2 ${c.ring} tl-icon-container`}
          >
            <Icon className={`w-4 h-4 ${c.text}`} />
          </motion.div>
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
        <div className="flex-1 pb-2">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <TimelineCard entry={entry} colors={c} typeInfo={typeInfo} t={t} />
          </motion.div>
        </div>
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
  t,
}: {
  entry: TimelineEntry;
  colors: (typeof colorMap)[keyof typeof colorMap];
  typeInfo: { label: string; className: string };
  t: { (key: string): string; raw: (key: string) => unknown };
}) {
  const achievements = t.raw(`entries.${entry.tKey}.achievements`) as string[];

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
        <h3 className="tl-card-title text-base font-bold mb-2">{t(`entries.${entry.tKey}.title`)}</h3>

        {/* Description */}
        <p className="text-xs leading-relaxed mb-4 tl-card-description">{t(`entries.${entry.tKey}.description`)}</p>

        {/* Achievements */}
        <ul className="space-y-1.5 mb-3">
          {achievements.map((a, i) => (
            <li key={i} className="flex items-start gap-2">
              <ArrowRight className={`w-3 h-3 mt-0.5 shrink-0 ${c.text} opacity-60`} />
              <span className="text-[11px] tl-achievement-text">{a}</span>
            </li>
          ))}
        </ul>

        {/* Tech chips */}
        {entry.tech && (
          <div className="flex flex-wrap gap-1.5 pt-2 border-t tl-tech-border">
            {entry.tech.map((techName) => (
              <span key={techName} className="tl-tech-chip px-2 py-0.5 rounded-md text-[10px] font-medium">
                {techName}
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
  const t = useTranslations("timeline");
  const typeLabels: Record<string, { label: string; className: string }> = {
    learning: { label: t("types.learning"), className: "tl-type-learning" },
    project: { label: t("types.project"), className: "tl-type-project" },
    milestone: { label: t("types.milestone"), className: "tl-type-milestone" },
  };

  return (
    <section id="journey" className="relative py-24 md:py-32">
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
              {t("badge")}
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t("title")} <span className="gradient-text">{t("titleHighlight")}</span>
          </h2>
          <p className="tl-subtitle max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto mt-16 space-y-2">
          {timelineData.map((entry, index) => (
            <TimelineItem
              key={entry.id}
              entry={entry}
              index={index}
              isLast={index === timelineData.length - 1}
              t={t}
              typeLabels={typeLabels}
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
              {t("nextTeaser")}
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
