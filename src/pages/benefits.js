import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const GOLD = "#c9a84c";
const BG = "#050505";
const TEXT = "#f5f0e8";

const premiumBenefits = [
  { 
    id: "01", 
    category: "CAPITAL & LIQUIDITY", 
    title: "Strategic Capital Velocity", 
    desc: "Private access to syndicate-level deal flow and closed-door liquidity events reserved exclusively for members scaling to 9-figure valuations." 
  },
  { 
    id: "02", 
    category: "GLOBAL FRONTIERS", 
    title: "Borderless Sovereign Access", 
    desc: "Seamless, frictionless entry into global sovereign networks and elite founder sanctuaries across 1,400+ international nodes." 
  },
  { 
    id: "03", 
    category: "LEGACY ARCHITECTURE", 
    title: "Vetted Executive Safeguards", 
    desc: "Discreet, high-integrity advisory channels connecting you to an untraceable network of generational wealth architects and strategic partners." 
  }
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
      box-shadow: 0 30px 60px rgba(0,0,0,0.85), inset 0 0 30px rgba(201,168,76,0.12);
    }
    .split-layout {
      display: grid;
      grid-template-columns: 55% 45%;
      width: 100%;
      height: 100%;
      padding: 0 5%;
    }
    .text-panel-position {
      position: fixed;
      top: 35%;
      right: 8%;
      width: min(420px, 85vw);
      pointer-events: auto;
      z-index: 6;
    }
    @media (max-width: 768px) {
      .split-layout {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        padding: 0;
      }
      .canvas-container {
        height: 45vh !important;
        margin-top: 5vh;
      }
      .text-panel-position {
        top: auto;
        bottom: 12%;
        left: 5%;
        right: 5%;
        width: 90%;
        margin: 0 auto;
        background: rgba(5, 5, 5, 0.9);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        padding: 24px;
        border-radius: 12px;
        border: 1px solid rgba(201, 168, 76, 0.2);
        box-shadow: 0 20px 40px rgba(0,0,0,0.6);
      }
    }
  `}</style>
);

const SovereignFooter = ({ isMobile }) => (
  <footer style={{ backgroundColor: "#020202", borderTop: "1px solid rgba(201,168,76,0.15)", padding: isMobile ? "60px 24px 40px" : "80px 8% 40px", position: "relative", zIndex: 12 }}>
    <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "center", gap: isMobile ? 40 : 20, marginBottom: 60 }}>
      <div>
        <h3 className="serif-text" style={{ color: GOLD, fontSize: isMobile ? 18 : 22, fontWeight: 400, marginBottom: 12, letterSpacing: "0.05em" }}>SOVEREIGN CORE</h3>
        <p style={{ fontSize: 13, color: "rgba(245,240,232,0.4)", maxWidth: 360, lineHeight: 1.6, fontWeight: 300 }}>
          Admittance is curated strictly by invitation or private institutional nomination.
        </p>
      </div>
      <div style={{ display: "flex", gap: isMobile ? 40 : 60, flexWrap: "wrap" }}>
        <div>
          <div style={{ fontSize: 10, fontFamily: "monospace", color: GOLD, letterSpacing: "0.1em", marginBottom: 16 }}>ENGAGE</div>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12, fontSize: 13, fontWeight: 300 }}>
            <li><a href="#apply" style={{ color: "rgba(245,240,232,0.6)", textDecoration: "none" }}>Apply for Protocol</a></li>
            <li><a href="#verify" style={{ color: "rgba(245,240,232,0.6)", textDecoration: "none" }}>Identity Verification</a></li>
          </ul>
        </div>
        <div>
          <div style={{ fontSize: 10, fontFamily: "monospace", color: GOLD, letterSpacing: "0.1em", marginBottom: 16 }}>LEGAL</div>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12, fontSize: 13, fontWeight: 300 }}>
            <li><a href="#privacy" style={{ color: "rgba(245,240,232,0.6)", textDecoration: "none" }}>Discreet Mandate</a></li>
            <li><a href="#terms" style={{ color: "rgba(245,240,232,0.6)", textDecoration: "none" }}>Terms of Access</a></li>
          </ul>
        </div>
      </div>
    </div>
    
    <div style={{ display: "flex", flexDirection: isMobile ? "column-reverse" : "row", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "center", gap: 20, paddingTop: 30, borderTop: "1px solid rgba(255,255,255,0.03)" }}>
      <span style={{ fontSize: 11, fontFamily: "monospace", color: "rgba(245,240,232,0.25)" }}>© 2026 SOVEREIGN CORE. ALL RIGHTS RESERVED.</span>
      <span className="serif-text" style={{ fontSize: 14, color: GOLD, opacity: 0.5 }}>✦</span>
    </div>
  </footer>
);

export default function SovereignMembershipExperience() {
  const scrollWrapperRef = useRef(null);
  const [activeTextSection, setActiveTextSection] = useState(-1);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: scrollWrapperRef,
    offset: ["start start", "end end"]
  });

  // Balanced Vault Shifts for different screens
  const leftVaultX = useTransform(scrollYProgress, [0, 0.22], [0, isMobile ? -110 : -320]);
  const rightVaultX = useTransform(scrollYProgress, [0, 0.22], [0, isMobile ? 110 : 320]);
  const vaultZ = useTransform(scrollYProgress, [0, 0.22], [0, isMobile ? -100 : -200]);
  
  // Clean canvas fade-outs before reaching the footer boundary
  const vaultOpacity = useTransform(scrollYProgress, [0.2, 0.35], [1, 0]);
  const generalCanvasOpacity = useTransform(scrollYProgress, [0.85, 0.92], [1, 0]);

  // Premium card transition offsets
  const cardZ = useTransform(scrollYProgress, [0, 0.2, 0.45, 0.82], [isMobile ? -400 : -800, -150, 0, 80]);
  const cardY = useTransform(scrollYProgress, [0, 0.45], [isMobile ? -20 : 150, 0]);
  const cardX = useTransform(scrollYProgress, [0, 0.2, 0.45], [isMobile ? 0 : 250, isMobile ? 0 : 120, 0]);
  const cardScale = useTransform(scrollYProgress, [0, 0.18, 0.45], [0.3, 0.75, isMobile ? 0.9 : 1]);

  const cardRotateY = useTransform(scrollYProgress, [0, 0.25, 0.6, 0.9], [-90, -25, 12, isMobile ? 8 : 20]);
  const cardRotateX = useTransform(scrollYProgress, [0, 0.45], [35, 10]);

  useEffect(() => {
    const trackMouse = (e) => {
      if (isMobile) return; 
      setMousePos({
        x: (e.clientX - window.innerWidth / 2) * 0.02,
        y: (e.clientY - window.innerHeight / 2) * 0.02
      });
    };
    window.addEventListener("mousemove", trackMouse);
    return () => window.removeEventListener("mousemove", trackMouse);
  }, [isMobile]);

  useEffect(() => {
    return scrollYProgress.onChange((latestValue) => {
      // End text visibility cleanly at 0.88 to give breathing room for the footer
      if (latestValue > 0.22 && latestValue <= 0.44) setActiveTextSection(0);
      else if (latestValue > 0.44 && latestValue <= 0.66) setActiveTextSection(1);
      else if (latestValue > 0.66 && latestValue <= 0.88) setActiveTextSection(2);
      else setActiveTextSection(-1);
    });
  }, [scrollYProgress]);

  return (
    <>
      <DesignSystemOverride />
      <main ref={scrollWrapperRef} style={{ position: "relative", backgroundColor: BG }}>

        {/* Fixed Visual Canvas Wrapper */}
        <motion.div 
          style={{ 
            position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", 
            zIndex: 2, overflow: "hidden", pointerEvents: "none",
            opacity: generalCanvasOpacity 
          }} 
          className="scene-viewport"
        >
          <div className="split-layout">
            
            {/* Left Box (Desktop) / Interactive Scene Core */}
            <div className="canvas-container" style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative", transformStyle: "preserve-3d", height: "100%" }}>
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
                
                {/* Vault Mechanism */}
                <motion.div 
                  style={{ 
                    position: "absolute", 
                    width: isMobile ? 200 : 400, 
                    height: isMobile ? 130 : 260, 
                    zIndex: 3, 
                    opacity: vaultOpacity, 
                    transformStyle: "preserve-3d", 
                    z: vaultZ 
                  }} 
                  className="monolith-halves"
                >
                  <motion.div 
                    style={{ 
                      position: "absolute", left: 0, top: 0, width: isMobile ? "100px" : "200px", height: "100%", 
                      background: "linear-gradient(135deg, #111111 0%, #080808 100%)", 
                      border: "1px solid rgba(255,255,255,0.03)", borderRight: `1px solid ${GOLD}`,
                      boxShadow: "-20px 30px 50px rgba(0,0,0,0.8)", x: leftVaultX,
                      display: "flex", alignItems: "center", justifyContent: "flex-end", overflow: "hidden"
                    }}
                  >
                    <div className="serif-text" style={{ fontSize: isMobile ? 8 : 11, color: GOLD, letterSpacing: "0.25em", transform: isMobile ? "translateX(24px)" : "translateX(45px)", whiteSpace: "nowrap", opacity: 0.8 }}>CEO ARCHI</div>
                  </motion.div>

                  <motion.div 
                    style={{ 
                      position: "absolute", right: 0, top: 0, width: isMobile ? "100px" : "200px", height: "100%", 
                      background: "linear-gradient(135deg, #0d0d0d 0%, #050505 100%)", 
                      border: "1px solid rgba(255,255,255,0.03)", borderLeft: "none",
                      boxShadow: "20px 30px 50px rgba(0,0,0,0.8)", x: rightVaultX,
                      display: "flex", alignItems: "center", justifyContent: "flex-start", overflow: "hidden"
                    }}
                  >
                    <div className="serif-text" style={{ fontSize: isMobile ? 8 : 11, color: GOLD, letterSpacing: "0.25em", transform: isMobile ? "translateX(-24px)" : "translateX(-45px)", whiteSpace: "nowrap", opacity: 0.8 }}>TECTURE</div>
                  </motion.div>
                </motion.div>

                {/* Premium Card Object */}
                <motion.div
                  style={{
                    width: isMobile ? "260px" : "360px",
                    height: isMobile ? "160px" : "220px",
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
                  <div style={{ position: "absolute", inset: isMobile ? 8 : 12, border: "1px solid rgba(201,168,76,0.25)", borderRadius: 8, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: isMobile ? 12 : 18, background: "rgba(0,0,0,0.5)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <span className="serif-text" style={{ fontSize: isMobile ? 10 : 13, color: GOLD, fontWeight: 600, letterSpacing: "0.05em" }}>SOVEREIGN MEMBER</span>
                      <span style={{ fontSize: 7, fontFamily: "monospace", color: "rgba(245,240,232,0.3)" }}>· PRIVATE</span>
                    </div>
                    
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                      <div>
                        <div style={{ fontSize: 7, color: "rgba(245,240,232,0.3)", fontFamily: "monospace", letterSpacing: "0.1em", marginBottom: 2 }}>STATUS</div>
                        <div style={{ fontSize: isMobile ? 10 : 12, letterSpacing: "0.1em", fontWeight: 400, color: TEXT, fontFamily: "monospace" }}>FOUNDER LEGACY</div>
                      </div>
                      <div style={{ fontSize: isMobile ? 18 : 22, color: GOLD, textShadow: "0 0 12px rgba(201,168,76,0.6)" }}>✦</div>
                    </div>
                  </div>
                </motion.div>

              </motion.div>
            </div>

            {/* Empty placeholder column for layout balance on desktop */}
            {!isMobile && <div style={{ position: "relative" }} />}
          </div>
        </motion.div>

        {/* Scroll Content Track */}
        <div style={{ position: "relative", zIndex: 5, pointerEvents: "none" }}>
          
          {/* Section 1: Hero Block */}
          <div style={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: isMobile ? "flex-end" : "center", padding: isMobile ? "0 8% 15vh" : "0 8%" }}>
            <span className="mono-tag" style={{ display: "block", marginBottom: 12 }}>INVITATION ONLY</span>
            <h1 className="serif-text" style={{ fontSize: "clamp(28px, 5vw, 72px)", fontWeight: 400, lineHeight: 1.1, textTransform: "uppercase" }}>
              THE ARCHITECTURE <br />
              <span style={{ fontWeight: 600 }} className="serif-text">OF INFLUENCE.</span>
            </h1>
            <p style={{ fontSize: isMobile ? 13 : 15, fontWeight: 200, color: "rgba(245,240,232,0.4)", marginTop: 18, maxWidth: 420, lineHeight: 1.6 }}>
              An elite collective for the visionaries defining the next era. Secure your position within the Sovereign Core.
            </p>
          </div>

          {/* Section 2: Features Dynamic Text Track */}
          <div style={{ height: "350vh", position: "relative" }}>
            <AnimatePresence mode="wait">
              {activeTextSection !== -1 && (
                <motion.div
                  key={activeTextSection}
                  initial={{ opacity: 0, y: isMobile ? 15 : 0, x: isMobile ? 0 : 40, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: isMobile ? -15 : 0, x: isMobile ? 0 : -40, filter: "blur(8px)" }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="text-panel-position"
                >
                  <span className="mono-tag">0{premiumBenefits[activeTextSection].id} · {premiumBenefits[activeTextSection].category}</span>
                  <h2 className="serif-text" style={{ fontSize: "clamp(18px, 2vw, 32px)", fontWeight: 400, color: TEXT, margin: "8px 0 12px" }}>
                    {premiumBenefits[activeTextSection].title}
                  </h2>
                  <p style={{ fontSize: isMobile ? 13 : 14, color: "rgba(245,240,232,0.45)", lineHeight: 1.6, fontWeight: 200 }}>
                    {premiumBenefits[activeTextSection].desc}
                  </p>

                  {!isMobile && <div style={{ marginTop: 30, width: "60px", height: "1px", backgroundColor: GOLD }} />}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Ambient section step mask before footer layout */}
        <div style={{ height: "10vh", background: `linear-gradient(to bottom, ${BG}, #020202)`, position: "relative", zIndex: 5 }} />

        {/* Global Footer component */}
        <SovereignFooter isMobile={isMobile} />
      </main>
    </>
  );
}