"use client";

import { motion } from "framer-motion";
import {
  Layout,
  Server,
  Palette,
  Rocket,
  Code2,
  Database,
  ArrowRight,
  CheckCircle2,
  MessageSquare,
  FileSearch,
  Layers,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ServicesBackground, ServicesBackgroundLight } from "@/components/ui/ServicesBackground";

// ---------------------------------------------------------------------------
// Services Data
// ---------------------------------------------------------------------------
interface Service {
  id: string;
  icon: typeof Layout;
  title: string;
  description: string;
  deliverables: string[];
  color: "indigo" | "violet" | "cyan" | "emerald";
}

const services: Service[] = [
  {
    id: "frontend",
    icon: Layout,
    title: "Frontend Development",
    description:
      "Interfaces performaticas com React e Next.js · design systems, dashboards, landing pages e SPAs com acessibilidade e animacoes premium.",
    deliverables: [
      "React / Next.js App Router",
      "Design System com Radix UI",
      "Animacoes Framer Motion",
      "Responsivo mobile-first",
      "Lighthouse 90+",
    ],
    color: "indigo",
  },
  {
    id: "backend",
    icon: Server,
    title: "Backend & APIs",
    description:
      "APIs type-safe com Node.js, banco de dados relacional, cache, filas e arquitetura escalavel. Do MVP ao multi-tenant.",
    deliverables: [
      "Node.js / Express / Hono",
      "PostgreSQL + Prisma ORM",
      "Redis cache + BullMQ",
      "WebSocket real-time",
      "Clean Architecture",
    ],
    color: "violet",
  },
  {
    id: "fullstack",
    icon: Rocket,
    title: "Full Stack Apps",
    description:
      "Aplicacoes completas do design ao deploy · frontend, backend, banco de dados, CI/CD e monitoramento. Tudo num unico pacote.",
    deliverables: [
      "App completo end-to-end",
      "Auth + multi-tenancy",
      "Deploy Vercel / Railway",
      "CI/CD GitHub Actions",
      "Testes automatizados",
    ],
    color: "cyan",
  },
  {
    id: "design-system",
    icon: Palette,
    title: "Design Systems",
    description:
      "Sistemas de design reutilizaveis com tokens, componentes compostos e documentacao. A mesma abordagem do Pulse DS com 100+ componentes.",
    deliverables: [
      "Tokens de design (cores, tipografia)",
      "Componentes compostos",
      "Dark / Light mode",
      "Storybook ou docs",
      "Acessibilidade WCAG AA",
    ],
    color: "emerald",
  },
];

// ---------------------------------------------------------------------------
// Process Steps
// ---------------------------------------------------------------------------
const processSteps = [
  {
    icon: MessageSquare,
    title: "Conversa",
    description: "Entendo o problema, escopo e expectativas",
  },
  {
    icon: FileSearch,
    title: "Proposta",
    description: "Arquitetura, cronograma e orcamento claros",
  },
  {
    icon: Code2,
    title: "Desenvolvimento",
    description: "Sprints com entregas parciais e feedback continuo",
  },
  {
    icon: Rocket,
    title: "Entrega",
    description: "Deploy, documentacao e handoff completo",
  },
];

// ---------------------------------------------------------------------------
// Color Maps
// ---------------------------------------------------------------------------
const colorMap = {
  indigo: {
    gradient: "from-indigo-500 to-indigo-600",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
    borderHover: "hover:border-indigo-500/40",
    text: "text-indigo-400",
    ring: "ring-indigo-500/30",
    glow: "shadow-indigo-500/20",
    checkColor: "text-indigo-400/70",
  },
  violet: {
    gradient: "from-violet-500 to-purple-600",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    borderHover: "hover:border-violet-500/40",
    text: "text-violet-400",
    ring: "ring-violet-500/30",
    glow: "shadow-violet-500/20",
    checkColor: "text-violet-400/70",
  },
  cyan: {
    gradient: "from-cyan-500 to-blue-500",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    borderHover: "hover:border-cyan-500/40",
    text: "text-cyan-400",
    ring: "ring-cyan-500/30",
    glow: "shadow-cyan-500/20",
    checkColor: "text-cyan-400/70",
  },
  emerald: {
    gradient: "from-emerald-500 to-green-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    borderHover: "hover:border-emerald-500/40",
    text: "text-emerald-400",
    ring: "ring-emerald-500/30",
    glow: "shadow-emerald-500/20",
    checkColor: "text-emerald-400/70",
  },
} as const;

