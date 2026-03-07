"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Server,
  Wrench,
  Zap,
  Briefcase,
  Award,
  TrendingUp
} from "lucide-react";
import { useEffect, useState } from "react";
import { SkillsBackground, SkillsBackgroundLight } from "../ui/SkillsBackground";

// Tech icons as SVG components for better quality
const TechIcons: Record<string, React.FC<{ className?: string }>> = {
  react: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 13.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"/>
      <path d="M12 21.35c-1.17 0-2.3-.08-3.35-.24-1.97-.3-3.56-.88-4.6-1.68-.52-.4-.93-.85-1.22-1.35-.29-.5-.45-1.05-.45-1.58 0-.53.16-1.08.45-1.58.29-.5.7-.95 1.22-1.35.26-.2.55-.39.87-.56-.32-.17-.61-.36-.87-.56-.52-.4-.93-.85-1.22-1.35-.29-.5-.45-1.05-.45-1.58 0-.53.16-1.08.45-1.58.29-.5.7-.95 1.22-1.35 1.04-.8 2.63-1.38 4.6-1.68 1.05-.16 2.18-.24 3.35-.24s2.3.08 3.35.24c1.97.3 3.56.88 4.6 1.68.52.4.93.85 1.22 1.35.29.5.45 1.05.45 1.58 0 .53-.16 1.08-.45 1.58-.29.5-.7.95-1.22 1.35-.26.2-.55.39-.87.56.32.17.61.36.87.56.52.4.93.85 1.22 1.35.29.5.45 1.05.45 1.58 0 .53-.16 1.08-.45 1.58-.29.5-.7.95-1.22 1.35-1.04.8-2.63 1.38-4.6 1.68-1.05.16-2.18.24-3.35.24Zm0-1.5c2.97 0 5.65-.45 7.18-1.63.38-.29.65-.6.82-.93.17-.33.25-.67.25-1.04 0-.37-.08-.71-.25-1.04-.17-.33-.44-.64-.82-.93-.35-.27-.78-.52-1.28-.73.5-.21.93-.46 1.28-.73.38-.29.65-.6.82-.93.17-.33.25-.67.25-1.04 0-.37-.08-.71-.25-1.04-.17-.33-.44-.64-.82-.93-1.53-1.18-4.21-1.63-7.18-1.63s-5.65.45-7.18 1.63c-.38.29-.65.6-.82.93-.17.33-.25.67-.25 1.04 0 .37.08.71.25 1.04.17.33.44.64.82.93.35.27.78.52 1.28.73-.5.21-.93.46-1.28.73-.38.29-.65.6-.82.93-.17.33-.25.67-.25 1.04 0 .37.08.71.25 1.04.17.33.44.64.82.93 1.53 1.18 4.21 1.63 7.18 1.63Z"/>
    </svg>
  ),
  typescript: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 3h18v18H3V3Zm10.71 14.86c.5.98 1.51 1.73 3.09 1.73 1.6 0 2.8-.83 2.8-2.36 0-1.41-.81-2.04-2.25-2.66l-.42-.18c-.73-.31-1.04-.52-1.04-1.02 0-.41.31-.73.81-.73.49 0 .8.21 1.09.73l1.31-.84c-.55-.98-1.32-1.35-2.4-1.35-1.51 0-2.48.96-2.48 2.23 0 1.38.81 2.03 2.03 2.55l.42.18c.78.34 1.24.55 1.24 1.13 0 .49-.45.84-1.15.84-.83 0-1.31-.43-1.67-1.03l-1.38.8ZM14 11.02V9.5H8v1.52h2.04v6.95h1.93v-6.95H14Z"/>
    </svg>
  ),
  javascript: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 3h18v18H3V3Zm4.73 15.04c.4.85 1.17 1.55 2.53 1.55 1.5 0 2.53-.77 2.53-2.42v-5.47H11v5.39c0 .8-.33 1.01-.85 1.01-.52 0-.75-.35-.99-.76l-1.43.7Zm6.11-.04c.5.98 1.51 1.6 3.09 1.6 1.6 0 2.8-.83 2.8-2.36 0-1.41-.81-2.04-2.25-2.66l-.42-.18c-.73-.31-1.04-.52-1.04-1.02 0-.41.31-.73.81-.73.49 0 .8.21 1.09.73l1.31-.84c-.55-.98-1.32-1.35-2.4-1.35-1.51 0-2.48.96-2.48 2.23 0 1.38.81 2.03 2.03 2.55l.42.18c.78.34 1.24.55 1.24 1.13 0 .49-.45.84-1.15.84-.83 0-1.31-.43-1.67-1.03l-1.38.73Z"/>
    </svg>
  ),
  nodejs: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21.985c-.275 0-.532-.074-.772-.202l-2.439-1.448c-.365-.203-.182-.277-.072-.314.496-.165.588-.201 1.101-.493.056-.027.129-.018.185.018l1.87 1.112c.074.037.166.037.221 0l7.319-4.237c.074-.036.11-.11.11-.184V7.768c0-.092-.036-.166-.11-.203l-7.319-4.219c-.073-.037-.166-.037-.221 0L4.552 7.565c-.073.037-.11.128-.11.203v8.468c0 .073.037.147.11.184l2.01 1.157c1.083.548 1.762-.092 1.762-.735V8.502c0-.11.091-.202.202-.202h.883c.11 0 .202.092.202.202v8.34c0 1.448-.789 2.294-2.164 2.294-.422 0-.752 0-1.688-.46l-1.925-1.103a1.55 1.55 0 0 1-.771-1.34V7.768c0-.55.293-1.064.771-1.339l7.316-4.237a1.637 1.637 0 0 1 1.544 0l7.317 4.237c.479.274.771.789.771 1.339v8.468c0 .55-.293 1.064-.771 1.34l-7.317 4.236c-.241.11-.516.165-.773.165v.018Z"/>
    </svg>
  ),
  tailwind: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8Zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12Z"/>
    </svg>
  ),
  html: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="m12 17.56 4.07-1.13.55-6.1H9.38L9.2 8.3h7.6l.2-2.03H6.99l.56 6.01h6.89l-.23 2.58-2.21.6-2.22-.6-.14-1.66H7.6l.29 3.19L12 17.56ZM4.07 3h15.86L18.5 19.2 12 21l-6.5-1.8L4.07 3Z"/>
    </svg>
  ),
  nextjs: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm-1.5 14.5v-5.29l4.5 6.79c-.88.39-1.85.6-2.89.6-3.03 0-5.6-1.8-6.78-4.39l5.17-7.21v5.5h-1.5v4Zm5.5-2.28V9h1.5v5.22c-.47.78-1.01 1.51-1.5 2Z"/>
    </svg>
  ),
  postgresql: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.128 0a10.134 10.134 0 0 0-2.755.403l-.063.02a10.922 10.922 0 0 0-1.626.628c-.48-.02-.97-.03-1.468-.02C9.15 1.08 7.384 1.67 5.983 2.71c-.2-.04-.39-.08-.6-.11C3.15 2.2 1.79 3.03.97 4.2c-.48.69-.7 1.51-.65 2.39.02.3.07.6.14.89.2.87.6 1.8 1.15 2.63.17.28.37.55.58.8.72.89 1.57 1.49 2.47 1.75-.06.39-.1.79-.11 1.19-.02.8.08 1.58.28 2.32-.4.37-.76.79-1.06 1.26-.5.8-.72 1.7-.55 2.54.24 1.26 1.08 2.26 2.42 2.82.8.33 1.72.52 2.7.55.2 0 .4 0 .6-.02-.26.4-.5.82-.7 1.25l.92.4c.23-.5.5-.98.82-1.43.24-.07.49-.15.73-.24 1.2-.45 2.28-1.1 3.13-1.92.07-.07.14-.14.2-.22.22.19.44.37.66.54.8.57 1.63.98 2.47 1.2.59.15 1.19.22 1.78.2 2.03-.04 3.5-1.17 3.85-2.86.02-.1.03-.2.04-.3.08-.63-.05-1.28-.37-1.9-.12-.24-.27-.47-.44-.69.8-.8 1.37-1.64 1.66-2.46.2-.57.28-1.13.24-1.65-.04-.4-.14-.77-.3-1.12.2-.34.37-.69.52-1.05.34-.83.53-1.68.54-2.55.02-.94-.2-1.95-.78-2.88-.62-.98-1.5-1.54-2.6-1.64-.12-.01-.25-.01-.37-.01-.2 0-.4.02-.6.05-.03 0-.06 0-.09.02-.1-1.1-.52-2.07-1.23-2.77-.54-.53-1.22-.94-2.02-1.2C19.69.33 18.43 0 17.13 0h-.002Z"/>
    </svg>
  ),
  mongodb: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm-.724 16.684c-.161-.358-.34-.836-.34-.836s-.041 2.131-1.227 2.131c-.162 0-.284-.066-.284-.284V18.52c-.612-.122-.924-.366-1.156-.814-.218-.42-.284-.944-.284-1.468 0-.798.204-1.486.67-2.052.466-.566 1.098-.85 1.896-.85.798 0 1.43.284 1.896.85.466.566.67 1.254.67 2.052 0 .524-.066 1.048-.284 1.468-.232.448-.544.692-1.156.814v1.175c0 .218-.122.284-.284.284-.187 0-.327-.095-.427-.295h.01Zm.026-5.206c-.57 0-1.04.466-1.04 1.04 0 .575.47 1.041 1.04 1.041.575 0 1.041-.466 1.041-1.04 0-.575-.466-1.04-1.04-1.04Z"/>
    </svg>
  ),
  git: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.546 10.93 13.067.452a1.55 1.55 0 0 0-2.188 0L8.708 2.627l2.76 2.76a1.838 1.838 0 0 1 2.327 2.341l2.658 2.66a1.838 1.838 0 0 1 1.9 3.039 1.837 1.837 0 0 1-2.6 0 1.846 1.846 0 0 1-.404-1.996L12.86 8.955v6.525a1.844 1.844 0 0 1 .486 2.876 1.834 1.834 0 1 1-2.122-2.976V8.829a1.843 1.843 0 0 1-.996-2.41L7.454 3.654.453 10.654a1.546 1.546 0 0 0 0 2.188l10.48 10.477a1.545 1.545 0 0 0 2.186 0l10.427-10.202a1.545 1.545 0 0 0 0-2.187Z"/>
    </svg>
  ),
  docker: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185Zm-2.954-5.43h2.118a.186.186 0 0 0 .186-.186V3.574a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.186Zm0 2.716h2.118a.187.187 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.887c0 .102.082.185.185.186Zm-2.93 0h2.12a.186.186 0 0 0 .184-.186V6.29a.185.185 0 0 0-.185-.185H8.1a.185.185 0 0 0-.185.185v1.887c0 .102.083.185.185.186Zm-2.964 0h2.119a.186.186 0 0 0 .185-.186V6.29a.185.185 0 0 0-.185-.185H5.136a.186.186 0 0 0-.186.185v1.887c0 .102.084.185.186.186Zm5.893 2.715h2.118a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185Zm-2.93 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.083.185.185.185Zm-2.964 0h2.119a.185.185 0 0 0 .185-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.186.186 0 0 0-.186.186v1.887c0 .102.084.185.186.185Zm-2.92 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.082.185.185.185Zm10.171 2.715h2.118a.185.185 0 0 0 .186-.185v-1.888a.185.185 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185Zm-13.108-.62c.254 0 .46.176.46.394 0 .217-.206.393-.46.393-.254 0-.46-.176-.46-.393 0-.218.206-.394.46-.394Zm15.65-1.68c-.93-1.62-2.29-2.22-4.09-2.22h-.26c-.15-.45-.57-.76-1.06-.76H7.83c-.54 0-.99.38-1.1.89l-.79 4.09c-.2 1.06.1 2.15.8 2.96a3.88 3.88 0 0 0 2.86 1.41h7.71c1.12 0 2.11-.51 2.78-1.43.67-.92.9-2.07.63-3.22l-.15-.69c1.17-.4 2.04-1.25 2.39-2.35.08-.23.12-.47.14-.68Z"/>
    </svg>
  ),
  vercel: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 22.525H0l12-21.05 12 21.05Z"/>
    </svg>
  ),
  figma: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491ZM12.735 7.51h3.117a3.007 3.007 0 0 0 0-6.014h-3.117v6.014Zm0 1.471H8.148a4.49 4.49 0 0 1-4.49-4.49A4.49 4.49 0 0 1 8.148 0h4.587v8.981Zm-4.587-7.51a3.007 3.007 0 0 0 0 6.014h3.117V1.471H8.148Zm4.587 15.019H8.148a4.49 4.49 0 0 1-4.49-4.49 4.49 4.49 0 0 1 4.49-4.49h4.587v8.98ZM8.148 8.981a3.007 3.007 0 0 0 0 6.014h3.117V8.981H8.148Zm0 7.49a4.49 4.49 0 0 0 4.49 4.49v-8.98a4.49 4.49 0 0 0-4.49 4.49Zm4.49 3.019a3.007 3.007 0 1 1 0-6.014 3.007 3.007 0 0 1 0 6.014Zm4.587-7.51h-4.588v-8.98h4.588a4.49 4.49 0 0 1 0 8.98Z"/>
    </svg>
  ),
  prisma: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="m21.807 18.285-8.397-15.98a1.414 1.414 0 0 0-1.286-.782 1.415 1.415 0 0 0-1.199.782L2.227 18.285a1.42 1.42 0 0 0 .09 1.396 1.415 1.415 0 0 0 1.196.651h17.97c.488 0 .94-.253 1.197-.65a1.42 1.42 0 0 0 .09-1.397h.037Zm-9.684-1.76v-7.93l5.316 7.93h-5.316Z"/>
    </svg>
  ),
  vscode: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.15 2.587 18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352Zm-5.146 14.861L10.826 12l7.178-5.448v10.896Z"/>
    </svg>
  ),
  api: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.5 3.5a2 2 0 1 1 4 0 2 2 0 0 1-4 0ZM13 7.5V18a1.5 1.5 0 0 0 3 0V7.5a1.5 1.5 0 0 0-3 0ZM6.5 3.5a2 2 0 1 1 4 0 2 2 0 0 1-4 0ZM6 7.5V18a1.5 1.5 0 0 0 3 0V7.5a1.5 1.5 0 0 0-3 0Z"/>
    </svg>
  ),
  windsurf: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>
  ),
  claude: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
    </svg>
  ),
};

