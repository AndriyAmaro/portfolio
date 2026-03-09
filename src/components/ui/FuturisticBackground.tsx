"use client";

import { useEffect, useRef } from "react";

// ---------------------------------------------------------------------------
// Circuit Network Background · 3D Perspective Vanishing Point
// ---------------------------------------------------------------------------

interface CircuitLine {
  // Origin point (on screen edge)
  originX: number;
  originY: number;
  // How far toward vanishing point (0 = edge, 1 = center)
  depth: number;
  // Visual properties
  thickness: number;
  baseOpacity: number;
  // Animation
  speed: number;
  pulseOffset: number;
  // Which edge it belongs to
  edge: "left" | "right" | "top" | "bottom";
}

interface DataParticle {
  lineIndex: number;
  t: number; // position along line (0 = edge, 1 = center)
  speed: number;
  size: number;
  brightness: number;
}

interface CircuitNode {
  x: number;
  y: number;
  size: number;
  pulsePhase: number;
  connections: number[]; // indices of connected nodes
  depth: number; // 0 = near edge, 1 = near center (fainter)
}

export function FuturisticBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationId: number;
    let time = 0;
    let w = 0;
    let h = 0;
    let vpX = 0; // vanishing point X
    let vpY = 0; // vanishing point Y

    // State arrays
    let lines: CircuitLine[] = [];
    let particles: DataParticle[] = [];
    let nodes: CircuitNode[] = [];

    // -----------------------------------------------------------------
    // Resize & rebuild geometry
    // -----------------------------------------------------------------
    const buildGeometry = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      vpX = w * 0.5;
      vpY = h * 0.46;

      lines = [];
      particles = [];
      nodes = [];

      // --- Generate circuit lines from all 4 edges ---

      // Left edge lines (strongest presence)
      const leftCount = 22;
      for (let i = 0; i < leftCount; i++) {
        const t = i / (leftCount - 1);
        const y = h * 0.05 + t * h * 0.9;
        lines.push({
          originX: -10,
          originY: y + (Math.random() - 0.5) * 30,
          depth: 0.4 + Math.random() * 0.25, // how far toward center
          thickness: 0.4 + Math.random() * 1.0,
          baseOpacity: 0.08 + Math.random() * 0.18,
          speed: 0.0002 + Math.random() * 0.0004,
          pulseOffset: Math.random() * Math.PI * 2,
          edge: "left",
        });
      }

      // Right edge lines (strongest presence)
      const rightCount = 22;
      for (let i = 0; i < rightCount; i++) {
        const t = i / (rightCount - 1);
        const y = h * 0.05 + t * h * 0.9;
        lines.push({
          originX: w + 10,
          originY: y + (Math.random() - 0.5) * 30,
          depth: 0.4 + Math.random() * 0.25,
          thickness: 0.4 + Math.random() * 1.0,
          baseOpacity: 0.08 + Math.random() * 0.18,
          speed: 0.0002 + Math.random() * 0.0004,
          pulseOffset: Math.random() * Math.PI * 2,
          edge: "right",
        });
      }

      // Top edge lines (subtler)
      const topCount = 12;
      for (let i = 0; i < topCount; i++) {
        const t = i / (topCount - 1);
        const x = w * 0.1 + t * w * 0.8;
        lines.push({
          originX: x + (Math.random() - 0.5) * 40,
          originY: -10,
          depth: 0.3 + Math.random() * 0.2,
          thickness: 0.3 + Math.random() * 0.7,
          baseOpacity: 0.05 + Math.random() * 0.1,
          speed: 0.0002 + Math.random() * 0.0003,
          pulseOffset: Math.random() * Math.PI * 2,
          edge: "top",
        });
      }

      // Bottom edge lines (subtler)
      const bottomCount = 12;
      for (let i = 0; i < bottomCount; i++) {
        const t = i / (bottomCount - 1);
        const x = w * 0.1 + t * w * 0.8;
        lines.push({
          originX: x + (Math.random() - 0.5) * 40,
          originY: h + 10,
          depth: 0.3 + Math.random() * 0.2,
          thickness: 0.3 + Math.random() * 0.7,
          baseOpacity: 0.05 + Math.random() * 0.1,
          speed: 0.0002 + Math.random() * 0.0003,
          pulseOffset: Math.random() * Math.PI * 2,
          edge: "bottom",
        });
      }

      // --- Data particles traveling along lines ---
      const particleCount = 45;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          lineIndex: Math.floor(Math.random() * lines.length),
          t: Math.random(),
          speed: 0.001 + Math.random() * 0.003,
          size: 1 + Math.random() * 2,
          brightness: 0.4 + Math.random() * 0.6,
        });
      }

      // --- Circuit nodes along lines ---
      // Place nodes at various depths along the lines
      const nodePositions: { x: number; y: number; depth: number }[] = [];

      lines.forEach((line) => {
        // 1-2 nodes per line, placed at circuit-board junctions
        const nodeCount = Math.random() > 0.5 ? 2 : 1;
        for (let n = 0; n < nodeCount; n++) {
          const t = 0.15 + Math.random() * 0.5; // place in outer 65%
          const dx = vpX - line.originX;
          const dy = vpY - line.originY;
          const extent = line.depth;
          const nx = line.originX + dx * extent * t;
          const ny = line.originY + dy * extent * t;

          // Don't place too close to center
          const distToCenter = Math.sqrt((nx - vpX) ** 2 + (ny - vpY) ** 2);
          const minDist = Math.min(w, h) * 0.15;
          if (distToCenter > minDist) {
            nodePositions.push({ x: nx, y: ny, depth: t });
          }
        }
      });

      // Deduplicate nearby nodes
      const usedNodes: { x: number; y: number; depth: number }[] = [];
      nodePositions.forEach((pos) => {
        const tooClose = usedNodes.some(
          (n) => Math.sqrt((n.x - pos.x) ** 2 + (n.y - pos.y) ** 2) < 40
        );
        if (!tooClose) usedNodes.push(pos);
      });

      // Build node objects
      usedNodes.forEach((pos) => {
        nodes.push({
          x: pos.x,
          y: pos.y,
          size: 1.5 + Math.random() * 2,
          pulsePhase: Math.random() * Math.PI * 2,
          connections: [],
          depth: pos.depth,
        });
      });

      // Connect nearby nodes
      nodes.forEach((node, i) => {
        nodes.forEach((other, j) => {
          if (i >= j) return;
          const dist = Math.sqrt((node.x - other.x) ** 2 + (node.y - other.y) ** 2);
          if (dist < 180 && node.connections.length < 3) {
            node.connections.push(j);
            other.connections.push(i);
          }
        });
      });
    };

    buildGeometry();
    window.addEventListener("resize", buildGeometry);

    // -----------------------------------------------------------------
    // Render helpers
    // -----------------------------------------------------------------

    /** Get point along line from origin toward vanishing point */
    const getLinePoint = (line: CircuitLine, t: number) => {
      const dx = vpX - line.originX;
      const dy = vpY - line.originY;
      const extent = line.depth;
      return {
        x: line.originX + dx * extent * t,
        y: line.originY + dy * extent * t,
      };
    };

    // -----------------------------------------------------------------
    // Main animation loop
    // -----------------------------------------------------------------
    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.016;

      const isDark = !document.documentElement.classList.contains("light-mode");

      // Color palette
      const blue = isDark ? [99, 102, 241] : [79, 70, 229];     // indigo
      const cyan = isDark ? [34, 211, 238] : [6, 182, 212];      // cyan
      const violet = isDark ? [139, 92, 246] : [124, 58, 237];   // violet

      // ---------------------------------------------------------------
      // Layer 1 · Perspective circuit lines
      // ---------------------------------------------------------------
      lines.forEach((line) => {
        const start = getLinePoint(line, 0);
        const end = getLinePoint(line, 1);

        // Breathing animation
        const pulse = 0.6 + Math.sin(time * 1.5 + line.pulseOffset) * 0.4;
        const alpha = line.baseOpacity * pulse;

        // Gradient: bright at edge → transparent at center
        const grad = ctx.createLinearGradient(start.x, start.y, end.x, end.y);

        // Use different colors based on edge for visual variety
        const isLateral = line.edge === "left" || line.edge === "right";
        const lineColor = isLateral ? blue : violet;

        grad.addColorStop(0, `rgba(${lineColor[0]}, ${lineColor[1]}, ${lineColor[2]}, ${alpha})`);
        grad.addColorStop(0.25, `rgba(${lineColor[0]}, ${lineColor[1]}, ${lineColor[2]}, ${alpha * 0.7})`);
        grad.addColorStop(0.5, `rgba(${cyan[0]}, ${cyan[1]}, ${cyan[2]}, ${alpha * 0.35})`);
        grad.addColorStop(0.75, `rgba(${lineColor[0]}, ${lineColor[1]}, ${lineColor[2]}, ${alpha * 0.12})`);
        grad.addColorStop(1, `rgba(${lineColor[0]}, ${lineColor[1]}, ${lineColor[2]}, 0)`);

        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = line.thickness;
        ctx.stroke();
      });

      // ---------------------------------------------------------------
      // Layer 2 · Node-to-node connections (cross-links)
      // ---------------------------------------------------------------
      nodes.forEach((node) => {
        node.connections.forEach((j) => {
          const other = nodes[j];
          const avgDepth = (node.depth + other.depth) / 2;
          const edgeFactor = 1 - avgDepth; // brighter near edges
          const connAlpha = 0.04 * edgeFactor + 0.01;

          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = `rgba(${blue[0]}, ${blue[1]}, ${blue[2]}, ${connAlpha})`;
          ctx.lineWidth = 0.4;
          ctx.stroke();
        });
      });

      // ---------------------------------------------------------------
      // Layer 3 · Circuit nodes (junction points)
      // ---------------------------------------------------------------
      nodes.forEach((node) => {
        const pulse = 0.5 + Math.sin(time * 2.2 + node.pulsePhase) * 0.5;
        const edgeFactor = 1 - node.depth * 0.7; // stronger near edges

        // Outer glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size * 5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cyan[0]}, ${cyan[1]}, ${cyan[2]}, ${0.02 * pulse * edgeFactor})`;
        ctx.fill();

        // Mid ring
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cyan[0]}, ${cyan[1]}, ${cyan[2]}, ${0.06 * edgeFactor})`;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cyan[0]}, ${cyan[1]}, ${cyan[2]}, ${(0.5 + pulse * 0.4) * edgeFactor})`;
        ctx.fill();
      });

      // ---------------------------------------------------------------
      // Layer 4 · Data particles flowing along lines
      // ---------------------------------------------------------------
      particles.forEach((particle) => {
        const line = lines[particle.lineIndex];
        if (!line) return;

        // Move particle from edge toward center, then reset
        particle.t += particle.speed;
        if (particle.t > 1) {
          particle.t = 0;
          particle.lineIndex = Math.floor(Math.random() * lines.length);
          particle.speed = 0.001 + Math.random() * 0.003;
          return;
        }

        const pos = getLinePoint(line, particle.t);

        // Fade: bright near edge, dim near center · also bell curve for travel
        const travelFade = Math.sin(particle.t * Math.PI); // peak at middle of travel
        const edgeFade = 1 - particle.t * 0.8; // fade toward center
        const alpha = particle.brightness * travelFade * edgeFade;

        if (alpha < 0.02) return;

        // Glow
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, particle.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cyan[0]}, ${cyan[1]}, ${cyan[2]}, ${alpha * 0.12})`;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cyan[0]}, ${cyan[1]}, ${cyan[2]}, ${alpha * 0.9})`;
        ctx.fill();
      });

      // ---------------------------------------------------------------
      // Layer 5 · Vanishing point subtle glow
      // ---------------------------------------------------------------
      const vpPulse = 0.7 + Math.sin(time * 0.6) * 0.3;
      const vpGrad = ctx.createRadialGradient(vpX, vpY, 0, vpX, vpY, 200);
      vpGrad.addColorStop(0, `rgba(${cyan[0]}, ${cyan[1]}, ${cyan[2]}, ${0.04 * vpPulse})`);
      vpGrad.addColorStop(0.4, `rgba(${blue[0]}, ${blue[1]}, ${blue[2]}, ${0.02 * vpPulse})`);
      vpGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = vpGrad;
      ctx.beginPath();
      ctx.arc(vpX, vpY, 200, 0, Math.PI * 2);
      ctx.fill();

      // ---------------------------------------------------------------
      // Layer 6 · Horizontal scan line
      // ---------------------------------------------------------------
      const scanY = (time * 50) % (h + 200) - 100;
      const scanGrad = ctx.createLinearGradient(0, scanY - 80, 0, scanY + 80);
      scanGrad.addColorStop(0, "rgba(34, 211, 238, 0)");
      scanGrad.addColorStop(0.5, "rgba(34, 211, 238, 0.03)");
      scanGrad.addColorStop(1, "rgba(34, 211, 238, 0)");
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 80, w, 160);

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", buildGeometry);
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
          maskImage:
            "radial-gradient(ellipse 38% 38% at 50% 46%, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.35) 25%, rgba(0,0,0,0.7) 45%, rgba(0,0,0,1) 60%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 38% 38% at 50% 46%, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.35) 25%, rgba(0,0,0,0.7) 45%, rgba(0,0,0,1) 60%)",
        }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.018]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Diagonal accent lines */}
      <div
        className="absolute inset-0 z-0 opacity-[0.012]"
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

      {/* Atmospheric gradient orbs */}
      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[var(--primary)]/10 rounded-full blur-[150px] animate-pulse-slow" />
      <div className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-cyan-500/8 rounded-full blur-[120px] animate-pulse-slow animation-delay-2000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[var(--secondary)]/8 rounded-full blur-[180px]" />

      {/* Corner glows */}
      <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-violet-500/15 rounded-full blur-[140px] animate-pulse-slow" />
      <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-indigo-500/12 rounded-full blur-[140px] animate-pulse-slow animation-delay-2000" />
      <div className="absolute -bottom-20 -left-20 w-[450px] h-[450px] bg-indigo-500/12 rounded-full blur-[130px] animate-pulse-slow animation-delay-4000" />
      <div className="absolute -bottom-20 -right-20 w-[450px] h-[450px] bg-violet-500/15 rounded-full blur-[130px] animate-pulse-slow" />

      {/* Lateral depth glows · reinforce perspective sides */}
      <div className="absolute top-1/4 -left-10 w-[450px] h-[700px] bg-indigo-500/12 rounded-full blur-[140px] animate-pulse-slow animation-delay-2000" />
      <div className="absolute bottom-1/4 -right-10 w-[450px] h-[700px] bg-indigo-500/12 rounded-full blur-[140px] animate-pulse-slow animation-delay-4000" />

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-48 h-48 border-l-2 border-t-2 border-[var(--primary)]/30 rounded-tl-3xl" />
      <div className="absolute top-0 right-0 w-48 h-48 border-r-2 border-t-2 border-[var(--primary)]/30 rounded-tr-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 border-l-2 border-b-2 border-[var(--primary)]/30 rounded-bl-3xl" />
      <div className="absolute bottom-0 right-0 w-48 h-48 border-r-2 border-b-2 border-[var(--primary)]/30 rounded-br-3xl" />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-radial-gradient z-0" />

      {/* Vignette */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.12) 100%)",
        }}
      />
    </>
  );
}
