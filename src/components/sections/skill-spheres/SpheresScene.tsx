"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  Group,
  Mesh,
  InstancedMesh,
  SphereGeometry,
  MeshStandardMaterial,
  InstancedBufferAttribute,
  Color,
  Object3D,
  Plane,
  Vector3,
  Raycaster,
  DynamicDrawUsage,
} from "three";
import * as CANNON from "cannon-es";

type Props = { reducedMotion: boolean };

// soju22 "Spheres" (CodePen MWyorNd) ported to R3F + cannon-es.
// Transparent canvas (page bg shows). Colors → white ↔ light indigo.
const C_WHITE = new Color("#ffffff");
const C_INDIGO = new Color("#818cf8"); // indigo-400 · indigo de verdade (não lilás)
const C_CENTER = new Color("#a5b4fc"); // indigo-300 · core indigo claro

export function SpheresScene({ reducedMotion }: Props) {
  const camera = useThree((s) => s.camera);
  const viewport = useThree((s) => s.viewport);
  const rootRef = useRef<Group>(null);

  const sim = useMemo(() => {
    const world = new CANNON.World();
    world.gravity.set(0, 0, 0);
    world.broadphase = new CANNON.NaiveBroadphase();
    (world.solver as CANNON.GSSolver).iterations = 20;
    // soju22 original · SEM ricochete → aglomerado coeso que segue a bola
    // grande (as paredes só contêm; a atração puxa tudo de volta)
    world.defaultContactMaterial.restitution = 0.0;
    world.defaultContactMaterial.friction = 0.0;

    // central sphere · KINEMATIC · the mouse moves THIS one; the small
    // spheres follow it (its position is their attraction target)
    const R_CENTER = 3.2; // menor (era 5 · estava gigante)
    const centerGeo = new SphereGeometry(R_CENTER, 48, 48);
    // glossy realista · reflete o Environment (canvas transparente, sem bloom)
    const centerMat = new MeshStandardMaterial({
      color: C_CENTER,
      roughness: 0.18,
      metalness: 0.0,
      envMapIntensity: 1.1,
    });
    const center = new Mesh(centerGeo, centerMat);
    center.castShadow = true;
    center.receiveShadow = true;
    // resting position biased to the RIGHT (título fica livre à esquerda)
    const HOME_X = 13;
    const centerBody = new CANNON.Body({
      type: CANNON.Body.KINEMATIC,
      shape: new CANNON.Sphere(R_CENTER),
      position: new CANNON.Vec3(HOME_X, 0, 0),
    });
    world.addBody(centerBody);

    // 200 instanced spheres
    const COUNT = (typeof window !== "undefined" && window.innerWidth < 768) ? 110 : 200;
    const geo = new SphereGeometry(1, 32, 32);
    // glossy realista · vertexColors (branco↔indigo) reflete o Environment
    const mat = new MeshStandardMaterial({
      color: 0xffffff,
      vertexColors: true,
      roughness: 0.16,
      metalness: 0.0,
      envMapIntensity: 1.2,
    });
    const iMesh = new InstancedMesh(geo, mat, COUNT);
    iMesh.instanceMatrix.setUsage(DynamicDrawUsage);
    iMesh.castShadow = true;
    iMesh.receiveShadow = true;

    const dummy = new Object3D();
    const scales = new Float32Array(COUNT);
    const colors = new Float32Array(COUNT * 3);
    const bodies: CANNON.Body[] = [];
    const c = new Color();
    for (let i = 0; i < COUNT; i++) {
      const px = (Math.random() - 0.5) * 40 + HOME_X;
      const py = (Math.random() - 0.5) * 40;
      // Z fino · todas começam perto do plano da bola central (mesma camada)
      const pz = (Math.random() - 0.5) * 6;
      const s = 0.25 + Math.random() * 0.75;
      scales[i] = s;
      dummy.position.set(px, py, pz);
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      iMesh.setMatrixAt(i, dummy.matrix);
      // white ↔ indigo · viés menor pro branco → mais indigo no mix
      c.copy(C_WHITE).lerp(C_INDIGO, Math.pow(Math.random(), 0.95));
      colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
      const body = new CANNON.Body({
        mass: s * 0.1,
        shape: new CANNON.Sphere(s),
        position: new CANNON.Vec3(px, py, pz),
        // damping alto → assentam e DESCANSAM na superfície da bola grande
        // (sem overshoot/órbita), formando uma casca densa que viaja junto
        linearDamping: 0.55,
        angularDamping: 0.55,
      });
      world.addBody(body);
      bodies.push(body);
    }
    iMesh.instanceMatrix.needsUpdate = true;
    geo.setAttribute("color", new InstancedBufferAttribute(colors, 3));

    const target = new CANNON.Vec3(HOME_X, 0, 0);
    return { world, center, centerBody, iMesh, bodies, scales, dummy, target, HOME_X, R_CENTER,
      disposables: [centerGeo, centerMat, geo, mat] };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    root.add(sim.center);
    root.add(sim.iMesh);

    if (reducedMotion) {
      // pre-settle into a static cluster, then freeze
      const tg = sim.target;
      for (let step = 0; step < 150; step++) {
        for (const b of sim.bodies) {
          const dx = tg.x - b.position.x, dy = tg.y - b.position.y, dz = tg.z - b.position.z;
          const len = Math.hypot(dx, dy, dz) || 1;
          b.force.set((dx / len) * 0.5, (dy / len) * 0.5, (dz / len) * 0.5);
        }
        sim.world.step(1 / 60);
      }
      for (let i = 0; i < sim.bodies.length; i++) {
        const b = sim.bodies[i];
        sim.dummy.position.set(b.position.x, b.position.y, b.position.z);
        sim.dummy.scale.setScalar(sim.scales[i]);
        sim.dummy.updateMatrix();
        sim.iMesh.setMatrixAt(i, sim.dummy.matrix);
      }
      sim.iMesh.instanceMatrix.needsUpdate = true;
    }

    return () => {
      root.remove(sim.center);
      root.remove(sim.iMesh);
      sim.bodies.forEach((b) => sim.world.removeBody(b));
      sim.disposables.forEach((d) => d.dispose());
    };
  }, [sim, reducedMotion]);

  // (sem paredes · soju22 original não tem · TODA bolinha sempre busca a
  // central → nenhuma fica presa/parada. A central é clampada na tela, então
  // o cluster fica sempre visível sem precisar de bordas de colisão.)

  const raycaster = useMemo(() => new Raycaster(), []);
  const targetPlane = useMemo(() => new Plane(new Vector3(0, 0, 1), 0), []);
  const hitPt = useMemo(() => new Vector3(), []);
  const prevP = useRef({ x: 0, y: 0 });
  const lastMove = useRef(-999); // começa idle → gira ao juntar no load

  useFrame((state) => {
    if (reducedMotion) return;

    // idle = mouse parado há >0.7s (já se juntaram) → cluster gira sozinho;
    // qualquer movimento do mouse zera e ele volta a seguir o cursor
    const t = state.clock.elapsedTime;
    const px = state.pointer.x, py = state.pointer.y;
    if (Math.abs(px - prevP.current.x) > 1e-4 || Math.abs(py - prevP.current.y) > 1e-4) {
      lastMove.current = t;
    }
    prevP.current.x = px; prevP.current.y = py;
    const idle = t - lastMove.current > 0.7;

    // 1 · mouse → raw 3D point on z=0 plane
    raycaster.setFromCamera(state.pointer, camera);
    if (raycaster.ray.intersectPlane(targetPlane, hitPt)) {
      // keep the BIG sphere (r=5) inside the walls
      const lx = Math.max(0, viewport.width / 2 - 2 - sim.R_CENTER);
      const ly = Math.max(0, viewport.height / 2 - 2 - sim.R_CENTER);
      // idle (mouse não mexeu) → repousa à DIREITA; ao mover, segue o cursor
      // por toda a tela (passa por cima/atrás do título à esquerda)
      const moved = state.pointer.x !== 0 || state.pointer.y !== 0;
      const tx = moved ? hitPt.x : Math.min(lx, sim.HOME_X);
      const ty = moved ? hitPt.y : 0;
      const mx = Math.max(-lx, Math.min(lx, tx));
      const my = Math.max(-ly, Math.min(ly, ty));
      // 2 · the BIG sphere glides toward the cursor (kinematic · pushes the
      //     small ones via collision). velocity = lerp delta per step.
      const cb = sim.centerBody;
      const dx = mx - cb.position.x, dy = my - cb.position.y, dz = 0 - cb.position.z;
      // glide mais suave (0.085) → a grande não foge do enxame; as pequenas
      // alcançam e DESCANSAM nela, viajando juntas como uma bola só
      cb.velocity.set(dx * 0.085 * 60, dy * 0.085 * 60, dz * 0.085 * 60);
      // small spheres are attracted to the BIG sphere → they follow it
      sim.target.set(cb.position.x, cb.position.y, cb.position.z);
    }

    const tg = sim.target;
    for (let i = 0; i < sim.bodies.length; i++) {
      const b = sim.bodies[i];
      const dx = tg.x - b.position.x, dy = tg.y - b.position.y, dz = tg.z - b.position.z;
      const len = Math.hypot(dx, dy, dz) || 1;
      // força proporcional à distância (mola): forte longe → arranca as
      // presas em parede; suave perto → descansam na superfície da grande
      // sem tremer. clamp evita explosão. TODAS acabam empacotadas nela.
      const f = Math.min(3.2, Math.max(0.7, len * 0.22));
      let fx = (dx / len) * f, fy = (dy / len) * f;
      const fz = (dz / len) * f;
      if (idle) {
        // spin MÍNIMO · tangencial bem menor que a atração radial → as
        // bolinhas ficam GRUDADAS na central e o conjunto só roda devagar
        // (não vira anel solto)
        const xy = Math.hypot(dx, dy) || 1;
        const spin = 0.12;
        fx += (-dy / xy) * spin;
        fy += (dx / xy) * spin;
      }
      b.force.set(fx, fy, fz);
    }
    sim.world.step(1 / 60);

    // big sphere mesh follows its body
    sim.center.position.set(
      sim.centerBody.position.x, sim.centerBody.position.y, sim.centerBody.position.z
    );

    for (let i = 0; i < sim.bodies.length; i++) {
      const b = sim.bodies[i];
      sim.dummy.position.set(b.position.x, b.position.y, b.position.z);
      sim.dummy.quaternion.set(b.quaternion.x, b.quaternion.y, b.quaternion.z, b.quaternion.w);
      sim.dummy.scale.setScalar(sim.scales[i]);
      sim.dummy.updateMatrix();
      sim.iMesh.setMatrixAt(i, sim.dummy.matrix);
    }
    sim.iMesh.instanceMatrix.needsUpdate = true;
  });

  return <group ref={rootRef} />;
}
