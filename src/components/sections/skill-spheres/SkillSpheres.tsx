"use client";

import { useEffect, useRef, useState, lazy, Suspense } from "react";

const SpheresCanvas = lazy(() =>
  import("./SpheresCanvas").then((m) => ({ default: m.SpheresCanvas }))
);

export function SkillSpheres() {
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
    <div ref={sectionRef} className="spheres-stack" aria-hidden>
      {shouldMount && (
        <Suspense fallback={null}>
          <SpheresCanvas paused={!isInView} />
        </Suspense>
      )}
    </div>
  );
}
