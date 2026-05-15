"use client";

import { useEffect, useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import {
  Group,
  Mesh,
  MeshPhysicalMaterial,
  MeshBasicMaterial,
  BoxGeometry,
  PlaneGeometry,
  SphereGeometry,
  EdgesGeometry,
  LineSegments,
  LineBasicMaterial,
  CanvasTexture,
  SRGBColorSpace,
  AdditiveBlending,
  NormalBlending,
  BackSide,
  Plane,
  Vector3,
  Raycaster,
  Euler,
} from "three";
import * as CANNON from "cannon-es";
import gsap from "gsap";

useGLTF.preload("/models/mac-noUv.glb");

export type ScenePalette = {
  alu: number;
  aluMetal: number;
  aluRough: number;
  envIntensity: number;
  glassColor: number;
  glassOpacity: number;
  haloOpacity: number;
  lineOpacity: number;
  additive: boolean;
  keyDark: number;
};

type Props = {
  reducedMotion: boolean;
  palette: ScenePalette;
};

// Authentic 24x24 SVG marks · same set used in the portfolio Skills.tsx icons
const TECHS: { l: string; c: number; p: string }[] = [
  { l: "TS", c: 0x3178c6, p: "M3 3h18v18H3V3Zm10.71 14.86c.5.98 1.51 1.73 3.09 1.73 1.6 0 2.8-.83 2.8-2.36 0-1.41-.81-2.04-2.25-2.66l-.42-.18c-.73-.31-1.04-.52-1.04-1.02 0-.41.31-.73.81-.73.49 0 .8.21 1.09.73l1.31-.84c-.55-.98-1.32-1.35-2.4-1.35-1.51 0-2.48.96-2.48 2.23 0 1.38.81 2.03 2.03 2.55l.42.18c.78.34 1.24.55 1.24 1.13 0 .49-.45.84-1.15.84-.83 0-1.31-.43-1.67-1.03l-1.38.8ZM14 11.02V9.5H8v1.52h2.04v6.95h1.93v-6.95H14Z" },
  { l: "React", c: 0x61dafb, p: "M12 13.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3ZM12 21.35c-1.17 0-2.3-.08-3.35-.24-1.97-.3-3.56-.88-4.6-1.68-.52-.4-.93-.85-1.22-1.35-.29-.5-.45-1.05-.45-1.58 0-.53.16-1.08.45-1.58.29-.5.7-.95 1.22-1.35.26-.2.55-.39.87-.56-.32-.17-.61-.36-.87-.56-.52-.4-.93-.85-1.22-1.35-.29-.5-.45-1.05-.45-1.58 0-.53.16-1.08.45-1.58.29-.5.7-.95 1.22-1.35 1.04-.8 2.63-1.38 4.6-1.68 1.05-.16 2.18-.24 3.35-.24s2.3.08 3.35.24c1.97.3 3.56.88 4.6 1.68.52.4.93.85 1.22 1.35.29.5.45 1.05.45 1.58 0 .53-.16 1.08-.45 1.58-.29.5-.7.95-1.22 1.35-.26.2-.55.39-.87.56.32.17.61.36.87.56.52.4.93.85 1.22 1.35.29.5.45 1.05.45 1.58 0 .53-.16 1.08-.45 1.58-.29.5-.7.95-1.22 1.35-1.04.8-2.63 1.38-4.6 1.68-1.05.16-2.18.24-3.35.24Zm0-1.5c2.97 0 5.65-.45 7.18-1.63.38-.29.65-.6.82-.93.17-.33.25-.67.25-1.04 0-.37-.08-.71-.25-1.04-.17-.33-.44-.64-.82-.93-.35-.27-.78-.52-1.28-.73.5-.21.93-.46 1.28-.73.38-.29.65-.6.82-.93.17-.33.25-.67.25-1.04 0-.37-.08-.71-.25-1.04-.17-.33-.44-.64-.82-.93-1.53-1.18-4.21-1.63-7.18-1.63s-5.65.45-7.18 1.63c-.38.29-.65.6-.82.93-.17.33-.25.67-.25 1.04 0 .37.08.71.25 1.04.17.33.44.64.82.93.35.27.78.52 1.28.73-.5.21-.93.46-1.28.73-.38.29-.65.6-.82.93-.17.33-.25.67-.25 1.04 0 .37.08.71.25 1.04.17.33.44.64.82.93 1.53 1.18 4.21 1.63 7.18 1.63Z" },
  { l: "Node", c: 0x7cf0a8, p: "M12 21.985c-.275 0-.532-.074-.772-.202l-2.439-1.448c-.365-.203-.182-.277-.072-.314.496-.165.588-.201 1.101-.493.056-.027.129-.018.185.018l1.87 1.112c.074.037.166.037.221 0l7.319-4.237c.074-.036.11-.11.11-.184V7.768c0-.092-.036-.166-.11-.203l-7.319-4.219c-.073-.037-.166-.037-.221 0L4.552 7.565c-.073.037-.11.128-.11.203v8.468c0 .073.037.147.11.184l2.01 1.157c1.083.548 1.762-.092 1.762-.735V8.502c0-.11.091-.202.202-.202h.883c.11 0 .202.092.202.202v8.34c0 1.448-.789 2.294-2.164 2.294-.422 0-.752 0-1.688-.46l-1.925-1.103a1.55 1.55 0 0 1-.771-1.34V7.768c0-.55.293-1.064.771-1.339l7.316-4.237a1.637 1.637 0 0 1 1.544 0l7.317 4.237c.479.274.771.789.771 1.339v8.468c0 .55-.293 1.064-.771 1.34l-7.317 4.236c-.241.11-.516.165-.773.165v.018Z" },
  { l: "Tailwind", c: 0x38bdf8, p: "M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8Zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12Z" },
  { l: "Postgres", c: 0x4f9ed6, p: "M17.128 0a10.134 10.134 0 0 0-2.755.403l-.063.02a10.922 10.922 0 0 0-1.626.628c-.48-.02-.97-.03-1.468-.02C9.15 1.08 7.384 1.67 5.983 2.71c-.2-.04-.39-.08-.6-.11C3.15 2.2 1.79 3.03.97 4.2c-.48.69-.7 1.51-.65 2.39.02.3.07.6.14.89.2.87.6 1.8 1.15 2.63.17.28.37.55.58.8.72.89 1.57 1.49 2.47 1.75-.06.39-.1.79-.11 1.19-.02.8.08 1.58.28 2.32-.4.37-.76.79-1.06 1.26-.5.8-.72 1.7-.55 2.54.24 1.26 1.08 2.26 2.42 2.82.8.33 1.72.52 2.7.55.2 0 .4 0 .6-.02-.26.4-.5.82-.7 1.25l.92.4c.23-.5.5-.98.82-1.43.24-.07.49-.15.73-.24 1.2-.45 2.28-1.1 3.13-1.92.07-.07.14-.14.2-.22.22.19.44.37.66.54.8.57 1.63.98 2.47 1.2.59.15 1.19.22 1.78.2 2.03-.04 3.5-1.17 3.85-2.86.02-.1.03-.2.04-.3.08-.63-.05-1.28-.37-1.9-.12-.24-.27-.47-.44-.69.8-.8 1.37-1.64 1.66-2.46.2-.57.28-1.13.24-1.65-.04-.4-.14-.77-.3-1.12.2-.34.37-.69.52-1.05.34-.83.53-1.68.54-2.55.02-.94-.2-1.95-.78-2.88-.62-.98-1.5-1.54-2.6-1.64-.12-.01-.25-.01-.37-.01-.2 0-.4.02-.6.05-.03 0-.06 0-.09.02-.1-1.1-.52-2.07-1.23-2.77-.54-.53-1.22-.94-2.02-1.2C19.69.33 18.43 0 17.13 0h-.002Z" },
  { l: "Redis", c: 0xff5b4a, p: "M10.5 2.661l.54.997-1.797.644 2.409.218.748 1.246.467-1.135 2.025-.22-1.535-.66.604-1.14-1.467.704-.993-.654zm-3.76 2.268L12 7.11l5.26-2.181L12 2.748 6.74 4.929zM3 14.07V9.4l9 3.562 9-3.562v4.67l-9 3.562-3-1.188v-2.29l3 1.188 5.998-2.374V11.2L12 13.574l-5.998-2.375v2.296L3 14.683v-.613zm0 2.221l9 3.562 9-3.562v1.725l-9 3.562-9-3.562v-1.725z" },
  { l: "Docker", c: 0x2ea0ff, p: "M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185Zm-2.954-5.43h2.118a.186.186 0 0 0 .186-.186V3.574a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.186Zm0 2.716h2.118a.187.187 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.887c0 .102.082.185.185.186Zm-2.93 0h2.12a.186.186 0 0 0 .184-.186V6.29a.185.185 0 0 0-.185-.185H8.1a.185.185 0 0 0-.185.185v1.887c0 .102.083.185.185.186Zm-2.964 0h2.119a.186.186 0 0 0 .185-.186V6.29a.185.185 0 0 0-.185-.185H5.136a.186.186 0 0 0-.186.185v1.887c0 .102.084.185.186.186Zm5.893 2.715h2.118a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185Zm-2.93 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.083.185.185.185Zm-2.964 0h2.119a.185.185 0 0 0 .185-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.186.186 0 0 0-.186.186v1.887c0 .102.084.185.186.185Zm-2.92 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.082.185.185.185Zm10.171 2.715h2.118a.185.185 0 0 0 .186-.185v-1.888a.185.185 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185Zm6.71-3.32c-.93-1.62-2.29-2.22-4.09-2.22h-.26c-.15-.45-.57-.76-1.06-.76H7.83c-.54 0-.99.38-1.1.89l-.79 4.09c-.2 1.06.1 2.15.8 2.96a3.88 3.88 0 0 0 2.86 1.41h7.71c1.12 0 2.11-.51 2.78-1.43.67-.92.9-2.07.63-3.22l-.15-.69c1.17-.4 2.04-1.25 2.39-2.35.08-.23.12-.47.14-.68Z" },
  { l: "Prisma", c: 0xb29cff, p: "m21.807 18.285-8.397-15.98a1.414 1.414 0 0 0-1.286-.782 1.415 1.415 0 0 0-1.199.782L2.227 18.285a1.42 1.42 0 0 0 .09 1.396 1.415 1.415 0 0 0 1.196.651h17.97c.488 0 .94-.253 1.197-.65a1.42 1.42 0 0 0 .09-1.397h.037Zm-9.684-1.76v-7.93l5.316 7.93h-5.316Z" },
  { l: "Git", c: 0xf0532b, p: "M23.546 10.93 13.067.452a1.55 1.55 0 0 0-2.188 0L8.708 2.627l2.76 2.76a1.838 1.838 0 0 1 2.327 2.341l2.658 2.66a1.838 1.838 0 0 1 1.9 3.039 1.837 1.837 0 0 1-2.6 0 1.846 1.846 0 0 1-.404-1.996L12.86 8.955v6.525a1.844 1.844 0 0 1 .486 2.876 1.834 1.834 0 1 1-2.122-2.976V8.829a1.843 1.843 0 0 1-.996-2.41L7.454 3.654.453 10.654a1.546 1.546 0 0 0 0 2.188l10.48 10.477a1.545 1.545 0 0 0 2.186 0l10.427-10.202a1.545 1.545 0 0 0 0-2.187Z" },
  { l: "Vercel", c: 0xeef1f8, p: "M24 22.525H0l12-21.05 12 21.05Z" },
  { l: "Hono", c: 0xff7e33, p: "M12 2c-1.4 3-5.6 5-7 10 0 0-.2 1.8.8 3.6C7.2 18.2 9.4 20 12 22c2.6-2 4.8-3.8 6.2-6.4 1-1.8.8-3.6.8-3.6-1.4-5-5.6-7-7-10Z" },
  { l: "Zod", c: 0x6ee7ff, p: "M13.77 2 4 12l2.5 2.5L13.77 7v5.5L22 4.77V2h-8.23ZM10.23 22 20 12l-2.5-2.5-7.27 7.5V11.5L2 19.23V22h8.23Z" },
];

const CODE: [string, string?][][] = [
  [["// dominios de engenharia", "#5a6072"]], [[""]],
  [["export ", "#ff6e8a"], ["const ", "#ff6e8a"], ["stack ", "#6ee7ff"], ["= {", "#9aa3b2"]],
  [["  frontend", "#b29cff"], [": ", "#9aa3b2"], ["[Next, React, Tailwind]", "#7cf0a8"], [","]],
  [["  backend", "#b29cff"], [":  ", "#9aa3b2"], ["[Node, Hono, Prisma]", "#7cf0a8"], [","]],
  [["  database", "#b29cff"], [": ", "#9aa3b2"], ["[Postgres, pgvector, Redis]", "#7cf0a8"], [","]],
  [["  ai", "#b29cff"], [":       ", "#9aa3b2"], ["[Claude, RAG, Agents]", "#7cf0a8"], [","]],
  [["  platform", "#b29cff"], [": ", "#9aa3b2"], ["[Docker, Cloudflare, CI]", "#7cf0a8"], [","]],
  [["};"]], [[""]],
  [["await ", "#ff6e8a"], ["stack", "#6ee7ff"], [".deploy", "#ffb454"], ["({ region: ", "#9aa3b2"], ['"edge"', "#7cf0a8"], [" });"]],
];

function makeLogoTexture(pathStr: string, colorHex: number) {
  const SIZE = 512;
  const c = document.createElement("canvas");
  c.width = c.height = SIZE;
  const ctx = c.getContext("2d")!;
  const PAD = 70;
  const scale = (SIZE - PAD * 2) / 24;
  const hex = "#" + colorHex.toString(16).padStart(6, "0");
  ctx.save();
  ctx.translate(PAD, PAD);
  ctx.scale(scale, scale);
  ctx.shadowColor = hex;
  ctx.shadowBlur = 34;
  ctx.fillStyle = hex;
  ctx.fill(new Path2D(pathStr));
  ctx.restore();
  ctx.save();
  ctx.translate(PAD, PAD);
  ctx.scale(scale, scale);
  ctx.fillStyle = "#ffffff";
  ctx.fill(new Path2D(pathStr));
  ctx.restore();
  const tex = new CanvasTexture(c);
  tex.anisotropy = 8;
  tex.colorSpace = SRGBColorSpace;
  return tex;
}

export function DevStationModel({ reducedMotion, palette }: Props) {
  const { scene: macSrc } = useGLTF("/models/mac-noUv.glb") as unknown as { scene: Group };
  const { camera } = useThree();

  const rootRef = useRef<Group>(null);
  const macGroupRef = useRef<Group>(null);
  const lidGroupRef = useRef<Group>(null);
  const screenStateRef = useRef<{ tex: CanvasTexture; ctx: CanvasRenderingContext2D } | null>(null);
  const frameCountRef = useRef(0);

  // ---- screen canvas (live code rolling) ----
  const screen = useMemo(() => {
    const SCR_W = 1280, SCR_H = 860;
    const cv = document.createElement("canvas");
    cv.width = SCR_W; cv.height = SCR_H;
    const ctx = cv.getContext("2d")!;
    const tex = new CanvasTexture(cv);
    tex.anisotropy = 8;
    tex.colorSpace = SRGBColorSpace;
    return { SCR_W, SCR_H, ctx, tex };
  }, []);

  function drawScreen(t: number) {
    const { SCR_W, SCR_H, ctx, tex } = screen;
    ctx.fillStyle = "#0d1117"; ctx.fillRect(0, 0, SCR_W, SCR_H);
    ctx.fillStyle = "rgba(255,255,255,.04)"; ctx.fillRect(0, 0, SCR_W, 48);
    ctx.fillStyle = "#ff5f57"; ctx.beginPath(); ctx.arc(28, 24, 7, 0, 6.28); ctx.fill();
    ctx.fillStyle = "#febc2e"; ctx.beginPath(); ctx.arc(54, 24, 7, 0, 6.28); ctx.fill();
    ctx.fillStyle = "#28c840"; ctx.beginPath(); ctx.arc(80, 24, 7, 0, 6.28); ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,.5)"; ctx.font = "400 16px JetBrains Mono,monospace";
    ctx.textAlign = "center"; ctx.fillText("~/portfolio · stack.ts", SCR_W / 2, 31);
    const SPD = 58;
    const tot = CODE.map((pp) => pp.reduce((s, seg) => s + seg[0].length, 0));
    let el = (t % 13) * SPD;
    ctx.textAlign = "left";
    const by = 104, lh = 42;
    CODE.forEach((pp, i) => {
      const ll = tot[i];
      const show = el >= ll ? ll : Math.max(0, Math.floor(el));
      const y = by + i * lh;
      ctx.font = "600 15px JetBrains Mono,monospace";
      ctx.fillStyle = "rgba(255,255,255,.32)";
      ctx.fillText(String(i + 1).padStart(2, "0"), 22, y);
      ctx.font = "600 25px JetBrains Mono,monospace";
      let x = 66, rem = show;
      for (const seg of pp) {
        const txt = seg[0], col = seg[1] ?? "#9aa3b2";
        if (!txt || rem <= 0) continue;
        const vis = txt.substring(0, rem);
        ctx.fillStyle = col;
        ctx.fillText(vis, x, y);
        x += ctx.measureText(vis).width;
        rem -= vis.length;
      }
      if (show < ll && show > 0 && Math.sin(t * 6) > -0.3) {
        ctx.fillStyle = "#6ee7ff"; ctx.fillRect(x + 4, y - 21, 3, 27);
      }
      el -= ll + 4;
    });
    ctx.fillStyle = "rgba(0,0,0,.06)";
    for (let yy = 0; yy < SCR_H; yy += 3) ctx.fillRect(0, yy, SCR_W, 1);
    tex.needsUpdate = true;
  }

  // ---- physics world + glass logo cubes ----
  const sim = useMemo(() => {
    const world = new CANNON.World();
    world.gravity.set(0, 0, 0);
    world.broadphase = new CANNON.NaiveBroadphase();
    (world.solver as CANNON.GSSolver).iterations = 20;
    const macCollider = new CANNON.Body({
      mass: 0,
      shape: new CANNON.Sphere(5.2),
      position: new CANNON.Vec3(0, 1.4, 0),
    });
    world.addBody(macCollider);

    const G_EDGES = new EdgesGeometry(new BoxGeometry(1, 1, 1));
    const G_CORE = new BoxGeometry(0.8, 0.8, 0.8);
    const G_FACE = new PlaneGeometry(0.62, 0.62);
    const G_HALO = new SphereGeometry(0.62, 14, 14);
    const glassMat = new MeshPhysicalMaterial({
      color: palette.glassColor, metalness: 0.25, roughness: 0.12,
      transparent: true, opacity: palette.glassOpacity, clearcoat: 1.0, clearcoatRoughness: 0.1,
    });
    const FACE_DEF: [[number, number, number], [number, number, number]][] = [
      [[0, 0, 0.5], [0, 0, 0]], [[0, 0, -0.5], [0, Math.PI, 0]],
      [[0.5, 0, 0], [0, Math.PI / 2, 0]], [[-0.5, 0, 0], [0, -Math.PI / 2, 0]],
      [[0, 0.5, 0], [-Math.PI / 2, 0, 0]], [[0, -0.5, 0], [Math.PI / 2, 0, 0]],
    ];
    const cache: Record<string, { line: LineBasicMaterial; face: MeshBasicMaterial; halo: MeshBasicMaterial; tex: CanvasTexture }> = {};
    const blend = palette.additive ? AdditiveBlending : NormalBlending;
    const assets = (te: (typeof TECHS)[number]) => {
      if (cache[te.l]) return cache[te.l];
      const tex = makeLogoTexture(te.p, te.c);
      cache[te.l] = {
        line: new LineBasicMaterial({ color: te.c, transparent: true, opacity: palette.lineOpacity, blending: blend, depthWrite: false }),
        face: new MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, toneMapped: false }),
        halo: new MeshBasicMaterial({ color: te.c, transparent: true, opacity: palette.haloOpacity, blending: blend, depthWrite: false }),
        tex,
      };
      return cache[te.l];
    };

    const COUNT = (typeof window !== "undefined" && window.innerWidth < 768) ? 32 : 60;
    const cubes: { g: Group; body: CANNON.Body }[] = [];
    const eu = new Euler();
    for (let i = 0; i < COUNT; i++) {
      const te = TECHS[i % TECHS.length];
      const a = assets(te);
      const g = new Group();
      g.add(new LineSegments(G_EDGES, a.line));
      g.add(new Mesh(G_CORE, glassMat));
      FACE_DEF.forEach(([pos, rot]) => {
        const m = new Mesh(G_FACE, a.face);
        m.position.set(pos[0] * 1.002, pos[1] * 1.002, pos[2] * 1.002);
        m.rotation.set(rot[0], rot[1], rot[2]);
        g.add(m);
      });
      g.add(new Mesh(G_HALO, a.halo));
      const s = 0.8 + Math.pow(Math.random(), 1.7) * 4.6;
      g.scale.setScalar(s);
      const px = (Math.random() - 0.5) * 48;
      const py = (Math.random() - 0.5) * 34;
      const pz = (Math.random() - 0.5) * 30;
      g.position.set(px, py, pz);
      const half = s * 0.5;
      const body = new CANNON.Body({
        mass: s * 0.1,
        shape: new CANNON.Box(new CANNON.Vec3(half, half, half)),
        position: new CANNON.Vec3(px, py, pz),
        linearDamping: 0.1,
        angularDamping: 0.1,
      });
      body.angularVelocity.set((Math.random() - 0.5) * 1.6, (Math.random() - 0.5) * 1.6, (Math.random() - 0.5) * 1.6);
      eu.set(Math.random() * 6.28, Math.random() * 6.28, Math.random() * 6.28);
      body.quaternion.setFromEuler(eu.x, eu.y, eu.z);
      world.addBody(body);
      cubes.push({ g, body });
    }

    // soju22 custom gravity · applied each frame before world.step (cannon-es
    // has no per-body preStep hook, so we set body.force in the loop instead)
    const target = new CANNON.Vec3(0, 1.4, 0);

    const disposables = [G_EDGES, G_CORE, G_FACE, G_HALO, glassMat,
      ...Object.values(cache).flatMap((c) => [c.line, c.face, c.halo, c.tex])];

    return { world, cubes, target, disposables };
  }, [palette.glassColor, palette.glassOpacity, palette.haloOpacity, palette.lineOpacity, palette.additive]);

  // ---- macbook GLB (white) ----
  const macParts = useMemo(() => {
    const macGroup = new Group();
    macGroup.scale.setScalar(0.36);
    macGroup.visible = false;
    const lidGroup = new Group();
    const botGroup = new Group();
    macGroup.add(lidGroup);
    macGroup.add(botGroup);

    const alu = new MeshPhysicalMaterial({
      color: palette.alu, metalness: palette.aluMetal, roughness: palette.aluRough,
      clearcoat: 1.0, clearcoatRoughness: 0.16, envMapIntensity: palette.envIntensity,
    });
    const drk = new MeshPhysicalMaterial({ color: palette.keyDark, roughness: 0.55, metalness: 0.7, clearcoat: 0.4, clearcoatRoughness: 0.4 });
    const logoM = new MeshBasicMaterial({ color: 0x818cf8 });

    const src = macSrc.clone(true);
    src.children.slice().forEach((ch) => {
      if (ch.name === "_top") {
        lidGroup.add(ch);
        ch.children.slice().forEach((m) => {
          if (!(m instanceof Mesh)) return;
          m.castShadow = true; m.receiveShadow = true;
          m.material = m.name === "lid" ? alu : m.name === "logo" ? logoM : drk;
        });
      } else if (ch.name === "_bottom") {
        botGroup.add(ch);
        ch.children.slice().forEach((m) => {
          if (!(m instanceof Mesh)) return;
          m.castShadow = true; m.receiveShadow = true;
          m.material = m.name === "base" ? alu : drk;
        });
      }
    });

    const scrMat = new MeshBasicMaterial({ map: screen.tex, side: BackSide, toneMapped: false, transparent: true, opacity: 0 });
    const scr = new Mesh(new PlaneGeometry(29.4, 20), scrMat);
    scr.position.set(0, 10.5, -0.11);
    scr.rotation.set(Math.PI, 0, 0);
    lidGroup.add(scr);
    const darkBack = new Mesh(new PlaneGeometry(29.4, 20), drk);
    darkBack.position.set(0, 10.5, -0.115);
    darkBack.rotation.set(Math.PI, Math.PI, 0);
    lidGroup.add(darkBack);

    lidGroup.rotation.x = 0.5 * Math.PI;

    return { macGroup, lidGroup, scrMat, alu, drk, logoM };
  }, [macSrc, screen.tex, palette.alu, palette.aluMetal, palette.aluRough, palette.envIntensity, palette.keyDark]);

  // mount cubes + mac into root, run intro, cleanup
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    sim.cubes.forEach(({ g }) => root.add(g));
    root.add(macParts.macGroup);
    macGroupRef.current = macParts.macGroup;
    lidGroupRef.current = macParts.lidGroup;
    macParts.macGroup.visible = true;

    let tweens: gsap.core.Tween[] = [];
    if (reducedMotion) {
      macParts.macGroup.scale.setScalar(0.36);
      macParts.lidGroup.rotation.x = -0.2 * Math.PI;
      macParts.scrMat.opacity = 0.98;
      // pre-settle physics into a composed static cluster, then freeze
      const tg = sim.target;
      for (let s = 0; s < 160; s++) {
        for (const { body } of sim.cubes) {
          const dx = tg.x - body.position.x;
          const dy = tg.y - body.position.y;
          const dz = tg.z - body.position.z;
          const len = Math.hypot(dx, dy, dz) || 1;
          body.force.set((dx / len) * 0.5, (dy / len) * 0.5, (dz / len) * 0.5);
        }
        sim.world.step(1 / 60);
      }
      for (const { g, body } of sim.cubes) {
        g.position.set(body.position.x, body.position.y, body.position.z);
        g.quaternion.set(body.quaternion.x, body.quaternion.y, body.quaternion.z, body.quaternion.w);
      }
    } else {
      macParts.macGroup.scale.setScalar(0.0001);
      tweens = [
        gsap.to(macParts.macGroup.scale, { x: 0.36, y: 0.36, z: 0.36, duration: 1.4, delay: 0.3, ease: "expo.out" }),
        gsap.to(macParts.lidGroup.rotation, { x: -0.2 * Math.PI, duration: 1.8, delay: 0.8, ease: "expo.out" }),
        gsap.to(macParts.scrMat, { opacity: 0.98, duration: 0.4, delay: 1.6, ease: "power2.out" }),
      ];
    }

    return () => {
      tweens.forEach((tw) => tw.kill());
      sim.cubes.forEach(({ g, body }) => {
        root.remove(g);
        sim.world.removeBody(body);
      });
      root.remove(macParts.macGroup);
      sim.disposables.forEach((d) => d.dispose());
    };
  }, [sim, macParts, reducedMotion]);

  // ---- frame loop: pointer→3D target, physics, sync ----
  const raycaster = useMemo(() => new Raycaster(), []);
  const targetPlane = useMemo(() => new Plane(new Vector3(0, 0, 1), 0), []);
  const hitPt = useMemo(() => new Vector3(), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if ((frameCountRef.current++ & 1) === 0) drawScreen(t);

    raycaster.setFromCamera(state.pointer, camera);
    if (raycaster.ray.intersectPlane(targetPlane, hitPt)) {
      sim.target.x += (hitPt.x - sim.target.x) * 0.12;
      sim.target.y += (hitPt.y - sim.target.y) * 0.12;
      sim.target.z += (0 - sim.target.z) * 0.1;
    }

    if (!reducedMotion) {
      const tg = sim.target;
      for (let i = 0; i < sim.cubes.length; i++) {
        const body = sim.cubes[i].body;
        const dx = tg.x - body.position.x;
        const dy = tg.y - body.position.y;
        const dz = tg.z - body.position.z;
        const len = Math.hypot(dx, dy, dz) || 1;
        const gP = 0.5; // soju22: dir.normalize() * 0.5
        body.force.set((dx / len) * gP, (dy / len) * gP, (dz / len) * gP);
      }
      sim.world.step(1 / 60);
    }
    for (let i = 0; i < sim.cubes.length; i++) {
      const { g, body } = sim.cubes[i];
      g.position.set(body.position.x, body.position.y, body.position.z);
      g.quaternion.set(body.quaternion.x, body.quaternion.y, body.quaternion.z, body.quaternion.w);
    }

    if (macGroupRef.current && lidGroupRef.current && !reducedMotion) {
      macGroupRef.current.position.y = Math.sin(t * 0.5) * 0.12;
      lidGroupRef.current.rotation.x = -0.2 * Math.PI + Math.sin(t * 0.45) * 0.006;
    }
  });

  return <group ref={rootRef} />;
}
