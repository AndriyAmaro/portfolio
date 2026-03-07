import type { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    skills: [
      { name: "React / Next.js", icon: "react", level: "expert", percentage: 95 },
      { name: "TypeScript", icon: "typescript", level: "advanced", percentage: 90 },
      { name: "Tailwind CSS", icon: "tailwind", level: "expert", percentage: 95 },
      { name: "Framer Motion", icon: "framermotion", level: "advanced", percentage: 85 },
      { name: "JavaScript", icon: "javascript", level: "advanced", percentage: 90 },
      { name: "HTML / CSS", icon: "html", level: "expert", percentage: 95 },
      { name: "Radix UI", icon: "radixui", level: "advanced", percentage: 80 },
      { name: "Zustand", icon: "zustand", level: "intermediate", percentage: 70 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js / Express", icon: "nodejs", level: "advanced", percentage: 85 },
      { name: "APIs REST", icon: "api", level: "advanced", percentage: 90 },
      { name: "PostgreSQL", icon: "postgresql", level: "advanced", percentage: 80 },
      { name: "Prisma ORM", icon: "prisma", level: "advanced", percentage: 85 },
      { name: "Hono", icon: "hono", level: "advanced", percentage: 80 },
      { name: "Zod", icon: "zod", level: "advanced", percentage: 85 },
      { name: "Redis / BullMQ", icon: "redis", level: "intermediate", percentage: 65 },
    ],
  },
  {
    title: "DevOps e Ferramentas",
    skills: [
      { name: "Git / GitHub", icon: "git", level: "advanced", percentage: 90 },
      { name: "Docker", icon: "docker", level: "intermediate", percentage: 60 },
      { name: "Vercel / Railway", icon: "vercel", level: "advanced", percentage: 85 },
      { name: "Vitest / Testing", icon: "testing", level: "advanced", percentage: 80 },
      { name: "Socket.io", icon: "socketio", level: "advanced", percentage: 80 },
      { name: "GitHub Actions", icon: "githubactions", level: "intermediate", percentage: 70 },
      { name: "Turborepo", icon: "turborepo", level: "intermediate", percentage: 65 },
    ],
  },
];
