"use client";

import { useEffect, useRef } from "react";

interface FloatingSymbol {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  text: string;
  fontSize: number;
  opacity: number;
  speed: number;
  amplitude: number;
  phase: number;
  rotation: number;
  rotationSpeed: number;
}

interface SkillBar {
  x: number;
  y: number;
  width: number;
  progress: number;
  targetProgress: number;
  speed: number;
  opacity: number;
  phase: number;
}

interface CircuitNode {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  pulsePhase: number;
  connections: number[];
}

const CODE_SYMBOLS = [
  "</>", "{}", "()", "=>", "//", "##", "&&", "||",
  "const", "func", "async", "type", "npm", "git",
  "API", "SQL", "CSS", "DOM", "JSX", "CLI",
  "[]", "::", "/**", "*/", "++", "!=",
];

function createSymbols(w: number, h: number, isDark: boolean): FloatingSymbol[] {
  const symbols: FloatingSymbol[] = [];
  const count = 28;

  for (let i = 0; i < count; i++) {
    symbols.push({
      x: 0, y: 0,
      baseX: Math.random() * w,
      baseY: Math.random() * h,
      text: CODE_SYMBOLS[i % CODE_SYMBOLS.length],
      fontSize: 11 + Math.random() * 14,
      opacity: isDark ? 0.06 + Math.random() * 0.1 : 0.05 + Math.random() * 0.08,
      speed: 0.15 + Math.random() * 0.25,
      amplitude: 12 + Math.random() * 20,
      phase: Math.random() * Math.PI * 2,
      rotation: (Math.random() - 0.5) * 0.4,
      rotationSpeed: (Math.random() - 0.5) * 0.003,
    });
  }
  return symbols;
}

function createBars(w: number, h: number, isDark: boolean): SkillBar[] {
  const bars: SkillBar[] = [];
  const count = 12;

  for (let i = 0; i < count; i++) {
    bars.push({
      x: Math.random() * w * 0.8 + w * 0.1,
      y: Math.random() * h,
      width: 40 + Math.random() * 80,
      progress: 0,
      targetProgress: 0.4 + Math.random() * 0.6,
      speed: 0.003 + Math.random() * 0.004,
      opacity: isDark ? 0.06 + Math.random() * 0.08 : 0.04 + Math.random() * 0.06,
      phase: Math.random() * Math.PI * 2,
    });
  }
  return bars;
}

function createCircuitNodes(w: number, h: number, isDark: boolean): CircuitNode[] {
  const nodes: CircuitNode[] = [];
  const count = 18;

  for (let i = 0; i < count; i++) {
    nodes.push({
      x: Math.random() * w,
      y: Math.random() * h,
      radius: 2 + Math.random() * 3,
      opacity: isDark ? 0.15 + Math.random() * 0.2 : 0.1 + Math.random() * 0.15,
      pulsePhase: Math.random() * Math.PI * 2,
      connections: [],
    });
  }

  // Connect nearby nodes
  nodes.forEach((node, i) => {
    nodes.forEach((other, j) => {
      if (i !== j) {
        const dist = Math.hypot(node.x - other.x, node.y - other.y);
        if (dist < 200 && node.connections.length < 2) {
          node.connections.push(j);
        }
      }
    });
  });

  return nodes;
}

