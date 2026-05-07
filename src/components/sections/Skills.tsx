"use client";

import { motion, useInView } from "framer-motion";
import {
  Code2,
  Server,
  Wrench,
  FlaskConical,
  Layers,
  AppWindow,
  Brain,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { skillCategories as importedSkills } from "@/data/skills";
import { CodeSnippetsCarousel } from "./About";

// ---------------------------------------------------------------------------
// SVG Tech Icons
// ---------------------------------------------------------------------------
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
  postgresql: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.128 0a10.134 10.134 0 0 0-2.755.403l-.063.02a10.922 10.922 0 0 0-1.626.628c-.48-.02-.97-.03-1.468-.02C9.15 1.08 7.384 1.67 5.983 2.71c-.2-.04-.39-.08-.6-.11C3.15 2.2 1.79 3.03.97 4.2c-.48.69-.7 1.51-.65 2.39.02.3.07.6.14.89.2.87.6 1.8 1.15 2.63.17.28.37.55.58.8.72.89 1.57 1.49 2.47 1.75-.06.39-.1.79-.11 1.19-.02.8.08 1.58.28 2.32-.4.37-.76.79-1.06 1.26-.5.8-.72 1.7-.55 2.54.24 1.26 1.08 2.26 2.42 2.82.8.33 1.72.52 2.7.55.2 0 .4 0 .6-.02-.26.4-.5.82-.7 1.25l.92.4c.23-.5.5-.98.82-1.43.24-.07.49-.15.73-.24 1.2-.45 2.28-1.1 3.13-1.92.07-.07.14-.14.2-.22.22.19.44.37.66.54.8.57 1.63.98 2.47 1.2.59.15 1.19.22 1.78.2 2.03-.04 3.5-1.17 3.85-2.86.02-.1.03-.2.04-.3.08-.63-.05-1.28-.37-1.9-.12-.24-.27-.47-.44-.69.8-.8 1.37-1.64 1.66-2.46.2-.57.28-1.13.24-1.65-.04-.4-.14-.77-.3-1.12.2-.34.37-.69.52-1.05.34-.83.53-1.68.54-2.55.02-.94-.2-1.95-.78-2.88-.62-.98-1.5-1.54-2.6-1.64-.12-.01-.25-.01-.37-.01-.2 0-.4.02-.6.05-.03 0-.06 0-.09.02-.1-1.1-.52-2.07-1.23-2.77-.54-.53-1.22-.94-2.02-1.2C19.69.33 18.43 0 17.13 0h-.002Z"/>
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
  prisma: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="m21.807 18.285-8.397-15.98a1.414 1.414 0 0 0-1.286-.782 1.415 1.415 0 0 0-1.199.782L2.227 18.285a1.42 1.42 0 0 0 .09 1.396 1.415 1.415 0 0 0 1.196.651h17.97c.488 0 .94-.253 1.197-.65a1.42 1.42 0 0 0 .09-1.397h.037Zm-9.684-1.76v-7.93l5.316 7.93h-5.316Z"/>
    </svg>
  ),
  api: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.5 3.5a2 2 0 1 1 4 0 2 2 0 0 1-4 0ZM13 7.5V18a1.5 1.5 0 0 0 3 0V7.5a1.5 1.5 0 0 0-3 0ZM6.5 3.5a2 2 0 1 1 4 0 2 2 0 0 1-4 0ZM6 7.5V18a1.5 1.5 0 0 0 3 0V7.5a1.5 1.5 0 0 0-3 0Z"/>
    </svg>
  ),
  redis: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M10.5 2.661l.54.997-1.797.644 2.409.218.748 1.246.467-1.135 2.025-.22-1.535-.66.604-1.14-1.467.704-.993-.654zm-3.76 2.268L12 7.11l5.26-2.181L12 2.748 6.74 4.929zM3 14.07V9.4l9 3.562 9-3.562v4.67l-9 3.562-3-1.188v-2.29l3 1.188 5.998-2.374V11.2L12 13.574l-5.998-2.375v2.296L3 14.683v-.613zm0 2.221l9 3.562 9-3.562v1.725l-9 3.562-9-3.562V16.29z"/>
    </svg>
  ),
  testing: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 2v2h1v14a4 4 0 0 0 8 0V4h1V2H7zm4 16a2 2 0 1 1 2-2v-4.05a2.5 2.5 0 0 0 0-4.9V4h-2v3.05a2.5 2.5 0 0 0 0 4.9V16a2 2 0 0 1-2 2h2z"/>
    </svg>
  ),
  socketio: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
    </svg>
  ),
  framermotion: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z"/>
    </svg>
  ),
  radixui: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a5 5 0 0 1 0 10v10h-2V12H8a5 5 0 0 1 0-10h4Zm0 2H8a3 3 0 0 0 0 6h4V4Z"/>
    </svg>
  ),
  zustand: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm-2 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm4 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm-2-6a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"/>
    </svg>
  ),
  hono: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2c-1.4 3-5.6 5-7 10 0 0-.2 1.8.8 3.6C7.2 18.2 9.4 20 12 22c2.6-2 4.8-3.8 6.2-6.4 1-1.8.8-3.6.8-3.6-1.4-5-5.6-7-7-10Z"/>
    </svg>
  ),
  zod: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.77 2 4 12l2.5 2.5L13.77 7v5.5L22 4.77V2h-8.23ZM10.23 22 20 12l-2.5-2.5-7.27 7.5V11.5L2 19.23V22h8.23Z"/>
    </svg>
  ),
  githubactions: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M10.984 13.836a.5.5 0 0 1-.353-.146l-.745-.743a.5.5 0 1 1 .706-.708l.392.391 1.181-1.18a.5.5 0 0 1 .708.707l-1.535 1.533a.5.5 0 0 1-.354.146Zm-2.192-3.15a3 3 0 1 0 4.346 0l1.406-2.907a.5.5 0 0 0-.078-.554 5.998 5.998 0 0 0-6.88 0 .5.5 0 0 0-.079.554l1.285 2.907ZM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm0 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16Z"/>
    </svg>
  ),
  turborepo: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm0 4a6 6 0 1 1 0 12 6 6 0 0 1 0-12Zm0 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0 1.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"/>
    </svg>
  ),
};

