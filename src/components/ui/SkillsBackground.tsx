"use client";

import { useEffect, useRef } from "react";

interface HexNode {
  x: number;
  y: number;
  size: number;
  opacity: number;
  pulsePhase: number;
  pulseSpeed: number;
  connections: number[];
}

interface DataParticle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  speed: number;
  opacity: number;
  size: number;
  progress: number;
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

    let animationId: number;
    let time = 0;

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create hexagonal nodes
    const hexNodes: HexNode[] = [];

    // Top area nodes (where title and stats are)
    const topNodeCount = 12;
    for (let i = 0; i < topNodeCount; i++) {
      hexNodes.push({
        x: canvas.width * 0.05 + Math.random() * canvas.width * 0.9, // Wide spread
        y: Math.random() * canvas.height * 0.45, // Top 45% of canvas
        size: 18 + Math.random() * 28,
        opacity: 0.12 + Math.random() * 0.18,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.12 + Math.random() * 0.2,
        connections: [],
      });
    }

    // Middle area nodes (transition zone)
    const middleNodeCount = 8;
    for (let i = 0; i < middleNodeCount; i++) {
      hexNodes.push({
        x: Math.random() * canvas.width,
        y: canvas.height * 0.35 + Math.random() * canvas.height * 0.3, // Middle 30%
        size: 15 + Math.random() * 25,
        opacity: 0.1 + Math.random() * 0.15,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.15 + Math.random() * 0.2,
        connections: [],
      });
    }

    // Bottom area nodes (where category cards are)
    const bottomNodeCount = 14;
    for (let i = 0; i < bottomNodeCount; i++) {
      hexNodes.push({
        x: canvas.width * 0.1 + Math.random() * canvas.width * 0.8, // Spread across width
        y: canvas.height * 0.55 + Math.random() * canvas.height * 0.45, // Bottom 45% of canvas
        size: 18 + Math.random() * 30, // Slightly larger for visibility
        opacity: 0.12 + Math.random() * 0.18, // Slightly more visible
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.12 + Math.random() * 0.18,
        connections: [],
      });
    }

    // Very bottom nodes (where "Currently exploring" badge is)
    const veryBottomNodeCount = 10;
    for (let i = 0; i < veryBottomNodeCount; i++) {
      hexNodes.push({
        x: canvas.width * 0.15 + Math.random() * canvas.width * 0.7, // Centered spread
        y: canvas.height * 0.82 + Math.random() * canvas.height * 0.18, // Last 18% of canvas
        size: 20 + Math.random() * 35, // Larger hexagons
        opacity: 0.15 + Math.random() * 0.2, // More visible
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.1 + Math.random() * 0.15,
        connections: [],
      });
    }

    // Create connections between nearby nodes
    hexNodes.forEach((node, i) => {
      hexNodes.forEach((other, j) => {
        if (i !== j) {
          const dist = Math.sqrt(
            Math.pow(node.x - other.x, 2) + Math.pow(node.y - other.y, 2)
          );
          if (dist < 300 && node.connections.length < 3) {
            node.connections.push(j);
          }
        }
      });
    });

    // Create floating data particles
    const particles: DataParticle[] = [];
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
      const startNode = hexNodes[Math.floor(Math.random() * hexNodes.length)];
      const endNode = hexNodes[Math.floor(Math.random() * hexNodes.length)];
      particles.push({
        x: startNode.x,
        y: startNode.y,
        targetX: endNode.x,
        targetY: endNode.y,
        speed: 0.0008 + Math.random() * 0.0012,
        opacity: 0.3 + Math.random() * 0.4,
        size: 2 + Math.random() * 3,
        progress: Math.random(),
      });
    }

    const drawHexagon = (x: number, y: number, size: number, opacity: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const px = x + size * Math.cos(angle);
        const py = y + size * Math.sin(angle);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.016;

      // Draw connections between nodes
      hexNodes.forEach((node) => {
        node.connections.forEach((connIndex) => {
          const other = hexNodes[connIndex];
          const gradient = ctx.createLinearGradient(node.x, node.y, other.x, other.y);
          gradient.addColorStop(0, `rgba(139, 92, 246, ${node.opacity * 0.5})`);
          gradient.addColorStop(0.5, `rgba(99, 102, 241, ${node.opacity * 0.3})`);
          gradient.addColorStop(1, `rgba(139, 92, 246, ${other.opacity * 0.5})`);

          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1;
          ctx.stroke();
        });
      });

      // Draw hexagonal nodes with pulse effect
      hexNodes.forEach((node) => {
        const pulse = Math.sin(time * node.pulseSpeed + node.pulsePhase) * 0.3 + 0.7;
        const currentOpacity = node.opacity * pulse;
        const currentSize = node.size * (0.9 + pulse * 0.1);

        drawHexagon(node.x, node.y, currentSize, currentOpacity);

        // Inner glow
        const glowGradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, currentSize * 1.5
        );
        glowGradient.addColorStop(0, `rgba(139, 92, 246, ${currentOpacity * 0.3})`);
        glowGradient.addColorStop(1, `rgba(139, 92, 246, 0)`);

        ctx.beginPath();
        ctx.arc(node.x, node.y, currentSize * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = glowGradient;
        ctx.fill();
      });

      // Draw and update data particles
      particles.forEach((particle) => {
        particle.progress += particle.speed;
        if (particle.progress >= 1) {
          particle.progress = 0;
          const startNode = hexNodes[Math.floor(Math.random() * hexNodes.length)];
          const endNode = hexNodes[Math.floor(Math.random() * hexNodes.length)];
          particle.x = startNode.x;
          particle.y = startNode.y;
          particle.targetX = endNode.x;
          particle.targetY = endNode.y;
        }

        const currentX = particle.x + (particle.targetX - particle.x) * particle.progress;
        const currentY = particle.y + (particle.targetY - particle.y) * particle.progress;

        // Particle glow
        const particleGradient = ctx.createRadialGradient(
          currentX, currentY, 0,
          currentX, currentY, particle.size * 3
        );
        particleGradient.addColorStop(0, `rgba(34, 211, 238, ${particle.opacity})`);
        particleGradient.addColorStop(0.5, `rgba(99, 102, 241, ${particle.opacity * 0.5})`);
        particleGradient.addColorStop(1, `rgba(99, 102, 241, 0)`);

        ctx.beginPath();
        ctx.arc(currentX, currentY, particle.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = particleGradient;
        ctx.fill();

        // Particle core
        ctx.beginPath();
        ctx.arc(currentX, currentY, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 238, ${particle.opacity})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
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
        style={{ opacity: 0.85 }}
      />

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

    let animationId: number;
    let time = 0;

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create hexagonal nodes
    const hexNodes: HexNode[] = [];

    // Top area nodes (where title and stats are)
    const topNodeCount = 10;
    for (let i = 0; i < topNodeCount; i++) {
      hexNodes.push({
        x: canvas.width * 0.05 + Math.random() * canvas.width * 0.9, // Wide spread
        y: Math.random() * canvas.height * 0.45, // Top 45% of canvas
        size: 14 + Math.random() * 24,
        opacity: 0.18 + Math.random() * 0.15,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.1 + Math.random() * 0.18,
        connections: [],
      });
    }

    // Middle area nodes (transition zone)
    const middleNodeCount = 6;
    for (let i = 0; i < middleNodeCount; i++) {
      hexNodes.push({
        x: Math.random() * canvas.width,
        y: canvas.height * 0.35 + Math.random() * canvas.height * 0.3, // Middle 30%
        size: 12 + Math.random() * 20,
        opacity: 0.15 + Math.random() * 0.15,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.12 + Math.random() * 0.18,
        connections: [],
      });
    }

    // Bottom area nodes (where category cards are)
    const bottomNodeCount = 12;
    for (let i = 0; i < bottomNodeCount; i++) {
      hexNodes.push({
        x: canvas.width * 0.1 + Math.random() * canvas.width * 0.8, // Spread across width
        y: canvas.height * 0.55 + Math.random() * canvas.height * 0.45, // Bottom 45% of canvas
        size: 14 + Math.random() * 24, // Slightly larger for visibility
        opacity: 0.18 + Math.random() * 0.15, // Slightly more visible
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.1 + Math.random() * 0.15,
        connections: [],
      });
    }

    // Very bottom nodes (where "Currently exploring" badge is)
    const veryBottomNodeCount = 8;
    for (let i = 0; i < veryBottomNodeCount; i++) {
      hexNodes.push({
        x: canvas.width * 0.15 + Math.random() * canvas.width * 0.7, // Centered spread
        y: canvas.height * 0.82 + Math.random() * canvas.height * 0.18, // Last 18% of canvas
        size: 16 + Math.random() * 28, // Larger hexagons
        opacity: 0.2 + Math.random() * 0.18, // More visible
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.08 + Math.random() * 0.12,
        connections: [],
      });
    }

    // Create connections
    hexNodes.forEach((node, i) => {
      hexNodes.forEach((other, j) => {
        if (i !== j) {
          const dist = Math.sqrt(
            Math.pow(node.x - other.x, 2) + Math.pow(node.y - other.y, 2)
          );
          if (dist < 280 && node.connections.length < 3) {
            node.connections.push(j);
          }
        }
      });
    });

    // Create floating data particles
    const particles: DataParticle[] = [];
    const particleCount = 25;

    for (let i = 0; i < particleCount; i++) {
      const startNode = hexNodes[Math.floor(Math.random() * hexNodes.length)];
      const endNode = hexNodes[Math.floor(Math.random() * hexNodes.length)];
      particles.push({
        x: startNode.x,
        y: startNode.y,
        targetX: endNode.x,
        targetY: endNode.y,
        speed: 0.0007 + Math.random() * 0.001,
        opacity: 0.4 + Math.random() * 0.4,
        size: 2 + Math.random() * 2,
        progress: Math.random(),
      });
    }

    const drawHexagon = (x: number, y: number, size: number, opacity: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const px = x + size * Math.cos(angle);
        const py = y + size * Math.sin(angle);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(79, 70, 229, ${opacity})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.016;

      // Draw connections
      hexNodes.forEach((node) => {
        node.connections.forEach((connIndex) => {
          const other = hexNodes[connIndex];
          const gradient = ctx.createLinearGradient(node.x, node.y, other.x, other.y);
          gradient.addColorStop(0, `rgba(99, 102, 241, ${node.opacity * 0.4})`);
          gradient.addColorStop(0.5, `rgba(79, 70, 229, ${node.opacity * 0.2})`);
          gradient.addColorStop(1, `rgba(99, 102, 241, ${other.opacity * 0.4})`);

          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1;
          ctx.stroke();
        });
      });

      // Draw hexagonal nodes
      hexNodes.forEach((node) => {
        const pulse = Math.sin(time * node.pulseSpeed + node.pulsePhase) * 0.3 + 0.7;
        const currentOpacity = node.opacity * pulse;
        const currentSize = node.size * (0.9 + pulse * 0.1);

        drawHexagon(node.x, node.y, currentSize, currentOpacity);

        // Inner glow
        const glowGradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, currentSize * 1.5
        );
        glowGradient.addColorStop(0, `rgba(99, 102, 241, ${currentOpacity * 0.2})`);
        glowGradient.addColorStop(1, `rgba(99, 102, 241, 0)`);

        ctx.beginPath();
        ctx.arc(node.x, node.y, currentSize * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = glowGradient;
        ctx.fill();
      });

      // Draw particles
      particles.forEach((particle) => {
        particle.progress += particle.speed;
        if (particle.progress >= 1) {
          particle.progress = 0;
          const startNode = hexNodes[Math.floor(Math.random() * hexNodes.length)];
          const endNode = hexNodes[Math.floor(Math.random() * hexNodes.length)];
          particle.x = startNode.x;
          particle.y = startNode.y;
          particle.targetX = endNode.x;
          particle.targetY = endNode.y;
        }

        const currentX = particle.x + (particle.targetX - particle.x) * particle.progress;
        const currentY = particle.y + (particle.targetY - particle.y) * particle.progress;

        // Particle glow
        const particleGradient = ctx.createRadialGradient(
          currentX, currentY, 0,
          currentX, currentY, particle.size * 3
        );
        particleGradient.addColorStop(0, `rgba(79, 70, 229, ${particle.opacity})`);
        particleGradient.addColorStop(0.5, `rgba(99, 102, 241, ${particle.opacity * 0.4})`);
        particleGradient.addColorStop(1, `rgba(99, 102, 241, 0)`);

        ctx.beginPath();
        ctx.arc(currentX, currentY, particle.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = particleGradient;
        ctx.fill();

        // Particle core
        ctx.beginPath();
        ctx.arc(currentX, currentY, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(79, 70, 229, ${particle.opacity})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient - Light (harmonized with About section) */}
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
        style={{ opacity: 0.6 }}
      />

      {/* Gradient orbs - top (subtle, matching About section) */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-indigo-200/12 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute top-1/3 right-1/3 w-[350px] h-[350px] bg-slate-300/15 rounded-full blur-[100px] animate-pulse-slow animation-delay-2000" />

      {/* Lateral glows - top */}
      <div className="absolute top-1/3 left-0 w-[300px] h-[400px] bg-indigo-300/6 rounded-full blur-[100px] animate-pulse-slow" />
      <div className="absolute top-1/4 right-0 w-[280px] h-[350px] bg-slate-400/5 rounded-full blur-[100px] animate-pulse-slow animation-delay-4000" />

      {/* Gradient orbs - bottom (soft, harmonized) */}
      <div className="absolute bottom-0 left-1/4 w-[380px] h-[280px] bg-indigo-200/10 rounded-full blur-[100px] animate-pulse-slow animation-delay-2000" />
      <div className="absolute bottom-0 right-1/4 w-[350px] h-[250px] bg-slate-300/12 rounded-full blur-[90px] animate-pulse-slow animation-delay-4000" />
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-indigo-200/6 rounded-full blur-[110px] animate-pulse-slow" />

      {/* Lateral glows - bottom corners */}
      <div className="absolute bottom-0 left-0 w-[250px] h-[300px] bg-indigo-300/5 rounded-full blur-[90px] animate-pulse-slow animation-delay-2000" />
      <div className="absolute bottom-0 right-0 w-[250px] h-[300px] bg-slate-400/5 rounded-full blur-[90px] animate-pulse-slow animation-delay-4000" />

      {/* Extra bottom glows - where category cards are */}
      <div className="absolute -bottom-20 left-[15%] w-[300px] h-[250px] bg-indigo-200/8 rounded-full blur-[100px] animate-pulse-slow" />
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[350px] h-[230px] bg-slate-300/8 rounded-full blur-[110px] animate-pulse-slow animation-delay-2000" />
      <div className="absolute -bottom-20 right-[15%] w-[300px] h-[250px] bg-indigo-200/8 rounded-full blur-[100px] animate-pulse-slow animation-delay-4000" />

      {/* Top fade - harmonized with About section */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.85) 0%, transparent 18%)",
        }}
      />
    </div>
  );
}