// Skill categories with icons
const skillCategories = [
  {
    title: "Frontend",
    icon: Code2,
    description: "Interfaces modernas e responsivas",
    skills: [
      { name: "React", icon: "react", level: "advanced" as const },
      { name: "Next.js", icon: "nextjs", level: "advanced" as const },
      { name: "TypeScript", icon: "typescript", level: "advanced" as const },
      { name: "JavaScript", icon: "javascript", level: "advanced" as const },
      { name: "Tailwind CSS", icon: "tailwind", level: "expert" as const },
      { name: "HTML/CSS", icon: "html", level: "expert" as const },
    ],
  },
  {
    title: "Backend",
    icon: Server,
    description: "APIs robustas e escaláveis",
    skills: [
      { name: "Node.js", icon: "nodejs", level: "intermediate" as const },
      { name: "APIs REST", icon: "api", level: "advanced" as const },
      { name: "PostgreSQL", icon: "postgresql", level: "intermediate" as const },
      { name: "MongoDB", icon: "mongodb", level: "intermediate" as const },
      { name: "Prisma", icon: "prisma", level: "intermediate" as const },
      { name: "Next.js API", icon: "nextjs", level: "advanced" as const },
    ],
  },
  {
    title: "DevOps & Tools",
    icon: Wrench,
    description: "Ferramentas e workflows modernos",
    skills: [
      { name: "Git/GitHub", icon: "git", level: "advanced" as const },
      { name: "Vercel", icon: "vercel", level: "advanced" as const },
      { name: "Docker", icon: "docker", level: "learning" as const },
      { name: "VS Code", icon: "vscode", level: "expert" as const },
      { name: "Windsurf", icon: "windsurf", level: "advanced" as const },
      { name: "Figma", icon: "figma", level: "intermediate" as const },
    ],
  },
];

