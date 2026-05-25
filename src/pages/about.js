import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SiteNavbar from "@/components/layout/site-navbar";

const PRINCIPLES = [
  { num: "01", title: "Clarity over noise", body: "We strip away complexity that slows organisations down. Every engagement ends with sharper thinking, not more frameworks." },
  { num: "02", title: "Precision in language", body: "Vague language produces vague decisions. We build shared vocabulary that makes alignment automatic." },
  { num: "03", title: "Rhythm creates momentum", body: "Consistent cadence beats sporadic intensity. We install operating rhythms that compound over time." },
  { num: "04", title: "Leaders shape culture", body: "The way a leader thinks becomes the way a company moves. We work at the source." },
];

const PROCESS = [
  { step: "Diagnose", desc: "A deep-dive into how decisions are actually made — not how they should be made on paper." },
  { step: "Design",   desc: "We build a bespoke operating system: language, cadence, decision architecture." },
  { step: "Install",  desc: "Live sessions with you and your leadership team. We work in the room, not from a deck." },
  { step: "Sustain",  desc: "Quarterly reviews and on-call access. Clarity is a practice, not a one-time event." },
];

const STATS = [
  { value: "12+", label: "Years advising executives" },
  { value: "94%", label: "Client retention rate" },
  { value: "3×",  label: "Average decision velocity" },
];

// ── Spotlight card hook ──────────────────────────────────────────────────────
function useSpotlight(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--sx", `${e.clientX - r.left}px`);
      el.style.setProperty("--sy", `${e.clientY - r.top}px`);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);
}

function PrincipleCard({ p, index, setRef }) {
  const cardRef = useRef(null);
  useSpotlight(cardRef);
  return (
    <div
      ref={(el) => { cardRef.current = el; setRef(el); }}
      className="principle-card"
    >
      <div className="pc-spotlight" />
      <span className="principle-num">{p.num}</span>
      <h3 className="principle-title">{p.title}</h3>
      <p className="principle-body">{p.body}</p>
    </div>
  );
}

