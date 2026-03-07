"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "primary" | "secondary" | "outline";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({ children, variant = "default", size = "sm", className }: BadgeProps) {
  const variants = {
    default: "bg-[var(--card-bg)] text-[var(--text-muted)] border border-[var(--border)]",
    primary: "bg-[var(--primary)]/20 text-[var(--primary)] border border-[var(--primary)]/30",
    secondary: "bg-[var(--secondary)]/20 text-[var(--secondary)] border border-[var(--secondary)]/30",
    outline: "bg-transparent border border-[var(--border)] text-[var(--foreground)]",
  };

  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium transition-colors",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}
