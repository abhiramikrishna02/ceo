"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Menu, Play, X } from "lucide-react";

interface NavLink {
  label: string;
  href: string;
  isActive?: boolean;
}

interface Partner {
  logoUrl: string;
  href: string;
  label?: string;
}

interface ResponsiveHeroBannerProps {
  logoUrl?: string;
  backgroundImageUrl?: string;
  navLinks?: NavLink[];
  ctaButtonText?: string;
  ctaButtonHref?: string;
  badgeText?: string;
  badgeLabel?: string;
  title?: string;
  titleLine2?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  partnersTitle?: string;
  partners?: Partner[];
}

const defaultPartners: Partner[] = [
  {
    logoUrl:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80",
    href: "#",
    label: "Orbit",
  },
  {
    logoUrl:
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=400&q=80",
    href: "#",
    label: "Nebula",
  },
  {
    logoUrl:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=400&q=80",
    href: "#",
    label: "Earth",
  },
  {
    logoUrl:
      "https://images.unsplash.com/photo-1447433819943-74a20887a81e?auto=format&fit=crop&w=400&q=80",
    href: "#",
    label: "Stars",
  },
  {
    logoUrl:
      "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=400&q=80",
    href: "#",
    label: "Cosmos",
  },
];

const ResponsiveHeroBanner: React.FC<ResponsiveHeroBannerProps> = ({
  logoUrl = "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=400&q=80",
  backgroundImageUrl = "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=2400&q=85",
  navLinks = [
    { label: "Home", href: "/home", isActive: true },
    { label: "About", href: "/about" },
    { label: "Benefits", href: "/benefits" },
    { label: "Contact", href: "/contact" },
  ],
  ctaButtonText = "Reserve Seat",
  ctaButtonHref = "/contact",
  badgeLabel = "New",
  badgeText = "First Commercial Flight to Mars 2026",
  title = "Journey Beyond Earth",
  titleLine2 = "Into the Cosmos",
  description = "Experience the cosmos like never before. Our advanced spacecraft and cutting-edge technology make interplanetary travel accessible, safe, and unforgettable.",
  primaryButtonText = "Book Your Journey",
  primaryButtonHref = "/contact",
  secondaryButtonText = "Watch Launch",
  secondaryButtonHref = "/benefits",
  partnersTitle = "Partnering with leading space agencies worldwide",
  partners = defaultPartners,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <section className="isolate relative min-h-screen w-full overflow-hidden">
      <Image
        src={backgroundImageUrl}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/45" />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-black/30" />

      <header className="relative z-10 xl:top-4">
        <div className="mx-6">
          <div className="flex items-center justify-between pt-4">
            <Link
              href="/home"
              aria-label="CEO2 home"
              className="inline-flex h-10 w-[100px] items-center justify-center rounded bg-cover bg-center ring-1 ring-white/10"
              style={{ backgroundImage: `url(${logoUrl})` }}
            >
              <span className="rounded bg-black/50 px-3 py-1 text-xs font-semibold tracking-[0.24em] text-white backdrop-blur">
                CEO2
              </span>
            </Link>

            <nav className="hidden items-center gap-2 md:flex">
              <div className="flex items-center gap-1 rounded-full bg-white/5 px-1 py-1 ring-1 ring-white/10 backdrop-blur">
                {navLinks.map((link) => (
                  link.href.startsWith("/") ? (
                    <Link
                      key={link.label}
                      href={link.href}
                      className={`px-3 py-2 font-sans text-sm font-medium transition-colors hover:text-white ${
                        link.isActive ? "text-white/90" : "text-white/80"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      key={link.label}
                      href={link.href}
                      className={`px-3 py-2 font-sans text-sm font-medium transition-colors hover:text-white ${
                        link.isActive ? "text-white/90" : "text-white/80"
                      }`}
                    >
                      {link.label}
                    </a>
                  )
                ))}
                {ctaButtonHref.startsWith("/") ? (
                  <Link
                    href={ctaButtonHref}
                    className="ml-1 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 font-sans text-sm font-medium text-neutral-900 transition-colors hover:bg-white/90"
                  >
                    {ctaButtonText}
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <a
                    href={ctaButtonHref}
                    className="ml-1 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 font-sans text-sm font-medium text-neutral-900 transition-colors hover:bg-white/90"
                  >
                    {ctaButtonText}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
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
                  link.href.startsWith("/") ? (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="rounded-2xl px-4 py-3 text-sm font-medium text-white/82 hover:bg-white/10"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      key={link.label}
                      href={link.href}
                      className="rounded-2xl px-4 py-3 text-sm font-medium text-white/82 hover:bg-white/10"
                    >
                      {link.label}
                    </a>
                  )
                ))}
                {ctaButtonHref.startsWith("/") ? (
                  <Link
                    href={ctaButtonHref}
                    className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-neutral-950"
                  >
                    {ctaButtonText}
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <a
                    href={ctaButtonHref}
                    className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-neutral-950"
                  >
                    {ctaButtonText}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
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
              {primaryButtonHref.startsWith("/") ? (
                <Link
                  href={primaryButtonHref}
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 font-sans text-sm font-medium text-white ring-1 ring-white/15 transition-colors hover:bg-white/15"
                >
                  {primaryButtonText}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                <a
                  href={primaryButtonHref}
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 font-sans text-sm font-medium text-white ring-1 ring-white/15 transition-colors hover:bg-white/15"
                >
                  {primaryButtonText}
                  <ArrowRight className="h-4 w-4" />
                </a>
              )}
              {secondaryButtonHref.startsWith("/") ? (
                <Link
                  href={secondaryButtonHref}
                  className="inline-flex items-center gap-2 rounded-full bg-transparent px-5 py-3 font-sans text-sm font-medium text-white/90 transition-colors hover:text-white"
                >
                  {secondaryButtonText}
                  <Play className="h-4 w-4" />
                </Link>
              ) : (
                <a
                  href={secondaryButtonHref}
                  className="inline-flex items-center gap-2 rounded-full bg-transparent px-5 py-3 font-sans text-sm font-medium text-white/90 transition-colors hover:text-white"
                >
                  {secondaryButtonText}
                  <Play className="h-4 w-4" />
                </a>
              )}
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
                  aria-label={partner.label || `Partner ${index + 1}`}
                  className="inline-flex h-9 w-[120px] items-center justify-center rounded-full bg-cover bg-center opacity-80 ring-1 ring-white/10 transition-opacity hover:opacity-100"
                  style={{ backgroundImage: `url(${partner.logoUrl})` }}
                >
                  <span className="rounded-full bg-black/45 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80 backdrop-blur">
                    {partner.label || "Partner"}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResponsiveHeroBanner;
