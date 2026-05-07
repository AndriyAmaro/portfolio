"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef, useState, useEffect, useCallback } from "react";
import { Brain, Database, Rocket, Shield, Layers, Zap, Globe, Cpu, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

// ---------------------------------------------------------------------------
// Card Data · Estilo Alibaba Cloud PAI "What's New"
// ---------------------------------------------------------------------------
interface WhatNewCard {
  id: string;
  category: string;
  title: string;
  description: string;
  models?: string[];
  icon: React.FC<{ className?: string }>;
  gradient: string;
}

const whatNewCards: WhatNewCard[] = [
  {
    id: "ai-gateway",
    category: "AI Systems",
    title: "Multi-Provider AI Gateway",
    description: "Gateway inteligente com fallback automático entre Claude, DeepSeek, Qwen e OpenAI. Budget enforcement em 3 níveis e anti-alucinação 5 camadas.",
    models: ["Claude Opus 4.7", "DeepSeek", "Qwen 3.6 Plus", "OpenAI GPT"],
    icon: Brain,
    gradient: "from-fuchsia-500/20 via-fuchsia-500/5 to-transparent",
  },
  {
    id: "vector-db",
    category: "Vector Database",
    title: "Semantic Search with pgvector",
    description: "PostgreSQL 18.3 + pgvector com HNSW indexes para busca semântica em tempo real. Memória persistente com deduplicação automática.",
    models: ["pgvector 0.8.2", "HNSW", "PostgreSQL 18.3"],
    icon: Database,
    gradient: "from-cyan-500/20 via-cyan-500/5 to-transparent",
  },
  {
    id: "cloud-deploy",
    category: "Cloud & Deploy",
    title: "Railway + Cloudflare Edge",
    description: "Deploy automatizado com Docker multi-stage. CDN Cloudflare grátis para assets estáticos. Zero downtime com health checks.",
    models: ["Railway", "Cloudflare", "Docker"],
    icon: Rocket,
    gradient: "from-emerald-500/20 via-emerald-500/5 to-transparent",
  },
  {
    id: "multi-tenant",
    category: "Security",
    title: "Multi-Tenant Isolation",
    description: "tenantId em TODA query Prisma. JWT com tenantId embutido. Row-Level Security como backup. Zero cross-tenant leaks.",
    models: ["RLS", "JWT", "Prisma Extension"],
    icon: Shield,
    gradient: "from-amber-500/20 via-amber-500/5 to-transparent",
  },
  {
    id: "modular-arch",
    category: "Architecture",
    title: "Modular Event-Driven",
    description: "32 módulos replaceable com barrel index. Event Bus pub/sub tipado com 9 Worlds. Nova feature = nova pasta, zero refactor.",
    models: ["32 modules", "9 Worlds", "Event Bus"],
    icon: Layers,
    gradient: "from-indigo-500/20 via-indigo-500/5 to-transparent",
  },
  {
    id: "performance",
    category: "Performance",
    title: "50ms P95 Query Time",
    description: "Otimização com composite indexes (tenantId, createdAt), Redis L2 cache, BullMQ parallel workers. Cursor pagination nativo.",
    models: ["Redis", "BullMQ", "Cursor Pagination"],
    icon: Zap,
    gradient: "from-violet-500/20 via-violet-500/5 to-transparent",
  },
  {
    id: "global-scale",
    category: "Scale",
    title: "Production-Ready Scale",
    description: "1036 endpoints, 126 Prisma models, 394 AI tools. 4 apps production-ready com design system compartilhado.",
    models: ["1036 endpoints", "126 models", "394 tools"],
    icon: Globe,
    gradient: "from-blue-500/20 via-blue-500/5 to-transparent",
  },
  {
    id: "automation",
    category: "Automation",
    title: "CI/CD + Auto-Migration",
    description: "GitHub Actions com tsc + next build + vitest. Auto-migration idempotente no boot. Rolling deploy com health check.",
    models: ["GitHub Actions", "Nixpacks", "ensureSchemaSync"],
    icon: Cpu,
    gradient: "from-pink-500/20 via-pink-500/5 to-transparent",
  },
];

// Cards visíveis por vez
const VISIBLE_CARDS = 3;

// ---------------------------------------------------------------------------
// WhatNewCard Component (individual)
// ---------------------------------------------------------------------------
function WhatNewCardComponent({
  card,
  index,
}: {
  card: WhatNewCard;
  index: number;
}) {
  const Icon = card.icon;

  return (
    <motion.div
      key={card.id}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group relative rounded-2xl overflow-hidden h-full bg-gray-900/40 border border-white/10 hover:border-white/20 transition-all duration-300 flex-shrink-0"
      style={{ minWidth: "calc(33.333% - 1rem)" }}
    >
      {/* Gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />
      
      <div className="relative z-10 p-5 md:p-6 flex flex-col h-full">
        {/* Category badge */}
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-white/60" />
          <span className="text-[10px] md:text-xs font-medium text-white/60 uppercase tracking-wider">
            {card.category}
          </span>
        </div>

        {/* Icon */}
        <div className="mb-3">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/10 flex items-center justify-center">
            <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base md:text-lg font-bold text-white mb-2 uppercase tracking-tight group-hover:text-indigo-300 transition-colors duration-200 line-clamp-2">
          {card.title}
        </h3>

        {/* Description */}
        <p className="text-xs md:text-sm text-white/70 mb-3 flex-1 leading-relaxed line-clamp-3">
          {card.description}
        </p>

        {/* Models */}
        {card.models && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {card.models.slice(0, 3).map((model) => (
              <span
                key={model}
                className="px-1.5 py-0.5 rounded md:rounded-md bg-white/5 border border-white/10 text-[10px] md:text-xs font-mono text-white/50 truncate max-w-[120px]"
              >
                {model}
              </span>
            ))}
          </div>
        )}

        {/* Learn more */}
        <div className="flex items-center gap-1.5 md:gap-2 text-indigo-400 text-xs md:text-sm font-medium group-hover:text-indigo-300 transition-colors">
          <span>Learn more</span>
          <ChevronRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Main Carousel Component
// ---------------------------------------------------------------------------
export function WhatNewCards() {
  const t = useTranslations("skills");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const maxIndex = Math.max(0, whatNewCards.length - VISIBLE_CARDS);

  // Intersection Observer para autoplay só quando visível
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  // Autoplay
  useEffect(() => {
    if (isAutoPlaying && isInView) {
      autoplayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
      }, 4000);
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [isAutoPlaying, isInView, maxIndex]);

  const goTo = useCallback((index: number) => {
    setCurrentIndex(Math.max(0, Math.min(index, maxIndex)));
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  }, [maxIndex]);

  const goNext = useCallback(() => {
    goTo(currentIndex >= maxIndex ? 0 : currentIndex + 1);
  }, [currentIndex, maxIndex, goTo]);

  const goPrev = useCallback(() => {
    goTo(currentIndex <= 0 ? maxIndex : currentIndex - 1);
  }, [currentIndex, maxIndex, goTo]);

  const visibleCards = whatNewCards.slice(currentIndex, currentIndex + VISIBLE_CARDS);

  return (
    <section ref={ref} className="relative py-16 md:py-24 overflow-hidden">
      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-4 md:mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            <span className="text-[10px] md:text-xs font-medium text-indigo-300">
              {t("whatsNewBadge") || "PRODUCTION READY"}
            </span>
          </motion.div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 md:mb-4">
            <span className="gradient-text">{t("whatsNewTitle") || "What's New"}</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-sm md:text-base px-4">
            {t("whatsNewSubtitle") || "Inovações em IA generativa, cloud e arquitetura que fazem a diferença em produção."}
          </p>
        </motion.div>

        {/* Carousel Controls */}
        <div className="flex items-center justify-between mb-6 px-2">
          {/* Prev Button */}
          <button
            onClick={goPrev}
            className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-200 group"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white/60 group-hover:text-white group-hover:-translate-x-0.5 transition-all" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {Array.from({ length: maxIndex + 1 }, (_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === currentIndex
                    ? "w-8 h-2 bg-indigo-500"
                    : "w-2 h-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Autoplay Toggle + Next Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-200 group"
              aria-label={isAutoPlaying ? "Pause autoplay" : "Resume autoplay"}
            >
              {isAutoPlaying ? (
                <Pause className="w-4 h-4 md:w-5 md:h-5 text-white/60 group-hover:text-white transition-colors" />
              ) : (
                <Play className="w-4 h-4 md:w-5 md:h-5 text-white/60 group-hover:text-white transition-colors" />
              )}
            </button>
            <button
              onClick={goNext}
              className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-200 group"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white/60 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
            </button>
          </div>
        </div>

        {/* Carousel Cards */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-4 md:gap-6"
            animate={{ x: `-${currentIndex * (100 / VISIBLE_CARDS)}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ width: `${(whatNewCards.length / VISIBLE_CARDS) * 100}%` }}
          >
            {whatNewCards.map((card, index) => (
              <div
                key={card.id}
                className="flex-shrink-0"
                style={{ width: `${100 / whatNewCards.length}%` }}
              >
                <WhatNewCardComponent card={card} index={index} />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Slide Counter */}
        <div className="flex items-center justify-center gap-2 mt-6 text-xs md:text-sm text-white/40">
          <span>{currentIndex + 1}</span>
          <span>/</span>
          <span>{maxIndex + 1}</span>
        </div>
      </div>
    </section>
  );
}
