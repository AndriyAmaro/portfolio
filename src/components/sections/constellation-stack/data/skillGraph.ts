// Architecture nodes · 5 mundos arquiteturais radiais ao redor do crystal core
// Match com referência: AI / FE / BE / Platform / Security

export type NodeShape = "torusKnot" | "icosahedron" | "dodecahedron" | "octahedron" | "torus";

export type ArchitectureNode = {
  id: string;
  label: string;
  abbr: string;
  color: string;
  secondary: string;
  position: [number, number, number];
  shape: NodeShape;
  techs: string[];
  desc: string;
  pattern: string;
  stats: { availability: string; latency: string };
};

export const ARCHITECTURE_NODES: ArchitectureNode[] = [
  {
    id: "ai",
    label: "AI / LLM",
    abbr: "AI",
    color: "#8b5cf6",
    secondary: "#a78bfa",
    position: [0, 4, 0],
    shape: "torusKnot",
    techs: ["Claude 4.7", "DeepSeek", "Qwen 3.6", "RAG", "pgvector", "Multi-provider Gateway"],
    desc: "Multi-provider LLM gateway com circuit breaker e fallback automático. RAG pipeline otimizado com chunking semântico e embeddings caching. 394 AI tools mapped por domain.",
    pattern: "Gateway + RAG",
    stats: { availability: "99.9%", latency: "< 150ms" },
  },
  {
    id: "frontend",
    label: "Frontend Architecture",
    abbr: "FE",
    color: "#06b6d4",
    secondary: "#22d3ee",
    position: [-5, 1, 0],
    shape: "icosahedron",
    techs: ["Next.js 14·16", "React 18·19", "TypeScript", "Tailwind", "Framer Motion", "TanStack Query", "Zustand"],
    desc: "App Router com streaming SSR e parallel routes. Design system handcrafted (100+ comps) com Radix UI primitives. State atômico Zustand + cache TanStack Query.",
    pattern: "SSG/SSR Hybrid",
    stats: { availability: "100%", latency: "< 50ms" },
  },
  {
    id: "backend",
    label: "Backend Core",
    abbr: "BE",
    color: "#10b981",
    secondary: "#34d399",
    position: [5, 1, 0],
    shape: "dodecahedron",
    techs: ["Node.js 22", "Express", "Hono", "Prisma", "PostgreSQL 16", "Redis", "BullMQ", "Socket.io"],
    desc: "32 módulos modulares · 1.036 endpoints REST. Hono edge-ready, BullMQ pra jobs distribuídos. PostgreSQL pooling otimizado, multi-tenancy enforced em uma camada.",
    pattern: "Modular Event-Driven",
    stats: { availability: "99.99%", latency: "< 20ms" },
  },
  {
    id: "platform",
    label: "DevOps & Platform",
    abbr: "PL",
    color: "#f59e0b",
    secondary: "#fbbf24",
    position: [-3, -4, 0],
    shape: "octahedron",
    techs: ["Docker", "Cloudflare Workers", "Turborepo", "GitHub Actions", "Railway", "Vercel", "Sentry", "Nixpacks"],
    desc: "Multi-stage Docker (800MB → 75MB · 10x menor). Cloudflare Workers edge-ready via OpenNext. Turborepo + pnpm monorepo, idempotent boot migrations.",
    pattern: "Edge + Monorepo",
    stats: { availability: "99.95%", latency: "Global" },
  },
  {
    id: "security",
    label: "Security & Testing",
    abbr: "SEC",
    color: "#f43f5e",
    secondary: "#fb7185",
    position: [3, -4, 0],
    shape: "torus",
    techs: ["Vitest", "Playwright", "Zod", "JWT", "RBAC", "HMAC webhooks", "LGPD"],
    desc: "Zero-trust security com RBAC granular (5 níveis) e audit logs imutáveis. Vitest unit + Playwright E2E em CI. Zod runtime validation em toda entrada.",
    pattern: "Zero-Trust",
    stats: { availability: "100%", latency: "N/A" },
  },
];

// Compatibilidade · keep old exports pra evitar breaking
export type SkillNode = ArchitectureNode;
export const SKILL_NODES = ARCHITECTURE_NODES;
export const SKILL_EDGES: [string, string][] = [];

export const CLUSTER_COLORS = {
  frontend: { primary: "#06b6d4", emissive: "#22d3ee" },
  backend: { primary: "#10b981", emissive: "#34d399" },
  databases: { primary: "#f97316", emissive: "#fbbf24" },
  devops: { primary: "#10b981", emissive: "#6ee7b7" },
} as const;
