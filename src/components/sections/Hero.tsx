"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
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
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseTime);
      return () => clearTimeout(pauseTimer);
    }

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          const next = currentWord.slice(0, text.length + 1);
          setText(next);
          if (next.length === currentWord.length) {
            setIsPaused(true);
          }
        } else {
          const next = currentWord.slice(0, text.length - 1);
          setText(next);
          if (next.length === 0) {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [text, wordIndex, isDeleting, isPaused, words, typingSpeed, deletingSpeed, pauseTime]);

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
  { value: 3, suffix: "+", label: "SaaS Apps" },
  { value: 100, suffix: "+", label: "Componentes" },
  { value: 380, suffix: "+", label: "Testes" },
  { value: 56, suffix: "+", label: "Páginas" },
];

// ---------------------------------------------------------------------------
// Metrics Carousel (2 at a time, auto-rotate)
// ---------------------------------------------------------------------------
function MetricsCarousel({ metrics: items, countRefs }: { metrics: typeof metrics; countRefs: { count: number; ref: React.RefObject<HTMLSpanElement | null> }[] }) {
  const [page, setPage] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pages = [items.slice(0, 2), items.slice(2, 4)];

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setPage((p) => (p + 1) % pages.length);
    }, 3000);
  }, [pages.length]);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

  return (
    <div className="w-full max-w-2xl">
      {/* Desktop: show all 4 */}
      <div className="hidden sm:grid grid-cols-4 gap-6">
        {items.map((m, i) => (
          <div key={m.label} className="hero-metric text-center py-3 px-2 rounded-xl">
            <span ref={countRefs[i].ref} className="block text-2xl md:text-3xl font-bold gradient-text tabular-nums">
              {countRefs[i].count}{m.suffix}
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-wider hero-metric-label">{m.label}</span>
          </div>
        ))}
      </div>

      {/* Mobile: carousel 2 at a time */}
      <div className="sm:hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="grid grid-cols-2 gap-4"
          >
            {pages[page].map((m, i) => {
              const idx = page * 2 + i;
              return (
                <div key={m.label} className="hero-metric text-center py-3 px-2 rounded-xl">
                  <span ref={countRefs[idx].ref} className="block text-2xl font-bold gradient-text tabular-nums">
                    {countRefs[idx].count}{m.suffix}
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-wider hero-metric-label">{m.label}</span>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="flex items-center justify-center gap-1.5 mt-3">
          {pages.map((_, i) => (
            <button
              key={i}
              onClick={() => { setPage(i); startTimer(); }}
              className={`h-1 rounded-full transition-all duration-500 ${
                page === i ? "w-5 bg-indigo-500" : "w-1.5 bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

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
    <section className="relative gradient-bg overflow-visible mb-[-90px]">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <FuturisticBackground />
      </div>

      <div className="container-custom relative z-10 pb-10 min-[414px]:pb-8 md:pb-24" style={{ paddingTop: 'clamp(80px, 10vh, 200px)' }}>
        <div className="relative flex flex-col items-center text-center gap-4 md:gap-6">
          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h1 className="text-[2.5rem] min-[414px]:text-[2.75rem] md:text-5xl lg:text-7xl font-black tracking-tight hero-title">
              Andri{" "}
              <span className="gradient-text">Amaro</span>
            </h1>
          </motion.div>

          {/* Typing effect subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-9 flex items-center justify-center w-full"
          >
            <span className="text-lg md:text-2xl lg:text-3xl font-bold hero-typed-text">
              {typedText}
            </span>
            <span className="hero-cursor w-[3px] h-7 md:h-8 ml-0.5 animate-blink" />
          </motion.div>

          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 200 }}
            className="relative"
          >
            {/* Outer glow ring */}
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-500 opacity-60 blur-md animate-pulse" />
            {/* Avatar container */}
            <div className="relative w-36 h-36 md:w-40 md:h-40 rounded-full overflow-hidden ring-2 ring-indigo-400/80 ring-offset-4 hero-avatar-ring-offset">
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

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="max-w-xl text-base md:text-lg leading-relaxed hero-description"
          >
            Criei o <span className="font-semibold hero-highlight-text">Pulse Ecosystem</span> do zero ·
            um design system com 100+ componentes que alimenta múltiplos SaaS apps em produção,
            com testes automatizados e deploy contínuo.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
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

          {/* Metrics · bridge between Hero and About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="relative z-20 mt-4 w-full flex justify-center"
          >
            <MetricsCarousel metrics={metrics} countRefs={countRefs} />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
