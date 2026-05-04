"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { Cpu, ShieldCheck, BadgeCheck, Network, Terminal } from "lucide-react";
import { useEffect, useState, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import { AbstractBackground, AbstractBackgroundLight } from "../ui/AbstractBackground";
import Image from "next/image";

const highlights = [
  { icon: Cpu, key: "ai" },
  { icon: ShieldCheck, key: "production" },
  { icon: BadgeCheck, key: "quality" },
  { icon: Network, key: "modular" },
] as const;

// ─── Stats data ──────────────────────────────────────────
type StatItem = { value: number; suffix: string; labelKey: string };

const aboutStats: StatItem[] = [
  { value: 32, suffix: "", labelKey: "modules" },
  { value: 9, suffix: "", labelKey: "worlds" },
  { value: 4, suffix: "", labelKey: "llmProviders" },
  { value: 330, suffix: "k", labelKey: "loc" },
  { value: 740, suffix: "+", labelKey: "commits" },
  { value: 100, suffix: "%", labelKey: "strictMode" },
];

// ─── Count-up hook ───────────────────────────────────────
function useCountUp(target: number, inView: boolean, duration = 1800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, inView, duration]);
  return count;
}

function StatTile({ stat, t, inView, delay }: { stat: StatItem; t: ReturnType<typeof useTranslations<"about">>; inView: boolean; delay: number }) {
  const count = useCountUp(stat.value, inView);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="stat-card group relative p-4 md:p-5 rounded-2xl text-center overflow-hidden"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10">
        <div className="text-2xl md:text-3xl font-extrabold gradient-text mb-0.5 tabular-nums tracking-tight">
          {count}{stat.suffix}
        </div>
        <div className="stat-label text-[11px] md:text-xs font-medium leading-tight">
          {t(`metrics.${stat.labelKey}`)}
        </div>
      </div>
    </motion.div>
  );
}

function AboutStatsRow({ t }: { t: ReturnType<typeof useTranslations<"about">> }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <div ref={ref} className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4 mb-12 md:mb-16">
      {aboutStats.map((stat, i) => (
        <StatTile key={stat.labelKey} stat={stat} t={t} inView={inView} delay={i * 0.08} />
      ))}
    </div>
  );
}

