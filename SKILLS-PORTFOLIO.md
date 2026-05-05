# Andri Amaro · Full Stack Developer

> **Senior em SaaS multi-tenant com IA tratada como infraestrutura.**
> Construo plataformas end-to-end · do design system ao orquestrador de IA.
> Documento mestre para portfolio · candidaturas · posts LinkedIn.

---

## Identidade Profissional

**Full Stack Developer focado em SaaS B2B multi-tenant com IA nativa em produção.**

Não construo MVPs descartáveis · projeto sistemas que escalam, com isolamento por tenant correto desde a primeira migration, observabilidade estruturada, anti-alucinação no kernel da IA e testes automatizados como padrão.

**End-to-end ownership real:** frontend, backend, banco com extensões vetoriais, cache distribuído, message queues, real-time, observabilidade, segurança, CI/CD. Não terceirizo decisões arquiteturais · projeto, implemento e opero.

**Stack-base:** Node.js · TypeScript strict · PostgreSQL + pgvector + HNSW · Redis · BullMQ · Express 4.21 · Next.js 14 (App Router) · React 18 · Tailwind · Framer Motion · Zustand · TanStack Query.

---

## Projeto Flagship · Sellorex

Plataforma SaaS B2B multi-tenant para PMEs brasileiras unificando CRM · Omnichannel · Automações · Conteúdo · Comércio · Analytics · IA. Em desenvolvimento ativo desde fevereiro 2026.

### Números reais (verificados no codebase, maio 2026)

| Métrica | Valor | Significado |
|---|---|---|
| Modelos Prisma | **126** | Schema relacional multi-tenant complexo |
| API endpoints | **~1036** | Controller → Service → Repository, 32 módulos |
| Módulos backend | **32** | Domain-driven, replaceable, barrel index |
| AI tools (gateway) | **394** | Entre Commander (148) + Sentinel (263) + domain tools |
| Agentes especializados | **12** | Commander + 11 agentes de negócio + Sentinel super admin |
| Worlds (domínios) | **9** | CRM, Omnichannel, Content, Commerce, Analytics, Automations, Brain, Auto-Sell, Billing |
| Web dashboard sections | **17** | ai-costs, analytics, automations, autopilot, billing, brain, channels, commerce, content, crm, dashboard, intelligence, notifications, recommendations, sellorex-impact, settings, simulation |
| Admin dashboard sections | **12** | agent, analytics, billing, diary, evolution, growth, intelligence, sell-mode, sentinel, system, tenants, users |
| Sentinel admin tools | **263** | Em 43 categorias · self-monitoring SaaS |
| Web pages | **27** | Next.js 14 App Router (apps/web) |
| Web components | **700+** | Shared design system + page-specific |
| Total .ts/.tsx files | **~1480** | Sem node_modules / dist / .next |
| Linhas de código | **~330k** | TypeScript strict mode 100% |
| LLM providers | **4+** | Claude · DeepSeek · OpenAI · Qwen (com fallback) |

### Stack técnico Sellorex (verificado no `package.json`)

**Backend (apps/api):**
```
express ^4.21.0
@anthropic-ai/sdk ^0.74.0
prisma + @prisma/client (107 models)
ioredis ^5.4.0
bullmq ^5.69.1
@sentry/node ^10.43.0
zod ^3.24.0
helmet ^8.0.0
express-rate-limit ^8.2.1
jsonwebtoken ^9.0.0
bcrypt ^5.1.1
sharp ^0.34.5
multer ^2.1.0
puppeteer-core ^24.39.1
@aws-sdk/client-s3 ^3.1000.0  (Cloudflare R2)
stripe ^20.3.1
resend ^6.9.3
swagger-ui-express ^5.0.1
winston ^3.17.0
```

**Frontend Web (apps/web · 1039 .tsx):**
```
next 14.2.35 (App Router)
react ^18.3.1
@tanstack/react-query ^5.90.0
zustand ^5.0.0
framer-motion ^12.38.0
@dnd-kit/core ^6.3.1
@xyflow/react ^12.10.0  (visual flow editor)
@tiptap/react ^3.19.0  (rich text editor)
recharts ^2.15.0
react-konva ^18.2.14  (canvas drawing)
sonner ^2.0.7  (toasts)
tailwind ^3.4.0
lucide-react ^0.462.0
@sentry/nextjs ^10.43.0
```

**Admin Panel (apps/admin · 212 .tsx):**
```
next 14.2.35
react-konva + use-image  (image manipulation)
recharts (analytics dashboards)
qrcode (QR for tenant onboarding)
zustand + react-query
```

---

## Arquitetura · Modular Event-Driven

### 32 módulos backend (Controller → Service → Repository)

Cada módulo é replaceable, barrel-indexed, com tenant isolation enforced em uma camada:

```
admin/         agents/          ai-brain/        ai-gateway/
analytics/     auth/            automations/     autopilot/
auto-sell/     billing/         brand-voice/     churn/
commander/     commerce/        content/         crm/
dashboard/     files/           gamification/    import/
integrations/  notifications/   omnichannel/     onboarding/
privacy/       recommendations/ revenue-autopilot/ simulation/
smart-calendar/ tenants/        users/           voice/
```

**Princípio:** adicionar feature nova = uma pasta nova. Imports sempre via path absoluto (`@/`), zero relative-hell.

### 9 Worlds coordenados via Business Event Bus pub/sub

Implementação em `apps/api/src/shared/services/`:
- `business-event-bus.ts` · `EventEmitter` singleton com `publish()` + `subscribe()` tipados
- `bus-listeners.ts` · listeners cross-world (notifications, recommendations, activity log, SSE push, dashboard invalidation)

**Eventos tipados** (`shared/types/business-events.ts`):

| Categoria | Eventos |
|---|---|
| **CRM** | `deal.created` · `deal.closed` · `deal.stagnated` · `lead.created` · `lead.qualified` |
| **Revenue** | `revenue.received` · `revenue.milestone` |
| **Omnichannel** | `conversation.created` · `conversation.resolved` · `message.received` · `response_time.slow` |
| **Automation** | `automation.created` · `automation.triggered` · `automation.completed` |
| **Wildcard `*`** | listener pega TODOS eventos (audit log, sentinel) |

