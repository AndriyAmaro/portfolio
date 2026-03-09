"use client";

import { useEffect, useRef } from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  type: "dot" | "token" | "bracket";
  value?: string;
  rotation?: number;
  rotationSpeed?: number;
}

interface CodeStream {
  x: number;
  y: number;
  words: string[];
  speed: number;
  opacity: number;
  fontSize: number;
}

interface FloatingToken {
  x: number;
  y: number;
  text: string;
  opacity: number;
  pulsePhase: number;
  pulseSpeed: number;
  size: number;
  speedX: number;
  speedY: number;
}

interface CircuitNode {
  x: number;
  y: number;
  connections: number[];
  pulseProgress: number;
  active: boolean;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
const CODE_KEYWORDS = [
  "const", "async", "await", "return", "import", "export", "interface",
  "type", "function", "class", "extends", "implements", "readonly",
  "Promise", "void", "string", "number", "boolean", "null", "undefined",
  "if", "else", "for", "map", "filter", "reduce", "useState", "useEffect",
  "useRef", "useMemo", "fetch", "try", "catch", "throw", "new", "this",
  "super", "yield", "from", "default", "switch", "case", "break",
];

const TECH_LABELS = [
  "React", "Next.js", "TypeScript", "Node.js", "Prisma", "Tailwind",
  "Vitest", "Git", "CI/CD", "REST", "API", "SSR", "RSC", "CSS",
  "HTML", "Docker", "Redis", "PostgreSQL", "Zod", "tRPC",
  "Framer", "Vercel", "ESLint", "pnpm", "Turbo",
];

const CODE_SYMBOLS = [
  "</>", "{ }", "=>", "( )", "[ ]", "&&", "||", "??", "...",
  "?.","::","#", "/**/"," ;", "!=", "===", "++", "--",
];

export function FuturisticBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // -----------------------------------------------------------------------
    // Particles · dots + floating tech labels + code brackets
    // -----------------------------------------------------------------------
    const particles: Particle[] = [];
    const particleCount = 80;

