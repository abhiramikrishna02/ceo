import { useRef } from "react";
import Head from "next/head";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

import SiteNavbar from "@/components/layout/site-navbar";

const GOLD = "#c9a84c";
const BG = "#0a0a0a";
const TEXT = "#f5f0e8";
const EASE = [0.16, 1, 0.3, 1];

const pp = (weight, size, color, extra = {}) => ({
  fontFamily: "Poppins, sans-serif",
  fontWeight: weight,
  fontSize: size,
  color,
  ...extra,
});

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------
function HeroSectionStyles() {
  return (
    <style jsx global>{`
      .shimmer-text {
        background: linear-gradient(90deg, #c9a84c 0%, #f0d080 25%, #fff8e7 50%, #f0d080 75%, #c9a84c 100%);
        background-size: 200% auto;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: shimmer 4s linear infinite;
      }
      @keyframes glowPulse {
        0%, 100% {
          box-shadow: 0 0 20px rgba(201,168,76,0.2), 0 0 60px rgba(201,168,76,0.05);
        }
        50% {
          box-shadow: 0 0 40px rgba(201,168,76,0.4), 0 0 100px rgba(201,168,76,0.15);
        }
      }
      @keyframes shimmer {
        0% { background-position: -200% center; }
        100% { background-position: 200% center; }
      }
      @keyframes spin-slow {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes spin-reverse {
        from { transform: rotate(360deg); }
        to { transform: rotate(0deg); }
      }
    `}</style>
  );
}

// ---------------------------------------------------------------------------
// Shared UI
// ---------------------------------------------------------------------------
const Reveal = ({ children, delay = 0, y = 60 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
};

const StaggerText = ({ text, delay = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });
  return (
    <span ref={ref} style={{ display: "inline-flex", flexWrap: "wrap", gap: "0.25em" }}>
      {text.split(" ").map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40, rotateX: -30 }}
          animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.7, delay: delay + i * 0.08, ease: EASE }}
          style={{ display: "inline-block" }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

const Ring = ({ size = 300, opacity = 0.08, speed = "20s", reverse = false }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      border: `1px solid rgba(201,168,76,${opacity})`,
      animation: `${reverse ? "spin-reverse" : "spin-slow"} ${speed} linear infinite`,
      position: "absolute",
    }}
  />
);

// ---------------------------------------------------------------------------
// Hero Section
// ---------------------------------------------------------------------------
export const HeroSection = () => {
  const { scrollY } = useScroll();
  const rotateX = useTransform(scrollY, [0, 1000], [0, 60]);
  const rotateY = useTransform(scrollY, [0, 1000], [0, -4]);
  const z = useTransform(scrollY, [0, 1000], [0, -300]);
  const scale = useTransform(scrollY, [0, 1000], [1, 0.85]);
  const y = useTransform(scrollY, [0, 1000], [0, -120]);
  const opacity = useTransform(scrollY, [700, 1100], [1, 0]);
  const layerOpacity = useTransform(scrollY, [100, 600, 1000], [0, 0.4, 0.8]);
  const layerScale = useTransform(scrollY, [0, 1000], [0.8, 0.98]);
  const layerY = useTransform(scrollY, [0, 1000], [200, 0]);
  const layerRotateX = useTransform(scrollY, [0, 1000], [20, 65]);
  const indicatorOpacity = useTransform(scrollY, [0, 200], [1, 0]);

  return (
    <section style={{ height: "250vh", position: "relative", backgroundColor: "transparent" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", perspective: "1500px", padding: "0 24px" }}>
        <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 800, height: 800, borderRadius: "50%", background: "radial-gradient(circle,rgba(201,168,76,0.06) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 0, height: 0 }}>
          {[[700, 0.04, "40s", false], [500, 0.06, "25s", true], [320, 0.1, "15s", false]].map(([s, o, sp, r]) => (
            <div key={s} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
              <Ring size={s} opacity={o} speed={sp} reverse={r} />
            </div>
          ))}
        </div>
        <motion.div style={{ position: "absolute", width: "100%", maxWidth: 1050, height: "80vh", background: "linear-gradient(180deg,rgba(15,15,15,0.4) 0%,rgba(0,0,0,0.8) 100%)", borderRadius: 32, border: "1px solid rgba(255,255,255,0.02)", boxShadow: "0 40px 100px rgba(0,0,0,0.9)", zIndex: 1, opacity: layerOpacity, scale: layerScale, y: layerY, rotateX: layerRotateX, transformOrigin: "bottom center" }} />
        <motion.div style={{ y, z, opacity, scale, rotateX, rotateY, textAlign: "center", position: "relative", zIndex: 2, maxWidth: 900, transformStyle: "preserve-3d", transformOrigin: "center center" }}>
          <motion.p initial={{ opacity: 0, letterSpacing: "0.5em" }} animate={{ opacity: 1, letterSpacing: "0.4em" }} transition={{ duration: 1.2, delay: 0.2 }} style={pp(300, 11, GOLD, { letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: 32 })}>
            Crafted for the exceptional
          </motion.p>
          <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.1, delay: 0.5 }} style={pp(200, "clamp(48px,8vw,110px)", TEXT, { lineHeight: 1.1, marginBottom: 8 })}>
            <StaggerText text="You&apos;ve earned" delay={0.4} />
          </motion.h1>
          <motion.h1 style={pp(700, "clamp(48px,8vw,110px)", undefined, { lineHeight: 1.1, marginBottom: 40 })}>
            <span className="shimmer-text">
              <StaggerText text="more than this." delay={0.7} />
            </span>
          </motion.h1>
          <Reveal delay={1.1} y={30}>
            <p style={pp(300, "clamp(16px,2vw,20px)", "rgba(245,240,232,0.5)", { maxWidth: 580, margin: "0 auto 56px", lineHeight: 1.8 })}>
              A platform built for those who lead. Where every benefit is a statement, every reward a recognition of your worth.
            </p>
          </Reveal>
          <Reveal delay={1.3}>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(201,168,76,0.4)" }}
                whileTap={{ scale: 0.97 }}
                style={pp(500, 14, BG, { letterSpacing: "0.1em", textTransform: "uppercase", padding: "18px 48px", borderRadius: 2, cursor: "pointer", border: "none", background: "linear-gradient(135deg,#c9a84c,#f0d080,#b8882a)", animation: "glowPulse 3s ease-in-out infinite" })}
              >
                Claim Your Benefits
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04, borderColor: "rgba(201,168,76,0.5)" }}
                whileTap={{ scale: 0.97 }}
                style={pp(300, 14, TEXT, { letterSpacing: "0.1em", textTransform: "uppercase", padding: "18px 48px", borderRadius: 2, cursor: "pointer", background: "transparent", border: "1px solid rgba(245,240,232,0.2)" })}
              >
                Learn More
              </motion.button>
            </div>
          </Reveal>
        </motion.div>
        <motion.div style={{ position: "absolute", bottom: 48, left: "50%", transform: "translateX(-50%)", opacity: indicatorOpacity }} animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
          <div style={{ width: 1, height: 60, background: "linear-gradient(to bottom,transparent,rgba(201,168,76,0.6),transparent)", margin: "0 auto" }} />
        </motion.div>
      </div>
    </section>
  );
};

export default function BenefitsPage() {
  return (
    <>
      <Head>
        <title>CEO2 | Benefits</title>
      </Head>
      <HeroSectionStyles />
      <SiteNavbar />
      <main style={{ background: BG, color: TEXT, paddingTop: 92 }}>
        <HeroSection />
      </main>
    </>
  );
}