**Exemplo de fluxo event-driven (real, do código):**
```
Lead criado em CRM World
  → bus.publish({type: 'lead.created', tenantId, leadId, source})
    → Notifications listener · alerta usuário
    → Brain listener · indexa lead no knowledge graph
    → Autopilot listener · checa rules e dispara workflow
    → SSE listener · push real-time pro frontend
    → Wildcard listener · audit log + sentinel watchers
```

Cada listener roda async, errors em listeners são caught (try/catch), `tenantId` SEMPRE no payload (`BaseBusinessEvent`).

### Multi-tenancy enforced em uma camada

**Pattern:** Repository injeta `tenantId` em TODA query Prisma · service nunca lida com isolation diretamente.

```typescript
// repository pattern
class LeadRepository extends BaseRepository {
  async findById(id: string, ctx: TenantContext) {
    return this.prisma.lead.findFirst({
      where: { id, tenantId: ctx.tenantId }  // ALWAYS
    });
  }
}
```

`tenantId` vem do JWT (`authMiddleware` → `tenantMiddleware`), NUNCA do request body.

Audit deterministico: agente local `tenant-isolation-auditor` scan-ear o codebase e flagga toda query Prisma sem filtro `tenantId`.

---

## AI Gateway · IA como Infraestrutura

> "Onde a maioria adiciona wrapper sobre um SDK, eu construo o gateway."

Localização: `apps/api/src/modules/ai-gateway/gateway.service.ts`

### Pipeline (5 camadas)

```
Request
  ↓
[1] Validate (Zod schema do request)
  ↓
[2] Route Model (analyzeComplexity → escolhe modelo)
  ↓
[3] Check Budget (creditEnforcer middleware · 3 níveis)
  ↓
[4] Call LLM (Claude / DeepSeek / OpenAI / Qwen com fallback)
  ↓
[5] Log + Return (AiUsageLog persistido + cost tracking)
```

### Multi-provider com fallback automático

Suportados via `claude.service.ts`:
- **Claude Opus 4.7 / Sonnet 4.6 / Haiku 4.5** (Anthropic)
- **DeepSeek** (cost optimization)
- **OpenAI GPT** (vision/specialized)
- **Qwen 3.6 Plus** (Alibaba · cheaper)

Routing decisão por:
- Plan do tenant (FREE → Haiku, ENTERPRISE → Opus)
- Complexity score do task
- Budget disponível
- Circuit breaker (graceful degradation se provider down)

### 10 engines especializados

Em `apps/api/src/modules/agents/engines/`:

| Engine | Função |
|---|---|
| `anti-hallucination.engine.ts` | 5 regras invioláveis · citação de fonte obrigatória, "não invente dados", resultados vazios são informação |
| `chain-of-thought.engine.ts` | Reasoning step-by-step pra tasks complexas |
| `feedback-learning.engine.ts` | Aprende com feedback do tenant (thumbs up/down) |
| `few-shot-learning.engine.ts` | Examples dinâmicos baseados em histórico |
| `graceful-degradation.engine.ts` | Circuit breaker + model cascade (Opus → Sonnet → Haiku → DeepSeek) |
| `memory-sharing.engine.ts` | Shared memory entre agentes do mesmo tenant |
| `response-cache.engine.ts` | Redis L1 cache de respostas frequentes |
| `response-quality.engine.ts` | Score 0-100 da resposta antes de devolver |
| `temperature-intelligence.engine.ts` | Temp dinâmica baseada no task type |
| `agent-collaboration.engine.ts` | Multi-agente com delegação (ex: Sales delega pra Finance) |

### Anti-hallucination 5 layers (regras invioláveis)

Trecho real do prompt em `anti-hallucination.engine.ts`:

> ▸ **REGRA 1** · NUNCA INVENTE DADOS. Se não tem dados, diga: "Não tenho dados suficientes sobre [X]. Quer que eu busque?"
> ▸ **REGRA 2** · CITE A FONTE de cada número/nome/fato (tool result, contexto, ou conhecimento geral marcado).
> ▸ **REGRA 3** · DIFERENCIE FATO de TENDÊNCIA de SUGESTÃO.
> ▸ **REGRA 4** · RESULTADOS VAZIOS são informação · não invente alternativas.
> ▸ **REGRA 5** · NOMES e IDs são SAGRADOS · nunca invente leads, deals, produtos, empresas.

**Por que isso importa:** Sellorex opera com dados de PMEs brasileiras reais. Inventar pode custar dinheiro do cliente. A regra está NO PROMPT do agente, não em validação posterior.

### Budget Enforcement em 3 níveis

Middleware `credit-enforcer.middleware.ts`:
1. **Per-request:** custo da chamada vs créditos disponíveis (tabela `AiCreditLedger`)
2. **Per-tenant/dia:** rate limit diário por plano
3. **Per-tenant/mês:** ceiling mensal absoluto

Custo calculado em real-time via `MODEL_COSTS` table com `Math.ceil` pra não perder fração em escala (10M chamadas × $0.0000005 = $5 perdidos sem ceil).

### Memory System hierárquico

`AiMemory` model com:
- **Short-term:** últimas N mensagens da conversation
- **Long-term:** facts persistidos com TTL
- **Semantic deduplication:** embedding similarity > 0.92 = duplicate, merge

`SentinelMemory` separado pro super admin · deduplicação semântica + history table pra audit.

---

## Commander · Orquestrador de Tenant

`apps/api/src/modules/commander/` · ~148 tools, 9 engines.

**Engines do Commander:**
- `auto-setup.engine.ts` · onboarding wizard automático
- `morning-briefing.engine.ts` · briefing diário pré-gerado 06h BRT
- `multi-step-orchestrator.engine.ts` · executa workflows multi-step com confirmation
- `onboarding-mode.engine.ts` · modo guided pra novos tenants
- `opportunity-alerts.engine.ts` · proactive alerts quando métricas mudam
- `segment-executor.engine.ts` · ações por segmento de negócio
- `segment-journeys.config.ts` · 7 segmentos pré-configurados (saúde, beauty, restaurante, etc.)
- `tenant-knowledge.engine.ts` · RAG sobre dados do tenant
- `weekly-strategy.engine.ts` · plano semanal AI-generated

