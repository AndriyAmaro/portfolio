"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { Cpu, ShieldCheck, BadgeCheck, Network, Terminal, Compass, Layers3, Rocket, RefreshCw, ChevronLeft, ChevronRight, Pause, Play, Lock, Gauge, Eye, Megaphone, Boxes, ScrollText, Sparkles, Layers, Trophy, Activity, Workflow, Database } from "lucide-react";
import { useEffect, useState, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import { AbstractBackground, AbstractBackgroundLight } from "../ui/AbstractBackground";

const highlights = [
  { icon: Lock, key: "multitenant", caption: "Architecture" },
  { icon: Cpu, key: "aiGateway", caption: "AI Layer" },
  { icon: Eye, key: "sentinel", caption: "Operations" },
  { icon: Megaphone, key: "sellMode", caption: "Growth" },
  { icon: Network, key: "modular", caption: "Architecture" },
  { icon: BadgeCheck, key: "quality", caption: "Engineering" },
] as const;

// Devin-inspired hexagonal bullet icon (6-sided polygon)
function HexIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="currentColor" aria-hidden="true">
      <path d="M7.007,0.63c0.614-0.355,1.371-0.355,1.986,0l4.893,2.825c0.614,0.355,0.993,1.01,0.993,1.72v5.65 c0,0.709-0.378,1.365-0.993,1.72L8.993,15.37c-0.614,0.355-1.371,0.355-1.986,0l-4.893-2.825c-0.614-0.355-0.993-1.01-0.993-1.72 v-5.65c0-0.709,0.378-1.365,0.993-1.72L7.007,0.63z"/>
    </svg>
  );
}

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
/* ── Code Snippets · 5 production proofs in carousel ── */
type CodeSnippet = {
  id: string;
  file: string;
  captionKey: string;
  render: () => React.ReactNode;
};

