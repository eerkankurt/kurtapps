"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

const PhoneCarousel = dynamic(() => import("./PhoneCarousel"), { ssr: false });

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#fafaf9]/90 backdrop-blur-xl border-b border-black/[0.07]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/">
          <Image src="/branding/logo.svg" alt="KurtApps" width={120} height={30} priority />
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="/#apps" className="text-sm text-[#555] hover:text-[#111] transition-colors duration-200">← All Apps</Link>
          <Link href="/support" className="text-sm text-[#555] hover:text-[#111] transition-colors duration-200">Support</Link>
        </div>
        <button className="md:hidden text-[#555] hover:text-[#111]" onClick={() => setOpen(!open)}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            {open
              ? <path d="M4 4l12 12M4 16L16 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              : <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />}
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-[#fafaf9] border-b border-black/[0.07] px-6 py-5 flex flex-col gap-5">
          <Link href="/#apps" className="text-sm text-[#555]" onClick={() => setOpen(false)}>← All Apps</Link>
          <Link href="/support" className="text-sm text-[#555]" onClick={() => setOpen(false)}>Support</Link>
        </div>
      )}
    </nav>
  );
}

function AppStoreBadge() {
  return (
    <a href="#" className="inline-flex items-center gap-4 bg-[#111] text-white rounded-[20px] px-6 py-4 hover:bg-[#2a2a2a] active:scale-[0.97] transition-all duration-200">
      <svg viewBox="0 0 24 24" className="w-6 h-6 shrink-0" fill="white">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
      <div>
        <div className="text-xs text-white/50 leading-none mb-0.5">Download on the</div>
        <div className="text-base font-semibold leading-snug">App Store</div>
      </div>
    </a>
  );
}

/* ── Placeholder screens ── */

