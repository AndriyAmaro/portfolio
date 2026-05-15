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
  const { camera } = useThree();
  const rootRef = useRef<Group>(null);

  const sim = useMemo(() => {
    const world = new CANNON.World();
    world.gravity.set(0, 0, 0);
    world.broadphase = new CANNON.NaiveBroadphase();
    (world.solver as CANNON.GSSolver).iterations = 20;

    // central sphere · static collider (radius 5), light indigo
    const centerGeo = new SphereGeometry(5, 32, 32);
    // glowing core (echoes the reference's luminous center sphere)
    const centerMat = new MeshPhongMaterial({
      color: C_CENTER,
      emissive: new Color("#818cf8"),
      emissiveIntensity: 0.55,
      shininess: 30,
    });
    const center = new Mesh(centerGeo, centerMat);
    center.receiveShadow = true;
    world.addBody(
      new CANNON.Body({ mass: 0, shape: new CANNON.Sphere(5), position: new CANNON.Vec3(0, 0, 0) })
    );

    // 200 instanced spheres
    const COUNT = (typeof window !== "undefined" && window.innerWidth < 768) ? 110 : 200;
    const geo = new SphereGeometry(1, 16, 16);
    const mat = new MeshPhongMaterial({ color: 0xffffff, vertexColors: true, shininess: 40 });
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
      const px = (Math.random() - 0.5) * 40;
      const py = (Math.random() - 0.5) * 40;
      const pz = (Math.random() - 0.5) * 40;
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

    const target = new CANNON.Vec3(0, 0, 0);
    return { world, center, iMesh, bodies, scales, dummy, target,
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

  const raycaster = useMemo(() => new Raycaster(), []);
  const targetPlane = useMemo(() => new Plane(new Vector3(0, 0, 1), 0), []);
  const hitPt = useMemo(() => new Vector3(), []);

  useFrame((state) => {
    if (reducedMotion) return;

    raycaster.setFromCamera(state.pointer, camera);
    if (raycaster.ray.intersectPlane(targetPlane, hitPt)) {
      sim.target.set(hitPt.x, hitPt.y, 0);
    }

    const tg = sim.target;
    for (let i = 0; i < sim.bodies.length; i++) {
      const b = sim.bodies[i];
      const dx = tg.x - b.position.x, dy = tg.y - b.position.y, dz = tg.z - b.position.z;
      const len = Math.hypot(dx, dy, dz) || 1;
      // soju22: dir.normalize() * 0.5, clamped [-0.5, 0.5]
      b.force.set((dx / len) * 0.5, (dy / len) * 0.5, (dz / len) * 0.5);
    }
    sim.world.step(1 / 60);

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
