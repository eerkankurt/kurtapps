"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, ContactShadows } from "@react-three/drei";
import { useRef, useMemo, useEffect, Suspense } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

useGLTF.preload("/models/iphone.glb");

const SCREEN_IMAGES = [
  "/dhikr-screens/1.png",
  "/dhikr-screens/2.png",
  "/dhikr-screens/3.png",
  "/dhikr-screens/4.png",
  "/dhikr-screens/5.png",
  "/dhikr-screens/6.png",
  "/dhikr-screens/7.png",
];

function makeScreenTexture(idx: number) {
  const tex = new THREE.TextureLoader().load(SCREEN_IMAGES[idx]);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.flipY = true;
  return tex;
}

const RING_R = 2.3;         // ring radius — side phones pushed further from center
const CAROUSEL_X = 0;       // horizontal shift of the whole ring
const RIGHT_TILT_DEG = 70;  // right-side phone tilt at its side position
const LEFT_TILT_DEG = -70;  // left-side phone tilt at its side position (mirror of right)

/* ── One phone instance on the ring ── */
function Phone({ idx, count, indexRef }: { idx: number; count: number; indexRef: React.MutableRefObject<number> }) {
  const { scene } = useGLTF("/models/iphone.glb");
  const groupRef = useRef<THREE.Group>(null);
  const matListRef = useRef<THREE.Material[]>([]);

  const model = useMemo(() => {
    const clone = scene.clone(true);
    clone.updateMatrixWorld(true);

    // find the screen mesh + apply placeholder screenshot
    const tex = makeScreenTexture(idx);
    let screenMesh: THREE.Mesh | null = null;
    const applyScreen = (mesh: THREE.Mesh) => {
      // rebuild clean 0-1 UVs from the flat screen rectangle (XY), then map our texture onto it
      const geo = mesh.geometry;
      geo.computeBoundingBox();
      const bb = geo.boundingBox!;
      const minX = bb.min.x, minY = bb.min.y;
      const w = bb.max.x - minX || 1, h = bb.max.y - minY || 1;
      const pos = geo.attributes.position;
      const uv = new Float32Array(pos.count * 2);
      for (let i = 0; i < pos.count; i++) {
        uv[i * 2] = (pos.getX(i) - minX) / w;
        uv[i * 2 + 1] = (pos.getY(i) - minY) / h;
      }
      geo.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
      mesh.material = new THREE.MeshBasicMaterial({ map: tex, toneMapped: false });
    };
    const mattBlack = new THREE.MeshStandardMaterial({
      color: 0x0a0a0a, metalness: 0.0, roughness: 0.95, envMapIntensity: 0.1,
    });

    clone.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (!mesh.isMesh) return;
      const mat = mesh.material as THREE.Material & { name?: string };
      const nm = o.name.toLowerCase();
      // Two coplanar screen meshes (Glass-Screen + the dark "17-Screen" backing) z-fight,
      // so texture BOTH with the same image to remove the dark band. Island/camera are other meshes.
      if (mat?.name === "Glass-Screen" || nm === "17-screen") {
        screenMesh = mesh;
        applyScreen(mesh);
      } else if (/island|cam|flash|mic|nettop|screenedge/.test(nm)) {
        mesh.material = mattBlack;
      }
    });

    // AUTO-ORIENT: rotate so the screen's outward normal faces the camera (+Z)
    if (screenMesh) {
      const sm = screenMesh as THREE.Mesh;
      const nAttr = sm.geometry.attributes.normal;
      if (nAttr) {
        const avg = new THREE.Vector3();
        const v = new THREE.Vector3();
        for (let i = 0; i < nAttr.count; i++) { v.fromBufferAttribute(nAttr, i); avg.add(v); }
        avg.divideScalar(nAttr.count);
        const nm = new THREE.Matrix3().getNormalMatrix(sm.matrixWorld);
        avg.applyMatrix3(nm).normalize();
        if (avg.lengthSq() > 0.05) {
          const q = new THREE.Quaternion().setFromUnitVectors(avg, new THREE.Vector3(0, 0, 1));
          clone.quaternion.premultiply(q);
          clone.updateMatrixWorld(true);
        }
      }
    }

    // ensure portrait (long edge vertical)
    let box = new THREE.Box3().setFromObject(clone);
    let size = new THREE.Vector3(); box.getSize(size);
    if (size.x > size.y) {
      clone.quaternion.premultiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2));
      clone.updateMatrixWorld(true);
      box = new THREE.Box3().setFromObject(clone);
      size = new THREE.Vector3(); box.getSize(size);
    }

    // normalize: uniform scale to target height, then offset so the (scaled) center sits at origin
    const center = new THREE.Vector3(); box.getCenter(center);
    const s = 3.6 / size.y;
    clone.scale.setScalar(s);
    clone.position.copy(center.multiplyScalar(-s));

    // Collect all materials so useFrame can control opacity without traversing every frame
    matListRef.current = [];
    clone.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (mesh.isMesh) {
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        (mats as THREE.Material[]).forEach((m) => { if (m) matListRef.current.push(m); });
      }
    });

    return clone;
  }, [scene, idx]);

  const step = (Math.PI * 2) / count;
  // facing factors: at the side position (θ = ±step) the phone is turned RIGHT/LEFT_TILT_DEG
  const rightFactor = THREE.MathUtils.degToRad(RIGHT_TILT_DEG) / step;
  const leftFactor = THREE.MathUtils.degToRad(-LEFT_TILT_DEG) / step;

  // Show only center + immediate neighbors (3 phones total)
  const visThreshold = (Math.cos(step) + Math.cos(2 * step)) / 2;

  useFrame(() => {
    const g = groupRef.current;
    if (!g) return;
    let theta = (idx - indexRef.current) * step;       // angular position on the ring
    theta = Math.atan2(Math.sin(theta), Math.cos(theta)); // normalize to (-π, π]
    g.position.set(RING_R * Math.sin(theta), 0, RING_R * Math.cos(theta) - Math.abs(Math.sin(theta)) * 0.8);
    g.rotation.y = theta * (theta >= 0 ? rightFactor : leftFactor); // asymmetric tilt
    g.visible = Math.cos(theta) > visThreshold;

    // Gaussian falloff from center: tight bell so only the front phone is affected
    const gauss = Math.exp(-theta * theta * 12);
    // Center phone: 1.15× scale. Side phones: 1.0×
    g.scale.setScalar(1.0 + 0.15 * gauss);
  });

  return (
    <group ref={groupRef}>
      <primitive object={model} />
    </group>
  );
}