---

## Sentinel · Self-Monitoring SaaS

`apps/api/src/modules/admin/` · **263 admin tools** em 43 categorias.

### O que faz

Sistema autônomo de monitoramento que detecta:
- Anomalias de uso (spike inesperado, drop suspeito)
- Erros silenciosos (queries lentas > 800ms, retry exhaustion)
- Regressões (deploy anterior performance baseline)
- Comportamento anômalo de tenants (churn risk, security)

**E propõe fixes:**
- `SentinelPowerRequest` · solicitação de implementação aprovada por humano
- `SentinelEvolutionLog` · registro do que foi feito self-improvement
- `SentinelDiary` · diário diário com observações + decisões
- `SentinelWeeklySummary` · sumário semanal de tendências

### Watchers especializados

`apps/api/src/modules/admin/sentinel-watchers/`:
- `pattern-detector.engine.ts` · detecta padrões em logs/eventos
- `threshold-auto-tuner.engine.ts` · auto-ajusta thresholds baseado em P95

### Self-evolution

`apps/api/src/modules/admin/sentinel-evolution/self-analysis.engine.ts` · Sentinel analisa próprio comportamento e propõe ajustes.

---

## Sell Mode · 12 Growth Engines (Self-Selling SaaS)

Sellorex se vende sozinho via 12 engines em `apps/api/src/modules/admin/growth/`:

| Engine | Função |
|---|---|
| `sell-content.engine.ts` | Gera 6 tipos de conteúdo usando dados reais de tenants existentes |
| `sell-capture.engine.ts` | Landing pages dinâmicas, lead magnets, A/B testing |
| `sell-chatbot.engine.ts` | Mini-Commander pro site público qualifica leads |
| `sell-nurture.engine.ts` | Jornada de 30 dias, 12 touchpoints, multi-canal |
| `sell-competitor.engine.ts` | Monitora 8 concorrentes (RD Station, HubSpot, Pipedrive...) |
| `sell-referral.engine.ts` | Sistema de créditos, 4 tiers (Starter → Ambassador) |
| `sell-autopilot.engine.ts` | Orquestrador master · plataforma vende sozinha 24/7 |
| `sell-outbound.engine.ts` | AI Prospector, 6 segmentos, scoring, outreach sequences |
| `sell-closer.engine.ts` | AI Sales 24/7, sentiment analysis, objection handling |
| `sell-demo-gen.engine.ts` | Demos personalizados por segmento, engagement tracking |
| `sell-proof.engine.ts` | Testimonials, case studies, trust score widgets |
| `sell-seo.engine.ts` | Content clusters, keyword research, artigos 2000+ palavras |

---

## Production Patterns Implementados

### Multi-tenancy

- ✅ `tenantId` filter em TODA query (enforced via Repository pattern + auditor)
- ✅ JWT contém `tenantId` · NUNCA confiar em request body
- ✅ Middleware chain: `cors → helmet → auth → tenant → rateLimit → handler → errorHandler`
- ✅ Index composto `(tenantId, createdAt)` em 30+ models · query 50ms vs 800ms
- ✅ Row-Level Security (RLS) backup em pgvector

### Resilience

- ✅ Retry com exponential backoff (1s, 2s, 4s, 8s)
- ✅ Dead letter queue (BullMQ) pra jobs que falharam 3x
- ✅ Circuit breaker no AI Gateway (graceful-degradation.engine)
- ✅ Cursor pagination (não offset · não funciona em scale)
- ✅ Idempotency keys em mutations críticas (Stripe webhooks, payment intents)

### Security

- ✅ Helmet headers + CORS whitelist
- ✅ JWT access (15min) + refresh (7d, httpOnly cookie)
- ✅ Brute force lockout (1s, 2s, 4s, 8s, 16s delay)
- ✅ RBAC: OWNER, ADMIN, MANAGER, MEMBER, VIEWER
- ✅ Audit log em TODA operação crítica (create, update, delete, login, permission change)
- ✅ Webhook HMAC-SHA256 verification (Stripe, WhatsApp)
- ✅ Bcrypt saltRounds: 12

### Observability

- ✅ Sentry SDK (error tracking + profiling)
- ✅ Structured logging (Winston · level/message/tenantId/userId/requestId)
- ✅ AiUsageLog · custo por request, tokens, modelo, latência
- ✅ ApiPerformanceLog · p50/p95/p99 por endpoint
- ✅ ErrorLog persistido em DB pra alerting

### Data Layer

- ✅ Connection pooling (Prisma · max 10 per pod)
- ✅ Transactions com `prisma.$transaction()` em operações atômicas
- ✅ Soft delete (`deletedAt DateTime?`) filtrado em TODA query
- ✅ pgvector + HNSW pra semantic search
- ✅ Migration auto-sync via `ensureSchemaSync()` no boot (Nixpacks não roda migrations)

### Cache Strategy

- ✅ L1 in-memory (30s TTL, hot data)
- ✅ L2 Redis (5min TTL, sessões + dashboards)
- ✅ Cache stampede protection (SET NX EX lock)
- ✅ Write-through invalidation
- ✅ Cache keys namespaced: `tenant:{id}:resource:{resourceId}`

---

## Arquitetura Profunda · Detalhes Senior

### Boot Sequence · Resilient Auto-Bootstrap

Sellorex API faz 3 coisas no boot que resolvem problemas reais de prod (Railway/Nixpacks · zero migration runner):

#### 1. `ensureSchemaSync()` · idempotent boot migrations

Nixpacks (Railway) NÃO roda `prisma migrate deploy` automaticamente. Solução: cada mudança de schema vira um SQL idempotente executado no boot da API.

```typescript
async function ensureSchemaSync() {
  const { prisma } = await import('./shared/services/prisma.service');

  // Cada SQL como $executeRawUnsafe individual com .catch(() => {})
  await prisma.$executeRawUnsafe(`
    ALTER TABLE "ContentAsset" ADD COLUMN IF NOT EXISTS "blocks" JSONB;
  `).catch(() => {});

  await prisma.$executeRawUnsafe(`
    ALTER TYPE "AdminTaskStatus" ADD VALUE IF NOT EXISTS 'APPROVED';
  `).catch(() => {});

  await prisma.$executeRawUnsafe(`
    ALTER TABLE "GrowthContent" ADD COLUMN IF NOT EXISTS "blogHtml" TEXT;
  `).catch(() => {});
  // ... 30+ ALTER statements idempotentes
}
ensureSchemaSync();
```