    for (let i = 0; i < particleCount; i++) {
      const rand = Math.random();
      let type: Particle["type"];
      let value: string | undefined;

      if (rand > 0.75) {
        type = "token";
        value = TECH_LABELS[Math.floor(Math.random() * TECH_LABELS.length)];
      } else if (rand > 0.55) {
        type = "bracket";
        value = CODE_SYMBOLS[Math.floor(Math.random() * CODE_SYMBOLS.length)];
      } else {
        type = "dot";
      }

      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: type === "dot" ? Math.random() * 3 + 1 : 12,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.5 + 0.2,
        type,
        value,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.01,
      });
    }

    // -----------------------------------------------------------------------
    // Code Streams · real keywords falling like gentle rain
    // -----------------------------------------------------------------------
    const codeStreams: CodeStream[] = [];
    const streamCount = 20;

    for (let i = 0; i < streamCount; i++) {
      const words: string[] = [];
      const length = Math.floor(Math.random() * 8) + 4;
      for (let j = 0; j < length; j++) {
        words.push(CODE_KEYWORDS[Math.floor(Math.random() * CODE_KEYWORDS.length)]);
      }
      codeStreams.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        words,
        speed: Math.random() * 1.2 + 0.4,
        opacity: Math.random() * 0.35 + 0.1,
        fontSize: Math.random() > 0.7 ? 14 : 12,
      });
    }

    // -----------------------------------------------------------------------
    // Floating Code Tokens · replacing hexagons
    // -----------------------------------------------------------------------
    const floatingTokens: FloatingToken[] = [];
    const tokenTexts = [
      "<Component />", "{ props }", "=> {}", "fn()", "type T",
      "export default", "async/await", "use client", "interface",
      "import { }", "return ()", "useState<T>", ".map()", ".filter()",
      "Promise<void>", "Record<K,V>", "Partial<T>", "keyof",
      "extends", "implements", "readonly", "?.optional",
    ];

    for (let i = 0; i < 18; i++) {
      floatingTokens.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        text: tokenTexts[i % tokenTexts.length],
        opacity: Math.random() * 0.2 + 0.08,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        size: Math.random() > 0.5 ? 15 : 13,
        speedX: (Math.random() - 0.5) * 0.15,
        speedY: (Math.random() - 0.5) * 0.15,
      });
    }

    // -----------------------------------------------------------------------
    // Circuit Board Traces · dense PCB radiating from center
    // -----------------------------------------------------------------------
    const circuitNodes: CircuitNode[] = [];
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Center cluster · denser near middle
    for (let i = 0; i < 15; i++) {
      const angle = (Math.PI * 2 / 15) * i + Math.random() * 0.3;
      const dist = Math.random() * 150 + 60;
      circuitNodes.push({
        x: centerX + Math.cos(angle) * dist,
        y: centerY + Math.sin(angle) * dist,
        connections: [],
        pulseProgress: Math.random(),
        active: true,
      });
    }

    // Mid-ring nodes
    for (let i = 0; i < 20; i++) {
      const angle = (Math.PI * 2 / 20) * i + Math.random() * 0.2;
      const dist = Math.random() * 200 + 200;
      circuitNodes.push({
        x: centerX + Math.cos(angle) * dist,
        y: centerY + Math.sin(angle) * dist,
        connections: [],
        pulseProgress: Math.random(),
        active: Math.random() > 0.3,
      });
    }

    // Outer ring · spread across screen
    for (let i = 0; i < 30; i++) {
      const angle = (Math.PI * 2 / 30) * i + Math.random() * 0.15;
      const dist = Math.random() * 300 + 400;
      circuitNodes.push({
        x: centerX + Math.cos(angle) * dist,
        y: centerY + Math.sin(angle) * dist,
        connections: [],
        pulseProgress: Math.random(),
        active: Math.random() > 0.4,
      });
    }

    // Edge nodes
    for (let i = 0; i < 20; i++) {
      circuitNodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        connections: [],
        pulseProgress: Math.random(),
        active: Math.random() > 0.5,
      });
    }

    // Connect nearby nodes (more connections for denser look)
    circuitNodes.forEach((node, i) => {
      circuitNodes.forEach((other, j) => {
        if (i !== j) {
          const dist = Math.sqrt((node.x - other.x) ** 2 + (node.y - other.y) ** 2);
          if (dist < 250 && node.connections.length < 3) {
            node.connections.push(j);
          }
        }
      });
    });

    // -----------------------------------------------------------------------
    // Animation Loop
    // -----------------------------------------------------------------------
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.016;

      const isDark = !document.documentElement.classList.contains("light-mode");
      const primaryColor = isDark ? "99, 102, 241" : "79, 70, 229";
      const accentColor = isDark ? "139, 92, 246" : "124, 58, 237";
      const cyanColor = isDark ? "34, 211, 238" : "6, 182, 212";

      // --- PCB Circuit Traces · dense radiating from center ---
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Center glow burst
      const centerGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 200);
      centerGrad.addColorStop(0, `rgba(${cyanColor}, 0.12)`);
      centerGrad.addColorStop(0.5, `rgba(${primaryColor}, 0.04)`);
      centerGrad.addColorStop(1, `rgba(${primaryColor}, 0)`);
      ctx.fillStyle = centerGrad;
      ctx.fillRect(cx - 200, cy - 200, 400, 400);

      circuitNodes.forEach((node) => {
        node.connections.forEach((connIndex) => {
          const other = circuitNodes[connIndex];

          // Right-angle midpoint (PCB trace style)
          const midX = other.x;
          const midY = node.y;

          // Distance from center affects brightness
          const distFromCenter = Math.sqrt((node.x - cx) ** 2 + (node.y - cy) ** 2);
          const maxDist = Math.sqrt(cx * cx + cy * cy);
          const centerFade = 1 - (distFromCenter / maxDist) * 0.6;

          // Trace line with breathing
          const traceAlpha = (0.1 + Math.sin(time * 1.5 + node.pulseProgress * 10) * 0.05) * centerFade;

          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(midX, midY);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = `rgba(${primaryColor}, ${traceAlpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Pulse traveling along the trace
          const pulsePos = (time * 0.4 + node.pulseProgress) % 1;
          const seg1Len = Math.abs(midX - node.x);
          const seg2Len = Math.abs(other.y - midY);
          const totalLen = seg1Len + seg2Len;
          const pulseDistRaw = pulsePos * totalLen;

          let pulseX: number, pulseY: number;
          if (pulseDistRaw <= seg1Len) {
            const t = seg1Len > 0 ? pulseDistRaw / seg1Len : 0;
            pulseX = node.x + (midX - node.x) * t;
            pulseY = node.y;
          } else {
            const t = seg2Len > 0 ? (pulseDistRaw - seg1Len) / seg2Len : 0;
            pulseX = midX;
            pulseY = midY + (other.y - midY) * Math.min(t, 1);
          }

          // Pulse dot (bright)
          ctx.beginPath();
          ctx.arc(pulseX, pulseY, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${cyanColor}, 0.95)`;
          ctx.fill();

          // Pulse outer glow
          ctx.beginPath();
          ctx.arc(pulseX, pulseY, 8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${cyanColor}, 0.08)`;
          ctx.fill();

          // Right-angle corner dot
          ctx.beginPath();
          ctx.arc(midX, midY, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${primaryColor}, 0.25)`;
          ctx.fill();
        });

        // Node intersection point · bright dot
        const nodeDist = Math.sqrt((node.x - cx) ** 2 + (node.y - cy) ** 2);
        const nodeGlow = Math.max(0.3, 1 - nodeDist / 600);
        const nodePulse = 0.5 + Math.sin(time * 3 + node.pulseProgress * 20) * 0.5;

        // Outer glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, 10, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cyanColor}, ${0.06 * nodeGlow * nodePulse})`;
        ctx.fill();

        // Mid glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cyanColor}, ${0.15 * nodeGlow})`;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cyanColor}, ${0.8 * nodeGlow})`;
        ctx.fill();
      });

      // --- Floating Code Tokens (replaces hexagons) ---
      floatingTokens.forEach((token) => {
        const pulse = Math.sin(time * token.pulseSpeed * 60 + token.pulsePhase) * 0.5 + 0.5;
        const alpha = token.opacity * (0.5 + pulse * 0.5);

        ctx.font = `600 ${token.size}px "Geist Mono", "SF Mono", "Fira Code", monospace`;
        ctx.fillStyle = `rgba(${primaryColor}, ${alpha})`;
        ctx.fillText(token.text, token.x, token.y);

        // Slow drift
        token.x += token.speedX;
        token.y += token.speedY;

        if (token.x < -100) token.x = canvas.width + 50;
        if (token.x > canvas.width + 100) token.x = -50;
        if (token.y < -30) token.y = canvas.height + 30;
        if (token.y > canvas.height + 30) token.y = -30;
      });

      // --- Code Streams (replaces Matrix katakana) ---
      codeStreams.forEach((stream) => {
        stream.words.forEach((word, i) => {
          const y = stream.y + i * 24;
          if (y > 0 && y < canvas.height) {
            const wordOpacity = stream.opacity * (1 - i / stream.words.length);
            ctx.font = `500 ${stream.fontSize}px "Geist Mono", "SF Mono", "Fira Code", monospace`;

            if (i === 0) {
              ctx.fillStyle = `rgba(${cyanColor}, ${wordOpacity * 2})`;
            } else if (i === 1) {
              ctx.fillStyle = `rgba(${accentColor}, ${wordOpacity * 1.5})`;
            } else {
              ctx.fillStyle = `rgba(${primaryColor}, ${wordOpacity})`;
            }
            ctx.fillText(word, stream.x, y);
          }
        });

        stream.y += stream.speed;
        if (stream.y > canvas.height + stream.words.length * 24) {
          stream.y = -stream.words.length * 24;
          stream.x = Math.random() * canvas.width;
          // Refresh words
          for (let j = 0; j < stream.words.length; j++) {
            stream.words[j] = CODE_KEYWORDS[Math.floor(Math.random() * CODE_KEYWORDS.length)];
          }
        }
      });

      // --- Particles · dots + tech labels + code brackets ---
      particles.forEach((particle) => {
        if (particle.type === "token" && particle.value) {
          ctx.font = `700 11px "Geist Mono", "SF Mono", monospace`;
          ctx.fillStyle = `rgba(${accentColor}, ${particle.opacity * 0.6})`;
          ctx.fillText(particle.value, particle.x, particle.y);
        } else if (particle.type === "bracket" && particle.value) {
          ctx.font = `600 14px "Geist Mono", "SF Mono", monospace`;
          ctx.fillStyle = `rgba(${cyanColor}, ${particle.opacity * 0.5})`;
          ctx.fillText(particle.value, particle.x, particle.y);
        } else {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${primaryColor}, ${particle.opacity})`;
          ctx.fill();
        }

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < -50) particle.x = canvas.width + 50;
        if (particle.x > canvas.width + 50) particle.x = -50;
        if (particle.y < -20) particle.y = canvas.height + 20;
        if (particle.y > canvas.height + 20) particle.y = -20;
      });

      // --- Scan line effect ---
      const scanY = (time * 80) % (canvas.height + 150) - 75;
      const scanGradient = ctx.createLinearGradient(0, scanY - 75, 0, scanY + 75);
      scanGradient.addColorStop(0, "rgba(34, 211, 238, 0)");
      scanGradient.addColorStop(0.5, "rgba(34, 211, 238, 0.06)");
      scanGradient.addColorStop(1, "rgba(34, 211, 238, 0)");
      ctx.fillStyle = scanGradient;
      ctx.fillRect(0, scanY - 75, canvas.width, 150);

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      {/* Main Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          opacity: 1,
          maskImage: "radial-gradient(ellipse 40% 40% at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.45) 30%, rgba(0,0,0,1) 50%, rgba(0,0,0,1) 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 40% 40% at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.45) 30%, rgba(0,0,0,1) 50%, rgba(0,0,0,1) 100%)",
        }}
      />

      {/* Grid Pattern - Tech Circuit */}
      <div
        className="absolute inset-0 z-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Diagonal Lines */}
      <div
        className="absolute inset-0 z-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 120px,
              rgba(99, 102, 241, 0.4) 120px,
              rgba(99, 102, 241, 0.4) 122px
            )
          `,
        }}
      />

      {/* Gradient Orbs - Enhanced */}
      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[var(--primary)]/10 rounded-full blur-[150px] animate-pulse-slow" />
      <div className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-cyan-500/8 rounded-full blur-[120px] animate-pulse-slow animation-delay-2000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[var(--secondary)]/8 rounded-full blur-[180px]" />
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-400/8 rounded-full blur-[100px] animate-pulse-slow animation-delay-4000" />

      {/* Corner glows - top */}
      <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-violet-500/15 rounded-full blur-[140px] animate-pulse-slow" />
      <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-indigo-500/12 rounded-full blur-[140px] animate-pulse-slow animation-delay-2000" />

      {/* Corner glows - bottom */}
      <div className="absolute -bottom-20 -left-20 w-[450px] h-[450px] bg-indigo-500/12 rounded-full blur-[130px] animate-pulse-slow animation-delay-4000" />
      <div className="absolute -bottom-20 -right-20 w-[450px] h-[450px] bg-violet-500/15 rounded-full blur-[130px] animate-pulse-slow" />

      {/* Lateral glows */}
      <div className="absolute top-1/3 -left-10 w-[350px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse-slow animation-delay-2000" />
      <div className="absolute bottom-1/3 -right-10 w-[350px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse-slow animation-delay-4000" />

      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-48 h-48 border-l-2 border-t-2 border-[var(--primary)]/30 rounded-tl-3xl" />
      <div className="absolute top-0 right-0 w-48 h-48 border-r-2 border-t-2 border-[var(--primary)]/30 rounded-tr-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 border-l-2 border-b-2 border-[var(--primary)]/30 rounded-bl-3xl" />
      <div className="absolute bottom-0 right-0 w-48 h-48 border-r-2 border-b-2 border-[var(--primary)]/30 rounded-br-3xl" />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-radial-gradient z-0" />

      {/* Vignette effect */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.1) 100%)",
        }}
      />
    </>
  );
}
