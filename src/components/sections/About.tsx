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
// Architecture SVG — Horizontal layered flow with sequential build animation
// ---------------------------------------------------------------------------
function ArchitectureSVG() {
  const nodes = [
    { label: "Tokens", x: 80, color: "#818cf8" },
    { label: "Primitives", x: 170, color: "#a78bfa" },
    { label: "Patterns", x: 270, color: "#7c3aed" },
    { label: "Components", x: 370, color: "#6366f1" },
    { label: "Pages", x: 470, color: "#4f46e5" },
  ];
  const cy = 170;

  return (
    <svg width="560" height="340" viewBox="0 0 560 340" fill="none" className="opacity-[0.20]">
      <defs>
        <filter id="arch-glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Connection lines drawing left → right */}
      {nodes.slice(0, -1).map((node, i) => {
        const next = nodes[i + 1];
        return (
          <motion.line
            key={`line-${i}`}
            x1={node.x + 28} y1={cy}
            x2={next.x - 28} y2={cy}
            stroke={node.color} strokeWidth="1.5" strokeOpacity="0.6"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 + i * 0.35, ease: [0.16, 1, 0.3, 1] }}
          />
        );
      })}

      {/* Traveling light pulse along connections (loops forever) */}
      {nodes.slice(0, -1).map((node, i) => {
        const next = nodes[i + 1];
        return (
          <motion.circle
            key={`pulse-${i}`}
            r="3" fill={next.color} filter="url(#arch-glow)"
            initial={{ cx: node.x + 28, cy, opacity: 0 }}
            animate={{
              cx: [node.x + 28, next.x - 28],
              opacity: [0, 0.9, 0.9, 0],
            }}
            transition={{
              duration: 1.2,
              delay: 2 + i * 1.4,
              repeat: Infinity,
              repeatDelay: nodes.length * 1.4 - 1.2,
              ease: "easeInOut",
            }}
          />
        );
      })}

      {/* Hexagonal nodes forming one by one */}
      {nodes.map((node, i) => {
        const r = 26;
        const hex = Array.from({ length: 6 }, (_, k) => {
          const angle = (Math.PI / 3) * k - Math.PI / 2;
          return `${node.x + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
        }).join(" ");

        return (
          <motion.g
            key={node.label}
            initial={{ opacity: 0, scale: 0.3 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: `${node.x}px ${cy}px` }}
          >
            {/* Hex glow */}
            <motion.polygon
              points={hex}
              fill={node.color} fillOpacity="0.08"
              stroke={node.color} strokeWidth="1.5" strokeOpacity="0.5"
              animate={{ strokeOpacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Label */}
            <text
              x={node.x} y={cy + 4}
              textAnchor="middle" fill={node.color}
              fontFamily="JetBrains Mono, monospace" fontSize="9" fontWeight="600"
            >
              {node.label}
            </text>

            {/* Top branch lines */}
            <motion.line
              x1={node.x} y1={cy - r - 2} x2={node.x - 20} y2={cy - r - 30}
              stroke={node.color} strokeWidth="0.8" strokeOpacity="0.3"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.3 }}
            />
            <motion.line
              x1={node.x} y1={cy - r - 2} x2={node.x + 20} y2={cy - r - 30}
              stroke={node.color} strokeWidth="0.8" strokeOpacity="0.3"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.7 + i * 0.3 }}
            />

            {/* Bottom branch lines */}
            <motion.line
              x1={node.x} y1={cy + r + 2} x2={node.x - 15} y2={cy + r + 25}
              stroke={node.color} strokeWidth="0.8" strokeOpacity="0.3"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.65 + i * 0.3 }}
            />
            <motion.line
              x1={node.x} y1={cy + r + 2} x2={node.x + 15} y2={cy + r + 25}
              stroke={node.color} strokeWidth="0.8" strokeOpacity="0.3"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.75 + i * 0.3 }}
            />

            {/* Branch tip dots */}
            <motion.circle
              cx={node.x - 20} cy={cy - r - 30} r="2"
              fill={node.color} fillOpacity="0.5"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
            />
            <motion.circle
              cx={node.x + 20} cy={cy - r - 30} r="2"
              fill={node.color} fillOpacity="0.5"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2.3, repeat: Infinity, delay: i * 0.4 }}
            />
          </motion.g>
        );
      })}

      {/* Arrow indicator at the end */}
      <motion.path
        d="M498 170 L510 170 L505 165 M510 170 L505 175"
        stroke="#4f46e5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.6 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 2.2 }}
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Pipeline SVG — Vertical path with traveling light
// ---------------------------------------------------------------------------
function PipelineSVG() {
  const steps = [
    { label: "Code", x: 140, y: 50, color: "#818cf8" },
    { label: "Test", x: 360, y: 110, color: "#34d399" },
    { label: "Build", x: 140, y: 170, color: "#fbbf24" },
    { label: "Review", x: 360, y: 230, color: "#a78bfa" },
    { label: "Deploy", x: 250, y: 300, color: "#6366f1" },
  ];

  // Build the zigzag path string
  const pathParts = steps.map((s, i) => (i === 0 ? `M${s.x},${s.y}` : `L${s.x},${s.y}`));
  const pathD = pathParts.join(" ");

  return (
    <svg width="500" height="340" viewBox="0 0 500 340" fill="none" className="opacity-[0.20]">
      <defs>
        <filter id="pipe-glow">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <linearGradient id="pipe-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="50%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
      </defs>

      {/* Base path (draws in) */}
      <motion.path
        d={pathD}
        stroke="url(#pipe-gradient)" strokeWidth="1.5" strokeOpacity="0.25"
        fill="none" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Traveling light along the path */}
      <motion.circle
        r="5" fill="#a78bfa" filter="url(#pipe-glow)"
        initial={{ offsetDistance: "0%", opacity: 0 }}
        animate={{ offsetDistance: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
        transition={{
          duration: 4,
          delay: 3,
          repeat: Infinity,
          repeatDelay: 1,
          ease: "easeInOut",
          opacity: { times: [0, 0.05, 0.9, 1] },
        }}
        style={{ offsetPath: `path('${pathD}')` }}
      />

      {/* Secondary trailing light */}
      <motion.circle
        r="3" fill="#818cf8" filter="url(#pipe-glow)" opacity="0.6"
        initial={{ offsetDistance: "0%", opacity: 0 }}
        animate={{ offsetDistance: ["0%", "100%"], opacity: [0, 0.6, 0.6, 0] }}
        transition={{
          duration: 4,
          delay: 3.3,
          repeat: Infinity,
          repeatDelay: 1,
          ease: "easeInOut",
          opacity: { times: [0, 0.05, 0.9, 1] },
        }}
        style={{ offsetPath: `path('${pathD}')` }}
      />

      {/* Step nodes */}
      {steps.map((step, i) => (
        <motion.g
          key={step.label}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 + i * 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: `${step.x}px ${step.y}px` }}
        >
          {/* Outer ring glow */}
          <motion.circle
            cx={step.x} cy={step.y} r="24"
            fill="none" stroke={step.color} strokeWidth="0.8" strokeOpacity="0.2"
            animate={{ r: [24, 28, 24], strokeOpacity: [0.15, 0.35, 0.15] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Inner filled circle */}
          <circle
            cx={step.x} cy={step.y} r="18"
            fill={step.color} fillOpacity="0.08"
            stroke={step.color} strokeWidth="1.2" strokeOpacity="0.4"
          />

          {/* Center dot */}
          <motion.circle
            cx={step.x} cy={step.y} r="3"
            fill={step.color}
            animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.3, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
          />

          {/* Label */}
          <text
            x={step.x} y={step.y + 1}
            textAnchor="middle" dominantBaseline="middle"
            fill={step.color} fillOpacity="0.9"
            fontFamily="JetBrains Mono, monospace" fontSize="8" fontWeight="700"
          >
            {step.label}
          </text>

          {/* Connector label line + marker */}
          {i < steps.length - 1 && (
            <motion.circle
              cx={(step.x + steps[i + 1].x) / 2}
              cy={(step.y + steps[i + 1].y) / 2}
              r="1.5" fill={step.color} fillOpacity="0.3"
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
            />
          )}
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
