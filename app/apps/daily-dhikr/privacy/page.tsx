import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Privacy Policy — Dhikr Counter & Tracker",
  description: "Privacy Policy for Dhikr Counter & Tracker by KurtApps.",
};

const sections = [
  {
    title: "Information Collection",
    content:
      "Dhikr Counter & Tracker does not require account creation and does not collect, store, sell, or share personal information.",
  },
  {
    title: "Location Access",
    content:
      "Location access is used solely to calculate the direction of the Kaaba. It is not transmitted, stored, or shared.",
  },
  {
    title: "Notifications",
    content:
      "The app uses local notifications only. All notification schedules remain on your device and are never sent to external servers.",
  },
  {
    title: "Data Storage",
    content:
      "Dhikr counts, lists, reminders, and settings are stored locally on your device. No data is uploaded to external servers.",
  },
  {
    title: "Third-Party Services",
    content:
      "The app may use Apple services such as the App Store, TestFlight, and In-App Purchases. These services are governed by Apple's own privacy policies, which are independent of KurtApps.",
  },
  {
    title: "Changes to This Policy",
    content:
      "This policy may be updated from time to time. Continued use of the app constitutes acceptance of any changes.",
  },
  {
    title: "Contact",
    content:
      "Website: kurtapps.com — Email: support@kurtapps.com. Dhikr Counter & Tracker is developed and maintained by Erkan Kurt. KurtApps is the software brand and website used for development and support.",
  },
];

export default function DhikrPrivacyPage() {
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
              Privacy Policy
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
