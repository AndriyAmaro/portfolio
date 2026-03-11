"use client";

import { motion, useInView } from "framer-motion";
import { Layers, TestTubes, GitBranch, Rocket } from "lucide-react";
import { useEffect, useState, useRef, useCallback } from "react";
import { AbstractBackground, AbstractBackgroundLight } from "../ui/AbstractBackground";
import Image from "next/image";

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

/* ── Mobile carousel with 2-column auto-scroll ── */
function MobileCarousel() {
  const col1 = [highlights[0], highlights[1]];
  const col2 = [highlights[2], highlights[3]];
  const [activeCol, setActiveCol] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-50px" });

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveCol((prev) => (prev === 0 ? 1 : 0));
    }, 4000);
  }, []);

  useEffect(() => {
    if (inView) startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [inView, startTimer]);

  const columns = [col1, col2];

  return (
    <div ref={ref} className="relative overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
        style={{ transform: `translateX(-${activeCol * 100}%)` }}
      >
        {columns.map((col, colIdx) => (
          <div key={colIdx} className="min-w-full grid grid-cols-2 gap-3 px-1">
            {col.map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group h-full about-glow-wrap"
              >
                <div className="about-highlight-card relative p-4 rounded-2xl overflow-hidden h-full z-[1]">
                  <div className="relative mb-3">
                    <div className="about-icon-container w-10 h-10 rounded-xl flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-indigo-400" />
                    </div>
                  </div>
                  <h4 className="text-sm font-semibold mb-1.5 text-white/95 about-card-title">
                    {item.title}
                  </h4>
                  <p className="text-xs text-white/70 leading-relaxed about-card-description">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        ))}
      </div>

      {/* Indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {columns.map((_, i) => (
          <button
            key={i}
            onClick={() => { setActiveCol(i); startTimer(); }}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              activeCol === i
                ? "w-6 bg-indigo-500"
                : "w-1.5 bg-white/20"
            }`}
          />
        ))}
      </div>
    </div>
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

      {/* Stack illustration - top left (desktop) / hero area (mobile) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.4, filter: "blur(24px)" }}
        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -top-8 -left-32 md:-left-20 lg:-left-8 z-10 pointer-events-none"
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
              src="/about-stack.png"
              alt=""
              width={420}
              height={420}
              className="w-[240px] h-[240px] md:w-[420px] md:h-[420px] opacity-[0.10] dark:opacity-[0.11] select-none"
              draggable={false}
              priority={false}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Tools illustration - top right (desktop) / bottom (mobile) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.4, filter: "blur(24px)" }}
        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -top-20 -right-32 md:-right-20 lg:-right-8 md:top-auto bottom-12 md:bottom-auto z-10 pointer-events-none max-md:right-[-60px] max-md:top-auto"
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
              src="/about-tools.png"
              alt=""
              width={420}
              height={420}
              className="w-[240px] h-[240px] md:w-[420px] md:h-[420px] opacity-[0.10] dark:opacity-[0.11] select-none"
              draggable={false}
              priority={false}
            />
          </div>
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

          {/* Highlights - Desktop grid / Mobile carousel */}
          <div className="hidden md:grid sm:grid-cols-2 gap-5">
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
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative mb-4">
                    <div className="about-icon-container w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300">
                      <item.icon className="w-6 h-6 text-indigo-400" />
                    </div>
                  </div>
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

          {/* Mobile carousel */}
          <div className="md:hidden">
            <MobileCarousel />
          </div>
        </div>

        {/* Tech stack marquee - full width on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 max-md:-mx-[calc((100vw-100%)/2)]"
        >
          <div className="about-marquee-container relative overflow-hidden max-md:rounded-none rounded-2xl py-4">
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
