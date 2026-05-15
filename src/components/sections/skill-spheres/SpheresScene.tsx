"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  Group,
  Mesh,
  InstancedMesh,
  SphereGeometry,
  MeshPhongMaterial,
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
const C_INDIGO = new Color("#a5b4fc"); // indigo-300 · "indigo claro"
const C_CENTER = new Color("#c7d2fe"); // indigo-200 · reads on dark AND off-white

export function SpheresScene({ reducedMotion }: Props) {
  const camera = useThree((s) => s.camera);
  const viewport = useThree((s) => s.viewport);
  const rootRef = useRef<Group>(null);
  const wallsRef = useRef<CANNON.Body[]>([]);

  const sim = useMemo(() => {
    const world = new CANNON.World();
    world.gravity.set(0, 0, 0);
    world.broadphase = new CANNON.NaiveBroadphase();
    (world.solver as CANNON.GSSolver).iterations = 20;
    // spheres bounce off the walls + each other (point 6)
    world.defaultContactMaterial.restitution = 0.7;
    world.defaultContactMaterial.friction = 0.0;

    // central sphere · KINEMATIC · the mouse moves THIS one; the small
    // spheres follow it (its position is their attraction target)
    const centerGeo = new SphereGeometry(5, 48, 48);
    // fiel ao soju22 · MeshPhong plástico (original era branco · aqui indigo
    // claro p/ a marca · sem emissive = esfera realista, não lâmpada)
    const centerMat = new MeshPhongMaterial({
      color: C_CENTER,
      specular: new Color("#ffffff"),
      shininess: 55,
    });
    const center = new Mesh(centerGeo, centerMat);
    center.castShadow = true;
    center.receiveShadow = true;
    // resting position biased to the RIGHT (título fica livre à esquerda)
    const HOME_X = 13;
    const centerBody = new CANNON.Body({
      type: CANNON.Body.KINEMATIC,
      shape: new CANNON.Sphere(5),
      position: new CANNON.Vec3(HOME_X, 0, 0),
    });
    world.addBody(centerBody);

    // 200 instanced spheres
    const COUNT = (typeof window !== "undefined" && window.innerWidth < 768) ? 110 : 200;
    const geo = new SphereGeometry(1, 32, 32);
    // fiel ao soju22 · MeshPhong vertexColors (branco↔indigo) · highlight
    // especular + sombras suaves entre esferas = o 3D realista do original
    const mat = new MeshPhongMaterial({
      color: 0xffffff,
      vertexColors: true,
      specular: new Color("#9aa0c8"),
      shininess: 42,
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
      const pz = (Math.random() - 0.5) * 24;
      const s = 0.25 + Math.random() * 0.75;
      scales[i] = s;
      dummy.position.set(px, py, pz);
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      iMesh.setMatrixAt(i, dummy.matrix);
      // white ↔ light indigo · biased toward white, some indigo
      c.copy(C_WHITE).lerp(C_INDIGO, Math.pow(Math.random(), 1.4));
      colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
      const body = new CANNON.Body({
        mass: s * 0.1,
        shape: new CANNON.Sphere(s),
        position: new CANNON.Vec3(px, py, pz),
        linearDamping: 0.1,
        angularDamping: 0.1,
      });
      world.addBody(body);
      bodies.push(body);
    }
    iMesh.instanceMatrix.needsUpdate = true;
    geo.setAttribute("color", new InstancedBufferAttribute(colors, 3));

    const target = new CANNON.Vec3(HOME_X, 0, 0);
    return { world, center, centerBody, iMesh, bodies, scales, dummy, target, HOME_X,
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

  // collision walls bounding the visible canvas → spheres bounce back
  // inside instead of being clipped at the hero edges (point 6)
  useEffect(() => {
    const w = sim.world;
    wallsRef.current.forEach((b) => w.removeBody(b));
    wallsRef.current = [];
    const hw = viewport.width / 2;
    const hh = viewport.height / 2;
    if (!hw || !hh) return;
    const inset = 2, t = 2, dz = 8;
    const X = Math.max(4, hw - inset);
    const Y = Math.max(4, hh - inset);
    const defs: [[number, number, number], [number, number, number]][] = [
      [[t, Y, dz], [-(X + t), 0, 0]],
      [[t, Y, dz], [X + t, 0, 0]],
      [[X, t, dz], [0, Y + t, 0]],
      [[X, t, dz], [0, -(Y + t), 0]],
      [[X, Y, t], [0, 0, dz + t]],
      [[X, Y, t], [0, 0, -(dz + t)]],
    ];
    const made: CANNON.Body[] = [];
    for (const [he, pos] of defs) {
      const b = new CANNON.Body({
        mass: 0,
        shape: new CANNON.Box(new CANNON.Vec3(he[0], he[1], he[2])),
        position: new CANNON.Vec3(pos[0], pos[1], pos[2]),
      });
      w.addBody(b);
      made.push(b);
    }
    wallsRef.current = made;
    return () => { made.forEach((b) => w.removeBody(b)); };
  }, [sim, viewport.width, viewport.height]);

  const raycaster = useMemo(() => new Raycaster(), []);
  const targetPlane = useMemo(() => new Plane(new Vector3(0, 0, 1), 0), []);
  const hitPt = useMemo(() => new Vector3(), []);

  useFrame((state) => {
    if (reducedMotion) return;

    // 1 · mouse → raw 3D point on z=0 plane
    raycaster.setFromCamera(state.pointer, camera);
    if (raycaster.ray.intersectPlane(targetPlane, hitPt)) {
      // keep the BIG sphere (r=5) inside the walls
      const lx = Math.max(0, viewport.width / 2 - 2 - 5);
      const ly = Math.max(0, viewport.height / 2 - 2 - 5);
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
      cb.velocity.set(dx * 0.12 * 60, dy * 0.12 * 60, dz * 0.12 * 60);
      // small spheres are attracted to the BIG sphere → they follow it
      sim.target.set(cb.position.x, cb.position.y, cb.position.z);
    }

    const tg = sim.target;
    for (let i = 0; i < sim.bodies.length; i++) {
      const b = sim.bodies[i];
      const dx = tg.x - b.position.x, dy = tg.y - b.position.y, dz = tg.z - b.position.z;
      const len = Math.hypot(dx, dy, dz) || 1;
      // normalized attraction toward the big sphere (soju22 · 0.62)
      b.force.set((dx / len) * 0.62, (dy / len) * 0.62, (dz / len) * 0.62);
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
