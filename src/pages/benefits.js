import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, useScroll, useTransform, useInView, AnimatePresence, useSpring } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Constants & Data ─────────────────────────────────────────────────────────
const GOLD = "#c9a84c";
const BG = "#0a0a0a";
const TEXT = "#f5f0e8";
const EASE = [0.16, 1, 0.3, 1];

const navItems = [
  { label: "Home", href: "/home" },
  { label: "About", href: "/about" },
  { label: "Benefits", href: "/benefits" },
  { label: "Contact", href: "/contact" },
];

const stats = [
  { value: "₹50Cr+", label: "Credit Limit", note: "Dynamic" },
  { value: "1,400+", label: "Airport Lounges", note: "Worldwide" },
  { value: "180", label: "Countries", note: "Zero FX" },
  { value: "24/7", label: "Concierge", note: "Dedicated" },
];

const stories = [
  { eyebrow: "Power", title: "Command your finances from anywhere on Earth.", body: "Real-time portfolio overview. Instant transfers. One-tap settlements. Your financial empire, governed from the palm of your hand.", accent: "Total control. Zero compromise.", align: "left" },
  { eyebrow: "Prestige", title: "Access that money can't buy. Only earn.", body: "Invitations to curated events, private dinners with industry leaders, and first-look access to luxury launches — reserved for those who qualify.", accent: "Not available. Only obtainable.", align: "right" },
  { eyebrow: "Legacy", title: "Build something that outlasts the moment.", body: "Multi-generational wealth planning. Succession strategies. A platform designed not just for your success, but for what you leave behind.", accent: "Wealth that transcends generations.", align: "left" },
  { eyebrow: "Security", title: "Fortified architecture for absolute peace of mind.", body: "Military-grade encryption. Institutional storage. Your assets are shielded by the most advanced security protocols ever deployed in personal finance.", accent: "Impenetrable. Invulnerable.", align: "right" },
];

const quotes = [
  { text: "This isn't a credit card. It's a declaration of where I stand.", name: "Vikram S.", role: "Managing Director, Series D" },
  { text: "I stopped counting the number of times the concierge saved a deal.", name: "Ananya R.", role: "Founder, VC-backed fintech" },
  { text: "The platform treats me the way I treat my clients. With absolute priority.", name: "Rohan M.", role: "CEO, Global Consulting Group" },
];

