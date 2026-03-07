import type { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    skills: [
      { name: "React / Next.js", icon: "react", level: "advanced", percentage: 90 },
      { name: "TypeScript", icon: "typescript", level: "advanced", percentage: 90 },
      { name: "Tailwind CSS", icon: "tailwind", level: "expert", percentage: 95 },
      { name: "HTML / CSS", icon: "html", level: "expert", percentage: 95 },
      { name: "JavaScript", icon: "javascript", level: "advanced", percentage: 90 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js / Express", icon: "nodejs", level: "advanced", percentage: 85 },
      { name: "APIs REST", icon: "api", level: "advanced", percentage: 90 },
      { name: "PostgreSQL", icon: "postgresql", level: "advanced", percentage: 80 },
      { name: "Prisma ORM", icon: "prisma", level: "advanced", percentage: 85 },
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
    ],
  },
];
