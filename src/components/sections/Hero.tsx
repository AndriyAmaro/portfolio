"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import { FuturisticBackground } from "../ui/FuturisticBackground";

// ---------------------------------------------------------------------------
// Typing Effect Hook
// ---------------------------------------------------------------------------
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

  useEffect(() => {
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
  }, [target, duration]);

  return count;
}

// ---------------------------------------------------------------------------
// Metrics data type
// ---------------------------------------------------------------------------
type Metric = { value: number; suffix: string; label: string };

// ---------------------------------------------------------------------------
// Metrics Carousel (2 at a time, auto-rotate)
// ---------------------------------------------------------------------------
function MetricsCarousel({ metrics: items, counts }: { metrics: Metric[]; counts: number[] }) {
  const [page, setPage] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pages = [items.slice(0, 2), items.slice(2, 4)];

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setPage((p) => (p + 1) % pages.length);
    }, 5000);
  }, [pages.length]);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

  return (
    <div className="w-full max-w-2xl">
      {/* Desktop: show all 4 */}
      <div className="hidden sm:grid grid-cols-4 gap-5">
        {items.map((m, i) => (
          <div key={m.label} className="hero-metric relative text-center py-4 px-3 rounded-2xl overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
            <span className="block text-2xl md:text-3xl font-bold gradient-text tabular-nums">
              {counts[i]}{m.suffix}
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-wider hero-metric-label mt-1 block">{m.label}</span>
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
                <div key={m.label} className="hero-metric relative text-center py-4 px-3 rounded-2xl overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
                  <span className="block text-2xl font-bold gradient-text tabular-nums">
                    {counts[idx]}{m.suffix}
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-wider hero-metric-label mt-1 block">{m.label}</span>
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
  const t = useTranslations("hero");

  const roles = t.raw("roles") as string[];
  const typedText = useTypingEffect(roles);

  const metrics: Metric[] = [
    { value: 107, suffix: "", label: t("metrics.models") },
    { value: 1036, suffix: "", label: t("metrics.endpoints") },
    { value: 12, suffix: "", label: t("metrics.agents") },
    { value: 4, suffix: "", label: t("metrics.apps") },
  ];

  // count-up for each metric · uniform 1800ms duration matches Skills stats animation
  const counts = [
    useCountUp(metrics[0].value, 1800),
    useCountUp(metrics[1].value, 1800),
    useCountUp(metrics[2].value, 1800),
    useCountUp(metrics[3].value, 1800),
  ];

  return (
    <section className="relative gradient-bg overflow-visible mb-[-60px]">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <FuturisticBackground />
      </div>

      <div className="container-custom relative z-10 pb-32 min-[414px]:pb-36 md:pb-40" style={{ paddingTop: 'clamp(80px, 10vh, 200px)' }}>
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
            className="h-9 flex items-center justify-center"
          >
            <span className="text-lg md:text-2xl lg:text-3xl font-bold hero-typed-text">
              {typedText}
            </span>
            <span className="hero-cursor w-[3px] h-7 md:h-8 ml-0.5 animate-blink flex-shrink-0" />
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
            {t.rich("description", {
              highlight: (chunks) => <span className="font-semibold hero-highlight-text">{chunks}</span>,
            })}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="flex flex-col sm:flex-row items-center gap-3 mt-2 w-full sm:w-auto"
          >
            <a href="#projects" className="group w-full sm:w-auto">
              <button className="hero-btn-primary w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5">
                <Sparkles className="w-4 h-4" />
                {t("ctaPrimary")}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </a>
            <a href="#contact" className="w-full sm:w-auto">
              <button className="hero-btn-secondary w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5">
                {t("ctaSecondary")}
              </button>
            </a>
          </motion.div>

          {/* Metrics · bridge between Hero and About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="relative z-20 mt-4 w-full flex justify-center"
          >
            <MetricsCarousel metrics={metrics} counts={counts} />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
