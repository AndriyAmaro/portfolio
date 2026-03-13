"use client";

import { useEffect, useRef } from "react";

/* ── Circuit trace types ── */
interface TraceSegment {
  x1: number; y1: number;
  x2: number; y2: number;
}

interface CircuitTrace {
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

/* ── Build PCB traces along the sides ── */
function createCircuitTraces(w: number, h: number, isMobile: boolean): CircuitTrace[] {
  const traces: CircuitTrace[] = [];
  const m = isMobile ? 20 : 30;

  // Left side traces · full height from top to bottom
  const leftTraceConfigs = isMobile
    ? [
        [{ x: m, y: h * 0.04 }, { x: m, y: h * 0.18 }, { x: m + 35, y: h * 0.18 }, { x: m + 35, y: h * 0.34 }, { x: m, y: h * 0.34 }, { x: m, y: h * 0.50 }, { x: m + 28, y: h * 0.50 }, { x: m + 28, y: h * 0.66 }, { x: m, y: h * 0.66 }, { x: m, y: h * 0.82 }, { x: m + 35, y: h * 0.82 }, { x: m + 35, y: h * 0.96 }],
        [{ x: m + 55, y: h * 0.08 }, { x: m + 55, y: h * 0.24 }, { x: m + 20, y: h * 0.24 }, { x: m + 20, y: h * 0.40 }, { x: m + 55, y: h * 0.40 }, { x: m + 55, y: h * 0.56 }, { x: m + 20, y: h * 0.56 }, { x: m + 20, y: h * 0.72 }, { x: m + 55, y: h * 0.72 }, { x: m + 55, y: h * 0.88 }, { x: m + 20, y: h * 0.88 }, { x: m + 20, y: h * 0.97 }],
      ]
    : [
        [{ x: m, y: h * 0.04 }, { x: m, y: h * 0.18 }, { x: m + 50, y: h * 0.18 }, { x: m + 50, y: h * 0.32 }, { x: m, y: h * 0.32 }, { x: m, y: h * 0.48 }, { x: m + 40, y: h * 0.48 }, { x: m + 40, y: h * 0.62 }, { x: m, y: h * 0.62 }, { x: m, y: h * 0.78 }, { x: m + 50, y: h * 0.78 }, { x: m + 50, y: h * 0.92 }, { x: m, y: h * 0.92 }, { x: m, y: h * 0.98 }],
        [{ x: m + 75, y: h * 0.06 }, { x: m + 75, y: h * 0.22 }, { x: m + 30, y: h * 0.22 }, { x: m + 30, y: h * 0.38 }, { x: m + 75, y: h * 0.38 }, { x: m + 75, y: h * 0.54 }, { x: m + 30, y: h * 0.54 }, { x: m + 30, y: h * 0.70 }, { x: m + 75, y: h * 0.70 }, { x: m + 75, y: h * 0.86 }, { x: m + 30, y: h * 0.86 }, { x: m + 30, y: h * 0.97 }],
        [{ x: m + 110, y: h * 0.10 }, { x: m + 110, y: h * 0.26 }, { x: m + 60, y: h * 0.26 }, { x: m + 60, y: h * 0.42 }, { x: m + 110, y: h * 0.42 }, { x: m + 110, y: h * 0.58 }, { x: m + 60, y: h * 0.58 }, { x: m + 60, y: h * 0.74 }, { x: m + 110, y: h * 0.74 }, { x: m + 110, y: h * 0.90 }],
      ];

  // Right side traces · full height from top to bottom
  const rightTraceConfigs = isMobile
    ? [
        [{ x: w - m, y: h * 0.06 }, { x: w - m, y: h * 0.20 }, { x: w - m - 35, y: h * 0.20 }, { x: w - m - 35, y: h * 0.36 }, { x: w - m, y: h * 0.36 }, { x: w - m, y: h * 0.52 }, { x: w - m - 28, y: h * 0.52 }, { x: w - m - 28, y: h * 0.68 }, { x: w - m, y: h * 0.68 }, { x: w - m, y: h * 0.84 }, { x: w - m - 35, y: h * 0.84 }, { x: w - m - 35, y: h * 0.97 }],
        [{ x: w - m - 55, y: h * 0.10 }, { x: w - m - 55, y: h * 0.26 }, { x: w - m - 20, y: h * 0.26 }, { x: w - m - 20, y: h * 0.42 }, { x: w - m - 55, y: h * 0.42 }, { x: w - m - 55, y: h * 0.58 }, { x: w - m - 20, y: h * 0.58 }, { x: w - m - 20, y: h * 0.74 }, { x: w - m - 55, y: h * 0.74 }, { x: w - m - 55, y: h * 0.90 }, { x: w - m - 20, y: h * 0.90 }, { x: w - m - 20, y: h * 0.98 }],
      ]
    : [
        [{ x: w - m, y: h * 0.05 }, { x: w - m, y: h * 0.20 }, { x: w - m - 50, y: h * 0.20 }, { x: w - m - 50, y: h * 0.34 }, { x: w - m, y: h * 0.34 }, { x: w - m, y: h * 0.50 }, { x: w - m - 40, y: h * 0.50 }, { x: w - m - 40, y: h * 0.64 }, { x: w - m, y: h * 0.64 }, { x: w - m, y: h * 0.80 }, { x: w - m - 50, y: h * 0.80 }, { x: w - m - 50, y: h * 0.94 }, { x: w - m, y: h * 0.94 }, { x: w - m, y: h * 0.98 }],
        [{ x: w - m - 75, y: h * 0.08 }, { x: w - m - 75, y: h * 0.24 }, { x: w - m - 30, y: h * 0.24 }, { x: w - m - 30, y: h * 0.40 }, { x: w - m - 75, y: h * 0.40 }, { x: w - m - 75, y: h * 0.56 }, { x: w - m - 30, y: h * 0.56 }, { x: w - m - 30, y: h * 0.72 }, { x: w - m - 75, y: h * 0.72 }, { x: w - m - 75, y: h * 0.88 }, { x: w - m - 30, y: h * 0.88 }, { x: w - m - 30, y: h * 0.98 }],
        [{ x: w - m - 110, y: h * 0.08 }, { x: w - m - 110, y: h * 0.24 }, { x: w - m - 60, y: h * 0.24 }, { x: w - m - 60, y: h * 0.40 }, { x: w - m - 110, y: h * 0.40 }, { x: w - m - 110, y: h * 0.56 }, { x: w - m - 60, y: h * 0.56 }, { x: w - m - 60, y: h * 0.72 }, { x: w - m - 110, y: h * 0.72 }, { x: w - m - 110, y: h * 0.88 }],
      ];

  const allConfigs = [...leftTraceConfigs, ...rightTraceConfigs];

  for (const points of allConfigs) {
    const segments: TraceSegment[] = [];
    const nodes: { x: number; y: number; radius: number }[] = [];
    let totalLength = 0;

    for (let i = 0; i < points.length - 1; i++) {
      const seg = { x1: points[i].x, y1: points[i].y, x2: points[i + 1].x, y2: points[i + 1].y };
      segments.push(seg);
      totalLength += Math.sqrt((seg.x2 - seg.x1) ** 2 + (seg.y2 - seg.y1) ** 2);
    }

    // Add circuit nodes at corners/junctions
    for (const p of points) {
      nodes.push({ x: p.x, y: p.y, radius: 2.5 + Math.random() * 1.5 });
    }

    traces.push({ segments, totalLength, nodes });
  }

  return traces;
}

function createLights(traceCount: number): TravelingLight[] {
  const lights: TravelingLight[] = [];
  for (let i = 0; i < traceCount; i++) {
    // 2 lights per trace at different positions
    lights.push({ trace: i, progress: Math.random(), speed: 0.08 + Math.random() * 0.06, length: 0.12 + Math.random() * 0.08 });
    lights.push({ trace: i, progress: (Math.random() + 0.5) % 1, speed: 0.06 + Math.random() * 0.05, length: 0.10 + Math.random() * 0.06 });
  }
  return lights;
}

function getPointOnTrace(trace: CircuitTrace, progress: number): { x: number; y: number } {
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

/* ── Main animation ── */
function animateCanvas(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  isDark: boolean
) {
  let animationId: number;
  const isMobile = canvas.width < 768;
  const traces = createCircuitTraces(canvas.width, canvas.height, isMobile);
  const lights = createLights(traces.length);

  const traceColor = isDark ? "99,102,241" : "79,70,229";
  const nodeColor = isDark ? "139,92,246" : "99,102,241";
  const lightColor = isDark ? "167,139,250" : "124,58,237";
  const traceOpacity = isDark ? 0.15 : 0.12;
  const nodeOpacity = isDark ? 0.25 : 0.20;

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw traces (static PCB lines)
    traces.forEach((trace) => {
      ctx.beginPath();
      trace.segments.forEach((seg, i) => {
        if (i === 0) ctx.moveTo(seg.x1, seg.y1);
        ctx.lineTo(seg.x2, seg.y2);
      });
      ctx.strokeStyle = `rgba(${traceColor}, ${traceOpacity})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw nodes at junctions
      trace.nodes.forEach((node) => {
        // Via hole (outer ring)
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + 2, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${nodeColor}, ${nodeOpacity * 0.6})`;
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

      // Draw light trail
      const steps = 12;
      for (let i = 0; i < steps; i++) {
        const p = (light.progress - (i / steps) * light.length + 1) % 1;
        const point = getPointOnTrace(trace, p);
        const alpha = (1 - i / steps) * (isDark ? 0.6 : 0.45);

        ctx.beginPath();
        ctx.arc(point.x, point.y, 2 - (i / steps) * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${lightColor}, ${alpha})`;
        ctx.fill();

        // Glow on leading point
        if (i === 0) {
          ctx.beginPath();
          ctx.arc(point.x, point.y, 6, 0, Math.PI * 2);
          const glow = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, 6);
          glow.addColorStop(0, `rgba(${lightColor}, ${isDark ? 0.35 : 0.25})`);
          glow.addColorStop(1, `rgba(${lightColor}, 0)`);
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

export function AbstractBackground() {
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
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #0f0d1f 0%, #161331 30%, #1a1640 60%, #1e1b4b 100%)",
        }}
      />

      {/* Canvas for animated elements */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ opacity: 1 }}
      />

      {/* Gradient orbs */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-indigo-600/12 rounded-full blur-[150px] animate-pulse-slow" />
      <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/6 rounded-full blur-[180px]" />

      {/* Corner glows */}
      <div className="absolute top-1/3 left-0 w-[400px] h-[450px] bg-violet-500/12 rounded-full blur-[130px] animate-pulse-slow" />
      <div className="absolute top-1/3 right-0 w-[400px] h-[450px] bg-indigo-500/10 rounded-full blur-[130px] animate-pulse-slow animation-delay-2000" />

      {/* Lateral glows - sides */}
      <div className="absolute top-1/2 left-0 w-[300px] h-[500px] bg-cyan-500/8 rounded-full blur-[100px] animate-pulse-slow animation-delay-4000" />
      <div className="absolute top-1/2 right-0 w-[300px] h-[500px] bg-cyan-500/8 rounded-full blur-[100px] animate-pulse-slow animation-delay-2000" />

      {/* Bottom orbs */}
      <div className="absolute bottom-0 left-1/4 w-[450px] h-[350px] bg-violet-500/10 rounded-full blur-[120px] animate-pulse-slow animation-delay-2000" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-indigo-500/8 rounded-full blur-[100px] animate-pulse-slow animation-delay-4000" />

      {/* Bottom corners */}
      <div className="absolute bottom-0 left-0 w-[300px] h-[400px] bg-indigo-400/8 rounded-full blur-[100px] animate-pulse-slow animation-delay-2000" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[400px] bg-violet-400/8 rounded-full blur-[100px] animate-pulse-slow animation-delay-4000" />

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

/* Light mode version */
export function AbstractBackgroundLight() {
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
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient - light */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 30%, #f1f5f9 60%, #e2e8f0 100%)",
        }}
      />

      {/* Canvas for animated elements */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ opacity: 0.7 }}
      />

      {/* Gradient orbs - top */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-indigo-300/20 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute top-1/3 right-1/3 w-[350px] h-[350px] bg-violet-300/18 rounded-full blur-[100px] animate-pulse-slow animation-delay-2000" />

      {/* Lateral glows - top */}
      <div className="absolute top-1/3 left-0 w-[300px] h-[400px] bg-indigo-300/14 rounded-full blur-[100px] animate-pulse-slow" />
      <div className="absolute top-1/4 right-0 w-[280px] h-[350px] bg-violet-300/12 rounded-full blur-[100px] animate-pulse-slow animation-delay-4000" />

      {/* Bottom orbs */}
      <div className="absolute bottom-0 left-1/4 w-[380px] h-[280px] bg-indigo-300/18 rounded-full blur-[100px] animate-pulse-slow animation-delay-2000" />
      <div className="absolute bottom-0 right-1/4 w-[350px] h-[250px] bg-violet-300/16 rounded-full blur-[90px] animate-pulse-slow animation-delay-4000" />
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-indigo-300/12 rounded-full blur-[110px] animate-pulse-slow" />

      {/* Bottom corners */}
      <div className="absolute bottom-0 left-0 w-[250px] h-[300px] bg-indigo-300/12 rounded-full blur-[90px] animate-pulse-slow animation-delay-2000" />
      <div className="absolute bottom-0 right-0 w-[250px] h-[300px] bg-violet-300/12 rounded-full blur-[90px] animate-pulse-slow animation-delay-4000" />

      {/* Extra bottom glows */}
      <div className="absolute -bottom-20 left-[15%] w-[300px] h-[250px] bg-indigo-300/15 rounded-full blur-[100px] animate-pulse-slow" />
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[350px] h-[230px] bg-violet-300/14 rounded-full blur-[110px] animate-pulse-slow animation-delay-2000" />
      <div className="absolute -bottom-20 right-[15%] w-[300px] h-[250px] bg-indigo-300/15 rounded-full blur-[100px] animate-pulse-slow animation-delay-4000" />

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
