"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Menu, Play, X } from "lucide-react";

function ResponsiveHeroBanner({
  logoUrl = "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/febf2421-4a9a-42d6-871d-ff4f9518021c_1600w.png",
  backgroundImageUrl = "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/0e2dbea0-c0a9-413f-a57b-af279633c0df_3840w.jpg",
  navLinks = [
    { label: "Home", href: "#", isActive: true },
    { label: "Missions", href: "#" },
    { label: "Destinations", href: "#" },
    { label: "Technology", href: "#" },
    { label: "Book Flight", href: "#" },
  ],
  ctaButtonText = "Reserve Seat",
  ctaButtonHref = "#",
  badgeLabel = "New",
  badgeText = "First Commercial Flight to Mars 2026",
  title = "Journey Beyond Earth",
  titleLine2 = "Into the Cosmos",
  description = "Experience the cosmos like never before. Our advanced spacecraft and cutting-edge technology make interplanetary travel accessible, safe, and unforgettable.",
  primaryButtonText = "Book Your Journey",
  primaryButtonHref = "#",
  secondaryButtonText = "Watch Launch",
  secondaryButtonHref = "#",
  partnersTitle = "Partnering with leading space agencies worldwide",
  partners = [
    { logoUrl: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/f7466370-2832-4fdd-84c2-0932bb0dd850_800w.png", href: "#" },
    { logoUrl: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/0a9a71ec-268b-4689-a510-56f57e9d4f13_1600w.png", href: "#" },
    { logoUrl: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/a9ed4369-748a-49f8-9995-55d6c876bbff_1600w.png", href: "#" },
    { logoUrl: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/0d8966a4-8525-4e11-9d5d-2d7390b2c798_1600w.png", href: "#" },
    { logoUrl: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/2ed33c8b-b8b2-4176-967f-3d785fed07d8_1600w.png", href: "#" },
  ],
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <section className="relative isolate min-h-screen w-full overflow-hidden bg-black">
      {/* The animate-reveal-cosmos class triggers the diagonal wipe animation 
        originating from the top left corner.
      */}
      <Image
        src={backgroundImageUrl}
        alt="Cosmos background"
        fill
        priority
        unoptimized
        sizes="100vw"
        className="object-cover animate-reveal-cosmos"
        style={{
          filter:
            "brightness(0.72) contrast(1.2) saturate(0.45) sepia(0.55) hue-rotate(6deg)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[#d4af37]/30 mix-blend-color" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_54%,rgba(255,216,106,0.36),rgba(212,175,55,0.14)_24%,rgba(0,0,0,0)_42%),linear-gradient(90deg,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.64)_38%,rgba(0,0,0,0.22)_68%,rgba(0,0,0,0.5)_100%)]" />
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full mix-blend-screen animate-reveal-cosmos"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="hero-golden-curve" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8a4d05" stopOpacity="0" />
            <stop offset="34%" stopColor="#d4af37" stopOpacity="0.78" />
            <stop offset="52%" stopColor="#ffe8a3" stopOpacity="1" />
            <stop offset="70%" stopColor="#f6c75b" stopOpacity="0.96" />
            <stop offset="100%" stopColor="#fff1b8" stopOpacity="0.78" />
          </linearGradient>
          <filter id="hero-golden-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d="M -170 40 C 470 42 1075 225 1345 520 C 1590 786 1720 980 1795 1135"
          fill="none"
          stroke="url(#hero-golden-curve)"
          strokeWidth="22"
          strokeLinecap="round"
          className="animate-golden-curve-draw"
          style={{ "--curve-opacity": 0.62 }}
          filter="url(#hero-golden-glow)"
        />
        <path
          d="M -170 40 C 470 42 1075 225 1345 520 C 1590 786 1720 980 1795 1135"
          fill="none"
          stroke="url(#hero-golden-curve)"
          strokeWidth="4"
          strokeLinecap="round"
          className="animate-golden-curve-draw"
          style={{ "--curve-opacity": 0.95 }}
        />
      </svg>
      <div className="pointer-events-none absolute inset-0 ring-1 ring-black/30" />

      <header className="relative z-10 xl:top-4">
        <div className="mx-6">
          <div className="flex items-center justify-between pt-4">
            <a
              href="#"
              aria-label="Home"
              className="inline-flex h-10 w-[100px] items-center justify-center rounded bg-cover bg-center"
              style={{ backgroundImage: `url(${logoUrl})` }}
            />

            <nav className="hidden items-center gap-2 md:flex">
              <div className="flex items-center gap-1 rounded-full bg-white/5 px-1 py-1 ring-1 ring-white/10 backdrop-blur">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className={`px-3 py-2 font-sans text-sm font-medium transition-colors hover:text-white ${
                      link.isActive ? "text-white/90" : "text-white/80"
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
                {ctaButtonText && ctaButtonHref ? (
                  <a
                    href={ctaButtonHref}
                    className="ml-1 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 font-sans text-sm font-medium text-neutral-900 transition-colors hover:bg-white/90"
                  >
                    {ctaButtonText}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                ) : null}
              </div>
            </nav>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 backdrop-blur md:hidden"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 text-white/90" />
              ) : (
                <Menu className="h-5 w-5 text-white/90" />
              )}
            </button>
          </div>

          {mobileMenuOpen ? (
            <div className="mt-4 rounded-3xl bg-black/45 p-3 ring-1 ring-white/10 backdrop-blur-xl md:hidden">
              <div className="grid gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="rounded-2xl px-4 py-3 text-sm font-medium text-white/82 hover:bg-white/10"
                  >
                    {link.label}
                  </a>
                ))}
                {ctaButtonText && ctaButtonHref ? (
                  <a
                    href={ctaButtonHref}
                    className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-neutral-950"
                  >
                    {ctaButtonText}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </header>

      <div className="relative z-10">
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-28 sm:pt-28 md:pt-32 lg:pt-40">
          <div className="mx-auto max-w-3xl text-center">
            <div className="animate-fade-slide-in-1 mb-6 inline-flex items-center gap-3 rounded-full bg-white/10 px-2.5 py-2 ring-1 ring-white/15 backdrop-blur">
              <span className="inline-flex items-center rounded-full bg-white/90 px-2 py-0.5 font-sans text-xs font-medium text-neutral-900">
                {badgeLabel}
              </span>
              <span className="font-sans text-sm font-medium text-white/90">
                {badgeText}
              </span>
            </div>

            <h1 className="animate-fade-slide-in-2 font-serif text-4xl font-normal leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              {title}
              <br className="hidden sm:block" />
              {titleLine2}
            </h1>

            <p className="animate-fade-slide-in-3 mx-auto mt-6 max-w-2xl text-base text-white/80 sm:text-lg">
              {description}
            </p>

            <div className="animate-fade-slide-in-4 mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <a
                href={primaryButtonHref}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 font-sans text-sm font-medium text-white ring-1 ring-white/15 transition-colors hover:bg-white/15"
              >
                {primaryButtonText}
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={secondaryButtonHref}
                className="inline-flex items-center gap-2 rounded-full bg-transparent px-5 py-3 font-sans text-sm font-medium text-white/90 transition-colors hover:text-white"
              >
                {secondaryButtonText}
                <Play className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="mx-auto mt-20 max-w-5xl">
            <p className="animate-fade-slide-in-1 text-center text-sm text-white/70">
              {partnersTitle}
            </p>
            <div className="animate-fade-slide-in-2 mt-6 grid grid-cols-2 items-center justify-items-center gap-4 text-white/70 sm:grid-cols-3 md:grid-cols-5">
              {partners.map((partner, index) => (
                <a
                  key={`${partner.logoUrl}-${index}`}
                  href={partner.href}
                  aria-label={`Partner ${index + 1}`}
                  className="inline-flex h-9 w-[120px] items-center justify-center rounded-full bg-cover bg-center opacity-80 transition-opacity hover:opacity-100"
                  style={{ backgroundImage: `url(${partner.logoUrl})` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResponsiveHeroBanner;
