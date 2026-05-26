import Head from "next/head";


const informationWeCollect = [
  "Name, email address, phone number, and company details",
  "Membership and event participation information",
  "Payment and billing details",
  "Website usage data through cookies and analytics",
];

const howWeUse = [
  "Provide access to CEO Square services and events",
  "Improve user experience and community engagement",
  "Send updates, newsletters, and promotional content",
  "Process memberships and payments",
  "Maintain platform security and performance",
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <Head>
        <title>Privacy Policy — CEO Square</title>
      </Head>
      <main className="min-h-screen bg-[#070706] pt-24 text-white">
        <section className="mx-auto w-full max-w-5xl px-6 py-10 sm:px-10 lg:px-12 lg:py-16">
          <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-8 lg:p-10">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#D4AF37]">
                CEO Square
              </p>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
                Privacy Policy
              </h1>
              <p className="mt-5 text-base leading-8 text-white/70 sm:text-lg">
                At CEO Square, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our website, memberships, events, and services.
              </p>
            </div>

            <div className="mt-10 space-y-8 text-white/78">
              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-white">Information We Collect</h2>
                <ul className="space-y-3 text-white/70">
                  {informationWeCollect.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4AF37]" />
                      <span className="leading-8">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-white">How We Use Your Information</h2>
                <ul className="space-y-3 text-white/70">
                  {howWeUse.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4AF37]" />
                      <span className="leading-8">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-white">Data Protection</h2>
                <p className="leading-8 text-white/70">
                  We implement appropriate security measures to protect your personal information. CEO Square does not sell or share your data with unauthorized third parties.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-white">Cookies</h2>
                <p className="leading-8 text-white/70">
                  Our website may use cookies and analytics tools to improve functionality and user experience.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-white">Your Rights</h2>
                <p className="leading-8 text-white/70">
                  You may request access, correction, or deletion of your personal information at any time.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-white">Policy Updates</h2>
                <p className="leading-8 text-white/70">
                  CEO Square may update this Privacy Policy periodically. Changes will be reflected on this page.
                </p>
              </section>

              <section className="space-y-3 border-t border-white/10 pt-8">
                <h2 className="text-lg font-semibold text-white">Contact Us</h2>
                <p className="leading-8 text-white/70">
                  For any privacy-related questions, contact us at:
                </p>
                <div className="space-y-1 text-white/70">
                  <p>CEO Square</p>
                  <p>Email: info@ceosquare.com</p>
                  <p>Website: www.ceosquare.com</p>
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
