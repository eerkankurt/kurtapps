"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";


/* ── Scroll reveal ── */
function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.22 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(8px)",
        transition: `opacity 1.5s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 1.5s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

/* ── Shared status bar icons ── */
function StatusIcons() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
      <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
        <rect x="0" y="7" width="2.5" height="4" rx="0.5" fill="#111" />
        <rect x="4" y="5" width="2.5" height="6" rx="0.5" fill="#111" />
        <rect x="8" y="2" width="2.5" height="9" rx="0.5" fill="#111" />
        <rect x="12" y="0" width="2.5" height="11" rx="0.5" fill="#111" opacity="0.3" />
      </svg>
      <svg width="21" height="11" viewBox="0 0 21 11" fill="none">
        <rect x="0.5" y="0.5" width="17" height="10" rx="2" stroke="#111" strokeWidth="1" />
        <rect x="18" y="3.5" width="2" height="4" rx="0.8" fill="#111" />
        <rect x="1.5" y="1.5" width="12" height="8" rx="1.5" fill="#111" />
      </svg>
    </div>
  );
}

/* ── iPhone frame ── */
function IPhone({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative" style={{ width: 276, height: 542 }}>
      {/* Left buttons */}
      <div className="absolute" style={{ left: 2, top: 108, width: 4, height: 22, borderRadius: 2, background: "#2a2a2c" }} />
      <div className="absolute" style={{ left: 2, top: 142, width: 4, height: 34, borderRadius: 2, background: "#2a2a2c" }} />
      <div className="absolute" style={{ left: 2, top: 186, width: 4, height: 34, borderRadius: 2, background: "#2a2a2c" }} />
      {/* Right button */}
      <div className="absolute" style={{ right: 2, top: 154, width: 4, height: 54, borderRadius: 2, background: "#2a2a2c" }} />

      {/* Main frame - black */}
      <div
        className="absolute"
        style={{
          top: 0, bottom: 0, left: 6, right: 6,
          borderRadius: 52,
          background: "linear-gradient(160deg, #3a3a3c 0%, #1c1c1e 50%, #111 100%)",
          boxShadow: "0 40px 80px rgba(0,0,0,0.36), 0 12px 24px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.3)",
          padding: 7,
        }}
      >
        {/* Screen */}
        <div className="relative w-full h-full overflow-hidden" style={{ borderRadius: 46, background: "#fff" }}>
          {/* Dynamic Island */}
          <div className="absolute" style={{
            top: 12, left: "50%", transform: "translateX(-50%)",
            width: 100, height: 28,
            borderRadius: 20,
            background: "#000",
            zIndex: 10,
          }} />
          <div className="absolute inset-0 overflow-hidden" style={{ borderRadius: 46 }}>
            {children}
          </div>
        </div>
        {/* Frame glare */}
        <div className="absolute inset-0 pointer-events-none" style={{
          borderRadius: 52,
          background: "linear-gradient(145deg, rgba(255,255,255,0.06) 0%, transparent 40%)",
        }} />
      </div>
    </div>
  );
}

/* ── WalkRun app screen ── */
function WalkRunScreen() {
  return (
    <div className="h-full flex flex-col relative" style={{ background: "#f8f9fa" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "52px 14px 0" }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: "#111", letterSpacing: -0.3 }}>9:41</span>
        <StatusIcons />
      </div>

      <div style={{ padding: "6px 14px 10px" }}>
        <div style={{ fontSize: 9, color: "#9ca3af", fontWeight: 600, letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 2 }}>Active Run</div>
        <div style={{ fontSize: 17, fontWeight: 700, color: "#111", letterSpacing: -0.5 }}>Morning Run</div>
      </div>

      {/* Map */}
      <div style={{ margin: "0 12px 10px", height: 152, borderRadius: 14, overflow: "hidden", flexShrink: 0 }}>
        <svg viewBox="0 0 244 152" width="244" height="152" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
          <rect width="244" height="152" fill="#e8f5e9" />
          <line x1="0" y1="38" x2="244" y2="38" stroke="#d1ead1" strokeWidth="10" />
          <line x1="0" y1="96" x2="244" y2="96" stroke="#d1ead1" strokeWidth="10" />
          <line x1="76" y1="0" x2="76" y2="152" stroke="#d1ead1" strokeWidth="10" />
          <line x1="176" y1="0" x2="176" y2="152" stroke="#d1ead1" strokeWidth="10" />
          <path d="M18 126C28 107 38 90 54 84 70 78 76 59 82 44 88 29 106 28 126 26 146 24 160 34 176 48 192 62 202 78 218 74 226 72 233 68 238 60" stroke="rgba(22,163,74,0.2)" strokeWidth="9" fill="none" strokeLinecap="round" />
          <path d="M18 126C28 107 38 90 54 84 70 78 76 59 82 44 88 29 106 28 126 26 146 24 160 34 176 48 192 62 202 78 218 74 226 72 233 68 238 60" stroke="#16a34a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <circle cx="18" cy="126" r="5" fill="#15803d" />
          <circle cx="18" cy="126" r="10" fill="#22c55e" fillOpacity="0.22" />
          <circle cx="238" cy="60" r="6" fill="#22c55e" />
          <circle cx="238" cy="60" r="12" fill="#22c55e" fillOpacity="0.18" />
        </svg>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, margin: "0 12px 10px" }}>
        {[["Distance", "3.2 km"], ["Duration", "28:04"], ["Pace", "8′34″"]].map(([label, val]) => (
          <div key={label} style={{ background: "white", borderRadius: 10, padding: "7px 4px", textAlign: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
            <div style={{ fontSize: 7, color: "#9ca3af", marginBottom: 2 }}>{label}</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#111", letterSpacing: -0.3 }}>{val}</div>
          </div>
        ))}
      </div>

      {/* Pause button */}
      <div style={{ margin: "0 12px" }}>
        <div style={{ height: 46, borderRadius: 23, background: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="white">
            <rect x="2" y="1.5" width="3.5" height="11" rx="1" />
            <rect x="8.5" y="1.5" width="3.5" height="11" rx="1" />
          </svg>
        </div>
      </div>

      {/* Tab bar */}
      <div style={{ marginTop: "auto", borderTop: "1px solid #f0f0f0", display: "flex", paddingBottom: 8 }}>
        {[false, true, false].map((active, i) => (
          <div key={i} style={{ flex: 1, display: "flex", justifyContent: "center", paddingTop: 10 }}>
            <div style={{ width: 22, height: 22, borderRadius: 6, background: active ? "#16a34a" : "#e5e7eb" }} />
          </div>
        ))}
      </div>

      {/* Coming soon overlay */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-2.5"
        style={{ background: "rgba(248,249,250,0.88)", backdropFilter: "blur(14px)", borderRadius: 46 }}
      >
        <div style={{ background: "#111", color: "white", fontSize: 10, fontWeight: 600, padding: "5px 14px", borderRadius: 20, letterSpacing: 0.4 }}>
          Coming Soon
        </div>
        <div style={{ fontSize: 10, color: "#bbb" }}>Launching 2026</div>
      </div>
    </div>
  );
}

/* ── Dhikr Counter app screen ── */
function DhikrScreen() {
  const r = 40;
  const circ = 2 * Math.PI * r;

  return (
    <div className="h-full flex flex-col relative" style={{ background: "#fffaf7" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "52px 14px 0" }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: "#111", letterSpacing: -0.3 }}>9:41</span>
        <StatusIcons />
      </div>

      <div style={{ textAlign: "center", marginBottom: 22, marginTop: 12 }}>
        <div style={{ fontSize: 9, color: "#c4a882", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>Dhikr Counter</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <svg width={r * 2 + 24} height={r * 2 + 24} viewBox={`0 0 ${r * 2 + 24} ${r * 2 + 24}`} xmlns="http://www.w3.org/2000/svg">
          <circle cx={r + 12} cy={r + 12} r={r} fill="none" stroke="#f5e6d4" strokeWidth="5.5" />
          <circle
            cx={r + 12} cy={r + 12} r={r}
            fill="none" stroke="#9b59b6" strokeWidth="5.5"
            strokeDasharray={`${circ * 0.67} ${circ}`}
            strokeLinecap="round"
            transform={`rotate(-90 ${r + 12} ${r + 12})`}
          />
          <text x={r + 12} y={r + 10} textAnchor="middle" fontSize="24" fontWeight="700" fill="#2d1b3d">33</text>
          <text x={r + 12} y={r + 26} textAnchor="middle" fontSize="9" fill="#b39daa">of 99</text>
        </svg>

        <div style={{ marginTop: 16, textAlign: "center" }}>
          <div style={{ fontSize: 20, color: "#4a2c5a", fontWeight: 500, marginBottom: 5 }}>سبحان الله</div>
          <div style={{ fontSize: 10, color: "#b39daa", letterSpacing: 0.5 }}>Subhanallah</div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 22 }}>
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: i < 6 ? "#9b59b6" : "#f5e6d4" }} />
          ))}
        </div>
      </div>

      {/* Coming soon overlay */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-2.5"
        style={{ background: "rgba(255,250,247,0.88)", backdropFilter: "blur(14px)", borderRadius: 41 }}
      >
        <div style={{ background: "#111", color: "white", fontSize: 10, fontWeight: 600, padding: "5px 14px", borderRadius: 20, letterSpacing: 0.4 }}>
          Coming Soon
        </div>
        <div style={{ fontSize: 10, color: "#bbb" }}>Launching 2025</div>
      </div>
    </div>
  );
}

/* ── Subtle 3-axis tilt on hover for phone mockups ── */
function PhoneTilt({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientY - r.top) / r.height - 0.5) * -9;
    const y = ((e.clientX - r.left) / r.width - 0.5) * 9;
    setTilt({ x, y });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false); }}
      style={{ perspective: "1200px", display: "inline-block" }}
    >
      <div
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: hovered
            ? "transform 0.15s ease-out"
            : "transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94)",
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* ── Store badges ── */
function AppStoreBadge() {
  return (
    <a
      href="#"
      className="inline-flex items-center gap-3 bg-[#111] text-white rounded-2xl px-5 py-3 hover:bg-[#2a2a2a] hover:-translate-y-px hover:shadow-[0_4px_16px_rgba(0,0,0,0.18)] active:scale-[0.97] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
    >
      <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="white">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
      <div>
        <div className="text-[10px] text-white/50 leading-none">Download on the</div>
        <div className="text-sm font-semibold leading-snug">App Store</div>
      </div>
    </a>
  );
}

function GooglePlayBadge() {
  return (
    <a
      href="#"
      className="inline-flex items-center gap-3 bg-[#111] text-white rounded-2xl px-5 py-3 hover:bg-[#2a2a2a] hover:-translate-y-px hover:shadow-[0_4px_16px_rgba(0,0,0,0.18)] active:scale-[0.97] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
    >
      <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
        <path d="M0.416 19.554C0.159 19.283 0 18.885 0 18.368V1.634C0 1.117 0.159 0.719 0.416 0.448L0.488 0.52L9.561 9.593V10.208L0.488 19.28L0.416 19.554Z" fill="#4285F4"/>
        <path d="M12.561 12.908L9.561 9.8V9.2L12.561 6.094L12.639 6.138L16.239 8.238C17.3 8.84 17.3 9.962 16.239 10.562L12.639 12.662L12.561 12.908Z" fill="#FBBC04"/>
        <path d="M12.639 12.662L9.561 9.8L0.416 19.554C0.754 19.919 1.309 19.965 1.931 19.614L12.639 12.662Z" fill="#EA4335"/>
        <path d="M12.639 6.138L1.931 0.388C1.309 0.037 0.754 0.083 0.416 0.448L9.561 9.8L12.639 6.138Z" fill="#34A853"/>
      </svg>
      <div>
        <div className="text-[10px] text-white/50 leading-none">Get it on</div>
        <div className="text-sm font-semibold leading-snug">Google Play</div>
      </div>
    </a>
  );
}

/* ── Apple SVG icon (inline use) ── */
function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

/* ── Navbar ── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        scrolled ? "bg-[#fafaf9]/90 backdrop-blur-xl border-b border-black/[0.07]" : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/"><Image src="/branding/logo.svg" alt="KurtApps" width={120} height={30} priority /></a>

        <div className="hidden md:flex items-center gap-8">
          <a href="#apps" className="text-sm text-[#555] hover:text-[#111] transition-colors duration-200">Apps</a>
          <a href="/support" className="text-sm text-[#555] hover:text-[#111] transition-colors duration-200">Support</a>
        </div>

        <button className="md:hidden text-[#555] hover:text-[#111] transition-colors" onClick={() => setOpen(!open)}>
          {open ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 4l12 12M4 16L16 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#fafaf9] border-b border-black/[0.07] px-6 py-5 flex flex-col gap-5">
          <a href="#apps" className="text-sm text-[#555]" onClick={() => setOpen(false)}>Apps</a>
          <a href="/support" className="text-sm text-[#555]" onClick={() => setOpen(false)}>Support</a>
        </div>
      )}
    </nav>
  );
}

/* ── Hero ── */
function Hero() {
  return (
    <section className="relative pt-36 pb-32 px-6 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 50% at 50% -5%, rgba(220,218,255,0.5), transparent)" }}
      />
      <div className="relative max-w-4xl mx-auto text-center">
        <div className="fade-up d1 inline-flex items-center gap-2 bg-white border border-black/[0.08] rounded-full px-4 py-1.5 mb-10 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#6366f1] inline-block" />
          <span className="text-xs text-[#888] tracking-wide font-medium">Premium Mobile Apps</span>
        </div>

        <h1 className="fade-up d2 text-5xl md:text-7xl lg:text-[5.5rem] font-semibold tracking-tight text-[#111] leading-[1.06] mb-7">
          Thoughtful apps for<br />
          <span className="text-[#c0c0c0]">everyday life.</span>
        </h1>

        <p className="fade-up d3 text-base md:text-lg text-[#555] max-w-sm mx-auto mb-10 leading-relaxed">
          KurtApps designs calm, modern mobile experiences that feel intuitive, useful, and beautifully simple.
        </p>

        <div className="fade-up d4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button onClick={() => document.getElementById("apps")?.scrollIntoView({ behavior: "smooth" })} className="w-full sm:w-auto text-sm bg-[#111] text-white px-7 py-3 rounded-full font-medium hover:bg-[#2a2a2a] hover:-translate-y-px hover:shadow-[0_4px_16px_rgba(0,0,0,0.14)] active:scale-[0.97] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
            Explore Apps
          </button>
          <a href="/support" className="w-full sm:w-auto text-sm text-[#888] border border-black/[0.12] bg-white px-7 py-3 rounded-full font-medium hover:border-black/[0.22] hover:text-[#111] hover:-translate-y-px transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
            Get Support
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── WalkRun showcase ── */
function WalkRunShowcase() {
  return (
    <section id="walkrun" className="px-6 overflow-hidden min-h-screen flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-16 md:gap-20 items-center">

          <FadeIn className="md:order-2">
            <p className="text-xs uppercase tracking-widest text-[#aaa] font-medium mb-5">Fitness · Coming Soon</p>
            <h2 className="text-5xl md:text-6xl font-semibold text-[#111] tracking-tight leading-[1.05] mb-6">
              WalkRun
            </h2>
            <p className="text-[#555] leading-relaxed mb-10" style={{ maxWidth: 340 }}>
              Track your walks, runs, and hikes with detailed analytics, smart route tracking, and real-time performance insights.
            </p>

            <div className="inline-flex items-center gap-2 bg-[#f5f5f3] border border-black/[0.07] rounded-full px-4 py-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#aaa] inline-block" />
              <span className="text-xs text-[#888] font-medium">Launching soon on iOS</span>
            </div>
          </FadeIn>

          <FadeIn delay={160} className="flex justify-center md:order-1">
            <div className="relative">
              <div className="absolute pointer-events-none" style={{
                width: 440, height: 440,
                top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(134,239,172,0.45), transparent 68%)",
                filter: "blur(60px)",
              }} />
              <PhoneTilt>
                <div className="float">
                  <IPhone><WalkRunScreen /></IPhone>
                </div>
              </PhoneTilt>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}

/* ── Dhikr Counter showcase ── */
function DhikrShowcase() {
  return (
    <section id="apps" className="px-6 overflow-hidden min-h-screen flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-16 md:gap-20 items-center">

          <FadeIn delay={80} className="flex justify-center md:order-2">
            <div className="relative">
              <div className="absolute pointer-events-none" style={{
                width: 440, height: 440,
                top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(196,181,253,0.45), transparent 68%)",
                filter: "blur(60px)",
              }} />
              <PhoneTilt>
                <div className="float-delay">
                  <IPhone><DhikrScreen /></IPhone>
                </div>
              </PhoneTilt>
            </div>
          </FadeIn>

          <FadeIn delay={120} className="md:order-1 md:pl-28">
            <p className="text-xs uppercase tracking-widest text-[#aaa] font-medium mb-5">Spirituality · Available Now</p>
            <h2 className="text-5xl md:text-6xl font-semibold text-[#111] tracking-tight leading-[1.05] mb-6">
              Dhikr Counter
            </h2>
            <p className="text-[#555] leading-relaxed mb-10" style={{ maxWidth: 340 }}>
              Count your dhikr with a built-in counter, set daily goals, create reminders, and track your progress.
            </p>

            <div className="flex flex-wrap gap-3">
              <AppStoreBadge />
              <a href="/apps/daily-dhikr" className="inline-flex items-center gap-2 text-sm font-medium text-[#111] border border-black/[0.14] bg-white px-5 py-2.5 rounded-2xl hover:border-black/30 hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group">
                Learn more
                <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}

/* ── Support ── */
function Support() {
  return (
    <section id="support" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-end">
          <FadeIn>
            <p className="text-xs uppercase tracking-widest text-[#aaa] font-medium mb-6">Support</p>
            <h2 className="text-4xl md:text-5xl font-semibold text-[#111] tracking-tight leading-[1.1] mb-5">
              We&apos;re here<br />to help.
            </h2>
            <p className="text-sm text-[#555] leading-relaxed" style={{ maxWidth: 300 }}>
              Questions, feedback, or something not working? Reach out and we&apos;ll get back to you quickly.
            </p>
          </FadeIn>

          <FadeIn delay={100} className="flex flex-col items-start md:items-end">
            <div className="flex flex-col items-center gap-3">
              <a
                href="mailto:support@kurtapps.com"
                className="inline-flex items-center gap-2.5 bg-[#111] text-white text-sm font-medium px-7 py-3.5 rounded-full hover:bg-[#2a2a2a] active:scale-[0.97] transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                support@kurtapps.com
              </a>
              <p className="text-xs text-[#bbb]">Usually responds within 24 hours.</p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ── Footer ── */
function Footer() {
  return (
    <footer className="border-t border-[#f0eeea]">
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
              <span className="text-xs text-[#bbb] cursor-default">WalkRun</span>
              <a href="/apps/daily-dhikr" className="text-xs text-[#666] hover:text-[#111] hover:opacity-80 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">Dhikr Counter</a>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-[#333] mb-4">Company</p>
            <div className="flex flex-col gap-3">
              <a href="/support" className="text-xs text-[#666] hover:text-[#111] hover:opacity-80 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">Support</a>
              <a href="mailto:support@kurtapps.com" className="text-xs text-[#666] hover:text-[#111] hover:opacity-80 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">Contact</a>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-[#333] mb-4">Legal</p>
            <div className="flex flex-col gap-3">
              <a href="/privacy" className="text-xs text-[#666] hover:text-[#111] hover:opacity-80 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">Privacy Policy</a>
              <a href="/terms" className="text-xs text-[#666] hover:text-[#111] hover:opacity-80 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">Terms of Use</a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#f0eeea] pt-6 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-xs text-[#777]">© 2026 KurtApps. All rights reserved.</p>
          <p className="text-xs text-[#aaa]">Made with care.</p>
        </div>
      </div>
    </footer>
  );
}

/* ── Page ── */
export default function Home() {
  return (
    <div className="bg-[#fafaf9] text-[#111] min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <DhikrShowcase />
        <WalkRunShowcase />
        <Support />
      </main>
      <Footer />
    </div>
  );
}
