"use client";

import { useEffect, useRef } from "react";

// ---------------------------------------------------------------------------
// Starburst Circuit Background · Lines radiating from center outward
// Inspired by: hyperspace / data-burst / circuit explosion aesthetic
// ---------------------------------------------------------------------------

interface Ray {
  angle: number;
  length: number;       // how far it extends
  thickness: number;
  speed: number;        // growth/pulse speed
  opacity: number;
  offset: number;       // animation phase offset
  glow: number;         // glow intensity multiplier
}

interface StarParticle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

interface FlowParticle {
  angle: number;
  dist: number;
  speed: number;
  size: number;
  opacity: number;
  maxDist: number;
}

interface GlowNode {
  angle: number;
  dist: number;
  size: number;
  pulsePhase: number;
  brightness: number;
}

interface SkillLabel {
  text: string;
  angle: number;
  dist: number;
  speed: number;
  maxDist: number;
  opacity: number;
  fontSize: number;
}

// Skills from portfolio · synced with data/skills.ts
const SKILLS = [
  "React", "Next.js", "TypeScript", "Tailwind", "Framer Motion",
  "Node.js", "Prisma", "PostgreSQL", "Zod", "Hono",
  "Docker", "Git", "Vercel", "Vitest", "Redis",
  "Socket.io", "Zustand", "Radix UI", "REST API", "Turborepo",
];

