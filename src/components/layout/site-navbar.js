"use client";

import Link from "next/link";
import { useRouter } from "next/router";

const NAV_ITEMS = [
  { label: "Home", href: "/home" },
  { label: "About", href: "/about" },
  { label: "Benefits", href: "/benefits" },
  { label: "Contact", href: "/contact" },
];

export default function SiteNavbar() {
  const router = useRouter();

  return (
    <nav className="fixed left-0 right-0 top-0 z-[1000] border-b border-white/10 bg-[#0a0a0a]/72 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-6 py-4 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-12">
        <Link
          href="/home"
          className="text-lg font-semibold tracking-[0.06em] text-white no-underline whitespace-nowrap"
        >
          CEO Studio
        </Link>

        <div className="flex flex-wrap items-center justify-start gap-2 lg:justify-center">
          {NAV_ITEMS.map((item) => {
            const isActive = router.pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] transition-colors whitespace-nowrap ${
                  isActive
                    ? "border-[#c9a84c]/35 bg-[#c9a84c] text-[#0a0a0a]"
                    : "border-[#c9a84c]/12 bg-white/5 text-white hover:bg-white/10"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
