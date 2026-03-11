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
// Orbital System SVG — Tech solar system with rotating orbits
// ---------------------------------------------------------------------------
function OrbitalSVG() {
  const cx = 250;
  const cy = 190;

  const orbits = [
    {
      r: 55, speed: 20, items: [
        { label: "React", color: "#61dafb", angle: 0 },
        { label: "Next.js", color: "#818cf8", angle: Math.PI },
      ],
    },
    {
      r: 95, speed: 35, items: [
        { label: "Node", color: "#68a063", angle: 0.5 },
        { label: "Prisma", color: "#a78bfa", angle: 2.1 },
        { label: "TS", color: "#3178c6", angle: 3.8 },
      ],
    },
    {
      r: 140, speed: 50, items: [
        { label: "Docker", color: "#2496ed", angle: 0.3 },
        { label: "Redis", color: "#dc382d", angle: 1.8 },
        { label: "PG", color: "#336791", angle: 3.2 },
        { label: "Vercel", color: "#818cf8", angle: 4.8 },
      ],
    },
  ];

  return (
    <svg width="500" height="380" viewBox="0 0 500 380" fill="none" className="opacity-[0.18]">
      <defs>
        <filter id="orb-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Central nucleus */}
      <motion.g
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      >
        {/* Core glow */}
        <motion.circle
          cx={cx} cy={cy} r="22"
          fill="#6366f1" fillOpacity="0.15"
          stroke="#818cf8" strokeWidth="1.5" strokeOpacity="0.4"
          animate={{ strokeOpacity: [0.3, 0.6, 0.3], fillOpacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          cx={cx} cy={cy} r="35"
          fill="none" stroke="#6366f1" strokeWidth="0.5" strokeOpacity="0.15"
          animate={{ r: [35, 40, 35], strokeOpacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <text
          x={cx} y={cy + 1} textAnchor="middle" dominantBaseline="middle"
          fill="#a78bfa" fontFamily="JetBrains Mono, monospace" fontSize="9" fontWeight="700"
        >
          Pulse
        </text>
      </motion.g>

      {/* Orbit rings + rotating items */}
      {orbits.map((orbit, oi) => (
        <motion.g
          key={oi}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 + oi * 0.25 }}
        >
          {/* Orbit ring */}
          <motion.circle
            cx={cx} cy={cy} r={orbit.r}
            fill="none" stroke="#6366f1" strokeWidth="0.6"
            strokeDasharray="4 6" strokeOpacity="0.2"
            animate={{ strokeOpacity: [0.12, 0.25, 0.12] }}
            transition={{ duration: 4 + oi, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Orbiting tech items */}
          {orbit.items.map((item, ii) => (
            <motion.g
              key={item.label}
              animate={{ rotate: 360 }}
              transition={{ duration: orbit.speed, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: `${cx}px ${cy}px` }}
            >
              {/* Position at angle on orbit */}
              <g transform={`translate(${cx + orbit.r * Math.cos(item.angle)}, ${cy + orbit.r * Math.sin(item.angle)})`}>
                {/* Counter-rotate so text stays upright */}
                <motion.g
                  animate={{ rotate: -360 }}
                  transition={{ duration: orbit.speed, repeat: Infinity, ease: "linear" }}
                >
                  {/* Node dot */}
                  <motion.circle
                    cx="0" cy="0" r="12"
                    fill={item.color} fillOpacity="0.1"
                    stroke={item.color} strokeWidth="1" strokeOpacity="0.5"
                    animate={{ strokeOpacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: ii * 0.4, ease: "easeInOut" }}
                  />
                  <circle cx="0" cy="0" r="3" fill={item.color} fillOpacity="0.6" filter="url(#orb-glow)" />
                  <text
                    x="0" y="1" textAnchor="middle" dominantBaseline="middle"
                    fill={item.color} fontFamily="JetBrains Mono, monospace"
                    fontSize="6" fontWeight="600" fillOpacity="0.9"
                  >
                    {item.label}
                  </text>
                </motion.g>
              </g>
            </motion.g>
          ))}
        </motion.g>
      ))}

      {/* Ambient particles */}
      {[
        { x: 80, y: 100, d: 2.5 }, { x: 420, y: 80, d: 3 },
        { x: 60, y: 280, d: 2.8 }, { x: 440, y: 300, d: 3.2 },
        { x: 150, y: 50, d: 2.2 }, { x: 350, y: 340, d: 2.6 },
      ].map((p, i) => (
        <motion.circle
          key={`p-${i}`} cx={p.x} cy={p.y} r="1.5"
          fill="#818cf8" fillOpacity="0.3"
          animate={{ opacity: [0.15, 0.5, 0.15], scale: [1, 1.5, 1] }}
          transition={{ duration: p.d, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
        />
      ))}
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Circuit Board SVG — PCB traces with traveling light pulses
// ---------------------------------------------------------------------------
function CircuitBoardSVG() {
  const chips = [
    { label: "API", x: 130, y: 80, color: "#818cf8" },
    { label: "DB", x: 370, y: 80, color: "#34d399" },
    { label: "UI", x: 130, y: 200, color: "#a78bfa" },
    { label: "Auth", x: 370, y: 200, color: "#fbbf24" },
    { label: "Cache", x: 250, y: 300, color: "#f472b6" },
  ];

  // PCB traces connecting chips (right-angle paths)
  const traces = [
    { d: "M155 80 L250 80 L250 80 L345 80", color: "#818cf8", from: 0, to: 1 },
    { d: "M130 105 L130 175", color: "#a78bfa", from: 0, to: 2 },
    { d: "M370 105 L370 175", color: "#34d399", from: 1, to: 3 },
    { d: "M155 200 L250 200 L250 200 L345 200", color: "#fbbf24", from: 2, to: 3 },
    { d: "M130 225 L130 300 L225 300", color: "#a78bfa", from: 2, to: 4 },
    { d: "M370 225 L370 300 L275 300", color: "#fbbf24", from: 3, to: 4 },
    { d: "M250 105 L250 175", color: "#6366f1", from: 0, to: 2 },
    { d: "M250 225 L250 275", color: "#f472b6", from: 2, to: 4 },
  ];

  return (
    <svg width="500" height="380" viewBox="0 0 500 380" fill="none" className="opacity-[0.18]">
      <defs>
        <filter id="pcb-glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* PCB traces drawing in */}
      {traces.map((trace, i) => (
        <g key={`trace-${i}`}>
          {/* Base trace */}
          <motion.path
            d={trace.d}
            stroke={trace.color} strokeWidth="1.5" strokeOpacity="0.2"
            fill="none" strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Traveling light along trace */}
          <motion.circle
            r="2.5" fill={trace.color} filter="url(#pcb-glow)"
            initial={{ offsetDistance: "0%", opacity: 0 }}
            animate={{
              offsetDistance: ["0%", "100%"],
              opacity: [0, 0.9, 0.9, 0],
            }}
            transition={{
              duration: 1.5,
              delay: 2 + i * 0.8,
              repeat: Infinity,
              repeatDelay: traces.length * 0.8,
              ease: "easeInOut",
              opacity: { times: [0, 0.1, 0.85, 1] },
            }}
            style={{ offsetPath: `path('${trace.d}')` }}
          />
        </g>
      ))}

      {/* Via holes (junction dots along traces) */}
      {[
        { x: 250, y: 80 }, { x: 250, y: 200 },
        { x: 130, y: 140 }, { x: 370, y: 140 },
        { x: 250, y: 140 }, { x: 250, y: 250 },
      ].map((via, i) => (
        <motion.g key={`via-${i}`}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 1 + i * 0.1 }}
          style={{ transformOrigin: `${via.x}px ${via.y}px` }}
        >
          <circle cx={via.x} cy={via.y} r="4" fill="none" stroke="#6366f1" strokeWidth="0.8" strokeOpacity="0.3" />
          <motion.circle
            cx={via.x} cy={via.y} r="1.5" fill="#6366f1" fillOpacity="0.5"
            animate={{ fillOpacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.g>
      ))}

      {/* Chip modules */}
      {chips.map((chip, i) => (
        <motion.g
          key={chip.label}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 + i * 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: `${chip.x}px ${chip.y}px` }}
        >
          {/* Chip body */}
          <rect
            x={chip.x - 22} y={chip.y - 18} width="44" height="36" rx="4"
            fill={chip.color} fillOpacity="0.06"
            stroke={chip.color} strokeWidth="1.2" strokeOpacity="0.4"
          />

          {/* Pin lines (top) */}
          {[-12, -4, 4, 12].map((px, pi) => (
            <motion.line
              key={`pin-t-${pi}`}
              x1={chip.x + px} y1={chip.y - 18}
              x2={chip.x + px} y2={chip.y - 24}
              stroke={chip.color} strokeWidth="0.8" strokeOpacity="0.3"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.8 + i * 0.2 + pi * 0.05 }}
            />
          ))}

          {/* Pin lines (bottom) */}
          {[-12, -4, 4, 12].map((px, pi) => (
            <motion.line
              key={`pin-b-${pi}`}
              x1={chip.x + px} y1={chip.y + 18}
              x2={chip.x + px} y2={chip.y + 24}
              stroke={chip.color} strokeWidth="0.8" strokeOpacity="0.3"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.85 + i * 0.2 + pi * 0.05 }}
            />
          ))}

          {/* Chip glow pulse */}
          <motion.rect
            x={chip.x - 22} y={chip.y - 18} width="44" height="36" rx="4"
            fill="none" stroke={chip.color} strokeWidth="0.5"
            animate={{ strokeOpacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Inner dot */}
          <motion.circle
            cx={chip.x} cy={chip.y - 8} r="2"
            fill={chip.color} fillOpacity="0.5"
            animate={{ fillOpacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
          />

          {/* Label */}
          <text
            x={chip.x} y={chip.y + 5} textAnchor="middle"
            fill={chip.color} fontFamily="JetBrains Mono, monospace"
            fontSize="9" fontWeight="700" fillOpacity="0.85"
          >
            {chip.label}
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

      {/* Orbital System - top left */}
      <motion.div
        initial={{ opacity: 0, scale: 0.3, filter: "blur(20px)" }}
        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -top-4 -left-36 md:-left-28 lg:-left-16 z-10 pointer-events-none"
      >
        <motion.div
          animate={{
            y: [0, -15, 4, -22, 6, -10, -18, 0],
            x: [0, 5, -3, 7, -5, 3, -2, 0],
          }}
          transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
        >
          <OrbitalSVG />
        </motion.div>
      </motion.div>

      {/* Circuit Board - top right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.3, filter: "blur(20px)" }}
        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -top-4 -right-36 md:-right-28 lg:-right-16 z-10 pointer-events-none"
      >
        <motion.div
          animate={{
            y: [0, -18, 5, -28, 8, -12, -22, 0],
            x: [0, -4, 3, -6, 5, -3, 2, 0],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        >
          <CircuitBoardSVG />
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
