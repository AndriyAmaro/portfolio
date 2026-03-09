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
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

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
      // Back layer · large slow waves
      { amplitude: 45, frequency: 0.003, speed: 0.3, phase: 0, yOffset: 0.2, thickness: 1.0, opacityBase: 0.12, colorType: "violet" },
      { amplitude: 40, frequency: 0.004, speed: 0.25, phase: 1.2, yOffset: 0.28, thickness: 0.9, opacityBase: 0.10, colorType: "indigo" },
      { amplitude: 55, frequency: 0.002, speed: 0.35, phase: 2.5, yOffset: 0.33, thickness: 1.1, opacityBase: 0.13, colorType: "cyan" },

      // Mid layer · medium waves
      { amplitude: 35, frequency: 0.005, speed: 0.4, phase: 0.8, yOffset: 0.42, thickness: 1.3, opacityBase: 0.16, colorType: "indigo" },
      { amplitude: 28, frequency: 0.006, speed: 0.45, phase: 2.0, yOffset: 0.5, thickness: 1.2, opacityBase: 0.14, colorType: "violet" },
      { amplitude: 38, frequency: 0.004, speed: 0.38, phase: 3.5, yOffset: 0.55, thickness: 1.4, opacityBase: 0.17, colorType: "cyan" },

      // Front layer · smaller faster waves
      { amplitude: 22, frequency: 0.007, speed: 0.55, phase: 1.5, yOffset: 0.65, thickness: 1.5, opacityBase: 0.2, colorType: "indigo" },
      { amplitude: 20, frequency: 0.008, speed: 0.5, phase: 3.0, yOffset: 0.72, thickness: 1.3, opacityBase: 0.18, colorType: "violet" },
      { amplitude: 28, frequency: 0.006, speed: 0.6, phase: 4.2, yOffset: 0.78, thickness: 1.6, opacityBase: 0.22, colorType: "cyan" },

      // Extra detail waves
      { amplitude: 18, frequency: 0.009, speed: 0.65, phase: 0.5, yOffset: 0.38, thickness: 0.8, opacityBase: 0.09, colorType: "indigo" },
      { amplitude: 50, frequency: 0.0025, speed: 0.2, phase: 1.8, yOffset: 0.6, thickness: 0.9, opacityBase: 0.11, colorType: "violet" },
      { amplitude: 25, frequency: 0.007, speed: 0.5, phase: 2.8, yOffset: 0.82, thickness: 1.0, opacityBase: 0.13, colorType: "cyan" },
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

      // --- Intersection glow nodes · where waves cross ---
      const nodeTime = time * 0.3;
      for (let i = 0; i < 8; i++) {
        const nx = (w * 0.1) + (i / 7) * (w * 0.8) + Math.sin(nodeTime + i * 1.7) * 30;
        const ny = (h * 0.3) + Math.sin(nodeTime * 0.7 + i * 2.3) * (h * 0.25);
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
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}

// Light mode version · same component, CSS handles the styling
export { EcosystemBackground as EcosystemBackgroundLight };
