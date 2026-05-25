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
          <Link href="/" className="text-sm text-[#888] hover:text-[#111] transition-colors duration-200">← Home</Link>
          <Link href="/#walkrun" className="text-sm text-[#888] hover:text-[#111] transition-colors duration-200">Apps</Link>
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
          <Link href="/" className="text-sm text-[#888]" onClick={() => setOpen(false)}>← Home</Link>
          <Link href="/#walkrun" className="text-sm text-[#888]" onClick={() => setOpen(false)}>Apps</Link>
        </div>
      )}
    </nav>
  );
}

type FormState = {
  app: string;
  name: string;
  email: string;
  message: string;
};

export default function SupportPage() {
  const [form, setForm] = useState<FormState>({ app: "", name: "", email: "", message: "" });
  const [appError, setAppError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm(f => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.app) { setAppError(true); return; }
    setAppError(false);
    setSubmitted(true);
  };

  const inputClass =
    "w-full bg-white border border-[#e8e7e3] rounded-2xl px-5 py-3.5 text-sm text-[#111] placeholder:text-[#c0bfbb] focus:outline-none focus:border-black/30 transition-colors duration-200";
  const labelClass = "block text-xs uppercase tracking-widest text-[#aaa] font-medium mb-2.5";

  return (
    <div className="bg-[#fafaf9] text-[#111] min-h-screen">
      <Navbar />

      <main className="px-6 pt-36 pb-32">
        <div className="max-w-xl mx-auto">

          {/* Intro */}
          <div className="mb-14">
            <div className="inline-flex items-center gap-2 bg-white border border-black/[0.08] rounded-full px-4 py-1.5 mb-8 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6366f1] inline-block" />
              <span className="text-xs text-[#888] tracking-wide font-medium">Support</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#111] leading-[1.1] mb-5">
              We&apos;re here<br />to help.
            </h1>
            <p className="text-sm text-[#888] leading-relaxed max-w-sm">
              Select your app, describe the issue, and we&apos;ll get back to you within 24 hours.
            </p>
          </div>

          {/* Success */}
          {submitted ? (
            <div className="bg-white border border-[#f0eeea] rounded-3xl px-8 py-12 text-center">
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
                <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-[#111] mb-2">Message received.</h2>
              <p className="text-sm text-[#888] leading-relaxed max-w-xs mx-auto">
                Thanks — your message is ready to be connected to support email.
              </p>
              <button
                onClick={() => { setSubmitted(false); setForm({ app: "", name: "", email: "", message: "" }); }}
                className="mt-8 text-sm text-[#888] hover:text-[#111] transition-colors duration-200 underline underline-offset-4"
              >
                Send another message
              </button>
            </div>
          ) : (
            /* Form */
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-7">

              {/* App selection */}
              <div>
                <span className={labelClass}>App</span>
                <div className="flex gap-3">
                  {["WalkRun", "Daily Dhikr"].map(app => (
                    <button
                      key={app}
                      type="button"
                      onClick={() => { setForm(f => ({ ...f, app })); setAppError(false); }}
                      className={`flex-1 py-3 rounded-2xl text-sm font-medium border transition-all duration-200 ${
                        form.app === app
                          ? "bg-[#111] text-white border-[#111]"
                          : "bg-white text-[#888] border-[#e8e7e3] hover:border-black/20 hover:text-[#555]"
                      }`}
                    >
                      {app}
                    </button>
                  ))}
                </div>
                {appError && (
                  <p className="mt-2 text-xs text-red-500">Please select an app.</p>
                )}
              </div>

              {/* Name */}
              <div>
                <label htmlFor="name" className={labelClass}>Full Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={set("name")}
                  required
                  className={inputClass}
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className={labelClass}>Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={set("email")}
                  required
                  className={inputClass}
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className={labelClass}>Message</label>
                <textarea
                  id="message"
                  placeholder="Describe your issue or question..."
                  value={form.message}
                  onChange={set("message")}
                  required
                  rows={5}
                  className={`${inputClass} resize-none leading-relaxed`}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-[#111] text-white text-sm font-medium py-4 rounded-2xl hover:bg-[#2a2a2a] hover:-translate-y-px hover:shadow-[0_4px_16px_rgba(0,0,0,0.14)] active:scale-[0.98] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
              >
                Send Message
              </button>

            </form>
          )}
        </div>
      </main>

      <footer className="border-t border-[#f0eeea] bg-white">
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