// ---------------------------------------------------------------------------
// Category accent colors
// ---------------------------------------------------------------------------
const categoryAccents: Record<string, {
  gradient: string;
  iconBg: string;
  barColor: string;
  lightGradient: string;
  lightIconBg: string;
}> = {
  "System Architecture": {
    gradient: "from-emerald-500/20 via-emerald-500/5 to-transparent",
    iconBg: "from-emerald-500 to-teal-600",
    barColor: "from-emerald-500 to-teal-500",
    lightGradient: "from-emerald-500/10 via-emerald-500/5 to-transparent",
    lightIconBg: "from-emerald-500 to-teal-600",
  },
  "Frontend Engineering": {
    gradient: "from-indigo-500/20 via-indigo-500/5 to-transparent",
    iconBg: "from-indigo-500 to-violet-600",
    barColor: "from-indigo-500 to-violet-500",
    lightGradient: "from-indigo-500/10 via-indigo-500/5 to-transparent",
    lightIconBg: "from-indigo-500 to-violet-600",
  },
  "AI Systems": {
    gradient: "from-fuchsia-500/20 via-fuchsia-500/5 to-transparent",
    iconBg: "from-fuchsia-500 to-pink-600",
    barColor: "from-fuchsia-500 to-pink-500",
    lightGradient: "from-fuchsia-500/10 via-fuchsia-500/5 to-transparent",
    lightIconBg: "from-fuchsia-500 to-pink-600",
  },
  "DevOps & Quality": {
    gradient: "from-cyan-500/20 via-cyan-500/5 to-transparent",
    iconBg: "from-cyan-500 to-blue-600",
    barColor: "from-cyan-500 to-blue-500",
    lightGradient: "from-cyan-500/10 via-cyan-500/5 to-transparent",
    lightIconBg: "from-cyan-500 to-blue-600",
  },
};

// Category metadata (descriptions come from translations)
const categoryMeta: Record<string, { icon: React.FC<{ className?: string }> }> = {
  "System Architecture": { icon: Server },
  "Frontend Engineering": { icon: Code2 },
  "AI Systems": { icon: Brain },
  "DevOps & Quality": { icon: Wrench },
};

// Maps from data title to translation keys
const categoryTitleKeys: Record<string, string> = {
  "System Architecture": "categories.backend",
  "Frontend Engineering": "categories.frontend",
  "AI Systems": "categories.ai",
  "DevOps & Quality": "categories.devops",
};
const categoryDescKeys: Record<string, string> = {
  "System Architecture": "categories.backendDesc",
  "Frontend Engineering": "categories.frontendDesc",
  "AI Systems": "categories.aiDesc",
  "DevOps & Quality": "categories.devopsDesc",
};

