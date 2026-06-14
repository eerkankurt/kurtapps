import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Terms of Use — Dhikr Counter & Tracker",
  description: "Terms of Use for Dhikr Counter & Tracker by KurtApps.",
};

const sections = [
  {
    title: "Acceptance of Terms",
    content:
      "By downloading or using Dhikr Counter & Tracker, you agree to these Terms of Use. If you do not agree, please do not use the app.",
  },
  {
    title: "Personal Use",
    content:
      "Dhikr Counter & Tracker is provided for personal and non-commercial use only.",
  },
  {
    title: "Features",
    content:
      "The app provides dhikr counting, progress tracking, reminders, Qibla direction tools, and Asmaul Husna content.",
  },
  {
    title: "No Warranty",
    content:
      "The app is provided on an \"as is\" basis without warranties of any kind, express or implied.",
  },
  {
    title: "Limitation of Liability",
    content:
      "The developer shall not be liable for any damages arising from the use or inability to use the app.",
  },
  {
    title: "Intellectual Property",
    content:
      "The app, its design, logo, and software are protected by intellectual property laws. They may not be copied, modified, or redistributed without explicit permission.",
  },
  {
    title: "Changes to Terms",
    content:
      "These Terms may be updated from time to time. Continued use of the app after changes constitutes acceptance of the revised Terms.",
  },
  {
    title: "Contact",
    content:
      "Website: kurtapps.com — Email: support@kurtapps.com. Dhikr Counter & Tracker is developed and maintained by Erkan Kurt. KurtApps is the software brand and website used for development and support.",
  },
];

export default function DhikrTermsPage() {
  return (
    <div className="bg-[#fafaf9] text-[#111] min-h-screen">

      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#fafaf9]/90 backdrop-blur-xl border-b border-black/[0.07]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <Image src="/branding/logo.svg" alt="KurtApps" width={120} height={30} priority />
          </Link>
          <Link href="/apps/daily-dhikr" className="text-sm text-[#555] hover:text-[#111] transition-colors duration-200">← Dhikr Counter</Link>
        </div>
      </nav>

      <main className="px-6 pt-36 pb-32">
        <div className="max-w-2xl mx-auto">

          <div className="mb-14">
            <div className="inline-flex items-center gap-2 bg-white border border-black/[0.08] rounded-full px-4 py-1.5 mb-8 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "#52BF1B" }} />
              <span className="text-xs text-[#888] tracking-wide font-medium">Dhikr Counter & Tracker</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#111] leading-[1.1] mb-5">
              Terms of Use
            </h1>
            <p className="text-sm text-[#aaa]">Last updated: June 2026</p>
          </div>

          <div className="flex flex-col gap-10">
            {sections.map((s, i) => (
              <div key={s.title}>
                {i > 0 && <div className="border-t border-[#f0eeea] mb-10" />}
                <h2 className="text-base font-semibold text-[#111] mb-3">{s.title}</h2>
                <p className="text-sm text-[#666] leading-relaxed">{s.content}</p>
              </div>
            ))}
          </div>

        </div>
      </main>

    </div>
  );
}
