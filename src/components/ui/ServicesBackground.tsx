"use client";

import { useEffect, useRef } from "react";

interface FloatingSphere {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  radius: number;
  opacity: number;
  floatSpeed: number;
  floatAmplitude: number;
  phase: number;
  color: string;
}

export function ServicesBackground() {
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

    // Wave layers
    const waveCount = 10;
    const waves = Array.from({ length: waveCount }, (_, i) => ({
      amplitude: 15 + Math.random() * 25,
      frequency: 0.002 + Math.random() * 0.003,
      speed: 0.3 + Math.random() * 0.4,
      yOffset: (i / waveCount) * canvas.height,
      phase: Math.random() * Math.PI * 2,
      opacity: 0.03 + Math.random() * 0.05,
    }));

    // Floating spheres - bottom corners + laterals
    const spheres: FloatingSphere[] = [
      {
        x: 0, y: 0,
        baseX: canvas.width * 0.08,
        baseY: canvas.height * 0.7,
        radius: 65,
        opacity: 0.12,
        floatSpeed: 0.4,
        floatAmplitude: 25,
        phase: 0,
        color: "139, 92, 246",
      },
      {
        x: 0, y: 0,
        baseX: canvas.width * 0.92,
        baseY: canvas.height * 0.65,
        radius: 55,
        opacity: 0.1,
        floatSpeed: 0.5,
        floatAmplitude: 20,
        phase: Math.PI / 2,
        color: "99, 102, 241",
      },
      {
        x: 0, y: 0,
        baseX: canvas.width * 0.05,
        baseY: canvas.height * 0.85,
        radius: 50,
        opacity: 0.08,
        floatSpeed: 0.6,
        floatAmplitude: 18,
        phase: Math.PI,
        color: "167, 139, 250",
      },
      {
        x: 0, y: 0,
        baseX: canvas.width * 0.95,
        baseY: canvas.height * 0.8,
        radius: 45,
        opacity: 0.09,
        floatSpeed: 0.35,
        floatAmplitude: 22,
        phase: Math.PI * 1.5,
        color: "129, 140, 248",
      },
    ];

    // Glow nodes
    const glowNodes = Array.from({ length: 6 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: 80 + Math.random() * 120,
      pulsePhase: Math.random() * Math.PI * 2,
      opacity: 0.02 + Math.random() * 0.03,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.016;

      const breath = 0.85 + Math.sin(time * 0.3) * 0.15;

      // Draw glow nodes
      glowNodes.forEach((node) => {
        const pulse = Math.sin(time * 0.5 + node.pulsePhase) * 0.5 + 0.5;
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.radius
        );
        gradient.addColorStop(0, `rgba(139, 92, 246, ${node.opacity * pulse})`);
        gradient.addColorStop(0.5, `rgba(99, 102, 241, ${node.opacity * pulse * 0.5})`);
        gradient.addColorStop(1, "rgba(99, 102, 241, 0)");
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      // Draw sine waves
      waves.forEach((wave) => {
        ctx.beginPath();
        for (let x = 0; x <= canvas.width; x += 3) {
          const y = wave.yOffset +
            Math.sin(x * wave.frequency + time * wave.speed + wave.phase) * wave.amplitude * breath +
            Math.sin(x * wave.frequency * 0.5 + time * wave.speed * 0.7) * wave.amplitude * 0.4;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, `rgba(99, 102, 241, 0)`);
        gradient.addColorStop(0.2, `rgba(99, 102, 241, ${wave.opacity * breath})`);
        gradient.addColorStop(0.5, `rgba(139, 92, 246, ${wave.opacity * 1.2 * breath})`);
        gradient.addColorStop(0.8, `rgba(167, 139, 250, ${wave.opacity * breath})`);
        gradient.addColorStop(1, `rgba(99, 102, 241, 0)`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // Draw floating spheres
      spheres.forEach((sphere) => {
        sphere.x = sphere.baseX + Math.sin(time * sphere.floatSpeed + sphere.phase) * sphere.floatAmplitude;
        sphere.y = sphere.baseY + Math.cos(time * sphere.floatSpeed * 0.7 + sphere.phase) * sphere.floatAmplitude * 0.6;

        const glowGradient = ctx.createRadialGradient(
          sphere.x, sphere.y, 0,
          sphere.x, sphere.y, sphere.radius * 2
        );
        glowGradient.addColorStop(0, `rgba(${sphere.color}, ${sphere.opacity * 0.5})`);
        glowGradient.addColorStop(0.5, `rgba(${sphere.color}, ${sphere.opacity * 0.2})`);
        glowGradient.addColorStop(1, `rgba(${sphere.color}, 0)`);

        ctx.beginPath();
        ctx.arc(sphere.x, sphere.y, sphere.radius * 2, 0, Math.PI * 2);
        ctx.fillStyle = glowGradient;
        ctx.fill();

        const sphereGradient = ctx.createRadialGradient(
          sphere.x - sphere.radius * 0.3, sphere.y - sphere.radius * 0.3, 0,
          sphere.x, sphere.y, sphere.radius
        );
        sphereGradient.addColorStop(0, `rgba(${sphere.color}, ${sphere.opacity * 0.8})`);
        sphereGradient.addColorStop(0.7, `rgba(${sphere.color}, ${sphere.opacity * 0.4})`);
        sphereGradient.addColorStop(1, `rgba(${sphere.color}, ${sphere.opacity * 0.1})`);

        ctx.beginPath();
        ctx.arc(sphere.x, sphere.y, sphere.radius, 0, Math.PI * 2);
        ctx.fillStyle = sphereGradient;
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
export function ServicesBackgroundLight() {
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

    // Wave layers
    const waveCount = 10;
    const waves = Array.from({ length: waveCount }, (_, i) => ({
      amplitude: 15 + Math.random() * 25,
      frequency: 0.002 + Math.random() * 0.003,
      speed: 0.3 + Math.random() * 0.4,
      yOffset: (i / waveCount) * canvas.height,
      phase: Math.random() * Math.PI * 2,
      opacity: 0.04 + Math.random() * 0.06,
    }));

    // Floating spheres - bottom corners + laterals
    const spheres: FloatingSphere[] = [
      {
        x: 0, y: 0,
        baseX: canvas.width * 0.08,
        baseY: canvas.height * 0.7,
        radius: 60,
        opacity: 0.1,
        floatSpeed: 0.4,
        floatAmplitude: 22,
        phase: 0,
        color: "99, 102, 241",
      },
      {
        x: 0, y: 0,
        baseX: canvas.width * 0.92,
        baseY: canvas.height * 0.65,
        radius: 50,
        opacity: 0.08,
        floatSpeed: 0.5,
        floatAmplitude: 18,
        phase: Math.PI / 2,
        color: "124, 58, 237",
      },
      {
        x: 0, y: 0,
        baseX: canvas.width * 0.05,
        baseY: canvas.height * 0.85,
        radius: 45,
        opacity: 0.07,
        floatSpeed: 0.6,
        floatAmplitude: 15,
        phase: Math.PI,
        color: "124, 58, 237",
      },
      {
        x: 0, y: 0,
        baseX: canvas.width * 0.95,
        baseY: canvas.height * 0.8,
        radius: 40,
        opacity: 0.07,
        floatSpeed: 0.35,
        floatAmplitude: 20,
        phase: Math.PI * 1.5,
        color: "79, 70, 229",
      },
    ];

    // Glow nodes
    const glowNodes = Array.from({ length: 5 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: 70 + Math.random() * 100,
      pulsePhase: Math.random() * Math.PI * 2,
      opacity: 0.02 + Math.random() * 0.03,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.016;

      const breath = 0.85 + Math.sin(time * 0.3) * 0.15;

      // Draw glow nodes
      glowNodes.forEach((node) => {
        const pulse = Math.sin(time * 0.5 + node.pulsePhase) * 0.5 + 0.5;
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.radius
        );
        gradient.addColorStop(0, `rgba(79, 70, 229, ${node.opacity * pulse})`);
        gradient.addColorStop(0.5, `rgba(99, 102, 241, ${node.opacity * pulse * 0.5})`);
        gradient.addColorStop(1, "rgba(99, 102, 241, 0)");
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      // Draw sine waves
      waves.forEach((wave) => {
        ctx.beginPath();
        for (let x = 0; x <= canvas.width; x += 3) {
          const y = wave.yOffset +
            Math.sin(x * wave.frequency + time * wave.speed + wave.phase) * wave.amplitude * breath +
            Math.sin(x * wave.frequency * 0.5 + time * wave.speed * 0.7) * wave.amplitude * 0.4;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, `rgba(79, 70, 229, 0)`);
        gradient.addColorStop(0.2, `rgba(79, 70, 229, ${wave.opacity * breath})`);
        gradient.addColorStop(0.5, `rgba(99, 102, 241, ${wave.opacity * 1.2 * breath})`);
        gradient.addColorStop(0.8, `rgba(124, 58, 237, ${wave.opacity * breath})`);
        gradient.addColorStop(1, `rgba(79, 70, 229, 0)`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // Draw floating spheres
      spheres.forEach((sphere) => {
        sphere.x = sphere.baseX + Math.sin(time * sphere.floatSpeed + sphere.phase) * sphere.floatAmplitude;
        sphere.y = sphere.baseY + Math.cos(time * sphere.floatSpeed * 0.7 + sphere.phase) * sphere.floatAmplitude * 0.6;

        const glowGradient = ctx.createRadialGradient(
          sphere.x, sphere.y, 0,
          sphere.x, sphere.y, sphere.radius * 2
        );
        glowGradient.addColorStop(0, `rgba(${sphere.color}, ${sphere.opacity * 0.5})`);
        glowGradient.addColorStop(0.5, `rgba(${sphere.color}, ${sphere.opacity * 0.2})`);
        glowGradient.addColorStop(1, `rgba(${sphere.color}, 0)`);

        ctx.beginPath();
        ctx.arc(sphere.x, sphere.y, sphere.radius * 2, 0, Math.PI * 2);
        ctx.fillStyle = glowGradient;
        ctx.fill();

        const sphereGradient = ctx.createRadialGradient(
          sphere.x - sphere.radius * 0.3, sphere.y - sphere.radius * 0.3, 0,
          sphere.x, sphere.y, sphere.radius
        );
        sphereGradient.addColorStop(0, `rgba(${sphere.color}, ${sphere.opacity * 0.8})`);
        sphereGradient.addColorStop(0.7, `rgba(${sphere.color}, ${sphere.opacity * 0.4})`);
        sphereGradient.addColorStop(1, `rgba(${sphere.color}, ${sphere.opacity * 0.1})`);

        ctx.beginPath();
        ctx.arc(sphere.x, sphere.y, sphere.radius, 0, Math.PI * 2);
        ctx.fillStyle = sphereGradient;
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
        style={{ opacity: 0.6 }}
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
