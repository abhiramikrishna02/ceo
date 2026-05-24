import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Home", href: "/home" },
  { label: "About", href: "/about" },
  { label: "Benefits", href: "/benefits" },
  { label: "Contact", href: "/contact" },
];

// ─── Global Poppins font injection ───────────────────────────────────────────
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    html { scroll-behavior: smooth; }

    body, #root {
      font-family: 'Poppins', sans-serif;
      background: #0a0a0a;
      color: #f5f0e8;
      overflow-x: hidden;
    }

    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-track { background: #0a0a0a; }
    ::-webkit-scrollbar-thumb { background: #c9a84c; border-radius: 2px; }

    ::selection { background: rgba(201,168,76,0.3); color: #f5f0e8; }

    .gold { color: #c9a84c; }
    .gold-gradient {
      background: linear-gradient(135deg, #c9a84c 0%, #f0d080 40%, #b8882a 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .glass {
      background: rgba(255,255,255,0.03);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(201,168,76,0.12);
    }

    .glass-dark {
      background: rgba(10,10,10,0.6);
      backdrop-filter: blur(30px);
      -webkit-backdrop-filter: blur(30px);
      border: 1px solid rgba(201,168,76,0.08);
    }

    .noise-overlay {
      position: fixed; inset: 0; pointer-events: none; z-index: 9999; opacity: 0.035;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    }

    @keyframes floatY {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(2deg); }
    }
    @keyframes floatX {
      0%, 100% { transform: translateX(0px); }
      50% { transform: translateX(15px); }
    }
    @keyframes glowPulse {
      0%, 100% { box-shadow: 0 0 20px rgba(201,168,76,0.2), 0 0 60px rgba(201,168,76,0.05); }
      50% { box-shadow: 0 0 40px rgba(201,168,76,0.4), 0 0 100px rgba(201,168,76,0.15); }
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
    @keyframes particle-drift {
      0% { transform: translateY(100vh) translateX(0) scale(0); opacity: 0; }
      10% { opacity: 1; }
      90% { opacity: 0.6; }
      100% { transform: translateY(-100px) translateX(var(--drift)) scale(1); opacity: 0; }
    }
    @keyframes borderShimmer {
      0%, 100% { border-color: rgba(201,168,76,0.1); }
      50% { border-color: rgba(201,168,76,0.4); }
    }

    .card-tilt {
      transform-style: preserve-3d;
      transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.4s ease;
    }
    .card-tilt:hover {
      box-shadow: 0 30px 80px rgba(201,168,76,0.15), 0 0 0 1px rgba(201,168,76,0.2);
    }

    .line-reveal {
      overflow: hidden;
      display: block;
    }

    .shimmer-text {
      background: linear-gradient(90deg, #c9a84c 0%, #f0d080 25%, #fff8e7 50%, #f0d080 75%, #c9a84c 100%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: shimmer 4s linear infinite;
    }

    .section-line {
      width: 1px;
      background: linear-gradient(to bottom, transparent, rgba(201,168,76,0.5), transparent);
    }
  `}</style>
);

// ─── Floating Particles ───────────────────────────────────────────────────────
const Particles = () => {
  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 12}s`,
    duration: `${8 + Math.random() * 12}s`,
    size: `${1 + Math.random() * 3}px`,
    drift: `${(Math.random() - 0.5) * 200}px`,
  }));

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1, overflow: "hidden" }}>
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            bottom: "-10px",
            left: p.left,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: `radial-gradient(circle, #c9a84c, #f0d080)`,
            animation: `particle-drift ${p.duration} ${p.delay} infinite linear`,
            "--drift": p.drift,
            boxShadow: "0 0 6px rgba(201,168,76,0.8)",
          }}
        />
      ))}
    </div>
  );
};