const CODE_SNIPPETS: CodeSnippet[] = [
  {
    id: "gateway",
    file: "modules/ai-gateway/gateway.service.ts",
    captionKey: "snippets.gateway",
    render: () => (
      <>
<span className="text-white/40">{`// Single entry point · todo LLM call passa por aqui`}</span>{`
`}<span className="text-indigo-400">export async function</span>{` `}<span className="text-cyan-400">gatewayCall</span>{`(req: GatewayCallRequest, ctx: TenantContext) {
  `}<span className="text-indigo-400">await</span>{` validateSchema(req);                                   `}<span className="text-white/40">{`// Zod runtime`}</span>{`

  `}<span className="text-white/40">{`// Routing inteligente · complexity + tenant plan · não é fallback dumb`}</span>{`
  `}<span className="text-indigo-400">const</span>{` { model, routingReason, complexityScore } = resolveModel(req, ctx);
  `}<span className="text-indigo-400">await</span>{` creditEnforcer.check(ctx.tenantId, model);              `}<span className="text-white/40">{`// 3-tier budget`}</span>{`

  `}<span className="text-white/40">{`// Claude com circuit breaker · uptime mesmo se Anthropic falhar`}</span>{`
  `}<span className="text-indigo-400">const</span>{` res = `}<span className="text-indigo-400">await</span>{` gracefulDegradation.execute(`}<span className="text-fuchsia-400">{`'CLAUDE'`}</span>{`, () =&gt;
    callClaude(model, req)                                   `}<span className="text-white/40">{`// streaming + tool use`}</span>{`
  );

  `}<span className="text-white/40">{`// Feedback loop · router se auto-melhora com sinais reais de prod`}</span>{`
  `}<span className="text-indigo-400">await</span>{` prisma.aiUsageLog.create({ data: {
    tenantId: ctx.tenantId, model, routingReason, complexityScore,
    inputTokens: res.usage.inputTokens, outputTokens: res.usage.outputTokens,
    cost: calculateCost(model, res.usage.inputTokens, res.usage.outputTokens),
    latencyMs: res.latency, confidenceScore: scoreResponseConfidence(res),
  }});
  `}<span className="text-indigo-400">return</span>{` res;
}

`}<span className="text-white/40">{`// 10M calls × $0.0000005 = $5 perdido se truncar · ceil em micro-USD`}</span>{`
`}<span className="text-indigo-400">function</span>{` `}<span className="text-cyan-400">calculateCost</span>{`(model: `}<span className="text-emerald-400">string</span>{`, ti: `}<span className="text-emerald-400">number</span>{`, to: `}<span className="text-emerald-400">number</span>{`) {
  `}<span className="text-indigo-400">const</span>{` c = MODEL_COSTS[model] ?? MODEL_COSTS.SONNET;
  `}<span className="text-indigo-400">const</span>{` total = (ti / `}<span className="text-yellow-300">1e6</span>{`) * c.inputPer1M + (to / `}<span className="text-yellow-300">1e6</span>{`) * c.outputPer1M;
  `}<span className="text-indigo-400">return</span>{` Math.ceil(total * `}<span className="text-yellow-300">1e6</span>{`) / `}<span className="text-yellow-300">1e6</span>{`;
}`}
      </>
    ),
  },
  {
    id: "tenant",
    file: "shared/tenant-context.ts + prisma.service.ts",
    captionKey: "snippets.tenant",
    render: () => (
      <>
<span className="text-white/40">{`// AsyncLocalStorage · context propagation cross-async · zero prop drilling`}</span>{`
`}<span className="text-indigo-400">import</span>{` { AsyncLocalStorage } `}<span className="text-indigo-400">from</span>{` `}<span className="text-fuchsia-400">{`'async_hooks'`}</span>{`;
`}<span className="text-indigo-400">export const</span>{` tenantContext = `}<span className="text-indigo-400">new</span>{` `}<span className="text-cyan-400">AsyncLocalStorage</span>{`<{ tenantId: `}<span className="text-emerald-400">string</span>{` }>();

`}<span className="text-white/40">{`// Prisma extension · auto-injeta tenantId em TODA query · 1 ponto · 0 boilerplate`}</span>{`
`}<span className="text-indigo-400">export const</span>{` prisma = `}<span className="text-indigo-400">new</span>{` `}<span className="text-cyan-400">PrismaClient</span>{`().$extends({
  query: {
    $allModels: {
      `}<span className="text-indigo-400">async</span>{` `}<span className="text-cyan-400">$allOperations</span>{`({ args, query }) {
        `}<span className="text-indigo-400">const</span>{` ctx = tenantContext.`}<span className="text-cyan-400">getStore</span>{`();
        `}<span className="text-indigo-400">if</span>{` (!ctx?.tenantId) `}<span className="text-indigo-400">throw new</span>{` `}<span className="text-cyan-400">Error</span>{`(`}<span className="text-fuchsia-400">{`'Missing tenant context'`}</span>{`);
        args.where = { ...args.where, tenantId: ctx.tenantId };
        `}<span className="text-indigo-400">return</span>{` query(args);
      },
    },
  },
});

`}<span className="text-white/40">{`// Middleware seta context por request · prisma propaga sozinho`}</span>{`
app.`}<span className="text-cyan-400">use</span>{`((req, _res, next) =&gt; {
  tenantContext.`}<span className="text-cyan-400">run</span>{`({ tenantId: req.user.tenantId }, next);
});`}
      </>
    ),
  },
  {
    id: "antiHallucination",
    file: "modules/agents/prompt-builder.ts",
    captionKey: "snippets.antiHallucination",
    render: () => (
      <>
<span className="text-white/40">{`// Inviolable rules · system prompt level · NOT post-validation`}</span>{`
`}<span className="text-indigo-400">export const</span>{` `}<span className="text-cyan-400">ANTI_HALLUCINATION_RULES</span>{` = `}<span className="text-fuchsia-400">{`\``}</span>{`
`}<span className="text-fuchsia-400">{`RULES (inviolable):`}</span>{`

`}<span className="text-fuchsia-400">{`1. NEVER invent data · if no data, say "Não tenho dados sobre X"`}</span>{`
`}<span className="text-fuchsia-400">{`2. CITE THE SOURCE for every number, name, fact`}</span>{`
`}<span className="text-fuchsia-400">{`3. DIFFERENTIATE fact (from source) · trend (pattern) · suggestion (opinion)`}</span>{`
`}<span className="text-fuchsia-400">{`4. EMPTY RESULTS are information · don't invent alternatives`}</span>{`
`}<span className="text-fuchsia-400">{`5. NAMES & IDs are sacred · never create fictional leads/deals/companies`}</span>{`
`}<span className="text-fuchsia-400">{`\`;`}</span>{`

`}<span className="text-white/40">{`// modules/agents/response-quality.engine.ts · safety net automático`}</span>{`
`}<span className="text-indigo-400">export async function</span>{` `}<span className="text-cyan-400">scoreAndGate</span>{`(response: string) {
  `}<span className="text-indigo-400">const</span>{` score = `}<span className="text-indigo-400">await</span>{` scoreQuality(response); `}<span className="text-white/40">{`// 0-100`}</span>{`
  `}<span className="text-indigo-400">if</span>{` (score < `}<span className="text-yellow-300">70</span>{`) `}<span className="text-indigo-400">return</span>{` regenerate(); `}<span className="text-white/40">{`// regenera se baixo`}</span>{`
  `}<span className="text-indigo-400">return</span>{` response;
}`}
      </>
    ),
  },
  {
    id: "fallback",
    file: "apps/api/src/modules/ai-gateway/call-with-fallback.ts",
    captionKey: "snippets.fallback",
    render: () => (
      <>
{`// Fallback chain · 4 providers, circuit breaker, exp backoff
const CHAIN = [`}<span className="text-indigo-400">'claude'</span>{`, `}<span className="text-indigo-400">'openai'</span>{`, `}<span className="text-indigo-400">'qwen'</span>{`, `}<span className="text-indigo-400">'deepseek'</span>{`];

export async function callWithFallback(model: Model, req: Req) {
  for (const provider of CHAIN) {
    if (`}<span className="text-fuchsia-400">circuit.isOpen</span>{`(provider)) continue;
    try {
      return await `}<span className="text-indigo-400">providers[provider].call</span>{`(model, req);
    } catch (err) {
      `}<span className="text-fuchsia-400">circuit.recordFailure</span>{`(provider, err);
      `}<span className="text-fuchsia-400">await sleep</span>{`(`}<span className="text-indigo-400">backoff</span>{`(attempt++));      `}<span className="text-white/40">{`// 1s, 2s, 4s, 8s`}</span>{`
    }
  }
  throw new `}<span className="text-fuchsia-400">AllProvidersDownError</span>{`();
}`}
      </>
    ),
  },
  {
    id: "eventBus",
    file: "modules/crm/crm.service.ts",
    captionKey: "snippets.eventBus",
    render: () => (
      <>
{`import { eventBus } from `}<span className="text-fuchsia-400">{`'@/shared/business-event-bus'`}</span>{`;
import { CrmRepository } from `}<span className="text-fuchsia-400">{`'./crm.repository'`}</span>{`;

`}<span className="text-indigo-400">export class</span>{` CrmService {
  constructor(`}<span className="text-indigo-400">private</span>{` repo: CrmRepository) {}

  `}<span className="text-indigo-400">async</span>{` `}<span className="text-cyan-400">createLead</span>{`(data: CreateLeadDto) {
    `}<span className="text-white/40">{`// 1️⃣ Repository · tenantId auto-injected via Prisma extension`}</span>{`
    `}<span className="text-indigo-400">const</span>{` lead = `}<span className="text-indigo-400">await</span>{` `}<span className="text-indigo-400">this</span>{`.repo.create(data);

    `}<span className="text-white/40">{`// 2️⃣ Event Bus · listeners independentes em outros módulos`}</span>{`
    `}<span className="text-indigo-400">await</span>{` eventBus.`}<span className="text-cyan-400">emit</span>{`(`}<span className="text-fuchsia-400">'lead.created'</span>{`, {
      tenantId: lead.tenantId,
      leadId: lead.id,
      source: data.source,
    });

    `}<span className="text-indigo-400">return</span>{` lead;
  }
}

`}<span className="text-white/40">{`// 3️⃣ Listeners em outros módulos · adicionar capacidade = só assinar evento`}</span>{`
`}<span className="text-white/40">{`//    brain/listeners      → indexa lead pra busca semântica`}</span>{`
`}<span className="text-white/40">{`//    automation/listeners → dispara workflow`}</span>{`
`}<span className="text-white/40">{`//    audit/listeners      → loga ação no audit trail`}</span>
      </>
    ),
  },
  {
    id: "ensureSchemaSync",
    file: "apps/api/src/app.ts",
    captionKey: "snippets.ensureSchemaSync",
    render: () => (
      <>
{`// Boot-time idempotent migrations · Nixpacks doesn't run them
async function `}<span className="text-indigo-400">ensureSchemaSync</span>{`() {
  `}<span className="text-white/40">{`// Each SQL · individual call · IF NOT EXISTS · .catch noop`}</span>{`
  await prisma.`}<span className="text-fuchsia-400">$executeRawUnsafe</span>{`(`}<span className="text-fuchsia-400">{`\`ALTER TABLE "ContentAsset" ADD COLUMN IF NOT EXISTS "blocks" JSONB\``}</span>{`).`}<span className="text-indigo-400">catch</span>{`(() =&gt; {});
  await prisma.`}<span className="text-fuchsia-400">$executeRawUnsafe</span>{`(`}<span className="text-fuchsia-400">{`\`ALTER TYPE "AdminTaskStatus" ADD VALUE IF NOT EXISTS 'APPROVED'\``}</span>{`).`}<span className="text-indigo-400">catch</span>{`(() =&gt; {});
  `}<span className="text-white/40">{`// ... 30+ ALTERs idempotentes`}</span>{`
}
`}<span className="text-indigo-400">ensureSchemaSync</span>{`();

`}<span className="text-white/40">{`// Postgres erro 42601 (multi-statements) é o motivo de cada SQL separado.`}</span>
      </>
    ),
  },
  {
    id: "idempotency",
    file: "apps/api/src/modules/billing/stripe-webhook.ts",
    captionKey: "snippets.idempotency",
    render: () => (
      <>
{`// Idempotency · Stripe webhook can fire same event twice
const idempotencyKey = req.headers[`}<span className="text-fuchsia-400">'stripe-idempotency-key'</span>{`];
const seen = await prisma.processedWebhook.`}<span className="text-indigo-400">findUnique</span>{`({
  where: { idempotencyKey }
});
if (seen) return `}<span className="text-indigo-400">sendSuccess</span>{`(res, { duplicate: `}<span className="text-fuchsia-400">true</span>{` });

await prisma.`}<span className="text-fuchsia-400">$transaction</span>{`(async (tx) =&gt; {
  await tx.processedWebhook.`}<span className="text-indigo-400">create</span>{`({ data: { idempotencyKey } });
  `}<span className="text-white/40">{`// ... handler real do evento dentro da transaction`}</span>{`
});`}
      </>
    ),
  },
];

