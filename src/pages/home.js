import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { Check, CircleDot } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

import SiteNavbar from "@/components/layout/site-navbar";
import { DottedSurface } from "@/components/ui/dotted-surface";
import ResponsiveHeroBanner from "@/components/ui/responsive-hero-banner";
import { cn } from "@/lib/utils";
import {
  BenefitsGridSection,
  CommunityBenefitsBlock,
  CTASection,
  GlobalStyle,
  Particles,
  QuotesSection,
  StatsSection,
  StatementSection,
  StorySection,
} from "@/pages/benefits";

// ---------------------------------------------------------------------------
// Home page: local offer-section content
// ---------------------------------------------------------------------------
const services = [
  "Homepage narrative and section strategy",
  "Responsive interface design direction",
  "Conversion-focused contact path",
  "Motion and visual polish for premium pacing",
];

const metrics = [
  { value: "05", label: "Focused sections" },
  { value: "01", label: "Clear next action" },
  { value: "24/7", label: "Always-on first impression" },
];

// ---------------------------------------------------------------------------
// Home page: local animation variants
// ---------------------------------------------------------------------------
const listVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 18,
    x: -10,
    filter: "blur(6px)",
  },
  show: {
    opacity: 1,
    y: 0,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.55,
      ease: "easeOut",
    },
  },
};

