"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FuturisticBackground } from "../ui/FuturisticBackground";

// ---------------------------------------------------------------------------
// Typing Effect Hook
// ---------------------------------------------------------------------------
const roles = [
  "Full Stack Developer",
  "Design System Architect",
  "React & Next.js Specialist",
  "TypeScript Enthusiast",
];

function useTypingEffect(words: string[], typingSpeed = 80, deletingSpeed = 50, pauseTime = 2000) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setText(currentWord.slice(0, text.length + 1));
          if (text.length + 1 === currentWord.length) {
            setTimeout(() => setIsDeleting(true), pauseTime);
          }
        } else {
          setText(currentWord.slice(0, text.length - 1));
          if (text.length === 0) {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [text, wordIndex, isDeleting, words, typingSpeed, deletingSpeed, pauseTime]);

  return text;
}

// ---------------------------------------------------------------------------
// Count-up Hook
// ---------------------------------------------------------------------------
function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

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
// Metrics data
// ---------------------------------------------------------------------------
const metrics = [
  { value: 3, suffix: "", label: "SaaS Apps" },
  { value: 100, suffix: "+", label: "Componentes" },
  { value: 380, suffix: "+", label: "Testes" },
  { value: 56, suffix: "", label: "Paginas" },
];

// ---------------------------------------------------------------------------
// Main Hero Component
// ---------------------------------------------------------------------------
export function Hero() {
  const typedText = useTypingEffect(roles);

  // count-up for each metric
  const m0 = useCountUp(metrics[0].value, 1200);
  const m1 = useCountUp(metrics[1].value, 1800);
  const m2 = useCountUp(metrics[2].value, 2000);
  const m3 = useCountUp(metrics[3].value, 1600);
  const countRefs = [m0, m1, m2, m3];

  return (
    <section className="relative min-h-screen flex items-center justify-center gradient-bg overflow-visible">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <FuturisticBackground />
      </div>

      <div className="container-custom relative z-10 pt-24 pb-20">
        <div className="relative flex flex-col items-center text-center gap-6">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="hero-status-badge inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-medium">
              <span className="relative flex h-2.5 w-2.5">
                <span className="hero-status-ping absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping" />
                <span className="hero-status-dot relative inline-flex rounded-full h-2.5 w-2.5" />
              </span>
              Disponivel para oportunidades
            </span>
          </motion.div>

          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 200 }}
            className="relative"
          >
            {/* Outer glow ring */}
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-500 opacity-60 blur-md animate-pulse" />
            {/* Avatar container */}
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden ring-2 ring-indigo-400/80 ring-offset-4 hero-avatar-ring-offset">
              <Image
                src="/avatar.jpg"
                alt="Andri Amaro"
                width={160}
                height={160}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight hero-title">
              Andri{" "}
              <span className="gradient-text">Amaro</span>
            </h1>
          </motion.div>

          {/* Typing effect subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="h-9 flex items-center"
          >
            <span className="text-xl md:text-2xl lg:text-3xl font-bold hero-typed-text">
              {typedText}
            </span>
            <span className="hero-cursor w-[3px] h-7 md:h-8 ml-0.5 animate-blink" />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="max-w-xl text-base md:text-lg leading-relaxed hero-description"
          >
            Criei o <span className="font-semibold hero-highlight-text">Pulse Ecosystem</span> do zero ·
            um design system com 100+ componentes que alimenta 3 SaaS apps em producao,
            com 380+ testes e deploy automatizado.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 mt-2"
          >
            <Link href="#ecosystem" className="group">
              <button className="hero-btn-primary flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5">
                <Sparkles className="w-4 h-4" />
                Ver Ecosystem
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </Link>
            <Link href="#projects">
              <button className="hero-btn-secondary flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5">
                Ver Projetos
              </button>
            </Link>
          </motion.div>

        </div>
      </div>

      {/* Metrics bridge · floats between Hero and next section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="relative z-20 flex justify-center px-4"
      >
        <div className="hero-metrics-bridge grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 w-full max-w-2xl translate-y-1/2 rounded-2xl p-5 sm:p-6">
          {metrics.map((m, i) => (
            <div key={m.label} className="text-center py-2">
              <span
                ref={countRefs[i].ref}
                className="block text-2xl md:text-3xl font-bold gradient-text tabular-nums"
              >
                {countRefs[i].count}{m.suffix}
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-wider hero-metric-label">
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
