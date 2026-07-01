import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Privacy Policy — Notes",
  description: "Privacy Policy for the Notes app by Erkan Kurt.",
};

const sections: { title: string; content: string; items?: string[] }[] = [
  {
    title: "Introduction",
    content:
      "Thank you for using Notes. This application is developed by Erkan Kurt.\n\nYour privacy is important to us. This Privacy Policy explains what information the App uses, how it is handled, and how your data is protected.",
  },
  {
    title: "Information We Collect",
    content: "",
  },
  {
    title: "Your Notes",
    content:
      "All notes you create are stored locally on your device.\n\nYour notes are never uploaded, stored, or synchronized on any server operated by us.\n\nWe do not have access to your notes.",
  },
  {
    title: "Voice Notes",
    content:
      "The App allows you to create notes using speech recognition.\n\nWhen you use voice input:",
    items: [
      "Your voice is used only to convert speech into text.",
      "The App does not record or store audio files.",
      "Your voice recordings are never collected or stored by us.",
    ],
  },
  {
    title: "Speech Recognition",
    content:
      "Speech recognition is powered by Apple's Speech Framework. Depending on your device, selected language, and system capabilities, speech may be processed either on your device or through Apple's secure services.\n\nFor more information, please refer to Apple's Privacy Policy.",
  },
  {
    title: "App Preferences",
    content: "The App stores the following preferences locally on your device:",
    items: [
      "Selected language",
      "Appearance preference (Light, Dark, or System)",
      "Preferred note creation method",
    ],
  },
  {
    title: "Advertising",
    content:
      "The free version of the App may display banner advertisements provided by Google AdMob.\n\nAdvertising providers may collect certain device information according to their own privacy policies.\n\nBanner advertisements are removed when you upgrade to Premium.",
  },
  {
    title: "In-App Purchases",
    content:
      "Premium purchases are securely processed through Apple's App Store using StoreKit.\n\nWe do not collect or store your payment information.\n\nAll payments, subscriptions, and purchase management are handled by Apple.",
  },
  {
    title: "Third-Party Services",
    content: "The App may use the following third-party services:",
    items: [
      "Apple Speech Framework",
      "Apple StoreKit",
      "Google AdMob (Free version only)",
    ],
  },
  {
    title: "Data Security",
    content:
      "Your notes remain on your device. Therefore, you are responsible for keeping your device secure.\n\nWe recommend using security features such as Face ID, Touch ID, or a device passcode.",
  },
  {
    title: "Changes to This Privacy Policy",
    content:
      "This Privacy Policy may be updated from time to time.\n\nThe latest version will always be available at:\nhttps://kurtapps.com/apps/notes/privacy",
  },
  {
    title: "Contact",
    content:
      "If you have any questions regarding this Privacy Policy, please contact:\n\nErkan Kurt\nEmail: support@kurtapps.com\nWebsite: https://kurtapps.com",
  },
];

export default function NotesPrivacyPage() {
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
              Privacy Policy
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
