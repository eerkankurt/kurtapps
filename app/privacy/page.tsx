import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Privacy Policy — KurtApps",
  description: "Privacy Policy for KurtApps and its mobile applications.",
};

const sections: { title: string; content: string; items?: string[] }[] = [
  {
    title: "Introduction",
    content:
      'KurtApps ("we", "our", or "us") operates kurtapps.com and develops mobile applications and digital products. This Privacy Policy explains how we collect, use, and protect information when you use our website, applications, and related services.\n\nBy using our website, applications, or services, you agree to the practices described in this Privacy Policy.',
  },
  {
    title: "Information We Collect",
    content: "We may collect information necessary to provide and improve our products and services. This may include:",
    items: [
      "Information generated through your use of our applications and services",
      "Device and technical information",
      "Usage and performance analytics",
      "Preferences and settings you choose to save",
    ],
  },
  {
    title: "How We Use Information",
    content: "We use collected information to:",
    items: [
      "Provide and maintain our products and services",
      "Improve functionality and user experience",
      "Diagnose and resolve technical issues",
      "Monitor performance and reliability",
      "Develop new features and improvements",
    ],
  },
  {
    title: "Data Storage",
    content:
      "Information may be stored locally on your device, on secure third-party infrastructure, or through services required for the operation of our products.\n\nThe specific information stored depends on the features you choose to use.",
  },
  {
    title: "Third-Party Services",
    content: "Our website and applications may use third-party services, including but not limited to:",
    items: [
      "App distribution platforms",
      "Analytics providers",
      "Cloud infrastructure providers",
      "Payment and subscription platforms",
    ],
  },
  {
    title: "Data Security",
    content:
      "We take reasonable technical and organizational measures to protect information from unauthorized access, disclosure, alteration, or destruction.\n\nWhile we strive to protect your information, no method of electronic transmission or storage can be guaranteed to be completely secure.",
  },
  {
    title: "Children's Privacy",
    content:
      "Our products and services are not directed to children under the age of 13.\n\nWe do not knowingly collect personal information from children. If you believe that a child has provided personal information, please contact us so appropriate action can be taken.",
  },
  {
    title: "Changes to This Policy",
    content:
      "We may update this Privacy Policy from time to time. Any changes will be posted on this page.\n\nContinued use of our products and services after changes become effective constitutes acceptance of the updated policy.",
  },
  {
    title: "Contact",
    content: "If you have questions about this Privacy Policy, please contact:\n\nsupport@kurtapps.com",
  },
];

export default function PrivacyPage() {
  return (
    <div className="bg-[#fafaf9] text-[#111] min-h-screen">

      {/* Minimal top nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#fafaf9]/90 backdrop-blur-xl border-b border-black/[0.07]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <Image src="/branding/logo.svg" alt="KurtApps" width={120} height={30} priority />
          </Link>
          <Link href="/" className="text-sm text-[#555] hover:text-[#111] transition-colors duration-200">← Home</Link>
        </div>
      </nav>

      <main className="px-6 pt-36 pb-32">
        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <div className="mb-14">
            <div className="inline-flex items-center gap-2 bg-white border border-black/[0.08] rounded-full px-4 py-1.5 mb-8 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6366f1] inline-block" />
              <span className="text-xs text-[#888] tracking-wide font-medium">Legal</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#111] leading-[1.1] mb-5">
              Privacy Policy
            </h1>
            <p className="text-sm text-[#aaa]">Last updated: May 2026</p>
          </div>

          {/* Sections */}
          <div className="flex flex-col gap-10">
            {sections.map((s, i) => (
              <div key={s.title}>
                {i > 0 && <div className="border-t border-[#f0eeea] mb-10" />}
                <h2 className="text-base font-semibold text-[#111] mb-3">{s.title}</h2>
                <div className="flex flex-col gap-3">
                  {s.content.split("\n\n").map((para, j) => (
                    <p key={j} className="text-sm text-[#666] leading-relaxed">{para}</p>
                  ))}
                  {s.items && (
                    <ul className="flex flex-col gap-1.5 pl-1">
                      {s.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-[#666] leading-relaxed">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-[#ccc] shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>

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
