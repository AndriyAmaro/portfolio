"use client";

import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { useTranslations } from "next-intl";

const DevStationCanvas = lazy(() =>
  import("./DevStationCanvas").then((m) => ({ default: m.DevStationCanvas }))
);

export function DevStation() {
  const t = useTranslations("skills.devstation");
  const sectionRef = useRef<HTMLDivElement>(null);
  const [shouldMount, setShouldMount] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !shouldMount) setShouldMount(true);
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05, rootMargin: "200px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldMount]);

  return (
    <div ref={sectionRef} className="devstation-stack">
      <div className="devstation-bg-grid" aria-hidden />
      <div className="devstation-bg-mask" aria-hidden />

      <div className="devstation-canvas-wrap">
        {shouldMount && (
          <Suspense fallback={null}>
            <DevStationCanvas paused={!isInView} />
          </Suspense>
        )}
      </div>

      <div className="devstation-ui">
        <header className="devstation-header">
          <div className="devstation-eyebrow-row">
            <span className="devstation-eyebrow-bar" aria-hidden />
            <span className="devstation-eyebrow">{t("eyebrow")}</span>
          </div>
          <h2 className="devstation-title">
            <span className="devstation-title-line">{t("titleLine1")}</span>
            <span className="devstation-title-gradient">{t("titleLine2")}</span>
          </h2>
          <p className="devstation-subtitle">{t("subtitle")}</p>
          <div className="devstation-status">
            <span className="devstation-dot" aria-hidden />
            <span className="devstation-status-text">{t("status")}</span>
            <span className="devstation-divider" aria-hidden>|</span>
            <span className="devstation-code">
              console.log(&apos;{t("ready")}&apos;)
              <span className="devstation-cursor" aria-hidden />
            </span>
          </div>
        </header>

        <footer className="devstation-footer">
          <div className="devstation-meta">
            <span>RENDER: WebGL 2.0</span>
            <span className="devstation-meta-divider">·</span>
            <span>THREE.js r170</span>
            <span className="devstation-meta-divider">·</span>
            <span>GLSL · DRACO</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