export function FuturisticBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationId: number;
    let time = 0;
    let w = 0;
    let h = 0;
    let cx = 0;
    let cy = 0;

    // State
    let rays: Ray[] = [];
    let stars: StarParticle[] = [];
    let flowParticles: FlowParticle[] = [];
    let glowNodes: GlowNode[] = [];
    let skillLabels: SkillLabel[] = [];

    // -----------------------------------------------------------------
    // Build geometry on resize
    // -----------------------------------------------------------------
    const build = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      cx = w * 0.5;
      const isSmallMobile = w < 400;
      const isMobile = w < 768;
      cy = isSmallMobile ? h * 0.38 : isMobile ? h * 0.34 : h * 0.48;

      const maxRadius = Math.sqrt(cx * cx + cy * cy) * 1.2;

      // --- Rays radiating from center ---
      rays = [];

      // Dense horizontal rays (left & right) · strongest
      for (let i = 0; i < 30; i++) {
        // Right side
        const angleR = (Math.random() - 0.5) * 0.6; // narrow spread around 0 (right)
        rays.push({
          angle: angleR,
          length: maxRadius * (0.6 + Math.random() * 0.4),
          thickness: 0.5 + Math.random() * 1.8,
          speed: 0.3 + Math.random() * 0.8,
          opacity: 0.15 + Math.random() * 0.35,
          offset: Math.random() * Math.PI * 2,
          glow: 0.8 + Math.random() * 0.4,
        });

        // Left side
        const angleL = Math.PI + (Math.random() - 0.5) * 0.6;
        rays.push({
          angle: angleL,
          length: maxRadius * (0.6 + Math.random() * 0.4),
          thickness: 0.5 + Math.random() * 1.8,
          speed: 0.3 + Math.random() * 0.8,
          opacity: 0.15 + Math.random() * 0.35,
          offset: Math.random() * Math.PI * 2,
          glow: 0.8 + Math.random() * 0.4,
        });
      }

      // Diagonal rays (all directions, sparser)
      for (let i = 0; i < 40; i++) {
        const angle = Math.random() * Math.PI * 2;
        rays.push({
          angle,
          length: maxRadius * (0.4 + Math.random() * 0.6),
          thickness: 0.3 + Math.random() * 1.2,
          speed: 0.2 + Math.random() * 0.6,
          opacity: 0.08 + Math.random() * 0.2,
          offset: Math.random() * Math.PI * 2,
          glow: 0.5 + Math.random() * 0.5,
        });
      }

      // --- Star particles scattered across ---
      stars = [];
      for (let i = 0; i < 120; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size: 0.5 + Math.random() * 2,
          opacity: 0.2 + Math.random() * 0.6,
          twinkleSpeed: 1 + Math.random() * 3,
          twinklePhase: Math.random() * Math.PI * 2,
        });
      }

      // --- Flow particles traveling outward along rays ---
      flowParticles = [];
      for (let i = 0; i < 60; i++) {
        const angle = Math.random() * Math.PI * 2;
        flowParticles.push({
          angle,
          dist: Math.random() * maxRadius * 0.8,
          speed: 0.5 + Math.random() * 2,
          size: 1 + Math.random() * 2.5,
          opacity: 0.3 + Math.random() * 0.5,
          maxDist: maxRadius * (0.5 + Math.random() * 0.5),
        });
      }

      // --- Skill labels flowing outward · heavier on left & right ---
      skillLabels = [];
      const labelCount = isMobile ? 12 : 18;
      const minDist = isMobile ? 120 : 60;
      for (let i = 0; i < labelCount; i++) {
        // 70% go left or right, 30% any direction
        let angle: number;
        if (i < Math.floor(labelCount * 0.7)) {
          // Lateral · left or right with slight vertical spread
          const side = i % 2 === 0 ? 0 : Math.PI; // right or left
          angle = side + (Math.random() - 0.5) * 1.2; // ±~35° spread
        } else {
          angle = Math.random() * Math.PI * 2;
        }
        skillLabels.push({
          text: SKILLS[i % SKILLS.length],
          angle,
          dist: minDist + Math.random() * maxRadius * 0.5,
          speed: 0.25 + Math.random() * 0.5,
          maxDist: maxRadius * (0.55 + Math.random() * 0.35),
          opacity: isMobile ? 0.12 + Math.random() * 0.15 : 0.18 + Math.random() * 0.2,
          fontSize: isMobile ? 10 + Math.floor(Math.random() * 2) : 11 + Math.floor(Math.random() * 3),
        });
      }

      // --- Glow nodes at intersections ---
      glowNodes = [];
      for (let i = 0; i < 35; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = 80 + Math.random() * (maxRadius * 0.7);
        glowNodes.push({
          angle,
          dist,
          size: 2 + Math.random() * 4,
          pulsePhase: Math.random() * Math.PI * 2,
          brightness: 0.4 + Math.random() * 0.6,
        });
      }
    };

    build();
    window.addEventListener("resize", build);

    // -----------------------------------------------------------------
    // Animation
    // -----------------------------------------------------------------
    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.016;

      const isDark = !document.documentElement.classList.contains("light-mode");

      // Global opacity multiplier · light mode much softer to not fight text
      const om = isDark ? 1 : 0.7;

      // Colors
      const blueR = isDark ? 70 : 80;
      const blueG = isDark ? 130 : 100;
      const blueB = isDark ? 240 : 200;

      const cyanR = isDark ? 40 : 60;
      const cyanG = isDark ? 200 : 140;
      const cyanB = isDark ? 255 : 200;

      const whiteGlow = isDark ? "200, 220, 255" : "120, 130, 180";

      // =============================================================
      // Layer 1 · Center horizontal lens flare
      // =============================================================
      const flareW = w * 0.7;
      const flareH = 3;
      const flareGrad = ctx.createLinearGradient(cx - flareW / 2, cy, cx + flareW / 2, cy);
      const flarePulse = 0.6 + Math.sin(time * 0.7) * 0.4;
      flareGrad.addColorStop(0, "rgba(40, 200, 255, 0)");
      flareGrad.addColorStop(0.15, `rgba(40, 200, 255, ${0.1 * flarePulse * om})`);
      flareGrad.addColorStop(0.5, `rgba(${whiteGlow}, ${0.5 * flarePulse * om})`);
      flareGrad.addColorStop(0.85, `rgba(40, 200, 255, ${0.1 * flarePulse * om})`);
      flareGrad.addColorStop(1, "rgba(40, 200, 255, 0)");

      ctx.fillStyle = flareGrad;
      ctx.fillRect(cx - flareW / 2, cy - flareH, flareW, flareH * 2);

      // Wider soft flare
      const softFlareH = 40;
      const softGrad = ctx.createLinearGradient(cx - flareW / 2, cy, cx + flareW / 2, cy);
      softGrad.addColorStop(0, "rgba(40, 200, 255, 0)");
      softGrad.addColorStop(0.3, `rgba(40, 200, 255, ${0.03 * flarePulse * om})`);
      softGrad.addColorStop(0.5, `rgba(${whiteGlow}, ${0.08 * flarePulse * om})`);
      softGrad.addColorStop(0.7, `rgba(40, 200, 255, ${0.03 * flarePulse * om})`);
      softGrad.addColorStop(1, "rgba(40, 200, 255, 0)");
      ctx.fillStyle = softGrad;
      ctx.fillRect(cx - flareW / 2, cy - softFlareH, flareW, softFlareH * 2);

      // =============================================================
      // Layer 2 · Center radial glow
      // =============================================================
      const centerGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 300);
      centerGlow.addColorStop(0, `rgba(${whiteGlow}, ${0.25 * flarePulse * om})`);
      centerGlow.addColorStop(0.15, `rgba(${cyanR}, ${cyanG}, ${cyanB}, ${0.12 * flarePulse * om})`);
      centerGlow.addColorStop(0.4, `rgba(${blueR}, ${blueG}, ${blueB}, ${0.04 * om})`);
      centerGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = centerGlow;
      ctx.fillRect(0, 0, w, h);

      // =============================================================
      // Layer 3 · Radiating rays (starburst)
      // =============================================================
      rays.forEach((ray) => {
        const pulse = 0.5 + Math.sin(time * ray.speed + ray.offset) * 0.5;
        const alpha = ray.opacity * (0.4 + pulse * 0.6) * om;

        const endX = cx + Math.cos(ray.angle) * ray.length;
        const endY = cy + Math.sin(ray.angle) * ray.length;

        // Main line gradient: bright at center, fade outward
        const grad = ctx.createLinearGradient(cx, cy, endX, endY);
        grad.addColorStop(0, `rgba(${whiteGlow}, ${alpha * ray.glow})`);
        grad.addColorStop(0.05, `rgba(${cyanR}, ${cyanG}, ${cyanB}, ${alpha * 0.9})`);
        grad.addColorStop(0.15, `rgba(${blueR}, ${blueG}, ${blueB}, ${alpha * 0.6})`);
        grad.addColorStop(0.4, `rgba(${blueR}, ${blueG}, ${blueB}, ${alpha * 0.25})`);
        grad.addColorStop(0.7, `rgba(${blueR}, ${blueG}, ${blueB}, ${alpha * 0.08})`);
        grad.addColorStop(1, `rgba(${blueR}, ${blueG}, ${blueB}, 0)`);

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = ray.thickness;
        ctx.stroke();
      });

      // =============================================================
      // Layer 4 · Flow particles moving outward
      // =============================================================
      flowParticles.forEach((p) => {
        p.dist += p.speed;
        if (p.dist > p.maxDist) {
          p.dist = 10 + Math.random() * 40;
          p.angle = Math.random() * Math.PI * 2;
          p.speed = 0.5 + Math.random() * 2;
        }

        const px = cx + Math.cos(p.angle) * p.dist;
        const py = cy + Math.sin(p.angle) * p.dist;

        // Fade: bright in middle of travel, dim at start and end
        const travelRatio = p.dist / p.maxDist;
        const fade = Math.sin(travelRatio * Math.PI) * (1 - travelRatio * 0.5);
        const alpha = p.opacity * fade * om;

        if (alpha < 0.02) return;

        // Glow
        ctx.beginPath();
        ctx.arc(px, py, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cyanR}, ${cyanG}, ${cyanB}, ${alpha * 0.15})`;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cyanR}, ${cyanG}, ${cyanB}, ${alpha})`;
        ctx.fill();
      });

      // =============================================================
      // Layer 5 · Glow nodes (bright junction points)
      // =============================================================
      glowNodes.forEach((node) => {
        const pulse = 0.4 + Math.sin(time * 2 + node.pulsePhase) * 0.6;
        const nx = cx + Math.cos(node.angle) * node.dist;
        const ny = cy + Math.sin(node.angle) * node.dist;

        // Distance-based fade (closer to center = brighter)
        const maxR = Math.sqrt(cx * cx + cy * cy);
        const distFade = 1 - (node.dist / maxR) * 0.6;
        const alpha = node.brightness * pulse * distFade * om;

        // Outer glow
        ctx.beginPath();
        ctx.arc(nx, ny, node.size * 5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cyanR}, ${cyanG}, ${cyanB}, ${alpha * 0.08})`;
        ctx.fill();

        // Mid glow
        ctx.beginPath();
        ctx.arc(nx, ny, node.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cyanR}, ${cyanG}, ${cyanB}, ${alpha * 0.2})`;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(nx, ny, node.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${whiteGlow}, ${alpha * 0.9})`;
        ctx.fill();
      });

      // =============================================================
      // Layer 6 · Star particles (twinkling background)
      // =============================================================
      stars.forEach((star) => {
        const twinkle = 0.3 + Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.7;
        const alpha = star.opacity * Math.max(0, twinkle) * om;

        if (alpha < 0.05) return;

        // Star glow
        if (star.size > 1.2) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${cyanR}, ${cyanG}, ${cyanB}, ${alpha * 0.06})`;
          ctx.fill();
        }

        // Star core
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${whiteGlow}, ${alpha})`;
        ctx.fill();
      });

      // =============================================================
      // Layer 7 · Skill labels flowing outward
      // =============================================================
      ctx.font = `600 12px "Geist Mono", "SF Mono", "Fira Code", monospace`;
      skillLabels.forEach((skill) => {
        skill.dist += skill.speed;
        if (skill.dist > skill.maxDist) {
          skill.dist = 50 + Math.random() * 30;
          skill.angle = Math.random() * Math.PI * 2;
          skill.speed = 0.3 + Math.random() * 0.6;
          skill.text = SKILLS[Math.floor(Math.random() * SKILLS.length)];
        }

        const sx = cx + Math.cos(skill.angle) * skill.dist;
        const sy = cy + Math.sin(skill.angle) * skill.dist;

        // Fade: slow fade in (0→40%) · full brightness (40→75%) · fast fade out (75→100%)
        const t = skill.dist / skill.maxDist;
        let fade: number;
        if (t < 0.4) {
          fade = t / 0.4; // gradual appear
        } else if (t < 0.75) {
          fade = 1; // full visibility
        } else {
          fade = 1 - (t - 0.75) / 0.25; // quick vanish at edge
        }
        const alpha = skill.opacity * Math.max(0, fade) * om;

        if (alpha < 0.03) return;

        // Glow behind text
        ctx.font = `600 ${skill.fontSize}px "Geist Mono", "SF Mono", "Fira Code", monospace`;
        const textW = ctx.measureText(skill.text).width;
        const glowGrad = ctx.createRadialGradient(sx + textW / 2, sy - 4, 0, sx + textW / 2, sy - 4, textW * 0.7);
        glowGrad.addColorStop(0, `rgba(${cyanR}, ${cyanG}, ${cyanB}, ${alpha * 0.08})`);
        glowGrad.addColorStop(1, `rgba(${cyanR}, ${cyanG}, ${cyanB}, 0)`);
        ctx.fillStyle = glowGrad;
        ctx.fillRect(sx - 10, sy - skill.fontSize - 4, textW + 20, skill.fontSize + 12);

        // Text
        ctx.fillStyle = `rgba(${cyanR}, ${cyanG}, ${cyanB}, ${alpha})`;
        ctx.fillText(skill.text, sx, sy);
      });

      // =============================================================
      // Layer 8 · Subtle scan line
      // =============================================================
      const scanY = (time * 40) % (h + 200) - 100;
      const scanGrad = ctx.createLinearGradient(0, scanY - 60, 0, scanY + 60);
      scanGrad.addColorStop(0, "rgba(40, 200, 255, 0)");
      scanGrad.addColorStop(0.5, `rgba(40, 200, 255, ${0.025 * om})`);
      scanGrad.addColorStop(1, "rgba(40, 200, 255, 0)");
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 60, w, 120);

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", build);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      {/* Main Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none"
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 z-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(70, 130, 240, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(70, 130, 240, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Atmospheric depth orbs · hidden in light mode */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/8 rounded-full blur-[180px] light-mode-hide" />
      <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-indigo-500/6 rounded-full blur-[150px] animate-pulse-slow light-mode-hide" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[130px] animate-pulse-slow animation-delay-2000 light-mode-hide" />

      {/* Lateral glows · hidden in light mode */}
      <div className="absolute top-1/3 -left-20 w-[400px] h-[600px] bg-blue-500/10 rounded-full blur-[140px] animate-pulse-slow light-mode-hide" />
      <div className="absolute bottom-1/3 -right-20 w-[400px] h-[600px] bg-blue-500/10 rounded-full blur-[140px] animate-pulse-slow animation-delay-2000 light-mode-hide" />

      {/* Corner accents · softer in light mode */}
      <div className="absolute top-0 left-0 w-48 h-48 border-l-2 border-t-2 border-blue-500/20 rounded-tl-3xl light-mode-soft-border" />
      <div className="absolute top-0 right-0 w-48 h-48 border-r-2 border-t-2 border-blue-500/20 rounded-tr-3xl light-mode-soft-border" />
      <div className="absolute bottom-0 left-0 w-48 h-48 border-l-2 border-b-2 border-blue-500/20 rounded-bl-3xl light-mode-soft-border" />
      <div className="absolute bottom-0 right-0 w-48 h-48 border-r-2 border-b-2 border-blue-500/20 rounded-br-3xl light-mode-soft-border" />

      {/* Deep vignette · only in dark mode */}
      <div
        className="absolute inset-0 z-0 pointer-events-none light-mode-hide"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 48%, transparent 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.6) 100%)",
        }}
      />
    </>
  );
}
