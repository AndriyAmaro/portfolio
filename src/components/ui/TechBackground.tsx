"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  pulsePhase: number;
  connections: number[];
}

interface DataPulse {
  startNode: number;
  endNode: number;
  progress: number;
  speed: number;
  color: string;
}

export function TechBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const pulsesRef = useRef<DataPulse[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef(0);

  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    const particleCount = Math.min(80, Math.floor((width * height) / 15000));

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.3,
        pulsePhase: Math.random() * Math.PI * 2,
        connections: [],
      });
    }

    return particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      particlesRef.current = initParticles(rect.width, rect.height);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    window.addEventListener("mousemove", handleMouseMove);

    const isDark = () => !document.documentElement.classList.contains("light-mode");

    const drawHexagonalGrid = (width: number, height: number) => {
      const hexSize = 60;
      const hexHeight = hexSize * Math.sqrt(3);
      const hexWidth = hexSize * 2;

      ctx.strokeStyle = isDark()
        ? "rgba(99, 102, 241, 0.03)"
        : "rgba(79, 70, 229, 0.05)";
      ctx.lineWidth = 1;

      for (let row = -1; row < height / hexHeight + 1; row++) {
        for (let col = -1; col < width / hexWidth + 1; col++) {
          const x = col * hexWidth * 0.75;
          const y = row * hexHeight + (col % 2 === 0 ? 0 : hexHeight / 2);

          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i + Math.PI / 6;
            const hx = x + hexSize * Math.cos(angle);
            const hy = y + hexSize * Math.sin(angle);
            if (i === 0) ctx.moveTo(hx, hy);
            else ctx.lineTo(hx, hy);
          }
          ctx.closePath();
          ctx.stroke();
        }
      }
    };

    const drawParticles = (width: number, height: number) => {
      const particles = particlesRef.current;
      const time = frameRef.current * 0.02;
      const primaryColor = isDark() ? "99, 102, 241" : "79, 70, 229";
      const secondaryColor = isDark() ? "34, 211, 238" : "8, 145, 178";

      // Update and draw particles
      particles.forEach((particle, i) => {
        // Mouse interaction
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          const force = (150 - dist) / 150 * 0.02;
          particle.vx -= (dx / dist) * force;
          particle.vy -= (dy / dist) * force;
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Boundary wrap
        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;
        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;

        // Damping
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Pulsing effect
        const pulse = Math.sin(time + particle.pulsePhase) * 0.3 + 0.7;
        const currentOpacity = particle.opacity * pulse;

        // Draw particle glow
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 4
        );
        gradient.addColorStop(0, `rgba(${primaryColor}, ${currentOpacity * 0.8})`);
        gradient.addColorStop(0.5, `rgba(${primaryColor}, ${currentOpacity * 0.2})`);
        gradient.addColorStop(1, `rgba(${primaryColor}, 0)`);

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw particle core
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${primaryColor}, ${currentOpacity})`;
        ctx.fill();

        // Find and draw connections
        particle.connections = [];
        particles.slice(i + 1).forEach((other, j) => {
          const ox = other.x - particle.x;
          const oy = other.y - particle.y;
          const distance = Math.sqrt(ox * ox + oy * oy);

          if (distance < 180) {
            particle.connections.push(i + j + 1);
            const connectionOpacity = (1 - distance / 180) * 0.4 * currentOpacity;

            // Create gradient line
            const lineGradient = ctx.createLinearGradient(
              particle.x, particle.y, other.x, other.y
            );
            lineGradient.addColorStop(0, `rgba(${primaryColor}, ${connectionOpacity})`);
            lineGradient.addColorStop(0.5, `rgba(${secondaryColor}, ${connectionOpacity * 0.5})`);
            lineGradient.addColorStop(1, `rgba(${primaryColor}, ${connectionOpacity})`);

            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = lineGradient;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });
    };

    const drawDataPulses = () => {
      const particles = particlesRef.current;
      const pulses = pulsesRef.current;
      const primaryColor = isDark() ? "99, 102, 241" : "79, 70, 229";
      const secondaryColor = isDark() ? "34, 211, 238" : "8, 145, 178";

      // Create new pulses randomly
      if (Math.random() < 0.02 && pulses.length < 10) {
        const validConnections: { start: number; end: number }[] = [];
        particles.forEach((p, i) => {
          p.connections.forEach((end) => {
            validConnections.push({ start: i, end });
          });
        });

        if (validConnections.length > 0) {
          const connection = validConnections[Math.floor(Math.random() * validConnections.length)];
          pulses.push({
            startNode: connection.start,
            endNode: connection.end,
            progress: 0,
            speed: 0.02 + Math.random() * 0.02,
            color: Math.random() > 0.5 ? primaryColor : secondaryColor,
          });
        }
      }

      // Update and draw pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const pulse = pulses[i];
        pulse.progress += pulse.speed;

        if (pulse.progress >= 1) {
          pulses.splice(i, 1);
          continue;
        }

        const start = particles[pulse.startNode];
        const end = particles[pulse.endNode];
        if (!start || !end) continue;

        const x = start.x + (end.x - start.x) * pulse.progress;
        const y = start.y + (end.y - start.y) * pulse.progress;

        // Draw pulse glow
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 8);
        gradient.addColorStop(0, `rgba(${pulse.color}, 1)`);
        gradient.addColorStop(0.5, `rgba(${pulse.color}, 0.5)`);
        gradient.addColorStop(1, `rgba(${pulse.color}, 0)`);

        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw pulse core
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, 0.9)`;
        ctx.fill();
      }
    };

    const drawFloatingShapes = (width: number, height: number) => {
      const time = frameRef.current * 0.005;
      const primaryColor = isDark() ? "99, 102, 241" : "79, 70, 229";

      // Floating triangles
      const shapes = [
        { x: width * 0.1, y: height * 0.2, size: 30, rotation: time },
        { x: width * 0.85, y: height * 0.7, size: 25, rotation: -time * 0.7 },
        { x: width * 0.7, y: height * 0.15, size: 20, rotation: time * 0.5 },
      ];

      shapes.forEach((shape) => {
        const floatY = Math.sin(time * 2 + shape.x) * 10;

        ctx.save();
        ctx.translate(shape.x, shape.y + floatY);
        ctx.rotate(shape.rotation);
        ctx.strokeStyle = `rgba(${primaryColor}, 0.15)`;
        ctx.lineWidth = 1;

        // Draw triangle
        ctx.beginPath();
        ctx.moveTo(0, -shape.size);
        ctx.lineTo(shape.size * 0.866, shape.size * 0.5);
        ctx.lineTo(-shape.size * 0.866, shape.size * 0.5);
        ctx.closePath();
        ctx.stroke();

        ctx.restore();
      });

      // Floating circles/rings
      const rings = [
        { x: width * 0.15, y: height * 0.75, size: 40 },
        { x: width * 0.9, y: height * 0.3, size: 35 },
      ];

      rings.forEach((ring, i) => {
        const floatY = Math.sin(time * 1.5 + i) * 15;
        const pulse = Math.sin(time * 2 + i) * 0.3 + 0.7;

        ctx.beginPath();
        ctx.arc(ring.x, ring.y + floatY, ring.size, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${primaryColor}, ${0.1 * pulse})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Inner ring
        ctx.beginPath();
        ctx.arc(ring.x, ring.y + floatY, ring.size * 0.6, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${primaryColor}, ${0.05 * pulse})`;
        ctx.stroke();
      });
    };

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      frameRef.current++;

      // Draw layers
      drawHexagonalGrid(rect.width, rect.height);
      drawFloatingShapes(rect.width, rect.height);
      drawParticles(rect.width, rect.height);
      drawDataPulses();

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [initParticles]);

  return (
    <>
      {/* Main Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.9 }}
      />

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-[var(--primary)]/15 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-[var(--secondary)]/10 rounded-full blur-[100px] animate-pulse-slow animation-delay-2000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--primary)]/5 rounded-full blur-[150px]" />

      {/* Corner glows - top */}
      <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-violet-500/15 rounded-full blur-[130px] animate-pulse-slow" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/12 rounded-full blur-[120px] animate-pulse-slow animation-delay-2000" />

      {/* Corner glows - bottom */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/12 rounded-full blur-[120px] animate-pulse-slow animation-delay-4000" />
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-violet-500/15 rounded-full blur-[130px] animate-pulse-slow" />

      {/* Lateral glows - sides */}
      <div className="absolute top-1/3 left-0 w-[300px] h-[500px] bg-cyan-500/8 rounded-full blur-[100px] animate-pulse-slow animation-delay-2000" />
      <div className="absolute bottom-1/3 right-0 w-[300px] h-[500px] bg-cyan-500/8 rounded-full blur-[100px] animate-pulse-slow animation-delay-4000" />

      {/* Radial Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, transparent 0%, var(--background) 75%)`
        }}
      />
    </>
  );
}
