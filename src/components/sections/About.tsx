"use client";

import { motion } from "framer-motion";
import { Layers, TestTubes, GitBranch, Rocket } from "lucide-react";
import { useEffect, useState } from "react";
import { AbstractBackground, AbstractBackgroundLight } from "../ui/AbstractBackground";

const highlights = [
  {
    icon: Layers,
    title: "Arquitetura Completa",
    description:
      "Do design system ao deploy. Tokens, componentes, páginas, API, banco de dados e cache num único ecossistema.",
  },
  {
    icon: TestTubes,
    title: "380+ Testes",
    description:
      "Unit, integration e e2e com Vitest e Testing Library. Cobertura real, não só pra encher número.",
  },
  {
    icon: GitBranch,
    title: "Documentação Técnica",
    description:
      "ADRs, diagramas SVG, guias de scaling. Cada decisão arquitetural está documentada e justificada.",
  },
  {
    icon: Rocket,
    title: "Deploy Contínuo",
    description:
      "CI/CD com GitHub Actions, deploy automático na Vercel e Railway, conventional commits em todos os repos.",
  },
];

const techStack = [
  "Next.js",
  "TypeScript",
  "React",
  "Node.js",
  "PostgreSQL",
  "Tailwind CSS",
  "Prisma",
  "Socket.io",
  "Docker",
  "Redis",
  "Vitest",
  "GitHub Actions",
  "Vercel",
  "Railway",
  "Framer Motion",
  "Zod",
  "JWT",
  "REST API",
  "WebSocket",
  "Clean Architecture",
];

// ---------------------------------------------------------------------------
// Architecture SVG diagram (Design System flow)
// ---------------------------------------------------------------------------
function ArchitectureSVG() {
  const layers = [
    { label: "Tokens", y: 40, color: "#818cf8" },
    { label: "Primitives", y: 100, color: "#a78bfa" },
    { label: "Patterns", y: 160, color: "#7c3aed" },
    { label: "Components", y: 220, color: "#6366f1" },
    { label: "Pages", y: 280, color: "#4f46e5" },
  ];

  return (
    <svg width="500" height="340" viewBox="0 0 500 340" fill="none" className="opacity-[0.10]">
      {/* Connection lines between layers */}
      {layers.slice(0, -1).map((layer, i) => {
        const next = layers[i + 1];
        return (
          <g key={`conn-${i}`}>
            <motion.line
              x1="250" y1={layer.y + 18} x2="180" y2={next.y - 8}
              stroke={layer.color} strokeWidth="1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.6 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 + i * 0.2 }}
            />
            <motion.line
              x1="250" y1={layer.y + 18} x2="320" y2={next.y - 8}
              stroke={layer.color} strokeWidth="1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.6 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.6 + i * 0.2 }}
            />
          </g>
        );
      })}

      {/* Layer nodes */}
      {layers.map((layer, i) => (
        <motion.g
          key={layer.label}
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
        >
          <rect
            x="155" y={layer.y - 12} width="190" height="32" rx="8"
            fill={layer.color} fillOpacity="0.15"
            stroke={layer.color} strokeWidth="1" strokeOpacity="0.4"
          />
          <text
            x="250" y={layer.y + 8}
            textAnchor="middle" fill={layer.color}
            fontFamily="JetBrains Mono, monospace" fontSize="13" fontWeight="600"
          >
            {layer.label}
          </text>
          {/* Pulsing dot */}
          <motion.circle
            cx="140" cy={layer.y + 4} r="3"
            fill={layer.color}
            animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.3, 1] }}
            transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.circle
            cx="360" cy={layer.y + 4} r="3"
            fill={layer.color}
            animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.3, 1] }}
            transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.g>
      ))}
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Pipeline SVG diagram (Code → Test → Deploy)
// ---------------------------------------------------------------------------
function PipelineSVG() {
  const steps = [
    { label: "Code", icon: "</>", y: 40, color: "#818cf8" },
    { label: "Test", icon: "✓", y: 100, color: "#34d399" },
    { label: "Build", icon: "⚡", y: 160, color: "#fbbf24" },
    { label: "Review", icon: "⊙", y: 220, color: "#a78bfa" },
    { label: "Deploy", icon: "▲", y: 280, color: "#6366f1" },
  ];

  return (
    <svg width="500" height="340" viewBox="0 0 500 340" fill="none" className="opacity-[0.10]">
      {/* Vertical pipeline line */}
      <motion.line
        x1="250" y1="56" x2="250" y2="272"
        stroke="#6366f1" strokeWidth="2" strokeDasharray="6 4"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.4 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.3 }}
      />

      {/* Step nodes */}
      {steps.map((step, i) => (
        <motion.g
          key={step.label}
          initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 + i * 0.18 }}
        >
          {/* Horizontal connector */}
          <motion.line
            x1={i % 2 === 0 ? 160 : 250}
            y1={step.y + 4}
            x2={i % 2 === 0 ? 250 : 340}
            y2={step.y + 4}
            stroke={step.color} strokeWidth="1.5" strokeOpacity="0.5"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 + i * 0.18 }}
          />

          {/* Node box */}
          <rect
            x={i % 2 === 0 ? 80 : 340}
            y={step.y - 14} width="80" height="34" rx="8"
            fill={step.color} fillOpacity="0.12"
            stroke={step.color} strokeWidth="1" strokeOpacity="0.35"
          />
          <text
            x={i % 2 === 0 ? 120 : 380}
            y={step.y + 6}
            textAnchor="middle" fill={step.color}
            fontFamily="JetBrains Mono, monospace" fontSize="12" fontWeight="600"
          >
            {step.label}
          </text>

          {/* Center pipeline dot */}
          <motion.circle
            cx="250" cy={step.y + 4} r="4"
            fill={step.color} fillOpacity="0.8"
            animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Icon near box */}
          <text
            x={i % 2 === 0 ? 66 : 434}
            y={step.y + 6}
            textAnchor="middle" fill={step.color} fillOpacity="0.6"
            fontSize="14"
          >
            {step.icon}
          </text>
        </motion.g>
      ))}
    </svg>
  );
}

