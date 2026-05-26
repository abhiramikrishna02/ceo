"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";

const NAV_ITEMS = [
  { label: "Home", href: "/home" },
  { label: "About", href: "/about" },
  { label: "Benefits", href: "/benefits" },
  { label: "Contact", href: "/contact" },
];

function normalizePath(pathname = "") {
  if (!pathname) return "/";
  const trimmed = pathname.split("?")[0].split("#")[0].replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

function isActiveLink(pathname, href) {
  const currentPath = normalizePath(pathname);
  if (href === "/home") {
    return currentPath === "/" || currentPath === "/home";
  }
  return currentPath === href;
}

function NavButton({ href, label, active, onClick = undefined, mobile = false }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={[
        "whitespace-nowrap rounded-full border transition-all duration-300",
        mobile ? "flex min-h-11 w-full items-center justify-center" : "",
      ].join(" ")}
      style={{
        fontFamily: '"Poppins", sans-serif',
        fontSize: mobile ? "12px" : "14px",
        fontWeight: 700,
        letterSpacing: "0.08em",
        lineHeight: 1,
        textTransform: "uppercase",
        padding: mobile ? "12px 16px" : "12px 20px",
        borderColor: "rgba(201,168,76,0.14)",
        background: active ? "#c9a84c" : "rgba(255,255,255,0.04)",
        color: active ? "#0a0a0a" : "#ffffff",
      }}
    >
      {label}
    </Link>
  );
}

export default function SiteNavbar() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollYRef = useRef(0);
  const tickingRef = useRef(false);

  useEffect(() => {
    const handleRouteChange = () => {
      setMobileMenuOpen(false);
      setIsHidden(false);
    };
    router.events.on("routeChangeStart", handleRouteChange);
    return () => router.events.off("routeChangeStart", handleRouteChange);
  }, [router.events]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    lastScrollYRef.current = window.scrollY || 0;

    const updateVisibility = () => {
      const currentScrollY = window.scrollY || 0;
      const previousScrollY = lastScrollYRef.current;
      const delta = currentScrollY - previousScrollY;

      if (currentScrollY <= 24) {
        setIsHidden(false);
      } else if (!mobileMenuOpen && delta > 8) {
        setIsHidden(true);
      } else if (delta < -8) {
        setIsHidden(false);
      }

      lastScrollYRef.current = currentScrollY;
      tickingRef.current = false;
    };

    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      window.requestAnimationFrame(updateVisibility);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mobileMenuOpen]);

  const currentPath = normalizePath(router.asPath || router.pathname);
  const shouldHideNavbar = isHidden && !mobileMenuOpen;

  return (
    <motion.nav
      className="site-navbar-shell"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        padding: "16px 24px 0",
        willChange: "transform, opacity",
      }}
      animate={{
        y: shouldHideNavbar ? -120 : 0,
        opacity: shouldHideNavbar ? 0 : 1,
      }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="w-full overflow-hidden bg-[#080808] backdrop-blur-[18px]"
        style={{
          width: "min(100%, 1600px)",
          margin: "0 auto",
          borderBottom: "1px solid rgba(201,168,76,0.15)",
        }}
      >
        <div
          className="hidden items-center justify-between md:flex"
          style={{
            padding: "16px 32px",
            minHeight: 72,
          }}
        >
          <Link
            href="/home"
            aria-label="CEO Square"
            className="inline-flex items-center whitespace-nowrap no-underline"
            style={{
              fontFamily: '"Poppins", sans-serif',
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: "0.06em",
              color: "#ffffff",
            }}
            >
            <Image
              src="/CEO Square Logo BY IQUE.png"
              alt="CEO Square logo"
              width={96}
              height={32}
              priority
              className="block h-auto w-auto object-contain"
            />
          </Link>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {NAV_ITEMS.map((item) => (
              <NavButton
                key={item.label}
                href={item.href}
                label={item.label}
                active={isActiveLink(currentPath, item.href)}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col md:hidden" style={{ padding: "14px 16px 16px" }}>
          <div className="flex items-center justify-between gap-3">
            <Link
              href="/home"
              aria-label="CEO Square"
              className="inline-flex items-center whitespace-nowrap no-underline"
              style={{
                fontFamily: '"Poppins", sans-serif',
                fontSize: 18,
                fontWeight: 600,
                letterSpacing: "0.06em",
                color: "#ffffff",
              }}
              >
              <Image
                src="/CEO Square Logo BY IQUE.png"
                alt="CEO Square logo"
                width={84}
                height={28}
                priority
                className="block h-auto w-auto object-contain"
              />
            </Link>

            <button
              type="button"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="site-navbar-mobile-panel"
              onClick={() => setMobileMenuOpen((current) => !current)}
              className="inline-flex min-h-[40px] items-center gap-2 rounded-full border border-[#c9a84c]/20 bg-[#c9a84c]/10 transition-colors hover:bg-[#c9a84c]/15"
              style={{
                padding: "10px 12px",
                fontFamily: '"Poppins", sans-serif',
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#e7c76b",
              }}
            >
              <span>{mobileMenuOpen ? "Close" : "Menu"}</span>
              <span className="inline-flex h-3.5 w-3.5 flex-col items-end justify-center gap-1" aria-hidden="true">
                <span
                  className={`block h-px rounded-full bg-current transition-all duration-200 ${
                    mobileMenuOpen ? "w-3 -translate-y-0.5 rotate-45" : "w-3"
                  }`}
                />
                <span
                  className={`block h-px rounded-full bg-current transition-all duration-200 ${
                    mobileMenuOpen ? "w-3 -translate-y-[2px] -rotate-45" : "w-4"
                  }`}
                />
              </span>
            </button>
          </div>

          <AnimatePresence initial={false}>
            {mobileMenuOpen ? (
              <motion.div
                id="site-navbar-mobile-panel"
                className="mt-4 flex flex-col gap-2 border-t border-white/5 pt-4"
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                style={{ overflow: "hidden" }}
              >
                {NAV_ITEMS.map((item) => (
                  <NavButton
                    key={item.label}
                    href={item.href}
                    label={item.label}
                    active={isActiveLink(currentPath, item.href)}
                    onClick={() => setMobileMenuOpen(false)}
                    mobile
                  />
                ))}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
}
