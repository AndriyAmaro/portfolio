"use client";

import { motion, useInView } from "framer-motion";
import {
  Palette,
  MessageCircle,
  BarChart3,
  ArrowRight,
  ExternalLink,
  Github,
  Layers,
  Zap,
  Shield,
  Globe,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ---------------------------------------------------------------------------
// Count-up hook
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
// Ecosystem Apps Data
// ---------------------------------------------------------------------------
const ecosystemApps = [
  {
    id: "pulse-ds",
    name: "Pulse Design System",
    tagline: "A fundação de tudo",
    description:
      "100+ componentes, 56 paginas, 25 variantes de dashboard, dark/light mode e i18n em 3 idiomas. Cada componente do ecossistema nasce aqui.",
    icon: Palette,
    color: "indigo",
    stats: [
      { label: "Componentes", value: "100+" },
      { label: "Paginas", value: "56" },
      { label: "Dashboards", value: "25" },
    ],
    tech: ["Next.js 16", "React 19", "Tailwind 4", "Radix UI"],
    liveUrl: "https://pulse-saas-theme.vercel.app",
    githubUrl: "https://github.com/AndriyAmaro/pulse-saas-theme",
    status: "live" as const,
  },
  {
    id: "pulse-chat",
    name: "Pulse Chat",
    tagline: "Comunicação real-time",
    description:
      "Mensagens real-time com WebSocket, voice messages, reacoes, rooms e sistema de amizades. 32 eventos tipados, queue offline com retry exponencial.",
    icon: MessageCircle,
    color: "teal",
    stats: [
      { label: "Testes", value: "98" },
      { label: "Eventos WS", value: "32" },
      { label: "Componentes", value: "40+" },
    ],
    tech: ["React 19", "Socket.io", "Express 5", "Prisma 7"],
    liveUrl: "https://realtime-chat-eight-beryl.vercel.app",
    githubUrl: "https://github.com/AndriyAmaro/realtime-chat",
    status: "live" as const,
  },
  {
    id: "pulse-finance",
    name: "Pulse Finance",
    tagline: "Dashboard financeiro",
    description:
      "Multi-tenant com transacoes, analytics e importacao CSV. Clean Architecture, API Hono type-safe, cache Redis e background jobs com BullMQ.",
    icon: BarChart3,
    color: "emerald",
    stats: [
      { label: "Testes", value: "143" },
      { label: "Arquitetura", value: "Clean" },
      { label: "Cache", value: "Redis" },
    ],
    tech: ["Next.js 15", "Hono 4", "Prisma 6", "BullMQ"],
    liveUrl: "https://dashboard-finance-swart.vercel.app",
    githubUrl: "https://github.com/AndriyAmaro/finance-flow",
    status: "live" as const,
  },
];

const ecosystemPrinciples = [
  {
    icon: Layers,
    title: "Tokens Compartilhados",
    description: "Cores, tipografia e espacamento consistentes em todos os apps",
  },
  {
    icon: Zap,
    title: "Type Safety End-to-End",
    description: "TypeScript strict do componente ao banco de dados",
  },
  {
    icon: Shield,
    title: "Testes em Tudo",
    description: "380+ testes unit, integration e e2e com Vitest",
  },
  {
    icon: Globe,
    title: "CI/CD Automatizado",
    description: "GitHub Actions, deploy automatico, conventional commits",
  },
];

// ---------------------------------------------------------------------------
// Color maps
// ---------------------------------------------------------------------------
const colorMap = {
  indigo: {
    gradient: "from-indigo-500 to-violet-500",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
    borderHover: "hover:border-indigo-500/40",
    text: "text-indigo-400",
    textLight: "text-indigo-600",
    glow: "shadow-indigo-500/20",
    ring: "ring-indigo-500/30",
    dot: "bg-indigo-400",
  },
  teal: {
    gradient: "from-teal-500 to-cyan-500",
    bg: "bg-teal-500/10",
    border: "border-teal-500/20",
    borderHover: "hover:border-teal-500/40",
    text: "text-teal-400",
    textLight: "text-teal-600",
    glow: "shadow-teal-500/20",
    ring: "ring-teal-500/30",
    dot: "bg-teal-400",
  },
  emerald: {
    gradient: "from-emerald-500 to-green-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    borderHover: "hover:border-emerald-500/40",
    text: "text-emerald-400",
    textLight: "text-emerald-600",
    glow: "shadow-emerald-500/20",
    ring: "ring-emerald-500/30",
    dot: "bg-emerald-400",
  },
} as const;

// ---------------------------------------------------------------------------
// Connection Line SVG (visual link between cards)
// ---------------------------------------------------------------------------
function ConnectionLines() {
  return (
    <div className="absolute inset-0 pointer-events-none hidden lg:block" aria-hidden="true">
      <svg className="w-full h-full" viewBox="0 0 1200 600" fill="none" preserveAspectRatio="xMidYMid meet">
        {/* DS → Chat */}
        <motion.path
          d="M280 300 C400 300, 400 300, 520 300"
          stroke="url(#lineGrad1)"
          strokeWidth="2"
          strokeDasharray="8 4"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.6 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.8 }}
        />
        {/* Chat → Finance */}
        <motion.path
          d="M680 300 C800 300, 800 300, 920 300"
          stroke="url(#lineGrad2)"
          strokeWidth="2"
          strokeDasharray="8 4"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.6 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 1.2 }}
        />
        {/* Pulse circles at connection points */}
        <motion.circle
          cx="400" cy="300" r="4"
          className="fill-indigo-400/60"
          initial={{ scale: 0 }}
          whileInView={{ scale: [0, 1.5, 1] }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1.5 }}
        />
        <motion.circle
          cx="800" cy="300" r="4"
          className="fill-teal-400/60"
          initial={{ scale: 0 }}
          whileInView={{ scale: [0, 1.5, 1] }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1.9 }}
        />
        <defs>
          <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(129, 140, 248)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="rgb(45, 212, 191)" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="lineGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(45, 212, 191)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="rgb(52, 211, 153)" stopOpacity="0.6" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Ecosystem App Card