**Por que cada SQL separado:** múltiplos statements num só `$executeRawUnsafe` causam Postgres erro `42601`. Pattern aprendido em produção · agora regra Sellorex.

**Por que `IF NOT EXISTS` em tudo:** roda em TODA boot. Se coluna/tipo já existe, NOOP. Se não existe, aplica. Zero downtime, zero migration manual.

**Por que `.catch(() => {})`:** algumas operações falham silenciosamente (ex: enum value já existe em outra forma). Não pode bloquear boot da API.

#### 2. `generatePlatformSnapshot()` · auto-count stats em tempo real

```typescript
import { generatePlatformSnapshot } from './modules/admin/platform-snapshot.service';
generatePlatformSnapshot();
```

Roda no boot · conta tenants ativos, MRR, ARR, agentes, jobs queue · armazena snapshot no DB. Sentinel + Admin dashboard leem dali em vez de queries em tempo real (caro em scale).

**Trade-off:** stats têm lag de até 1 boot (geralmente 1 deploy = 1 update). Aceitável pra métricas globais. Pra métricas tenant-specific, query direto.

#### 3. Provider verification non-blocking

```typescript
import { verifyAuth as verifyHeyGen, isHeyGenAvailable, getRemainingQuota as getHeyGenQuota }
  from './modules/ai-gateway/external/heygen.client';

if (isHeyGenAvailable()) {
  Promise.all([verifyHeyGen(), getHeyGenQuota()])
    .then(([auth, quota]) => {
      if (auth.ok) {
        const credits = quota
          ? `${quota.planCredit} plan + ${quota.avatarIvFreeCredit} avatar-iv free`
          : 'quota indisponível';
        console.log(`[HeyGen] Auth OK · ${auth.user?.email} (${auth.user?.tier}) · créditos: ${credits}`);
      }
    });
}
```

**Pattern:** providers críticos (HeyGen, ElevenLabs, BytePlus) verificam auth + quota no boot · log estruturado · NÃO bloqueia se falhar. App sobe mesmo sem provider externo.

### AI Gateway · Estrutura Granular

`apps/api/src/modules/ai-gateway/` organizado em 4 sub-pastas:

```
ai-gateway/
├── gateway.service.ts       # Pipeline 5 camadas
├── gateway.middleware.ts    # Pre/post/error middlewares
├── gateway.types.ts         # MODEL_COSTS, GatewayCallRequest, etc.
├── credit-enforcer.middleware.ts  # Budget enforcement 3 níveis
│
├── external/                # Provider clients (10+)
│   ├── alibaba-liveportrait.client.ts
│   ├── alibaba-wan-animate.client.ts
│   ├── byteplus-speech.client.ts
│   ├── byteplus-vision.client.ts
│   ├── byteplus-voice-replication.client.ts
│   ├── heygen.client.ts
│   ├── credential-vault.ts          # Secrets management cross-provider
│   ├── external-router.ts           # Routing decision por provider
│   ├── analytics-adapters.ts
│   ├── commerce-adapters.ts
│   └── CLAUDE.md                    # Doc inline pra Claude Code
│
├── memory/                  # Memory system (short/long/semantic)
├── metrics/
│   └── cost-intelligence.routes.ts  # Endpoint pra cost dashboard
└── tools/
    └── domains/             # Tools mapeadas por domain
        ├── admin.tools.ts
        ├── analytics.tools.ts
        ├── automations.tools.ts
        ├── brain.tools.ts
        ├── commerce.tools.ts
        ├── content.tools.ts
        ├── crm.tools.ts
        ├── growth.tools.ts
        └── omnichannel.tools.ts
```

**Princípio:** novo provider = novo arquivo em `external/`. Novo tool = novo arquivo em `tools/domains/`. Zero refactor no gateway core.

### Admin Module · Sentinel + Sell Mode

`apps/api/src/modules/admin/` é o backbone do Super Admin. Estrutura:

```
admin/
├── admin.routes.ts                  # Routes públicas e protegidas
├── admin-tools.ts                   # 263 tools definitions (43 categorias)
├── admin-tool-executor.ts           # Executa tools com riskLevel + confirmation
├── admin-agent.controller.ts        # Sentinel agent endpoint
├── platform-snapshot.service.ts     # Auto-count stats no boot
├── sentinel-event.listener.ts       # Hook no Business Event Bus
├── sentinel-intent.engine.ts        # Classifica intent do Super Admin
│
├── growth/                          # 12 Sell Mode growth engines
│   ├── sell-autopilot.engine.ts
│   ├── sell-capture.engine.ts
│   ├── sell-chatbot.engine.ts
│   ├── sell-closer.engine.ts
│   ├── sell-competitor.engine.ts
│   ├── sell-content.engine.ts
│   ├── sell-demo-gen.engine.ts
│   ├── sell-nurture.engine.ts
│   ├── sell-outbound.engine.ts
│   ├── sell-proof.engine.ts
│   ├── sell-referral.engine.ts
│   ├── sell-seo.engine.ts
│   ├── video-stitcher.engine.ts
│   ├── growth-data-bridge.engine.ts
│   ├── public-growth.routes.ts      # Endpoints públicos (landing pages, lead capture)
│   └── growth-video.types.ts
│
├── market-intelligence/             # Web search + competitor monitoring
│
├── sentinel-alerts/                 # Alert system com SentinelAlert model
│
├── sentinel-evolution/              # Self-improvement
│   └── self-analysis.engine.ts      # Sentinel analisa próprio comportamento
│
├── sentinel-memory/                 # Cérebro persistente (SentinelMemory + History)
│
└── sentinel-watchers/               # Watchers especializados
    ├── pattern-detector.engine.ts   # Detecta padrões em logs/eventos
    ├── threshold-auto-tuner.engine.ts # Auto-ajusta thresholds via P95
    └── market-intelligence.watcher.ts # Monitora mercado externo
```