export default function About() {
  const rootRef    = useRef(null);
  const canvasRef  = useRef(null);
  const heroRef    = useRef(null);
  const linesRef   = useRef([]);
  const manifestoRef = useRef(null);
  const statsRef   = useRef([]);
  const principlesRef = useRef([]);
  const connLineRef = useRef(null);
  const processRef = useRef([]);
  const ctaRef     = useRef(null);
  const cursorRef  = useRef(null);
  const cursorDotRef = useRef(null);

  // ── Noise canvas orb ──────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf, t = 0;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const { width: w, height: h } = canvas;
      ctx.clearRect(0, 0, w, h);
      t += 0.008;

      // Rotating arcs
      const cx = w / 2, cy = h / 2;
      const maxR = Math.min(w, h) * 0.42;
      for (let i = 0; i < 5; i++) {
        const r = maxR * (0.3 + i * 0.16);
        const start = t * (i % 2 === 0 ? 1 : -1.3) + i;
        const end = start + Math.PI * (0.6 + i * 0.18);
        const alpha = 0.08 + i * 0.04;
        ctx.beginPath();
        ctx.arc(cx, cy, r, start, end);
        ctx.strokeStyle = `rgba(212,175,55,${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Pulsing core glow
      const pulse = 0.5 + 0.5 * Math.sin(t * 2.2);
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR * 0.55);
      grad.addColorStop(0, `rgba(212,175,55,${0.18 + pulse * 0.12})`);
      grad.addColorStop(0.5, `rgba(212,175,55,${0.04 + pulse * 0.04})`);
      grad.addColorStop(1, "rgba(212,175,55,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, maxR * 0.55, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Floating particles
      for (let i = 0; i < 18; i++) {
        const angle = (i / 18) * Math.PI * 2 + t * (i % 3 === 0 ? 0.4 : -0.3);
        const dist = maxR * (0.25 + 0.55 * ((i * 137.5) % 1));
        const px = cx + Math.cos(angle) * dist;
        const py = cy + Math.sin(angle) * dist;
        const a = 0.15 + 0.35 * Math.abs(Math.sin(t + i));
        ctx.beginPath();
        ctx.arc(px, py, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212,175,55,${a})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  // ── GSAP animations ───────────────────────────────────────────────────────
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {

      // Hero lines clip-reveal
      linesRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el,
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1, ease: "power4.out", delay: 0.3 + i * 0.15 }
        );
      });

      // Manifesto word scrub
      if (manifestoRef.current) {
        const words = manifestoRef.current.querySelectorAll(".mw");
        gsap.fromTo(words,
          { opacity: 0.1 },
          { opacity: 1, stagger: 0.035, ease: "none",
            scrollTrigger: { trigger: manifestoRef.current, start: "top 70%", end: "bottom 35%", scrub: 1 } }
        );
      }

      // Stats clip-path fill reveal
      statsRef.current.forEach((el, i) => {
        if (!el) return;
        const fill = el.querySelector(".stat-fill");
        if (!fill) return;
        gsap.fromTo(fill,
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)", duration: 1.2, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 82%", toggleActions: "play none none reverse" },
            delay: i * 0.15 }
        );
      });

      // Principles stagger
      principlesRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el,
          { y: 60, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" },
            delay: i * 0.1 }
        );
      });

      // Process connecting line draw
      if (connLineRef.current) {
        gsap.fromTo(connLineRef.current,
          { scaleY: 0 },
          { scaleY: 1, ease: "none",
            scrollTrigger: { trigger: ".process-list", start: "top 70%", end: "bottom 60%", scrub: 1 } }
        );
      }

      // Process items
      processRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el,
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.7, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" },
            delay: i * 0.1 }
        );
      });

      // CTA
      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current,
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.1, ease: "power3.out",
            scrollTrigger: { trigger: ctaRef.current, start: "top 80%", toggleActions: "play none none reverse" } }
        );
      }

      ScrollTrigger.refresh();
    }, rootRef);
    return () => ctx.revert();
  }, []);

  // ── Magnetic cursor ───────────────────────────────────────────────────────
  useEffect(() => {
    const ring = cursorRef.current;
    const dot  = cursorDotRef.current;
    if (!ring || !dot) return;
    let mx = -100, my = -100, cx = -100, cy = -100, raf;
    const onMove = (e) => { mx = e.clientX; my = e.clientY; };
    window.addEventListener("mousemove", onMove);
    const tick = () => {
      cx += (mx - cx) * 0.1; cy += (my - cy) * 0.1;
      ring.style.transform = `translate(${cx - 22}px,${cy - 22}px)`;
      dot.style.transform  = `translate(${mx - 3}px,${my - 3}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const grow = () => ring.classList.add("cursor-grow");
    const shrink = () => ring.classList.remove("cursor-grow");
    document.querySelectorAll("a,button,.principle-card,.process-item,.stat-card").forEach(el => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  // ── Rotating CTA ring text ────────────────────────────────────────────────
  useEffect(() => {
    const el = document.querySelector(".cta-ring-text");
    if (!el) return;
    let angle = 0, raf;
    const spin = () => { angle += 0.25; el.style.transform = `rotate(${angle}deg)`; raf = requestAnimationFrame(spin); };
    raf = requestAnimationFrame(spin);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div ref={rootRef} className="about-root">
      <style>{STYLES}</style>
      <SiteNavbar />

      {/* Cursor */}
      <div ref={cursorRef} className="cursor-ring" />
      <div ref={cursorDotRef} className="cursor-dot" />

      {/* ── HERO ── */}
      <section ref={heroRef} className="about-hero">
        <div className="hero-left">
          <p className="hero-eyebrow">CEO Studio — About</p>
          <h1 className="hero-headline">
            {["We exist to make", "great leaders", "think clearer."].map((line, i) => (
              <span key={i} className="line-mask">
                <span ref={el => linesRef.current[i] = el} className={`line-inner${i === 1 ? " gold-italic" : ""}`}>
                  {line}
                </span>
              </span>
            ))}
          </h1>
          <p className="hero-sub">
            CEO Studio is the strategic partner for founders and executives who need
            precision, not noise. We work at the leadership layer — where thinking
            becomes culture, and culture becomes execution.
          </p>
          <div className="hero-cta-row">
            <Link href="/contact" className="btn-gold">Work with us</Link>
            <span className="hero-scroll-hint">
              <span className="scroll-label">Scroll to explore</span>
              <span className="scroll-line" />
            </span>
          </div>
        </div>
        <div className="hero-right">
          <canvas ref={canvasRef} className="hero-canvas" />
          <div className="hero-canvas-label">
            <span>Strategic clarity</span>
            <span className="hcl-dot" />
            <span>In motion</span>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="marquee-band" aria-hidden="true">
        <div className="marquee-track">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="marquee-set">
              Clarity&nbsp;·&nbsp;Direction&nbsp;·&nbsp;Execution&nbsp;·&nbsp;Precision&nbsp;·&nbsp;Alignment&nbsp;·&nbsp;Momentum&nbsp;·&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ── MANIFESTO ── */}
      <section className="manifesto-section">
        <div className="manifesto-inner">
          <p className="section-eyebrow">Our Belief</p>
          <p ref={manifestoRef} className="manifesto-text">
            {"The best organisations in the world are not the loudest. They are the most precise. Every word, every decision, every meeting runs on a shared operating system — built by leaders who chose clarity over comfort.".split(" ").map((w, i) => (
              <span key={i} className="mw">{w} </span>
            ))}
          </p>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="stats-section">
        <div className="stats-inner">
          {STATS.map((s, i) => (
            <div key={s.label} ref={el => statsRef.current[i] = el} className="stat-card">
              <div className="stat-num-wrap">
                <span className="stat-outline">{s.value}</span>
                <span className="stat-fill">{s.value}</span>
              </div>
              <p className="stat-label">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRINCIPLES ── */}
      <section className="principles-section">
        <div className="principles-inner">
          <div className="section-header">
            <p className="section-eyebrow">How We Think</p>
            <h2 className="section-title">Four principles<br />we never compromise.</h2>
          </div>
          <div className="principles-grid">
            {PRINCIPLES.map((p, i) => (
              <PrincipleCard key={p.num} p={p} index={i} setRef={el => principlesRef.current[i] = el} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="process-section">
        <div className="process-inner">
          <div className="section-header">
            <p className="section-eyebrow">How We Work</p>
            <h2 className="section-title">A four-stage<br />engagement model.</h2>
          </div>
          <div className="process-list">
            <div ref={connLineRef} className="process-conn-line" />
            {PROCESS.map((p, i) => (
              <div key={p.step} ref={el => processRef.current[i] = el} className="process-item">
                <div className="process-node">
                  <span className="pn-num">{String(i + 1).padStart(2, "0")}</span>
                  <div className="pn-dot" />
                </div>
                <div className="process-content">
                  <h3 className="process-step">{p.step}</h3>
                  <p className="process-desc">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="about-cta">
        <div className="cta-bg-glow" />
        <div ref={ctaRef} className="cta-inner">
          <p className="section-eyebrow">Ready to begin?</p>
          <h2 className="cta-headline">The first conversation<br />is always the most revealing.</h2>
          <p className="cta-sub">No pitch decks. No discovery calls disguised as sales calls. Just a direct conversation about what you are trying to solve.</p>
          <div className="cta-btn-wrap">
            <div className="cta-ring-text-wrap" aria-hidden="true">
              <svg className="cta-ring-text" viewBox="0 0 200 200">
                <defs>
                  <path id="circle-path" d="M 100,100 m -75,0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" />
                </defs>
                <text fontSize="11" fill="rgba(212,175,55,0.55)" letterSpacing="6">
                  <textPath href="#circle-path">START A CONVERSATION · CEO STUDIO · CLARITY · </textPath>
                </text>
              </svg>
            </div>
            <Link href="/contact" className="btn-gold cta-main-btn">Start a conversation</Link>
          </div>
          <Link href="/home" className="btn-outline">Return home</Link>
        </div>
      </section>
    </div>
  );
}

const STYLES = `
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  html,body{background:#070706;color:#F4EFE6;overflow-x:hidden;scroll-behavior:smooth}
  a{text-decoration:none}
  :root{
    --blk:#070706;--gold:#D4AF37;--ivory:#F4EFE6;
    --ivory-lo:rgba(244,239,230,0.52);
    --serif:'Cormorant Garamond',Georgia,serif;
    --mono:'DM Mono',monospace;
  }

  /* CURSOR */
  .cursor-ring{position:fixed;width:44px;height:44px;border:1px solid rgba(212,175,55,0.55);border-radius:50%;pointer-events:none;z-index:9999;top:0;left:0;transition:width .35s,height .35s,background .35s,border-color .35s;will-change:transform}
  .cursor-ring.cursor-grow{width:72px;height:72px;background:rgba(212,175,55,0.07);border-color:var(--gold)}
  .cursor-dot{position:fixed;width:6px;height:6px;background:var(--gold);border-radius:50%;pointer-events:none;z-index:9999;top:0;left:0;will-change:transform}
  @media(hover:none){.cursor-ring,.cursor-dot{display:none}}

  /* ROOT */
  .about-root{position:relative;background:#070706;isolation:isolate}

  /* ── HERO ── */
  .about-hero{
    min-height:100vh;display:grid;grid-template-columns:1fr 1fr;
    align-items:center;padding:120px 7vw 80px;gap:6vw;position:relative;overflow:hidden;
  }
  .hero-left{position:relative;z-index:2}
  .hero-eyebrow{font-family:var(--mono);font-size:.68rem;letter-spacing:.28em;text-transform:uppercase;color:var(--gold);opacity:.72;margin-bottom:2rem}
  .hero-headline{font-family:var(--serif);font-size:clamp(3rem,6.5vw,6.5rem);font-weight:300;line-height:1.02;margin-bottom:2rem;display:flex;flex-direction:column;gap:.1em}
  .line-mask{overflow:hidden;display:block}
  .line-inner{display:block}
  .gold-italic{font-style:italic;color:var(--gold)}
  .hero-sub{font-family:var(--serif);font-size:clamp(.95rem,1.4vw,1.15rem);font-weight:300;line-height:1.85;color:var(--ivory-lo);max-width:480px;margin-bottom:2.5rem}
  .hero-cta-row{display:flex;align-items:center;gap:2.5rem}
  .hero-scroll-hint{display:flex;align-items:center;gap:.8rem}
  .scroll-label{font-family:var(--mono);font-size:.6rem;letter-spacing:.2em;text-transform:uppercase;color:var(--ivory-lo)}
  .scroll-line{width:40px;height:1px;background:linear-gradient(to right,var(--gold),transparent);animation:sline 2s ease-in-out infinite}
  @keyframes sline{0%,100%{opacity:.4;transform:scaleX(1)}50%{opacity:1;transform:scaleX(1.3)}}

  /* Hero canvas */
  .hero-right{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center}
  .hero-canvas{width:100%;max-width:520px;aspect-ratio:1;display:block}
  .hero-canvas-label{display:flex;align-items:center;gap:.7rem;margin-top:1.2rem;font-family:var(--mono);font-size:.62rem;letter-spacing:.18em;text-transform:uppercase;color:var(--ivory-lo)}
  .hcl-dot{width:4px;height:4px;border-radius:50%;background:var(--gold);animation:blink 1.8s ease-in-out infinite}
  @keyframes blink{0%,100%{opacity:.4}50%{opacity:1}}

  /* MARQUEE */
  .marquee-band{overflow:hidden;border-top:1px solid rgba(212,175,55,0.1);border-bottom:1px solid rgba(212,175,55,0.1);padding:1rem 0;background:rgba(212,175,55,0.025)}
  .marquee-track{display:flex;white-space:nowrap;animation:marquee 28s linear infinite}
  .marquee-set{font-family:var(--mono);font-size:.7rem;letter-spacing:.22em;text-transform:uppercase;color:var(--gold);opacity:.5;flex-shrink:0}
  @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}

  /* MANIFESTO */
  .manifesto-section{padding:130px 7vw;border-top:1px solid rgba(212,175,55,0.07)}
  .manifesto-inner{max-width:960px;margin:0 auto}
  .section-eyebrow{font-family:var(--mono);font-size:.64rem;letter-spacing:.26em;text-transform:uppercase;color:var(--gold);opacity:.7;margin-bottom:2rem}
  .manifesto-text{font-family:var(--serif);font-size:clamp(1.6rem,3.2vw,2.8rem);font-weight:300;line-height:1.5;color:var(--ivory)}
  .mw{display:inline;opacity:.1}

  /* STATS */
  .stats-section{padding:80px 7vw;border-top:1px solid rgba(212,175,55,0.08);border-bottom:1px solid rgba(212,175,55,0.08)}
  .stats-inner{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:repeat(3,1fr)}
  .stat-card{padding:3rem 2.5rem;border-right:1px solid rgba(212,175,55,0.1);position:relative;overflow:hidden}
  .stat-card:last-child{border-right:none}
  .stat-num-wrap{position:relative;display:inline-block;margin-bottom:.7rem}
  .stat-outline{font-family:var(--serif);font-size:clamp(3.5rem,6vw,6rem);font-weight:300;line-height:1;-webkit-text-stroke:1px rgba(212,175,55,0.35);color:transparent;display:block}
  .stat-fill{font-family:var(--serif);font-size:clamp(3.5rem,6vw,6rem);font-weight:300;line-height:1;color:var(--gold);position:absolute;inset:0;clip-path:inset(0 100% 0 0);display:block}
  .stat-label{font-family:var(--mono);font-size:.68rem;letter-spacing:.14em;text-transform:uppercase;color:var(--ivory-lo)}

  /* PRINCIPLES */
  .principles-section{padding:130px 7vw}
  .principles-inner{max-width:1200px;margin:0 auto}
  .section-header{margin-bottom:5rem}
  .section-title{font-family:var(--serif);font-size:clamp(2.2rem,4vw,3.8rem);font-weight:300;line-height:1.1;color:var(--ivory);margin-top:1rem}
  .principles-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:rgba(212,175,55,0.1)}
  .principle-card{
    padding:3.2rem 3rem;background:#070706;position:relative;overflow:hidden;
    --sx:50%;--sy:50%;
    transition:background .4s;
  }
  .pc-spotlight{
    position:absolute;inset:0;pointer-events:none;
    background:radial-gradient(circle 220px at var(--sx) var(--sy),rgba(212,175,55,0.09),transparent 70%);
    opacity:0;transition:opacity .4s;
  }
  .principle-card:hover .pc-spotlight{opacity:1}
  .principle-num{display:block;font-family:var(--mono);font-size:.6rem;letter-spacing:.22em;color:var(--gold);opacity:.55;margin-bottom:1.4rem}
  .principle-title{font-family:var(--serif);font-size:clamp(1.3rem,2vw,1.8rem);font-weight:400;color:var(--ivory);margin-bottom:1rem;line-height:1.2}
  .principle-body{font-family:var(--serif);font-size:1rem;font-weight:300;line-height:1.8;color:var(--ivory-lo)}

  /* PROCESS */
  .process-section{padding:130px 7vw;border-top:1px solid rgba(212,175,55,0.08);background:radial-gradient(ellipse at 50% 0%,rgba(212,175,55,0.04) 0%,transparent 55%)}
  .process-inner{max-width:1000px;margin:0 auto}
  .process-list{position:relative;padding-left:3rem;margin-top:0}
  .process-conn-line{position:absolute;left:1.1rem;top:1.5rem;bottom:1.5rem;width:1px;background:linear-gradient(to bottom,var(--gold),rgba(212,175,55,0.1));transform-origin:top;will-change:transform}
  .process-item{display:grid;grid-template-columns:auto 1fr;gap:2.5rem;padding:2.8rem 0;border-bottom:1px solid rgba(212,175,55,0.08);align-items:start;position:relative}
  .process-item:first-child{border-top:1px solid rgba(212,175,55,0.08)}
  .process-node{display:flex;flex-direction:column;align-items:center;gap:.6rem;padding-top:.3rem}
  .pn-num{font-family:var(--mono);font-size:.6rem;letter-spacing:.18em;color:var(--gold);opacity:.5}
  .pn-dot{width:8px;height:8px;border-radius:50%;border:1px solid var(--gold);background:transparent;transition:background .3s}
  .process-item:hover .pn-dot{background:var(--gold)}
  .process-step{font-family:var(--serif);font-size:clamp(1.5rem,2.5vw,2.2rem);font-weight:300;color:var(--ivory);margin-bottom:.6rem;transition:color .3s}
  .process-item:hover .process-step{color:var(--gold)}
  .process-desc{font-family:var(--serif);font-size:1rem;font-weight:300;line-height:1.8;color:var(--ivory-lo);max-width:560px}

  /* CTA */
  .about-cta{position:relative;padding:180px 7vw;display:flex;align-items:center;justify-content:center;overflow:hidden;border-top:1px solid rgba(212,175,55,0.08)}
  .cta-bg-glow{position:absolute;width:800px;height:800px;border-radius:50%;background:radial-gradient(circle,rgba(212,175,55,0.07) 0%,transparent 65%);pointer-events:none;animation:glowPulse 6s ease-in-out infinite}
  @keyframes glowPulse{0%,100%{transform:scale(1);opacity:.6}50%{transform:scale(1.12);opacity:1}}
  .cta-inner{position:relative;z-index:2;text-align:center;max-width:640px;display:flex;flex-direction:column;align-items:center}
  .cta-headline{font-family:var(--serif);font-size:clamp(2.4rem,5vw,4.8rem);font-weight:300;line-height:1.06;color:var(--ivory);margin:1rem 0 1.6rem}
  .cta-sub{font-family:var(--serif);font-size:1.05rem;font-weight:300;line-height:1.8;color:var(--ivory-lo);margin-bottom:3.5rem;max-width:480px}
  .cta-btn-wrap{position:relative;display:flex;align-items:center;justify-content:center;margin-bottom:1.4rem}
  .cta-ring-text-wrap{position:absolute;width:200px;height:200px;pointer-events:none}
  .cta-ring-text{width:200px;height:200px;display:block}
  .cta-main-btn{position:relative;z-index:2}
  .btn-gold{font-family:var(--mono);font-size:.7rem;letter-spacing:.18em;text-transform:uppercase;color:var(--blk);background:var(--gold);padding:1rem 2.6rem;transition:opacity .3s,transform .3s;display:inline-block}
  .btn-gold:hover{opacity:.85;transform:translateY(-1px)}
  .btn-outline{font-family:var(--mono);font-size:.7rem;letter-spacing:.18em;text-transform:uppercase;color:var(--gold);border:1px solid rgba(212,175,55,0.35);padding:.9rem 2.2rem;transition:border-color .3s,transform .3s;display:inline-block}
  .btn-outline:hover{border-color:var(--gold);transform:translateY(-1px)}

  /* RESPONSIVE */
  @media(max-width:900px){
    .about-hero{grid-template-columns:1fr;padding-top:100px}
    .hero-right{display:none}
    .stats-inner{grid-template-columns:1fr}
    .stat-card{border-right:none;border-bottom:1px solid rgba(212,175,55,0.1)}
    .stat-card:last-child{border-bottom:none}
    .principles-grid{grid-template-columns:1fr}
    .process-list{padding-left:2rem}
  }
  @media(max-width:600px){
    .about-hero,.manifesto-section,.principles-section,.process-section{padding-left:1.4rem;padding-right:1.4rem}
    .stats-section,.about-cta{padding-left:1.4rem;padding-right:1.4rem}
    .principle-card{padding:2rem 1.6rem}
    .cta-ring-text-wrap{display:none}
  }
  @media(prefers-reduced-motion:reduce){
    .scroll-line,.cta-bg-glow,.hcl-dot,.marquee-track{animation:none!important}
  }
`;
