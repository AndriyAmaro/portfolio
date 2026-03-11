"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  radius: number;
  opacity: number;
  speed: number;
  amplitude: number;
  phase: number;
  color: string;
}

interface HexRing {
  cx: number;
  cy: number;
  radius: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  sides: number;
}

function createNodes(w: number, h: number, isDark: boolean): Node[] {
  const colors = isDark
    ? ["139,92,246", "99,102,241", "167,139,250", "129,140,248", "124,58,237"]
    : ["99,102,241", "124,58,237", "139,92,246", "79,70,229", "109,40,217"];

  const isMobile = w < 768;

  const positions = isMobile
    ? [
        { x: 0.08, y: 0.53 }, { x: 0.18, y: 0.65 }, { x: 0.12, y: 0.77 },
        { x: 0.25, y: 0.57 }, { x: 0.32, y: 0.70 }, { x: 0.22, y: 0.83 },
        { x: 0.75, y: 0.55 }, { x: 0.82, y: 0.63 }, { x: 0.88, y: 0.75 },
        { x: 0.7, y: 0.67 }, { x: 0.92, y: 0.59 }, { x: 0.78, y: 0.79 },
        { x: 0.5, y: 0.60 }, { x: 0.42, y: 0.73 }, { x: 0.58, y: 0.77 },
        { x: 0.35, y: 0.51 }, { x: 0.65, y: 0.55 }, { x: 0.48, y: 0.85 },
        { x: 0.15, y: 0.49 }, { x: 0.85, y: 0.50 },
      ]
    : [
        { x: 0.08, y: 0.88 }, { x: 0.18, y: 0.93 }, { x: 0.12, y: 0.98 },
        { x: 0.25, y: 0.90 }, { x: 0.32, y: 0.96 }, { x: 0.22, y: 0.99 },
        { x: 0.75, y: 0.89 }, { x: 0.82, y: 0.94 }, { x: 0.88, y: 0.98 },
        { x: 0.7, y: 0.95 }, { x: 0.92, y: 0.91 }, { x: 0.78, y: 0.99 },
        { x: 0.5, y: 0.92 }, { x: 0.42, y: 0.97 }, { x: 0.58, y: 0.98 },
        { x: 0.35, y: 0.87 }, { x: 0.65, y: 0.88 }, { x: 0.48, y: 1.0 },
        { x: 0.15, y: 0.86 }, { x: 0.85, y: 0.87 },
      ];

  return positions.map((p, i) => ({
    x: 0, y: 0,
    baseX: w * p.x,
    baseY: h * p.y,
    radius: 2 + Math.random() * 2.5,
    opacity: isDark ? 0.3 + Math.random() * 0.4 : 0.25 + Math.random() * 0.35,
    speed: 0.3 + Math.random() * 0.4,
    amplitude: 8 + Math.random() * 15,
    phase: Math.random() * Math.PI * 2,
    color: colors[i % colors.length],
  }));
}

function createHexRings(w: number, h: number, isDark: boolean): HexRing[] {
  const isMobile = w < 768;

  return isMobile
    ? [
        { cx: w * 0.2, cy: h * 0.58, radius: 50, rotation: 0, rotationSpeed: 0.002, opacity: isDark ? 0.12 : 0.15, sides: 6 },
        { cx: w * 0.8, cy: h * 0.54, radius: 65, rotation: Math.PI / 6, rotationSpeed: -0.0015, opacity: isDark ? 0.1 : 0.12, sides: 6 },
        { cx: w * 0.5, cy: h * 0.70, radius: 80, rotation: 0, rotationSpeed: 0.001, opacity: isDark ? 0.08 : 0.1, sides: 6 },
        { cx: w * 0.15, cy: h * 0.78, radius: 40, rotation: Math.PI / 4, rotationSpeed: 0.003, opacity: isDark ? 0.1 : 0.12, sides: 4 },
        { cx: w * 0.85, cy: h * 0.74, radius: 45, rotation: 0, rotationSpeed: -0.002, opacity: isDark ? 0.09 : 0.11, sides: 3 },
        { cx: w * 0.35, cy: h * 0.52, radius: 30, rotation: Math.PI / 3, rotationSpeed: 0.0025, opacity: isDark ? 0.11 : 0.13, sides: 6 },
        { cx: w * 0.65, cy: h * 0.82, radius: 48, rotation: 0, rotationSpeed: -0.0018, opacity: isDark ? 0.07 : 0.09, sides: 4 },
      ]
    : [
        { cx: w * 0.2, cy: h * 0.90, radius: 60, rotation: 0, rotationSpeed: 0.002, opacity: isDark ? 0.12 : 0.15, sides: 6 },
        { cx: w * 0.8, cy: h * 0.88, radius: 80, rotation: Math.PI / 6, rotationSpeed: -0.0015, opacity: isDark ? 0.1 : 0.12, sides: 6 },
        { cx: w * 0.5, cy: h * 0.95, radius: 100, rotation: 0, rotationSpeed: 0.001, opacity: isDark ? 0.08 : 0.1, sides: 6 },
        { cx: w * 0.15, cy: h * 0.98, radius: 45, rotation: Math.PI / 4, rotationSpeed: 0.003, opacity: isDark ? 0.1 : 0.12, sides: 4 },
        { cx: w * 0.85, cy: h * 0.97, radius: 50, rotation: 0, rotationSpeed: -0.002, opacity: isDark ? 0.09 : 0.11, sides: 3 },
        { cx: w * 0.35, cy: h * 0.87, radius: 35, rotation: Math.PI / 3, rotationSpeed: 0.0025, opacity: isDark ? 0.11 : 0.13, sides: 6 },
        { cx: w * 0.65, cy: h * 0.99, radius: 55, rotation: 0, rotationSpeed: -0.0018, opacity: isDark ? 0.07 : 0.09, sides: 4 },
      ];
}

