"use client";

import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { useTranslations } from "next-intl";

// Lazy load · 3D bundle só baixa quando entra no viewport
const ConstellationCanvas = lazy(() =>
  import("./ConstellationCanvas").then((m) => ({ default: m.ConstellationCanvas }))
);

export function ConstellationStack() {
  const t = useTranslations("skills.constellation");
  const sectionRef = useRef<HTMLDivElement>(null);
  const [shouldMount, setShouldMount] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Marca mount uma vez (não desmonta · evita recarga)
        if (entry.isIntersecting && !shouldMount) setShouldMount(true);
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05, rootMargin: "200px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldMount]);

  return (
    <div ref={sectionRef} className="constellation-stack">
      {/* Background visual layers · grid + radial mask */}
      <div className="constellation-bg-grid" aria-hidden />
      <div className="constellation-bg-mask" aria-hidden />

      {/* 3D Canvas · lazy + pause off-screen */}
      <div className="constellation-canvas-wrap">
        {shouldMount && (
          <Suspense fallback={null}>
            <ConstellationCanvas paused={!isInView} />
          </Suspense>
        )}
      </div>

      {/* UI overlay · header + meta */}
      <div className="constellation-ui">
        <header className="constellation-header">
          <div className="constellation-eyebrow-row">
            <span className="constellation-eyebrow-bar" aria-hidden />
            <span className="constellation-eyebrow">{t("eyebrow")}</span>
          </div>

          <h2 className="constellation-title">
            <span className="constellation-title-line">{t("titleLine1")}</span>
            <span className="constellation-title-gradient">{t("titleLine2")}</span>
          </h2>

          <p className="constellation-subtitle">{t("subtitle")}</p>

          <div className="constellation-status">
            <span className="constellation-dot" aria-hidden />
            <span className="constellation-status-text">{t("status")}</span>
            <span className="constellation-divider" aria-hidden>|</span>
            <span className="constellation-code">
              console.log(&apos;{t("ready")}&apos;)
              <span className="constellation-cursor" aria-hidden />
            </span>
          </div>
        </header>

        <footer className="constellation-footer">
          <div className="constellation-meta">
            <span>RENDER: WebGL 2.0</span>
            <span className="constellation-meta-divider">·</span>
            <span>THREE.js r170</span>
            <span className="constellation-meta-divider">·</span>
            <span>R3F v9</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
