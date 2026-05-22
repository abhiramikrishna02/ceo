import ResponsiveHeroBanner from "@/components/ui/responsive-hero-banner";

const navLinks = [
  { label: "Home", href: "/home", isActive: true },
  { label: "About", href: "/about" },
  { label: "Benefits", href: "/benefits" },
  { label: "Contact", href: "/contact" },
];

export default function HomeHeroSection() {
  return (
    <ResponsiveHeroBanner
      badgeLabel="CEO2"
      badgeText="Premium executive web presence"
      title="Lead With Authority"
      titleLine2="Before You Speak"
      description="A cinematic homepage system for founders, operators, and leadership teams that need clarity, trust, and a stronger digital first impression."
      primaryButtonText="Start a Project"
      primaryButtonHref="/contact"
      secondaryButtonText="See Benefits"
      secondaryButtonHref="/benefits"
      ctaButtonText="Contact CEO2"
      ctaButtonHref="/contact"
      partnersTitle="Trusted by leaders building sharper company stories"
      backgroundImageUrl="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=2400&q=85"
      navLinks={navLinks}
    />
  );
}