// Build skill categories from imported data
const skillCategories = importedSkills.map((cat) => ({
  title: cat.title,
  icon: categoryMeta[cat.title]?.icon ?? Code2,
  skills: cat.skills.map((s) => ({
    name: s.name,
    icon: s.icon,
    level: s.level,
    percentage: s.percentage,
  })),
}));

// Stats (labels come from translations via key) · matches Hero metrics
const stats = [
  { icon: Layers, value: 75, suffix: "MB", labelKey: "stats.docker" },
  { icon: Server, value: 50, suffix: "ms", labelKey: "stats.queryP95" },
  { icon: FlaskConical, value: 394, suffix: "", labelKey: "stats.aiTools" },
  { icon: AppWindow, value: 4, suffix: "", labelKey: "stats.apps" },
];

// ---------------------------------------------------------------------------
// Animated counter hook
// ---------------------------------------------------------------------------
function useCountUp(target: number, inView: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, inView]);

  return count;
}

// ---------------------------------------------------------------------------
// Stat Card
// ---------------------------------------------------------------------------
function StatCard({
  icon: Icon,
  value,
  suffix,
  label,
  delay,
}: {
  icon: React.FC<{ className?: string }>;
  value: number;
  suffix: string;
  label: string | React.ReactNode;
  delay: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const count = useCountUp(value, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="stat-card group relative p-5 md:p-6 rounded-2xl text-center overflow-hidden"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        <div className="stat-icon-container w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center">
          <Icon className="w-6 h-6 text-indigo-400" />
        </div>
        <div className="text-3xl md:text-4xl font-extrabold gradient-text mb-0.5 tabular-nums tracking-tight">
          {count}{suffix}
        </div>
        <div className="stat-label text-xs md:text-sm font-medium">
          {label}
        </div>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Progress bar skill row
// ---------------------------------------------------------------------------
const levelColors: Record<string, string> = {
  expert: "text-violet-400 bg-violet-500/15 border-violet-500/25",
  advanced: "text-indigo-400 bg-indigo-500/15 border-indigo-500/25",
  intermediate: "text-blue-400 bg-blue-500/15 border-blue-500/25",
  beginner: "text-amber-400 bg-amber-500/15 border-amber-500/25",
};

const levelTranslationKeys: Record<string, string> = {
  expert: "levels.expert",
  advanced: "levels.advanced",
  intermediate: "levels.intermediate",
  beginner: "levels.beginner",
};

function SkillRow({
  name,
  icon,
  level,
  levelLabel,
  barColor,
  delay,
}: {
  name: string;
  icon: string;
  level: string;
  levelLabel: string;
  barColor: string;
  delay: number;
}) {
  const IconComponent = TechIcons[icon];
  const color = levelColors[level] ?? levelColors.intermediate;

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="group flex items-center gap-3"
    >
      {/* Icon */}
      <div className="skill-row-icon w-8 h-8 flex-shrink-0 rounded-lg flex items-center justify-center bg-white/[0.06] border border-white/[0.08] group-hover:border-white/[0.15] transition-colors duration-200">
        {IconComponent && <IconComponent className="w-4 h-4 text-white/70 group-hover:text-white/90 transition-colors duration-200" />}
      </div>

      {/* Name + level badge */}
      <div className="flex-1 min-w-0 flex items-center justify-between gap-2">
        <span className="skill-row-name text-sm font-medium truncate">{name}</span>
        <span className={`skill-level-badge flex-shrink-0 px-2 py-0.5 rounded-md text-[10px] font-semibold border ${color}`}>
          {levelLabel}
        </span>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Radial burst words from title
// ---------------------------------------------------------------------------
const BURST_WORDS = [
  "React", "Next.js", "TypeScript", "Node.js", "Prisma",
  "Docker", "Tailwind", "PostgreSQL", "Redis", "Socket.io",
  "Vitest", "Zod", "Git", "Vercel", "Express",
  "CI/CD", "REST API", "Framer Motion", "Hono", "Zustand",
  "pgvector", "AI Agents", "Event-Driven", "LLM Gateway", "Multi-tenant",
  "BullMQ", "WebSocket", "JavaScript", "Cloudflare", "TanStack Query",
];

function TitleBurst() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // Pre-calculate positions radiating outward from center
  const burstItems = BURST_WORDS.map((word, i) => {
    const total = BURST_WORDS.length;
    const angle = (i / total) * Math.PI * 2 - Math.PI / 2;
    // Varying distances for organic feel
    const distance = 120 + (i % 3) * 60 + Math.sin(i * 1.7) * 40;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance * 0.6; // Compress Y for better horizontal spread
    const delay = 0.3 + (i % 5) * 0.08;
    const scale = 0.7 + (i % 3) * 0.15;

    return { word, x, y, delay, scale };
  });

  return (
    <div ref={ref} className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible" aria-hidden>
      {burstItems.map((item, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, x: 0, y: 0, scale: 0.3 }}
          animate={inView ? {
            opacity: [0, 0.6, 0],
            x: item.x,
            y: item.y,
            scale: item.scale,
          } : {}}
          transition={{
            duration: 2,
            delay: item.delay,
            ease: [0.16, 1, 0.3, 1],
            opacity: { duration: 2.2, times: [0, 0.3, 1] },
          }}
          className="absolute text-xs md:text-sm font-mono font-medium gradient-text whitespace-nowrap"
        >
          {item.word}
        </motion.span>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Skills component
// ---------------------------------------------------------------------------
export function Skills() {
  const t = useTranslations("skills");
  const tAbout = useTranslations("about");

  return (
    <section id="skills" className="relative py-24 md:py-32">
      <div className="container-custom relative z-10">
        {/* Header with radial burst */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            <span className="text-xs font-medium text-indigo-300">{t("badge")}</span>
          </motion.div>

          {/* Title with radial burst effect */}
          <div className="relative">
            <TitleBurst />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 relative z-10">
              {t("title")} <span className="gradient-text">{t("titleHighlight")}</span>
            </h2>
          </div>
          <p className="skills-subtitle max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.labelKey}
              icon={stat.icon}
              value={stat.value}
              suffix={stat.suffix}
              label={t(stat.labelKey)}
              delay={0.1 + index * 0.1}
            />
          ))}
        </div>

        {/* Category cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {skillCategories.map((category, categoryIndex) => {
            const accent = categoryAccents[category.title] ?? categoryAccents["Frontend Engineering"];
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.15 }}
                className="skill-category-card group relative rounded-2xl overflow-hidden h-full"
              >
                {/* Colored top gradient */}
                <div className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-b ${accent.gradient} pointer-events-none`} />

                {/* Top accent line */}
                <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-current to-transparent opacity-50`}
                  style={{ color: accent.barColor.includes("indigo") ? "#6366f1" : accent.barColor.includes("emerald") ? "#10b981" : "#06b6d4" }}
                />

                <div className="relative p-6 md:p-8">
                  {/* Category header */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${accent.iconBg} flex items-center justify-center shadow-lg`}
                      style={{ boxShadow: `0 8px 24px ${accent.barColor.includes("indigo") ? "rgba(99,102,241,0.3)" : accent.barColor.includes("emerald") ? "rgba(16,185,129,0.3)" : "rgba(6,182,212,0.3)"}` }}
                    >
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="skill-category-title text-lg font-bold">
                        {t(categoryTitleKeys[category.title] ?? "categories.frontend")}
                      </h3>
                      <p className="skill-category-description text-xs">
                        {t(categoryDescKeys[category.title] ?? "categories.frontendDesc")}
                      </p>
                    </div>
                    <span className="ml-auto text-xs font-bold opacity-40 tabular-nums">
                      {category.skills.length}
                    </span>
                  </div>

                  {/* Skills as progress rows */}
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <SkillRow
                        key={skill.name}
                        name={skill.name}
                        icon={skill.icon}
                        level={skill.level}
                        levelLabel={t(levelTranslationKeys[skill.level] ?? "levels.intermediate")}
                        barColor={accent.barColor}
                        delay={categoryIndex * 0.1 + skillIndex * 0.06}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Code Snippets Carousel · 7 production proofs */}
        <CodeSnippetsCarousel t={tAbout} />

        {/* AI badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="learning-badge inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4 px-6 sm:px-8 py-4 sm:py-4 rounded-2xl sm:rounded-full max-w-sm sm:max-w-none mx-auto">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-pulse hidden sm:block" />
            <span className="learning-text text-sm sm:text-base font-medium text-center sm:text-left">
              <span className="block sm:inline mb-1 sm:mb-0">{t("aiBadge.prefix")}</span>{" "}
              <span className="gradient-text text-base sm:text-lg font-semibold">
                {t("aiBadge.text")}
              </span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
