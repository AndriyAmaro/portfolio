"use client";

/**
 * GalleryCube · scroll-driven 3D cube gallery
 * Port React/Next do CodePen "Six Faces / Walking The Cow"
 * (Luis Alberto Martinez Riancho · MIT · codepen.io/luis-lessrain/pen/ZYpyoRV)
 *
 * Adaptado: NÃO sequestra o scroll global (era position:fixed + wheel
 * hijack no original) · aqui é UMA seção alta com pin sticky e o
 * progresso de scroll da seção (0→1) gira o cubo pelas 4 faces.
 * Faces = stacks (logos SVG) · card lateral = copy i18n existente.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
// fonte única: os MESMOS SKILL_GROUPS dos cards do slider antigo
// (set COMPLETO de logos, zero drift · o card é a fonte da verdade)
import { SKILL_GROUPS as FRONTEND_GROUPS } from "../frontend-card/FrontendCardPremium";
import { SKILL_GROUPS as BACKEND_GROUPS } from "../backend-card/BackendCardPremium";
import { SKILL_GROUPS as DB_GROUPS } from "../databases-card/DatabasesCardPremium";
import { SKILL_GROUPS as DEVOPS_GROUPS } from "../devops-card/DevOpsCardPremium";

type LogoFC = React.ComponentType<{ size?: number; className?: string }>;
type FaceKey = "frontend" | "backend" | "databases" | "devops";
type Skill = { name: string; version?: string; Logo: LogoFC };
type SkillGroup = { label: string; skills: Skill[] };

// achata todos os skills (nome + logo) de todos os grupos da categoria
// (igual ao card · set COMPLETO, fonte única)
const flatSkills = (groups: SkillGroup[]): Skill[] =>
  groups.flatMap((g) => g.skills);

const FACES: {
  key: FaceKey;
  name: string;
  icon: string;
  skills: Skill[];
}[] = [
  {
    key: "frontend",
    name: "Frontend",
    icon: "/icons/frontend.gif",
    skills: flatSkills(FRONTEND_GROUPS),
  },
  {
    key: "backend",
    name: "Backend",
    icon: "/icons/backend.gif",
    skills: flatSkills(BACKEND_GROUPS),
  },
  {
    key: "databases",
    name: "Databases",
    icon: "/icons/databases.gif",
    skills: flatSkills(DB_GROUPS),
  },
  {
    key: "devops",
    name: "DevOps",
    icon: "/icons/devops.gif",
    skills: flatSkills(DEVOPS_GROUPS),
  },
];

const N = FACES.length; // 4 categorias

// GEOMETRIA EXATA do reference (six-faces-walking-the-cow):
// top=rotateX(-90) front=tz right=rotateY(90) back=rotateY(180)
// left=rotateY(-90) bottom=rotateX(90) · cat -2 = ícones (intro/topo)
// cat -1 = lateral REMOVIDA (left · fora do percurso) · 0..3 = categorias
const CUBE_FACES: { tf: string; cat: number }[] = [
  { tf: "rotateX(-90deg) translateZ(var(--gc-half))", cat: -2 }, // TOP · ícones (intro)
  { tf: "translateZ(var(--gc-half))", cat: 0 }, // FRONT · frontend
  { tf: "rotateY(90deg) translateZ(var(--gc-half))", cat: 1 }, // RIGHT · backend
  { tf: "rotateY(180deg) translateZ(var(--gc-half))", cat: 2 }, // BACK · databases
  { tf: "rotateX(90deg) translateZ(var(--gc-half))", cat: 3 }, // BOTTOM · devops (outro)
  { tf: "rotateY(-90deg) translateZ(var(--gc-half))", cat: -1 }, // LEFT · lateral removida
];

// STOPS = valores EXATOS do reference (buildStops), com a lateral LEFT
// removida: TOP(intro) → FRONT → RIGHT → BACK → BOTTOM(outro). O último
// pass faz BACK→BOTTOM girando ry -180→-360 (volta a 0 · bottom limpo,
// SEM hack rotateZ) enquanto rx 0→-90. Geometria idêntica ao reference.
const STOPS = [
  { rx: 90, ry: 0 }, // TOP · intro (ícones) desce · reference exato
  { rx: 0, ry: 0 }, // FRONT · frontend
  { rx: 0, ry: -90 }, // RIGHT · backend
  { rx: 0, ry: -180 }, // BACK · databases
  { rx: -90, ry: -360 }, // BOTTOM · devops · outro · reference exato
];
const SEG = STOPS.length - 1; // 4

const easeIO = (t: number) =>
  t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

export function GalleryCube() {
  const t = useTranslations("skills.carousel");
  const sectionRef = useRef<HTMLElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // scroll-driven + SMOOTHING/inércia (igual ao reference: o cubo não
  // segue o scroll 1:1, ele desliza pra o alvo com easing exponencial +
  // easeInOutQuad por face → "passa" fluido e bem 3D)
  useEffect(() => {
    let rafId = 0;
    let lastNow = performance.now();
    let smooth = 0; // progresso suavizado 0..1
    let lastFace = -2;

    const targetP = () => {
      const sec = sectionRef.current;
      if (!sec) return 0;
      const total = sec.offsetHeight - window.innerHeight;
      const into = -sec.getBoundingClientRect().top;
      return Math.max(0, Math.min(1, into / Math.max(1, total)));
    };

    const apply = (s: number) => {
      const cube = cubeRef.current;
      if (!cube) return;
      const tt = s * SEG;
      const i = Math.min(Math.floor(tt), SEG - 1);
      const f = easeIO(tt - i);
      const a = STOPS[i];
      const b = STOPS[i + 1];
      const rx = a.rx + (b.rx - a.rx) * f;
      const ry = a.ry + (b.ry - a.ry) * f;
      cube.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;

      const pct = Math.round(s * 100);
      if (fillRef.current) fillRef.current.style.width = `${pct}%`;
      if (pctRef.current)
        pctRef.current.textContent = String(pct).padStart(3, "0") + "%";

      const face =
        tt < 0.5 ? -1 : Math.max(0, Math.min(N - 1, Math.round(tt) - 1));
      if (face !== lastFace) {
        lastFace = face;
        setActive(face);
      }
    };

    // loop PERPÉTUO (igual ao reference: requestAnimationFrame nunca para).
    // Não depende de IntersectionObserver/scroll pra (re)ligar → nunca trava
    // no meio da rotação. Quando a aba está oculta só reseta o relógio.
    const frame = (now: number) => {
      if (document.hidden) {
        lastNow = now;
        rafId = requestAnimationFrame(frame);
        return;
      }
      const dt = Math.min((now - lastNow) / 1000, 0.05);
      lastNow = now;
      const tgt = targetP();
      // easing exponencial (reference: 1 - e^(-dt*8))
      smooth += (tgt - smooth) * (1 - Math.exp(-dt * 8));
      if (Math.abs(tgt - smooth) < 0.0002) smooth = tgt;
      apply(smooth);
      rafId = requestAnimationFrame(frame);
    };

    smooth = targetP();
    apply(smooth);
    lastNow = performance.now();
    rafId = requestAnimationFrame(frame);

    return () => cancelAnimationFrame(rafId);
  }, []);

  // dot/click → rola até o progresso daquela face
  const goTo = useCallback((idx: number) => {
    const sec = sectionRef.current;
    if (!sec) return;
    const i = Math.max(-1, Math.min(N - 1, idx));
    const vh = window.innerHeight;
    const total = sec.offsetHeight - vh;
    const top = sec.getBoundingClientRect().top + window.scrollY;
    // face i fica centrada no stop (i+1); idx < 0 = intro (ícones, prog 0)
    const frac = i < 0 ? 0 : (i + 1) / SEG;
    const target = top + frac * total;
    window.scrollTo({ top: target, behavior: "smooth" });
  }, []);

  const cur = active >= 0 ? FACES[active] : null;
  const cardRight = active >= 0 && active % 2 === 1;

  return (
    <section ref={sectionRef} className="gcube-section" aria-label="Stack">
      <div className="gcube-pin">
        <div className="gcube-scene" aria-hidden>
          <div ref={cubeRef} className="gcube-cube">
            {CUBE_FACES.map((cf, i) => (
              <div
                key={i}
                className="gcube-face"
                style={{ transform: cf.tf }}
              >
                {cf.cat === -2 && (
                  <div className="gcube-frame">
                    <div className="gcube-iconwall">
                      {FACES.map((fc) => (
                        <span key={fc.key} className="gcube-iconwall-item">
                          <Image
                            src={fc.icon}
                            alt={fc.name}
                            width={150}
                            height={150}
                            unoptimized
                          />
                          <span className="gcube-iconwall-label">
                            {fc.name}
                          </span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {cf.cat >= 0 && (
                  <div className="gcube-frame">
                    <div className="gcube-logos">
                      {FACES[cf.cat].skills.map((sk, li) => (
                        <span key={li} className="gcube-logo-item">
                          <span className="gcube-logo">
                            <sk.Logo size={30} />
                          </span>
                          <span className="gcube-logo-name">{sk.name}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div
          className={`gcube-card${cardRight ? " is-right" : ""}`}
          style={{
            backdropFilter: "blur(12px) saturate(1.2)",
            WebkitBackdropFilter: "blur(12px) saturate(1.2)",
          }}
        >
          <div className="gcube-hline" />
          {cur ? (
            <>
              <div className="gcube-tag">
                <span className="gcube-tag-icon">
                  <Image src={cur.icon} alt="" width={28} height={28} unoptimized />
                </span>
                {t(`${cur.key}Premium.eyebrow`)}
              </div>
              <h2 className="gcube-title">{cur.name}</h2>
              <p className="gcube-desc">{t(`${cur.key}Premium.desc`)}</p>
            </>
          ) : (
            <>
              <div className="gcube-tag">{t("stack.eyebrow")}</div>
              <h2 className="gcube-title">{t("stack.title")}</h2>
              <p className="gcube-desc">{t("stack.desc")}</p>
            </>
          )}
          <div className="gcube-cta-row">
            <button
              type="button"
              className="gcube-back"
              onClick={() => goTo(Math.max(0, active) - 1)}
              disabled={active <= 0}
            >
              <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                <path d="M11 6H1M6 11L1 6l5-5" />
              </svg>
              Back
            </button>
            <button
              type="button"
              className="gcube-cta"
              onClick={() => goTo(active === N - 1 ? -1 : active + 1)}
            >
              {active === N - 1 ? "Início" : "Turn"}
              <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                <path d="M1 6h10M6 1l5 5-5 5" />
              </svg>
            </button>
          </div>
        </div>

        <div className="gcube-hud">
          <div ref={pctRef} className="gcube-pct">
            000%
          </div>
          <div className="gcube-bar">
            <div ref={fillRef} className="gcube-fill" />
          </div>
          <div className="gcube-scene-label">
            {cur ? cur.name : t("stack.title")}
          </div>
        </div>

        <div className="gcube-strip" role="tablist" aria-label="Stacks">
          {FACES.map((face, i) => (
            <button
              key={face.key}
              type="button"
              className={`gcube-dot${i === active ? " active" : ""}`}
              aria-label={face.name}
              aria-selected={i === active}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
