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
  ShoppingCart,
  Bot,
  Lock,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { EcosystemBackground } from "../ui/EcosystemBackground";

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
  stats: string;
  liveUrl?: string;
  githubUrl?: string;
  status: "live" | "coming";
}

const liveApps: EcoNode[] = [
  {
    id: "pulse-ds",
    name: "Pulse Design System",
    shortName: "Design System",
    tagline: "100+ componentes · 56 paginas · 25 dashboards",
    icon: <PulseDSIcon />,
    color: "indigo",
    colorClass: "text-indigo-400",
    borderClass: "border-indigo-500/30",
    bgClass: "bg-indigo-500/10",
    glowColor: "rgba(99, 102, 241, 0.15)",
    stats: "A fundacao",
    liveUrl: "https://pulse-saas-theme.vercel.app",
    githubUrl: "https://github.com/AndriyAmaro/pulse-saas-theme",
    status: "live",
  },
  {
    id: "pulse-chat",
    name: "Pulse Chat",
    shortName: "Chat",
    tagline: "32 eventos WS · 98 testes · real-time",
    icon: <PulseChatIcon />,
    color: "teal",
    colorClass: "text-teal-400",
    borderClass: "border-teal-500/30",
    bgClass: "bg-teal-500/10",
    glowColor: "rgba(20, 184, 166, 0.15)",
    stats: "Comunicacao",
    liveUrl: "https://realtime-chat-eight-beryl.vercel.app",
    githubUrl: "https://github.com/AndriyAmaro/realtime-chat",
    status: "live",
  },
  {
    id: "pulse-finance",
    name: "Pulse Finance",
    shortName: "Finance",
    tagline: "143 testes · Clean Architecture · Redis",
    icon: <PulseFinanceIcon />,
    color: "emerald",
    colorClass: "text-emerald-400",
    borderClass: "border-emerald-500/30",
    bgClass: "bg-emerald-500/10",
    glowColor: "rgba(16, 185, 129, 0.15)",
    stats: "Dashboard",
    liveUrl: "https://dashboard-finance-swart.vercel.app",
    githubUrl: "https://github.com/AndriyAmaro/finance-flow",
    status: "live",
  },
];

const comingApps: EcoNode[] = [
  {
    id: "pulse-store",
    name: "Pulse Store",
    shortName: "Store",
    tagline: "E-commerce com pagamentos",
    icon: <ShoppingCart className="w-5 h-5" />,
    color: "amber",
    colorClass: "text-amber-400",
    borderClass: "border-amber-500/20",
    bgClass: "bg-amber-500/10",
    glowColor: "rgba(245, 158, 11, 0.1)",
    stats: "E-commerce",
    status: "coming",
  },
  {
    id: "pulse-ai",
    name: "Pulse AI",
    shortName: "AI",
    tagline: "Assistente com RAG e agentes",
    icon: <Bot className="w-5 h-5" />,
    color: "purple",
    colorClass: "text-purple-400",
    borderClass: "border-purple-500/20",
    bgClass: "bg-purple-500/10",
    glowColor: "rgba(168, 85, 247, 0.1)",
    stats: "AI Agent",
    status: "coming",
  },
  {
    id: "pulse-auth",
    name: "Pulse Auth",
    shortName: "Auth",
    tagline: "Auth service multi-tenant",
    icon: <Lock className="w-5 h-5" />,
    color: "rose",
    colorClass: "text-rose-400",
    borderClass: "border-rose-500/20",
    bgClass: "bg-rose-500/10",
    glowColor: "rgba(244, 63, 94, 0.1)",
    stats: "Identity",
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

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: isCenter ? 0 : 0.2 + index * 0.1 }}
      className={`group relative ${isCenter ? "" : ""}`}
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
        {/* Top gradient bar - premium */}
        {!isComing && <div className={`h-1.5 bg-gradient-to-r ${
          node.color === "indigo" ? "from-indigo-500 via-violet-500 to-purple-500" :
          node.color === "teal" ? "from-teal-500 via-cyan-400 to-teal-500" :
          "from-emerald-500 via-green-400 to-emerald-500"
        }`} />}
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
        {/* Header */}
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
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    node.color === "indigo" ? "bg-indigo-400" :
                    node.color === "teal" ? "bg-teal-400" : "bg-emerald-400"
                  } animate-pulse`} />
                  <span className="text-[9px] font-bold uppercase tracking-wider eco-status-text">Live</span>
                </span>
              )}
            </div>
            <p className={`text-xs ${node.colorClass} font-medium mt-0.5 eco-card-tagline`}>{node.stats}</p>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-xs leading-relaxed eco-card-description mb-4">{node.tagline}</p>

        {/* Actions - only for live */}
        {!isComing && node.liveUrl && node.githubUrl && (
          <div className="flex gap-2">
            <a href={node.liveUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
              <button className={`w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-300 bg-gradient-to-r ${
                node.color === "indigo" ? "from-indigo-500 to-violet-500 shadow-indigo-500/20" :
                node.color === "teal" ? "from-teal-500 to-cyan-500 shadow-teal-500/20" :
                "from-emerald-500 to-green-500 shadow-emerald-500/20"
              } text-white hover:shadow-lg hover:opacity-90`}>
                <ExternalLink className="w-3 h-3" />
                Demo
              </button>
            </a>
            <a href={node.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
              <button className="w-full eco-btn-secondary flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-300">
                <Github className="w-3 h-3" />
                Codigo
              </button>
            </a>
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
    <section id="ecosystem" className="eco-section-bg relative py-24 md:py-32 overflow-hidden">
      {/* Background · animated waves */}
      <EcosystemBackground />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Gradient orbs for depth */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-500/[0.06] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-violet-500/[0.05] rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/[0.03] rounded-full blur-[140px]" />
        {/* Corner accent glows */}
        <div className="absolute -top-10 -left-10 w-[300px] h-[300px] bg-indigo-500/[0.05] rounded-full blur-[100px]" />
        <div className="absolute -bottom-10 -right-10 w-[300px] h-[300px] bg-violet-500/[0.05] rounded-full blur-[100px]" />
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
            Nao sao projetos isolados · e um ecossistema onde o Design System alimenta cada aplicacao, com tokens, componentes e padroes compartilhados
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
            { ref: totalPages.ref, count: totalPages.count, suffix: "", label: "Paginas" },
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

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-14 text-center"
        >
          <a href="https://github.com/AndriyAmaro" target="_blank" rel="noopener noreferrer" className="inline-block">
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
