import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const GOLD = "#c9a84c";
const BG = "#050505";
const TEXT = "#f5f0e8";

const premiumBenefits = [
  { id: "01", category: "LIQUIDITY STATUS", title: "Uncapped Dynamic Credit Line", desc: "Real-time automated capital deployment loops with a baseline limit framework matching ₹50Cr+ scaling thresholds." },
  { id: "02", category: "PHYSICAL TRANSIT", title: "Sovereign Airport Lounge Core", desc: "Completely frictionless door-to-gate premium diplomatic transit coverage across 1,400+ international hubs." },
  { id: "03", category: "SHIELD MATRIX", title: "Dedicated Generational Wealth Guard", desc: "Direct hardware-level encryption channels to vetted premium execution partners globally 24/7." }
];

const DesignSystemOverride = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Inter:wght@200;300;400;500&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body, html { background-color: ${BG}; color: ${TEXT}; font-family: 'Inter', sans-serif; margin: 0; padding: 0; overflow-x: hidden; }
    .serif-text { font-family: 'Cinzel', serif; letter-spacing: -0.01em; }
    .mono-tag { font-family: monospace; font-size: 11px; letter-spacing: 0.3em; color: ${GOLD}; text-transform: uppercase; }
    ::-webkit-scrollbar { width: 3px; } ::-webkit-scrollbar-thumb { background: ${GOLD}; }
    
    .scene-viewport { perspective: 2000px; transform-style: preserve-3d; }
    .monolith-halves { transform-style: preserve-3d; }
    .premium-card {
      transform-style: preserve-3d;
      background: linear-gradient(135deg, #141414 0%, #0a0a0a 100%);
      border: 1px solid rgba(201, 168, 76, 0.4);
      box-shadow: 0 50px 100px rgba(0,0,0,0.95), inset 0 0 40px rgba(201,168,76,0.12);
    }
  `}</style>
);

export default function SovereignMembershipExperience() {
  const scrollWrapperRef = useRef(null);
  const [activeTextSection, setActiveTextSection] = useState(-1);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: scrollWrapperRef,
    offset: ["start start", "end end"]
  });

  // 1. Vault Cleaving Mechanics (Left and Right Vault Pieces Slide Apart)
  const leftVaultX = useTransform(scrollYProgress, [0, 0.35], [0, -320]);
  const rightVaultX = useTransform(scrollYProgress, [0, 0.35], [0, 320]);
  const vaultZ = useTransform(scrollYProgress, [0, 0.35], [0, -200]);
  const vaultOpacity = useTransform(scrollYProgress, [0.35, 0.65], [1, 0]);

  // 2. High-Divergence Card Escape Vectors (Breaks forward through the void)
  const cardZ = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.85], [-400, -100, 350, 400]);
  const cardY = useTransform(scrollYProgress, [0, 0.5, 0.85], [0, -80, -30]);
  const cardX = useTransform(scrollYProgress, [0.45, 0.75], [0, -360]);
  const cardScale = useTransform(scrollYProgress, [0, 0.5], [0.65, 1.1]);

  // Cinematic Continuous Angular Rotations (flips smoothly over time)
  const cardRotateY = useTransform(scrollYProgress, [0, 0.25, 0.6, 0.95], [-45, 0, 360, 390]);
  const cardRotateX = useTransform(scrollYProgress, [0, 0.5], [25, 12]);

  useEffect(() => {
    const trackMouse = (e) => {
      setMousePos({
        x: (e.clientX - window.innerWidth / 2) * 0.04,
        y: (e.clientY - window.innerHeight / 2) * 0.04
      });
    };
    window.addEventListener("mousemove", trackMouse);
    return () => window.removeEventListener("mousemove", trackMouse);
  }, []);

  useEffect(() => {
    return scrollYProgress.onChange((latestValue) => {
      if (latestValue > 0.25 && latestValue <= 0.48) setActiveTextSection(0);
      else if (latestValue > 0.48 && latestValue <= 0.72) setActiveTextSection(1);
      else if (latestValue > 0.72) setActiveTextSection(2);
      else setActiveTextSection(-1);
    });
  }, [scrollYProgress]);

  return (
    <>
      <DesignSystemOverride />
      
      <main ref={scrollWrapperRef} style={{ position: "relative", height: "450vh", backgroundColor: BG }}>
        
        {/* Navigation bar */}
        <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "28px 8%", background: "linear-gradient(to bottom, rgba(5,5,5,0.85) 0%, transparent 100%)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(201,168,76,0.08)" }}>
          <Link href="/home" className="serif-text" style={{ fontSize: 16, fontWeight: 600, letterSpacing: "0.2em", color: TEXT, textDecoration: "none", textTransform: "uppercase" }}>
            CEO <span style={{ color: GOLD }}>STUDIO</span>
          </Link>
          <div style={{ display: "flex", gap: 40 }}>
            {["Home", "About", "Benefits", "Contact"].map((item) => (
              <span key={item} style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(245,240,232,0.4)" }}>{item}</span>
            ))}
          </div>
        </nav>

        {/* PERSISTENT 3D PERSPECTIVE VIEWPORT */}
        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 2, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", pointerEvents: "none" }} className="scene-viewport">
          
          <motion.div 
            style={{ 
              position: "relative", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              transformStyle: "preserve-3d",
              rotateX: mousePos.y,
              rotateY: mousePos.x
            }}
          >
            
            {/* THE MONOLITHIC SHATTER VAULT PARTITIONS */}
            <motion.div style={{ position: "absolute", width: 500, height: 320, zOffset: vaultZ, opacity: vaultOpacity, transformStyle: "preserve-3d" }} className="monolith-halves">
              
              {/* Left Cleaving Structural Segment */}
              <motion.div 
                style={{ 
                  position: "absolute", left: 0, top: 0, width: "250px", height: "100%", 
                  background: "linear-gradient(135deg, #111111 0%, #080808 100%)", 
                  border: "1px solid rgba(255,255,255,0.03)", borderRight: `1px solid ${GOLD}`,
                  boxShadow: "-30px 40px 70px rgba(0,0,0,0.8)", x: leftVaultX,
                  display: "flex", alignItems: "center", justifyContent: "flex-end", overflow: "hidden"
                }}
              >
                <div className="serif-text" style={{ fontSize: 12, color: GOLD, letterSpacing: "0.25em", transform: "translateX(45px)", whiteSpace: "nowrap", opacity: 0.8 }}>CEO ARCHI</div>
              </motion.div>

              {/* Right Cleaving Structural Segment */}
              <motion.div 
                style={{ 
                  position: "absolute", right: 0, top: 0, width: "250px", height: "100%", 
                  background: "linear-gradient(135deg, #0d0d0d 0%, #050505 100%)", 
                  border: "1px solid rgba(255,255,255,0.03)", borderLeft: "none",
                  boxShadow: "30px 40px 70px rgba(0,0,0,0.8)", x: rightVaultX,
                  display: "flex", alignItems: "center", justifyContent: "flex-start", overflow: "hidden"
                }}
              >
                <div className="serif-text" style={{ fontSize: 12, color: GOLD, letterSpacing: "0.25em", transform: "translateX(-45px)", whiteSpace: "nowrap", opacity: 0.8 }}>TECTURE</div>
              </motion.div>

            </motion.div>

            {/* THE INTENSE LEVITATING EXPERIENCE CORE CARD */}
            <motion.div
              style={{
                width: 380,
                height: 240,
                borderRadius: 12,
                x: cardX,
                y: cardY,
                z: cardZ,
                scale: cardScale,
                rotateY: cardRotateY,
                rotateX: cardRotateX,
                position: "absolute",
                zIndex: 4
              }}
              className="premium-card"
            >
              {/* Premium Card Surface Detailing */}
              <div style={{ position: "absolute", inset: 14, border: "1px solid rgba(201,168,76,0.25)", borderRadius: 8, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 20, background: "rgba(0,0,0,0.4)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <span className="serif-text" style={{ fontSize: 14, color: GOLD, fontWeight: 600, letterSpacing: "0.05em" }}>CEO ALPHA</span>
                  <span style={{ fontSize: 9, fontFamily: "monospace", color: "rgba(245,240,232,0.3)" }}>// CORE SUBSYSTEM</span>
                </div>
                
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                  <div>
                    <div style={{ fontSize: 8, color: "rgba(245,240,232,0.3)", fontFamily: "monospace", letterSpacing: "0.1em", marginBottom: 4 }}>METRIC INTERACTION LAYER</div>
                    <div style={{ fontSize: 14, letterSpacing: "0.1em", fontWeight: 400, color: TEXT, fontFamily: "monospace" }}>SOVEREIGN COHORT</div>
                  </div>
                  <div style={{ fontSize: 24, color: GOLD, textShadow: "0 0 15px rgba(201,168,76,0.6)" }}>✦</div>
                </div>
              </div>
            </motion.div>

          </motion.div>

        </div>

        {/* OVERLAY TIMELINE TEXT SCROLL TRIGGERS */}
        <div style={{ position: "relative", zIndex: 5, pointerEvents: "none" }}>
          
          {/* Section 0: Landing Title Component */}
          <div style={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 8%" }}>
            <span className="mono-tag" style={{ display: "block", marginBottom: 16 }}>SYSTEM ORIGIN MATRIX INITIALIZATION</span>
            <h1 className="serif-text" style={{ fontSize: "clamp(42px, 6vw, 92px)", fontWeight: 400, lineHeight: 1.0, textTransform: "uppercase" }}>
              UNVEILING THE <br />
              <span style={{ fontWeight: 600 }} className="serif-text">SOVEREIGN CORE.</span>
            </h1>
            <p style={{ fontSize: 15, fontWeight: 200, color: "rgba(245,240,232,0.4)", marginTop: 24, maxWidth: 450, lineHeight: 1.6 }}>
              Engage vertical tracking navigation loops to fracture the outer structural shell architecture.
            </p>
          </div>

          {/* Sequential Core Narrative Injection Triggers */}
          <div style={{ height: "350vh", position: "relative" }}>
            <AnimatePresence mode="wait">
              {activeTextSection !== -1 && (
                <motion.div
                  key={activeTextSection}
                  initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -40, filter: "blur(10px)" }}
                  transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                  style={{
                    position: "fixed",
                    top: "38%",
                    right: "8%",
                    width: "min(460px, 85vw)",
                    pointerEvents: "auto"
                  }}
                >
                  <span className="mono-tag">0{premiumBenefits[activeTextSection].id} // VECTOR CAPABILITIES</span>
                  <h2 className="serif-text" style={{ fontSize: "clamp(24px, 2.5vw, 40px)", fontWeight: 400, color: TEXT, margin: "14px 0 20px" }}>
                    {premiumBenefits[activeTextSection].title}
                  </h2>
                  <p style={{ fontSize: 15, color: "rgba(245,240,232,0.45)", lineHeight: 1.8, fontWeight: 200 }}>
                    {premiumBenefits[activeTextSection].desc}
                  </p>

                  <div style={{ marginTop: 35, width: "80px", height: "1px", backgroundColor: GOLD }} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Ambient Dark Bottom Boundary Frame */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "140px", background: `linear-gradient(to top, ${BG}, transparent)`, zIndex: 10, pointerEvents: "none" }} />
      </main>
    </>
  );
}