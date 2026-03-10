"use client";

import { useEffect, useRef } from "react";

interface ConnectionNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  pulsePhase: number;
  connections: number[];
}

interface WaveRing {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  speed: number;
}

interface FloatingEnvelope {
  x: number;
  y: number;
  size: number;
  opacity: number;
  floatPhase: number;
  floatSpeed: number;
  rotation: number;
  rotationSpeed: number;
}

export function ContactBackground() {
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

    // Create connection nodes (representing network/communication)
    const nodes: ConnectionNode[] = [];
    const nodeCount = 25;

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: 3 + Math.random() * 4,
        opacity: 0.3 + Math.random() * 0.4,
        pulsePhase: Math.random() * Math.PI * 2,
        connections: [],
      });
    }

    // Create wave rings (representing signals/communication waves)
    const waves: WaveRing[] = [];
    const createWave = () => {
      if (waves.length < 6) {
        waves.push({
          x: canvas.width * (0.15 + Math.random() * 0.7),
          y: canvas.height * (0.15 + Math.random() * 0.7),
          radius: 0,
          maxRadius: 220 + Math.random() * 180,
          opacity: 0.55,
          speed: 0.6 + Math.random() * 0.5,
        });
      }
    };

    // Create floating envelope icons
    const envelopes: FloatingEnvelope[] = [];
    const envelopeCount = 8;

    for (let i = 0; i < envelopeCount; i++) {
      envelopes.push({
        x: canvas.width * (0.08 + Math.random() * 0.84),
        y: canvas.height * (0.08 + Math.random() * 0.84),
        size: 28 + Math.random() * 22,
        opacity: 0.2 + Math.random() * 0.15,
        floatPhase: Math.random() * Math.PI * 2,
        floatSpeed: 0.3 + Math.random() * 0.3,
        rotation: Math.random() * 0.3 - 0.15,
        rotationSpeed: 0.001 + Math.random() * 0.002,
      });
    }

    // Draw envelope shape
    const drawEnvelope = (x: number, y: number, size: number, opacity: number, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);

      // Envelope glow
      const glowGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
      glowGradient.addColorStop(0, `rgba(99, 102, 241, ${opacity * 0.3})`);
      glowGradient.addColorStop(1, `rgba(99, 102, 241, 0)`);
      ctx.beginPath();
      ctx.arc(0, 0, size, 0, Math.PI * 2);
      ctx.fillStyle = glowGradient;
      ctx.fill();

      // Envelope body fill
      ctx.beginPath();
      ctx.moveTo(-size / 2, -size / 3);
      ctx.lineTo(size / 2, -size / 3);
      ctx.lineTo(size / 2, size / 3);
      ctx.lineTo(-size / 2, size / 3);
      ctx.closePath();
      ctx.fillStyle = `rgba(99, 102, 241, ${opacity * 0.15})`;
      ctx.fill();
      ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Envelope flap (V shape)
      ctx.beginPath();
      ctx.moveTo(-size / 2, -size / 3);
      ctx.lineTo(0, size / 6);
      ctx.lineTo(size / 2, -size / 3);
      ctx.strokeStyle = `rgba(139, 92, 246, ${opacity * 1.3})`;
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.restore();
    };

    // Draw connection line with gradient
    const drawConnection = (x1: number, y1: number, x2: number, y2: number, opacity: number) => {
      const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
      gradient.addColorStop(0, `rgba(99, 102, 241, ${opacity})`);
      gradient.addColorStop(0.5, `rgba(139, 92, 246, ${opacity * 0.7})`);
      gradient.addColorStop(1, `rgba(34, 211, 238, ${opacity})`);

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    let waveTimer = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.016;
      waveTimer += 0.016;

      // Create new waves periodically
      if (waveTimer > 2) {
        createWave();
        waveTimer = 0;
      }

      // Update and draw wave rings
      for (let i = waves.length - 1; i >= 0; i--) {
        const wave = waves[i];
        wave.radius += wave.speed;
        wave.opacity = 0.5 * (1 - wave.radius / wave.maxRadius);

        if (wave.radius >= wave.maxRadius) {
          waves.splice(i, 1);
          continue;
        }

        // Draw wave ring - outer
        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(99, 102, 241, ${wave.opacity})`;
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Draw wave ring - inner
        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.radius * 0.7, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(139, 92, 246, ${wave.opacity * 0.6})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Inner glow
        const gradient = ctx.createRadialGradient(
          wave.x, wave.y, wave.radius * 0.5,
          wave.x, wave.y, wave.radius
        );
        gradient.addColorStop(0, `rgba(139, 92, 246, ${wave.opacity * 0.15})`);
        gradient.addColorStop(0.7, `rgba(99, 102, 241, ${wave.opacity * 0.08})`);
        gradient.addColorStop(1, `rgba(99, 102, 241, 0)`);
        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Update and draw floating envelopes
      envelopes.forEach((envelope) => {
        const floatY = Math.sin(time * envelope.floatSpeed + envelope.floatPhase) * 10;
        const floatX = Math.cos(time * envelope.floatSpeed * 0.5 + envelope.floatPhase) * 5;
        envelope.rotation += envelope.rotationSpeed;

        drawEnvelope(
          envelope.x + floatX,
          envelope.y + floatY,
          envelope.size,
          envelope.opacity,
          envelope.rotation
        );
      });

      // Update nodes position
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Keep in bounds
        node.x = Math.max(0, Math.min(canvas.width, node.x));
        node.y = Math.max(0, Math.min(canvas.height, node.y));
      });

      // Draw connections between nearby nodes
      nodes.forEach((node, i) => {
        nodes.forEach((other, j) => {
          if (i < j) {
            const dist = Math.sqrt(
              Math.pow(node.x - other.x, 2) + Math.pow(node.y - other.y, 2)
            );
            if (dist < 180) {
              const opacity = (1 - dist / 180) * 0.3;
              drawConnection(node.x, node.y, other.x, other.y, opacity);
            }
          }
        });
      });

      // Draw nodes with pulse effect
      nodes.forEach((node) => {
        const pulse = Math.sin(time * 2 + node.pulsePhase) * 0.3 + 0.7;
        const currentOpacity = node.opacity * pulse;
        const currentSize = node.size * (0.8 + pulse * 0.2);

        // Node glow
        const glowGradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, currentSize * 4
        );
        glowGradient.addColorStop(0, `rgba(99, 102, 241, ${currentOpacity * 0.5})`);
        glowGradient.addColorStop(0.5, `rgba(139, 92, 246, ${currentOpacity * 0.2})`);
        glowGradient.addColorStop(1, `rgba(139, 92, 246, 0)`);

        ctx.beginPath();
        ctx.arc(node.x, node.y, currentSize * 4, 0, Math.PI * 2);
        ctx.fillStyle = glowGradient;
        ctx.fill();

        // Node core
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${currentOpacity})`;
        ctx.fill();

        // Node inner highlight
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentSize * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity * 0.5})`;
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
export function ContactBackgroundLight() {
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

    // Create connection nodes
    const nodes: ConnectionNode[] = [];
    const nodeCount = 20;

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        size: 2.5 + Math.random() * 3,
        opacity: 0.4 + Math.random() * 0.3,
        pulsePhase: Math.random() * Math.PI * 2,
        connections: [],
      });
    }

    // Create wave rings
    const waves: WaveRing[] = [];
    const createWave = () => {
      if (waves.length < 5) {
        waves.push({
          x: canvas.width * (0.15 + Math.random() * 0.7),
          y: canvas.height * (0.15 + Math.random() * 0.7),
          radius: 0,
          maxRadius: 200 + Math.random() * 150,
          opacity: 0.5,
          speed: 0.5 + Math.random() * 0.4,
        });
      }
    };

    // Create floating envelopes
    const envelopes: FloatingEnvelope[] = [];
    const envelopeCount = 7;

    for (let i = 0; i < envelopeCount; i++) {
      envelopes.push({
        x: canvas.width * (0.08 + Math.random() * 0.84),
        y: canvas.height * (0.08 + Math.random() * 0.84),
        size: 25 + Math.random() * 20,
        opacity: 0.28 + Math.random() * 0.18,
        floatPhase: Math.random() * Math.PI * 2,
        floatSpeed: 0.25 + Math.random() * 0.25,
        rotation: Math.random() * 0.3 - 0.15,
        rotationSpeed: 0.001 + Math.random() * 0.002,
      });
    }

    const drawEnvelope = (x: number, y: number, size: number, opacity: number, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);

      // Envelope glow
      const glowGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
      glowGradient.addColorStop(0, `rgba(79, 70, 229, ${opacity * 0.25})`);
      glowGradient.addColorStop(1, `rgba(79, 70, 229, 0)`);
      ctx.beginPath();
      ctx.arc(0, 0, size, 0, Math.PI * 2);
      ctx.fillStyle = glowGradient;
      ctx.fill();

      // Envelope body fill
      ctx.beginPath();
      ctx.moveTo(-size / 2, -size / 3);
      ctx.lineTo(size / 2, -size / 3);
      ctx.lineTo(size / 2, size / 3);
      ctx.lineTo(-size / 2, size / 3);
      ctx.closePath();
      ctx.fillStyle = `rgba(79, 70, 229, ${opacity * 0.12})`;
      ctx.fill();
      ctx.strokeStyle = `rgba(79, 70, 229, ${opacity})`;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Envelope flap (V shape)
      ctx.beginPath();
      ctx.moveTo(-size / 2, -size / 3);
      ctx.lineTo(0, size / 6);
      ctx.lineTo(size / 2, -size / 3);
      ctx.strokeStyle = `rgba(99, 102, 241, ${opacity * 1.3})`;
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.restore();
    };

    const drawConnection = (x1: number, y1: number, x2: number, y2: number, opacity: number) => {
      const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
      gradient.addColorStop(0, `rgba(79, 70, 229, ${opacity})`);
      gradient.addColorStop(0.5, `rgba(99, 102, 241, ${opacity * 0.7})`);
      gradient.addColorStop(1, `rgba(79, 70, 229, ${opacity})`);

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    let waveTimer = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.016;
      waveTimer += 0.016;

      if (waveTimer > 2.5) {
        createWave();
        waveTimer = 0;
      }

      // Draw waves
      for (let i = waves.length - 1; i >= 0; i--) {
        const wave = waves[i];
        wave.radius += wave.speed;
        wave.opacity = 0.45 * (1 - wave.radius / wave.maxRadius);

        if (wave.radius >= wave.maxRadius) {
          waves.splice(i, 1);
          continue;
        }

        // Draw wave ring - outer
        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(79, 70, 229, ${wave.opacity})`;
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Draw wave ring - inner
        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.radius * 0.7, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(99, 102, 241, ${wave.opacity * 0.5})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Inner glow
        const gradient = ctx.createRadialGradient(
          wave.x, wave.y, wave.radius * 0.5,
          wave.x, wave.y, wave.radius
        );
        gradient.addColorStop(0, `rgba(79, 70, 229, ${wave.opacity * 0.12})`);
        gradient.addColorStop(0.7, `rgba(99, 102, 241, ${wave.opacity * 0.06})`);
        gradient.addColorStop(1, `rgba(99, 102, 241, 0)`);
        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Draw envelopes
      envelopes.forEach((envelope) => {
        const floatY = Math.sin(time * envelope.floatSpeed + envelope.floatPhase) * 8;
        const floatX = Math.cos(time * envelope.floatSpeed * 0.5 + envelope.floatPhase) * 4;
        envelope.rotation += envelope.rotationSpeed;

        drawEnvelope(
          envelope.x + floatX,
          envelope.y + floatY,
          envelope.size,
          envelope.opacity,
          envelope.rotation
        );
      });

      // Update nodes
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        node.x = Math.max(0, Math.min(canvas.width, node.x));
        node.y = Math.max(0, Math.min(canvas.height, node.y));
      });

      // Draw connections
      nodes.forEach((node, i) => {
        nodes.forEach((other, j) => {
          if (i < j) {
            const dist = Math.sqrt(
              Math.pow(node.x - other.x, 2) + Math.pow(node.y - other.y, 2)
            );
            if (dist < 160) {
              const opacity = (1 - dist / 160) * 0.25;
              drawConnection(node.x, node.y, other.x, other.y, opacity);
            }
          }
        });
      });

      // Draw nodes
      nodes.forEach((node) => {
        const pulse = Math.sin(time * 2 + node.pulsePhase) * 0.3 + 0.7;
        const currentOpacity = node.opacity * pulse;
        const currentSize = node.size * (0.8 + pulse * 0.2);

        const glowGradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, currentSize * 3
        );
        glowGradient.addColorStop(0, `rgba(79, 70, 229, ${currentOpacity * 0.4})`);
        glowGradient.addColorStop(1, `rgba(79, 70, 229, 0)`);

        ctx.beginPath();
        ctx.arc(node.x, node.y, currentSize * 3, 0, Math.PI * 2);
        ctx.fillStyle = glowGradient;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(node.x, node.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(79, 70, 229, ${currentOpacity})`;
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
        style={{ opacity: 0.65 }}
      />

      {/* Gradient orbs - top */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-indigo-200/12 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute top-1/3 right-1/3 w-[350px] h-[350px] bg-slate-300/15 rounded-full blur-[100px] animate-pulse-slow animation-delay-2000" />

      {/* Lateral glows - top */}
      <div className="absolute top-1/3 left-0 w-[300px] h-[400px] bg-indigo-300/6 rounded-full blur-[100px] animate-pulse-slow" />
      <div className="absolute top-1/4 right-0 w-[280px] h-[350px] bg-slate-400/5 rounded-full blur-[100px] animate-pulse-slow animation-delay-4000" />

      {/* Bottom orbs */}
      <div className="absolute bottom-0 left-1/4 w-[380px] h-[280px] bg-indigo-200/10 rounded-full blur-[100px] animate-pulse-slow animation-delay-2000" />
      <div className="absolute bottom-0 right-1/4 w-[350px] h-[250px] bg-slate-300/12 rounded-full blur-[90px] animate-pulse-slow animation-delay-4000" />

      {/* Bottom corners */}
      <div className="absolute bottom-0 left-0 w-[250px] h-[300px] bg-indigo-300/5 rounded-full blur-[90px] animate-pulse-slow animation-delay-2000" />
      <div className="absolute bottom-0 right-0 w-[250px] h-[300px] bg-slate-400/5 rounded-full blur-[90px] animate-pulse-slow animation-delay-4000" />

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