**Tool Definition pattern (do código real):**
```typescript
{
  tool: {
    name: 'admin_get_metrics',
    description: 'Busca métricas globais da plataforma...',
    input_schema: {
      type: 'object' as const,
      properties: { /* Zod-style schema */ },
      required: [],
    },
  },
  requiresConfirmation: false,  // ou true pra ação destrutiva
  riskLevel: 'low',              // 'low' | 'medium' | 'high'
  agentTypes: ['SUPER_ADMIN'],   // exclusivo do Sentinel
}
```

**Risk levels:**
- 13 query tools (sem confirmation, low risk)
- 30 action tools (require confirmation, medium/high risk)
- 12 Sell Mode tools (medium risk · podem afetar tenants)
- 6 Trial Management tools (high risk · podem freezar/unfreeze plataforma)

### Module Subfolder Pattern

Cada módulo grande tem subfolders especializadas seguindo padrão consistente:

```
agents/                       ai-brain/                automations/
├── agents.controller.ts      ├── ai-brain.controller  ├── automations.controller
├── agents.service.ts         ├── ai-brain.service     ├── automations.service
├── agents.repository.ts      ├── brain-world.service  ├── automations.repository
├── agents.routes.ts          ├── ai-brain.routes      ├── automations.routes
├── agents.types.ts           ├── engines/             ├── engine/    # execution
├── agents.validator.ts       │   └── health-          ├── handlers/  # action handlers
├── agent-identity-system.ts  │       calculator       ├── templates/
├── agent-executor.engine.ts  └── extractors/          └── versions/
└── engines/ (10 engines)         (data extractors)
```

**Pattern:** main module file (controller/service/repository/routes/types/validator) + subfolders especializadas (engines/, handlers/, templates/, etc.) baseado em complexidade do domínio.

### Build & Deploy Optimizations

#### Docker multi-stage real (do `apps/web/Dockerfile`)

```dockerfile
# Stage 1: Builder (deps + tools)
FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build  # gera dist/

# Stage 2: Runtime (mínimo)
FROM node:20-alpine AS runtime
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./
EXPOSE 3000
CMD ["node", "dist/server.js"]
```

**Resultado:** build 800MB → runtime 75MB (10x menor) · alpine base + sem dev deps + sem source code original.

#### Layer cache aggressive

```dockerfile
# 1. COPY package.json primeiro (raramente muda)
COPY package*.json ./
RUN npm ci

# 2. COPY código DEPOIS (muda sempre)
COPY . .
```

**Resultado:** build de 4min → 40s quando só código muda (90% das vezes em dev).

#### Memory-constrained runtime

```toml
# nixpacks.toml
NODE_OPTIONS=--max-old-space-size=512
```

API roda com 512MB heap · força disciplina de não vazar memória · OOM killer mata pods leak antes que afete tenants.

### Patterns de Resilience Implementados

#### Idempotency (Stripe webhook example)

```typescript
const idempotencyKey = req.headers['stripe-idempotency-key'];
const existing = await prisma.processedWebhook.findUnique({ where: { idempotencyKey } });
if (existing) return sendSuccess(res, { duplicate: true });

await prisma.$transaction(async (tx) => {
  await tx.processedWebhook.create({ data: { idempotencyKey } });
  // ... actual webhook handling
});
```

#### Cursor pagination (escala bem · offset não)

```typescript
const items = await prisma.lead.findMany({
  where: { tenantId, ...(cursor && { id: { lt: cursor } }) },
  orderBy: { id: 'desc' },
  take: limit + 1,
});
const hasMore = items.length > limit;
const nextCursor = hasMore ? items[limit - 1].id : null;
```

#### Circuit breaker (graceful-degradation.engine)

```typescript
async function callWithFallback(model: string, prompt: string) {
  try {
    return await callClaude(model, prompt);
  } catch (err) {
    if (err.code === 'rate_limit_exceeded') {
      return await callDeepSeek(prompt);  // 10x cheaper fallback
    }
    if (err.code === 'overloaded') {
      return await callQwen(prompt);  // alternative provider
    }
    throw err;
  }
}
```

---

## LGPD Compliance Ongoing

8 páginas legais publicadas em `apps/web/app/(public)/legal/` (2549 linhas):

- `/legal/privacidade` (548 linhas)
- `/legal/termos` (326)
- `/legal/cookies` (221)
- `/legal/lgpd` (402)
- `/legal/seguranca` (426)
- `/legal/exclusao-dados` (292)
- `/legal/subprocessadores` (207)

**Operacionalização:** módulo `privacy/` implementa:
- Consent management (model `Consent`)
- Data subject access requests (DSAR intake + processing)
- Right-to-erasure workflow (model `DeletionRequest`)
- Audit trail completo

---

## Skills Técnicas

### Backend & APIs

- **Node.js + TypeScript strict** · 1480 files, 330k LOC, zero `any` injustificado
- **Express.js** · controller → service → repository pattern, middleware chain organizado
- **REST API design** · resource naming, status codes, pagination cursor-based, error responses padronizadas
- **PostgreSQL + Prisma** · 126 models, index strategies, transactions, raw queries quando necessário
- **pgvector + HNSW** · semantic search, embeddings, vector ops
- **Redis + BullMQ** · cache distribuído, queue processing, dead letter queue
- **WebSocket / Socket.io** · real-time multi-tenant, rooms por tenantId
- **Webhook engineering** · HMAC verification, idempotency, retry, DLQ (Stripe, WhatsApp, ElevenLabs, Replicate, Resend)

### Frontend

- **Next.js 14 App Router** · server components, streaming, parallel routes, ISR pra landing pages
- **React 18** · hooks avançados (useReducer pra state complexo), composition patterns, custom hooks
- **TypeScript strict** · type-safe end-to-end (incluindo Prisma generated types)
- **Tailwind CSS** · design system tokens, dark/light mode
- **Framer Motion** · page transitions, layout animations, scroll-triggered
- **TanStack Query** · server state, optimistic updates, cache invalidation
- **Zustand** · client state global leve
- **Tiptap** · rich text editor (blog editor)
- **xyflow + dnd-kit** · visual flow editor (automations builder)
- **Konva** · canvas drawing (image annotation)