function animateCanvas(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  isDark: boolean
) {
  let time = 0;
  let animationId: number;

  const symbols = createSymbols(canvas.width, canvas.height, isDark);
  const bars = createBars(canvas.width, canvas.height, isDark);
  const circuitNodes = createCircuitNodes(canvas.width, canvas.height, isDark);

  const textColor = isDark ? "167,139,250" : "79,70,229";
  const barColor = isDark ? "99,102,241" : "79,70,229";
  const nodeColor = isDark ? "139,92,246" : "99,102,241";
  const lineColor = isDark ? "99,102,241" : "79,70,229";

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    time += 0.016;

    // Draw circuit connections
    circuitNodes.forEach((node) => {
      node.connections.forEach((j) => {
        const other = circuitNodes[j];
        const pulse = Math.sin(time * 0.5 + node.pulsePhase) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(other.x, other.y);
        ctx.strokeStyle = `rgba(${lineColor}, ${node.opacity * 0.3 * pulse})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });
    });

    // Draw circuit nodes
    circuitNodes.forEach((node) => {
      const pulse = Math.sin(time * 0.8 + node.pulsePhase) * 0.3 + 0.7;

      // Glow
      const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 6);
      glow.addColorStop(0, `rgba(${nodeColor}, ${node.opacity * 0.3 * pulse})`);
      glow.addColorStop(1, `rgba(${nodeColor}, 0)`);
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius * 6, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      // Core
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${nodeColor}, ${node.opacity * pulse})`;
      ctx.fill();
    });

    // Draw skill bars
    bars.forEach((bar) => {
      const wave = Math.sin(time * 0.5 + bar.phase) * 0.5 + 0.5;
      const currentProgress = bar.targetProgress * wave;

      // Bar track
      ctx.beginPath();
      ctx.roundRect(bar.x, bar.y, bar.width, 3, 1.5);
      ctx.fillStyle = `rgba(${barColor}, ${bar.opacity * 0.3})`;
      ctx.fill();

      // Bar fill
      ctx.beginPath();
      ctx.roundRect(bar.x, bar.y, bar.width * currentProgress, 3, 1.5);
      ctx.fillStyle = `rgba(${barColor}, ${bar.opacity * 0.8})`;
      ctx.fill();

      // Glow tip
      const tipX = bar.x + bar.width * currentProgress;
      const tipGlow = ctx.createRadialGradient(tipX, bar.y + 1.5, 0, tipX, bar.y + 1.5, 8);
      tipGlow.addColorStop(0, `rgba(${barColor}, ${bar.opacity * 0.5})`);
      tipGlow.addColorStop(1, `rgba(${barColor}, 0)`);
      ctx.beginPath();
      ctx.arc(tipX, bar.y + 1.5, 8, 0, Math.PI * 2);
      ctx.fillStyle = tipGlow;
      ctx.fill();
    });

    // Draw floating code symbols
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    symbols.forEach((s) => {
      s.rotation += s.rotationSpeed;
      s.x = s.baseX + Math.sin(time * s.speed + s.phase) * s.amplitude;
      s.y = s.baseY + Math.cos(time * s.speed * 0.7 + s.phase) * s.amplitude * 0.5;

      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.rotate(s.rotation);
      ctx.font = `${s.fontSize}px 'JetBrains Mono', 'Fira Code', monospace`;
      ctx.fillStyle = `rgba(${textColor}, ${s.opacity})`;
      ctx.fillText(s.text, 0, 0);
      ctx.restore();
    });

    animationId = requestAnimationFrame(animate);
  };

  animate();
  return () => cancelAnimationFrame(animationId);
}

export function SkillsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
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
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient - Dark */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #0f0d1f 0%, #161331 30%, #1a1640 60%, #1e1b4b 100%)",
        }}
      />

      {/* Canvas for animated elements */}
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

/* Light mode version */
export function SkillsBackgroundLight() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
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
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient - Light */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 30%, #f1f5f9 60%, #e2e8f0 100%)",
        }}
      />

      {/* Canvas for animated elements */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.7 }}
      />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-indigo-200/12 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute top-1/3 right-1/3 w-[350px] h-[350px] bg-slate-300/15 rounded-full blur-[100px] animate-pulse-slow animation-delay-2000" />

      {/* Lateral glows */}
      <div className="absolute top-1/3 left-0 w-[300px] h-[400px] bg-indigo-300/6 rounded-full blur-[100px] animate-pulse-slow" />
      <div className="absolute top-1/4 right-0 w-[280px] h-[350px] bg-slate-400/5 rounded-full blur-[100px] animate-pulse-slow animation-delay-4000" />

      {/* Bottom orbs */}
      <div className="absolute bottom-0 left-1/4 w-[380px] h-[280px] bg-indigo-200/10 rounded-full blur-[100px] animate-pulse-slow animation-delay-2000" />
      <div className="absolute bottom-0 right-1/4 w-[350px] h-[250px] bg-slate-300/12 rounded-full blur-[90px] animate-pulse-slow animation-delay-4000" />
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-indigo-200/6 rounded-full blur-[110px] animate-pulse-slow" />

      {/* Bottom corners */}
      <div className="absolute bottom-0 left-0 w-[250px] h-[300px] bg-indigo-300/5 rounded-full blur-[90px] animate-pulse-slow animation-delay-2000" />
      <div className="absolute bottom-0 right-0 w-[250px] h-[300px] bg-slate-400/5 rounded-full blur-[90px] animate-pulse-slow animation-delay-4000" />

      {/* Extra bottom glows */}
      <div className="absolute -bottom-20 left-[15%] w-[300px] h-[250px] bg-indigo-200/8 rounded-full blur-[100px] animate-pulse-slow" />
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[350px] h-[230px] bg-slate-300/8 rounded-full blur-[110px] animate-pulse-slow animation-delay-2000" />
      <div className="absolute -bottom-20 right-[15%] w-[300px] h-[250px] bg-indigo-200/8 rounded-full blur-[100px] animate-pulse-slow animation-delay-4000" />

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