export function About() {
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
    <section id="about" className="relative pt-36 md:pt-44 pb-24 md:pb-32 overflow-hidden">
      {isLightMode ? <AbstractBackgroundLight /> : <AbstractBackground />}

      {/* Architecture diagram - top left */}
      <motion.div
        initial={{ opacity: 0, scale: 0.3, filter: "blur(20px)" }}
        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-8 -left-40 md:-left-32 lg:-left-24 z-10 pointer-events-none"
      >
        <motion.div
          animate={{
            y: [0, -20, 5, -30, 8, -15, -25, 0],
            x: [0, 6, -4, 8, -6, 4, -2, 0],
          }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArchitectureSVG />
        </motion.div>
      </motion.div>

      {/* Pipeline diagram - top right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.3, filter: "blur(20px)" }}
        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-8 -right-40 md:-right-32 lg:-right-24 z-10 pointer-events-none"
      >
        <motion.div
          animate={{
            y: [0, -25, 6, -35, 10, -18, -28, 0],
            x: [0, -5, 3, -8, 6, -3, 2, 0],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        >
          <PipelineSVG />
        </motion.div>
      </motion.div>

      <div className="container-custom relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Sobre <span className="gradient-text">Mim</span>
          </h2>
          <p className="about-subtitle max-w-2xl mx-auto">
            Quem eu sou, o que construí e como posso ajudar no seu próximo
            projeto
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-semibold">
              Full Stack Developer{" "}
              <span className="gradient-text">orientado a produto</span>
            </h3>

            <div className="space-y-4 about-description-text">
              <p>
                Sou Full Stack Developer focado em React, Next.js e Node.js.
                Não construo apenas telas ou APIs isoladas · projeto e
                implemento aplicações completas, do design system até o
                deploy em produção.
              </p>

              <p>
                Criei o <span className="font-semibold text-indigo-400">Pulse Ecosystem</span> do
                zero: um design system com 100+ componentes que serve de
                fundação para múltiplas aplicações em produção · dashboards,
                plataformas real-time, marketplaces e mais por vir.
              </p>

              <p>
                Cada projeto tem arquitetura documentada, testes
                automatizados, CI/CD configurado e decisões técnicas
                registradas em ADRs. Não é só código que funciona · é código
                que escala e que outros devs conseguem manter.
              </p>
            </div>
          </motion.div>

          {/* Highlights grid */}
          <div className="grid sm:grid-cols-2 gap-5">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group h-full about-glow-wrap"
              >
                <div className="about-highlight-card relative p-6 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 h-full z-[1]">
                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Icon */}
                  <div className="relative mb-4">
                    <div className="about-icon-container w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300">
                      <item.icon className="w-6 h-6 text-indigo-400" />
                    </div>
                  </div>

                  {/* Content */}
                  <h4 className="text-lg font-semibold mb-2 text-white/95 about-card-title">
                    {item.title}
                  </h4>
                  <p className="text-sm text-white/70 leading-relaxed about-card-description">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tech stack marquee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16"
        >
          <div className="about-marquee-container relative overflow-hidden rounded-2xl py-4">
            <div className="about-marquee-fade overflow-hidden">
              <div className="about-marquee-track flex items-center gap-6">
                {[...techStack, ...techStack].map((tech, index) => (
                  <span
                    key={`${tech}-${index}`}
                    className="contents"
                  >
                    {index > 0 && <span className="about-marquee-dot" />}
                    <span className="about-marquee-item flex-shrink-0 text-sm font-medium whitespace-nowrap">
                      {tech}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
