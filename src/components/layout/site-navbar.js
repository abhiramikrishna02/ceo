"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";

const NAV_ITEMS = [
  { label: "Home", href: "/home" },
  { label: "About", href: "/about" },
  { label: "Benefits", href: "/benefits" },
  { label: "Contact", href: "/contact" },
];

export default function SiteNavbar() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [router.pathname]);

  return (
    <nav
      className="site-navbar-shell fixed left-0 right-0 top-0 z-[1000] px-3 pt-3 md:px-0 md:pt-0"
    >
      <div
        className="mx-auto w-full overflow-hidden border border-white/10 bg-[rgba(10,10,10,0.84)] backdrop-blur-[18px] md:border-0 md:bg-transparent md:backdrop-blur-0"
        style={{
          width: "min(100%, 1360px)",
          borderBottom: "1px solid rgba(201,168,76,0.15)",
        }}
      >
        <div className="site-navbar-inner hidden items-center justify-between px-6 py-4 md:flex">
          <Link
            href="/home"
            className="site-navbar-brand whitespace-nowrap text-lg font-semibold tracking-[0.06em] text-white no-underline"
          >
            CEO Square
          </Link>

          <div
            className="site-navbar-links flex flex-wrap items-center justify-center"
            style={{ gap: "10px" }}
          >
            {NAV_ITEMS.map((item) => {
              const isActive = router.pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="whitespace-nowrap rounded-full border text-xs font-semibold uppercase tracking-[0.08em] transition-colors"
                  style={{
                    padding: "9px 14px",
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

        <div className="site-navbar-mobile flex flex-col px-4 py-4 md:hidden">
          <div className="site-navbar-mobile-top flex items-center justify-between gap-3">
            <Link
              href="/home"
              className="site-navbar-mobile-brand whitespace-nowrap text-[18px] font-semibold tracking-[0.06em] text-white no-underline"
            >
              CEO Square
            </Link>
            <button
              type="button"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="site-navbar-mobile-panel"
              onClick={() => setMobileMenuOpen((current) => !current)}
              className="site-navbar-mobile-button inline-flex min-h-[40px] items-center gap-2 rounded-full border border-[#c9a84c]/20 bg-[#c9a84c]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#e7c76b] transition-colors hover:bg-[#c9a84c]/15"
            >
              <span>{mobileMenuOpen ? "Close" : "Menu"}</span>
              <span className="inline-flex h-3.5 w-3.5 flex-col items-end justify-center gap-1" aria-hidden="true">
                <span className={`block h-px rounded-full bg-current transition-all duration-200 ${mobileMenuOpen ? "w-3 -translate-y-0.5 rotate-45" : "w-3"}`} />
                <span className={`block h-px rounded-full bg-current transition-all duration-200 ${mobileMenuOpen ? "w-3 -translate-y-[2px] -rotate-45" : "w-4"}`} />
              </span>
            </button>
          </div>

          <AnimatePresence initial={false}>
            {mobileMenuOpen ? (
              <motion.div
                id="site-navbar-mobile-panel"
                className="site-navbar-mobile-grid mt-4 flex flex-col gap-2 border-t border-white/5 pt-4"
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                style={{ overflow: "hidden" }}
              >
                {NAV_ITEMS.map((item) => {
                  const isActive = router.pathname === item.href;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex min-h-11 w-full items-center justify-center rounded-full border text-xs font-semibold uppercase tracking-[0.08em] transition-colors"
                      style={{
                        padding: "10px 12px",
                        borderColor: "rgba(201,168,76,0.14)",
                        background: isActive ? "#c9a84c" : "rgba(255,255,255,0.04)",
                        color: isActive ? "#0a0a0a" : "#ffffff",
                      }}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}
