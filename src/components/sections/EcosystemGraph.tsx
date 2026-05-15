"use client";

/**
 * EcosystemGraph · Reagraph WebGL network of Andri's projects + tech stack
 *
 * Drop-in alternative to Ecosystem.tsx · uses reagraph (React + WebGL + Three.js + R3F).
 * Center node "Andri" with projects orbiting + shared tech nodes between them.
 *
 * Install: npm install reagraph (done 2026-05-15)
 * Docs: https://reagraph.dev
 */

import { useMemo, useRef } from "react";
import dynamic from "next/dynamic";

// reagraph uses WebGL/window APIs · SSR-disable
const GraphCanvas = dynamic(
  () => import("reagraph").then((m) => m.GraphCanvas),
  { ssr: false },
);

type EcoNode = {
  id: string;
  label: string;
  fill: string;
  size?: number;
  data?: { kind: "root" | "project" | "tech"; meta?: string };
};

type EcoEdge = {
  id: string;
  source: string;
  target: string;
  label?: string;
};

// === Andri's ecosystem · projects + shared tech ===
const NODES: EcoNode[] = [
  // Root
  { id: "andri", label: "Andri", fill: "#ffffff", size: 20, data: { kind: "root" } },

  // Projects (hub-spoke from root)
  { id: "sellorex",      label: "Sellorex",      fill: "#6366F1", size: 14, data: { kind: "project", meta: "Autonomous Revenue Engine · SaaS PME" } },
  { id: "pulse-ds",      label: "Pulse DS",      fill: "#8B5CF6", size: 12, data: { kind: "project", meta: "Design System monorepo" } },
  { id: "pulse-chat",    label: "Pulse Chat",    fill: "#2DD1B1", size: 12, data: { kind: "project", meta: "Real-time chat" } },
  { id: "pulse-finance", label: "Pulse Finance", fill: "#F59E0B", size: 12, data: { kind: "project", meta: "Finance dashboard" } },
  { id: "portfolio",     label: "Portfolio",     fill: "#06B6D4", size: 12, data: { kind: "project", meta: "This site" } },

  // Shared tech (cluster between projects)
  { id: "next",     label: "Next.js",      fill: "#ffffff",  size: 9, data: { kind: "tech" } },
  { id: "react",    label: "React",        fill: "#61DAFB", size: 9, data: { kind: "tech" } },
  { id: "ts",       label: "TypeScript",   fill: "#3178C6", size: 9, data: { kind: "tech" } },
  { id: "tailwind", label: "Tailwind",     fill: "#38BDF8", size: 9, data: { kind: "tech" } },
  { id: "prisma",   label: "Prisma",       fill: "#5A67D8", size: 9, data: { kind: "tech" } },
  { id: "postgres", label: "Postgres",     fill: "#4169E1", size: 9, data: { kind: "tech" } },
  { id: "redis",    label: "Redis",        fill: "#FF6E6E", size: 9, data: { kind: "tech" } },
  { id: "three",    label: "Three.js",     fill: "#ffffff",  size: 9, data: { kind: "tech" } },
  { id: "gsap",     label: "GSAP",         fill: "#88CE02", size: 9, data: { kind: "tech" } },
  { id: "claude",   label: "Claude",       fill: "#FFB454", size: 9, data: { kind: "tech" } },
  { id: "socket",   label: "Socket.io",    fill: "#ff6e8a", size: 9, data: { kind: "tech" } },
];

