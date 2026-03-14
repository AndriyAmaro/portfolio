"use client";

import { motion } from "framer-motion";
import {
  Layout,
  Server,
  Palette,
  Rocket,
  Code2,
  ArrowRight,
  CheckCircle2,
  MessageSquare,
  FileSearch,
  Layers,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { AbstractBackground, AbstractBackgroundLight } from "@/components/ui/AbstractBackground";

// ---------------------------------------------------------------------------
// Services Data
// ---------------------------------------------------------------------------
interface Service {
  id: string;
  tKey: string;
  icon: typeof Layout;
  color: "indigo" | "violet" | "cyan" | "emerald";
}

const services: Service[] = [
  { id: "frontend", tKey: "frontend", icon: Layout, color: "indigo" },
  { id: "backend", tKey: "backend", icon: Server, color: "violet" },
  { id: "fullstack", tKey: "fullstack", icon: Rocket, color: "cyan" },
  { id: "design-system", tKey: "designSystem", icon: Palette, color: "emerald" },
];

// ---------------------------------------------------------------------------
// Process Steps
// ---------------------------------------------------------------------------
const processSteps = [
  {
    icon: MessageSquare,
    tKey: "process.conversation",
  },
  {
    icon: FileSearch,
    tKey: "process.proposal",
  },
  {
    icon: Code2,
    tKey: "process.development",
  },
  {
    icon: Rocket,
    tKey: "process.delivery",
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
  const t = useTranslations("services");
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

        <div className="p-6 flex flex-col flex-1 relative">
          {/* Decorative icon - bottom right */}
          <motion.div
            className="absolute bottom-4 right-4 pointer-events-none"
            animate={{
              opacity: [0.06, 0.12, 0.06],
              scale: [1, 1.1, 1],
              rotate: [0, 8, 0],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Icon className={`w-20 h-20 ${c.text}`} />
          </motion.div>

          {/* Icon + Title */}
          <div className="flex items-center gap-3 mb-4 relative z-[1]">
            <div
              className={`w-11 h-11 rounded-xl ${c.bg} flex items-center justify-center ring-1 ${c.ring} transition-transform duration-300 group-hover:scale-110`}
            >
              <Icon className={`w-5 h-5 ${c.text}`} />
            </div>
            <h3 className="svc-card-title text-lg font-bold">{t(`${service.tKey}.title`)}</h3>
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed mb-5 svc-card-description relative z-[1]">
            {t(`${service.tKey}.description`)}
          </p>

          {/* Deliverables */}
          <div className="space-y-2 mt-auto relative z-[1]">
            <span className="text-[10px] font-bold uppercase tracking-wider svc-deliverables-label">
              {t("deliverablesLabel")}
            </span>
            <ul className="space-y-1.5">
              {(t.raw(`${service.tKey}.deliverables`) as string[]).map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${c.checkColor}`} />
                  <span className="text-xs svc-deliverable-text">{item}</span>
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
  const t = useTranslations("services");
  const Icon = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col items-center text-center group"
    >
      {/* Connector line (not on last) */}
      {!isLast && (
        <div className="hidden sm:block absolute top-7 -right-[calc(50%-8px)] w-[calc(100%-16px)] z-0">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 + index * 0.15, ease: "easeOut" }}
            className="svc-connector h-[2px] w-full origin-left"
          />
          {/* Animated dot traveling along connector */}
          <motion.div
            initial={{ left: "0%", opacity: 0 }}
            whileInView={{ left: "100%", opacity: [0, 1, 1, 0] }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.8 + index * 0.15, ease: "easeInOut" }}
            className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_6px_rgba(99,102,241,0.6)]"
          />
        </div>
      )}

      {/* Step number + icon with glow */}
      <div className="relative mb-3 z-10">
        {/* Background glow on hover */}
        <div className="absolute inset-0 -m-3 rounded-3xl bg-indigo-500/0 group-hover:bg-indigo-500/10 blur-xl transition-all duration-500" />

        <motion.div
          whileHover={{ scale: 1.1, rotate: [0, -3, 3, 0] }}
          transition={{ duration: 0.4 }}
          className="svc-process-icon w-14 h-14 rounded-2xl flex items-center justify-center relative overflow-hidden"
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <Icon className="w-6 h-6 svc-process-icon-color relative z-10" />
        </motion.div>

        {/* Step number badge with pulse */}
        <motion.span
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.4 + index * 0.15 }}
          className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-[10px] font-bold flex items-center justify-center shadow-lg shadow-indigo-500/30"
        >
          {index + 1}
        </motion.span>
      </div>

      {/* Title */}
      <motion.h4
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.5 + index * 0.15 }}
        className="text-sm font-bold mb-1 svc-process-title"
      >
        {t(`${step.tKey}.title`)}
      </motion.h4>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.6 + index * 0.15 }}
        className="text-xs leading-relaxed svc-process-description max-w-[140px]"
      >
        {t(`${step.tKey}.description`)}
      </motion.p>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Main Services Section
// ---------------------------------------------------------------------------
export function Services() {
  const t = useTranslations("services");
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
      {isLightMode ? <AbstractBackgroundLight /> : <AbstractBackground />}

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
              {t("badge")}
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t("title")} <span className="gradient-text">{t("titleHighlight")}</span>
          </h2>
          <p className="svc-subtitle max-w-2xl mx-auto">
            {t("subtitle")}
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
            {t("process.title")}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-4 max-w-2xl mx-auto">
            {processSteps.map((step, index) => (
              <ProcessStep
                key={step.tKey}
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
          <div className="svc-cta-card relative inline-flex flex-col items-center gap-4 px-8 py-8 rounded-2xl max-w-md mx-auto overflow-hidden">
            {/* Top gradient accent */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />

            {/* Decorative glow */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[300px] h-[200px] bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />

            {/* Animated icon */}
            <motion.div
              animate={{ y: [0, -6, 0], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 ring-1 ring-indigo-500/30 flex items-center justify-center"
            >
              <Layers className="w-8 h-8 text-indigo-400" />
            </motion.div>

            <h3 className="text-xl font-bold svc-cta-title">
              {t("cta.title")}
            </h3>
            <p className="text-sm svc-cta-description">
              {t("cta.description")}
            </p>
            <a href="#contact" className="group w-full sm:w-auto">
              <button className="w-full sm:w-auto svc-cta-btn flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5">
                <MessageSquare className="w-4 h-4" />
                {t("cta.button")}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </a>

            {/* Bottom decorative line */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