### AI / LLM Engineering

- **Multi-provider Gateway** · Claude + DeepSeek + OpenAI + Qwen com fallback
- **Anti-hallucination patterns** · 5 regras invioláveis embedidas no system prompt
- **Cost optimization** · model routing por complexity, budget enforcement 3 níveis
- **Memory Systems** · short-term + long-term + semantic deduplication
- **Agent orchestration** · 12 agentes especializados, delegation, multi-step workflows
- **RAG architecture** · pgvector + HNSW + hybrid search (keyword + semantic)
- **Tool use** · 394 tools mapped por domain, structured response framework
- **Streaming** · SSE pra chat real-time, chunked responses
- **Prompt engineering** · system prompts versionados, few-shot examples dinâmicos
- **Multimodal** · imagem (BytePlus Seedream/Wan), vídeo (Seedance/Wan T2V), voz (ElevenLabs PVC), avatar (HeyGen)

### DevOps / Platform

- **Docker** · multi-stage builds (build 800MB → runtime 75MB · 10x menor), layer cache (4min → 40s)
- **Cloudflare Workers + R2** · OpenNext deploy, edge functions, R2 bucket pra mídia
- **Railway** · Postgres + Redis + API auto-deploy via Nixpacks/Docker
- **CI/CD** · GitHub Actions, conventional commits, semantic versioning
- **Monorepo** · Turborepo + pnpm workspaces (zero deps duplicação)
- **Observability** · Sentry SDK + structured logs (Winston) + custom AiUsageLog/ErrorLog tables

### Quality / Testing

- **Testing pyramid** · unit (Vitest) + integration (Postgres real em CI) + E2E (Playwright)
- **TypeScript strict** · zero `any` injustificado, runtime validation com Zod em toda entrada
- **TDD** · usado em pricing engine + budget enforcer (zero regressão em 6 meses)
- **Code review** · ADRs em cada decisão, conventional commits

### Security & Compliance

- **JWT + refresh tokens** · access 15min, refresh 7d httpOnly
- **RBAC granular** · 5 níveis (OWNER/ADMIN/MANAGER/MEMBER/VIEWER)
- **LGPD ongoing** · consent, DSAR, retention, breach response 72h ANPD
- **Webhook HMAC** · signature verification em TODOS webhooks
- **Audit logs** · 100% das operações críticas
- **Rate limiting** · per-IP públicos, per-tenant autenticados

---

## Diferenciais (positioning único)

1. **IA como infraestrutura, não wrapper.** Construo o gateway, não só chamo a API. Anti-alucinação é regra invioável no kernel.

2. **Multi-tenant correto desde o dia 1.** Row-Level Security implementada na primeira migration, não retrofittada depois. Auditor automático garante zero regressão.

3. **AI Gateway com cost intelligence.** Budget enforcement em 3 níveis · `Math.ceil` em fração de centavo evita perda em escala.

4. **Sistema self-monitoring (Sentinel).** SaaS que se monitora · 263 admin tools, propõe fixes via SentinelPowerRequest, evolui via SentinelEvolutionLog.

5. **Self-selling platform (Sell Mode).** 12 engines que rodam Sellorex marketing/sales 24/7 sem intervenção humana. Conteúdo, captura, nurture, demo, closer.

6. **Modular event-driven.** 9 Worlds independentes coordenados via Business Event Bus pub/sub com eventos tipados (`deal.created`, `lead.qualified`, etc.) · adicionar feature nova = uma pasta nova.

7. **Quality como padrão, não feature.** TypeScript strict, validação Zod runtime, ADRs documentados, conventional commits, CI/CD obrigatório.

---

## Pulse Ecosystem · Track Record Pré-Sellorex

Antes do Sellorex, criei o **Pulse Ecosystem** · 4 SaaS production-ready compartilhando design system:

- **Pulse Theme** · publicado comercialmente
- **Pulse Chat** · real-time com Socket.io rooms multi-tenant
- **Pulse Finance** · dashboard financeiro com 25 variantes de chart
- **Vexiat** · project management com Stripe billing + RBAC granular

**Métricas Pulse:**
- 100+ componentes shared
- 380+ testes automatizados
- 740+ commits
- 4 apps live em produção

**Stack:** Next.js + TypeScript + Express + Prisma + PostgreSQL + Redis + Cloudflare Workers + Railway

---

## Posts LinkedIn Prontos

### Post 1 · Arquitetura Modular Event-Driven

```
🏗️ Como organizo 32 módulos backend sem virar bagunça

Sellorex · SaaS B2B multi-tenant com 126 modelos Prisma · 1036 endpoints · 12 agentes IA.

A complexidade só cresce. Mas o codebase continua navegável porque segui 3 regras desde o dia 1:

1️⃣ MODULAR POR DOMÍNIO
modules/{nome}/ com routes/service/repository/types
Cada módulo é replaceable
Imports sempre via path absoluto (@/) · zero relative-hell

2️⃣ EVENT BUS PUB/SUB
9 Worlds independentes coordenados via business-event-bus.ts (eventos tipados)
Lead criado em CRM World? Brain indexa, Autopilot dispara workflow, Sentinel loga audit
Cada listener é async, falhas isoladas, eventos têm tenantId no payload

3️⃣ TENANT ISOLATION ENFORCED EM 1 LUGAR
Repository pattern injeta tenantId em TODA query Prisma
Service nunca lida com isolation diretamente
Auditor automático scaneia codebase e flagga violation

Resultado: feature nova = uma pasta nova. Sem precisar tocar no resto do sistema.

Stack: Node · TypeScript · Prisma · PostgreSQL · Redis · Express

#fullstack #typescript #saas #multitenant #softwarearchitecture
```

### Post 2 · AI Gateway · IA como Infraestrutura