// ─── Section Reveal Wrapper ───────────────────────────────────────────────────
const Reveal = ({ children, delay = 0, y = 60, scale = 1 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, scale: scale === 1 ? 1 : 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

// ─── Stagger Text ─────────────────────────────────────────────────────────────
const StaggerText = ({ text, className, delay = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });
  const words = text.split(" ");

  return (
    <span ref={ref} className={className} style={{ display: "inline-flex", flexWrap: "wrap", gap: "0.25em" }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40, rotateX: -30 }}
          animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.7, delay: delay + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "inline-block" }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

// ─── Card with 3D Tilt ────────────────────────────────────────────────────────
const TiltCard = ({ children, style = {}, className = "" }) => {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: -dy * 8, y: dx * 8 });
  };

  return (
    <motion.div
      ref={ref}
      className={`card-tilt ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false); }}
      animate={{ rotateX: tilt.x, rotateY: tilt.y, scale: hovered ? 1.02 : 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{ ...style, perspective: 1000, transformStyle: "preserve-3d" }}
    >
      {children}
      {hovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "absolute", inset: 0, borderRadius: "inherit", pointerEvents: "none",
            background: "radial-gradient(circle at 50% 50%, rgba(201,168,76,0.08), transparent 70%)",
          }}
        />
      )}
    </motion.div>
  );
};

// ─── Decorative Ring ─────────────────────────────────────────────────────────
const Ring = ({ size = 300, opacity = 0.08, speed = "20s", reverse = false }) => (
  <div style={{
    width: size, height: size, borderRadius: "50%",
    border: `1px solid rgba(201,168,76,${opacity})`,
    animation: `${reverse ? "spin-reverse" : "spin-slow"} ${speed} linear infinite`,
    position: "absolute",
  }} />
);

// ─── Section 1: Hero ──────────────────────────────────────────────────────────
const HeroSection = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scale = useTransform(scrollY, [0, 600], [1, 0.85]);

  return (
    <section style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden", padding: "0 24px",
    }}>
      {/* BG Glow */}
      <div style={{
        position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)",
        width: 800, height: 800, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      {/* Rotating Rings */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 0, height: 0 }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
          <Ring size={700} opacity={0.04} speed="40s" />
        </div>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
          <Ring size={500} opacity={0.06} speed="25s" reverse />
        </div>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
          <Ring size={320} opacity={0.1} speed="15s" />
        </div>
      </div>

      <motion.div style={{ y, opacity, scale, textAlign: "center", position: "relative", zIndex: 2, maxWidth: 900 }}>
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.5em" }}
          animate={{ opacity: 1, letterSpacing: "0.4em" }}
          transition={{ duration: 1.2, delay: 0.2 }}
          style={{
            fontFamily: "Poppins", fontSize: 11, fontWeight: 300, color: "#c9a84c",
            letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: 32,
          }}
        >
          Crafted for the exceptional
        </motion.p>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1, delay: 0.5 }}
          style={{
            fontFamily: "Poppins", fontWeight: 200, lineHeight: 1.1,
            fontSize: "clamp(48px, 8vw, 110px)", color: "#f5f0e8",
            marginBottom: 8,
          }}
        >
          <StaggerText text="You've earned" delay={0.4} />
        </motion.h1>

        <motion.h1
          style={{
            fontFamily: "Poppins", fontWeight: 700, lineHeight: 1.1,
            fontSize: "clamp(48px, 8vw, 110px)", marginBottom: 40,
          }}
        >
          <span className="shimmer-text">
            <StaggerText text="more than this." delay={0.7} />
          </span>
        </motion.h1>

        <Reveal delay={1.1} y={30}>
          <p style={{
            fontFamily: "Poppins", fontWeight: 300, fontSize: "clamp(16px, 2vw, 20px)",
            color: "rgba(245,240,232,0.5)", maxWidth: 580, margin: "0 auto 56px",
            lineHeight: 1.8,
          }}>
            A platform built for those who lead. Where every benefit is a statement,
            every reward a recognition of your worth.
          </p>
        </Reveal>

        <Reveal delay={1.3}>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(201,168,76,0.4)" }}
              whileTap={{ scale: 0.97 }}
              style={{
                fontFamily: "Poppins", fontWeight: 500, fontSize: 14,
                letterSpacing: "0.1em", textTransform: "uppercase",
                padding: "18px 48px", borderRadius: 2, cursor: "pointer", border: "none",
                background: "linear-gradient(135deg, #c9a84c, #f0d080, #b8882a)",
                color: "#0a0a0a",
                animation: "glowPulse 3s ease-in-out infinite",
              }}
            >
              Claim Your Benefits
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04, borderColor: "rgba(201,168,76,0.5)" }}
              whileTap={{ scale: 0.97 }}
              style={{
                fontFamily: "Poppins", fontWeight: 300, fontSize: 14,
                letterSpacing: "0.1em", textTransform: "uppercase",
                padding: "18px 48px", borderRadius: 2, cursor: "pointer",
                background: "transparent", color: "#f5f0e8",
                border: "1px solid rgba(245,240,232,0.2)",
              }}
            >
              Learn More
            </motion.button>
          </div>
        </Reveal>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{ position: "absolute", bottom: 48, left: "50%", transform: "translateX(-50%)" }}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <div style={{
          width: 1, height: 60,
          background: "linear-gradient(to bottom, transparent, rgba(201,168,76,0.6), transparent)",
          margin: "0 auto",
        }} />
      </motion.div>
    </section>
  );
};

// ─── Section 2: Statement ─────────────────────────────────────────────────────
const StatementSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const x2 = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={ref} style={{
      padding: "140px 24px", overflow: "hidden", position: "relative",
      borderTop: "1px solid rgba(201,168,76,0.06)",
      borderBottom: "1px solid rgba(201,168,76,0.06)",
    }}>
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        width: 600, height: 300, borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(201,168,76,0.04), transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div style={{ x: x1 }}>
          <p style={{
            fontFamily: "Poppins", fontWeight: 800,
            fontSize: "clamp(42px, 7vw, 96px)", lineHeight: 1.05,
            color: "rgba(245,240,232,0.04)",
            textAlign: "left", whiteSpace: "nowrap",
            letterSpacing: "-0.02em",
          }}>
            EXCELLENCE — PRIVILEGE — PRESTIGE — POWER
          </p>
        </motion.div>

        <div style={{ padding: "60px 0", textAlign: "center", position: "relative", zIndex: 2 }}>
          <Reveal>
            <h2 style={{
              fontFamily: "Poppins", fontWeight: 200,
              fontSize: "clamp(28px, 4vw, 52px)", lineHeight: 1.4,
              color: "#f5f0e8", maxWidth: 800, margin: "0 auto",
            }}>
              Not every CEO gets treated like one.
              <br />
              <span className="gold-gradient" style={{ fontWeight: 600 }}>
                You will.
              </span>
            </h2>
          </Reveal>
        </div>

        <motion.div style={{ x: x2 }}>
          <p style={{
            fontFamily: "Poppins", fontWeight: 800,
            fontSize: "clamp(42px, 7vw, 96px)", lineHeight: 1.05,
            color: "rgba(201,168,76,0.04)",
            textAlign: "right", whiteSpace: "nowrap",
            letterSpacing: "-0.02em",
          }}>
            WEALTH — LUXURY — LEGACY — AUTHORITY
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// ─── Section 3: Core Benefits Grid ───────────────────────────────────────────
const benefits = [
  {
    number: "01",
    title: "Private Banking",
    sub: "Relationship First",
    desc: "A dedicated relationship manager available 24/7. No queues. No bots. Direct access to the financial minds that matter.",
    icon: "◈",
    tag: "Exclusive",
  },
  {
    number: "02",
    title: "Zero Limits",
    sub: "Spend Without Boundaries",
    desc: "Dynamic credit limits that scale with your ambition. Pre-approved across 180 countries with zero foreign transaction friction.",
    icon: "◇",
    tag: "Global",
  },
  {
    number: "03",
    title: "Jet Access",
    sub: "First Class, Always",
    desc: "Complimentary lounge access across 1,400+ airports. Priority boarding. A travel experience that mirrors your status.",
    icon: "◆",
    tag: "Lifestyle",
  },
  {
    number: "04",
    title: "Concierge AI",
    sub: "Intelligence on Demand",
    desc: "An AI-powered personal assistant trained on your preferences. From boardroom reservations to rare collection sourcing.",
    icon: "◉",
    tag: "Smart",
  },
  {
    number: "05",
    title: "Wealth Engine",
    sub: "Grow What You've Built",
    desc: "Exclusive access to pre-IPO deals, alternative investments, and curated hedge fund strategies unavailable to the market.",
    icon: "◎",
    tag: "Wealth",
  },
  {
    number: "06",
    title: "Legacy Guard",
    sub: "Protection at Scale",
    desc: "Comprehensive protection for you, your family, and your assets. Estate planning, insurance architecture, and risk shielding.",
    icon: "◐",
    tag: "Security",
  },
];

const BenefitsGridSection = () => (
  <section style={{ padding: "120px 24px", position: "relative" }}>
    <div style={{ maxWidth: 1280, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 100 }}>
        <Reveal>
          <p style={{
            fontFamily: "Poppins", fontSize: 11, fontWeight: 300, color: "#c9a84c",
            letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: 24,
          }}>
            The Suite
          </p>
          <h2 style={{
            fontFamily: "Poppins", fontWeight: 200, fontSize: "clamp(36px, 5vw, 72px)",
            color: "#f5f0e8", lineHeight: 1.15,
          }}>
            Every benefit,
            <span className="gold-gradient" style={{ fontWeight: 700 }}> by design.</span>
          </h2>
        </Reveal>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
        gap: 1,
        background: "rgba(201,168,76,0.06)",
        border: "1px solid rgba(201,168,76,0.06)",
      }}>
        {benefits.map((b, i) => (
          <Reveal key={b.number} delay={i * 0.1}>
            <TiltCard style={{ height: "100%", position: "relative" }}>
              <div style={{
                padding: "52px 44px",
                background: "#0d0d0d",
                height: "100%",
                position: "relative",
                overflow: "hidden",
                transition: "background 0.4s ease",
              }}
                onMouseEnter={(e) => e.currentTarget.style.background = "#101010"}
                onMouseLeave={(e) => e.currentTarget.style.background = "#0d0d0d"}
              >
                {/* BG Number */}
                <div style={{
                  position: "absolute", right: -20, bottom: -20,
                  fontFamily: "Poppins", fontWeight: 800, fontSize: 140,
                  color: "rgba(201,168,76,0.03)", lineHeight: 1, pointerEvents: "none",
                  userSelect: "none",
                }}>
                  {b.number}
                </div>

                {/* Tag */}
                <div style={{
                  display: "inline-block", marginBottom: 32,
                  padding: "4px 12px", border: "1px solid rgba(201,168,76,0.2)",
                  borderRadius: 1,
                }}>
                  <span style={{
                    fontFamily: "Poppins", fontSize: 10, fontWeight: 400,
                    color: "#c9a84c", letterSpacing: "0.25em", textTransform: "uppercase",
                  }}>{b.tag}</span>
                </div>

                {/* Icon */}
                <div style={{
                  fontSize: 32, color: "#c9a84c", marginBottom: 24, lineHeight: 1,
                  filter: "drop-shadow(0 0 12px rgba(201,168,76,0.4))",
                }}>
                  {b.icon}
                </div>

                {/* Number */}
                <p style={{
                  fontFamily: "Poppins", fontSize: 11, fontWeight: 300,
                  color: "rgba(245,240,232,0.25)", letterSpacing: "0.2em",
                  marginBottom: 12,
                }}>
                  {b.number}
                </p>

                <h3 style={{
                  fontFamily: "Poppins", fontWeight: 600, fontSize: 26,
                  color: "#f5f0e8", marginBottom: 6, lineHeight: 1.2,
                }}>
                  {b.title}
                </h3>
                <p style={{
                  fontFamily: "Poppins", fontWeight: 300, fontSize: 12,
                  color: "#c9a84c", letterSpacing: "0.15em", textTransform: "uppercase",
                  marginBottom: 24,
                }}>
                  {b.sub}
                </p>
                <p style={{
                  fontFamily: "Poppins", fontWeight: 300, fontSize: 15,
                  color: "rgba(245,240,232,0.5)", lineHeight: 1.8,
                }}>
                  {b.desc}
                </p>

                {/* Bottom border accent */}
                <div style={{
                  position: "absolute", bottom: 0, left: 0,
                  width: "0%", height: 1,
                  background: "linear-gradient(90deg, #c9a84c, #f0d080)",
                  transition: "width 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                  className="card-bottom-line"
                />
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </div>
    <style>{`
      .card-tilt:hover .card-bottom-line { width: 100% !important; }
    `}</style>
  </section>
);

// ─── Section 4: Cinematic Stat Section ───────────────────────────────────────
const stats = [
  { value: "₹50Cr+", label: "Credit Limit", note: "Dynamic" },
  { value: "1,400+", label: "Airport Lounges", note: "Worldwide" },
  { value: "180", label: "Countries", note: "Zero FX" },
  { value: "24/7", label: "Concierge", note: "Dedicated" },
];

const StatsSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} style={{
      padding: "160px 24px", position: "relative", overflow: "hidden",
    }}>
      {/* BG pattern */}
      <motion.div style={{
        position: "absolute", inset: 0, y: bgY,
        backgroundImage: `
          linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <Reveal>
          <p style={{
            fontFamily: "Poppins", fontSize: 11, fontWeight: 300, color: "#c9a84c",
            letterSpacing: "0.4em", textTransform: "uppercase",
            textAlign: "center", marginBottom: 80,
          }}>
            By the numbers
          </p>
        </Reveal>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 2, background: "rgba(201,168,76,0.05)",
        }}>
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.12}>
              <div style={{
                padding: "60px 40px", background: "#0a0a0a", textAlign: "center",
                position: "relative", overflow: "hidden",
              }}>
                <motion.p
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    fontFamily: "Poppins", fontWeight: 700,
                    fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1,
                    marginBottom: 12,
                  }}
                  className="gold-gradient"
                >
                  {s.value}
                </motion.p>
                <p style={{
                  fontFamily: "Poppins", fontWeight: 500, fontSize: 16,
                  color: "#f5f0e8", marginBottom: 4,
                }}>
                  {s.label}
                </p>
                <p style={{
                  fontFamily: "Poppins", fontWeight: 300, fontSize: 11,
                  color: "rgba(245,240,232,0.3)", letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}>
                  {s.note}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Section 5: Split Storytelling ───────────────────────────────────────────
const stories = [
  {
    eyebrow: "Power",
    title: "Command your finances from anywhere on Earth.",
    body: "Real-time portfolio overview. Instant transfers. One-tap settlements. Your financial empire, governed from the palm of your hand.",
    accent: "Total control. Zero compromise.",
    align: "left",
  },
  {
    eyebrow: "Prestige",
    title: "Access that money can't buy. Only earn.",
    body: "Invitations to curated events, private dinners with industry leaders, and first-look access to luxury launches — reserved for those who qualify.",
    accent: "Not available. Only obtainable.",
    align: "right",
  },
  {
    eyebrow: "Legacy",
    title: "Build something that outlasts the moment.",
    body: "Multi-generational wealth planning. Succession strategies. A platform designed not just for your success, but for what you leave behind.",
    accent: "Wealth that transcends generations.",
    align: "left",
  },
];

const StorySection = () => (
  <section style={{ padding: "80px 24px 160px", position: "relative" }}>
    <div style={{ maxWidth: 1280, margin: "0 auto" }}>
      {stories.map((story, i) => (
        <Reveal key={story.eyebrow} delay={0.1}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            padding: "100px 0",
            borderBottom: i < stories.length - 1 ? "1px solid rgba(201,168,76,0.06)" : "none",
            alignItems: "center",
          }}
            className="story-grid"
          >
            {/* Text side */}
            <div style={{ order: story.align === "right" ? 2 : 0 }}>
              <p style={{
                fontFamily: "Poppins", fontSize: 11, fontWeight: 300, color: "#c9a84c",
                letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: 28,
              }}>
                {story.eyebrow}
              </p>
              <h3 style={{
                fontFamily: "Poppins", fontWeight: 300,
                fontSize: "clamp(28px, 3.5vw, 52px)", lineHeight: 1.2,
                color: "#f5f0e8", marginBottom: 28,
              }}>
                <StaggerText text={story.title} />
              </h3>
              <p style={{
                fontFamily: "Poppins", fontWeight: 300, fontSize: 17,
                color: "rgba(245,240,232,0.45)", lineHeight: 1.9, marginBottom: 36,
                maxWidth: 480,
              }}>
                {story.body}
              </p>
              <p style={{
                fontFamily: "Poppins", fontWeight: 500, fontSize: 15,
                color: "#c9a84c", letterSpacing: "0.05em",
              }}>
                — {story.accent}
              </p>
            </div>

            {/* Visual side */}
            <div style={{ order: story.align === "right" ? 0 : 1, position: "relative" }}>
              <TiltCard style={{ borderRadius: 4 }}>
                <div className="glass" style={{
                  borderRadius: 4, padding: "80px 60px",
                  minHeight: 360, display: "flex", flexDirection: "column",
                  justifyContent: "center", alignItems: "center",
                  position: "relative", overflow: "hidden",
                }}>
                  {/* Decorative element */}
                  <div style={{ position: "relative", marginBottom: 40 }}>
                    <div style={{
                      width: 120, height: 120, borderRadius: "50%",
                      border: "1px solid rgba(201,168,76,0.2)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <div style={{
                        width: 80, height: 80, borderRadius: "50%",
                        border: "1px solid rgba(201,168,76,0.3)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <div style={{
                          width: 40, height: 40, borderRadius: "50%",
                          background: "linear-gradient(135deg, #c9a84c, #f0d080)",
                          boxShadow: "0 0 30px rgba(201,168,76,0.4)",
                        }} />
                      </div>
                    </div>
                  </div>
                  <p style={{
                    fontFamily: "Poppins", fontWeight: 200, fontSize: 22,
                    color: "rgba(245,240,232,0.6)", textAlign: "center", lineHeight: 1.6,
                  }}>
                    {["01", "02", "03"][i]} / {story.eyebrow}
                  </p>
                  {/* Corner accents */}
                  {["top left", "top right", "bottom left", "bottom right"].map((pos) => {
                    const [v, h] = pos.split(" ");
                    return (
                      <div key={pos} style={{
                        position: "absolute", [v]: 20, [h]: 20,
                        width: 20, height: 20,
                        borderTop: v === "top" ? "1px solid rgba(201,168,76,0.4)" : "none",
                        borderBottom: v === "bottom" ? "1px solid rgba(201,168,76,0.4)" : "none",
                        borderLeft: h === "left" ? "1px solid rgba(201,168,76,0.4)" : "none",
                        borderRight: h === "right" ? "1px solid rgba(201,168,76,0.4)" : "none",
                      }} />
                    );
                  })}
                </div>
              </TiltCard>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
    <style>{`
      @media (max-width: 768px) {
        .story-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        .story-grid > div { order: unset !important; }
      }
    `}</style>
  </section>
);

// ─── Section 6: Testimonials / Quotes ────────────────────────────────────────
const quotes = [
  {
    text: "This isn't a credit card. It's a declaration of where I stand.",
    name: "Vikram S.",
    role: "Managing Director, Series D",
  },
  {
    text: "I stopped counting the number of times the concierge saved a deal.",
    name: "Ananya R.",
    role: "Founder, VC-backed fintech",
  },
  {
    text: "The platform treats me the way I treat my clients. With absolute priority.",
    name: "Rohan M.",
    role: "CEO, Global Consulting Group",
  },
];

const QuotesSection = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % quotes.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section style={{
      padding: "140px 24px", position: "relative",
      borderTop: "1px solid rgba(201,168,76,0.06)",
    }}>
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: 1, height: "100%", background: "rgba(201,168,76,0.06)",
      }} />

      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
        <Reveal>
          <p style={{
            fontFamily: "Poppins", fontSize: 11, fontWeight: 300, color: "#c9a84c",
            letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: 80,
          }}>
            Voices of authority
          </p>
        </Reveal>

        <div style={{ position: "relative", minHeight: 200 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div style={{ marginBottom: 16 }}>
                {[0, 1, 2].map((s) => (
                  <span key={s} style={{
                    color: "#c9a84c", fontSize: 28, marginRight: 4,
                    filter: "drop-shadow(0 0 8px rgba(201,168,76,0.5))",
                  }}>★</span>
                ))}
              </div>
              <p style={{
                fontFamily: "Poppins", fontWeight: 200,
                fontSize: "clamp(22px, 3.5vw, 42px)", lineHeight: 1.5,
                color: "#f5f0e8", marginBottom: 48, fontStyle: "italic",
              }}>
                "{quotes[active].text}"
              </p>
              <div style={{
                display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 6,
              }}>
                <div style={{ width: 40, height: 1, background: "rgba(201,168,76,0.4)", marginBottom: 12 }} />
                <p style={{
                  fontFamily: "Poppins", fontWeight: 500, fontSize: 15, color: "#f5f0e8",
                }}>
                  {quotes[active].name}
                </p>
                <p style={{
                  fontFamily: "Poppins", fontWeight: 300, fontSize: 12,
                  color: "rgba(245,240,232,0.35)", letterSpacing: "0.1em",
                }}>
                  {quotes[active].role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 60 }}>
          {quotes.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setActive(i)}
              animate={{
                width: i === active ? 40 : 8,
                background: i === active ? "#c9a84c" : "rgba(245,240,232,0.15)",
              }}
              transition={{ duration: 0.3 }}
              style={{
                height: 2, borderRadius: 2, border: "none", cursor: "pointer", padding: 0,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Section 7: CTA ───────────────────────────────────────────────────────────
const CTASection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section ref={ref} style={{ padding: "80px 24px 160px", position: "relative" }}>
      <motion.div style={{ scale, opacity, maxWidth: 1100, margin: "0 auto" }}>
        <TiltCard style={{ borderRadius: 6 }}>
          <div style={{
            borderRadius: 6, padding: "clamp(60px, 8vw, 120px) clamp(40px, 6vw, 100px)",
            position: "relative", overflow: "hidden",
            background: "linear-gradient(135deg, #0f0f0f 0%, #141414 50%, #0a0a0a 100%)",
            border: "1px solid rgba(201,168,76,0.15)",
            animation: "borderShimmer 4s ease-in-out infinite",
          }}>
            {/* BG radial */}
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%,-50%)",
              width: "80%", height: "80%", borderRadius: "50%",
              background: "radial-gradient(ellipse, rgba(201,168,76,0.08), transparent 70%)",
              pointerEvents: "none",
            }} />

            {/* Decorative corners */}
            {[["top", "left"], ["top", "right"], ["bottom", "left"], ["bottom", "right"]].map(([v, h]) => (
              <div key={`${v}${h}`} style={{
                position: "absolute", [v]: 32, [h]: 32,
                width: 50, height: 50,
                borderTop: v === "top" ? "1px solid rgba(201,168,76,0.3)" : "none",
                borderBottom: v === "bottom" ? "1px solid rgba(201,168,76,0.3)" : "none",
                borderLeft: h === "left" ? "1px solid rgba(201,168,76,0.3)" : "none",
                borderRight: h === "right" ? "1px solid rgba(201,168,76,0.3)" : "none",
              }} />
            ))}

            <div style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
              <Reveal>
                <p style={{
                  fontFamily: "Poppins", fontSize: 11, fontWeight: 300, color: "#c9a84c",
                  letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: 32,
                }}>
                  The Beginning
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <h2 style={{
                  fontFamily: "Poppins", fontWeight: 200,
                  fontSize: "clamp(36px, 6vw, 80px)", lineHeight: 1.15,
                  color: "#f5f0e8", marginBottom: 12,
                }}>
                  You belong
                </h2>
              </Reveal>

              <Reveal delay={0.25}>
                <h2 style={{
                  fontFamily: "Poppins", fontWeight: 700,
                  fontSize: "clamp(36px, 6vw, 80px)", lineHeight: 1.15,
                  marginBottom: 40,
                }}>
                  <span className="shimmer-text">at the top.</span>
                </h2>
              </Reveal>

              <Reveal delay={0.35}>
                <p style={{
                  fontFamily: "Poppins", fontWeight: 300, fontSize: 18,
                  color: "rgba(245,240,232,0.45)", maxWidth: 560, margin: "0 auto 60px",
                  lineHeight: 1.8,
                }}>
                  Join an exclusive network of leaders who refuse to settle.
                  Apply for your invitation today.
                </p>
              </Reveal>

              <Reveal delay={0.45}>
                <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 60px rgba(201,168,76,0.5)" }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      fontFamily: "Poppins", fontWeight: 600, fontSize: 14,
                      letterSpacing: "0.12em", textTransform: "uppercase",
                      padding: "22px 64px", borderRadius: 2, cursor: "pointer", border: "none",
                      background: "linear-gradient(135deg, #c9a84c 0%, #f0d080 50%, #b8882a 100%)",
                      color: "#0a0a0a",
                    }}
                  >
                    Request Invitation
                  </motion.button>
                </div>
              </Reveal>

              <Reveal delay={0.55}>
                <p style={{
                  fontFamily: "Poppins", fontWeight: 300, fontSize: 12,
                  color: "rgba(245,240,232,0.2)", letterSpacing: "0.1em",
                  marginTop: 28, textTransform: "uppercase",
                }}>
                  Invite-only · Limited availability · CEO verified
                </p>
              </Reveal>
            </div>
          </div>
        </TiltCard>
      </motion.div>

      {/* Footer line */}
      <div style={{ textAlign: "center", marginTop: 100 }}>
        <div style={{ width: 1, height: 60, background: "linear-gradient(to bottom, rgba(201,168,76,0.4), transparent)", margin: "0 auto 32px" }} />
        <p style={{
          fontFamily: "Poppins", fontWeight: 300, fontSize: 11,
          color: "rgba(245,240,232,0.2)", letterSpacing: "0.3em", textTransform: "uppercase",
        }}>
          © 2025 · Crafted for those who lead
        </p>
      </div>
    </section>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Benefits() {
  const router = useRouter();

  return (
    <>
      <GlobalStyle />
      <div className="noise-overlay" />
      <Particles />

      <main style={{
        fontFamily: "Poppins, sans-serif",
        background: "#0a0a0a",
        color: "#f5f0e8",
        position: "relative",
        zIndex: 2,
        paddingTop: 92,
      }}>
        <nav
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            padding: "16px 24px",
            background: "rgba(10, 10, 10, 0.72)",
            backdropFilter: "blur(18px)",
            borderBottom: "1px solid rgba(201,168,76,0.14)",
          }}
        >
          <Link href="/home" style={{
            fontSize: 18,
            fontWeight: 600,
            letterSpacing: "0.06em",
            color: "#f5f0e8",
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}>
            CEO Studio
          </Link>

          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            flexWrap: "wrap",
          }}>
            {navItems.map((item) => {
              const isActive = router.pathname === item.href;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  style={{
                    padding: "10px 16px",
                    borderRadius: 999,
                    textDecoration: "none",
                    fontSize: 13,
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: isActive ? "#0a0a0a" : "#f5f0e8",
                    background: isActive ? "#c9a84c" : "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(201,168,76,0.14)",
                    transition: "transform 0.2s ease, background 0.2s ease, color 0.2s ease",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>

        <HeroSection />
        <StatementSection />
        <BenefitsGridSection />
        <StatsSection />
        <StorySection />
        <QuotesSection />
        <CTASection />
      </main>
    </>
  );
}
