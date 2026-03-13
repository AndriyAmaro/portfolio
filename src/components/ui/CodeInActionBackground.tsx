"use client";

import { useEffect, useRef, useState } from "react";

// Code characters that make sense for a dev portfolio
const CODE_CHARS = [
  "const", "let", "async", "await", "=>", "return", "import", "export",
  "function", "class", "interface", "type", "if", "else", "for", "map",
  "Promise", "void", "string", "number", "boolean", "null", "true", "false",
  "{", "}", "(", ")", "[", "]", ";", ":", "=", "&&", "||", "!==", "===",
  "<T>", "tsx", "ts", "React", "Node", "API", "GET", "POST", "ws://",
  ".then", ".catch", "try", "new", "this", "super", "extends", "implements",
  "private", "readonly", "enum", "switch", "case", "break", "throw",
  "@", "#", "$", "%", "0x", ">>", "<<", "??", "?.", "...",
];

interface FallingColumn {
  x: number;
  chars: string[];
  y: number;
  speed: number;
  opacity: number;
  fontSize: number;
  charIndex: number;
  charTimer: number;
  charInterval: number;
  trailLength: number;
}

function createColumn(x: number, height: number, opacity: number, fontSize: number): FallingColumn {
  const chars: string[] = [];
  const trailLength = 8 + Math.floor(Math.random() * 14);
  for (let j = 0; j < trailLength; j++) {
    chars.push(CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)]);
  }
  // Stagger start positions across full 2x height so columns loop seamlessly
  return {
    x,
    chars,
    y: Math.random() * height * 2 - height,
    speed: 0.5,
    opacity,
    fontSize,
    charIndex: 0,
    charTimer: 0,
    charInterval: 3 + Math.random() * 5,
    trailLength,
  };
}

function createAllColumns(width: number, height: number): FallingColumn[] {
  const columns: FallingColumn[] = [];

  // --- Lateral columns (left + right zones, ~22% each side) ---
  const zoneWidth = Math.min(width * 0.22, 280);
  const lateralSpacing = 18;
  const lateralCount = Math.floor(zoneWidth / lateralSpacing);

  for (let i = 0; i < lateralCount; i++) {
    const leftX = (i / lateralCount) * zoneWidth + Math.random() * 10;
    const rightX = width - zoneWidth + (i / lateralCount) * zoneWidth + Math.random() * 10;
    const opacity = 0.35 + Math.random() * 0.25;
    const fontSize = 10 + Math.floor(Math.random() * 3);
    columns.push(createColumn(leftX, height, opacity, fontSize));
    columns.push(createColumn(rightX, height, opacity, fontSize));
  }

  // --- Center columns (above each card, more subtle) ---
  const centerPositions = [
    width * 0.22, width * 0.30, width * 0.38, width * 0.46,  // above code editor
    width * 0.56, width * 0.64, width * 0.72, width * 0.80,  // above commit log
  ];
  for (const x of centerPositions) {
    columns.push(createColumn(
      x + (Math.random() - 0.5) * 20,
      height,
      0.20 + Math.random() * 0.15,
      9 + Math.floor(Math.random() * 2),
    ));
  }

  return columns;
}

