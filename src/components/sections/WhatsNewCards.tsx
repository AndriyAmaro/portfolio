"use client";

import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { Brain, Database, Rocket, Shield, Layers, Zap, Globe, Cpu } from "lucide-react";

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

// ---------------------------------------------------------------------------
// WhatNewCard Component
// ---------------------------------------------------------------------------
function WhatNewCardComponent({
  card,
  index,
}: {
  card: WhatNewCard;
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = card.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative rounded-2xl overflow-hidden h-full bg-gray-900/40 border border-white/10 hover:border-white/20 transition-all duration-300"
    >
      {/* Gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />
      
      <div className="relative z-10 p-6 flex flex-col h-full">
        {/* Category badge */}
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-white/60" />
          <span className="text-xs font-medium text-white/60 uppercase tracking-wider">
            {card.category}
          </span>
        </div>

        {/* Icon */}
        <div className="mb-4">
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-tight group-hover:text-indigo-300 transition-colors duration-200">
          {card.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-white/70 mb-4 flex-1 leading-relaxed">
          {card.description}
        </p>

        {/* Models */}
        {card.models && (
          <div className="flex flex-wrap gap-2 mb-4">
            {card.models.map((model) => (
              <span
                key={model}
                className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-white/50"
              >
                {model}
              </span>
            ))}
          </div>
        )}

        {/* Learn more */}
        <div className="flex items-center gap-2 text-indigo-400 text-sm font-medium group-hover:text-indigo-300 transition-colors">
          <span>Learn more</span>
          <svg
            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Main WhatNewCards Section
// ---------------------------------------------------------------------------
export function WhatNewCards() {
  const t = useTranslations("skills");

  return (
    <section className="relative py-16 md:py-24">
      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            <span className="text-xs font-medium text-indigo-300">
              {t("whatsNewBadge") || "PRODUCTION READY"}
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">{t("whatsNewTitle") || "What's New"}</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            {t("whatsNewSubtitle") || "Inovações em IA generativa, cloud e arquitetura que fazem a diferença em produção."}
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {whatNewCards.map((card, index) => (
            <WhatNewCardComponent key={card.id} card={card} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