// ─── Code snippet card · real production code ────────────
function CodeSnippetCard({ t }: { t: ReturnType<typeof useTranslations<"about">> }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="mt-16 md:mt-20"
    >
      <div className="about-code-card relative rounded-2xl overflow-hidden">
        {/* Header bar */}
        <div className="flex items-center gap-2.5 px-5 py-3 about-code-header border-b border-white/[0.06]">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          </div>
          <Terminal className="w-3.5 h-3.5 text-indigo-400 ml-2" />
          <span className="text-xs font-mono text-white/60">
            apps/api/src/modules/ai-gateway/gateway.service.ts
          </span>
        </div>

        {/* Code body */}
        <pre className="about-code-body p-5 md:p-6 text-xs md:text-sm font-mono leading-relaxed overflow-x-auto">
{`// AI Gateway · single entry point for ALL LLM calls
async gatewayCall(req: GatewayCallRequest, ctx: TenantContext) {
  await `}<span className="text-indigo-400">{`validateSchema`}</span>{`(req);                      `}<span className="text-white/40">{`// Zod runtime validation`}</span>{`
  const model = `}<span className="text-indigo-400">{`routeModel`}</span>{`(req, ctx.plan);        `}<span className="text-white/40">{`// complexity + plan routing`}</span>{`
  await `}<span className="text-indigo-400">{`creditEnforcer.check`}</span>{`(ctx.tenantId, model); `}<span className="text-white/40">{`// 3-tier budget`}</span>{`
  const res = await `}<span className="text-indigo-400">{`callWithFallback`}</span>{`(model, req); `}<span className="text-white/40">{`// circuit breaker`}</span>{`
  await `}<span className="text-indigo-400">{`logUsage`}</span>{`(ctx, model, res);                `}<span className="text-white/40">{`// AiUsageLog persisted`}</span>{`
  return res;
}`}
        </pre>

        {/* Caption */}
        <div className="px-5 md:px-6 py-3 about-code-caption border-t border-white/[0.06]">
          <p className="text-xs md:text-sm text-white/60 leading-relaxed">
            {t("codeSnippet.caption")}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

const techStack = [
  "Next.js",
  "TypeScript",
  "JavaScript",
  "React",
  "Node.js",
  "Express.js",
  "PostgreSQL",
  "pgvector",
  "Prisma",
  "Tailwind CSS",
  "Socket.io",
  "WebSocket",
  "Event-Driven Architecture",
  "Agentes de IA",
  "Redis",
  "Docker",
  "CI/CD",
  "GitHub Actions",
  "Vercel",
  "Railway",
  "Framer Motion",
  "Vitest",
  "Zod",
  "JWT",
  "REST API",
  "Clean Architecture",
];

/* ── Mobile · 2 stacked cards, rotating 1 at a time ── */
function MobileCarousel({ t }: { t: ReturnType<typeof useTranslations<"about">> }) {
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchX = useRef(0);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((p) => (p + 1) % highlights.length);
    }, 4000);
  }, []);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

  const goTo = (i: number) => { setActive(i); startTimer(); };

  // Show current and next card
  const secondIdx = (active + 1) % highlights.length;

  const renderCard = (idx: number) => {
    const item = highlights[idx];
    const Icon = item.icon;
    return (
      <div className="about-glow-wrap">
        <div className="about-highlight-card relative p-5 rounded-2xl overflow-hidden z-[1]">
          <div className="flex items-start gap-4">
            <div className="about-icon-container w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
              <Icon className="w-6 h-6 text-indigo-400" />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-base font-semibold text-white/95 about-card-title mb-2">
                {t(`highlights.${item.key}.title`)}
              </h4>
              <p className="text-sm text-white/60 leading-relaxed about-card-description">
                {t(`highlights.${item.key}.description`)}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="relative overflow-hidden"
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        const d = touchX.current - e.changedTouches[0].clientX;
        if (Math.abs(d) > 40) {
          goTo(d > 0
            ? (active + 1) % highlights.length
            : (active - 1 + highlights.length) % highlights.length
          );
        }
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="flex flex-col gap-4"
        >
          {renderCard(active)}
          {renderCard(secondIdx)}
        </motion.div>
      </AnimatePresence>

      {/* Counter + dots */}
      <div className="flex items-center justify-center gap-3 mt-4">
        <span className="text-xs font-mono about-carousel-counter">
          {String(active + 1).padStart(2, "0")}/{String(highlights.length).padStart(2, "0")}
        </span>
        <div className="flex gap-1.5">
          {highlights.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-1 rounded-full transition-all duration-500 ${
                active === i
                  ? "w-5 bg-indigo-500"
                  : "w-1.5 about-carousel-dot"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}


export function About() {
  const t = useTranslations("about");
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

      {/* Stack illustration - desktop only */}
      <motion.div
        initial={{ opacity: 0, scale: 0.4, filter: "blur(24px)" }}
        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="hidden md:block absolute -top-4 -left-36 lg:-left-24 z-10 pointer-events-none"
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
              width={720}
              height={440}
              className="w-[720px] h-[440px] opacity-[0.12] dark:opacity-[0.22] select-none hue-rotate-[40deg] saturate-[1.8] brightness-[0.9]"
              draggable={false}
              priority={false}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Tools illustration - desktop only */}
      <motion.div
        initial={{ opacity: 0, scale: 0.4, filter: "blur(24px)" }}
        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="hidden md:block absolute top-4 -right-32 lg:-right-20 z-10 pointer-events-none"
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
              width={640}
              height={420}
              className="w-[640px] h-[420px] opacity-[0.12] dark:opacity-[0.22] select-none hue-rotate-[40deg] saturate-[1.8] brightness-[0.9]"
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
            {t("title")} <span className="gradient-text">{t("titleHighlight")}</span>
          </h2>
          <p className="about-subtitle max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Stats row · 6 senior depth metrics with count-up */}
        <AboutStatsRow t={t} />

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-semibold">
              {t("heading")}{" "}
              <span className="gradient-text">{t("headingHighlight")}</span>
            </h3>

            <div className="space-y-4 about-description-text">
              <p>
                {t("paragraph1")}
              </p>

              <p>
                {t("paragraph2prefix")} <span className="font-semibold text-indigo-400">{t("paragraph2highlight")}</span> {t("paragraph2suffix")}
              </p>

              <p>
                {t("paragraph3prefix")} <span className="font-semibold text-indigo-400">{t("paragraph3highlight")}</span> {t("paragraph3suffix")}
              </p>
            </div>
          </motion.div>

          {/* Highlights - Desktop grid / Mobile carousel */}
          <div className="hidden md:grid sm:grid-cols-2 gap-5">
            {highlights.map((item, index) => (
              <motion.div
                key={item.key}
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
                    {t(`highlights.${item.key}.title`)}
                  </h4>
                  <p className="text-sm text-white/70 leading-relaxed about-card-description">
                    {t(`highlights.${item.key}.description`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile carousel */}
          <div className="md:hidden">
            <MobileCarousel t={t} />
          </div>
        </div>

        {/* Code snippet card · real production code from Sellorex */}
        <CodeSnippetCard t={t} />

        {/* Tech stack marquee - full width on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-24 md:mt-32"
        >
          <div className="about-marquee-container relative overflow-hidden rounded-none py-4 w-[100vw] left-1/2 -translate-x-1/2">
            {/* Gradient accent top border */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
            {/* Gradient accent bottom border */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
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