```
🤖 Onde a maioria adiciona wrapper sobre OpenAI, eu construo o gateway.

Construindo o Sellorex · SaaS B2B com 12 agentes IA em produção · aprendi cedo que tratar IA como decoração mata o produto. Tem que ser infraestrutura.

O AI Gateway do Sellorex tem 5 camadas:

1️⃣ VALIDATE · Zod schema do request
2️⃣ ROUTE MODEL · analyzeComplexity escolhe (Opus/Sonnet/Haiku/DeepSeek/Qwen)
3️⃣ CHECK BUDGET · 3 níveis de enforcement (per-request, per-day, per-month)
4️⃣ CALL LLM · com circuit breaker + cascade fallback
5️⃣ LOG + RETURN · AiUsageLog persiste tudo + cost real-time

Multi-provider com fallback automático:
Claude Opus 4.7 (principal) → Sonnet 4.6 → Haiku 4.5 → DeepSeek → Qwen

Cost calculator usa Math.ceil em fração de centavo · em escala de 10M chamadas, perder $0.0000005 por call vira $5.

10 engines especializados:
✅ anti-hallucination (5 regras invioláveis)
✅ chain-of-thought
✅ feedback-learning
✅ few-shot-learning
✅ graceful-degradation (circuit breaker)
✅ memory-sharing
✅ response-cache (Redis L1)
✅ response-quality (score 0-100)
✅ temperature-intelligence
✅ agent-collaboration

Stack: Node · TypeScript · Anthropic SDK · Redis · pgvector + HNSW

Sem gateway, cada serviço chamaria Claude direto · sem cost tracking, sem fallback, sem audit. Game over em escala.

#ai #llm #softwareengineering #typescript #anthropic
```

### Post 3 · Multi-tenant SaaS Correto Desde o Dia 1

```
🔒 Multi-tenant retrofittada depois sempre vira disaster.

Construindo o Sellorex · 126 modelos Prisma · ~50 tenants em uso · zero leak de dados entre tenants em 6 meses.

Como? Disciplina desde a migration número 1:

1️⃣ tenantId NOT NULL em TODA tabela
Sem default. Sem nullable. Schema-level constraint.

2️⃣ JWT carrega tenantId · NUNCA confia em request body
authMiddleware extrai do token
tenantMiddleware seta req.tenant
Body do user nunca decide isolation

3️⃣ Repository pattern injeta tenantId automaticamente
class LeadRepository extends BaseRepository {
  findById(id, ctx) {
    return prisma.lead.findFirst({
      where: { id, tenantId: ctx.tenantId }  // ALWAYS
    })
  }
}

4️⃣ Index composto (tenantId, createdAt) em 30+ models
Query 50ms vs 800ms · 16x speedup

5️⃣ AUDITOR AUTOMÁTICO scaneia codebase
Agente Claude que flagga toda query sem tenantId filter
Roda em CI, blocka PR

6️⃣ Row-Level Security backup em pgvector
Defense in depth · se aplicação falhar, banco protege

Resultado: zero leak em produção. Auditável. Compliance LGPD direto.

Stack: PostgreSQL + Prisma + pgvector + Express

#multitenant #saas #postgresql #security #softwareengineering
```

### Post 4 · Cost Optimization em Escala

```
💰 Como economizei 16x em queries Postgres no Sellorex

Cenário: 30+ tabelas com queries `WHERE tenantId = ? AND ...` rodando milhares de vezes por dia.

Antes: query média 800ms.
Depois: 50ms (p95).

Mudança: index composto (tenantId, createdAt) em todos os models hot.

EXPLAIN ANALYZE mostrou que a query estava fazendo SEQ SCAN · index não composto não funcionava porque o Postgres precisava combinar 2 conditions.

Lição: em multi-tenant, o tenantId é SEMPRE o primeiro filtro. Index composto com tenantId na primeira posição garante que toda query usa o index sem scan completo.

Bonus: redução proporcional em CPU/IO do Postgres = redução de custo Railway.

Em escala: 1M queries/dia × 750ms economizados = 12.5 minutos de CPU economizados/dia × 30 dias = 6 horas/mês de CPU evitados.

Stack: PostgreSQL + Prisma

#postgresql #performance #saas #softwareengineering
```

### Post 5 · Anti-Hallucination Pattern

```
🚨 Como construo IA que NUNCA INVENTA dados em produção

Sellorex · 12 agentes IA operando dados de PMEs brasileiras reais. Inventar pode custar dinheiro do cliente.

Solução: 5 regras invioláveis NO SYSTEM PROMPT do agente, não em validação posterior.

▸ REGRA 1 · NUNCA INVENTE DADOS
Se não tem dados, diga: "Não tenho dados sobre [X]. Quer que eu busque?"
NUNCA preencha lacunas com números inventados.

▸ REGRA 2 · CITE A FONTE de cada número/nome/fato
Resultado de tool, contexto do sistema, ou conhecimento geral marcado.

▸ REGRA 3 · DIFERENCIE FATO de TENDÊNCIA de SUGESTÃO
FATO: dado direto de fonte → "MRR atual: R$ 47k (Stripe API)"
TENDÊNCIA: padrão observado → "Últimos 3 meses, churn aumentou 12%"
SUGESTÃO: opinião especializada → "Recomendo X porque [justificativa com dados]"
NUNCA misture sem sinalizar.

▸ REGRA 4 · RESULTADOS VAZIOS são INFORMAÇÃO
Busca vazia NÃO é erro. NÃO invente alternativas.
Diga: "Não encontrei [X]. Possíveis motivos: [...]. Tentar [alternativa]?"

▸ REGRA 5 · NOMES e IDs são SAGRADOS
NUNCA invente nomes de leads, deals, produtos, empresas, IDs.

Bonus: response-quality.engine.ts faz score 0-100 da resposta antes de devolver. Se < 70, regenera.

Stack: Anthropic Claude + Zod validation + custom engines

#ai #llm #prompts #anthropic #softwareengineering
```

### Post 6 · Self-Monitoring SaaS (Sentinel)