function CounterScreen() {
  return (
    <div style={{ width: "100%", height: "100%", background: "linear-gradient(160deg, #f5f3ff 0%, #ede9fe 100%)", display: "flex", flexDirection: "column", alignItems: "center", padding: "56px 20px 28px" }}>
      <div style={{ fontSize: 10, color: "#8b5cf6", fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 4 }}>Dhikr Counter</div>
      <div style={{ fontSize: 15, color: "#7c3aed", fontWeight: 600, marginBottom: 32, fontFamily: "serif" }}>سُبْحَانَ اللَّه</div>
      <div style={{ width: 128, height: 128, borderRadius: "50%", background: "linear-gradient(145deg, #6d28d9, #8b5cf6)", boxShadow: "0 16px 48px rgba(109,40,217,0.4)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 28 }}>
        <span style={{ fontSize: 48, fontWeight: 700, color: "white" }}>33</span>
      </div>
      <div style={{ width: "72%", height: 4, background: "#ddd6fe", borderRadius: 2, marginBottom: 6 }}>
        <div style={{ width: "33%", height: "100%", background: "#7c3aed", borderRadius: 2 }} />
      </div>
      <div style={{ fontSize: 11, color: "#a78bfa", marginBottom: 32 }}>33 / 99</div>
      <div style={{ width: 64, height: 64, borderRadius: "50%", border: "2px solid #c4b5fd", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#7c3aed" }} />
      </div>
    </div>
  );
}

function ProgressScreen() {
  const items = [
    { name: "SubhanAllah", count: 99, total: 99 },
    { name: "Alhamdulillah", count: 72, total: 99 },
    { name: "Allahu Akbar", count: 45, total: 99 },
  ];
  return (
    <div style={{ width: "100%", height: "100%", background: "#fff", display: "flex", flexDirection: "column", padding: "56px 18px 24px" }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#111", marginBottom: 2 }}>Today</div>
      <div style={{ fontSize: 10, color: "#bbb", marginBottom: 20 }}>Friday, June 13</div>
      {items.map((item) => (
        <div key={item.name} style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
            <span style={{ fontSize: 11, color: "#444", fontWeight: 500 }}>{item.name}</span>
            <span style={{ fontSize: 11, color: "#7c3aed", fontWeight: 700 }}>{item.count}/{item.total}</span>
          </div>
          <div style={{ height: 5, background: "#f3f0ff", borderRadius: 3 }}>
            <div style={{ width: `${(item.count / item.total) * 100}%`, height: "100%", background: "linear-gradient(90deg,#6d28d9,#8b5cf6)", borderRadius: 3 }} />
          </div>
        </div>
      ))}
      <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {[{ label: "Streak", value: "7 days" }, { label: "Total", value: "2,847" }].map(s => (
          <div key={s.label} style={{ background: "#f5f3ff", borderRadius: 14, padding: "12px 14px" }}>
            <div style={{ fontSize: 9, color: "#a78bfa", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontSize: 17, fontWeight: 700, color: "#6d28d9" }}>{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReminderScreen() {
  const reminders = [
    { time: "06:00", label: "Morning Dhikr", on: true },
    { time: "13:00", label: "Afternoon", on: true },
    { time: "18:00", label: "After Asr", on: false },
    { time: "21:00", label: "Night Dhikr", on: true },
  ];
  return (
    <div style={{ width: "100%", height: "100%", background: "#fff", display: "flex", flexDirection: "column", padding: "56px 18px 24px" }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#111", marginBottom: 2 }}>Reminders</div>
      <div style={{ fontSize: 10, color: "#bbb", marginBottom: 24 }}>Stay consistent</div>
      {reminders.map((r) => (
        <div key={r.time} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 0", borderBottom: "1px solid #f5f3ff" }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#111" }}>{r.time}</div>
            <div style={{ fontSize: 10, color: "#bbb" }}>{r.label}</div>
          </div>
          <div style={{ width: 38, height: 22, borderRadius: 11, background: r.on ? "#7c3aed" : "#e5e7eb", position: "relative", flexShrink: 0 }}>
            <div style={{ width: 17, height: 17, borderRadius: "50%", background: "white", position: "absolute", top: 2.5, left: r.on ? 18.5 : 2.5, transition: "left 0.2s" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function HistoryScreen() {
  const days = [
    { day: "Fri", pct: 88 }, { day: "Thu", pct: 100 }, { day: "Wed", pct: 67 },
    { day: "Tue", pct: 100 }, { day: "Mon", pct: 33 }, { day: "Sun", pct: 89 }, { day: "Sat", pct: 55 },
  ];
  return (
    <div style={{ width: "100%", height: "100%", background: "#fff", display: "flex", flexDirection: "column", padding: "56px 18px 24px" }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#111", marginBottom: 2 }}>History</div>
      <div style={{ fontSize: 10, color: "#bbb", marginBottom: 20 }}>Last 7 days</div>
      {days.map((d) => (
        <div key={d.day} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 11 }}>
          <div style={{ fontSize: 10, color: "#aaa", width: 22, flexShrink: 0 }}>{d.day}</div>
          <div style={{ flex: 1, height: 8, background: "#f3f0ff", borderRadius: 4 }}>
            <div style={{ width: `${d.pct}%`, height: "100%", background: "linear-gradient(90deg,#6d28d9,#a78bfa)", borderRadius: 4 }} />
          </div>
          <div style={{ fontSize: 10, color: "#7c3aed", fontWeight: 700, width: 30, textAlign: "right" }}>{Math.round(d.pct * 2.97)}</div>
        </div>
      ))}
    </div>
  );
}

function CollectionsScreen() {
  const items = ["Morning Adhkar", "Evening Adhkar", "After Prayer", "Gratitude", "Protection"];
  return (
    <div style={{ width: "100%", height: "100%", background: "#fff", display: "flex", flexDirection: "column", padding: "56px 18px 24px" }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#111", marginBottom: 2 }}>Collections</div>
      <div style={{ fontSize: 10, color: "#bbb", marginBottom: 20 }}>Choose your practice</div>
      {items.map((item, i) => (
        <div key={item} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: "1px solid #f5f3ff" }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: `hsl(${265 + i * 10}, 65%, ${62 - i * 3}%)`, flexShrink: 0 }} />
          <div style={{ fontSize: 12, fontWeight: 500, color: "#111" }}>{item}</div>
          <div style={{ marginLeft: "auto", fontSize: 14, color: "#c4b5fd" }}>›</div>
        </div>
      ))}
    </div>
  );
}

function GoalsScreen() {
  const goals = [
    { n: "33", label: "Tasbeeh" }, { n: "99", label: "Full Round" },
    { n: "300", label: "Dedicated" }, { n: "∞", label: "Unlimited" },
  ];
  return (
    <div style={{ width: "100%", height: "100%", background: "linear-gradient(160deg, #f5f3ff 0%, #ede9fe 100%)", display: "flex", flexDirection: "column", padding: "56px 18px 24px" }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#111", marginBottom: 2 }}>Daily Goal</div>
      <div style={{ fontSize: 10, color: "#a78bfa", marginBottom: 24 }}>Set your intention</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {goals.map((g) => (
          <div key={g.n} style={{ background: "white", borderRadius: 16, padding: "18px 12px", textAlign: "center", boxShadow: "0 2px 12px rgba(109,40,217,0.08)" }}>
            <div style={{ fontSize: 26, fontWeight: 700, color: "#6d28d9", marginBottom: 4 }}>{g.n}</div>
            <div style={{ fontSize: 10, color: "#a78bfa" }}>{g.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WidgetScreen() {
  return (
    <div style={{ width: "100%", height: "100%", background: "#f2f2f7", display: "flex", flexDirection: "column", padding: "56px 18px 24px" }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#111", marginBottom: 2 }}>Widget</div>
      <div style={{ fontSize: 10, color: "#bbb", marginBottom: 20 }}>Home screen</div>
      <div style={{ background: "linear-gradient(145deg, #6d28d9, #8b5cf6)", borderRadius: 22, padding: "20px", marginBottom: 12 }}>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", marginBottom: 4 }}>Dhikr Counter</div>
        <div style={{ fontSize: 34, fontWeight: 700, color: "white", marginBottom: 6 }}>33</div>
        <div style={{ height: 4, background: "rgba(255,255,255,0.2)", borderRadius: 2, marginBottom: 6 }}>
          <div style={{ width: "33%", height: "100%", background: "white", borderRadius: 2 }} />
        </div>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.6)" }}>33 of 99 · SubhanAllah</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <div style={{ background: "linear-gradient(145deg, #4c1d95, #6d28d9)", borderRadius: 18, padding: "16px 14px" }}>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", marginBottom: 6 }}>Streak</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: "white" }}>7</div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>days</div>
        </div>
        <div style={{ background: "white", borderRadius: 18, padding: "16px 14px" }}>
          <div style={{ fontSize: 10, color: "#a78bfa", marginBottom: 6 }}>Today</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: "#6d28d9" }}>3/5</div>
          <div style={{ fontSize: 10, color: "#bbb" }}>sessions</div>
        </div>
      </div>
    </div>
  );
}

/* ── iPhone frame (true 3D box) ── */
const PHONE_W = 235;
const PHONE_H = 476;
const PHONE_T = 22; // thickness / depth

// Brushed-metal band used on the side edges
const edgeBand = "linear-gradient(180deg,#5a5a5e 0%,#2c2c2e 18%,#48484a 50%,#2c2c2e 82%,#5a5a5e 100%)";

function PhoneFrame({ children }: { children: React.ReactNode }) {
  const sideBase: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: (PHONE_W - PHONE_T) / 2,
    width: PHONE_T,
    height: PHONE_H,
    background: edgeBand,
    borderRadius: 6,
  };

  return (
    <div style={{ width: PHONE_W, height: PHONE_H, position: "relative", flexShrink: 0, transformStyle: "preserve-3d" }}>

      {/* Right side edge */}
      <div style={{ ...sideBase, transform: `rotateY(90deg) translateZ(${PHONE_W / 2}px)` }}>
        {/* power button */}
        <div style={{ position: "absolute", top: 132, left: -1, width: PHONE_T + 2, height: 62, background: "#1f1f21", borderRadius: 3 }} />
      </div>

      {/* Left side edge */}
      <div style={{ ...sideBase, transform: `rotateY(-90deg) translateZ(${PHONE_W / 2}px)` }}>
        {/* volume buttons */}
        <div style={{ position: "absolute", top: 122, left: -1, width: PHONE_T + 2, height: 46, background: "#1f1f21", borderRadius: 3 }} />
        <div style={{ position: "absolute", top: 178, left: -1, width: PHONE_T + 2, height: 46, background: "#1f1f21", borderRadius: 3 }} />
      </div>

      {/* Back face */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: 44,
        transform: `rotateY(180deg) translateZ(${PHONE_T / 2}px)`,
        background: "linear-gradient(145deg,#3a3a3c,#1c1c1e 60%)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
      }}>
        <div style={{ position: "absolute", top: 18, left: 18, width: 60, height: 60, borderRadius: 18, background: "#2a2a2c", boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)" }} />
      </div>

      {/* Front face — screen */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: 44, background: "#1c1c1e",
        transform: `translateZ(${PHONE_T / 2}px)`,
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)",
      }}>
        <div style={{ position: "absolute", inset: 3, borderRadius: 41, overflow: "hidden", background: "white" }}>
          {children}
        </div>
        <div style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", width: 78, height: 24, background: "#1c1c1e", borderRadius: 12, zIndex: 10 }} />
      </div>

    </div>
  );
}

/* ── Slides data ── */
const slides = [
  {
    Screen: CounterScreen,
    title: "Count with intention.",
    description: "A focused, beautiful counter for your daily dhikr. Simple to use, meaningful every time.",
  },
  {
    Screen: ProgressScreen,
    title: "Track your practice.",
    description: "See your daily progress, streaks, and totals — all in one clean, motivating view.",
  },
  {
    Screen: ReminderScreen,
    title: "Never miss a session.",
    description: "Set gentle reminders throughout the day to help maintain a consistent spiritual practice.",
  },
  {
    Screen: HistoryScreen,
    title: "Watch yourself grow.",
    description: "A visual history of your journey — every session recorded, every milestone celebrated.",
  },
  {
    Screen: CollectionsScreen,
    title: "Choose your practice.",
    description: "Browse a library of dhikr collections for every moment — morning, evening, after prayer, and more.",
  },
  {
    Screen: GoalsScreen,
    title: "Set your intention.",
    description: "Define your daily dhikr goals and stay on track with gentle, meaningful targets.",
  },
  {
    Screen: WidgetScreen,
    title: "Always within reach.",
    description: "A beautiful home screen widget keeps your practice visible and your intentions clear.",
  },
];

/* ── Feature Carousel (Apple-style scroll-progress) ── */
const TOTAL = slides.length;        // 7 feature pages
const VH_PER_PAGE = 150;            // each page occupies 1.5 viewports of scroll

function FeatureCarousel() {
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);

  // 3D phone lerp target — continuous float driven by physical scroll
  const activeFloatRef = useRef(0);

  const sectionRef = useRef<HTMLElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Debug: log band positions and distances once on mount and on resize
  useEffect(() => {
    const logBands = () => {
      const section = sectionRef.current;
      if (!section) return;
      const band = window.innerHeight * 1.5;
      const sectionTop = window.scrollY + section.getBoundingClientRect().top;
      const positions = Array.from({ length: TOTAL }, (_, i) => sectionTop + i * band);
      positions.forEach((pos, i) => console.log(`Page ${i + 1} position = ${Math.round(pos)}`));
      for (let i = 0; i < TOTAL - 1; i++) {
        console.log(`${i + 1} → ${i + 2} = ${Math.round(positions[i + 1] - positions[i])} (innerHeight = ${band})`);
      }
    };
    logBands();
    window.addEventListener("resize", logBands);
    return () => window.removeEventListener("resize", logBands);
  }, []);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      const section = sectionRef.current;
      if (!section) return;

      const band = window.innerHeight * 1.5;
      if (band <= 0) return;
      const rect = section.getBoundingClientRect();

      const scrolled = -rect.top;
      const maxScrolled = section.offsetHeight - band;

      const progress = maxScrolled > 0 ? Math.max(0, Math.min(1, scrolled / maxScrolled)) : 0;
      const floatIdx = Math.max(0, Math.min(TOTAL - 1, scrolled / band));

      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${progress})`;
      }

      // Accelerated progress: phone rotation and text both switch at 40% of each band.
      // Previously text used Math.round (50% threshold); phone used 40%. Now both use 40%
      // so they are guaranteed to switch at the same scroll position.
      const bandN = Math.floor(floatIdx);
      const frac = floatIdx - bandN;
      const accelFrac = Math.min(1, frac / 0.4);
      activeFloatRef.current = Math.max(0, Math.min(TOTAL - 1, bandN + accelFrac));

      const derived = Math.max(0, Math.min(TOTAL - 1, frac >= 0.4 ? bandN + 1 : bandN));
      setCurrentFeatureIndex(derived);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Dots / Prev / Next: smooth scroll to the exact band position
  const scrollToPage = (i: number) => {
    const section = sectionRef.current;
    if (!section) return;
    window.scrollTo({ top: section.offsetTop + i * window.innerHeight * 1.5, behavior: "smooth" });
  };

  // Tall section scrolled by the WINDOW. Sticky child pins only once the
  // section top reaches the viewport top (rect.top <= 0), so the phones are
  // fully visible before the carousel starts. Entry/exit are pure native page
  // scroll — no preventDefault, no JS interception, nothing to get stuck on.
  // scroll-snap-stop on the band anchors stops fast skipping.
  return (
    <section
      ref={sectionRef}
      className="bg-[#fafaf9]"
      style={{ position: "relative", height: `${TOTAL * VH_PER_PAGE}vh` }}
    >
      {/* Invisible snap anchors, one per band */}
      {slides.map((_, i) => (
        <div
          key={i}
          aria-hidden
          style={{
            position: "absolute",
            top: `${i * VH_PER_PAGE}vh`,
            left: 0,
            right: 0,
            height: "100vh",
            scrollSnapAlign: "start",
            scrollSnapStop: "always",
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Pinned visual stage — sticky relative to the window */}
      <div className="sticky top-16 overflow-hidden" style={{ zIndex: 1, height: "calc(100vh - 64px)" }}>
        <div className="h-full max-w-6xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-16">

          {/* LEFT — 3D phone, driven by activeFloatRef (scroll progress) */}
          <div style={{ position: "relative", height: 620 }}>
            {/* Subtle radial glow behind the carousel */}
            <div aria-hidden style={{
              position: "absolute", inset: "-15% -10%",
              background: "radial-gradient(ellipse at center, rgba(139,92,246,0.07) 0%, transparent 68%)",
              pointerEvents: "none",
            }} />
            <PhoneCarousel activeRef={activeFloatRef} count={TOTAL} />
          </div>

          {/* RIGHT — content, driven by currentFeatureIndex (derived) */}
          <div>
            {/* Feature counter */}
            <div className="mb-6">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#bbb] font-medium mb-1">Features</p>
              <p className="text-sm font-semibold tabular-nums" style={{ color: "#52BF1B" }}>
                {String(currentFeatureIndex + 1).padStart(2, "0")}
                <span className="font-normal text-[#ccc] mx-1">/</span>
                {String(TOTAL).padStart(2, "0")}
              </p>
            </div>
            <h3
              key={currentFeatureIndex}
              className="text-3xl md:text-4xl font-semibold text-[#111] tracking-tight mb-4"
              style={{ animation: "fadeUp 0.45s cubic-bezier(0.22,1,0.36,1) forwards" }}
            >
              {slides[currentFeatureIndex].title}
            </h3>
            <p
              key={`d-${currentFeatureIndex}`}
              className="text-[#555] leading-relaxed"
              style={{ maxWidth: 360, animation: "fadeUp 0.45s cubic-bezier(0.22,1,0.36,1) 0.05s both" }}
            >
              {slides[currentFeatureIndex].description}
            </p>

            {/* Progress indicator */}
            <div className="mt-14" style={{ maxWidth: 360 }}>
              <div style={{ height: 5, background: "#d4efc8", borderRadius: 3, overflow: "hidden" }}>
                <div
                  ref={progressBarRef}
                  style={{
                    height: "100%",
                    background: "#52BF1B",
                    borderRadius: 3,
                    transformOrigin: "left",
                    transform: "scaleX(0)",
                  }}
                />
              </div>
            </div>
          </div>

        </div>{/* grid */}
      </div>{/* sticky stage */}
    </section>
  );
}

/* ── Page ── */
export default function DhikrCounterPage() {
  return (
    <div className="bg-[#fafaf9] text-[#111] min-h-screen">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="px-6 relative" style={{ paddingTop: "274px", paddingBottom: 0, minHeight: "100vh" }}>
          {/* Soft ambient glow behind hero content — fades before section edge */}
          <div aria-hidden style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse 65% 45% at 50% 38%, rgba(139,92,246,0.09) 0%, transparent 100%)",
            pointerEvents: "none",
          }} />
          <div style={{ maxWidth: 960, margin: "0 auto", textAlign: "center", position: "relative" }}>
            <div className="inline-flex items-center gap-2 bg-white border border-black/[0.12] rounded-full px-4 py-1.5 mb-8 shadow-sm">
              <span className="w-2 h-2 rounded-full inline-block" style={{ background: "#52BF1B" }} />
              <span className="text-xs text-[#666] tracking-wide font-medium">Spirituality · Available Now</span>
            </div>
            <h1 className="text-6xl md:text-[86px] font-semibold tracking-tight text-[#111] leading-[1.05] mb-6">
              Dhikr Counter
            </h1>
            <p className="text-lg text-[#555] max-w-md mx-auto mb-10 leading-relaxed">
              A calm, beautiful space for your daily remembrance. Build a practice that lasts a lifetime.
            </p>
            <AppStoreBadge />
          </div>
        </section>

        {/* Scroll carousel */}
        <FeatureCarousel />

        {/* CTA */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-xs uppercase tracking-widest text-[#aaa] font-medium mb-5">Download</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-[#111] tracking-tight mb-4">Begin your practice.</h2>
            <p className="text-sm text-[#555] mb-8">Available on iOS. Free to download.</p>
            <AppStoreBadge />
            <div className="flex items-center justify-center gap-4 mt-10 flex-wrap">
              <span className="text-xs text-[#bbb]">Supported Languages: EN · TR · AR · BN · FR · DE · ID · MS · FA · UR</span>
              <span className="text-[#e0e0e0]">·</span>
              <Link href="/apps/daily-dhikr/terms" className="text-xs text-[#bbb] hover:text-[#888] transition-colors">Terms of Use</Link>
              <span className="text-[#e0e0e0]">·</span>
              <Link href="/apps/daily-dhikr/privacy" className="text-xs text-[#bbb] hover:text-[#888] transition-colors">Privacy Policy</Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#f0eeea] bg-white">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            <div className="col-span-2 md:col-span-1">
              <span className="text-sm font-semibold text-[#111] block mb-3">KurtApps</span>
              <p className="text-xs text-[#666] leading-relaxed" style={{ maxWidth: 200 }}>
                KurtApps designs calm, modern mobile experiences that feel intuitive, useful, and beautifully simple.
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-[#333] mb-4">Apps</p>
              <div className="flex flex-col gap-3">
                <Link href="/apps/walkrun" className="text-xs text-[#666] hover:text-[#111] hover:opacity-80 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">WalkRun</Link>
                <Link href="/apps/daily-dhikr" className="text-xs text-[#666] hover:text-[#111] hover:opacity-80 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">Dhikr Counter</Link>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-[#333] mb-4">Company</p>
              <div className="flex flex-col gap-3">
                <Link href="/support" className="text-xs text-[#666] hover:text-[#111] hover:opacity-80 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">Support</Link>
                <a href="mailto:support@kurtapps.com" className="text-xs text-[#666] hover:text-[#111] hover:opacity-80 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">Contact</a>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-[#333] mb-4">Legal</p>
              <div className="flex flex-col gap-3">
                <Link href="/privacy" className="text-xs text-[#666] hover:text-[#111] hover:opacity-80 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">Privacy Policy</Link>
                <Link href="/terms" className="text-xs text-[#666] hover:text-[#111] hover:opacity-80 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">Terms of Use</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-[#f0eeea] pt-6 flex flex-col md:flex-row justify-between items-center gap-2">
            <p className="text-xs text-[#777]">© 2026 KurtApps. All rights reserved.</p>
            <p className="text-xs text-[#aaa]">Made with care.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
