import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Terms of Use — KurtApps",
  description: "Terms of Use for KurtApps and its mobile applications.",
};

const sections: { title: string; content: string; items?: string[] }[] = [
  {
    title: "Acceptance of Terms",
    content:
      'By accessing or using kurtapps.com, our mobile applications, or any related services provided by KurtApps ("we", "our", or "us"), you agree to be bound by these Terms of Use.\n\nIf you do not agree with these terms, please do not use our website, applications, or services.',
  },
  {
    title: "Use of Our Services",
    content: "You may use our website and applications only for lawful purposes and in accordance with these Terms.\n\nYou agree not to:",
    items: [
      "Violate any applicable laws or regulations",
      "Interfere with the operation or security of our services",
      "Attempt to gain unauthorized access to our systems",
      "Copy, distribute, modify, or reverse engineer any part of our products except where permitted by law",
      "Use our services in a manner that could harm other users or our business",
    ],
  },
  {
    title: "Intellectual Property",
    content:
      "All content, software, designs, logos, trademarks, graphics, and other materials provided by KurtApps are owned by or licensed to KurtApps and are protected by applicable intellectual property laws.\n\nYou may not reproduce, distribute, or create derivative works without our prior written permission.",
  },
  {
    title: "Availability of Services",
    content:
      "We strive to provide reliable services, but we do not guarantee that our website or applications will always be available, uninterrupted, secure, or error-free.\n\nWe reserve the right to modify, suspend, or discontinue any service, feature, or functionality at any time without prior notice.",
  },
  {
    title: "User Data",
    content:
      "Your use of our services may involve the storage and processing of certain information. Our handling of such information is described in our Privacy Policy.",
  },
  {
    title: "Third-Party Services",
    content:
      "Our products and services may integrate with or rely on third-party platforms and providers.\n\nWe are not responsible for the availability, content, policies, or practices of third-party services.",
  },
  {
    title: "Disclaimer",
    content:
      'Our website, applications, and services are provided on an "as is" and "as available" basis.\n\nTo the fullest extent permitted by law, KurtApps makes no warranties, express or implied, regarding the operation, availability, accuracy, reliability, or suitability of its services.',
  },
  {
    title: "Limitation of Liability",
    content:
      "To the maximum extent permitted by applicable law, KurtApps shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from or related to your use of our website, applications, or services.",
  },
  {
    title: "Termination",
    content:
      "We reserve the right to suspend or terminate access to our services at any time if we believe these Terms have been violated or if required for operational, security, or legal reasons.",
  },
  {
    title: "Changes to These Terms",
    content:
      "We may update these Terms of Use from time to time. Updated versions will be posted on this page.\n\nYour continued use of our services after changes become effective constitutes acceptance of the revised Terms.",
  },
  {
    title: "Contact",
    content: "If you have any questions regarding these Terms of Use, please contact:\n\nsupport@kurtapps.com",
  },
];

export default function TermsPage() {
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
              Terms of Use
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