function CodeRainCanvas({ isDark }: { isDark: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const columnsRef = useRef<FallingColumn[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);

      columnsRef.current = createAllColumns(rect.width, rect.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) {
        animRef.current = requestAnimationFrame(animate);
        return;
      }
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      const baseColor = isDark ? [99, 102, 241] : [79, 70, 229];   // indigo-500 / indigo-600
      const headColor = isDark ? [129, 140, 248] : [99, 102, 241]; // indigo-400 / indigo-500

      for (const col of columnsRef.current) {
        col.y += col.speed;
        col.charTimer++;

        if (col.charTimer >= col.charInterval) {
          col.charTimer = 0;
          col.charIndex = (col.charIndex + 1) % col.chars.length;
          // Occasionally swap a character for variety
          if (Math.random() < 0.3) {
            const swapIdx = Math.floor(Math.random() * col.chars.length);
            col.chars[swapIdx] = CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
          }
        }

        // Reset when fully past bottom
        if (col.y - col.trailLength * (col.fontSize + 4) > h) {
          col.y = -Math.random() * h * 0.5 - 100;
        }

        ctx.font = `${col.fontSize}px "JetBrains Mono", "Fira Code", monospace`;
        ctx.textAlign = "left";

        for (let j = 0; j < col.trailLength; j++) {
          const charY = col.y - j * (col.fontSize + 4);
          if (charY < -20 || charY > h + 20) continue;

          const charIdx = (col.charIndex + j) % col.chars.length;
          const fadeRatio = 1 - j / col.trailLength;
          const alpha = col.opacity * fadeRatio * fadeRatio;

          if (alpha < 0.01) continue;

          // Head character is brighter
          const [r, g, b] = j === 0 ? headColor : baseColor;
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;

          // Glow on head character
          if (j === 0) {
            ctx.shadowColor = `rgba(${headColor[0]}, ${headColor[1]}, ${headColor[2]}, ${alpha * 0.6})`;
            ctx.shadowBlur = isDark ? 8 : 6;
          } else {
            ctx.shadowBlur = 0;
          }

          ctx.fillText(col.chars[charIdx], col.x, charY);
        }
        ctx.shadowBlur = 0;
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 1 }}
    />
  );
}

export function CodeInActionBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient - Dark */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #0f0d1f 0%, #161331 30%, #1a1640 60%, #1e1b4b 100%)",
        }}
      />

      {/* Code rain canvas */}
      <CodeRainCanvas isDark={true} />

      {/* Gradient orbs - top */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[150px] animate-pulse-slow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[180px]" />

      {/* Corner glows - top */}
      <div className="absolute top-0 left-0 w-[400px] h-[450px] bg-violet-500/12 rounded-full blur-[130px] animate-pulse-slow" />
      <div className="absolute top-0 right-0 w-[400px] h-[450px] bg-indigo-500/10 rounded-full blur-[130px] animate-pulse-slow animation-delay-2000" />

      {/* Lateral glows - sides */}
      <div className="absolute top-1/3 left-0 w-[300px] h-[500px] bg-cyan-500/6 rounded-full blur-[100px] animate-pulse-slow animation-delay-4000" />
      <div className="absolute top-1/3 right-0 w-[300px] h-[500px] bg-cyan-500/6 rounded-full blur-[100px] animate-pulse-slow animation-delay-2000" />

      {/* Bottom orbs */}
      <div className="absolute bottom-0 left-1/4 w-[450px] h-[350px] bg-violet-500/8 rounded-full blur-[120px] animate-pulse-slow animation-delay-2000" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-indigo-500/6 rounded-full blur-[100px] animate-pulse-slow animation-delay-4000" />

      {/* Bottom corners */}
      <div className="absolute bottom-0 left-0 w-[300px] h-[400px] bg-indigo-400/6 rounded-full blur-[100px] animate-pulse-slow animation-delay-2000" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[400px] bg-violet-400/6 rounded-full blur-[100px] animate-pulse-slow animation-delay-4000" />

      {/* Center overlay for text readability - fades out the rain in the middle */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(12, 10, 29, 0.95) 0%, rgba(12, 10, 29, 0.4) 40%, transparent 70%)",
        }}
      />
    </div>
  );
}

/* Light mode version */
export function CodeInActionBackgroundLight() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient - Light */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 30%, #f1f5f9 60%, #e2e8f0 100%)",
        }}
      />

      {/* Code rain canvas */}
      <CodeRainCanvas isDark={false} />

      {/* Gradient orbs - top */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-indigo-200/12 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute top-1/3 right-1/3 w-[350px] h-[350px] bg-slate-300/15 rounded-full blur-[100px] animate-pulse-slow animation-delay-2000" />

      {/* Lateral glows - top */}
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

      {/* Center overlay for text readability */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.4) 40%, transparent 70%)",
        }}
      />

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