export function CodeSnippetsCarousel({ t }: { t: ReturnType<typeof useTranslations<"about">> }) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const total = CODE_SNIPPETS.length;
  const current = CODE_SNIPPETS[active];

  // Auto-advance · 7s · pause on hover/focus or manual paused
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setDirection(1);
      setActive((p) => (p + 1) % total);
    }, 7000);
    return () => clearInterval(id);
  }, [paused, total]);

  const goTo = useCallback((idx: number) => {
    setDirection(idx > active ? 1 : -1);
    setActive(idx);
  }, [active]);
  const next = useCallback(() => goTo((active + 1) % total), [active, total, goTo]);
  const prev = useCallback(() => goTo((active - 1 + total) % total), [active, total, goTo]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); next(); }
    if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="mt-16 md:mt-20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="about-code-card relative rounded-2xl overflow-hidden" onKeyDown={onKeyDown}>
        {/* Top progress bar · indigo→fuchsia · animates per slide */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/[0.04] z-10">
          <motion.div
            key={`bar-${active}-${paused ? "p" : "r"}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: paused ? 0 : 1 }}
            transition={{ duration: paused ? 0 : 7, ease: "linear" }}
            className="h-full origin-left bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500"
            style={{ transformOrigin: "left center" }}
          />
        </div>

        {/* Header · macOS dots + filepath + counter */}
        <div className="flex items-center gap-2.5 px-5 py-3 about-code-header border-b border-white/[0.06]">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          </div>
          <Terminal className="w-3.5 h-3.5 text-indigo-400 ml-2" />
          <span className="text-xs font-mono text-white/60 truncate flex-1">
            {current.file}
          </span>
          <span className="text-[10px] font-mono text-white/40 tabular-nums">
            {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>

        {/* Code body · slides between snippets */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.pre
              key={current.id}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 28 : -28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -28 : 28 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="about-code-body p-5 md:p-6 text-xs md:text-sm font-mono leading-relaxed overflow-x-auto"
            >
              {current.render()}
            </motion.pre>
          </AnimatePresence>
        </div>

        {/* Footer · caption + nav controls */}
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-5 px-5 md:px-6 py-3 about-code-caption border-t border-white/[0.06]">
          <p className="text-xs md:text-sm text-white/65 leading-relaxed flex-1">
            {t(current.captionKey)}
          </p>

          <div className="flex items-center gap-1 shrink-0">
            {/* Pause toggle */}
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? t("snippets.controls.play") : t("snippets.controls.pause")}
              className="about-snippet-ctrl w-7 h-7 rounded-md flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400"
            >
              {paused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            </button>

            {/* Prev */}
            <button
              type="button"
              onClick={prev}
              aria-label={t("snippets.controls.prev")}
              className="about-snippet-ctrl w-7 h-7 rounded-md flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-1.5 mx-2" role="tablist" aria-label={t("snippets.controls.ariaLabel")}>
              {CODE_SNIPPETS.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`${i + 1} / ${total}`}
                  onClick={() => goTo(i)}
                  className={`about-snippet-dot h-1.5 rounded-full transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 ${
                    i === active ? "w-6" : "w-1.5"
                  }`}
                />
              ))}
            </div>

            {/* Next */}
            <button
              type="button"
              onClick={next}
              aria-label={t("snippets.controls.next")}
              className="about-snippet-ctrl w-7 h-7 rounded-md flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
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


/* ── Use Case Cards · Devin Enterprise-style peek-on-hover carousel ── */
type UseCase = { id: string; caption: string; codeId: string };

const USE_CASES: UseCase[] = [
  { id: "multitenant", caption: "ARCHITECTURE", codeId: "tenant" },
  { id: "aiGateway", caption: "AI LAYER", codeId: "gateway" },
  { id: "antiHallucination", caption: "RESILIENCE", codeId: "antiHallucination" },
  { id: "modular", caption: "ARCHITECTURE", codeId: "eventBus" },
  { id: "infra", caption: "INFRA", codeId: "ensureSchemaSync" },
  { id: "idempotency", caption: "OPERATIONS", codeId: "idempotency" },
];

type SlidePosition = "active" | "peek-left" | "peek-right" | "hidden";

function UseCaseSlide({
  useCase,
  idx,
  position,
  onActivate,
  t,
}: {
  useCase: UseCase;
  idx: number;
  position: SlidePosition;
  onActivate: () => void;
  t: ReturnType<typeof useTranslations<"about">>;
}) {
  const code = CODE_SNIPPETS.find((c) => c.id === useCase.codeId);
  const intentRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const isPeek = position === "peek-left" || position === "peek-right";

  const handleEnter = () => {
    if (!isPeek) return;
    if (intentRef.current) clearTimeout(intentRef.current);
    intentRef.current = setTimeout(onActivate, 450);
  };
  const handleLeave = () => {
    if (intentRef.current) clearTimeout(intentRef.current);
  };
  const handleClick = () => {
    if (!isPeek) return;
    if (intentRef.current) clearTimeout(intentRef.current);
    onActivate();
  };

  const positionClass =
    position === "active"
      ? "is-active"
      : position === "peek-left"
      ? "is-peek-left"
      : position === "peek-right"
      ? "is-peek-right"
      : "is-hidden";

  // Peek mode · vertical hint with number + arrow + title
  if (isPeek) {
    return (
      <div
        className={`about-usecase-slide ${positionClass}`}
        aria-hidden="true"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onClick={handleClick}
      >
        <div className="about-usecase-peek-hint">
          <span className="peek-num">
            {String(idx + 1).padStart(2, "0")}
          </span>
          <span className="peek-arrow">{position === "peek-left" ? "←" : "→"}</span>
          <span className="peek-title">{useCase.caption}</span>
        </div>
      </div>
    );
  }

  // Active mode · full split card (text + code)
  return (
    <div className={`about-usecase-card about-usecase-slide ${positionClass}`}>
      <div className="grid lg:grid-cols-[0.85fr_1.15fr] h-full">
        {/* LEFT · text */}
        <div className="about-usecase-left p-6 md:p-8 lg:p-10 flex flex-col overflow-y-auto">
          <span className="about-usecase-caption text-[11px] font-semibold tracking-[0.2em] uppercase mb-4 inline-block">
            {useCase.caption}
          </span>
          <h4 className="text-xl md:text-2xl lg:text-[28px] font-bold leading-[1.15] mb-5 md:mb-6 text-white">
            {t(`useCases.${useCase.id}.title`)}
          </h4>
          <ul className="space-y-2.5 list-none">
            {[1, 2, 3, 4, 5].map((i) => {
              const text = t(`useCases.${useCase.id}.bullet${i}`);
              if (!text) return null;
              return (
                <li key={i} className="flex gap-3 items-start text-[13px] md:text-sm leading-relaxed text-white/75">
                  <HexIcon className="w-3 h-3 mt-[5px] shrink-0 about-usecase-hex" />
                  <span>{text}</span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* RIGHT · code mockup */}
        <div className="about-usecase-right relative flex flex-col min-h-0">
          <div className="flex items-center gap-2.5 px-5 py-3 border-b about-usecase-code-header shrink-0">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
            </div>
            <Terminal className="w-3.5 h-3.5 text-indigo-400 ml-2" />
            <span className="text-xs font-mono text-white/60 truncate">{code?.file}</span>
          </div>
          <pre className="about-code-body flex-1 min-h-0 p-5 md:p-6 text-[11px] md:text-xs font-mono leading-relaxed overflow-auto whitespace-pre">
            {code?.render()}
          </pre>
        </div>
      </div>
    </div>
  );
}

function UseCaseCardsCarousel({ t }: { t: ReturnType<typeof useTranslations<"about">> }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const total = USE_CASES.length;

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((p) => (p + 1) % total), 10000);
    return () => clearInterval(id);
  }, [paused, total]);

  const pauseAutoFor = useCallback((ms = 9000) => {
    setPaused(true);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => setPaused(false), ms);
  }, []);

  const goTo = useCallback((idx: number) => {
    setActive(((idx % total) + total) % total);
  }, [total]);

  const next = useCallback(() => { goTo(active + 1); pauseAutoFor(); }, [active, goTo, pauseAutoFor]);
  const prev = useCallback(() => { goTo(active - 1); pauseAutoFor(); }, [active, goTo, pauseAutoFor]);

  const leftIdx = (active - 1 + total) % total;
  const rightIdx = (active + 1) % total;

  const getPos = (i: number): SlidePosition => {
    if (i === active) return "active";
    if (i === leftIdx) return "peek-left";
    if (i === rightIdx) return "peek-right";
    return "hidden";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="mt-20 md:mt-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Section header */}
      <div className="text-center mb-10 md:mb-14">
        <span className="about-usecase-section-caption text-xs font-semibold tracking-[0.2em] uppercase mb-3 inline-block">
          {t("useCases.sectionCaption")}
        </span>
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
          {t("useCases.sectionTitle")}
        </h3>
      </div>

      {/* Peek carousel · all 6 slides absolutely positioned */}
      <div className="about-usecase-shell">
        <div className="about-usecase-track">
          {USE_CASES.map((uc, i) => (
            <UseCaseSlide
              key={uc.id}
              useCase={uc}
              idx={i}
              position={getPos(i)}
              onActivate={() => { goTo(i); pauseAutoFor(); }}
              t={t}
            />
          ))}
        </div>

        {/* Top progress bar · fixed above active card */}
        <div className="max-w-[1100px] mx-auto mt-2 h-[2px] bg-white/[0.04] rounded-full overflow-hidden relative z-10">
          <motion.div
            key={`bar-${active}-${paused ? "p" : "r"}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: paused ? 0 : 1 }}
            transition={{ duration: paused ? 0 : 10, ease: "linear" }}
            className="h-full origin-left bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500"
            style={{ transformOrigin: "left center" }}
          />
        </div>

        {/* External controls · dots + counter + prev/next */}
        <div className="max-w-[1100px] mx-auto mt-5 flex items-center justify-between px-2">
          <div className="flex items-center gap-2" role="tablist" aria-label={t("useCases.dotsAriaLabel")}>
            {USE_CASES.map((uc, i) => (
              <button
                key={uc.id}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`${i + 1} / ${total}`}
                onClick={() => { goTo(i); pauseAutoFor(); }}
                className={`about-usecase-dot h-1.5 rounded-full transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 ${
                  i === active ? "w-8" : "w-1.5"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono tabular-nums text-white/45">
              {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={prev}
                aria-label={t("snippets.controls.prev")}
                className="about-snippet-ctrl w-8 h-8 rounded-md flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label={t("snippets.controls.next")}
                className="about-snippet-ctrl w-8 h-8 rounded-md flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Tech Q&A Carousel · senior tech-lead interview prep ── */
type QACategory = "SYSTEM" | "PERF" | "SECURITY";
type TechQA = { id: string; category: QACategory };

const TECH_QAS: TechQA[] = [
  // System Design (3)
  { id: "idempotency", category: "SYSTEM" },
  { id: "cap", category: "SYSTEM" },
  { id: "saga", category: "SYSTEM" },
  // Performance (3)
  { id: "coreWebVitals", category: "PERF" },
  { id: "codeSplitting", category: "PERF" },
  { id: "memoization", category: "PERF" },
  // Security (3)
  { id: "jwtStateless", category: "SECURITY" },
  { id: "oauth2", category: "SECURITY" },
  { id: "passwordStorage", category: "SECURITY" },
];

function TechQACarousel({ t }: { t: ReturnType<typeof useTranslations<"about">> }) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const total = TECH_QAS.length;
  const current = TECH_QAS[active];

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setDirection(1);
      setActive((p) => (p + 1) % total);
    }, 10000);
    return () => clearInterval(id);
  }, [paused, total]);

  const goTo = useCallback((idx: number) => {
    setDirection(idx > active ? 1 : -1);
    setActive(idx);
  }, [active]);
  const next = useCallback(() => goTo((active + 1) % total), [active, total, goTo]);
  const prev = useCallback(() => goTo((active - 1 + total) % total), [active, total, goTo]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="about-techqa-section"
    >
      {/* Section header */}
      <div className="text-center mb-8 md:mb-10">
        <span className="about-usecase-section-caption text-xs font-semibold tracking-[0.2em] uppercase mb-3 inline-block">
          {t("techQA.sectionCaption")}
        </span>
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-tight">
          {t("techQA.sectionTitle")}
        </h3>
      </div>

      <div className="about-usecase-card relative rounded-3xl overflow-hidden">
        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/[0.04] z-10">
          <motion.div
            key={`qa-bar-${active}-${paused ? "p" : "r"}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: paused ? 0 : 1 }}
            transition={{ duration: paused ? 0 : 10, ease: "linear" }}
            className="h-full origin-left bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500"
            style={{ transformOrigin: "left center" }}
          />
        </div>

        <div className="p-7 md:p-10 lg:p-12 min-h-[460px] flex flex-col">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current.id}
              custom={direction}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1"
            >
              {/* Category badge */}
              <span className={`about-techqa-category about-techqa-category-${current.category.toLowerCase()} text-[11px] font-semibold tracking-[0.2em] uppercase mb-5 inline-flex items-center gap-2 px-3 py-1 rounded-full`}>
                <span className="w-1 h-1 rounded-full bg-current" />
                {t(`techQA.categories.${current.category.toLowerCase()}`)}
              </span>

              {/* Question (title) */}
              <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-5 text-white">
                {t(`techQA.${current.id}.question`)}
              </h4>

              {/* TL;DR · pull-quote style */}
              <p className="about-techqa-tldr text-base md:text-lg italic leading-relaxed mb-6 pl-4 border-l-2">
                💡 {t(`techQA.${current.id}.tldr`)}
              </p>

              {/* Detail · paragraph */}
              <p className="text-sm md:text-base leading-relaxed text-white/75 mb-6">
                {t(`techQA.${current.id}.detail`)}
              </p>

              {/* Proof · production evidence */}
              <div className="about-techqa-proof flex items-start gap-3 p-4 rounded-xl">
                <span className="text-lg shrink-0 leading-none about-techqa-proof-check">✓</span>
                <span className="text-sm md:text-base leading-relaxed text-white/80">
                  {t(`techQA.${current.id}.proof`)}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bottom · pagination dots + nav + counter */}
          <div className="flex items-center justify-between mt-8 md:mt-10 pt-6 border-t border-white/[0.06]">
            <div className="flex items-center gap-1.5 flex-wrap" role="tablist" aria-label={t("techQA.dotsAriaLabel")}>
              {TECH_QAS.map((qa, i) => (
                <button
                  key={qa.id}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`${i + 1} / ${total}`}
                  onClick={() => goTo(i)}
                  className={`about-techqa-dot about-techqa-dot-${qa.category.toLowerCase()} h-1.5 rounded-full transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 ${
                    i === active ? "w-8" : "w-1.5"
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono tabular-nums text-white/45">
                {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={prev}
                  aria-label={t("snippets.controls.prev")}
                  className="about-snippet-ctrl w-8 h-8 rounded-md flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label={t("snippets.controls.next")}
                  className="about-snippet-ctrl w-8 h-8 rounded-md flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── About Tabs · Agora / Como / Off-screen ── */
type TabId = "now" | "how" | "off";

const PROCESS_STEPS = [
  { icon: Compass, key: "understand" },
  { icon: Layers3, key: "architect" },
  { icon: Rocket, key: "ship" },
  { icon: RefreshCw, key: "iterate" },
] as const;

const PATTERNS = [
  { icon: Lock, key: "multitenancy" },
  { icon: RefreshCw, key: "resilience" },
  { icon: ShieldCheck, key: "security" },
  { icon: Eye, key: "observability" },
  { icon: Database, key: "dataLayer" },
  { icon: Layers, key: "cacheStrategy" },
] as const;

function AboutTabs({ t }: { t: ReturnType<typeof useTranslations<"about">> }) {
  const [active, setActive] = useState<TabId>("now");
  const tabs: { id: TabId; labelKey: string; icon: typeof Activity }[] = [
    { id: "now", labelKey: "tabs.now", icon: Activity },
    { id: "how", labelKey: "tabs.how", icon: Workflow },
    { id: "off", labelKey: "tabs.off", icon: Trophy },
  ];

  // Keyboard nav · ArrowLeft/Right
  const onKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const dir = e.key === "ArrowRight" ? 1 : -1;
      const next = (idx + dir + tabs.length) % tabs.length;
      setActive(tabs[next].id);
      const btn = document.getElementById(`tab-${tabs[next].id}`);
      btn?.focus();
    }
  };

  return (
    <div className="mt-16">
      {/* Pills · Linear/Apple style with sliding active indicator */}
      <div
        role="tablist"
        aria-label={t("tabs.ariaLabel")}
        className="about-tabs-pills relative flex gap-1 p-1 rounded-full w-fit mx-auto mb-10"
      >
        {tabs.map((tab, idx) => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            role="tab"
            aria-selected={active === tab.id}
            aria-controls={`panel-${tab.id}`}
            tabIndex={active === tab.id ? 0 : -1}
            onClick={() => setActive(tab.id)}
            onKeyDown={(e) => onKeyDown(e, idx)}
            className="about-tab-trigger relative inline-flex items-center gap-2 px-4 md:px-5 py-2.5 text-sm font-medium rounded-full transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          >
            {active === tab.id && (
              <motion.span
                layoutId="about-tab-active-pill"
                className="about-tab-active-pill absolute inset-0 rounded-full -z-[1]"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <tab.icon className={`w-4 h-4 relative shrink-0 ${active === tab.id ? "text-white" : "about-tab-icon-inactive"}`} aria-hidden="true" />
            <span className={active === tab.id ? "text-white relative" : "about-tab-label-inactive relative"}>
              {t(tab.labelKey)}
            </span>
          </button>
        ))}
      </div>

      {/* Content panels · AnimatePresence fade + slide */}
      <div className="relative">
        <AnimatePresence mode="wait">
          {active === "now" && (
            <motion.div
              key="now"
              role="tabpanel"
              id="panel-now"
              aria-labelledby="tab-now"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Bio · static · centered · readable type */}
              <div className="max-w-3xl mx-auto mb-12 md:mb-16 text-center">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-5">
                  <span className="gradient-text">{t("manifesto")}</span>
                </h3>
                <p className="about-quote-centered text-base md:text-lg italic leading-relaxed mb-10 inline-block">
                  “{t("manifestoQuote")}”
                </p>
                <div className="about-description-text-centered space-y-5 text-left md:text-base lg:text-lg leading-relaxed">
                  <p>{t("personalOpener")}</p>
                  <p>{t("personalDrives")}</p>
                  <p className="pt-5 border-t border-white/[0.06]">
                    {t("bioPrefix")} <span className="font-semibold text-indigo-400">{t("bioHighlight1")}</span> {t("bioMiddle")} <span className="font-semibold text-fuchsia-400">{t("bioHighlight2")}</span> {t("bioSuffix")}
                  </p>
                </div>
              </div>

              {/* Use Case Cards Carousel · 6 architectural cards with code right */}
              <UseCaseCardsCarousel t={t} />
            </motion.div>
          )}

          {active === "how" && (
            <motion.div
              key="how"
              role="tabpanel"
              id="panel-how"
              aria-labelledby="tab-how"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <TechQACarousel t={t} />
            </motion.div>
          )}

          {active === "off" && (
            <motion.div
              key="off"
              role="tabpanel"
              id="panel-off"
              aria-labelledby="tab-off"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="max-w-3xl mx-auto text-center mb-10">
                <p className="about-description-text text-lg leading-relaxed">
                  {t("patterns.intro")}
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-6xl mx-auto">
                {PATTERNS.map((pattern, index) => (
                  <motion.div
                    key={pattern.key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.05 + index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    className="about-offscreen-card relative p-6 md:p-7 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="about-offscreen-icon w-11 h-11 rounded-xl flex items-center justify-center mb-4">
                      <pattern.icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-base md:text-lg font-semibold mb-4 text-white/95 about-card-title">
                      {t(`patterns.${pattern.key}.title`)}
                    </h4>
                    <ul className="space-y-2 list-none">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <li
                          key={i}
                          className="flex gap-2.5 items-start text-[13px] md:text-sm leading-relaxed text-white/75 about-card-description"
                        >
                          <span className="text-emerald-400/90 shrink-0 mt-[2px] font-mono text-xs">✓</span>
                          <span>{t(`patterns.${pattern.key}.item${i}`)}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
      {/* AbstractBackground removido · sem animação lateral · dark/light segue tema global */}
      {/* Converge-style dotted grid · sutil · senior signal */}
      <div className="about-dotted-grid absolute inset-0 pointer-events-none opacity-40" aria-hidden="true" />

      {/* Stack illustration - desktop only */}
      <div className="container-custom relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="about-section-title text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 tracking-tight leading-none">
            {t("title")} <span className="gradient-text">{t("titleHighlight")}</span>
          </h2>
          <p className="about-subtitle max-w-2xl mx-auto text-base md:text-lg">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Stats row · 6 senior depth metrics with count-up */}
        <AboutStatsRow t={t} />

        {/* Tabs · Agora (bio + use case carousel) / Como trabalho (tech Q&A) / Histórico */}
        <AboutTabs t={t} />

        {/* Code snippet card · real production code from Sellorex */}

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