const storySlides = [
  { id: "01", img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=2000", giantText: "Private Wealth", title: "Relationship First", desc: "A dedicated relationship manager available 24/7. No queues. No bots. Direct access to the financial minds that matter.", features: ["Bespoke Strategy", "Direct Access", "24/7 Advisory"] },
  { id: "02", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000", giantText: "Zero Limits", title: "Spend Without Boundaries", desc: "Dynamic credit limits that scale with your ambition. Pre-approved across 180 countries with zero foreign transaction friction.", features: ["Dynamic Limits", "Zero FX Friction", "Global Acceptance"] },
  { id: "03", img: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?auto=format&fit=crop&q=80&w=2000", giantText: "Jet Access", title: "First Class, Always", desc: "Complimentary lounge access across 1,400+ airports. Priority boarding. A travel experience that mirrors your status.", features: ["1,400+ Lounges", "Priority Boarding", "Concierge Assist"] },
  { id: "04", img: "https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&q=80&w=2000", giantText: "Legacy Guard", title: "Protection at Scale", desc: "Comprehensive protection for you, your family, and your assets. Estate planning, insurance architecture, and risk shielding.", features: ["Asset Shielding", "Estate Planning", "Generational Wealth"] },
];

// ─── Global Styles ────────────────────────────────────────────────────────────
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body, #root { font-family: 'Poppins', sans-serif; background: #0a0a0a; color: #f5f0e8; overflow-x: hidden; }
    ::-webkit-scrollbar { width: 3px; } ::-webkit-scrollbar-track { background: #0a0a0a; } ::-webkit-scrollbar-thumb { background: #c9a84c; border-radius: 2px; }
    ::selection { background: rgba(201,168,76,0.3); color: #f5f0e8; }
    .gold { color: #c9a84c; }
    .gold-gradient { background: linear-gradient(135deg,#c9a84c 0%,#f0d080 40%,#b8882a 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
    .glass { background: rgba(255,255,255,0.03); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(201,168,76,0.12); }
    .noise-overlay { position: fixed; inset: 0; pointer-events: none; z-index: 9999; opacity: 0.035; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }
    @keyframes glowPulse { 0%,100%{box-shadow:0 0 20px rgba(201,168,76,0.2),0 0 60px rgba(201,168,76,0.05)} 50%{box-shadow:0 0 40px rgba(201,168,76,0.4),0 0 100px rgba(201,168,76,0.15)} }
    @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
    @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    @keyframes spin-reverse { from{transform:rotate(360deg)} to{transform:rotate(0deg)} }
    @keyframes particle-drift { 0%{transform:translateY(100vh) translateX(0) scale(0);opacity:0} 10%{opacity:1} 90%{opacity:0.6} 100%{transform:translateY(-100px) translateX(var(--drift)) scale(1);opacity:0} }
    @keyframes borderShimmer { 0%,100%{border-color:rgba(201,168,76,0.1)} 50%{border-color:rgba(201,168,76,0.4)} }
    .card-tilt { transform-style:preserve-3d; transition:transform 0.4s cubic-bezier(0.23,1,0.32,1),box-shadow 0.4s ease; }
    .card-tilt:hover { box-shadow:0 30px 80px rgba(201,168,76,0.15),0 0 0 1px rgba(201,168,76,0.2); }
    .shimmer-text { background:linear-gradient(90deg,#c9a84c 0%,#f0d080 25%,#fff8e7 50%,#f0d080 75%,#c9a84c 100%); background-size:200% auto; -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; animation:shimmer 4s linear infinite; }
    @media (max-width:768px) { .story-grid{grid-template-columns:1fr!important;gap:40px!important;padding:80px 0!important} .story-grid>div:nth-child(2){order:-1!important} }
  `}</style>
);

// ─── Reusable Primitives ──────────────────────────────────────────────────────
const Particles = () => {
  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i, left: `${Math.random() * 100}%`, delay: `${Math.random() * 12}s`,
    duration: `${8 + Math.random() * 12}s`, size: `${1 + Math.random() * 3}px`,
    drift: `${(Math.random() - 0.5) * 200}px`,
  }));
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1, overflow: "hidden" }}>
      {particles.map((p) => (
        <div key={p.id} style={{ position: "absolute", bottom: "-10px", left: p.left, width: p.size, height: p.size, borderRadius: "50%", background: "radial-gradient(circle,#c9a84c,#f0d080)", animation: `particle-drift ${p.duration} ${p.delay} infinite linear`, "--drift": p.drift, boxShadow: "0 0 6px rgba(201,168,76,0.8)" }} />
      ))}
    </div>
  );
};

const Reveal = ({ children, delay = 0, y = 60 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay, ease: EASE }}>
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
        <motion.span key={i} initial={{ opacity: 0, y: 40, rotateX: -30 }} animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}} transition={{ duration: 0.7, delay: delay + i * 0.08, ease: EASE }} style={{ display: "inline-block" }}>{word}</motion.span>
      ))}
    </span>
  );
};

const TiltCard = ({ children, style = {}, className = "" }) => {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const handleMouseMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    setTilt({ x: -((e.clientY - r.top - r.height / 2) / (r.height / 2)) * 8, y: ((e.clientX - r.left - r.width / 2) / (r.width / 2)) * 8 });
  };
  return (
    <motion.div ref={ref} className={`card-tilt ${className}`} onMouseMove={handleMouseMove} onMouseEnter={() => setHovered(true)} onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false); }} animate={{ rotateX: tilt.x, rotateY: tilt.y, scale: hovered ? 1.02 : 1 }} transition={{ type: "spring", stiffness: 300, damping: 30 }} style={{ ...style, perspective: 1000, transformStyle: "preserve-3d" }}>
      {children}
      {hovered && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: "absolute", inset: 0, borderRadius: "inherit", pointerEvents: "none", background: "radial-gradient(circle at 50% 50%,rgba(201,168,76,0.08),transparent 70%)" }} />}
    </motion.div>
  );
};

const Ring = ({ size = 300, opacity = 0.08, speed = "20s", reverse = false }) => (
  <div style={{ width: size, height: size, borderRadius: "50%", border: `1px solid rgba(201,168,76,${opacity})`, animation: `${reverse ? "spin-reverse" : "spin-slow"} ${speed} linear infinite`, position: "absolute" }} />
);

const CornerAccents = ({ color = "rgba(201,168,76,0.4)", inset = 20, size = 20 }) => (
  <>
    {[["top","left"],["top","right"],["bottom","left"],["bottom","right"]].map(([v, h]) => (
      <div key={`${v}${h}`} style={{ position:"absolute", [v]:inset, [h]:inset, width:size, height:size, borderTop:v==="top"?`1px solid ${color}`:"none", borderBottom:v==="bottom"?`1px solid ${color}`:"none", borderLeft:h==="left"?`1px solid ${color}`:"none", borderRight:h==="right"?`1px solid ${color}`:"none" }} />
    ))}
  </>
);

const Eyebrow = ({ children, style = {} }) => (
  <p style={{ fontFamily:"Poppins", fontSize:11, fontWeight:300, color:GOLD, letterSpacing:"0.4em", textTransform:"uppercase", marginBottom:24, ...style }}>{children}</p>
);

const splitTextToSpans = (text) =>
  text.split("").map((char, idx) => (
    <span key={idx} className="char" style={{ display:"inline-block", willChange:"transform, opacity", transformOrigin:"50% 50% -20px" }}>{char === " " ? "\u00A0" : char}</span>
  ));

// ─── Section 1: Hero ──────────────────────────────────────────────────────────
const HeroSection = () => {
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
      <div style={{ position:"sticky", top:0, height:"100vh", display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden", perspective:"1500px", padding:"0 24px" }}>
        <div style={{ position:"absolute", top:"20%", left:"50%", transform:"translateX(-50%)", width:800, height:800, borderRadius:"50%", background:"radial-gradient(circle,rgba(201,168,76,0.06) 0%,transparent 70%)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:0, height:0 }}>
          {[[700,0.04,"40s",false],[500,0.06,"25s",true],[320,0.1,"15s",false]].map(([s,o,sp,r]) => (
            <div key={s} style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)" }}><Ring size={s} opacity={o} speed={sp} reverse={r} /></div>
          ))}
        </div>
        <motion.div style={{ position:"absolute", width:"100%", maxWidth:1050, height:"80vh", background:"linear-gradient(180deg,rgba(15,15,15,0.4) 0%,rgba(0,0,0,0.8) 100%)", borderRadius:32, border:"1px solid rgba(255,255,255,0.02)", boxShadow:"0 40px 100px rgba(0,0,0,0.9)", zIndex:1, opacity:layerOpacity, scale:layerScale, y:layerY, rotateX:layerRotateX, transformOrigin:"bottom center" }} />
        <motion.div style={{ y, z, opacity, scale, rotateX, rotateY, textAlign:"center", position:"relative", zIndex:2, maxWidth:900, transformStyle:"preserve-3d", transformOrigin:"center center" }}>
          <motion.p initial={{ opacity:0, letterSpacing:"0.5em" }} animate={{ opacity:1, letterSpacing:"0.4em" }} transition={{ duration:1.2, delay:0.2 }} style={{ fontFamily:"Poppins", fontSize:11, fontWeight:300, color:GOLD, letterSpacing:"0.4em", textTransform:"uppercase", marginBottom:32 }}>
            Crafted for the exceptional
          </motion.p>
          <motion.h1 initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.1, delay:0.5 }} style={{ fontFamily:"Poppins", fontWeight:200, lineHeight:1.1, fontSize:"clamp(48px,8vw,110px)", color:TEXT, marginBottom:8 }}>
            <StaggerText text="You've earned" delay={0.4} />
          </motion.h1>
          <motion.h1 style={{ fontFamily:"Poppins", fontWeight:700, lineHeight:1.1, fontSize:"clamp(48px,8vw,110px)", marginBottom:40 }}>
            <span className="shimmer-text"><StaggerText text="more than this." delay={0.7} /></span>
          </motion.h1>
          <Reveal delay={1.1} y={30}>
            <p style={{ fontFamily:"Poppins", fontWeight:300, fontSize:"clamp(16px,2vw,20px)", color:"rgba(245,240,232,0.5)", maxWidth:580, margin:"0 auto 56px", lineHeight:1.8 }}>
              A platform built for those who lead. Where every benefit is a statement, every reward a recognition of your worth.
            </p>
          </Reveal>
          <Reveal delay={1.3}>
            <div style={{ display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap" }}>
              <motion.button whileHover={{ scale:1.04, boxShadow:"0 0 40px rgba(201,168,76,0.4)" }} whileTap={{ scale:0.97 }} style={{ fontFamily:"Poppins", fontWeight:500, fontSize:14, letterSpacing:"0.1em", textTransform:"uppercase", padding:"18px 48px", borderRadius:2, cursor:"pointer", border:"none", background:"linear-gradient(135deg,#c9a84c,#f0d080,#b8882a)", color:BG, animation:"glowPulse 3s ease-in-out infinite" }}>
                Claim Your Benefits
              </motion.button>
              <motion.button whileHover={{ scale:1.04, borderColor:"rgba(201,168,76,0.5)" }} whileTap={{ scale:0.97 }} style={{ fontFamily:"Poppins", fontWeight:300, fontSize:14, letterSpacing:"0.1em", textTransform:"uppercase", padding:"18px 48px", borderRadius:2, cursor:"pointer", background:"transparent", color:TEXT, border:"1px solid rgba(245,240,232,0.2)" }}>
                Learn More
              </motion.button>
            </div>
          </Reveal>
        </motion.div>
        <motion.div style={{ position:"absolute", bottom:48, left:"50%", transform:"translateX(-50%)", opacity:indicatorOpacity }} animate={{ y:[0,10,0] }} transition={{ repeat:Infinity, duration:2, ease:"easeInOut" }}>
          <div style={{ width:1, height:60, background:"linear-gradient(to bottom,transparent,rgba(201,168,76,0.6),transparent)", margin:"0 auto" }} />
        </motion.div>
      </div>
    </section>
  );
};

// ─── Section 2: Statement ─────────────────────────────────────────────────────
const StatementSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 70, damping: 24, mass: 0.35 });
  const x1 = useTransform(smoothProgress, [0, 1], [-50, 50]);
  const x2 = useTransform(smoothProgress, [0, 1], [50, -50]);
  const sectionLift = useTransform(smoothProgress, [0, 0.15], [120, 0]);
  const handoffGlow = useTransform(smoothProgress, [0, 0.2, 0.5, 1], [0, 0.75, 0.5, 0.18]);
  const textOpacity = useTransform(smoothProgress, [0, 0.15, 0.45, 0.65], [0, 1, 1, 0.02]);
  const textScale = useTransform(smoothProgress, [0.45, 0.65], [1, 0.92]);
  const textBlur = useTransform(smoothProgress, [0.45, 0.65], ["blur(0px)", "blur(16px)"]);
  const finalCardText1Opacity = useTransform(smoothProgress, [0, 0.72, 0.82], [1, 1, 0]);
  const finalCardText2Opacity = useTransform(smoothProgress, [0, 0.72, 0.82], [0, 0, 1]);
  const c1Y = useTransform(smoothProgress, [0.30, 0.55, 0.75, 1], [200, 0, 0, 0]);
  const c1Scale = useTransform(smoothProgress, [0.30, 0.55, 0.75, 0.95], [0.95, 1, 1, 1.03]);
  const c1Opacity = useTransform(smoothProgress, [0, 0.30, 0.40, 1], [0, 0, 1, 1]);
  const c2X = useTransform(smoothProgress, [0.22, 0.45, 0.60, 0.75], ["-60vw","-22vw","-5vw","0vw"]);
  const c2Y = useTransform(smoothProgress, [0.22, 0.45, 0.60, 0.75], ["-40vh","-15vh","-5vh","0vh"]);
  const c2Rot = useTransform(smoothProgress, [0.22, 0.45, 0.60, 0.75], [-3,-1.5,-0.4,0]);
  const c2Opacity = useTransform(smoothProgress, [0, 0.22, 0.30, 0.60, 0.75], [0,0,1,1,0]);
  const c5X = useTransform(smoothProgress, [0.24, 0.47, 0.62, 0.77], ["-50vw","-18vw","-6vw","0vw"]);
  const c5Y = useTransform(smoothProgress, [0.24, 0.47, 0.62, 0.77], ["50vh","22vh","6vh","0vh"]);
  const c5Rot = useTransform(smoothProgress, [0.24, 0.47, 0.62, 0.77], [-2,-1,-0.3,0]);
  const c5Opacity = useTransform(smoothProgress, [0, 0.24, 0.32, 0.62, 0.77], [0,0,1,1,0]);
  const c3X = useTransform(smoothProgress, [0.26, 0.49, 0.64, 0.79], ["60vw","25vw","8vw","0vw"]);
  const c3Y = useTransform(smoothProgress, [0.26, 0.49, 0.64, 0.79], ["40vh","18vh","5vh","0vh"]);
  const c3Rot = useTransform(smoothProgress, [0.26, 0.49, 0.64, 0.79], [2.5,1.2,0.3,0]);
  const c3Opacity = useTransform(smoothProgress, [0, 0.26, 0.34, 0.64, 0.79], [0,0,1,1,0]);
  const c4X = useTransform(smoothProgress, [0.28, 0.51, 0.66, 0.81], ["55vw","18vw","4vw","0vw"]);
  const c4Y = useTransform(smoothProgress, [0.28, 0.51, 0.66, 0.81], ["-50vh","-22vh","-8vh","0vh"]);
  const c4Rot = useTransform(smoothProgress, [0.28, 0.51, 0.66, 0.81], [3.5,1.8,0.5,0]);
  const c4Opacity = useTransform(smoothProgress, [0, 0.28, 0.36, 0.66, 0.81], [0,0,1,1,0]);

  const miniCard = (extra) => ({ position:"absolute", borderRadius:24, backdropFilter:"blur(12px)", WebkitBackdropFilter:"blur(12px)", padding:24, transformStyle:"preserve-3d", backfaceVisibility:"hidden", willChange:"transform, opacity", ...extra });

  return (
    <section ref={ref} style={{ height:"400vh", marginTop:"-10vh", position:"relative", borderTop:"1px solid rgba(201,168,76,0.06)", borderBottom:"1px solid rgba(201,168,76,0.06)", zIndex:1, willChange:"transform" }}>
      <div style={{ position:"sticky", top:0, height:"100vh", overflow:"hidden", display:"flex", alignItems:"center", justifyContent:"center", padding:"0 24px" }}>
        <motion.div aria-hidden="true" style={{ position:"absolute", top:-140, left:"50%", width:"min(980px,92vw)", height:280, transform:"translateX(-50%)", borderRadius:"50%", background:"radial-gradient(ellipse,rgba(201,168,76,0.08) 0%,rgba(10,10,10,0) 72%)", filter:"blur(10px)", opacity:handoffGlow, pointerEvents:"none" }} />
        <motion.div aria-hidden="true" style={{ position:"absolute", inset:"0 0 auto 0", height:240, background:"linear-gradient(180deg,rgba(10,10,10,0.96) 0%,rgba(10,10,10,0.72) 42%,rgba(10,10,10,0) 100%)", opacity:handoffGlow, pointerEvents:"none" }} />
        <motion.div style={{ maxWidth:1200, width:"100%", margin:"0 auto", position:"absolute", zIndex:1, y:sectionLift, opacity:textOpacity, scale:textScale, filter:textBlur, willChange:"transform, opacity, filter" }}>
          <motion.div style={{ x: x1 }}>
            <p style={{ fontFamily:"Poppins", fontWeight:800, fontSize:"clamp(42px,7vw,96px)", lineHeight:1.05, color:"rgba(245,240,232,0.04)", textAlign:"left", whiteSpace:"nowrap", letterSpacing:"-0.02em" }}>EXCELLENCE — PRIVILEGE — PRESTIGE — POWER</p>
          </motion.div>
          <div style={{ padding:"44px 0", textAlign:"center", position:"relative", zIndex:2 }}>
            <Reveal>
              <h2 style={{ fontFamily:"Poppins", fontWeight:200, fontSize:"clamp(28px,4vw,52px)", lineHeight:1.4, color:TEXT, maxWidth:800, margin:"0 auto" }}>
                Not every CEO gets treated like one.<br /><span className="gold-gradient" style={{ fontWeight:600 }}>You will.</span>
              </h2>
            </Reveal>
          </div>
          <motion.div style={{ x: x2 }}>
            <p style={{ fontFamily:"Poppins", fontWeight:800, fontSize:"clamp(42px,7vw,96px)", lineHeight:1.05, color:"rgba(201,168,76,0.04)", textAlign:"right", whiteSpace:"nowrap", letterSpacing:"-0.02em" }}>WEALTH — LUXURY — LEGACY — AUTHORITY</p>
          </motion.div>
        </motion.div>

        <div style={{ position:"absolute", inset:0, zIndex:10, pointerEvents:"none", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <motion.div style={miniCard({ width:230, height:155, background:"linear-gradient(145deg,rgba(30,30,30,0.9),rgba(15,15,15,0.9))", border:"1px solid rgba(255,255,255,0.05)", boxShadow:"0 20px 40px rgba(0,0,0,0.5)", x:c5X, y:c5Y, rotate:c5Rot, opacity:c5Opacity, zIndex:7 })}>
            <p style={{ color:"#888", fontSize:11, fontFamily:"Poppins", letterSpacing:1 }}>GLOBAL ACCESS</p>
            <h4 style={{ color:TEXT, fontSize:16, marginTop:6, fontFamily:"Poppins", fontWeight:400 }}>Borderless Limits</h4>
          </motion.div>
          <motion.div style={miniCard({ width:250, height:185, background:"linear-gradient(135deg,rgba(201,168,76,0.08),rgba(10,10,10,0.8))", border:"1px solid rgba(201,168,76,0.15)", x:c4X, y:c4Y, rotate:c4Rot, opacity:c4Opacity, zIndex:4 })}>
            <p style={{ color:"rgba(201,168,76,0.8)", fontSize:11, fontFamily:"Poppins", letterSpacing:1 }}>PRIVATE EQUITY</p>
            <h4 style={{ color:TEXT, fontSize:18, marginTop:6, fontFamily:"Poppins", fontWeight:300 }}>Exclusive Portfolios</h4>
          </motion.div>
          <motion.div style={miniCard({ width:280, height:170, background:"linear-gradient(145deg,rgba(20,20,20,0.8),rgba(5,5,5,0.9))", border:"1px solid rgba(255,255,255,0.08)", x:c3X, y:c3Y, rotate:c3Rot, opacity:c3Opacity, zIndex:6 })}>
            <p style={{ color:"#888", fontSize:11, fontFamily:"Poppins", letterSpacing:1 }}>LIQUIDITY</p>
            <h4 style={{ color:TEXT, fontSize:19, marginTop:6, fontFamily:"Poppins", fontWeight:300 }}>Instant Settlements</h4>
          </motion.div>
          <motion.div style={miniCard({ width:310, height:210, background:"rgba(25,25,25,0.6)", border:"1px solid rgba(255,255,255,0.06)", boxShadow:"0 30px 60px rgba(0,0,0,0.6)", x:c2X, y:c2Y, rotate:c2Rot, opacity:c2Opacity, zIndex:5, display:"flex", flexDirection:"column" })}>
            <p style={{ color:"#aaa", fontSize:11, fontFamily:"Poppins", letterSpacing:1 }}>CORPORATE</p>
            <h4 style={{ color:TEXT, fontSize:19, marginTop:6, fontFamily:"Poppins", fontWeight:300 }}>Multi-currency IBAN</h4>
            <div style={{ marginTop:"auto", paddingTop:20 }}>
              <div style={{ height:1, background:"rgba(255,255,255,0.1)", width:"100%" }} />
              <p style={{ color:"#666", fontSize:11, marginTop:10, fontFamily:"Poppins" }}>Blockchain Secured</p>
            </div>
          </motion.div>
          <motion.div style={{ position:"absolute", width:"min(90vw,440px)", height:290, borderRadius:24, background:"linear-gradient(145deg,rgba(201,168,76,0.15),rgba(15,15,15,1))", border:"1px solid rgba(201,168,76,0.3)", backdropFilter:"blur(24px)", boxShadow:"0 40px 80px rgba(0,0,0,0.8),inset 0 1px 0 rgba(255,255,255,0.1)", padding:32, display:"flex", flexDirection:"column", justifyContent:"space-between", y:c1Y, scale:c1Scale, opacity:c1Opacity, zIndex:20, pointerEvents:"auto", transformStyle:"preserve-3d", backfaceVisibility:"hidden", willChange:"transform, opacity" }}>
            <div style={{ position:"relative", height:"100%", display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
              <div>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <p style={{ color:"rgba(201,168,76,0.9)", fontSize:12, fontFamily:"Poppins", fontWeight:600, letterSpacing:1.5 }}>PREMIUM ACCOUNT</p>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="rgba(201,168,76,0.8)"/></svg>
                </div>
                <div style={{ position:"relative", marginTop:16 }}>
                  <motion.h3 style={{ color:TEXT, fontSize:32, fontFamily:"Poppins", fontWeight:300, lineHeight:1.2, position:"absolute", top:0, left:0, width:"100%", opacity:finalCardText1Opacity }}>Global Wealth Management</motion.h3>
                  <motion.h3 style={{ color:TEXT, fontSize:32, fontFamily:"Poppins", fontWeight:300, lineHeight:1.2, position:"relative", opacity:finalCardText2Opacity }}>The Future Of Sovereign Finance</motion.h3>
                </div>
              </div>
              <div>
                <p style={{ color:"#aaa", fontSize:13, fontFamily:"Poppins" }}>Available Balance</p>
                <p style={{ color:TEXT, fontSize:28, fontFamily:"Poppins", fontWeight:500, marginTop:4 }}>$2,840,000.00</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ─── Section 3: Benefits Grid (GSAP Pinned) ───────────────────────────────────
const BenefitsGridSection = () => {
  const sectionRef = useRef(null);
  const slideRefs = useRef([]);
  const imageRefs = useRef([]);
  const contentRefs = useRef([]);
  const titleRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      storySlides.forEach((_, i) => {
        if (i === 0) return;
        if (imageRefs.current[i]) gsap.set(imageRefs.current[i], { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" });
        if (contentRefs.current[i]) gsap.set(contentRefs.current[i], { opacity: 0, y: 60 });
        if (titleRefs.current[i]) gsap.set(titleRefs.current[i].querySelectorAll(".char"), { opacity: 0, y: 80, rotationX: -90 });
      });
      const tl = gsap.timeline({ scrollTrigger: { trigger: sectionRef.current, start: "top top", end: `+=${storySlides.length * 100}%`, pin: true, scrub: 1, anticipatePin: 1 } });
      storySlides.forEach((_, i) => {
        if (i === 0) return;
        const stepTl = gsap.timeline();
        const prev = { content: contentRefs.current[i - 1], chars: titleRefs.current[i - 1]?.querySelectorAll(".char") };
        const curr = { image: imageRefs.current[i], content: contentRefs.current[i], chars: titleRefs.current[i]?.querySelectorAll(".char") };
        if (prev.content) stepTl.to(prev.content, { opacity: 0, y: -60, duration: 1 }, 0);
        if (prev.chars?.length) stepTl.to(prev.chars, { opacity: 0, y: -80, rotationX: 90, stagger: 0.02, duration: 0.8 }, 0);
        if (curr.image) stepTl.to(curr.image, { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 1.5, ease: "power2.inOut" }, 0);
        if (curr.content) stepTl.to(curr.content, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, 0.5);
        if (curr.chars?.length) stepTl.to(curr.chars, { opacity: 1, y: 0, rotationX: 0, stagger: 0.03, duration: 1, ease: "back.out(1.5)" }, 0.5);
        tl.add(stepTl);
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ height:"100vh", position:"relative", backgroundColor:"#050505", overflow:"hidden", color:TEXT }}>
      {storySlides.map((slide, i) => (
        <div key={slide.id} ref={(el) => { slideRefs.current[i] = el; }} style={{ position:"absolute", top:0, left:0, width:"100%", height:"100%", display:"flex", zIndex:i }}>
          <div ref={(el) => { imageRefs.current[i] = el; }} style={{ width:"55%", height:"100%", position:"relative", overflow:"hidden", willChange:"clip-path" }}>
            <div style={{ position:"absolute", inset:0, backgroundColor:"#000", opacity:0.2, zIndex:1 }} />
            <img src={slide.img} alt={slide.title} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
          </div>
          <div style={{ width:"45%", height:"100%", display:"flex", flexDirection:"column", justifyContent:"center", padding:"0 6%", position:"relative", zIndex:2 }}>
            <div ref={(el) => { contentRefs.current[i] = el; }} style={{ maxWidth:480, willChange:"transform, opacity" }}>
              <p style={{ fontFamily:"Poppins", fontSize:13, fontWeight:400, color:GOLD, letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:20 }}>{slide.id} - The Suite</p>
              <h3 style={{ fontFamily:"Poppins", fontWeight:300, fontSize:"clamp(32px,3vw,48px)", color:"#ffffff", lineHeight:1.1, marginBottom:24 }}>{slide.title}</h3>
              <p style={{ fontFamily:"Poppins", fontWeight:300, fontSize:16, color:"rgba(245,240,232,0.6)", lineHeight:1.6, marginBottom:40 }}>{slide.desc}</p>
              <ul style={{ listStyle:"none", padding:0, margin:0, display:"flex", flexDirection:"column", gap:16 }}>
                {slide.features.map((feat, idx) => (
                  <li key={idx} style={{ display:"flex", alignItems:"center", fontFamily:"Poppins", fontSize:14, fontWeight:300, color:"rgba(245,240,232,0.8)" }}>
                    <span style={{ color:GOLD, marginRight:16, fontSize:18 }}>✦</span>{feat}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div ref={(el) => { titleRefs.current[i] = el; }} style={{ position:"absolute", bottom:"7%", left:"50%", transform:"translateX(-50%)", zIndex:1, width:"100%", pointerEvents:"none", display:"flex", justifyContent:"center", alignItems:"flex-end", fontFamily:"Poppins, sans-serif", fontWeight:300, fontSize:"clamp(46px,8.5vw,120px)", color:"rgba(255,255,255,0.58)", letterSpacing:"0.08em", lineHeight:0.92, mixBlendMode:"overlay", textShadow:"0px 12px 36px rgba(0,0,0,0.55)", filter:"drop-shadow(0 0 18px rgba(201,168,76,0.12))", perspective:"1000px" }}>
            {splitTextToSpans(slide.giantText)}
          </div>
        </div>
      ))}
    </section>
  );
};

// ─── Section 4: Stats ─────────────────────────────────────────────────────────
const StatsSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  return (
    <section ref={ref} style={{ padding:"120px 24px", position:"relative", overflow:"hidden" }}>
      <motion.div style={{ position:"absolute", inset:0, y:bgY, backgroundImage:`linear-gradient(rgba(201,168,76,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,0.03) 1px,transparent 1px)`, backgroundSize:"80px 80px", pointerEvents:"none" }} />
      <div style={{ maxWidth:1200, margin:"0 auto", position:"relative", zIndex:2 }}>
        <Reveal><Eyebrow style={{ textAlign:"center", marginBottom:56 }}>By the numbers</Eyebrow></Reveal>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:2, background:"rgba(201,168,76,0.05)" }}>
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.12}>
              <div style={{ padding:"48px 32px", background:BG, textAlign:"center", position:"relative", overflow:"hidden" }}>
                <motion.p initial={{ opacity:0, scale:0.5 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }} transition={{ duration:0.8, delay:i*0.15, ease:EASE }} style={{ fontFamily:"Poppins", fontWeight:700, fontSize:"clamp(36px,5vw,64px)", lineHeight:1, marginBottom:12 }} className="gold-gradient">{s.value}</motion.p>
                <p style={{ fontFamily:"Poppins", fontWeight:500, fontSize:16, color:TEXT, marginBottom:4 }}>{s.label}</p>
                <p style={{ fontFamily:"Poppins", fontWeight:300, fontSize:11, color:"rgba(245,240,232,0.3)", letterSpacing:"0.2em", textTransform:"uppercase" }}>{s.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Section 5: Story Split ───────────────────────────────────────────────────
const storyVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (d) => ({ opacity: 1, y: 0, transition: { duration: 1.0, delay: d, ease: EASE } }),
};

const StorySection = () => (
  <section style={{ padding:"96px 24px 120px", position:"relative" }}>
    <div style={{ maxWidth:1280, margin:"0 auto" }}>
      <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:"-100px" }} transition={{ duration:1.6, ease:EASE }} style={{ marginBottom:60 }}>
        <h2 style={{ fontFamily:"Poppins", fontWeight:700, letterSpacing:"0.05em", fontSize:"clamp(36px,6vw,72px)", color:TEXT, textAlign:"center", borderBottom:"1px solid rgba(201,168,76,0.1)", paddingBottom:40, textTransform:"uppercase" }}>Selected Work</h2>
      </motion.div>
      {stories.map((story, i) => {
        const isLeft = story.align === "left";
        const imgVariants = {
          hidden: { opacity: 0.2, clipPath: isLeft ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)", x: isLeft ? 90 : -90, scale: 0.96 },
          visible: { opacity: 1, clipPath: "inset(0 0% 0 0)", x: 0, scale: 1, transition: { duration: 2.2, ease: EASE } },
        };
        return (
          <motion.div key={story.eyebrow} initial="hidden" whileInView="visible" viewport={{ once:true, margin:"-30%" }} style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:56, padding:"120px 0", borderBottom:i<stories.length-1?"1px solid rgba(201,168,76,0.06)":"none", alignItems:"center" }} className="story-grid">
            <div style={{ order: isLeft ? 0 : 2 }}>
              <motion.p custom={0.9} variants={storyVariants} style={{ fontFamily:"Poppins", fontSize:13, fontWeight:500, color:GOLD, letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:20 }}>
                <span style={{ fontSize:24, fontWeight:300, marginRight:12 }}>{["01","02","03","04"][i]}</span>{story.eyebrow}
              </motion.p>
              <motion.h3 custom={1.1} variants={storyVariants} style={{ fontFamily:"Poppins", fontWeight:300, fontSize:"clamp(28px,3.5vw,52px)", lineHeight:1.2, color:TEXT, marginBottom:20 }}>
                <StaggerText text={story.title} delay={1.1} />
              </motion.h3>
              <motion.p custom={1.3} variants={storyVariants} style={{ fontFamily:"Poppins", fontWeight:300, fontSize:17, color:"rgba(245,240,232,0.45)", lineHeight:1.9, marginBottom:24, maxWidth:480 }}>{story.body}</motion.p>
              <motion.div custom={1.5} variants={storyVariants}>
                <p style={{ fontFamily:"Poppins", fontWeight:500, fontSize:15, color:GOLD, letterSpacing:"0.05em", display:"inline-block" }}>— {story.accent}</p>
                <span style={{ marginLeft:32, fontSize:12, textTransform:"uppercase", letterSpacing:"0.1em", borderBottom:"1px solid rgba(201,168,76,0.4)", paddingBottom:4, cursor:"pointer", color:TEXT }}>View Case Study →</span>
              </motion.div>
            </div>
            <motion.div variants={imgVariants} style={{ order: isLeft ? 1 : 0, position:"relative" }}>
              <TiltCard style={{ borderRadius:4 }}>
                <div className="glass" style={{ borderRadius:4, padding:"64px 48px", minHeight:320, display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", position:"relative", overflow:"hidden" }}>
                  <img src="/ceo.png" alt={story.eyebrow} style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", objectPosition:"center", display:"block", transform:"scale(1.02)" }} />
                  <div aria-hidden="true" style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,rgba(10,10,10,0.82) 0%,rgba(10,10,10,0.42) 40%,rgba(10,10,10,0.68) 100%)" }} />
                  <div aria-hidden="true" style={{ position:"absolute", inset:0, background:"radial-gradient(circle at 50% 45%,rgba(201,168,76,0.12) 0%,transparent 40%)", mixBlendMode:"screen" }} />
                  <CornerAccents />
                  <div style={{ position:"relative", zIndex:1, marginTop:"auto", alignSelf:"flex-start" }}>
                    <p style={{ fontFamily:"Poppins", fontWeight:200, fontSize:22, color:"rgba(245,240,232,0.65)", lineHeight:1.6 }}>{story.eyebrow}</p>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  </section>
);

// ─── Section 6: Quotes ────────────────────────────────────────────────────────
const QuotesSection = () => {
  const [active, setActive] = useState(0);
  useEffect(() => { const t = setInterval(() => setActive((a) => (a + 1) % quotes.length), 5000); return () => clearInterval(t); }, []);
  return (
    <section style={{ padding:"100px 24px", position:"relative", borderTop:"1px solid rgba(201,168,76,0.06)" }}>
      <div style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", width:1, height:"100%", background:"rgba(201,168,76,0.06)" }} />
      <div style={{ maxWidth:900, margin:"0 auto", textAlign:"center", position:"relative", zIndex:2 }}>
        <Reveal><Eyebrow style={{ marginBottom:56 }}>Voices of authority</Eyebrow></Reveal>
        <div style={{ position:"relative", minHeight:160 }}>
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity:0, y:30, filter:"blur(10px)" }} animate={{ opacity:1, y:0, filter:"blur(0px)" }} exit={{ opacity:0, y:-30, filter:"blur(10px)" }} transition={{ duration:0.7, ease:EASE }}>
              <div style={{ marginBottom:16 }}>{[0,1,2].map((s) => <span key={s} style={{ color:GOLD, fontSize:28, marginRight:4, filter:"drop-shadow(0 0 8px rgba(201,168,76,0.5))" }}>★</span>)}</div>
              <p style={{ fontFamily:"Poppins", fontWeight:200, fontSize:"clamp(22px,3.5vw,42px)", lineHeight:1.5, color:TEXT, marginBottom:48, fontStyle:"italic" }}>"{quotes[active].text}"</p>
              <div style={{ display:"inline-flex", flexDirection:"column", alignItems:"center", gap:6 }}>
                <div style={{ width:40, height:1, background:"rgba(201,168,76,0.4)", marginBottom:12 }} />
                <p style={{ fontFamily:"Poppins", fontWeight:500, fontSize:15, color:TEXT }}>{quotes[active].name}</p>
                <p style={{ fontFamily:"Poppins", fontWeight:300, fontSize:12, color:"rgba(245,240,232,0.35)", letterSpacing:"0.1em" }}>{quotes[active].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div style={{ display:"flex", gap:12, justifyContent:"center", marginTop:36 }}>
          {quotes.map((_, i) => (
            <motion.button key={i} onClick={() => setActive(i)} animate={{ width:i===active?40:8, background:i===active?GOLD:"rgba(245,240,232,0.15)" }} transition={{ duration:0.3 }} style={{ height:2, borderRadius:2, border:"none", cursor:"pointer", padding:0 }} />
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
    <section ref={ref} style={{ padding:"80px 24px 160px", position:"relative" }}>
      <motion.div style={{ scale, opacity, maxWidth:1100, margin:"0 auto" }}>
        <TiltCard style={{ borderRadius:6 }}>
          <div style={{ borderRadius:6, padding:"clamp(60px,8vw,120px) clamp(40px,6vw,100px)", position:"relative", overflow:"hidden", background:"linear-gradient(135deg,#0f0f0f 0%,#141414 50%,#0a0a0a 100%)", border:"1px solid rgba(201,168,76,0.15)", animation:"borderShimmer 4s ease-in-out infinite" }}>
            <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:"80%", height:"80%", borderRadius:"50%", background:"radial-gradient(ellipse,rgba(201,168,76,0.08),transparent 70%)", pointerEvents:"none" }} />
            <CornerAccents inset={32} size={50} />
            <div style={{ textAlign:"center", position:"relative", zIndex:2 }}>
              <Reveal><Eyebrow style={{ marginBottom:32 }}>The Beginning</Eyebrow></Reveal>
              <Reveal delay={0.15}><h2 style={{ fontFamily:"Poppins", fontWeight:200, fontSize:"clamp(36px,6vw,80px)", lineHeight:1.15, color:TEXT, marginBottom:12 }}>You belong</h2></Reveal>
              <Reveal delay={0.25}><h2 style={{ fontFamily:"Poppins", fontWeight:700, fontSize:"clamp(36px,6vw,80px)", lineHeight:1.15, marginBottom:40 }}><span className="shimmer-text">at the top.</span></h2></Reveal>
              <Reveal delay={0.35}><p style={{ fontFamily:"Poppins", fontWeight:300, fontSize:18, color:"rgba(245,240,232,0.45)", maxWidth:560, margin:"0 auto 60px", lineHeight:1.8 }}>Join an exclusive network of leaders who refuse to settle. Apply for your invitation today.</p></Reveal>
              <Reveal delay={0.45}>
                <div style={{ display:"flex", gap:20, justifyContent:"center", flexWrap:"wrap" }}>
                  <motion.button whileHover={{ scale:1.05, boxShadow:"0 0 60px rgba(201,168,76,0.5)" }} whileTap={{ scale:0.97 }} style={{ fontFamily:"Poppins", fontWeight:600, fontSize:14, letterSpacing:"0.12em", textTransform:"uppercase", padding:"22px 64px", borderRadius:2, cursor:"pointer", border:"none", background:"linear-gradient(135deg,#c9a84c 0%,#f0d080 50%,#b8882a 100%)", color:BG }}>Request Invitation</motion.button>
                </div>
              </Reveal>
              <Reveal delay={0.55}><p style={{ fontFamily:"Poppins", fontWeight:300, fontSize:12, color:"rgba(245,240,232,0.2)", letterSpacing:"0.1em", marginTop:20, textTransform:"uppercase" }}>Invite-only · Limited availability · CEO verified</p></Reveal>
            </div>
          </div>
        </TiltCard>
      </motion.div>
      <div style={{ textAlign:"center", marginTop:100 }}>
        <div style={{ width:1, height:60, background:"linear-gradient(to bottom,rgba(201,168,76,0.4),transparent)", margin:"0 auto 32px" }} />
        <p style={{ fontFamily:"Poppins", fontWeight:300, fontSize:11, color:"rgba(245,240,232,0.2)", letterSpacing:"0.3em", textTransform:"uppercase" }}>© 2025 · Crafted for those who lead</p>
      </div>
    </section>
  );
};

// ─── Root Export ──────────────────────────────────────────────────────────────
export default function Benefits() {
  const router = useRouter();
  return (
    <>
      <GlobalStyle />
      <div className="noise-overlay" />
      <Particles />
      <main style={{ fontFamily:"Poppins, sans-serif", background:BG, color:TEXT, position:"relative", zIndex:2, paddingTop:92 }}>
        <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:1000, display:"flex", alignItems:"center", justifyContent:"space-between", gap:24, padding:"16px 24px", background:"rgba(10,10,10,0.72)", backdropFilter:"blur(18px)", borderBottom:"1px solid rgba(201,168,76,0.14)" }}>
          <Link href="/home" style={{ fontSize:18, fontWeight:600, letterSpacing:"0.06em", color:TEXT, textDecoration:"none", whiteSpace:"nowrap" }}>CEO Studio</Link>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, flexWrap:"wrap" }}>
            {navItems.map((item) => {
              const isActive = router.pathname === item.href;
              return (
                <Link key={item.label} href={item.href} style={{ padding:"10px 16px", borderRadius:999, textDecoration:"none", fontSize:13, fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", color:isActive?BG:TEXT, background:isActive?GOLD:"rgba(255,255,255,0.04)", border:"1px solid rgba(201,168,76,0.14)", transition:"transform 0.2s ease,background 0.2s ease,color 0.2s ease", whiteSpace:"nowrap" }}>{item.label}</Link>
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
