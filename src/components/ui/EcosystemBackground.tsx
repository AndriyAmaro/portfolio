"use client";

import { useEffect, useRef } from "react";

// ---------------------------------------------------------------------------
// Ecosystem Background · Flowing sine waves with depth layers
// Inspired by: organic data flow, interconnected system aesthetic
// ---------------------------------------------------------------------------

export function EcosystemBackground() {
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
      // Fallback to parent section dimensions if container has no size yet
      const w = rect.width || container.parentElement?.offsetWidth || window.innerWidth;
      const h = rect.height || container.parentElement?.offsetHeight || window.innerHeight;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };

    // Use ResizeObserver for reliable sizing
    const ro = new ResizeObserver(resizeCanvas);
    ro.observe(container);
    resizeCanvas();

    // -----------------------------------------------------------------
    // Wave configuration · multiple layers for depth
    // -----------------------------------------------------------------
    interface Wave {
      amplitude: number;
      frequency: number;
      speed: number;
      phase: number;
      yOffset: number; // vertical position (0 = top, 1 = bottom)
      thickness: number;
      opacityBase: number;
      colorType: "indigo" | "violet" | "cyan";
    }

    const waves: Wave[] = [
      // Back layer · large slow waves (top area)
      { amplitude: 45, frequency: 0.003, speed: 0.3, phase: 0, yOffset: 0.12, thickness: 1.0, opacityBase: 0.12, colorType: "violet" },
      { amplitude: 40, frequency: 0.004, speed: 0.25, phase: 1.2, yOffset: 0.18, thickness: 0.9, opacityBase: 0.10, colorType: "indigo" },
      { amplitude: 55, frequency: 0.002, speed: 0.35, phase: 2.5, yOffset: 0.24, thickness: 1.1, opacityBase: 0.13, colorType: "cyan" },

      // Mid layer · between header and live cards
      { amplitude: 35, frequency: 0.005, speed: 0.4, phase: 0.8, yOffset: 0.30, thickness: 1.3, opacityBase: 0.16, colorType: "indigo" },
      { amplitude: 28, frequency: 0.006, speed: 0.45, phase: 2.0, yOffset: 0.36, thickness: 1.2, opacityBase: 0.14, colorType: "violet" },
      { amplitude: 38, frequency: 0.004, speed: 0.38, phase: 3.5, yOffset: 0.42, thickness: 1.4, opacityBase: 0.17, colorType: "cyan" },

      // Front layer · around live cards area
      { amplitude: 22, frequency: 0.007, speed: 0.55, phase: 1.5, yOffset: 0.48, thickness: 1.5, opacityBase: 0.2, colorType: "indigo" },
      { amplitude: 20, frequency: 0.008, speed: 0.5, phase: 3.0, yOffset: 0.52, thickness: 1.3, opacityBase: 0.18, colorType: "violet" },
      { amplitude: 28, frequency: 0.006, speed: 0.6, phase: 4.2, yOffset: 0.56, thickness: 1.6, opacityBase: 0.22, colorType: "cyan" },

      // Extra detail waves · subtle top accents
      { amplitude: 18, frequency: 0.009, speed: 0.65, phase: 0.5, yOffset: 0.08, thickness: 0.8, opacityBase: 0.09, colorType: "indigo" },
      { amplitude: 50, frequency: 0.0025, speed: 0.2, phase: 1.8, yOffset: 0.34, thickness: 0.9, opacityBase: 0.11, colorType: "violet" },
      { amplitude: 25, frequency: 0.007, speed: 0.5, phase: 2.8, yOffset: 0.46, thickness: 1.0, opacityBase: 0.13, colorType: "cyan" },
    ];

    // -----------------------------------------------------------------
    // Floating spheres · lateral depth elements
    // -----------------------------------------------------------------
    interface Sphere {
      baseX: number;
      baseY: number;
      radius: number;
      opacity: number;
      floatSpeed: number;
      floatAmplitude: number;
      phase: number;
      color: string;
    }

    const w0 = canvas.width;
    const h0 = canvas.height;

    const spheres: Sphere[] = [
      { baseX: w0 * 0.08, baseY: h0 * 0.25, radius: 70, opacity: 0.14, floatSpeed: 0.5, floatAmplitude: 28, phase: 0, color: "139, 92, 246" },
      { baseX: w0 * 0.92, baseY: h0 * 0.35, radius: 55, opacity: 0.11, floatSpeed: 0.7, floatAmplitude: 22, phase: Math.PI / 2, color: "99, 102, 241" },
      { baseX: w0 * 0.05, baseY: h0 * 0.65, radius: 50, opacity: 0.09, floatSpeed: 0.6, floatAmplitude: 30, phase: Math.PI, color: "167, 139, 250" },
      { baseX: w0 * 0.95, baseY: h0 * 0.7, radius: 45, opacity: 0.10, floatSpeed: 0.4, floatAmplitude: 25, phase: Math.PI * 1.5, color: "129, 140, 248" },
    ];

    // -----------------------------------------------------------------
    // Animation
    // -----------------------------------------------------------------
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.016;

      const w = canvas.width;
      const h = canvas.height;
      const isDark = !document.documentElement.classList.contains("light-mode");

      // Color palette
      const colors = {
        indigo: isDark ? "99, 102, 241" : "79, 70, 229",
        violet: isDark ? "139, 92, 246" : "124, 58, 237",
        cyan: isDark ? "34, 211, 238" : "6, 182, 212",
      };

      const om = isDark ? 1 : 0.6;

      // Draw floating spheres (behind waves)
      spheres.forEach((sphere) => {
        const sx = sphere.baseX + Math.sin(time * sphere.floatSpeed + sphere.phase) * sphere.floatAmplitude;
        const sy = sphere.baseY + Math.cos(time * sphere.floatSpeed * 0.7 + sphere.phase) * sphere.floatAmplitude * 0.6;
        const sOpacity = sphere.opacity * om;

        // Outer glow
        const glowGradient = ctx.createRadialGradient(sx, sy, 0, sx, sy, sphere.radius * 2);
        glowGradient.addColorStop(0, `rgba(${sphere.color}, ${sOpacity * 0.5})`);
        glowGradient.addColorStop(0.5, `rgba(${sphere.color}, ${sOpacity * 0.2})`);
        glowGradient.addColorStop(1, `rgba(${sphere.color}, 0)`);

        ctx.beginPath();
        ctx.arc(sx, sy, sphere.radius * 2, 0, Math.PI * 2);
        ctx.fillStyle = glowGradient;
        ctx.fill();

        // Inner sphere
        const sphereGradient = ctx.createRadialGradient(
          sx - sphere.radius * 0.3, sy - sphere.radius * 0.3, 0,
          sx, sy, sphere.radius
        );
        sphereGradient.addColorStop(0, `rgba(${sphere.color}, ${sOpacity * 0.8})`);
        sphereGradient.addColorStop(0.7, `rgba(${sphere.color}, ${sOpacity * 0.4})`);
        sphereGradient.addColorStop(1, `rgba(${sphere.color}, ${sOpacity * 0.1})`);

        ctx.beginPath();
        ctx.arc(sx, sy, sphere.radius, 0, Math.PI * 2);
        ctx.fillStyle = sphereGradient;
        ctx.fill();
      });

      // Draw each wave
      waves.forEach((wave) => {
        const baseY = h * wave.yOffset;
        const color = colors[wave.colorType];

        // Breathing effect
        const breath = 0.7 + Math.sin(time * 0.5 + wave.phase) * 0.3;
        const alpha = wave.opacityBase * breath * om;

        ctx.beginPath();

        // Draw wave path
        for (let x = 0; x <= w; x += 3) {
          const y = baseY
            + Math.sin(x * wave.frequency + time * wave.speed + wave.phase) * wave.amplitude
            + Math.sin(x * wave.frequency * 0.5 + time * wave.speed * 0.7 + wave.phase * 1.3) * wave.amplitude * 0.4;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.strokeStyle = `rgba(${color}, ${alpha})`;
        ctx.lineWidth = wave.thickness;
        ctx.stroke();

        // Second pass · slightly offset for bundle effect
        ctx.beginPath();
        for (let x = 0; x <= w; x += 3) {
          const y = baseY
            + Math.sin(x * wave.frequency + time * wave.speed + wave.phase + 0.3) * wave.amplitude * 0.85
            + Math.sin(x * wave.frequency * 0.5 + time * wave.speed * 0.7 + wave.phase * 1.3 + 0.5) * wave.amplitude * 0.35;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.strokeStyle = `rgba(${color}, ${alpha * 0.5})`;
        ctx.lineWidth = wave.thickness * 0.6;
        ctx.stroke();
      });

      // --- Intersection glow nodes · upper half only ---
      const nodeTime = time * 0.3;
      for (let i = 0; i < 8; i++) {
        const nx = (w * 0.1) + (i / 7) * (w * 0.8) + Math.sin(nodeTime + i * 1.7) * 30;
        const ny = (h * 0.15) + Math.sin(nodeTime * 0.7 + i * 2.3) * (h * 0.2);
        const pulse = 0.4 + Math.sin(time * 1.5 + i * 1.1) * 0.6;
        const nodeAlpha = 0.12 * pulse * om;

        // Glow
        ctx.beginPath();
        ctx.arc(nx, ny, 20, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${colors.cyan}, ${nodeAlpha})`;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(nx, ny, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${colors.cyan}, ${nodeAlpha * 4})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      ro.disconnect();
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Base gradient · dark mode: deep indigo, light mode: soft slate */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #0f0d1f 0%, #161331 30%, #1a1640 60%, #1e1b4b 100%)",
        }}
      />

      {/* Canvas for animated waves */}
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

// Light mode version · with wave animations
export function EcosystemBackgroundLight() {
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
      const w = rect.width || container.parentElement?.offsetWidth || window.innerWidth;
      const h = rect.height || container.parentElement?.offsetHeight || window.innerHeight;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };

    const ro = new ResizeObserver(resizeCanvas);
    ro.observe(container);
    resizeCanvas();

    interface Wave {
      amplitude: number;
      frequency: number;
      speed: number;
      phase: number;
      yOffset: number;
      thickness: number;
      opacityBase: number;
      colorType: "indigo" | "violet" | "cyan";
    }

    const waves: Wave[] = [
      // Back layer
      { amplitude: 45, frequency: 0.003, speed: 0.3, phase: 0, yOffset: 0.12, thickness: 1.0, opacityBase: 0.12, colorType: "violet" },
      { amplitude: 40, frequency: 0.004, speed: 0.25, phase: 1.2, yOffset: 0.18, thickness: 0.9, opacityBase: 0.10, colorType: "indigo" },
      { amplitude: 55, frequency: 0.002, speed: 0.35, phase: 2.5, yOffset: 0.24, thickness: 1.1, opacityBase: 0.13, colorType: "cyan" },

      // Mid layer
      { amplitude: 35, frequency: 0.005, speed: 0.4, phase: 0.8, yOffset: 0.30, thickness: 1.3, opacityBase: 0.16, colorType: "indigo" },
      { amplitude: 28, frequency: 0.006, speed: 0.45, phase: 2.0, yOffset: 0.36, thickness: 1.2, opacityBase: 0.14, colorType: "violet" },
      { amplitude: 38, frequency: 0.004, speed: 0.38, phase: 3.5, yOffset: 0.42, thickness: 1.4, opacityBase: 0.17, colorType: "cyan" },

      // Front layer
      { amplitude: 22, frequency: 0.007, speed: 0.55, phase: 1.5, yOffset: 0.48, thickness: 1.5, opacityBase: 0.2, colorType: "indigo" },
      { amplitude: 20, frequency: 0.008, speed: 0.5, phase: 3.0, yOffset: 0.52, thickness: 1.3, opacityBase: 0.18, colorType: "violet" },
      { amplitude: 28, frequency: 0.006, speed: 0.6, phase: 4.2, yOffset: 0.56, thickness: 1.6, opacityBase: 0.22, colorType: "cyan" },

      // Extra detail waves
      { amplitude: 18, frequency: 0.009, speed: 0.65, phase: 0.5, yOffset: 0.08, thickness: 0.8, opacityBase: 0.09, colorType: "indigo" },
      { amplitude: 50, frequency: 0.0025, speed: 0.2, phase: 1.8, yOffset: 0.34, thickness: 0.9, opacityBase: 0.11, colorType: "violet" },
      { amplitude: 25, frequency: 0.007, speed: 0.5, phase: 2.8, yOffset: 0.46, thickness: 1.0, opacityBase: 0.13, colorType: "cyan" },
    ];

    const colors = {
      indigo: "79, 70, 229",
      violet: "124, 58, 237",
      cyan: "6, 182, 212",
    };

    // Floating spheres · lateral depth
    interface Sphere {
      baseX: number;
      baseY: number;
      radius: number;
      opacity: number;
      floatSpeed: number;
      floatAmplitude: number;
      phase: number;
      color: string;
    }

    const w0 = canvas.width;
    const h0 = canvas.height;

    const spheres: Sphere[] = [
      { baseX: w0 * 0.08, baseY: h0 * 0.25, radius: 70, opacity: 0.28, floatSpeed: 0.4, floatAmplitude: 25, phase: 0, color: "99, 102, 241" },
      { baseX: w0 * 0.92, baseY: h0 * 0.35, radius: 55, opacity: 0.22, floatSpeed: 0.5, floatAmplitude: 20, phase: Math.PI / 2, color: "124, 58, 237" },
      { baseX: w0 * 0.05, baseY: h0 * 0.65, radius: 50, opacity: 0.20, floatSpeed: 0.45, floatAmplitude: 28, phase: Math.PI, color: "139, 92, 246" },
      { baseX: w0 * 0.95, baseY: h0 * 0.7, radius: 45, opacity: 0.18, floatSpeed: 0.35, floatAmplitude: 22, phase: Math.PI * 1.5, color: "79, 70, 229" },
    ];

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.016;

      const w = canvas.width;
      const h = canvas.height;

      // Draw floating spheres (behind waves)
      spheres.forEach((sphere) => {
        const sx = sphere.baseX + Math.sin(time * sphere.floatSpeed + sphere.phase) * sphere.floatAmplitude;
        const sy = sphere.baseY + Math.cos(time * sphere.floatSpeed * 0.7 + sphere.phase) * sphere.floatAmplitude * 0.6;

        const glowGradient = ctx.createRadialGradient(sx, sy, 0, sx, sy, sphere.radius * 2.5);
        glowGradient.addColorStop(0, `rgba(${sphere.color}, ${sphere.opacity * 0.6})`);
        glowGradient.addColorStop(0.4, `rgba(${sphere.color}, ${sphere.opacity * 0.25})`);
        glowGradient.addColorStop(1, `rgba(${sphere.color}, 0)`);

        ctx.beginPath();
        ctx.arc(sx, sy, sphere.radius * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = glowGradient;
        ctx.fill();

        const sphereGradient = ctx.createRadialGradient(
          sx - sphere.radius * 0.25, sy - sphere.radius * 0.25, 0,
          sx, sy, sphere.radius
        );
        sphereGradient.addColorStop(0, `rgba(${sphere.color}, ${sphere.opacity * 0.9})`);
        sphereGradient.addColorStop(0.6, `rgba(${sphere.color}, ${sphere.opacity * 0.5})`);
        sphereGradient.addColorStop(1, `rgba(${sphere.color}, ${sphere.opacity * 0.15})`);

        ctx.beginPath();
        ctx.arc(sx, sy, sphere.radius, 0, Math.PI * 2);
        ctx.fillStyle = sphereGradient;
        ctx.fill();
      });

      waves.forEach((wave) => {
        const baseY = h * wave.yOffset;
        const color = colors[wave.colorType];
        const breath = 0.7 + Math.sin(time * 0.5 + wave.phase) * 0.3;
        const alpha = wave.opacityBase * breath;

        ctx.beginPath();
        for (let x = 0; x <= w; x += 3) {
          const y = baseY
            + Math.sin(x * wave.frequency + time * wave.speed + wave.phase) * wave.amplitude
            + Math.sin(x * wave.frequency * 0.5 + time * wave.speed * 0.7 + wave.phase * 1.3) * wave.amplitude * 0.4;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(${color}, ${alpha})`;
        ctx.lineWidth = wave.thickness;
        ctx.stroke();

        // Second pass · bundle effect
        ctx.beginPath();
        for (let x = 0; x <= w; x += 3) {
          const y = baseY
            + Math.sin(x * wave.frequency + time * wave.speed + wave.phase + 0.3) * wave.amplitude * 0.85
            + Math.sin(x * wave.frequency * 0.5 + time * wave.speed * 0.7 + wave.phase * 1.3 + 0.5) * wave.amplitude * 0.35;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(${color}, ${alpha * 0.5})`;
        ctx.lineWidth = wave.thickness * 0.6;
        ctx.stroke();
      });

      // Glow nodes
      const nodeTime = time * 0.3;
      for (let i = 0; i < 8; i++) {
        const nx = (w * 0.1) + (i / 7) * (w * 0.8) + Math.sin(nodeTime + i * 1.7) * 30;
        const ny = (h * 0.15) + Math.sin(nodeTime * 0.7 + i * 2.3) * (h * 0.2);
        const pulse = 0.4 + Math.sin(time * 1.5 + i * 1.1) * 0.6;
        const nodeAlpha = 0.12 * pulse;

        ctx.beginPath();
        ctx.arc(nx, ny, 20, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${colors.cyan}, ${nodeAlpha})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(nx, ny, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${colors.cyan}, ${nodeAlpha * 4})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      ro.disconnect();
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 30%, #f1f5f9 60%, #e2e8f0 100%)",
        }}
      />

      {/* Canvas for animated waves */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.85 }}
      />

      {/* Gradient orbs · top */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-300/20 rounded-full blur-[150px] animate-pulse-slow" />
      <div className="absolute top-1/3 right-1/3 w-[350px] h-[350px] bg-slate-300/25 rounded-full blur-[100px] animate-pulse-slow animation-delay-2000" />

      {/* Lateral glows · top */}
      <div className="absolute top-1/3 left-0 w-[300px] h-[400px] bg-indigo-300/15 rounded-full blur-[100px] animate-pulse-slow" />
      <div className="absolute top-1/4 right-0 w-[280px] h-[350px] bg-slate-400/12 rounded-full blur-[100px] animate-pulse-slow animation-delay-4000" />

      {/* Bottom orbs */}
      <div className="absolute bottom-0 left-1/4 w-[450px] h-[350px] bg-indigo-300/18 rounded-full blur-[120px] animate-pulse-slow animation-delay-2000" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-slate-300/20 rounded-full blur-[100px] animate-pulse-slow animation-delay-4000" />
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-indigo-300/14 rounded-full blur-[110px] animate-pulse-slow" />

      {/* Bottom corners */}
      <div className="absolute bottom-0 left-0 w-[300px] h-[400px] bg-indigo-300/12 rounded-full blur-[100px] animate-pulse-slow animation-delay-2000" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[400px] bg-slate-400/12 rounded-full blur-[100px] animate-pulse-slow animation-delay-4000" />

      {/* Extra bottom glows */}
      <div className="absolute -bottom-20 left-[15%] w-[300px] h-[250px] bg-indigo-300/16 rounded-full blur-[100px] animate-pulse-slow" />
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[350px] h-[230px] bg-slate-300/16 rounded-full blur-[110px] animate-pulse-slow animation-delay-2000" />
      <div className="absolute -bottom-20 right-[15%] w-[300px] h-[250px] bg-indigo-300/16 rounded-full blur-[100px] animate-pulse-slow animation-delay-4000" />

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