const metricVariants = {
  hidden: {
    opacity: 0,
    y: 22,
    scale: 0.96,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

// ---------------------------------------------------------------------------
// Home page: local reveal helpers
// ---------------------------------------------------------------------------
function useReveal(threshold = 0.22) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

function revealStyle(visible, delay = 0) {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? "translate3d(0, 0, 0)" : "translate3d(0, 24px, 0)",
    transition: `opacity 820ms ease ${delay}ms, transform 820ms ease ${delay}ms`,
  };
}

// ---------------------------------------------------------------------------
// Home page section: hero
// ---------------------------------------------------------------------------
function HomeHeroSection() {
  return (
    <ResponsiveHeroBanner
      badgeLabel="New"
      badgeText="First Commercial Flight to Mars 2026"
      title="Journey Beyond Earth"
      titleLine2="Into the Cosmos"
      description="Experience the cosmos like never before. Our advanced spacecraft and cutting-edge technology make interplanetary travel accessible, safe, and unforgettable."
      primaryButtonText="Book Your Journey"
      primaryButtonHref="#"
      secondaryButtonText="Watch Launch"
      secondaryButtonHref="#"
      partnersTitle="Partnering with leading space agencies worldwide"
      backgroundImageUrl="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/0e2dbea0-c0a9-413f-a57b-af279633c0df_3840w.jpg"
      partners={[
        {
          logoUrl:
            "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/f7466370-2832-4fdd-84c2-0932bb0dd850_800w.png",
          href: "#",
        },
        {
          logoUrl:
            "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/0a9a71ec-268b-4689-a510-56f57e9d4f13_1600w.png",
          href: "#",
        },
        {
          logoUrl:
            "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/a9ed4369-748a-49f8-9995-55d6c876bbff_1600w.png",
          href: "#",
        },
        {
          logoUrl:
            "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/0d8966a4-8525-4e11-9d5d-2d7390b2c798_1600w.png",
          href: "#",
        },
        {
          logoUrl:
            "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/2ed33c8b-b8b2-4176-967f-3d785fed07d8_1600w.png",
          href: "#",
        },
      ]}
    />
  );
}

// ---------------------------------------------------------------------------
// Home page section: offer
// ---------------------------------------------------------------------------
function HomeOfferSection() {
  const [sectionRef, sectionVisible] = useReveal(0.24);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 0.35, 1], [70, 0, -20]);
  const titleX = useTransform(scrollYProgress, [0, 0.5, 1], [-18, 0, 10]);
  const titleRotate = useTransform(scrollYProgress, [0, 1], [0.7, -0.4]);

  const cardY = useTransform(scrollYProgress, [0, 0.45, 1], [110, 0, -70]);
  const cardX = useTransform(scrollYProgress, [0, 0.45, 1], [28, 0, -18]);
  const cardRotate = useTransform(scrollYProgress, [0, 0.45, 1], [4, 0, -3]);

  const metricsY = useTransform(scrollYProgress, [0, 0.45, 1], [140, 10, -45]);
  const metricsX = useTransform(scrollYProgress, [0, 0.45, 1], [18, 0, -12]);

  const glowY = useTransform(scrollYProgress, [0, 1], [-30, 120]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden border-t border-white/10 bg-black px-6 py-28 sm:px-10 sm:py-32 lg:min-h-[820px] lg:px-12 lg:py-36"
    >
      <DottedSurface className="opacity-45" />

      <motion.div
        aria-hidden="true"
        style={{ y: glowY, scale: glowScale }}
        className={cn(
          "pointer-events-none absolute -top-20 left-1/2 z-[1] h-[620px] w-[620px] -translate-x-1/2 rounded-full",
          "bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.12),transparent_58%)]",
          "blur-[30px]"
        )}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-20">
        <div style={revealStyle(sectionVisible)}>
          <motion.div
            style={{ y: titleY, x: titleX, rotate: titleRotate }}
            className="max-w-2xl will-change-transform"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c9a84c]/70">
              What Gets Built
            </p>
            <h2 className="mt-5 bg-[linear-gradient(135deg,#fff6dc_0%,#f0d080_38%,#c9a84c_72%,#fff1bf_100%)] bg-clip-text text-4xl font-semibold leading-tight text-transparent sm:text-6xl">
              A homepage system, not just another screen.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#f2e7c8]/72">
              Each section has a job: establish authority, explain the process,
              prove the value, and move the right visitor toward a conversation.
            </p>
          </motion.div>
        </div>

        <div className="grid gap-8" style={revealStyle(sectionVisible, 160)}>
          <motion.div
            style={{ y: cardY, x: cardX, rotate: cardRotate }}
            className="rounded-lg border border-white/10 bg-black/60 p-7 backdrop-blur-xl will-change-transform sm:p-8"
          >
            <div className="flex items-center gap-3">
              <CircleDot className="h-5 w-5 text-[#d8b766]/85" />
              <h3 className="text-xl font-semibold text-[#f3e5bd]">
                Core Deliverables
              </h3>
            </div>

            <motion.div
              className="mt-7 grid gap-4"
              variants={listVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.35 }}
            >
              {services.map((service) => (
                <motion.div
                  key={service}
                  variants={itemVariants}
                  className="flex items-start gap-3 border-t border-white/10 pt-4 first:border-t-0 first:pt-0"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#d8b766]/80" />
                  <p className="leading-7 text-[#f2e7c8]/78">{service}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            style={{ y: metricsY, x: metricsX }}
            className="grid gap-5 sm:grid-cols-3 will-change-transform"
          >
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                variants={metricVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.45 }}
                transition={{ delay: index * 0.08 }}
                className="rounded-lg border border-white/10 bg-black/60 p-6 backdrop-blur-xl"
              >
                <p className="text-3xl font-semibold text-[#f0d080]">
                  {metric.value}
                </p>
                <p className="mt-2 text-sm leading-6 text-[#eadcb4]/68">
                  {metric.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Home page sections: benefits-derived middle flow + home closing section
// ---------------------------------------------------------------------------
function HomePageSections() {
  return (
    <>
      {/* Section: Home Hero */}
      <HomeHeroSection />

      {/* Section: Community Benefits */}
      <CommunityBenefitsBlock />

      {/* Section: Statement */}
      <StatementSection />

      {/* Section: Benefits Grid */}
      <BenefitsGridSection />

      {/* Section: Stats */}
      <StatsSection />

      {/* Section: Story */}
      <StorySection />

      {/* Section: Quotes */}
      <QuotesSection />

      {/* Section: Call To Action */}
      <CTASection />

      {/* Section: Home Offer */}
      <HomeOfferSection />
    </>
  );
}

// ---------------------------------------------------------------------------
// Home page root
// ---------------------------------------------------------------------------
export default function Home() {
  return (
    <>
      <Head>
        <title>CEO2 | Home</title>
      </Head>

      <GlobalStyle />
      <div className="noise-overlay" />
      <Particles />
      <SiteNavbar />

      <main className="relative z-10 bg-black text-white">
        <HomePageSections />
      </main>
    </>
  );
}
