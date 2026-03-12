"use client";

import { useEffect, useRef } from "react";

// ---------------------------------------------------------------------------
// Ecosystem Background · Horizontal circuit traces with traveling lights
// ---------------------------------------------------------------------------

interface TraceSegment {
  x1: number; y1: number;
  x2: number; y2: number;
}

interface HorizontalTrace {
  segments: TraceSegment[];
  totalLength: number;
  nodes: { x: number; y: number; radius: number }[];
}

interface TravelingLight {
  trace: number;
  progress: number;
  speed: number;
  length: number;
}

function createHorizontalTraces(w: number, h: number, isMobile: boolean): HorizontalTrace[] {
  const traces: HorizontalTrace[] = [];
  const traceConfigs: { x: number; y: number }[][] = [];

  if (isMobile) {
    // Fewer traces on mobile, spread across full height
    const yPositions = [0.08, 0.18, 0.30, 0.42, 0.54, 0.66, 0.78, 0.90];

    yPositions.forEach((yBase, i) => {
      const y = h * yBase;
      const jog = 18 + (i % 3) * 12;
      const startX = i % 2 === 0 ? -20 : w + 20;
      const endX = i % 2 === 0 ? w + 20 : -20;
      const dir = i % 2 === 0 ? 1 : -1;

      const points: { x: number; y: number }[] = [
        { x: startX, y },
        { x: startX + dir * w * 0.2, y },
        { x: startX + dir * w * 0.2, y: y + jog },
        { x: startX + dir * w * 0.45, y: y + jog },
        { x: startX + dir * w * 0.45, y: y - jog * 0.6 },
        { x: startX + dir * w * 0.7, y: y - jog * 0.6 },
        { x: startX + dir * w * 0.7, y },
        { x: endX, y },
      ];
      traceConfigs.push(points);
    });
  } else {
    // Desktop · more traces with wider jogs
    const yPositions = [0.06, 0.14, 0.22, 0.30, 0.38, 0.46, 0.54, 0.62, 0.70, 0.78, 0.86, 0.94];

    yPositions.forEach((yBase, i) => {
      const y = h * yBase;
      const jog = 22 + (i % 4) * 14;
      const startX = i % 2 === 0 ? -30 : w + 30;
      const endX = i % 2 === 0 ? w + 30 : -30;
      const dir = i % 2 === 0 ? 1 : -1;

      // Create varied horizontal paths with vertical jogs
      const seg1 = w * (0.12 + (i % 3) * 0.05);
      const seg2 = w * (0.35 + (i % 2) * 0.08);
      const seg3 = w * (0.58 + (i % 3) * 0.06);
      const seg4 = w * (0.82 + (i % 2) * 0.04);

      const jogDir = i % 2 === 0 ? 1 : -1;

      const points: { x: number; y: number }[] = [
        { x: startX, y },
        { x: startX + dir * seg1, y },
        { x: startX + dir * seg1, y: y + jog * jogDir },
        { x: startX + dir * seg2, y: y + jog * jogDir },
        { x: startX + dir * seg2, y: y - jog * 0.5 * jogDir },
        { x: startX + dir * seg3, y: y - jog * 0.5 * jogDir },
        { x: startX + dir * seg3, y: y + jog * 0.3 * jogDir },
        { x: startX + dir * seg4, y: y + jog * 0.3 * jogDir },
        { x: startX + dir * seg4, y },
        { x: endX, y },
      ];
      traceConfigs.push(points);
    });
  }

  for (const points of traceConfigs) {
    const segments: TraceSegment[] = [];
    const nodes: { x: number; y: number; radius: number }[] = [];
    let totalLength = 0;

    for (let i = 0; i < points.length - 1; i++) {
      const seg = { x1: points[i].x, y1: points[i].y, x2: points[i + 1].x, y2: points[i + 1].y };
      segments.push(seg);
      totalLength += Math.sqrt((seg.x2 - seg.x1) ** 2 + (seg.y2 - seg.y1) ** 2);
    }

    // Nodes at junctions (not endpoints off-screen)
    for (let i = 1; i < points.length - 1; i++) {
      nodes.push({ x: points[i].x, y: points[i].y, radius: 2 + Math.random() * 1.5 });
    }

    traces.push({ segments, totalLength, nodes });
  }

  return traces;
}

