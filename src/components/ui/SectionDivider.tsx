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

      // Main bright line (center)
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 1, w, 1);

      // Bright core highlight at sweep position
      const coreGlow = ctx.createRadialGradient(sweepX, 1, 0, sweepX, 1, w * 0.12);
      if (isDark) {
        coreGlow.addColorStop(0, "rgba(165, 180, 252, 0.9)");
        coreGlow.addColorStop(0.3, "rgba(139, 92, 246, 0.5)");
        coreGlow.addColorStop(0.6, "rgba(34, 211, 238, 0.2)");
        coreGlow.addColorStop(1, "rgba(99, 102, 241, 0)");
      } else {
        coreGlow.addColorStop(0, "rgba(129, 140, 248, 0.7)");
        coreGlow.addColorStop(0.3, "rgba(124, 58, 237, 0.35)");
        coreGlow.addColorStop(0.6, "rgba(6, 182, 212, 0.15)");
        coreGlow.addColorStop(1, "rgba(79, 70, 229, 0)");
      }
      ctx.fillStyle = coreGlow;
      ctx.fillRect(0, 0, w, 3);

      // Soft glow above and below
      const glowGradient = ctx.createLinearGradient(0, 0, w, 0);
      if (isDark) {
        glowGradient.addColorStop(0, "rgba(99, 102, 241, 0)");
        glowGradient.addColorStop(Math.max(0.05, (sweepX / w) - 0.2), "rgba(99, 102, 241, 0.06)");
        glowGradient.addColorStop(Math.max(0.1, (sweepX / w) - 0.08), "rgba(139, 92, 246, 0.25)");
        glowGradient.addColorStop(Math.min(0.95, sweepX / w), "rgba(165, 180, 252, 0.35)");
        glowGradient.addColorStop(Math.min(0.95, (sweepX / w) + 0.08), "rgba(139, 92, 246, 0.25)");
        glowGradient.addColorStop(Math.min(0.98, (sweepX / w) + 0.2), "rgba(99, 102, 241, 0.06)");
        glowGradient.addColorStop(1, "rgba(99, 102, 241, 0)");
      } else {
        glowGradient.addColorStop(0, "rgba(79, 70, 229, 0)");
        glowGradient.addColorStop(Math.max(0.05, (sweepX / w) - 0.2), "rgba(79, 70, 229, 0.04)");
        glowGradient.addColorStop(Math.max(0.1, (sweepX / w) - 0.08), "rgba(124, 58, 237, 0.18)");
        glowGradient.addColorStop(Math.min(0.95, sweepX / w), "rgba(129, 140, 248, 0.25)");
        glowGradient.addColorStop(Math.min(0.95, (sweepX / w) + 0.08), "rgba(124, 58, 237, 0.18)");
        glowGradient.addColorStop(Math.min(0.98, (sweepX / w) + 0.2), "rgba(79, 70, 229, 0.04)");
        glowGradient.addColorStop(1, "rgba(79, 70, 229, 0)");
      }

      ctx.fillStyle = glowGradient;
      ctx.fillRect(0, 0, w, 1);
      ctx.fillRect(0, 2, w, 1);

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
      {/* Outer ambient glow */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-20 pointer-events-none">
        <div className="absolute inset-x-[5%] top-0 h-full bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent blur-2xl animate-pulse-slow" />
      </div>
      {/* Inner shine glow */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-8 pointer-events-none">
        <div className="absolute inset-x-[15%] top-0 h-full bg-gradient-to-r from-transparent via-violet-400/15 to-transparent blur-xl" />
      </div>
      <canvas
        ref={canvasRef}
        className="w-full relative"
        style={{ height: "3px", marginTop: "-1.5px" }}
      />
    </div>
  );
}
