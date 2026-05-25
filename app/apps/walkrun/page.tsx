"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#fafaf9]/90 backdrop-blur-xl border-b border-black/[0.07]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/">
          <Image src="/branding/logo.svg" alt="KurtApps" width={120} height={30} priority />
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm text-[#888] hover:text-[#111] transition-colors duration-200">← All Apps</Link>
          <Link href="/support" className="text-sm text-[#888] hover:text-[#111] transition-colors duration-200">Support</Link>
          <a href="#" className="text-sm bg-[#111] text-white px-5 py-2 rounded-full font-medium hover:bg-[#2a2a2a] transition-all duration-200">Download</a>
        </div>
        <button className="md:hidden text-[#888] hover:text-[#111]" onClick={() => setOpen(!open)}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            {open
              ? <path d="M4 4l12 12M4 16L16 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              : <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />}
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-[#fafaf9] border-b border-black/[0.07] px-6 py-5 flex flex-col gap-5">
          <Link href="/" className="text-sm text-[#888]" onClick={() => setOpen(false)}>← All Apps</Link>
          <Link href="/support" className="text-sm text-[#888]" onClick={() => setOpen(false)}>Support</Link>
        </div>
      )}
    </nav>
  );
}

function AppStoreBadge() {
  return (
    <a href="#" className="inline-flex items-center gap-3 bg-[#111] text-white rounded-2xl px-5 py-3 hover:bg-[#2a2a2a] active:scale-[0.97] transition-all duration-200">
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
    <a href="#" className="inline-flex items-center gap-3 bg-[#111] text-white rounded-2xl px-5 py-3 hover:bg-[#2a2a2a] active:scale-[0.97] transition-all duration-200">
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

const features = [
  {
    title: "Route Mapping",
    description: "Precise GPS tracking maps every walk, run, and hike in real time with elevation and split data.",
  },
  {
    title: "Performance Analytics",
    description: "Deep insights into pace, cadence, distance trends, and personal records over time.",
  },
  {
    title: "Smart Goals",
    description: "Set weekly targets, track streaks, and stay motivated with intelligent progress summaries.",
  },
];

export default function WalkRunPage() {
  return (
    <div className="bg-[#fafaf9] text-[#111] min-h-screen">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="pt-36 pb-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white border border-black/[0.08] rounded-full px-4 py-1.5 mb-8 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
              <span className="text-xs text-[#888] tracking-wide font-medium">Fitness</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-semibold tracking-tight text-[#111] leading-[1.05] mb-6">
              WalkRun
            </h1>
            <p className="text-lg text-[#888] max-w-md mx-auto mb-10 leading-relaxed">
              Your personal running companion. Track every step, analyse every move, and hit every goal.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <AppStoreBadge />
              <GooglePlayBadge />
            </div>
          </div>
        </section>

        {/* Visual */}
        <section className="px-6 pb-24">
          <div className="max-w-6xl mx-auto">
            <div
              className="relative rounded-3xl overflow-hidden flex items-center justify-center"
              style={{ height: 360, background: "linear-gradient(145deg, #f0fdf4 0%, #dcfce7 55%, #bbf7d0 100%)" }}
            >
              <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(134,239,172,0.5), transparent)" }} />
              <div
                className="relative flex items-center justify-center shadow-2xl"
                style={{ width: 120, height: 120, borderRadius: "26%", background: "linear-gradient(145deg, #15803d, #22c55e)", boxShadow: "0 24px 64px rgba(22,163,74,0.35)" }}
              >
                <svg className="w-14 h-14 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-24 px-6 border-t border-[#f0eeea]">
          <div className="max-w-6xl mx-auto">
            <div className="mb-14">
              <p className="text-xs uppercase tracking-widest text-[#aaa] font-medium mb-3">Features</p>
              <h2 className="text-3xl md:text-4xl font-semibold text-[#111] tracking-tight">Built for serious movers.</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {features.map((f) => (
                <div key={f.title} className="bg-white border border-[#f0eeea] rounded-2xl p-7 hover:shadow-[0_4px_24px_rgba(0,0,0,0.07)] transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center mb-5">
                    <div className="w-4 h-4 rounded bg-green-500" />
                  </div>
                  <h3 className="text-base font-semibold text-[#111] mb-2">{f.title}</h3>
                  <p className="text-sm text-[#888] leading-relaxed">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 border-t border-[#f0eeea] bg-white">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-xs uppercase tracking-widest text-[#aaa] font-medium mb-5">Download</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-[#111] tracking-tight mb-4">Start running today.</h2>
            <p className="text-sm text-[#888] mb-8">Available on iOS and Android. Free to download.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <AppStoreBadge />
              <GooglePlayBadge />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#f0eeea] bg-[#fafaf9]">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/">
            <Image src="/branding/logo.svg" alt="KurtApps" width={100} height={25} />
          </Link>
          <p className="text-xs text-[#bbb]">© 2026 KurtApps. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
