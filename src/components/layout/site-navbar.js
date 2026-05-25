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
    <nav
      className="fixed left-0 right-0 top-0 z-[1000]"
      style={{
        borderBottom: "1px solid rgba(201,168,76,0.15)",
        background: "rgba(10,10,10,0.72)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
      }}
    >
      <div
        className="flex items-center justify-between"
        style={{
          width: "min(100%, 1360px)",
          margin: "0 auto",
          padding: "16px 24px",
          gap: "24px",
        }}
      >
        <Link
          href="/home"
          className="whitespace-nowrap text-lg font-semibold tracking-[0.06em] text-white no-underline"
        >
          CEO Studio
        </Link>

        <div
          className="flex flex-wrap items-center justify-center"
          style={{ gap: "12px" }}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = router.pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className="whitespace-nowrap rounded-full border text-xs font-semibold uppercase tracking-[0.08em] transition-colors"
                style={{
                  padding: "10px 16px",
                  borderColor: "rgba(201,168,76,0.14)",
                  background: isActive ? "#c9a84c" : "rgba(255,255,255,0.04)",
                  color: isActive ? "#0a0a0a" : "#ffffff",
                }}
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
