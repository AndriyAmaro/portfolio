"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Small delay for the curtain effect to feel intentional
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Content with fade-in */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {children}
      </motion.div>

      {/* Curtain overlay that slides away */}
      <motion.div
        className="page-curtain"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{
          duration: 0.7,
          ease: [0.76, 0, 0.24, 1],
          delay: 0.05,
        }}
        style={{ transformOrigin: "top" }}
        aria-hidden="true"
      />
    </>
  );
}
