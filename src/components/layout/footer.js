"use client";

import Link from "next/link";

const exploreLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Benefits", href: "/benefits" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/ceo.square.official?igsh=ajF4cTM0eHFlenFv",
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@ceosquare-bangalore?si=oukFHFUySAm2OiYo",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/ceo-square/",
  },
  {
    label: "X",
    href: "https://x.com/ceosquare60011?s=21",
  },
  {
    label: "Threads",
    href: "https://www.threads.com/@ceo.square.official?invite=0",
  },
];

const policyLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

export default function Footer() {
  return (
    <footer className="relative isolate mt-16 overflow-hidden bg-[#050505] px-6 pt-14 text-[#f5f0e8] sm:px-10 sm:pt-16 lg:px-20 lg:pt-16">
      {/* High-end Ambient Background Lights */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[600px] w-full bg-[radial-gradient(50%_50%_at_50%_0%,rgba(201,168,76,0.06)_0%,transparent_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:radial-gradient(rgba(245,240,232,0.9)_1px,transparent_1px)] [background-size:24px_24px]" />
      
      {/* Subtle Gold Accent Line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/40 to-transparent" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col">
        <div className="grid grid-cols-1 gap-10 border-t border-white/5 pt-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16 lg:pt-12">
          <div className="flex flex-col gap-6">
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#f5f0e8]/30">
              Explore
            </h3>
            <nav className="flex flex-col gap-4">
              {exploreLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="group flex w-fit items-center text-[14px] leading-relaxed text-[#f5f0e8]/60 transition-all duration-300 ease-out hover:translate-x-1 hover:text-[#c9a84c] focus-visible:outline-none"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#f5f0e8]/30">
              Social
            </h3>
            <nav className="flex flex-col gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-fit items-center text-[14px] leading-relaxed text-[#f5f0e8]/60 transition-all duration-300 ease-out hover:translate-x-1 hover:text-[#c9a84c] focus-visible:outline-none"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#f5f0e8]/30">
              Contact
            </h3>
            <div className="flex flex-col gap-4 text-[14px] leading-relaxed text-[#f5f0e8]/60">
              <a
                href="mailto:ceosquareofficial@gmail.com"
                className="group flex w-fit transition-all duration-300 ease-out hover:translate-x-1 hover:text-[#c9a84c] focus-visible:outline-none"
              >
                ceosquareofficial@gmail.com
              </a>
              <a
                href="tel:+918660894623"
                className="group flex w-fit transition-all duration-300 ease-out hover:translate-x-1 hover:text-[#c9a84c] focus-visible:outline-none"
              >
                +91 86608 94623
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-4 pb-8 sm:flex-row sm:items-center lg:mt-16">
          <p className="text-[12px] text-[#f5f0e8]/40">
            &copy; {new Date().getFullYear()} CEO Square. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {policyLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[12px] text-[#f5f0e8]/40 transition-colors duration-300 hover:text-[#c9a84c] focus-visible:outline-none"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
