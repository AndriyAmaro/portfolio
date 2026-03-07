import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "main" | "article";
}

export function Container({ children, className, as: Component = "div" }: ContainerProps) {
  return (
    <Component
      className={cn(
        "w-full max-w-[1200px] mx-auto px-6 md:px-8 lg:px-16",
        className
      )}
    >
      {children}
    </Component>
  );
}
