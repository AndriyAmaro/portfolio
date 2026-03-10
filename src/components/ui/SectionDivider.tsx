"use client";

import { useEffect, useRef } from "react";

export function SectionDivider() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
      canvas.height = 3;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const animate = () => {
      const w = canvas.width;
      ctx.clearRect(0, 0, w, 3);
      time += 0.008;

      const isDark = !document.documentElement.classList.contains("light-mode");

      // Animated gradient sweep
      const sweepX = (Math.sin(time) * 0.5 + 0.5) * w;

      const gradient = ctx.createLinearGradient(0, 0, w, 0);

      if (isDark) {
        gradient.addColorStop(0, "rgba(99, 102, 241, 0)");
        gradient.addColorStop(Math.max(0.05, (sweepX / w) - 0.15), "rgba(99, 102, 241, 0.15)");
        gradient.addColorStop(Math.max(0.1, (sweepX / w) - 0.05), "rgba(139, 92, 246, 0.5)");
        gradient.addColorStop(Math.min(0.95, sweepX / w), "rgba(34, 211, 238, 0.6)");
        gradient.addColorStop(Math.min(0.95, (sweepX / w) + 0.05), "rgba(139, 92, 246, 0.5)");
        gradient.addColorStop(Math.min(0.98, (sweepX / w) + 0.15), "rgba(99, 102, 241, 0.15)");
        gradient.addColorStop(1, "rgba(99, 102, 241, 0)");
      } else {
        gradient.addColorStop(0, "rgba(79, 70, 229, 0)");
        gradient.addColorStop(Math.max(0.05, (sweepX / w) - 0.15), "rgba(79, 70, 229, 0.12)");
        gradient.addColorStop(Math.max(0.1, (sweepX / w) - 0.05), "rgba(124, 58, 237, 0.35)");
        gradient.addColorStop(Math.min(0.95, sweepX / w), "rgba(6, 182, 212, 0.45)");
        gradient.addColorStop(Math.min(0.95, (sweepX / w) + 0.05), "rgba(124, 58, 237, 0.35)");
        gradient.addColorStop(Math.min(0.98, (sweepX / w) + 0.15), "rgba(79, 70, 229, 0.12)");
        gradient.addColorStop(1, "rgba(79, 70, 229, 0)");
      }

      // Main line
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, 1);

      // Glow line (softer, wider)
      const glowGradient = ctx.createLinearGradient(0, 0, w, 0);
      if (isDark) {
        glowGradient.addColorStop(0, "rgba(99, 102, 241, 0)");
        glowGradient.addColorStop(0.15, "rgba(99, 102, 241, 0.08)");
        glowGradient.addColorStop(0.35, "rgba(139, 92, 246, 0.2)");
        glowGradient.addColorStop(0.5, "rgba(34, 211, 238, 0.15)");
        glowGradient.addColorStop(0.65, "rgba(139, 92, 246, 0.2)");
        glowGradient.addColorStop(0.85, "rgba(99, 102, 241, 0.08)");
        glowGradient.addColorStop(1, "rgba(99, 102, 241, 0)");
      } else {
        glowGradient.addColorStop(0, "rgba(79, 70, 229, 0)");
        glowGradient.addColorStop(0.15, "rgba(79, 70, 229, 0.05)");
        glowGradient.addColorStop(0.35, "rgba(124, 58, 237, 0.12)");
        glowGradient.addColorStop(0.5, "rgba(6, 182, 212, 0.1)");
        glowGradient.addColorStop(0.65, "rgba(124, 58, 237, 0.12)");
        glowGradient.addColorStop(0.85, "rgba(79, 70, 229, 0.05)");
        glowGradient.addColorStop(1, "rgba(79, 70, 229, 0)");
      }

      ctx.fillStyle = glowGradient;
      ctx.fillRect(0, 1, w, 2);

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="relative w-full h-0 z-10 -my-px" aria-hidden="true">
      {/* Ambient glow behind the line */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-12 pointer-events-none">
        <div className="absolute inset-x-[10%] top-0 h-full bg-gradient-to-r from-transparent via-indigo-500/8 to-transparent blur-xl" />
      </div>
      <canvas
        ref={canvasRef}
        className="w-full relative"
        style={{ height: "3px", marginTop: "-1px" }}
      />
    </div>
  );
}
