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
import {
  NextJSLogo,
  ReactLogo,
  TypeScriptLogo,
  JavaScriptLogo,
  HTML5Logo,
  ViteLogo,
  TailwindLogo,
  FramerMotionLogo,
  TanStackLogo,
  ZodLogo,
  SocketIOLogo,
} from "../frontend-card/BrandLogos";
import {
  NodejsLogo,
  ExpressLogo,
  HonoLogo,
  PrismaLogo,
  StripeLogo,
  JwtLogo,
  BullMQLogo,
  SentryLogo,
} from "../backend-card/BackendBrandLogos";
import {
  PostgresLogo,
  RedisLogo,
  PgvectorLogo,
} from "../backend-card/BackendBrandLogos";
import {
  DockerLogo,
  DockerComposeLogo,
  NginxLogo,
  CloudflareWorkersLogo,
  CloudflareR2Logo,
  RailwayLogo,
  VercelLogo,
  TurborepoLogo,
  PnpmLogo,
  GithubActionsLogo,
  VitestLogo,
  PlaywrightLogo,
  AwsLogo,
  AzureLogo,
} from "../devops-card/DevOpsBrandLogos";

type LogoFC = React.ComponentType<{ size?: number; className?: string }>;
type FaceKey = "frontend" | "backend" | "databases" | "devops";

const FACES: {
  key: FaceKey;
  name: string;
  icon: string;
  logos: LogoFC[];
}[] = [
  {
    key: "frontend",
    name: "Frontend",
    icon: "/icons/frontend.gif",
    logos: [
      NextJSLogo,
      ReactLogo,
      TypeScriptLogo,
      JavaScriptLogo,
      HTML5Logo,
      ViteLogo,
      TailwindLogo,
      FramerMotionLogo,
      TanStackLogo,
      ZodLogo,
      SocketIOLogo,
    ],
  },
  {
    key: "backend",
    name: "Backend",
    icon: "/icons/backend.gif",
    logos: [
      NodejsLogo,
      ExpressLogo,
      HonoLogo,
      PrismaLogo,
      StripeLogo,
      ZodLogo,
      JwtLogo,
      BullMQLogo,
      SentryLogo,
    ],
  },
  {
    key: "databases",
    name: "Databases",
    icon: "/icons/databases.gif",
    logos: [PostgresLogo, RedisLogo, PrismaLogo, PgvectorLogo, BullMQLogo, CloudflareR2Logo],
  },
  {
    key: "devops",
    name: "DevOps",
    icon: "/icons/devops.gif",
    logos: [
      DockerLogo,
      DockerComposeLogo,
      NginxLogo,
      CloudflareWorkersLogo,
      CloudflareR2Logo,
      RailwayLogo,
      VercelLogo,
      TurborepoLogo,
      PnpmLogo,
      GithubActionsLogo,
      VitestLogo,
      PlaywrightLogo,
      AwsLogo,
      AzureLogo,
    ],
  },
];

const N = FACES.length; // 4 categorias

// cat: -2 = ÍCONES (overview · primeira cara/topo) · 0..3 = logos da
// categoria · -1 = parede vazia (saída por baixo)
const CUBE_FACES: { tf: string; cat: number }[] = [
  { tf: "translateZ(var(--gc-half))", cat: 0 }, // front · frontend
  { tf: "rotateY(90deg) translateZ(var(--gc-half))", cat: 1 }, // right · backend
  { tf: "rotateY(180deg) translateZ(var(--gc-half))", cat: 2 }, // back · databases
  { tf: "rotateX(90deg) translateZ(var(--gc-half))", cat: -2 }, // TOPO · ícones (início)
  { tf: "rotateX(-90deg) translateZ(var(--gc-half))", cat: 3 }, // bottom · devops (vira p/ cima)
  { tf: "rotateY(-90deg) translateZ(var(--gc-half))", cat: -1 }, // left · vazio (fora do percurso)
];

// STOPS · percurso enxuto (sem o penúltimo giro de lado):
// TOPO(ícones) desce → frontend → backend → databases → devops vira p/ CIMA.
// rx -90 mostra o topo de frente (intro), rx +90 traz a base (devops) p/ cima.
const STOPS = [
  { rx: -90, ry: 0 }, // intro · TOPO (ícones) de frente, desce
  { rx: 0, ry: 0 }, // frontend (front)
  { rx: 0, ry: -90 }, // backend (right)
  { rx: 0, ry: -180 }, // databases (back)
  { rx: 90, ry: -180 }, // devops (bottom) · ÚLTIMO vira PARA CIMA
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
                      {FACES[cf.cat].logos.map((Logo, li) => (
                        <span key={li} className="gcube-logo">
                          <Logo size={56} />
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