const EDGES: EcoEdge[] = [
  // Root → projects
  { id: "andri-sellorex",      source: "andri", target: "sellorex" },
  { id: "andri-pulse-ds",      source: "andri", target: "pulse-ds" },
  { id: "andri-pulse-chat",    source: "andri", target: "pulse-chat" },
  { id: "andri-pulse-finance", source: "andri", target: "pulse-finance" },
  { id: "andri-portfolio",     source: "andri", target: "portfolio" },

  // Project ↔ tech (shared deps emerge as cluster gravity)
  // Sellorex
  { id: "sx-next",     source: "sellorex", target: "next" },
  { id: "sx-react",    source: "sellorex", target: "react" },
  { id: "sx-ts",       source: "sellorex", target: "ts" },
  { id: "sx-tailwind", source: "sellorex", target: "tailwind" },
  { id: "sx-prisma",   source: "sellorex", target: "prisma" },
  { id: "sx-postgres", source: "sellorex", target: "postgres" },
  { id: "sx-redis",    source: "sellorex", target: "redis" },
  { id: "sx-claude",   source: "sellorex", target: "claude" },

  // Pulse DS
  { id: "pds-react",    source: "pulse-ds", target: "react" },
  { id: "pds-ts",       source: "pulse-ds", target: "ts" },
  { id: "pds-tailwind", source: "pulse-ds", target: "tailwind" },

  // Pulse Chat
  { id: "pc-react",  source: "pulse-chat", target: "react" },
  { id: "pc-next",   source: "pulse-chat", target: "next" },
  { id: "pc-ts",     source: "pulse-chat", target: "ts" },
  { id: "pc-socket", source: "pulse-chat", target: "socket" },
  { id: "pc-redis",  source: "pulse-chat", target: "redis" },

  // Pulse Finance
  { id: "pf-react",    source: "pulse-finance", target: "react" },
  { id: "pf-next",     source: "pulse-finance", target: "next" },
  { id: "pf-ts",       source: "pulse-finance", target: "ts" },
  { id: "pf-tailwind", source: "pulse-finance", target: "tailwind" },
  { id: "pf-postgres", source: "pulse-finance", target: "postgres" },

  // Portfolio
  { id: "p-next",     source: "portfolio", target: "next" },
  { id: "p-react",    source: "portfolio", target: "react" },
  { id: "p-ts",       source: "portfolio", target: "ts" },
  { id: "p-tailwind", source: "portfolio", target: "tailwind" },
  { id: "p-three",    source: "portfolio", target: "three" },
  { id: "p-gsap",     source: "portfolio", target: "gsap" },
];

export function EcosystemGraph() {
  // memoize so reagraph doesn't re-cluster every render
  const nodes = useMemo(() => NODES, []);
  const edges = useMemo(() => EDGES, []);

  return (
    <section
      id="ecosystem-graph"
      className="relative w-full h-[600px] md:h-[720px] bg-[#05070b] overflow-hidden"
    >
      <div className="absolute inset-0">
        <GraphCanvas
          nodes={nodes}
          edges={edges}
          layoutType="forceDirected2d"
          theme={{
            canvas: { background: "transparent" },
            node: {
              fill: "#ffffff",
              activeFill: "#6ee7ff",
              opacity: 1,
              selectedOpacity: 1,
              inactiveOpacity: 0.2,
              label: {
                color: "rgba(255,255,255,0.9)",
                stroke: "rgba(0,0,0,0.6)",
                activeColor: "#6ee7ff",
              },
            },
            edge: {
              fill: "rgba(255,255,255,0.18)",
              activeFill: "#6ee7ff",
              opacity: 0.5,
              selectedOpacity: 1,
              inactiveOpacity: 0.1,
              label: {
                color: "rgba(255,255,255,0.6)",
                stroke: "rgba(0,0,0,0.4)",
                activeColor: "#6ee7ff",
                fontSize: 8,
              },
            },
            arrow: { fill: "rgba(255,255,255,0.4)", activeFill: "#6ee7ff" },
            lasso: {
              border: "1px solid #6ee7ff",
              background: "rgba(110,231,255,0.1)",
            },
            ring: { fill: "rgba(255,255,255,0.1)", activeFill: "#6ee7ff" },
          }}
          cameraMode="rotate"
          draggable
        />
      </div>

      {/* HUD overlay */}
      <div className="absolute top-6 left-6 pointer-events-none">
        <div className="font-mono text-xs uppercase tracking-[0.22em] text-white/40">
          Ecosystem · Network View
        </div>
        <div className="mt-2 font-light text-2xl md:text-3xl text-white tracking-tight">
          Projects + Shared Stack
        </div>
      </div>

      <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-3 pointer-events-none font-mono text-[10px] uppercase tracking-[0.18em]">
        <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur text-white/60">
          <span className="inline-block w-2 h-2 rounded-full bg-indigo-500 mr-2 align-middle" />
          Projects
        </span>
        <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur text-white/60">
          <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 mr-2 align-middle" />
          Tech stack
        </span>
        <span className="ml-auto px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur text-white/40">
          drag to rotate · scroll to zoom · click node
        </span>
      </div>
    </section>
  );
}

export default EcosystemGraph;
