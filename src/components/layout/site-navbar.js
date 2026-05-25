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
    <nav className="fixed left-0 right-0 top-0 z-[1000] border-b border-[#c9a84c]/15 bg-[#0a0a0a]/72 backdrop-blur-[18px]">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-4 sm:px-10 lg:px-12">
        <Link
          href="/home"
          className="whitespace-nowrap text-lg font-semibold tracking-[0.06em] text-white no-underline"
        >
          CEO Studio
        </Link>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {NAV_ITEMS.map((item) => {
            const isActive = router.pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] transition-colors ${
                  isActive
                    ? "border-[#c9a84c]/14 bg-[#c9a84c] text-[#0a0a0a]"
                    : "border-[#c9a84c]/14 bg-white/[0.04] text-white hover:bg-white/[0.08]"
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
