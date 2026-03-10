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

interface SpiralRing {
  centerX: number;
  centerY: number;
  baseRadius: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  eccentricity: number;
}

export function AbstractBackground() {
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

    // Create spiral rings
    const spiralRings: SpiralRing[] = [];
    const ringCount = 15;

    for (let i = 0; i < ringCount; i++) {
      spiralRings.push({
        centerX: canvas.width * 0.75,
        centerY: canvas.height * 0.5,
        baseRadius: 80 + i * 35,
        rotation: (i * Math.PI) / 8,
        rotationSpeed: 0.0003 + Math.random() * 0.0005,
        opacity: 0.15 - i * 0.008,
        eccentricity: 0.6 + Math.random() * 0.3,
      });
    }

    // Create floating spheres
    const spheres: FloatingSphere[] = [
      {
        x: 0, y: 0,
        baseX: canvas.width * 0.2,
        baseY: canvas.height * 0.3,
        radius: 80,
        opacity: 0.15,
        floatSpeed: 0.5,
        floatAmplitude: 30,
        phase: 0,
        color: "139, 92, 246",
      },
      {
        x: 0, y: 0,
        baseX: canvas.width * 0.7,
        baseY: canvas.height * 0.6,
        radius: 60,
        opacity: 0.12,
        floatSpeed: 0.7,
        floatAmplitude: 25,
        phase: Math.PI / 2,
        color: "99, 102, 241",
      },
      {
        x: 0, y: 0,
        baseX: canvas.width * 0.85,
        baseY: canvas.height * 0.25,
        radius: 45,
        opacity: 0.1,
        floatSpeed: 0.4,
        floatAmplitude: 20,
        phase: Math.PI,
        color: "167, 139, 250",
      },
      {
        x: 0, y: 0,
        baseX: canvas.width * 0.15,
        baseY: canvas.height * 0.75,
        radius: 55,
        opacity: 0.08,
        floatSpeed: 0.6,
        floatAmplitude: 35,
        phase: Math.PI * 1.5,
        color: "129, 140, 248",
      },
    ];

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.016;

      // Draw spiral rings
      spiralRings.forEach((ring) => {
        ring.rotation += ring.rotationSpeed;

        ctx.beginPath();
        for (let angle = 0; angle <= Math.PI * 2; angle += 0.05) {
          const r = ring.baseRadius * (1 + ring.eccentricity * Math.cos(angle * 2));
          const x = ring.centerX + r * Math.cos(angle + ring.rotation);
          const y = ring.centerY + r * Math.sin(angle + ring.rotation) * 0.7;

          if (angle === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();

        ctx.strokeStyle = `rgba(167, 139, 250, ${ring.opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Draw floating spheres with glow
      spheres.forEach((sphere) => {
        sphere.x = sphere.baseX + Math.sin(time * sphere.floatSpeed + sphere.phase) * sphere.floatAmplitude;
        sphere.y = sphere.baseY + Math.cos(time * sphere.floatSpeed * 0.7 + sphere.phase) * sphere.floatAmplitude * 0.6;

        // Outer glow
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

        // Inner sphere
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
export function AbstractBackgroundLight() {
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

    // Create spiral rings
    const spiralRings: SpiralRing[] = [];
    const ringCount = 12;

    for (let i = 0; i < ringCount; i++) {
      spiralRings.push({
        centerX: canvas.width * 0.7,
        centerY: canvas.height * 0.5,
        baseRadius: 70 + i * 30,
        rotation: (i * Math.PI) / 7,
        rotationSpeed: 0.0002 + Math.random() * 0.0004,
        opacity: 0.18 - i * 0.012,
        eccentricity: 0.5 + Math.random() * 0.3,
      });
    }

    // Create floating spheres
    const spheres: FloatingSphere[] = [
      {
        x: 0, y: 0,
        baseX: canvas.width * 0.25,
        baseY: canvas.height * 0.35,
        radius: 70,
        opacity: 0.2,
        floatSpeed: 0.4,
        floatAmplitude: 25,
        phase: 0,
        color: "99, 102, 241",
      },
      {
        x: 0, y: 0,
        baseX: canvas.width * 0.75,
        baseY: canvas.height * 0.55,
        radius: 55,
        opacity: 0.15,
        floatSpeed: 0.5,
        floatAmplitude: 20,
        phase: Math.PI / 2,
        color: "124, 58, 237",
      },
      {
        x: 0, y: 0,
        baseX: canvas.width * 0.85,
        baseY: canvas.height * 0.3,
        radius: 40,
        opacity: 0.12,
        floatSpeed: 0.35,
        floatAmplitude: 18,
        phase: Math.PI,
        color: "139, 92, 246",
      },
      {
        x: 0, y: 0,
        baseX: canvas.width * 0.1,
        baseY: canvas.height * 0.7,
        radius: 50,
        opacity: 0.1,
        floatSpeed: 0.45,
        floatAmplitude: 30,
        phase: Math.PI * 1.5,
        color: "79, 70, 229",
      },
    ];

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.016;

      // Draw spiral rings
      spiralRings.forEach((ring) => {
        ring.rotation += ring.rotationSpeed;

        ctx.beginPath();
        for (let angle = 0; angle <= Math.PI * 2; angle += 0.05) {
          const r = ring.baseRadius * (1 + ring.eccentricity * Math.cos(angle * 2));
          const x = ring.centerX + r * Math.cos(angle + ring.rotation);
          const y = ring.centerY + r * Math.sin(angle + ring.rotation) * 0.7;

          if (angle === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();

        ctx.strokeStyle = `rgba(99, 102, 241, ${ring.opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Draw floating spheres with glow
      spheres.forEach((sphere) => {
        sphere.x = sphere.baseX + Math.sin(time * sphere.floatSpeed + sphere.phase) * sphere.floatAmplitude;
        sphere.y = sphere.baseY + Math.cos(time * sphere.floatSpeed * 0.7 + sphere.phase) * sphere.floatAmplitude * 0.6;

        // Outer glow
        const glowGradient = ctx.createRadialGradient(
          sphere.x, sphere.y, 0,
          sphere.x, sphere.y, sphere.radius * 2.5
        );
        glowGradient.addColorStop(0, `rgba(${sphere.color}, ${sphere.opacity * 0.6})`);
        glowGradient.addColorStop(0.4, `rgba(${sphere.color}, ${sphere.opacity * 0.25})`);
        glowGradient.addColorStop(1, `rgba(${sphere.color}, 0)`);

        ctx.beginPath();
        ctx.arc(sphere.x, sphere.y, sphere.radius * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = glowGradient;
        ctx.fill();

        // Inner sphere
        const sphereGradient = ctx.createRadialGradient(
          sphere.x - sphere.radius * 0.25, sphere.y - sphere.radius * 0.25, 0,
          sphere.x, sphere.y, sphere.radius
        );
        sphereGradient.addColorStop(0, `rgba(${sphere.color}, ${sphere.opacity * 0.9})`);
        sphereGradient.addColorStop(0.6, `rgba(${sphere.color}, ${sphere.opacity * 0.5})`);
        sphereGradient.addColorStop(1, `rgba(${sphere.color}, ${sphere.opacity * 0.15})`);

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
