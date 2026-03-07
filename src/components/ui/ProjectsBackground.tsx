"use client";

import { useEffect, useRef } from "react";

export function ProjectsBackground() {
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

    // Geometric arc configuration
    interface GeometricArc {
      centerX: number;
      centerY: number;
      radius: number;
      startAngle: number;
      endAngle: number;
      opacity: number;
      rotationSpeed: number;
      phase: number;
    }

    // Create concentric arcs from top-right corner
    const arcsTopRight: GeometricArc[] = [];
    const centerX1 = canvas.width * 1.1;
    const centerY1 = canvas.height * -0.1;

    for (let i = 0; i < 30; i++) {
      arcsTopRight.push({
        centerX: centerX1,
        centerY: centerY1,
        radius: 150 + i * 35,
        startAngle: Math.PI * 0.5,
        endAngle: Math.PI * 1.3,
        opacity: 0.18 + (i % 3 === 0 ? 0.15 : 0),
        rotationSpeed: 0.02 + (i % 2) * 0.01,
        phase: i * 0.1,
      });
    }

    // Create concentric arcs from bottom-left corner
    const arcsBottomLeft: GeometricArc[] = [];
    const centerX2 = canvas.width * -0.1;
    const centerY2 = canvas.height * 1.1;

    for (let i = 0; i < 25; i++) {
      arcsBottomLeft.push({
        centerX: centerX2,
        centerY: centerY2,
        radius: 120 + i * 40,
        startAngle: -Math.PI * 0.3,
        endAngle: Math.PI * 0.5,
        opacity: 0.15 + (i % 3 === 0 ? 0.12 : 0),
        rotationSpeed: -0.015 + (i % 2) * 0.005,
        phase: i * 0.15,
      });
    }

    // Spiral lines configuration
    interface SpiralLine {
      centerX: number;
      centerY: number;
      startRadius: number;
      endRadius: number;
      turns: number;
      opacity: number;
      rotationSpeed: number;
      phase: number;
    }

    const spirals: SpiralLine[] = [
      {
        centerX: canvas.width * 0.75,
        centerY: canvas.height * 0.3,
        startRadius: 50,
        endRadius: 250,
        turns: 2.5,
        opacity: 0.28,
        rotationSpeed: 0.03,
        phase: 0,
      },
      {
        centerX: canvas.width * 0.25,
        centerY: canvas.height * 0.7,
        startRadius: 40,
        endRadius: 180,
        turns: 2,
        opacity: 0.25,
        rotationSpeed: -0.025,
        phase: Math.PI,
      },
    ];

    // Floating geometric orbs
    interface Orb {
      x: number;
      y: number;
      radius: number;
      opacity: number;
      pulseSpeed: number;
      pulsePhase: number;
    }

    const orbs: Orb[] = [
      { x: canvas.width * 0.78, y: canvas.height * 0.32, radius: 70, opacity: 0.3, pulseSpeed: 0.4, pulsePhase: 0 },
      { x: canvas.width * 0.18, y: canvas.height * 0.72, radius: 55, opacity: 0.25, pulseSpeed: 0.35, pulsePhase: Math.PI },
      { x: canvas.width * 0.88, y: canvas.height * 0.78, radius: 40, opacity: 0.2, pulseSpeed: 0.5, pulsePhase: Math.PI * 0.5 },
      { x: canvas.width * 0.12, y: canvas.height * 0.22, radius: 30, opacity: 0.18, pulseSpeed: 0.45, pulsePhase: Math.PI * 1.5 },
    ];

    // Draw geometric arc
    const drawArc = (arc: GeometricArc, t: number) => {
      const rotation = t * arc.rotationSpeed + arc.phase;

      ctx.beginPath();
      ctx.arc(
        arc.centerX,
        arc.centerY,
        arc.radius,
        arc.startAngle + rotation,
        arc.endAngle + rotation
      );

      // Create gradient for the arc
      const gradient = ctx.createLinearGradient(
        arc.centerX - arc.radius,
        arc.centerY - arc.radius,
        arc.centerX + arc.radius,
        arc.centerY + arc.radius
      );
      gradient.addColorStop(0, `rgba(139, 92, 246, 0)`);
      gradient.addColorStop(0.3, `rgba(139, 92, 246, ${arc.opacity})`);
      gradient.addColorStop(0.5, `rgba(99, 102, 241, ${arc.opacity * 1.4})`);
      gradient.addColorStop(0.7, `rgba(139, 92, 246, ${arc.opacity})`);
      gradient.addColorStop(1, `rgba(99, 102, 241, 0)`);

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    // Draw spiral
    const drawSpiral = (spiral: SpiralLine, t: number) => {
      const rotation = t * spiral.rotationSpeed + spiral.phase;
      const segments = 200;

      ctx.beginPath();

      for (let i = 0; i <= segments; i++) {
        const progress = i / segments;
        const angle = progress * spiral.turns * Math.PI * 2 + rotation;
        const radius = spiral.startRadius + (spiral.endRadius - spiral.startRadius) * progress;

        const x = spiral.centerX + Math.cos(angle) * radius;
        const y = spiral.centerY + Math.sin(angle) * radius;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      const gradient = ctx.createRadialGradient(
        spiral.centerX,
        spiral.centerY,
        spiral.startRadius,
        spiral.centerX,
        spiral.centerY,
        spiral.endRadius
      );
      gradient.addColorStop(0, `rgba(139, 92, 246, ${spiral.opacity * 0.6})`);
      gradient.addColorStop(0.5, `rgba(99, 102, 241, ${spiral.opacity * 1.2})`);
      gradient.addColorStop(1, `rgba(139, 92, 246, ${spiral.opacity * 0.4})`);

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    // Draw orb
    const drawOrb = (orb: Orb, t: number) => {
      const pulse = Math.sin(t * orb.pulseSpeed + orb.pulsePhase) * 0.2 + 1;
      const currentRadius = orb.radius * pulse;
      const currentOpacity = orb.opacity * (0.8 + Math.sin(t * orb.pulseSpeed + orb.pulsePhase) * 0.2);

      // Outer glow
      const gradient = ctx.createRadialGradient(
        orb.x, orb.y, 0,
        orb.x, orb.y, currentRadius * 2
      );
      gradient.addColorStop(0, `rgba(99, 102, 241, ${currentOpacity})`);
      gradient.addColorStop(0.4, `rgba(139, 92, 246, ${currentOpacity * 0.6})`);
      gradient.addColorStop(1, `rgba(99, 102, 241, 0)`);

      ctx.beginPath();
      ctx.arc(orb.x, orb.y, currentRadius * 2, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Inner orb with highlight
      const innerGradient = ctx.createRadialGradient(
        orb.x - currentRadius * 0.3, orb.y - currentRadius * 0.3, 0,
        orb.x, orb.y, currentRadius
      );
      innerGradient.addColorStop(0, `rgba(165, 180, 252, ${currentOpacity * 0.9})`);
      innerGradient.addColorStop(0.5, `rgba(99, 102, 241, ${currentOpacity * 0.6})`);
      innerGradient.addColorStop(1, `rgba(67, 56, 202, ${currentOpacity * 0.4})`);

      ctx.beginPath();
      ctx.arc(orb.x, orb.y, currentRadius, 0, Math.PI * 2);
      ctx.fillStyle = innerGradient;
      ctx.fill();

      // Geometric ring around orb
      ctx.beginPath();
      ctx.arc(orb.x, orb.y, currentRadius * 1.5, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(139, 92, 246, ${currentOpacity * 0.3})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.016;

      // Draw orbs first (background)
      orbs.forEach(orb => drawOrb(orb, time));

      // Draw concentric arcs
      arcsTopRight.forEach(arc => drawArc(arc, time));
      arcsBottomLeft.forEach(arc => drawArc(arc, time));

      // Draw spirals
      spirals.forEach(spiral => drawSpiral(spiral, time));

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
      {/* Base gradient - Dark purple theme */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #0f0d1f 0%, #13112b 25%, #1a1640 50%, #1e1b4b 75%, #13112b 100%)",
        }}
      />

      {/* Canvas for animated elements */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.95 }}
      />

      {/* Gradient orbs for depth */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-600/12 rounded-full blur-[180px] animate-pulse-slow" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[150px] animate-pulse-slow animation-delay-2000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-purple-500/6 rounded-full blur-[200px]" />

      {/* Corner glows - top */}
      <div className="absolute -top-10 -left-10 w-[450px] h-[450px] bg-violet-500/15 rounded-full blur-[140px] animate-pulse-slow" />
      <div className="absolute -top-10 -right-10 w-[450px] h-[450px] bg-indigo-500/12 rounded-full blur-[140px] animate-pulse-slow animation-delay-2000" />

      {/* Corner glows - bottom */}
      <div className="absolute -bottom-10 -left-10 w-[400px] h-[400px] bg-indigo-500/12 rounded-full blur-[130px] animate-pulse-slow animation-delay-4000" />
      <div className="absolute -bottom-10 -right-10 w-[400px] h-[400px] bg-violet-500/15 rounded-full blur-[130px] animate-pulse-slow" />

      {/* Lateral glows - sides */}
      <div className="absolute top-1/3 left-0 w-[350px] h-[550px] bg-violet-500/10 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[600px] bg-violet-500/10 rounded-full blur-[120px] animate-pulse-slow animation-delay-2000" />
      <div className="absolute bottom-1/3 left-0 w-[300px] h-[500px] bg-cyan-500/6 rounded-full blur-[100px] animate-pulse-slow animation-delay-4000" />
      <div className="absolute bottom-1/3 right-0 w-[300px] h-[500px] bg-cyan-500/6 rounded-full blur-[100px] animate-pulse-slow" />

      {/* Top fade for smooth transition */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(15,13,31,0.95) 0%, transparent 20%)",
        }}
      />

      {/* Bottom fade */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(0deg, rgba(15,13,31,0.9) 0%, transparent 20%)",
        }}
      />
    </div>
  );
}

/* Light mode version */
export function ProjectsBackgroundLight() {
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

    // Geometric arc configuration
    interface GeometricArc {
      centerX: number;
      centerY: number;
      radius: number;
      startAngle: number;
      endAngle: number;
      opacity: number;
      rotationSpeed: number;
      phase: number;
    }

    // Create concentric arcs from top-right corner
    const arcsTopRight: GeometricArc[] = [];
    const centerX1 = canvas.width * 1.1;
    const centerY1 = canvas.height * -0.1;

    for (let i = 0; i < 25; i++) {
      arcsTopRight.push({
        centerX: centerX1,
        centerY: centerY1,
        radius: 150 + i * 35,
        startAngle: Math.PI * 0.5,
        endAngle: Math.PI * 1.3,
        opacity: 0.18 + (i % 3 === 0 ? 0.15 : 0),
        rotationSpeed: 0.015 + (i % 2) * 0.008,
        phase: i * 0.1,
      });
    }

    // Create concentric arcs from bottom-left corner
    const arcsBottomLeft: GeometricArc[] = [];
    const centerX2 = canvas.width * -0.1;
    const centerY2 = canvas.height * 1.1;

    for (let i = 0; i < 20; i++) {
      arcsBottomLeft.push({
        centerX: centerX2,
        centerY: centerY2,
        radius: 120 + i * 40,
        startAngle: -Math.PI * 0.3,
        endAngle: Math.PI * 0.5,
        opacity: 0.15 + (i % 3 === 0 ? 0.12 : 0),
        rotationSpeed: -0.012 + (i % 2) * 0.004,
        phase: i * 0.15,
      });
    }

    // Spiral lines
    interface SpiralLine {
      centerX: number;
      centerY: number;
      startRadius: number;
      endRadius: number;
      turns: number;
      opacity: number;
      rotationSpeed: number;
      phase: number;
    }

    const spirals: SpiralLine[] = [
      {
        centerX: canvas.width * 0.75,
        centerY: canvas.height * 0.3,
        startRadius: 40,
        endRadius: 200,
        turns: 2,
        opacity: 0.25,
        rotationSpeed: 0.025,
        phase: 0,
      },
      {
        centerX: canvas.width * 0.25,
        centerY: canvas.height * 0.7,
        startRadius: 35,
        endRadius: 150,
        turns: 1.8,
        opacity: 0.22,
        rotationSpeed: -0.02,
        phase: Math.PI,
      },
    ];

    // Orbs - more visible like About section
    interface Orb {
      x: number;
      y: number;
      radius: number;
      opacity: number;
      pulseSpeed: number;
      pulsePhase: number;
    }

    const orbs: Orb[] = [
      { x: canvas.width * 0.78, y: canvas.height * 0.32, radius: 70, opacity: 0.28, pulseSpeed: 0.4, pulsePhase: 0 },
      { x: canvas.width * 0.18, y: canvas.height * 0.72, radius: 55, opacity: 0.25, pulseSpeed: 0.35, pulsePhase: Math.PI },
      { x: canvas.width * 0.85, y: canvas.height * 0.75, radius: 45, opacity: 0.2, pulseSpeed: 0.5, pulsePhase: Math.PI * 0.5 },
    ];

    const drawArc = (arc: GeometricArc, t: number) => {
      const rotation = t * arc.rotationSpeed + arc.phase;

      ctx.beginPath();
      ctx.arc(
        arc.centerX,
        arc.centerY,
        arc.radius,
        arc.startAngle + rotation,
        arc.endAngle + rotation
      );

      const gradient = ctx.createLinearGradient(
        arc.centerX - arc.radius,
        arc.centerY - arc.radius,
        arc.centerX + arc.radius,
        arc.centerY + arc.radius
      );
      gradient.addColorStop(0, `rgba(99, 102, 241, 0)`);
      gradient.addColorStop(0.3, `rgba(99, 102, 241, ${arc.opacity})`);
      gradient.addColorStop(0.5, `rgba(79, 70, 229, ${arc.opacity * 1.2})`);
      gradient.addColorStop(0.7, `rgba(99, 102, 241, ${arc.opacity})`);
      gradient.addColorStop(1, `rgba(99, 102, 241, 0)`);

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    };

    const drawSpiral = (spiral: SpiralLine, t: number) => {
      const rotation = t * spiral.rotationSpeed + spiral.phase;
      const segments = 150;

      ctx.beginPath();

      for (let i = 0; i <= segments; i++) {
        const progress = i / segments;
        const angle = progress * spiral.turns * Math.PI * 2 + rotation;
        const radius = spiral.startRadius + (spiral.endRadius - spiral.startRadius) * progress;

        const x = spiral.centerX + Math.cos(angle) * radius;
        const y = spiral.centerY + Math.sin(angle) * radius;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      const gradient = ctx.createRadialGradient(
        spiral.centerX,
        spiral.centerY,
        spiral.startRadius,
        spiral.centerX,
        spiral.centerY,
        spiral.endRadius
      );
      gradient.addColorStop(0, `rgba(99, 102, 241, ${spiral.opacity * 0.5})`);
      gradient.addColorStop(0.5, `rgba(79, 70, 229, ${spiral.opacity})`);
      gradient.addColorStop(1, `rgba(99, 102, 241, ${spiral.opacity * 0.3})`);

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    const drawOrb = (orb: Orb, t: number) => {
      const pulse = Math.sin(t * orb.pulseSpeed + orb.pulsePhase) * 0.2 + 1;
      const currentRadius = orb.radius * pulse;
      const currentOpacity = orb.opacity * (0.85 + Math.sin(t * orb.pulseSpeed + orb.pulsePhase) * 0.15);

      // Outer glow - more visible
      const gradient = ctx.createRadialGradient(
        orb.x, orb.y, 0,
        orb.x, orb.y, currentRadius * 2.2
      );
      gradient.addColorStop(0, `rgba(99, 102, 241, ${currentOpacity})`);
      gradient.addColorStop(0.4, `rgba(129, 140, 248, ${currentOpacity * 0.6})`);
      gradient.addColorStop(1, `rgba(99, 102, 241, 0)`);

      ctx.beginPath();
      ctx.arc(orb.x, orb.y, currentRadius * 2.2, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Inner orb - solid core
      const innerGradient = ctx.createRadialGradient(
        orb.x - currentRadius * 0.2, orb.y - currentRadius * 0.2, 0,
        orb.x, orb.y, currentRadius
      );
      innerGradient.addColorStop(0, `rgba(165, 180, 252, ${currentOpacity * 0.9})`);
      innerGradient.addColorStop(0.5, `rgba(99, 102, 241, ${currentOpacity * 0.6})`);
      innerGradient.addColorStop(1, `rgba(79, 70, 229, ${currentOpacity * 0.4})`);

      ctx.beginPath();
      ctx.arc(orb.x, orb.y, currentRadius, 0, Math.PI * 2);
      ctx.fillStyle = innerGradient;
      ctx.fill();

      // Ring
      ctx.beginPath();
      ctx.arc(orb.x, orb.y, currentRadius * 1.5, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(99, 102, 241, ${currentOpacity * 0.4})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.016;

      orbs.forEach(orb => drawOrb(orb, time));
      arcsTopRight.forEach(arc => drawArc(arc, time));
      arcsBottomLeft.forEach(arc => drawArc(arc, time));
      spirals.forEach(spiral => drawSpiral(spiral, time));

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
          background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 25%, #f1f5f9 50%, #e2e8f0 75%, #f8fafc 100%)",
        }}
      />

      {/* Canvas for animated elements */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.75 }}
      />

      {/* Gradient orbs - more visible like About section */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-indigo-300/20 rounded-full blur-[150px] animate-pulse-slow" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-indigo-200/18 rounded-full blur-[120px] animate-pulse-slow animation-delay-2000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-slate-300/15 rounded-full blur-[140px]" />

      {/* Lateral glows */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[550px] bg-indigo-300/15 rounded-full blur-[100px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 left-0 w-[350px] h-[500px] bg-indigo-200/12 rounded-full blur-[90px] animate-pulse-slow animation-delay-4000" />

      {/* Top fade */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.9) 0%, transparent 18%)",
        }}
      />
    </div>
  );
}
