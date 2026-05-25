"use client";

import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";

function ResponsiveHeroBanner({
  backgroundImageUrl = "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/0e2dbea0-c0a9-413f-a57b-af279633c0df_3840w.jpg",
  badgeLabel = "New",
  badgeText = "First Commercial Flight to Mars 2026",
  title = "Journey Beyond Earth",
  titleLine2 = "Into the Cosmos",
  description = "Experience the cosmos like never before. Our advanced spacecraft and cutting-edge technology make interplanetary travel accessible, safe, and unforgettable.",
  primaryButtonText = "Book Your Journey",
  primaryButtonHref = "#",
  secondaryButtonText = "Watch Launch",
  secondaryButtonHref = "#",
}) {
  return (
    <section className="hero-banner-shell relative isolate min-h-[100svh] w-full overflow-hidden bg-black">
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

      <div className="hero-banner-inner relative z-10 min-h-[100svh]">
        <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
            <div className="hero-banner-badge animate-fade-slide-in-1 mb-6 inline-flex max-w-[92vw] items-center gap-3 rounded-full bg-white/10 px-3 py-2 ring-1 ring-white/15 backdrop-blur sm:px-4">
              <span className="inline-flex items-center rounded-full bg-white/90 px-2 py-0.5 font-sans text-xs font-medium text-neutral-900">
                {badgeLabel}
              </span>
              <span className="font-sans text-sm font-medium text-white/90">
                {badgeText}
              </span>
            </div>

            <h1 className="hero-banner-title animate-fade-slide-in-2 mx-auto max-w-5xl font-serif text-[clamp(2.5rem,8vw,5.5rem)] font-normal leading-[1.02] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              {title}
              <br className="hidden sm:block" />
              {titleLine2}
            </h1>

            <p className="hero-banner-description animate-fade-slide-in-3 mx-auto mt-5 max-w-2xl text-base text-white/80 sm:mt-6 sm:text-lg">
              {description}
            </p>

            <div className="hero-banner-actions animate-fade-slide-in-4 mt-8 flex w-full flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
              <a
                href={primaryButtonHref}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white/10 px-5 py-3 font-sans text-sm font-medium text-white ring-1 ring-white/15 transition-colors hover:bg-white/15"
              >
                {primaryButtonText}
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={secondaryButtonHref}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-transparent px-5 py-3 font-sans text-sm font-medium text-white/90 transition-colors hover:text-white"
              >
                {secondaryButtonText}
                <Play className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResponsiveHeroBanner;
