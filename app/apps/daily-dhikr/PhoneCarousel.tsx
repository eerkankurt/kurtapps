"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, ContactShadows } from "@react-three/drei";
import { useRef, useMemo, useEffect, Suspense } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

useGLTF.preload("/models/iphone.glb");

/* ── Placeholder screen textures (drawn on a canvas) ── */
function drawScreen(ctx: CanvasRenderingContext2D, w: number, h: number, idx: number) {
  if (idx === 0) {
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, "#f5f3ff"); g.addColorStop(1, "#ddd6fe");
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#7c3aed"; ctx.font = "bold 34px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("DHIKR COUNTER", w / 2, 120);
    ctx.fillStyle = "#8b5cf6"; ctx.font = "44px serif";
    ctx.fillText("سُبْحَانَ اللَّه", w / 2, 200);
    const cx = w / 2, cy = h / 2, r = 150;
    const cg = ctx.createLinearGradient(cx - r, cy - r, cx + r, cy + r);
    cg.addColorStop(0, "#6d28d9"); cg.addColorStop(1, "#8b5cf6");
    ctx.fillStyle = cg; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#fff"; ctx.font = "bold 130px sans-serif"; ctx.fillText("33", cx, cy + 48);
    ctx.fillStyle = "#a78bfa"; ctx.font = "30px sans-serif"; ctx.fillText("33 / 99", cx, cy + r + 90);
  } else if (idx === 1) {
    ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#111"; ctx.font = "bold 42px sans-serif"; ctx.textAlign = "left";
    ctx.fillText("Today", 60, 130);
    const items = [["SubhanAllah", 0.99], ["Alhamdulillah", 0.72], ["Allahu Akbar", 0.45]] as const;
    items.forEach(([name, pct], i) => {
      const y = 240 + i * 150;
      ctx.fillStyle = "#444"; ctx.font = "30px sans-serif"; ctx.fillText(name as string, 60, y);
      ctx.fillStyle = "#f3f0ff"; ctx.beginPath(); ctx.roundRect(60, y + 24, w - 120, 22, 11); ctx.fill();
      const grad = ctx.createLinearGradient(60, 0, w - 60, 0);
      grad.addColorStop(0, "#6d28d9"); grad.addColorStop(1, "#8b5cf6");
      ctx.fillStyle = grad; ctx.beginPath(); ctx.roundRect(60, y + 24, (w - 120) * (pct as number), 22, 11); ctx.fill();
    });
  } else if (idx === 2) {
    ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#111"; ctx.font = "bold 42px sans-serif"; ctx.textAlign = "left";
    ctx.fillText("Reminders", 60, 130);
    const rem = [["06:00", true], ["13:00", true], ["18:00", false], ["21:00", true]] as const;
    rem.forEach(([t, on], i) => {
      const y = 230 + i * 130;
      ctx.fillStyle = "#111"; ctx.font = "bold 40px sans-serif"; ctx.fillText(t as string, 60, y);
      ctx.fillStyle = on ? "#7c3aed" : "#e5e7eb";
      ctx.beginPath(); ctx.roundRect(w - 170, y - 38, 100, 56, 28); ctx.fill();
      ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(on ? w - 100 : w - 140, y - 10, 22, 0, Math.PI * 2); ctx.fill();
    });
  } else if (idx === 3) {
    ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#111"; ctx.font = "bold 42px sans-serif"; ctx.textAlign = "left";
    ctx.fillText("History", 60, 130);
    const days = [0.88, 1, 0.67, 1, 0.33, 0.89, 0.55];
    days.forEach((pct, i) => {
      const y = 220 + i * 110;
      ctx.fillStyle = "#f3f0ff"; ctx.beginPath(); ctx.roundRect(120, y, w - 200, 40, 20); ctx.fill();
      const grad = ctx.createLinearGradient(120, 0, w - 80, 0);
      grad.addColorStop(0, "#6d28d9"); grad.addColorStop(1, "#a78bfa");
      ctx.fillStyle = grad; ctx.beginPath(); ctx.roundRect(120, y, (w - 200) * pct, 40, 20); ctx.fill();
    });
  } else if (idx === 4) {
    ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#111"; ctx.font = "bold 42px sans-serif"; ctx.textAlign = "left";
    ctx.fillText("Collections", 60, 130);
    const items = ["Morning Adhkar", "Evening Adhkar", "After Prayer", "Gratitude", "Protection"];
    const colors = ["#7c3aed", "#6d28d9", "#5b21b6", "#4c1d95", "#3b0764"];
    items.forEach((name, i) => {
      const y = 210 + i * 140;
      ctx.fillStyle = colors[i]; ctx.beginPath(); ctx.roundRect(60, y - 40, 72, 72, 20); ctx.fill();
      ctx.fillStyle = "#222"; ctx.font = "30px sans-serif"; ctx.fillText(name, 152, y - 2);
      ctx.fillStyle = "#ddd6fe"; ctx.fillRect(60, y + 46, w - 120, 1);
    });
  } else if (idx === 5) {
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, "#f5f3ff"); g.addColorStop(1, "#ede9fe");
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#111"; ctx.font = "bold 42px sans-serif"; ctx.textAlign = "left";
    ctx.fillText("Daily Goal", 60, 130);
    ctx.fillStyle = "#a78bfa"; ctx.font = "28px sans-serif"; ctx.fillText("Set your intention", 60, 178);
    const goals = [["33", "Tasbeeh"], ["99", "Full Round"], ["300", "Dedicated"], ["∞", "Unlimited"]];
    goals.forEach(([n, label], i) => {
      const col = i % 2, row = Math.floor(i / 2);
      const x = 60 + col * 210, y = 240 + row * 200;
      ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.roundRect(x, y, 190, 170, 32); ctx.fill();
      ctx.fillStyle = "#6d28d9"; ctx.font = "bold 60px sans-serif"; ctx.textAlign = "center";
      ctx.fillText(n, x + 95, y + 90);
      ctx.fillStyle = "#a78bfa"; ctx.font = "26px sans-serif"; ctx.fillText(label, x + 95, y + 134);
    });
  } else {
    ctx.fillStyle = "#f2f2f7"; ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#111"; ctx.font = "bold 42px sans-serif"; ctx.textAlign = "left";
    ctx.fillText("Widget", 60, 130);
    ctx.fillStyle = "#bbb"; ctx.font = "28px sans-serif"; ctx.fillText("Home screen", 60, 178);
    const wg = ctx.createLinearGradient(60, 210, 60, 480);
    wg.addColorStop(0, "#6d28d9"); wg.addColorStop(1, "#8b5cf6");
    ctx.fillStyle = wg; ctx.beginPath(); ctx.roundRect(60, 210, w - 120, 270, 44); ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.6)"; ctx.font = "26px sans-serif"; ctx.textAlign = "left";
    ctx.fillText("Dhikr Counter", 100, 270);
    ctx.fillStyle = "#fff"; ctx.font = "bold 100px sans-serif"; ctx.fillText("33", 100, 390);
    ctx.fillStyle = "rgba(255,255,255,0.25)"; ctx.beginPath(); ctx.roundRect(100, 420, w - 200, 16, 8); ctx.fill();
    ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.roundRect(100, 420, (w - 200) * 0.33, 16, 8); ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.6)"; ctx.font = "24px sans-serif"; ctx.fillText("33 of 99 · SubhanAllah", 100, 460);
  }
}

function makeScreenTexture(idx: number) {
  const w = 512, h = 1100;
  const canvas = document.createElement("canvas");
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  drawScreen(ctx, w, h, idx);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.flipY = true; // we map it onto our own plane (standard UVs)
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
