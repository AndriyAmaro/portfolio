"use client";

import { ScrollProgress } from "./ScrollProgress";
import { PageTransition } from "./PageTransition";

export function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollProgress />
      <PageTransition>{children}</PageTransition>
    </>
  );
}