function createLights(traceCount: number): TravelingLight[] {
  const lights: TravelingLight[] = [];
  for (let i = 0; i < traceCount; i++) {
    lights.push({ trace: i, progress: Math.random(), speed: 0.04 + Math.random() * 0.04, length: 0.08 + Math.random() * 0.06 });
    lights.push({ trace: i, progress: (Math.random() + 0.5) % 1, speed: 0.03 + Math.random() * 0.03, length: 0.06 + Math.random() * 0.05 });
  }
  return lights;
}

function getPointOnTrace(trace: HorizontalTrace, progress: number): { x: number; y: number } {
  const targetDist = progress * trace.totalLength;
  let dist = 0;

  for (const seg of trace.segments) {
    const segLen = Math.sqrt((seg.x2 - seg.x1) ** 2 + (seg.y2 - seg.y1) ** 2);
    if (dist + segLen >= targetDist) {
      const t = (targetDist - dist) / segLen;
      return { x: seg.x1 + (seg.x2 - seg.x1) * t, y: seg.y1 + (seg.y2 - seg.y1) * t };
    }
    dist += segLen;
  }

  const last = trace.segments[trace.segments.length - 1];
  return { x: last.x2, y: last.y2 };
}

function animateCanvas(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  isDark: boolean
) {
  let animationId: number;
  const isMobile = canvas.width < 768;
  const traces = createHorizontalTraces(canvas.width, canvas.height, isMobile);
  const lights = createLights(traces.length);

  const traceColor = isDark ? "99,102,241" : "79,70,229";
  const nodeColor = isDark ? "139,92,246" : "99,102,241";
  const lightColor = isDark ? "167,139,250" : "124,58,237";
  const cyanColor = isDark ? "34,211,238" : "6,182,212";
  const traceOpacity = isDark ? 0.12 : 0.09;
  const nodeOpacity = isDark ? 0.22 : 0.16;

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw traces (static horizontal lines)
    traces.forEach((trace, ti) => {
      // Alternate colors for variety
      const color = ti % 3 === 2 ? cyanColor : traceColor;
      const opacity = ti % 3 === 2 ? traceOpacity * 0.8 : traceOpacity;

      ctx.beginPath();
      trace.segments.forEach((seg, i) => {
        if (i === 0) ctx.moveTo(seg.x1, seg.y1);
        ctx.lineTo(seg.x2, seg.y2);
      });
      ctx.strokeStyle = `rgba(${color}, ${opacity})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw nodes at junctions
      trace.nodes.forEach((node) => {
        // Via hole (outer ring)
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + 2, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${nodeColor}, ${nodeOpacity * 0.5})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Core dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${nodeColor}, ${nodeOpacity})`;
        ctx.fill();
      });
    });

    // Animate traveling lights
    lights.forEach((light) => {
      light.progress = (light.progress + light.speed * 0.016) % 1;
      const trace = traces[light.trace];
      const ti = light.trace;
      const lColor = ti % 3 === 2 ? cyanColor : lightColor;

      const steps = 14;
      for (let i = 0; i < steps; i++) {
        const p = (light.progress - (i / steps) * light.length + 1) % 1;
        const point = getPointOnTrace(trace, p);
        const alpha = (1 - i / steps) * (isDark ? 0.5 : 0.35);

        ctx.beginPath();
        ctx.arc(point.x, point.y, 1.8 - (i / steps) * 1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${lColor}, ${alpha})`;
        ctx.fill();

        // Glow on leading point
        if (i === 0) {
          ctx.beginPath();
          ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
          const glow = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, 5);
          glow.addColorStop(0, `rgba(${lColor}, ${isDark ? 0.3 : 0.2})`);
          glow.addColorStop(1, `rgba(${lColor}, 0)`);
          ctx.fillStyle = glow;
          ctx.fill();
        }
      }
    });

    animationId = requestAnimationFrame(animate);
  };

  animate();
  return () => cancelAnimationFrame(animationId);
}

export function EcosystemBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      canvas.width = window.innerWidth;
      canvas.height = parent ? parent.offsetHeight : window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const cleanup = animateCanvas(canvas, ctx, true);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cleanup();
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #0f0d1f 0%, #161331 30%, #1a1640 60%, #1e1b4b 100%)",
        }}
      />

      {/* Canvas for animated circuit traces */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 1 }}
      />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[150px] animate-pulse-slow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[180px]" />

      {/* Corner glows */}
      <div className="absolute top-0 left-0 w-[400px] h-[450px] bg-violet-500/12 rounded-full blur-[130px] animate-pulse-slow" />
      <div className="absolute top-0 right-0 w-[400px] h-[450px] bg-indigo-500/10 rounded-full blur-[130px] animate-pulse-slow animation-delay-2000" />

      {/* Lateral glows */}
      <div className="absolute top-1/3 left-0 w-[300px] h-[500px] bg-cyan-500/6 rounded-full blur-[100px] animate-pulse-slow animation-delay-4000" />
      <div className="absolute top-1/3 right-0 w-[300px] h-[500px] bg-cyan-500/6 rounded-full blur-[100px] animate-pulse-slow animation-delay-2000" />

      {/* Bottom orbs */}
      <div className="absolute bottom-0 left-1/4 w-[450px] h-[350px] bg-violet-500/8 rounded-full blur-[120px] animate-pulse-slow animation-delay-2000" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-indigo-500/6 rounded-full blur-[100px] animate-pulse-slow animation-delay-4000" />

      {/* Bottom corners */}
      <div className="absolute bottom-0 left-0 w-[300px] h-[400px] bg-indigo-400/6 rounded-full blur-[100px] animate-pulse-slow animation-delay-2000" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[400px] bg-violet-400/6 rounded-full blur-[100px] animate-pulse-slow animation-delay-4000" />

      {/* Center overlay for text readability */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(12, 10, 29, 0.3) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}

export function EcosystemBackgroundLight() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      canvas.width = window.innerWidth;
      canvas.height = parent ? parent.offsetHeight : window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const cleanup = animateCanvas(canvas, ctx, false);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cleanup();
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 30%, #f1f5f9 60%, #e2e8f0 100%)",
        }}
      />

      {/* Canvas for animated circuit traces */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.75 }}
      />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-300/20 rounded-full blur-[150px] animate-pulse-slow" />
      <div className="absolute top-1/3 right-1/3 w-[350px] h-[350px] bg-slate-300/25 rounded-full blur-[100px] animate-pulse-slow animation-delay-2000" />

      {/* Lateral glows */}
      <div className="absolute top-1/3 left-0 w-[300px] h-[400px] bg-indigo-300/15 rounded-full blur-[100px] animate-pulse-slow" />
      <div className="absolute top-1/4 right-0 w-[280px] h-[350px] bg-slate-400/12 rounded-full blur-[100px] animate-pulse-slow animation-delay-4000" />

      {/* Bottom orbs */}
      <div className="absolute bottom-0 left-1/4 w-[450px] h-[350px] bg-indigo-300/18 rounded-full blur-[120px] animate-pulse-slow animation-delay-2000" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-slate-300/20 rounded-full blur-[100px] animate-pulse-slow animation-delay-4000" />
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-indigo-300/14 rounded-full blur-[110px] animate-pulse-slow" />

      {/* Bottom corners */}
      <div className="absolute bottom-0 left-0 w-[300px] h-[400px] bg-indigo-300/12 rounded-full blur-[100px] animate-pulse-slow animation-delay-2000" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[400px] bg-slate-400/12 rounded-full blur-[100px] animate-pulse-slow animation-delay-4000" />

      {/* Extra bottom glows */}
      <div className="absolute -bottom-20 left-[15%] w-[300px] h-[250px] bg-indigo-300/16 rounded-full blur-[100px] animate-pulse-slow" />
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[350px] h-[230px] bg-slate-300/16 rounded-full blur-[110px] animate-pulse-slow animation-delay-2000" />
      <div className="absolute -bottom-20 right-[15%] w-[300px] h-[250px] bg-indigo-300/16 rounded-full blur-[100px] animate-pulse-slow animation-delay-4000" />

      {/* Top fade */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.85) 0%, transparent 18%)",
        }}
      />
    </div>
  );
}
