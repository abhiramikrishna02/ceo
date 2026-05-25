"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { DottedSurface } from "@/components/ui/dotted-surface";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Benefits", href: "/benefits" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="relative isolate mt-16 min-h-[520px] overflow-hidden border-t border-white/10 bg-black px-6 py-14 sm:px-10 sm:py-16">
      <DottedSurface
        className="opacity-90"
        style={{
          inset: "-15% -10% -20% -10%",
          transform: "scale(1.16)",
          transformOrigin: "center",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.22)_0%,rgba(201,168,76,0.1)_24%,transparent_64%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.22)_30%,rgba(0,0,0,0.78)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/45 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/95 to-transparent" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-between gap-10">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div className="max-w-2xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.45em] text-[#c9a84c]/75">CEO Studio</p>
            <h2 className="mt-4 font-serif text-3xl font-normal leading-tight text-[#f5f0e8] sm:text-4xl">
              A cleaner ending for a serious home.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[#f5f0e8]/58 sm:text-base">
              Calm, premium, and easier to navigate. The footer stays present without competing with the page.
            </p>
          </div>

          <div className="flex flex-col gap-5 lg:items-end">
            <nav className="flex flex-wrap justify-start gap-x-6 gap-y-3 lg:justify-end">
              {footerLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-[#f5f0e8]/72 transition-colors hover:text-[#f5f0e8]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#c9a84c]/22 bg-[#c9a84c]/12 px-5 py-3 text-sm font-medium text-[#f5f0e8] transition-all hover:border-[#c9a84c]/45 hover:bg-[#c9a84c]/18"
            >
              Book a conversation
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="grid gap-4 border-t border-white/10 pt-5 text-xs text-[#f5f0e8]/35 sm:grid-cols-[1fr_auto] sm:items-center">
          <p>© 2026 CEO Studio</p>
          <p className="sm:text-right">Designed for leaders who prefer clarity over clutter.</p>
        </div>
      </div>
    </footer>
  );
}
