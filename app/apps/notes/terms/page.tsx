import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Terms of Use — Notes",
  description: "Terms of Use for the Notes app by Erkan Kurt.",
};

const sections: { title: string; content: string; items?: string[] }[] = [
  {
    title: "Introduction",
    content:
      "Welcome to Notes. This application is developed by Erkan Kurt.\n\nBy downloading or using the App, you agree to these Terms of Use.",
  },
  {
    title: "Using the App",
    content:
      "You may use the App for personal, non-commercial purposes in accordance with these Terms.\n\nYou are responsible for any content you create, store, or export using the App.\n\nPlease use the App in compliance with all applicable laws and regulations.",
  },
  {
    title: "Your Notes",
    content:
      "All notes are stored locally on your device.\n\nYou are responsible for managing, backing up, and protecting your own data.\n\nBecause the App does not store your notes on external servers, deleted or lost data generally cannot be recovered.",
  },
  {
    title: "Premium Features",
    content:
      "The App offers optional Premium features through Apple's In-App Purchase system.\n\nPremium currently removes banner advertisements and may include additional features in future updates.",
  },
  {
    title: "Purchases and Subscriptions",
    content: "Premium purchases are securely processed through Apple's App Store.\n\nIf you purchase a yearly subscription:",
    items: [
      "Payment will be charged to your Apple Account.",
      "Your subscription will automatically renew unless it is cancelled at least 24 hours before the end of the current billing period.",
      "You can manage or cancel your subscription at any time through your Apple Account settings.",
    ],
  },
  {
    title: "Purchase Types",
    content:
      "Lifetime purchases are one-time purchases and do not renew.\n\nPrices may vary depending on your country or region.",
  },
  {
    title: "Intellectual Property",
    content:
      "The App, including its design, interface, graphics, trademarks, and software, is owned by Erkan Kurt and is protected by applicable intellectual property laws.\n\nYou may not copy, modify, distribute, reverse engineer, or otherwise use any part of the App except as permitted by applicable law.",
  },
  {
    title: "Disclaimer",
    content:
      'The App is provided "as is" without warranties of any kind.\n\nWhile we strive to provide a reliable experience, we cannot guarantee that the App will always operate without interruption, errors, or meet every expectation.',
  },
  {
    title: "Limitation of Liability",
    content:
      "To the fullest extent permitted by applicable law, Erkan Kurt shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use or inability to use the App, including the loss of notes or other data.",
  },
  {
    title: "Changes to These Terms",
    content:
      "These Terms of Use may be updated from time to time.\n\nThe latest version will always be available at:\nhttps://kurtapps.com/apps/notes/terms",
  },
  {
    title: "Contact",
    content:
      "If you have any questions regarding these Terms of Use, please contact:\n\nErkan Kurt\nEmail: support@kurtapps.com\nWebsite: https://kurtapps.com",
  },
];

export default function NotesTermsPage() {
  return (
    <div className="bg-[#fafaf9] text-[#111] min-h-screen">

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

          <div className="mb-14">
            <div className="inline-flex items-center gap-2 bg-white border border-black/[0.08] rounded-full px-4 py-1.5 mb-8 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6366f1] inline-block" />
              <span className="text-xs text-[#888] tracking-wide font-medium">Legal</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#111] leading-[1.1] mb-5">
              Terms of Use
            </h1>
            <p className="text-sm text-[#aaa]">Last updated: July 2026</p>
          </div>

          <div className="flex flex-col gap-10">
            {sections.map((s, i) => (
              <div key={i}>
                {i > 0 && <div className="border-t border-[#f0eeea] mb-10" />}
                {s.title && (
                  <h2 className="text-base font-semibold text-[#111] mb-3">{s.title}</h2>
                )}
                <div className="flex flex-col gap-3">
                  {s.content && s.content.split("\n\n").map((para, j) => (
                    <p key={j} className="text-sm text-[#666] leading-relaxed whitespace-pre-line">{para}</p>
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