// Stats data
const stats = [
  { icon: Briefcase, value: "10+", label: "Projetos Entregues" },
  { icon: Award, value: "15+", label: "Tecnologias Dominadas" },
  { icon: TrendingUp, value: "2+", label: "Anos de Experiência" },
  { icon: Zap, value: "100%", label: "Dedicação" },
];

type SkillLevel = "learning" | "intermediate" | "advanced" | "expert";

const levelConfig: Record<SkillLevel, { label: string; color: string; bgColor: string }> = {
  learning: {
    label: "Aprendendo",
    color: "text-amber-400",
    bgColor: "bg-amber-500/20 border-amber-500/30"
  },
  intermediate: {
    label: "Intermediário",
    color: "text-blue-400",
    bgColor: "bg-blue-500/20 border-blue-500/30"
  },
  advanced: {
    label: "Avançado",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/20 border-emerald-500/30"
  },
  expert: {
    label: "Expert",
    color: "text-violet-400",
    bgColor: "bg-violet-500/20 border-violet-500/30"
  },
};

function SkillBadge({
  name,
  icon,
  level,
  delay
}: {
  name: string;
  icon: string;
  level: SkillLevel;
  delay: number;
}) {
  const IconComponent = TechIcons[icon];
  const config = levelConfig[level];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.03, y: -2 }}
      className="group"
    >
      <div className={`
        skill-badge relative flex items-center gap-2.5 px-3 py-2.5 rounded-xl
        border transition-all duration-300 cursor-default h-full
        ${config.bgColor}
        hover:shadow-lg hover:shadow-indigo-500/10
      `}>
        {/* Icon */}
        <div className="skill-badge-icon w-7 h-7 flex-shrink-0 flex items-center justify-center rounded-lg bg-white/10 transition-all duration-300">
          {IconComponent && (
            <IconComponent className={`w-4 h-4 ${config.color}`} />
          )}
        </div>

        {/* Name */}
        <span className="skill-badge-name font-medium text-xs leading-tight">
          {name}
        </span>

        {/* Level indicator dot */}
        <div className={`absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full ${config.color.replace('text-', 'bg-')} opacity-60`} />
      </div>
    </motion.div>
  );
}

