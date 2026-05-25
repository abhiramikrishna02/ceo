import Head from "next/head";

import SiteNavbar from "@/components/layout/site-navbar";

const userResponsibilities = [
  "Provide accurate information",
  "Maintain professional conduct",
  "Respect community guidelines and other members",
  "Avoid misuse of the platform, events, or services",
];

export default function TermsPage() {
  return (
    <>
      <Head>
        <title>Terms of Service — CEO Square</title>
      </Head>
      <SiteNavbar />
      <main className="min-h-screen bg-[#070706] pt-24 text-white">
        <section className="mx-auto w-full max-w-5xl px-6 py-10 sm:px-10 lg:px-12 lg:py-16">
          <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-8 lg:p-10">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#D4AF37]">
                CEO Square
              </p>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
                Terms of Service
              </h1>
              <p className="mt-5 text-base leading-8 text-white/70 sm:text-lg">
                By accessing or using CEO Square’s website, memberships, events, and services, you agree to comply with the following terms and conditions.
              </p>
            </div>

            <div className="mt-10 space-y-8 text-white/78">
              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-white">Membership & Access</h2>
                <p className="leading-8 text-white/70">
                  CEO Square memberships and services are intended for professional networking, leadership development, and business collaboration purposes only. We reserve the right to approve, suspend, or terminate memberships at our discretion.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-white">User Responsibilities</h2>
                <ul className="space-y-3 text-white/70">
                  {userResponsibilities.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4AF37]" />
                      <span className="leading-8">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-white">Payments & Refunds</h2>
                <p className="leading-8 text-white/70">
                  All membership fees, event registrations, and service payments must be completed as applicable. Payments are non-refundable.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-white">Intellectual Property</h2>
                <p className="leading-8 text-white/70">
                  All CEO Square branding, content, media, logos, and materials are the intellectual property of CEO Square and may not be copied, reproduced, or distributed without permission.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-white">Events & Media</h2>
                <p className="leading-8 text-white/70">
                  By participating in CEO Square events, podcasts, interviews, or media activities, you consent to the use of photos, videos, and recordings for promotional and branding purposes.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-white">Limitation of Liability</h2>
                <p className="leading-8 text-white/70">
                  CEO Square is not responsible for business decisions, partnerships, investments, or outcomes resulting from networking, mentorship, or collaborations within the community.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-white">Privacy</h2>
                <p className="leading-8 text-white/70">
                  Use of our services is also governed by our Privacy Policy.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-white">Changes to Terms</h2>
                <p className="leading-8 text-white/70">
                  CEO Square reserves the right to update or modify these Terms of Service at any time.
                </p>
              </section>

              <section className="space-y-3 border-t border-white/10 pt-8">
                <h2 className="text-lg font-semibold text-white">Contact Us</h2>
                <p className="leading-8 text-white/70">
                  For questions regarding these terms, contact:
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
