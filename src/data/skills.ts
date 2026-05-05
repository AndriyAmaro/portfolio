import type { SkillCategory } from "@/types";

// Domínios de Engenharia · senior framing
// Cada domínio descreve UMA capacidade técnica, com stack como evidência.
export const skillCategories: SkillCategory[] = [
  {
    title: "System Architecture",
    skills: [
      { name: "Node.js / Express", icon: "nodejs", level: "advanced", percentage: 90 },
      { name: "TypeScript", icon: "typescript", level: "expert", percentage: 95 },
      { name: "Prisma ORM", icon: "prisma", level: "advanced", percentage: 90 },
      { name: "PostgreSQL", icon: "postgresql", level: "advanced", percentage: 85 },
      { name: "Redis / BullMQ", icon: "redis", level: "advanced", percentage: 80 },
      { name: "Hono", icon: "hono", level: "advanced", percentage: 80 },
      { name: "Zod", icon: "zod", level: "advanced", percentage: 90 },
      { name: "REST APIs", icon: "api", level: "expert", percentage: 95 },
    ],
  },
  {
    title: "Frontend Engineering",
    skills: [
      { name: "Next.js 16", icon: "react", level: "expert", percentage: 95 },
      { name: "React 19", icon: "react", level: "expert", percentage: 95 },
      { name: "Tailwind CSS", icon: "tailwind", level: "expert", percentage: 95 },
      { name: "Framer Motion", icon: "framermotion", level: "advanced", percentage: 90 },
      { name: "Radix UI", icon: "radixui", level: "advanced", percentage: 85 },
      { name: "Zustand", icon: "zustand", level: "advanced", percentage: 80 },
      { name: "JavaScript", icon: "javascript", level: "expert", percentage: 95 },
      { name: "HTML / CSS", icon: "html", level: "expert", percentage: 95 },
    ],
  },
  {
    title: "AI Systems",
    skills: [
      { name: "Claude API", icon: "api", level: "advanced", percentage: 90 },
      { name: "OpenAI SDK", icon: "api", level: "advanced", percentage: 85 },
      { name: "Multi-provider Gateway", icon: "api", level: "advanced", percentage: 90 },
      { name: "pgvector", icon: "postgresql", level: "advanced", percentage: 80 },
      { name: "Prompt Engineering", icon: "framermotion", level: "advanced", percentage: 85 },
      { name: "Anti-hallucination", icon: "zod", level: "advanced", percentage: 85 },
      { name: "ElevenLabs / HeyGen", icon: "api", level: "advanced", percentage: 80 },
      { name: "Wan / Qwen / DeepSeek", icon: "api", level: "advanced", percentage: 80 },
    ],
  },
  {
    title: "DevOps & Quality",
    skills: [
      { name: "Docker", icon: "docker", level: "advanced", percentage: 80 },
      { name: "Cloudflare Workers", icon: "vercel", level: "advanced", percentage: 85 },
      { name: "Railway", icon: "vercel", level: "advanced", percentage: 90 },
      { name: "Git / GitHub", icon: "git", level: "expert", percentage: 95 },
      { name: "GitHub Actions", icon: "githubactions", level: "advanced", percentage: 80 },
      { name: "Turborepo", icon: "turborepo", level: "advanced", percentage: 80 },
      { name: "Vitest / Playwright", icon: "testing", level: "advanced", percentage: 85 },
      { name: "Socket.io", icon: "socketio", level: "advanced", percentage: 80 },
    ],
  },
];
