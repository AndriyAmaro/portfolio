"use client";

import { useEffect, useState } from "react";

/**
 * Observes the `html.light-mode` class (toggled by the Header theme switch via
 * localStorage). WebGL can't read CSS `light-dark()`, so the 3D scene palette
 * is driven by this hook instead.
 */
export function useThemeObserver(): "light" | "dark" {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const read = () =>
      setTheme(
        document.documentElement.classList.contains("light-mode") ? "light" : "dark"
      );
    read();
    const obs = new MutationObserver(read);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => obs.disconnect();
  }, []);

  return theme;
}