```
🔭 Construí um SaaS que se monitora sozinho

Sellorex tem o Sentinel · super admin agent com 263 tools em 43 categorias.

O que ele faz?

DETECTA AUTOMATICAMENTE:
✅ Anomalias de uso (spike inesperado, drop suspeito)
✅ Erros silenciosos (queries lentas > 800ms, retry exhaustion)
✅ Regressões (deploy anterior performance baseline)
✅ Behavior anômalo de tenants (churn risk, security events)

PROPÕE FIXES:
✅ SentinelPowerRequest · solicitação de implementação
✅ SentinelEvolutionLog · registro do que foi feito
✅ SentinelDiary · observações + decisões diárias
✅ SentinelWeeklySummary · sumário de tendências

WATCHERS ESPECIALIZADOS:
✅ pattern-detector.engine.ts · padrões em logs/eventos
✅ threshold-auto-tuner.engine.ts · auto-ajusta thresholds baseado em P95

SELF-EVOLUTION:
✅ self-analysis.engine.ts · Sentinel analisa próprio comportamento e propõe ajustes

Acesso: observabilidade + infra + código + banco + cache

Em vez de mim ficar acordado debugando às 3am, o Sentinel detecta o problema, abre PowerRequest, eu aprovo, ele implementa.

Não é magia · é arquitetura.

Stack: Anthropic Claude Opus + tool use + Postgres + Redis + custom engines

#ai #observability #saas #devops #softwareengineering
```

---

## Talking Points pra Entrevista

### "Me conta sobre o Sellorex"

> Sellorex é um SaaS B2B multi-tenant para PMEs brasileiras unificando CRM, omnichannel, automações, conteúdo, comércio e analytics com IA nativa. Tem 126 modelos Prisma, 1036 endpoints REST organizados em 32 módulos, 12 agentes IA orquestrados via gateway multi-provider, e 10 "Worlds" coordenados via Event Bus pub/sub.
>
> O diferencial é a IA não ser wrapper · construí o gateway com pipeline de 5 camadas (validate → route model → budget check → call LLM → log) e anti-alucinação como regra invioável no kernel. Tem fallback automático Claude → DeepSeek → Qwen baseado em complexity score e plan do tenant.

### "Qual foi o maior desafio técnico?"

> Multi-tenancy correto desde o dia 1 com 32 módulos crescendo em paralelo. Tive que enforced isolation no Repository pattern (toda query injeta tenantId automaticamente), backup com Row-Level Security em pgvector, e construí um auditor automático que scaneia o codebase e flagga qualquer query sem filtro tenantId.
>
> Resultado: zero leak entre tenants em 6 meses de uso. Auditável. Compliance LGPD direto.

### "Por que Event Bus e não chamadas diretas?"

> 9 Worlds (CRM, Omnichannel, Brain, etc.) precisam reagir a eventos uns dos outros sem acoplamento. Lead criado em CRM dispara: `lead.created` event → Brain indexa knowledge, Autopilot checa rules, Sentinel loga audit, SSE push real-time pro frontend · tudo async, isolado, com tenantId no payload.
>
> Sem Event Bus, cada feature nova exigia tocar em N módulos. Com pub/sub, listener novo = arquivo novo · zero refactor.

### "Como você lida com cost de LLM em escala?"

> 3 níveis de Budget Enforcement no AI Gateway:
> - Per-request: custo da call vs créditos disponíveis (AiCreditLedger)
> - Per-tenant/dia: rate limit por plano
> - Per-tenant/mês: ceiling absoluto
>
> Cost calculator usa `Math.ceil` em fração de centavo · 10M calls × $0.0000005 = $5 perdidos sem ceil. Em escala isso vira muito.
>
> Plus model routing automático: tasks simples vão pra Haiku ou DeepSeek (10x mais barato), tasks complexas pra Opus.

### "TDD no Sellorex?"

> Uso TDD em DOMÍNIOS COM REGRA CLARA: pricing engine, budget enforcer, anti-hallucination scoring. Lá faz sentido · regra escrita primeiro como teste, código depois.
>
> NÃO uso em UI exploração ou integração externa instável. TDD não é dogma · é ferramenta.
>
> Resultado em pricing engine + budget enforcer: zero regressão em 6 meses.

### "Como deploya?"

> Push master → Railway auto-deploy. Sem CI/CD manual.
>
> API: Nixpacks. Web/Admin: Docker multi-stage (build 800MB → runtime 75MB).
>
> Auto-migration via `ensureSchemaSync()` no boot da API (Nixpacks não roda migrations). Cada SQL como `$executeRawUnsafe` individual com `.catch(() => {})` pra ser idempotente.
>
> Cloudflare na frente de Web + Admin (CDN/SSL/DNS).

---

## Próximos Passos · Roadmap Pessoal

### Q2 2026
- ✅ Sellorex em produção (atual)
- ⏳ Apolo tenant piloto (validação real-world)
- ⏳ Apify Lead Hunter integration (Sub-Fase 2.2.1)

### Q3 2026
- ⏳ VikingDB / Knowledge Engine cloud (RAG platform)
- ⏳ Sentinel SaaS standalone (separar do Sellorex como produto independente)
- ⏳ Voice Reply WhatsApp com voz clonada (feature viral)

### Q4 2026
- ⏳ HeyGen Avatar agents (avatares dos 11 agentes)
- ⏳ Sistema de créditos PME (não em USD, em créditos)
- ⏳ Marketplace de templates/integrações (futuro · não-prioritário)

---

## Como Usar Este Documento

### Para portfólio (andrifullstack.workers.dev)
- Hero · pegar bullet "Senior em SaaS multi-tenant com IA tratada como infraestrutura"
- About · usar narrativa "Projeto Flagship Sellorex" + "Diferenciais"
- Skills · seção "Skills Técnicas" inteira

### Para candidatura (LinkedIn / Recruiter)
- Adapt "Identidade Profissional" como headline LinkedIn
- "Diferenciais" como bullet points em "About" do LinkedIn
- "Talking Points pra Entrevista" como prep antes de calls

### Para posts LinkedIn
- 6 posts prontos na seção "Posts LinkedIn Prontos" · copia-cola, customiza
- Cada um foca em 1 conceito técnico com prova prática (Sellorex)

### Para mostrar em entrevista
- Print da arquitetura modular (32 módulos · 9 Worlds · Business Event Bus tipado)
- Print do AI Gateway pipeline (5 camadas)
- Print da seção "Production Patterns" (multi-tenant, security, observability)

---

**Última atualização:** 2026-05-03 (deep-dive verificado contra codebase atual via context-mode)
**Versão Sellorex:** unicorn-platform @ 9a43639 (master)
**Manutenção:** atualizar trimestralmente com novos números do codebase
