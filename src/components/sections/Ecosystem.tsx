"use client";

import { motion, useInView } from "framer-motion";
import {
  ExternalLink,
  Github,
  Layers,
  Zap,
  Shield,
  Globe,
  Store,
  LayoutDashboard,
  Bot,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AbstractBackground, AbstractBackgroundLight } from "../ui/AbstractBackground";

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
// Logo SVGs
// ---------------------------------------------------------------------------
function PulseDSIcon() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
      <defs>
        <linearGradient id="eco-ds-g" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366F1" /><stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="8" fill="url(#eco-ds-g)" />
      <path d="M8 20H14L17 12L20 28L23 16L26 20H32" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PulseChatIcon() {
  return (
    <svg viewBox="2 0 60 60" fill="none" className="w-8 h-8">
      <defs>
        <linearGradient id="eco-chat-g" x1="2" y1="2" x2="62" y2="58" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2DD1B1" /><stop offset="1" stopColor="#0D7768" />
        </linearGradient>
      </defs>
      <path d="M12 2H52A10 10 0 0 1 62 12V32A10 10 0 0 1 52 42H22L10 58L14 42A10 10 0 0 1 2 32V12A10 10 0 0 1 12 2Z" fill="url(#eco-chat-g)" />
      <polyline points="8,22 16,22 20,22 24,8 30,36 34,14 37,22 44,22 56,22" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PulseFinanceIcon() {
  return <Image src="/projects/finance-icon.png" alt="Finance" width={32} height={32} className="w-8 h-8 object-contain" />;
}

// ---------------------------------------------------------------------------
// Ecosystem node data
// ---------------------------------------------------------------------------
interface EcoNode {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  icon: React.ReactNode;
  color: string;
  colorClass: string;
  borderClass: string;
  bgClass: string;
  glowColor: string;
  role: string;
  techStack: string[];
  metrics: { value: string; label: string }[];
  architecture: string;
  shared?: string[];
  liveUrl?: string;
  githubUrl?: string;
  status: "live" | "coming";
}

const liveApps: EcoNode[] = [
  {
    id: "pulse-ds",
    name: "Pulse Design System",
    shortName: "Design System",
    tagline: "Base do ecossistema · exporta tokens, componentes e layouts para todos os apps",
    icon: <PulseDSIcon />,
    color: "indigo",
    colorClass: "text-indigo-400",
    borderClass: "border-indigo-500/30",
    bgClass: "bg-indigo-500/10",
    glowColor: "rgba(99, 102, 241, 0.15)",
    role: "A fundação",
    techStack: [],
    metrics: [],
    architecture: "",
    shared: ["Design Tokens", "100+ Components", "Layout System", "Theme Engine"],
    liveUrl: "https://pulse-saas-theme.vercel.app",
    githubUrl: "https://github.com/AndriyAmaro/pulse-saas-theme",
    status: "live",
  },
  {
    id: "pulse-chat",
    name: "Pulse Chat",
    shortName: "Chat",
    tagline: "Consome tokens e 40+ componentes do DS · adiciona real-time layer",
    icon: <PulseChatIcon />,
    color: "teal",
    colorClass: "text-teal-400",
    borderClass: "border-teal-500/30",
    bgClass: "bg-teal-500/10",
    glowColor: "rgba(20, 184, 166, 0.15)",
    role: "Comunicação",
    techStack: [],
    metrics: [],
    architecture: "",
    shared: ["40+ Components", "Color Tokens", "Typography", "Spacing Scale"],
    liveUrl: "https://realtime-chat-eight-beryl.vercel.app",
    githubUrl: "https://github.com/AndriyAmaro/realtime-chat",
    status: "live",
  },
  {
    id: "pulse-finance",
    name: "Pulse Finance",
    shortName: "Finance",
    tagline: "Herda dashboard variants e data components do DS · adiciona cache layer",
    icon: <PulseFinanceIcon />,
    color: "emerald",
    colorClass: "text-emerald-400",
    borderClass: "border-emerald-500/30",
    bgClass: "bg-emerald-500/10",
    glowColor: "rgba(16, 185, 129, 0.15)",
    role: "Dashboard",
    techStack: [],
    metrics: [],
    architecture: "",
    shared: ["Dashboard Layouts", "Chart Components", "Data Tables", "Form System"],
    liveUrl: "https://dashboard-finance-swart.vercel.app",
    githubUrl: "https://github.com/AndriyAmaro/finance-flow",
    status: "live",
  },
];

const comingApps: EcoNode[] = [
  {
    id: "vexiat",
    name: "Vexiat",
    shortName: "Vexiat",
    tagline: "SaaS de project management com Kanban, Stripe billing e RBAC granular",
    icon: <LayoutDashboard className="w-5 h-5" />,
    color: "amber",
    colorClass: "text-amber-400",
    borderClass: "border-amber-500/20",
    bgClass: "bg-amber-500/10",
    glowColor: "rgba(245, 158, 11, 0.1)",
    role: "Project Management",
    techStack: [],
    metrics: [],
    architecture: "",
    status: "coming",
  },
  {
    id: "pulse-market",
    name: "Pulse Market",
    shortName: "Market",
    tagline: "Marketplace multi-vendor com Stripe Connect, split payments e search engine",
    icon: <Store className="w-5 h-5" />,
    color: "purple",
    colorClass: "text-purple-400",
    borderClass: "border-purple-500/20",
    bgClass: "bg-purple-500/10",
    glowColor: "rgba(168, 85, 247, 0.1)",
    role: "Marketplace",
    techStack: [],
    metrics: [],
    architecture: "",
    status: "coming",
  },
  {
    id: "pulse-ai",
    name: "Pulse AI",
    shortName: "AI",
    tagline: "Assistente inteligente com RAG pipeline e agentes autônomos",
    icon: <Bot className="w-5 h-5" />,
    color: "rose",
    colorClass: "text-rose-400",
    borderClass: "border-rose-500/20",
    bgClass: "bg-rose-500/10",
    glowColor: "rgba(244, 63, 94, 0.1)",
    role: "AI Agent",
    techStack: [],
    metrics: [],
    architecture: "",
    status: "coming",
  },
];

const principles = [
  { icon: Layers, label: "Tokens Compartilhados" },
  { icon: Zap, label: "Type Safety E2E" },
  { icon: Shield, label: "380+ Testes" },
  { icon: Globe, label: "CI/CD Automatizado" },
];

// ---------------------------------------------------------------------------
// Ecosystem Node Component
// ---------------------------------------------------------------------------
function EcoNodeCard({ node, index, isCenter }: { node: EcoNode; index: number; isCenter?: boolean }) {
  const isComing = node.status === "coming";

  const gradientClass = node.color === "indigo" ? "from-indigo-500 via-violet-500 to-purple-500" :
    node.color === "teal" ? "from-teal-500 via-cyan-400 to-teal-500" :
    node.color === "emerald" ? "from-emerald-500 via-green-400 to-emerald-500" : "";

  const dotColor = node.color === "indigo" ? "bg-indigo-400" :
    node.color === "teal" ? "bg-teal-400" :
    node.color === "emerald" ? "bg-emerald-400" : "";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: isCenter ? 0 : 0.2 + index * 0.1 }}
      className="group relative"
    >
      <div
        className={`eco-node relative rounded-2xl border ${node.borderClass} overflow-hidden transition-all duration-400 ${
          isComing ? "opacity-60" : "hover:-translate-y-2 hover:shadow-xl"
        }`}
        style={{ boxShadow: isComing ? undefined : `0 0 0 0 ${node.glowColor}` }}
        onMouseEnter={(e) => {
          if (!isComing) e.currentTarget.style.boxShadow = `0 12px 40px ${node.glowColor}`;
        }}
        onMouseLeave={(e) => {
          if (!isComing) e.currentTarget.style.boxShadow = `0 0 0 0 ${node.glowColor}`;
        }}
      >
        {/* Top gradient bar */}
        {!isComing && <div className={`h-1.5 bg-gradient-to-r ${gradientClass}`} />}
        {isComing && <div className="h-1 bg-gradient-to-r from-white/5 via-white/10 to-white/5" />}

        {/* Glow blob on hover */}
        {!isComing && (
          <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${
            node.color === "indigo" ? "from-indigo-500 to-violet-500" :
            node.color === "teal" ? "from-teal-500 to-cyan-500" :
            "from-emerald-500 to-green-500"
          } opacity-0 group-hover:opacity-[0.08] rounded-full blur-3xl transition-opacity duration-700`} />
        )}

        <div className="p-5">
          {/* Header with icon links */}
          <div className="flex items-center gap-3 mb-3">
            <div className={`shrink-0 ${isComing ? "opacity-50" : ""} ${!isComing ? "ring-2 ring-white/10 rounded-xl p-0.5 group-hover:ring-white/20 transition-all duration-300" : ""}`}>
              {node.icon}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="eco-card-title text-base font-bold leading-tight truncate">{node.name}</h3>
                {isComing ? (
                  <span className="shrink-0 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider eco-coming-badge">
                    Em breve
                  </span>
                ) : (
                  <span className="shrink-0 flex items-center gap-1 px-2 py-0.5 rounded-full eco-status-badge">
                    <span className={`w-1.5 h-1.5 rounded-full ${dotColor} animate-pulse`} />
                    <span className="text-[9px] font-bold uppercase tracking-wider eco-status-text">Live</span>
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <p className={`text-xs ${node.colorClass} font-medium eco-card-tagline`}>{node.role}</p>
                {/* Subtle icon links */}
                {!isComing && node.liveUrl && node.githubUrl && (
                  <div className="flex items-center gap-1 ml-auto">
                    <a href={node.liveUrl} target="_blank" rel="noopener noreferrer"
                      className="eco-icon-link p-1 rounded-md transition-all duration-200 hover:scale-110"
                      title="Ver demo">
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <a href={node.githubUrl} target="_blank" rel="noopener noreferrer"
                      className="eco-icon-link p-1 rounded-md transition-all duration-200 hover:scale-110"
                      title="Ver código">
                      <Github className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Description - ecosystem relationship */}
          <p className="text-xs leading-relaxed eco-card-description mb-4">{node.tagline}</p>

          {/* Shared resources - what connects to the ecosystem */}
          {!isComing && node.shared && node.shared.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-1.5">
                <Layers className={`w-3 h-3 ${node.colorClass}`} />
                <span className="text-[10px] font-semibold uppercase tracking-wider eco-card-description">
                  {node.id === "pulse-ds" ? "Exporta" : "Herda do DS"}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {node.shared.map((item) => (
                  <div key={item} className="eco-shared-item flex items-center gap-1.5 px-2 py-1.5 rounded-lg">
                    <span className={`w-1 h-1 rounded-full ${dotColor}`} />
                    <span className="text-[10px] font-medium eco-card-description">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Visual Map Connection Lines
// ---------------------------------------------------------------------------
function MapConnections() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block" aria-hidden="true">
      <defs>
        <linearGradient id="eco-line-1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgb(99, 102, 241)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="rgb(20, 184, 166)" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="eco-line-2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgb(99, 102, 241)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="rgb(16, 185, 129)" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="eco-line-v" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgb(99, 102, 241)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="rgb(168, 85, 247)" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      {/* Horizontal connections: DS → Chat, DS → Finance */}
      <motion.line
        x1="33.3%" y1="35%" x2="50%" y2="35%"
        stroke="url(#eco-line-1)" strokeWidth="1.5" strokeDasharray="6 4"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
      />
      <motion.line
        x1="66.6%" y1="35%" x2="50%" y2="35%"
        stroke="url(#eco-line-2)" strokeWidth="1.5" strokeDasharray="6 4"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.7 }}
      />
      {/* Vertical connections to coming soon row */}
      {[0, 1, 2].map((i) => (
        <motion.line
          key={i}
          x1={`${16.65 + i * 33.3}%`} y1="55%" x2={`${16.65 + i * 33.3}%`} y2="65%"
          stroke="url(#eco-line-v)" strokeWidth="1" strokeDasharray="4 4"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1 + i * 0.15 }}
        />
      ))}
    </svg>
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
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="ecosystem" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background · vertical circuit lines on sides */}
      {isLightMode ? <AbstractBackgroundLight /> : <AbstractBackground />}

      {/* Ecosystem illustration - left, desktop only */}
      <motion.div
        initial={{ opacity: 0, scale: 0.4, filter: "blur(24px)" }}
        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="hidden md:block absolute top-16 -left-28 lg:-left-16 z-10 pointer-events-none"
      >
        <motion.div
          animate={{
            y: [0, -12, 5, -18, 3, -8, -14, 0],
            x: [0, 4, -2, 6, -4, 2, -1, 0],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-indigo-500/5 rounded-full blur-3xl scale-75" />
            <Image
              src="/ecosystem-icon.png"
              alt=""
              width={480}
              height={320}
              className="w-[480px] h-[320px] opacity-[0.12] dark:opacity-[0.22] select-none hue-rotate-[40deg] saturate-[1.8] brightness-[0.9]"
              draggable={false}
              priority={false}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Dashboard illustration - right, desktop only */}
      <motion.div
        initial={{ opacity: 0, scale: 0.4, filter: "blur(24px)" }}
        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="hidden md:block absolute top-20 -right-28 lg:-right-16 z-10 pointer-events-none"
      >
        <motion.div
          animate={{
            y: [0, -16, 4, -22, 6, -10, -18, 0],
            x: [0, -3, 2, -5, 4, -2, 1, 0],
          }}
          transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-indigo-500/5 rounded-full blur-3xl scale-75" />
            <Image
              src="/ecosystem-dashboard.png"
              alt=""
              width={480}
              height={320}
              className="w-[480px] h-[320px] opacity-[0.12] dark:opacity-[0.22] select-none hue-rotate-[40deg] saturate-[1.8] brightness-[0.9]"
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
            Não são projetos isolados · é um ecossistema onde o Design System alimenta cada aplicação, com tokens, componentes e padrões compartilhados
          </p>
        </motion.div>

        {/* Aggregate Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-8 md:gap-12 mb-14"
        >
          {[
            { ref: totalTests.ref, count: totalTests.count, suffix: "+", label: "Testes" },
            { ref: totalComponents.ref, count: totalComponents.count, suffix: "+", label: "Componentes" },
            { ref: totalPages.ref, count: totalPages.count, suffix: "+", label: "Páginas" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <span ref={stat.ref} className="block text-3xl md:text-4xl font-bold gradient-text tabular-nums">
                {stat.count}{stat.suffix}
              </span>
              <span className="text-xs md:text-sm font-medium eco-stat-aggregate-label">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* ===== VISUAL MAP ===== */}
        <div className="relative">
          <MapConnections />

          {/* Principles bar - what connects everything */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap justify-center gap-3 md:gap-4 mb-10"
          >
            {principles.map((p) => (
              <div key={p.label} className="eco-principle-pill flex items-center gap-2 px-3 py-1.5 rounded-full">
                <p.icon className="w-3.5 h-3.5 text-indigo-400 eco-principle-icon" />
                <span className="text-xs font-medium eco-principle-text">{p.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Live apps row */}
          <div className="grid md:grid-cols-3 gap-5 mb-8">
            {liveApps.map((app, i) => (
              <EcoNodeCard key={app.id} node={app} index={i} />
            ))}
          </div>

          {/* "Expanding" label */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-center mb-6"
          >
            <span className="eco-expanding-label inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400/60 animate-pulse" />
              Expandindo o ecossistema
            </span>
          </motion.div>

          {/* Coming soon apps row */}
          <div className="grid md:grid-cols-3 gap-5">
            {comingApps.map((app, i) => (
              <EcoNodeCard key={app.id} node={app} index={i} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
