"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  type: "dot" | "binary" | "hex";
  value?: string;
  rotation?: number;
  rotationSpeed?: number;
}

interface DataStream {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  chars: string[];
}

interface Hexagon {
  x: number;
  y: number;
  size: number;
  opacity: number;
  pulsePhase: number;
  pulseSpeed: number;
}

interface CircuitNode {
  x: number;
  y: number;
  connections: number[];
  pulseProgress: number;
  active: boolean;
}

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

    // Particles with different types
    const particles: Particle[] = [];
    const particleCount = 100;
    const binaryChars = ["0", "1"];

    for (let i = 0; i < particleCount; i++) {
      const type = Math.random() > 0.7 ? "binary" : Math.random() > 0.5 ? "hex" : "dot";
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: type === "binary" ? 16 : Math.random() * 4 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.7 + 0.3,
        type,
        value: type === "binary" ? binaryChars[Math.floor(Math.random() * 2)] : undefined,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
      });
    }

    // Data streams (Matrix-like falling code)
    const dataStreams: DataStream[] = [];
    const streamCount = 25;
    const codeChars = "01アイウエオカキクケコサシスセソタチツテト</>{}[];".split("");

    for (let i = 0; i < streamCount; i++) {
      const chars: string[] = [];
      const length = Math.floor(Math.random() * 20) + 8;
      for (let j = 0; j < length; j++) {
        chars.push(codeChars[Math.floor(Math.random() * codeChars.length)]);
      }
      dataStreams.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        length,
        speed: Math.random() * 2 + 0.8,
        opacity: Math.random() * 0.5 + 0.2,
        chars,
      });
    }

    // Hexagon grid
    const hexagons: Hexagon[] = [];
    const hexSize = 60;
    const hexSpacingX = hexSize * 2;
    const hexSpacingY = hexSize * 1.8;

    for (let row = -1; row < Math.ceil(canvas.height / hexSpacingY) + 1; row++) {
      for (let col = -1; col < Math.ceil(canvas.width / hexSpacingX) + 1; col++) {
        if (Math.random() > 0.75) {
          const offsetX = row % 2 === 0 ? 0 : hexSpacingX / 2;
          hexagons.push({
            x: col * hexSpacingX + offsetX,
            y: row * hexSpacingY,
            size: hexSize * (Math.random() * 0.4 + 0.6),
            opacity: Math.random() * 0.25 + 0.1,
            pulsePhase: Math.random() * Math.PI * 2,
            pulseSpeed: Math.random() * 0.025 + 0.015,
          });
        }
      }
    }

    // Circuit nodes
    const circuitNodes: CircuitNode[] = [];
    const nodeCount = 35;

    for (let i = 0; i < nodeCount; i++) {
      circuitNodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        connections: [],
        pulseProgress: Math.random(),
        active: Math.random() > 0.5,
      });
    }

    // Connect nearby nodes
    circuitNodes.forEach((node, i) => {
      circuitNodes.forEach((other, j) => {
        if (i !== j) {
          const dist = Math.sqrt((node.x - other.x) ** 2 + (node.y - other.y) ** 2);
          if (dist < 280 && node.connections.length < 4) {
            node.connections.push(j);
          }
        }
      });
    });

    // Draw hexagon
    const drawHexagon = (x: number, y: number, size: number, opacity: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const hx = x + size * Math.cos(angle);
        const hy = y + size * Math.sin(angle);
        if (i === 0) ctx.moveTo(hx, hy);
        else ctx.lineTo(hx, hy);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.016;

      const isDark = !document.documentElement.classList.contains("light-mode");
      const primaryColor = isDark ? "99, 102, 241" : "79, 70, 229";
      const accentColor = isDark ? "139, 92, 246" : "124, 58, 237";
      const cyanColor = isDark ? "34, 211, 238" : "6, 182, 212";

      // Draw circuit connections with pulse effect
      circuitNodes.forEach((node) => {
        node.connections.forEach((connIndex) => {
          const other = circuitNodes[connIndex];
          const gradient = ctx.createLinearGradient(node.x, node.y, other.x, other.y);

          const pulsePos = (time * 0.5 + node.pulseProgress) % 1;
          gradient.addColorStop(0, `rgba(${primaryColor}, 0.05)`);
          gradient.addColorStop(Math.max(0, pulsePos - 0.1), `rgba(${primaryColor}, 0.05)`);
          gradient.addColorStop(pulsePos, `rgba(${cyanColor}, 0.4)`);
          gradient.addColorStop(Math.min(1, pulsePos + 0.1), `rgba(${primaryColor}, 0.05)`);
          gradient.addColorStop(1, `rgba(${primaryColor}, 0.05)`);

          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Draw node points
          ctx.beginPath();
          ctx.arc(node.x, node.y, 5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${cyanColor}, 0.8)`;
          ctx.fill();

          // Glow effect on nodes
          ctx.beginPath();
          ctx.arc(node.x, node.y, 8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${cyanColor}, 0.2)`;
          ctx.fill();
        });
      });

      // Draw hexagons
      hexagons.forEach((hex) => {
        const pulse = Math.sin(time * hex.pulseSpeed * 60 + hex.pulsePhase) * 0.5 + 0.5;
        drawHexagon(hex.x, hex.y, hex.size, hex.opacity * (0.5 + pulse * 0.5));
      });

      // Draw data streams
      dataStreams.forEach((stream) => {
        stream.chars.forEach((char, i) => {
          const y = stream.y + i * 20;
          if (y > 0 && y < canvas.height) {
            const charOpacity = stream.opacity * (1 - i / stream.chars.length);
            ctx.font = "bold 16px monospace";
            ctx.fillStyle = i === 0
              ? `rgba(${cyanColor}, ${charOpacity * 2.5})`
              : `rgba(${primaryColor}, ${charOpacity})`;
            ctx.fillText(char, stream.x, y);
          }
        });

        stream.y += stream.speed;
        if (stream.y > canvas.height + stream.length * 20) {
          stream.y = -stream.length * 20;
          stream.x = Math.random() * canvas.width;
        }
      });

      // Draw particles
      particles.forEach((particle) => {
        if (particle.type === "binary" && particle.value) {
          ctx.font = "bold 14px monospace";
          ctx.fillStyle = `rgba(${accentColor}, ${particle.opacity * 0.8})`;
          ctx.fillText(particle.value, particle.x, particle.y);

          // Randomly change binary value
          if (Math.random() > 0.99) {
            particle.value = binaryChars[Math.floor(Math.random() * 2)];
          }
        } else if (particle.type === "hex") {
          ctx.save();
          ctx.translate(particle.x, particle.y);
          ctx.rotate(particle.rotation || 0);

          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            const hx = particle.size * 3 * Math.cos(angle);
            const hy = particle.size * 3 * Math.sin(angle);
            if (i === 0) ctx.moveTo(hx, hy);
            else ctx.lineTo(hx, hy);
          }
          ctx.closePath();
          ctx.strokeStyle = `rgba(${accentColor}, ${particle.opacity * 0.6})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.restore();
          particle.rotation = (particle.rotation || 0) + (particle.rotationSpeed || 0);
        } else {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${primaryColor}, ${particle.opacity})`;
          ctx.fill();
        }

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
      });

      // Draw particle connections
      particles.forEach((particle, i) => {
        if (particle.type !== "dot") return;
        particles.slice(i + 1).forEach((other) => {
          if (other.type !== "dot") return;
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 180) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(${primaryColor}, ${0.25 * (1 - distance / 180)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      // Scan line effect
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
