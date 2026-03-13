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
import { useEffect, useState } from "react";
import Image from "next/image";
import { AbstractBackground, AbstractBackgroundLight } from "../ui/AbstractBackground";

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
    date: "",
    title: "O Primeiro Passo",
    description:
      "Decidi aprender desenvolvimento web por conta própria. Sem bootcamp, sem atalhos · comecei pelo básico porque fundamentos sólidos são o que separam quem programa de quem resolve problemas.",
    icon: BookOpen,
    color: "amber",
    achievements: [
      "HTML, CSS e JavaScript do zero",
      "Lógica de programação e algoritmos",
      "Primeiro contato com React e TypeScript",
    ],
    type: "learning",
  },
  {
    id: "courses",
    date: "",
    title: "Formação Contínua",
    description:
      "Investi tempo e recursos em cursos para acelerar o aprendizado e preencher gaps técnicos. Cada curso era um degrau · o conhecimento real se consolidou quando comecei a aplicar tudo em projetos próprios.",
    icon: GraduationCap,
    color: "indigo",
    achievements: [
      "Curso completo de Node.js",
      "Formação Webmaster Full-Stack",
      "Curso de Java e orientação a objetos",
      "Web Developer com foco em React",
    ],
    tech: ["Node.js", "Java", "React", "Full-Stack"],
    type: "learning",
  },
  {
    id: "practice",
    date: "",
    title: "Projetos de Prática",
    description:
      "Teoria sem prática é conhecimento pela metade. Construí dezenas de projetos pequenos para fixar cada conceito: APIs REST, autenticação, CRUD, integração com banco de dados.",
    icon: Code2,
    color: "violet",
    achievements: [
      "React com TypeScript strict mode",
      "APIs REST com Express e Prisma",
      "Tailwind CSS e design responsivo",
      "Git workflow e boas práticas",
    ],
    tech: ["React", "TypeScript", "Tailwind CSS", "Prisma"],
    type: "learning",
  },
  {
    id: "pulse-ds",
    date: "",
    title: "Pulse Design System",
    description:
      "Com uma base sólida construída, quis ir além dos projetos de estudo. Criei um design system completo do zero · não uma lib copiada, mas 100+ componentes pensados para escalar.",
    icon: Palette,
    color: "teal",
    achievements: [
      "100+ componentes reutilizáveis",
      "25 variantes de dashboard",
      "i18n com pathname routing em 3 idiomas",
      "Dark/light mode com Radix UI",
    ],
    tech: ["Next.js 16", "React 19", "Radix UI", "Tailwind 4"],
    type: "project",
  },
  {
    id: "pulse-chat",
    date: "",
    title: "Pulse Chat · Real-Time",
    description:
      "App full-stack real-time do ecossistema. WebSocket com 32 eventos tipados, queue offline e 98 testes. Resolver problemas de real-time em produção ensinou mais do que qualquer curso.",
    icon: MessageCircle,
    color: "emerald",
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
    date: "",
    title: "Pulse Finance · Clean Architecture",
    description:
      "Dashboard financeiro multi-tenant com arquitetura limpa de verdade. Camadas bem definidas, cache Redis, background jobs · o nível de complexidade que separa projetos de estudo de produtos reais.",
    icon: BarChart3,
    color: "amber",
    achievements: [
      "Clean Architecture com camadas definidas",
      "Multi-tenancy com isolamento por usuário",
      "Redis cache + BullMQ background jobs",
      "143 testes automatizados",
    ],
    tech: ["Next.js 15", "Hono 4", "Redis", "BullMQ"],
    type: "project",
  },
  {
    id: "ecosystem",
    date: "",
    title: "Pulse Ecosystem Completo",
    description:
      "Os projetos se conectaram num ecossistema real. Design tokens compartilhados, 380+ testes, CI/CD em todos os repos. Não é só código · é uma arquitetura que escala.",
    icon: Sparkles,
    color: "cyan",
    achievements: [
      "SaaS apps interligados por design tokens",
      "380+ testes no ecossistema total",
      "CI/CD com GitHub Actions em todos os repos",
      "Documentação técnica com ADRs",
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
    <div className="relative">
      {/* Desktop layout */}
      <div className="hidden md:grid md:grid-cols-[1fr_56px_1fr] md:gap-0 items-start">
        {/* Left column */}
        <div className="flex justify-end pr-6">
          {isLeft && (
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="w-full max-w-md"
            >
              <TimelineCard entry={entry} colors={c} typeInfo={typeInfo} />
            </motion.div>
          )}
        </div>

        {/* Center: icon + line */}
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2, type: "spring", stiffness: 300 }}
            className={`w-12 h-12 rounded-2xl ${c.bg} flex items-center justify-center ring-2 ${c.ring} tl-icon-container`}
          >
            <Icon className={`w-5 h-5 ${c.text}`} />
          </motion.div>
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
          {!isLeft && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="w-full max-w-md"
            >
              <TimelineCard entry={entry} colors={c} typeInfo={typeInfo} />
            </motion.div>
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
            <TimelineCard entry={entry} colors={c} typeInfo={typeInfo} />
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
      {isLightMode ? <AbstractBackgroundLight /> : <AbstractBackground />}

      {/* Floating illustration - desktop only */}
      <motion.div
        initial={{ opacity: 0, scale: 0.4, filter: "blur(24px)" }}
        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="hidden md:block absolute -top-8 -right-36 lg:-right-24 z-10 pointer-events-none"
      >
        <motion.div
          animate={{
            y: [0, -14, 6, -20, 4, -10, -16, 0],
            x: [0, -3, 2, -5, 3, -2, 1, 0],
          }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-indigo-500/5 rounded-full blur-3xl scale-75" />
            <Image
              src="/journey-illustration.png"
              alt=""
              width={640}
              height={420}
              className="w-[640px] h-[420px] opacity-[0.12] dark:opacity-[0.20] select-none hue-rotate-[40deg] saturate-[1.8] brightness-[0.9]"
              draggable={false}
              priority={false}
            />
          </div>
        </motion.div>
      </motion.div>

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
            Autodidata por escolha, Full Stack por dedicação · cada curso virou projeto,
            cada projeto virou produto e a consistência fez o resto
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
              Próximo: mais 3 apps no ecossistema
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