function drawPolygon(ctx: CanvasRenderingContext2D, cx: number, cy: number, radius: number, sides: number, rotation: number) {
  ctx.beginPath();
  for (let i = 0; i <= sides; i++) {
    const angle = (i * Math.PI * 2) / sides + rotation;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
}

function animateCanvas(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  isDark: boolean
) {
  let time = 0;
  let animationId: number;

  const nodes = createNodes(canvas.width, canvas.height, isDark);
  const hexRings = createHexRings(canvas.width, canvas.height, isDark);
  const connectionDist = 220;

  const baseColor = isDark ? "167,139,250" : "99,102,241";
  const lineColor = isDark ? "139,92,246" : "79,70,229";

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    time += 0.016;

    // Update node positions
    nodes.forEach((n) => {
      n.x = n.baseX + Math.sin(time * n.speed + n.phase) * n.amplitude;
      n.y = n.baseY + Math.cos(time * n.speed * 0.7 + n.phase) * n.amplitude * 0.6;
    });

    // Draw hex/polygon rings
    hexRings.forEach((h) => {
      h.rotation += h.rotationSpeed;

      // Outer glow ring
      drawPolygon(ctx, h.cx, h.cy, h.radius * 1.05, h.sides, h.rotation);
      ctx.shadowColor = `rgba(${baseColor}, ${h.opacity * 0.6})`;
      ctx.shadowBlur = 15;
      ctx.strokeStyle = `rgba(${baseColor}, ${h.opacity * 0.3})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Main ring
      drawPolygon(ctx, h.cx, h.cy, h.radius, h.sides, h.rotation);
      ctx.strokeStyle = `rgba(${baseColor}, ${h.opacity})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Inner ring
      drawPolygon(ctx, h.cx, h.cy, h.radius * 0.6, h.sides, h.rotation + Math.PI / h.sides);
      ctx.strokeStyle = `rgba(${baseColor}, ${h.opacity * 0.5})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // Center dot
      ctx.beginPath();
      ctx.arc(h.cx, h.cy, 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${baseColor}, ${h.opacity * 0.8})`;
      ctx.fill();
    });

    // Draw connections between nearby nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < connectionDist) {
          const alpha = (1 - dist / connectionDist) * 0.2;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(${lineColor}, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    nodes.forEach((n) => {
      // Outer glow
      const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius * 8);
      glow.addColorStop(0, `rgba(${n.color}, ${n.opacity * 0.4})`);
      glow.addColorStop(0.5, `rgba(${n.color}, ${n.opacity * 0.1})`);
      glow.addColorStop(1, `rgba(${n.color}, 0)`);
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius * 8, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      // Core dot
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
      ctx.shadowColor = `rgba(${n.color}, ${n.opacity})`;
      ctx.shadowBlur = 8;
      ctx.fillStyle = `rgba(${n.color}, ${n.opacity * 0.9})`;
      ctx.fill();
      ctx.shadowBlur = 0;
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
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
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
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
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
