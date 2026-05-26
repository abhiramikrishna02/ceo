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
    <footer className="relative isolate mt-16 overflow-hidden bg-[#050505] px-4 pt-14 text-[#f5f0e8] sm:px-6 sm:pt-20 md:px-8 lg:px-20 lg:pt-20">
      {/* High-end Ambient Background Lights */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[600px] w-full bg-[radial-gradient(50%_50%_at_50%_0%,rgba(201,168,76,0.08)_0%,transparent_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:radial-gradient(rgba(245,240,232,0.9)_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Subtle Gold Accent Line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/55 to-transparent" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col">
        <div className="grid grid-cols-1 gap-10 border-t border-white/5 pt-10 sm:grid-cols-2 sm:gap-12 md:gap-14 lg:grid-cols-3 lg:gap-24 lg:pt-14 lg:justify-items-center">
          <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left lg:items-center lg:text-center">
            <h3 className="font-serif text-[14px] font-semibold uppercase tracking-[0.35em] text-[#e0be62] sm:text-[15px] md:text-[16px]">
              Explore
            </h3>
            <nav className="flex w-full flex-col items-center gap-3 sm:w-auto sm:items-start sm:gap-4">
              {exploreLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="group flex w-full items-center justify-center text-[15px] leading-relaxed text-[#f5f0e8]/74 transition-all duration-300 ease-out hover:translate-x-1 hover:text-[#f3dfae] focus-visible:outline-none sm:w-fit sm:justify-start sm:text-[16px] md:text-[17px] lg:text-[18px]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left lg:items-center lg:text-center">
            <h3 className="font-serif text-[14px] font-semibold uppercase tracking-[0.35em] text-[#e0be62] sm:text-[15px] md:text-[16px]">
              Social
            </h3>
            <nav className="flex w-full flex-col items-center gap-3 sm:w-auto sm:items-start sm:gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-full items-center justify-center text-[15px] leading-relaxed text-[#f5f0e8]/74 transition-all duration-300 ease-out hover:translate-x-1 hover:text-[#f3dfae] focus-visible:outline-none sm:w-fit sm:justify-start sm:text-[16px] md:text-[17px] lg:text-[18px]"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left lg:items-center lg:text-center">
            <h3 className="font-serif text-[14px] font-semibold uppercase tracking-[0.35em] text-[#e0be62] sm:text-[15px] md:text-[16px]">
              Contact
            </h3>
            <div className="flex w-full flex-col items-center gap-3 text-[15px] leading-relaxed text-[#f5f0e8]/74 sm:items-start sm:text-left sm:text-[16px] md:text-[17px] lg:text-[18px]">
              <a
                href="mailto:ceosquareofficial@gmail.com"
                className="group flex w-full max-w-full justify-center break-words text-center transition-all duration-300 ease-out hover:translate-x-1 hover:text-[#f3dfae] focus-visible:outline-none sm:w-fit sm:justify-start sm:text-left"
              >
                ceosquareofficial@gmail.com
              </a>
              <a
                href="tel:+918660894623"
                className="group flex w-full max-w-full justify-center transition-all duration-300 ease-out hover:translate-x-1 hover:text-[#f3dfae] focus-visible:outline-none sm:w-fit sm:justify-start"
              >
                +91 86608 94623
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 pb-8 text-center sm:mt-14 sm:flex-row sm:items-center sm:text-left lg:mt-16">
          <p className="text-[11px] leading-relaxed text-[#f5f0e8]/45 sm:text-[12px]">
            &copy; {new Date().getFullYear()} CEO Square. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 sm:justify-end">
            {policyLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[11px] text-[#f5f0e8]/45 transition-colors duration-300 hover:text-[#f3dfae] focus-visible:outline-none sm:text-[12px]"
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