// ---------------------------------------------------------------------------
function EcosystemCard({
  app,
  index,
}: {
  app: (typeof ecosystemApps)[0];
  index: number;
}) {
  const colors = colorMap[app.color as keyof typeof colorMap];
  const Icon = app.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative"
    >
      <div
        className={`eco-card relative rounded-2xl border ${colors.border} ${colors.borderHover} overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${colors.glow} h-full flex flex-col`}
      >
        {/* Gradient top bar */}
        <div className={`h-1 bg-gradient-to-r ${colors.gradient}`} />

        {/* Glow effect on hover */}
        <div
          className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-[0.07] rounded-full blur-3xl transition-opacity duration-700`}
        />

        <div className="p-6 flex flex-col flex-1">
          {/* Header: Icon + Name + Status */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-11 h-11 rounded-xl ${colors.bg} flex items-center justify-center ring-1 ${colors.ring} transition-transform duration-300 group-hover:scale-110`}
              >
                <Icon className={`w-5 h-5 ${colors.text}`} />
              </div>
              <div>
                <h3 className="eco-card-title text-lg font-bold leading-tight">
                  {app.name}
                </h3>
                <p className={`text-xs font-medium ${colors.text} eco-card-tagline`}>
                  {app.tagline}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full eco-status-badge">
              <span className={`w-1.5 h-1.5 rounded-full ${colors.dot} animate-pulse`} />
              <span className="text-[10px] font-semibold uppercase tracking-wider eco-status-text">
                Live
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed mb-5 eco-card-description flex-1">
            {app.description}
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {app.stats.map((stat) => (
              <div
                key={stat.label}
                className="eco-stat-box text-center py-2.5 px-2 rounded-xl"
              >
                <div className={`text-base font-bold ${colors.text} eco-stat-value`}>
                  {stat.value}
                </div>
                <div className="text-[10px] font-medium uppercase tracking-wider eco-stat-label">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Tech chips */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {app.tech.map((t) => (
              <span
                key={t}
                className="eco-tech-chip px-2.5 py-1 rounded-lg text-[11px] font-medium"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 mt-auto">
            <a
              href={app.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <button
                className={`w-full eco-btn-primary flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 bg-gradient-to-r ${colors.gradient} text-white hover:shadow-lg ${colors.glow} hover:opacity-90`}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Demo
              </button>
            </a>
            <a
              href={app.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <button className="w-full eco-btn-secondary flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300">
                <Github className="w-3.5 h-3.5" />
                Codigo
              </button>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Main Ecosystem Section
// ---------------------------------------------------------------------------
export function Ecosystem() {
  const [isLightMode, setIsLightMode] = useState(false);
  const totalTests = useCountUp(380, 2000);
  const totalComponents = useCountUp(100, 1800);
  const totalPages = useCountUp(56, 1600);

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
    <section
      id="ecosystem"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/[0.04] rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/[0.04] rounded-full blur-[100px]" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          {/* Ecosystem badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full eco-section-badge mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-400 to-violet-400 animate-pulse" />
            <span className="text-xs font-semibold tracking-wider uppercase eco-badge-text">
              Ecossistema Interligado
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            O <span className="gradient-text">Pulse Ecosystem</span>
          </h2>
          <p className="eco-subtitle max-w-2xl mx-auto">
            Nao sao projetos isolados · e um ecossistema onde o Design System
            alimenta cada aplicacao, com tokens, componentes e padroes
            compartilhados
          </p>
        </motion.div>

        {/* Aggregate Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-8 md:gap-12 mb-16"
        >
          {[
            { ref: totalTests.ref, count: totalTests.count, suffix: "+", label: "Testes Automatizados" },
            { ref: totalComponents.ref, count: totalComponents.count, suffix: "+", label: "Componentes" },
            { ref: totalPages.ref, count: totalPages.count, suffix: "", label: "Paginas" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <span
                ref={stat.ref}
                className="block text-3xl md:text-4xl font-bold gradient-text tabular-nums"
              >
                {stat.count}{stat.suffix}
              </span>
              <span className="text-xs md:text-sm font-medium eco-stat-aggregate-label">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Cards grid with connection lines */}
        <div className="relative">
          <ConnectionLines />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {ecosystemApps.map((app, index) => (
              <EcosystemCard key={app.id} app={app} index={index} />
            ))}
          </div>
        </div>

        {/* Architecture Principles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16"
        >
          <h3 className="text-center text-lg font-semibold mb-8 eco-principles-title">
            O que conecta tudo
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {ecosystemPrinciples.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                className="eco-principle-card text-center p-5 rounded-xl"
              >
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center mx-auto mb-3 ring-1 ring-indigo-500/20">
                  <principle.icon className="w-5 h-5 text-indigo-400 eco-principle-icon" />
                </div>
                <h4 className="text-sm font-semibold mb-1 eco-principle-title">
                  {principle.title}
                </h4>
                <p className="text-xs leading-relaxed eco-principle-description">
                  {principle.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA: Explore GitHub */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/AndriyAmaro"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <div className="eco-cta-btn group inline-flex items-center gap-3 px-6 py-3 rounded-full font-medium transition-all duration-300 hover:-translate-y-1">
              <Github className="w-5 h-5" />
              <span>Explorar no GitHub</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
