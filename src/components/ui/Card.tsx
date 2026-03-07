"use client";

import { cn } from "@/lib/utils";
import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";

interface CardProps extends HTMLMotionProps<"div"> {
  variant?: "default" | "glass" | "glow" | "gradient";
  hover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", hover = true, children, ...props }, ref) => {
    const variants = {
      default: "bg-[var(--card-bg)] border border-[var(--border)]",
      glass: "card-glass",
      glow: "card-glow",
      gradient: "bg-gradient-to-br from-[var(--card-bg)] to-transparent border border-[var(--border)]",
    };

    const hoverStyles = hover && variant === "default"
      ? "hover:bg-[var(--card-bg-hover)] hover:border-[var(--border-hover)] hover:-translate-y-1"
      : hover ? "hover:-translate-y-1" : "";

    return (
      <motion.div
        ref={ref}
        className={cn(
          "rounded-xl p-6 transition-all duration-300",
          variants[variant],
          hoverStyles,
          className
        )}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";

export { Card };