function StatCard({
  icon: Icon,
  value,
  label,
  delay
}: {
  icon: React.FC<{ className?: string }>;
  value: string;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="stat-card relative p-6 rounded-2xl text-center group"
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        <div className="stat-icon-container w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center">
          <Icon className="w-7 h-7 text-indigo-400" />
        </div>
        <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">
          {value}
        </div>
        <div className="stat-label text-sm font-medium">
          {label}
        </div>
      </div>
    </motion.div>
  );
}

export function Skills() {
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsLightMode(document.documentElement.classList.contains("light-mode"));
    };
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      {isLightMode ? <SkillsBackgroundLight /> : <SkillsBackground />}

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
            Minhas <span className="gradient-text">Habilidades</span>
          </h2>
          <p className="skills-subtitle max-w-2xl mx-auto">
            Tecnologias que uso para criar produtos digitais de alta qualidade. Sempre pronto para expandir o stack conforme as necessidades do time
          </p>
        </motion.div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              delay={0.1 + index * 0.1}
            />
          ))}
        </motion.div>

        {/* Skills categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="skill-category-card relative p-6 md:p-8 rounded-2xl h-full"
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

              {/* Category header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="skill-category-icon w-12 h-12 rounded-xl flex items-center justify-center">
                  <category.icon className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <h3 className="skill-category-title text-xl font-semibold">
                    {category.title}
                  </h3>
                  <p className="skill-category-description text-sm">
                    {category.description}
                  </p>
                </div>
              </div>

              {/* Skills badges */}
              <div className="grid grid-cols-2 gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <SkillBadge
                    key={skill.name}
                    name={skill.name}
                    icon={skill.icon}
                    level={skill.level}
                    delay={categoryIndex * 0.1 + skillIndex * 0.05}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Currently learning section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="learning-badge inline-flex items-center gap-4 px-8 py-4 rounded-full">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-pulse" />
            <span className="learning-text text-base font-medium">
              Acelerando projetos com:{" "}
              <span className="gradient-text text-lg font-semibold">
                IA para Desenvolvimento, Code Review e Automação
              </span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