/* ── Studio reflections so metal reads as metal (procedural, no network) ── */
function StudioEnv() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = env;
    return () => { env.dispose(); pmrem.dispose(); };
  }, [gl, scene]);
  return null;
}

/* ── The rotating ring (turntable) ── */
function Rig({ activeRef, count }: { activeRef: React.MutableRefObject<number>; count: number }) {
  const indexRef = useRef(0);

  useFrame(() => {
    const delta = activeRef.current - indexRef.current;
    indexRef.current = Math.abs(delta) < 0.01 ? activeRef.current : indexRef.current + delta * 0.4;
  });

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <Phone key={i} idx={i} count={count} indexRef={indexRef} />
      ))}
    </>
  );
}

export default function PhoneCarousel({ activeRef, count }: { activeRef: React.MutableRefObject<number>; count: number }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <StudioEnv />
      <ambientLight intensity={0.35} />
      <directionalLight position={[0, 9, 5]} intensity={1.8} />
      <directionalLight position={[-5, 6, 4]} intensity={0.7} />
      <directionalLight position={[5, 6, 4]} intensity={0.7} />
      <Suspense fallback={null}>
        <group position={[CAROUSEL_X, 0, 0]}>
          <Rig activeRef={activeRef} count={count} />
          <ContactShadows
            position={[0, -1.87, 0]}
            opacity={0.55}
            scale={12}
            blur={1}
            far={4}
            color="#1a1a2e"
          />
        </group>
      </Suspense>
    </Canvas>
  );
}
