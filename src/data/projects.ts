import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "pulse-design-system",
    title: "Pulse Design System",
    description:
      "Design system completo com 100+ componentes, 56 paginas e suporte i18n em 3 idiomas. A fundacao que alimenta todo o ecossistema Pulse.",
    longDescription:
      "Sistema de design production-grade construido do zero seguindo Atomic Design. Inclui 25 variantes de dashboard, animacoes SVG customizadas, dark/light mode e suporte completo a acessibilidade com Radix UI.",
    image: "/projects/pulse-design-system.png",
    technologies: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "Radix UI",
      "next-intl",
    ],
    liveUrl: "https://pulse-saas-theme.andrifullstack.workers.dev",
    githubUrl: "https://github.com/AndriyAmaro/pulse-saas-theme",
    problem:
      "Falta de consistencia visual entre projetos e componentes repetidos em cada novo app.",
    solution:
      "Um design system unificado com tokens, primitivos e padroes reutilizaveis que alimenta multiplos SaaS.",
    challenges: [
      "Criar 100+ componentes mantendo consistencia visual",
      "Implementar i18n com pathname-based routing em 3 idiomas",
      "Animacoes SVG performaticas sem JS runtime",
    ],
    featured: true,
  },
  {
    id: "pulse-chat",
    title: "Pulse Chat",
    description:
      "Plataforma de mensagens real-time com voice messages, reacoes, rooms e sistema de amizades. 98 testes automatizados.",
    longDescription:
      "Chat full-stack com WebSocket, 32 eventos tipados, queue de mensagens offline com retry exponencial, e 40+ componentes do Pulse Design System.",
    image: "/projects/pulse-chat.png",
    technologies: [
      "React 19",
      "Express 5",
      "Socket.io",
      "Prisma 7",
      "PostgreSQL",
      "Docker",
    ],
    liveUrl: "https://realtime-chat-eight-beryl.vercel.app",
    githubUrl: "https://github.com/AndriyAmaro/realtime-chat",
    problem:
      "Construir algo que vai alem de CRUD · comunicacao real-time com estado concorrente.",
    solution:
      "Arquitetura event-driven com 3-layer backend, type safety end-to-end e resiliencia com reconnection sync.",
    challenges: [
      "Gerenciar estado concorrente com multiplos usuarios",
      "Implementar queue offline com exponential backoff",
      "Adaptar 40+ componentes de Next.js para React/Vite",
    ],
    featured: true,
  },
  {
    id: "pulse-finance",
    title: "Pulse Finance",
    description:
      "Dashboard financeiro multi-tenant com transacoes, analytics e importacao CSV. 143 testes automatizados.",
    longDescription:
      "SaaS financeiro com Clean Architecture, API Hono type-safe, cache Redis, background jobs com BullMQ e isolamento multi-tenant.",
    image: "/projects/pulse-finance.png",
    technologies: [
      "Next.js 15",
      "Hono 4",
      "Prisma 6",
      "PostgreSQL",
      "Redis",
      "BullMQ",
    ],
    liveUrl: "https://dashboard-finance.andrifullstack.workers.dev",
    githubUrl: "https://github.com/AndriyAmaro/finance-flow",
    problem:
      "Demonstrar arquitetura production-ready com multi-tenancy, cache e background jobs.",
    solution:
      "Clean Architecture com camadas bem definidas, Redis para cache, BullMQ para processamento assincrono.",
    challenges: [
      "Implementar multi-tenancy com isolamento por tenant",
      "Cache invalidation strategy com Redis",
      "Importacao CSV com processamento em background",
    ],
    featured: true,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