// ---------------------------------------------------------------------------
// Service Card
// ---------------------------------------------------------------------------
function ServiceCard({ service, index }: { service: Service; index: number }) {
  const c = colorMap[service.color];
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div
        className={`svc-card relative rounded-2xl border ${c.border} ${c.borderHover} overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${c.glow} h-full flex flex-col`}
      >
        {/* Gradient top bar */}
        <div className={`h-1 bg-gradient-to-r ${c.gradient}`} />

        {/* Hover glow */}
        <div
          className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${c.gradient} opacity-0 group-hover:opacity-[0.06] rounded-full blur-3xl transition-opacity duration-700`}
        />

        <div className="p-6 flex flex-col flex-1">
          {/* Icon + Title */}
          <div className="flex items-center gap-3 mb-4">
            <div
              className={`w-11 h-11 rounded-xl ${c.bg} flex items-center justify-center ring-1 ${c.ring} transition-transform duration-300 group-hover:scale-110`}
            >
              <Icon className={`w-5 h-5 ${c.text}`} />
            </div>
            <h3 className="svc-card-title text-lg font-bold">{service.title}</h3>
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed mb-5 svc-card-description">
            {service.description}
          </p>

          {/* Deliverables */}
          <div className="space-y-2 mt-auto">
            <span className="text-[10px] font-bold uppercase tracking-wider svc-deliverables-label">
              Entregas
            </span>
            <ul className="space-y-1.5">
              {service.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-2">
                  <CheckCircle2 className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${c.checkColor}`} />
                  <span className="text-xs svc-deliverable-text">{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Process Step
// ---------------------------------------------------------------------------
function ProcessStep({
  step,
  index,
  isLast,
}: {
  step: (typeof processSteps)[0];
  index: number;
  isLast: boolean;
}) {
  const Icon = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
      className="relative flex flex-col items-center text-center"
    >
      {/* Step number + icon */}
      <div className="relative mb-3">
        <div className="svc-process-icon w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 hover:scale-105">
          <Icon className="w-6 h-6 svc-process-icon-color" />
        </div>
        <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-[10px] font-bold flex items-center justify-center">
          {index + 1}
        </span>
      </div>

      {/* Title */}
      <h4 className="text-sm font-bold mb-1 svc-process-title">{step.title}</h4>
      <p className="text-xs leading-relaxed svc-process-description max-w-[140px]">
        {step.description}
      </p>

      {/* Connector arrow (not on last) */}
      {!isLast && (
        <div className="hidden sm:block absolute top-7 -right-[calc(50%-8px)] w-[calc(100%-16px)]">
          <div className="svc-connector h-[2px] w-full" />
        </div>
      )}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Main Services Section
// ---------------------------------------------------------------------------
export function Services() {
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
    <section id="services" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      {isLightMode ? <ServicesBackgroundLight /> : <ServicesBackground />}

      <div className="container-custom relative z-10">
        {/* Section Header */}
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
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full svc-section-badge mb-6"
          >
            <Zap className="w-3.5 h-3.5 svc-badge-icon" />
            <span className="text-xs font-semibold tracking-wider uppercase svc-badge-text">
              Aberto para Projetos
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Como posso <span className="gradient-text">ajudar</span>
          </h2>
          <p className="svc-subtitle max-w-2xl mx-auto">
            Do MVP ao produto escalavel · entrego aplicacoes completas com a mesma
            qualidade e rigor que aplico no Pulse Ecosystem
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Process Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h3 className="text-center text-lg font-semibold mb-10 svc-process-heading">
            Como funciona
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-4 max-w-2xl mx-auto">
            {processSteps.map((step, index) => (
              <ProcessStep
                key={step.title}
                step={step}
                index={index}
                isLast={index === processSteps.length - 1}
              />
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <div className="svc-cta-card inline-flex flex-col items-center gap-4 px-8 py-8 rounded-2xl max-w-md mx-auto">
            <Layers className="w-8 h-8 svc-cta-icon" />
            <h3 className="text-xl font-bold svc-cta-title">
              Tem um projeto em mente?
            </h3>
            <p className="text-sm svc-cta-description">
              Vamos conversar sobre como posso transformar sua ideia em um produto real e escalavel.
            </p>
            <Link href="#contact" className="group w-full sm:w-auto">
              <button className="w-full sm:w-auto svc-cta-btn flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5">
                <MessageSquare className="w-4 h-4" />
                Iniciar Conversa
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
