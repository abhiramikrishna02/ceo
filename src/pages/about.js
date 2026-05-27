import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PRINCIPLES = [
  { num: "01", title: "Media & Brand Elevation", body: "Gain exclusive access to podcasts, interviews, and media opportunities designed to strengthen your personal brand, increase visibility, and position you as a thought leader in your industry." },
  { num: "02", title: "High-Value Global Connections", body: "Connect with founders, executives, investors, and innovators through a powerful international network that encourages collaboration, partnerships, and long-term business opportunities." },
  { num: "03", title: "Elite Leadership Development", body: "Our mentorship-driven environment equips members with the mind-set, strategies, and leadership skills needed to navigate challenges, inspire teams, and scale impactful ventures." },
  { num: "04", title: "Strategic Investment Access", body: "Access curated investment networks and connect with qualified investors, venture partners, and high-growth business opportunities designed for scalable success." },
];

const STATS = [
  { value: "Global", label: "Entrepreneurial ecosystem" },
  { value: "Elite",  label: "Executive network & mentorship" },
  { value: "Dubai",  label: "Launching soon" },
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
  const ctaRef     = useRef(null);
  const cursorRef  = useRef(null);
  const cursorDotRef = useRef(null);
  const tickerRef  = useRef(null);
  const gapRef     = useRef(null);
  const typeRef    = useRef(null);
  const testiRef   = useRef([]);
  const grainRef   = useRef(null);
  const hScrollRef = useRef(null);
  const hTrackRef  = useRef(null);
  const [score, setScore]   = useState(0);
  const [opened, setOpened] = useState(null);

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

  // ── Horizontal drag ticker ────────────────────────────────────────────────
  useEffect(() => {
    const el = tickerRef.current;
    if (!el) return;
    let isDown = false, startX = 0, scrollLeft = 0;
    el.addEventListener("mousedown", e => { isDown = true; startX = e.pageX - el.offsetLeft; scrollLeft = el.scrollLeft; el.style.cursor = "grabbing"; });
    el.addEventListener("mouseleave", () => { isDown = false; el.style.cursor = "grab"; });
    el.addEventListener("mouseup", () => { isDown = false; el.style.cursor = "grab"; });
    el.addEventListener("mousemove", e => { if (!isDown) return; e.preventDefault(); const x = e.pageX - el.offsetLeft; el.scrollLeft = scrollLeft - (x - startX) * 1.6; });
    // Auto-scroll
    let pos = 0, raf;
    const auto = () => { pos += 0.6; if (pos >= el.scrollWidth / 2) pos = 0; if (!isDown) el.scrollLeft = pos; raf = requestAnimationFrame(auto); };
    raf = requestAnimationFrame(auto);
    return () => cancelAnimationFrame(raf);
  }, []);

  // ── Typewriter quote ──────────────────────────────────────────────────────
  useEffect(() => {
    const el = typeRef.current;
    if (!el) return;
    const text = el.dataset.text || "";
    let triggered = false;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !triggered) {
        triggered = true;
        el.textContent = "";
        let i = 0;
        const type = () => { if (i < text.length) { el.textContent += text[i++]; setTimeout(type, 28); } };
        type();
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // ── 3-D tilt testimonial cards ────────────────────────────────────────────
  useEffect(() => {
    const cards = testiRef.current.filter(Boolean);
    const handlers = cards.map(card => {
      const onMove = (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width  - 0.5;
        const y = (e.clientY - r.top)  / r.height - 0.5;
        card.style.transform = `perspective(600px) rotateY(${x * 14}deg) rotateX(${-y * 10}deg) scale(1.03)`;
        card.querySelector(".testi-shine").style.background =
          `radial-gradient(circle at ${(x+0.5)*100}% ${(y+0.5)*100}%, rgba(212,175,55,0.13), transparent 65%)`;
      };
      const onLeave = () => { card.style.transform = "perspective(600px) rotateY(0) rotateX(0) scale(1)"; card.querySelector(".testi-shine").style.background = "none"; };
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
      return { card, onMove, onLeave };
    });
    // GSAP scroll-in
    cards.forEach((card, i) => {
      gsap.fromTo(card, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: i * 0.12,
        scrollTrigger: { trigger: card, start: "top 88%", toggleActions: "play none none reverse" } });
    });
    // Gap section
    if (gapRef.current) {
      gsap.fromTo(gapRef.current.querySelectorAll(".gap-item"),
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: gapRef.current, start: "top 75%", toggleActions: "play none none reverse" } }
      );
    }
    return () => handlers.forEach(({ card, onMove, onLeave }) => { card.removeEventListener("mousemove", onMove); card.removeEventListener("mouseleave", onLeave); });
  }, []);

  // ── Grain canvas (scroll-velocity reactive) ──────────────────────────────
  useEffect(() => {
    const canvas = grainRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let lastY = window.scrollY, velocity = 0, raf;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const draw = () => {
      const curY = window.scrollY;
      velocity = Math.min(Math.abs(curY - lastY) * 0.04, 1);
      lastY = curY;
      const alpha = 0.018 + velocity * 0.055;
      const img = ctx.createImageData(canvas.width, canvas.height);
      for (let i = 0; i < img.data.length; i += 4) {
        const v = Math.random() * 255;
        img.data[i] = img.data[i+1] = img.data[i+2] = v;
        img.data[i+3] = alpha * 255;
      }
      ctx.putImageData(img, 0, 0);
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  // ── Horizontal pinned scroll ──────────────────────────────────────────────
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const wrap  = hScrollRef.current;
    const track = hTrackRef.current;
    if (!wrap || !track) return;

    const panels = Array.from(track.querySelectorAll(".hpanel"));
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const totalW = (panels.length - 1) * 100;
      gsap.to(track, {
        xPercent: -totalW,
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${track.offsetWidth}`,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => mm.revert();
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

      {/* Grain overlay */}
      <canvas ref={grainRef} className="grain-canvas" aria-hidden="true" />

      {/* Cursor */}
      <div ref={cursorRef} className="cursor-ring" />
      <div ref={cursorDotRef} className="cursor-dot" />

      {/* ── HERO ── */}
      <section ref={heroRef} className="about-hero">
        <div className="hero-left">
          <p className="hero-eyebrow">CEO Square — About</p>
          <h1 className="hero-headline">
            {["Where visionary", "leaders build", "influence & legacy."].map((line, i) => (
              <span key={i} className="line-mask">
                <span ref={el => linesRef.current[i] = el} className={`line-inner${i === 1 ? " gold-italic" : ""}`}>
                  {line}
                </span>
              </span>
            ))}
          </h1>
          <p className="hero-sub">
            CEO Square is a global entrepreneurial community empowering CEOs, founders, and innovators
            through elite networking, executive mentorship, strategic growth opportunities, and
            transformative leadership experiences.
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
            <span>Global ecosystem</span>
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
              Influence&nbsp;·&nbsp;Legacy&nbsp;·&nbsp;Innovation&nbsp;·&nbsp;Leadership&nbsp;·&nbsp;Network&nbsp;·&nbsp;Impact&nbsp;·&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ── MANIFESTO ── */}
      <section className="manifesto-section">
        <div className="manifesto-inner">
          <p className="section-eyebrow">Our Vision</p>
          <p ref={manifestoRef} className="manifesto-text">
            {"To build the world's most powerful entrepreneurial ecosystem — where bold thinkers, visionary leaders and game-changers unite to shape the future of business and society.".split(" ").map((w, i) => (
              <span key={i} className="mw">{w} </span>
            ))}
          </p>
        </div>
      </section>

      {/* ── THE METHOD — horizontal pin ── */}
      <section ref={hScrollRef} className="hscroll-wrap">
        <div ref={hTrackRef} className="hscroll-track">
          {[
            { n:"01", title:"Connect.", body:"Join a curated global network of CEOs, founders, investors, and innovators through exclusive events, private communities, and international business forums.", tag:"Network" },
            { n:"02", title:"Grow.", body:"Access executive mentorship, personalized coaching, and mastermind-driven growth sessions led by experienced business leaders who have built at scale.", tag:"Mentorship" },
            { n:"03", title:"Scale.", body:"Leverage strategic partnerships, investment opportunities, and premium resources to break barriers and accelerate your business to its next level.", tag:"Growth" },
            { n:"04", title:"Lead.", body:"Elevate your personal brand through media exposure, keynote platforms, and thought leadership opportunities that amplify your influence globally.", tag:"Legacy" },
          ].map((p, i) => (
            <div key={i} className="hpanel">
              <span className="hp-tag">{p.tag}</span>
              <span className="hp-num">{p.n}</span>
              <h2 className="hp-title">{p.title}</h2>
              <p className="hp-body">{p.body}</p>
              <div className="hp-bar"><div className="hp-bar-fill" style={{width:`${25*(i+1)}%`}} /></div>
            </div>
          ))}
        </div>
        <div className="hscroll-progress-hint">
          <span className="mono-xs">Drag to explore</span>
          <span className="hp-arrow">→</span>
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

      {/* ── TICKER NAMES ── */}
      <div className="names-ticker-wrap">
        <p className="ticker-label">A community built for</p>
        <div ref={tickerRef} className="names-ticker">
          {[...Array(2)].map((_, d) => (
            <div key={d} className="names-row">
              {["Founders","Executives","Investors","Innovators","Visionaries","Mentors","Disruptors","Leaders","Builders","Pioneers"].map(n => (
                <span key={n} className="ticker-name">{n}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── PRINCIPLES ── */}
      <section className="principles-section">
        <div className="principles-inner">
          <div className="section-header">
            <p className="section-eyebrow">The CEO Square Advantage</p>
            <h2 className="section-title">More than a community —<br />a global platform.</h2>
          </div>
          <div className="principles-grid">
            {PRINCIPLES.map((p, i) => (
              <PrincipleCard key={p.num} p={p} index={i} setRef={el => principlesRef.current[i] = el} />
            ))}
          </div>
        </div>
      </section>

      {/* ── THE GAP ── */}
      <section ref={gapRef} className="gap-section">
        <div className="gap-inner">
          <div className="gap-item gap-left">
            <p className="section-eyebrow">Our Mission</p>
            <h2 className="gap-heading">Empowering leaders<br />to build influence<br />and create impact.</h2>
            <p className="gap-body">CEO Square is dedicated to fostering a high-value entrepreneurial community where collaboration fuels innovation, connections create opportunities, and bold ideas become successful ventures.</p>
          </div>
          <div className="gap-item gap-right">
            <div className="gap-stat-block">
              <span className="gap-big-num">Dubai<span className="gap-pct" style={{fontSize:"0.3em",verticalAlign:"middle",marginLeft:"0.3rem",opacity:0.6}}>2025</span></span>
              <p className="gap-stat-desc">CEO Square is arriving soon — a new era of leadership, collaboration, and global impact launching in Dubai.</p>
            </div>
            <div className="gap-quote-block">
              <span className="gap-quote-mark">&ldquo;</span>
              <p
                ref={typeRef}
                className="gap-quote-text"
                data-text="We empower entrepreneurs to connect, grow, and scale through world-class mentorship, strategic partnerships, meaningful networking, and personal brand elevation."
              />
              <span className="gap-quote-attr">— CEO Square</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="testi-section">
        <div className="testi-inner">
          <p className="section-eyebrow">In Their Words</p>
          <h2 className="section-title" style={{marginBottom:"4rem"}}>What our members say<br />about CEO Square.</h2>
          <div className="testi-grid">
            {[
              { quote: "CEO Square gave me access to a network I could never have built alone. One connection led to a partnership that changed the trajectory of my business.", name: "Ahmed R.", role: "Founder, Dubai" },
              { quote: "The mentorship and media opportunities here are unlike anything else. My personal brand has grown exponentially since joining.", name: "Priya S.", role: "CEO, Series A" },
              { quote: "This is not just a community — it is a launchpad. The calibre of people, the events, the resources. It is world-class.", name: "Marcus O.", role: "Entrepreneur & Investor" },
            ].map((t, i) => (
              <div key={i} ref={el => testiRef.current[i] = el} className="testi-card" style={{transition:"transform .25s ease, box-shadow .25s ease"}}>
                <div className="testi-shine" />
                <p className="testi-quote">&ldquo;{t.quote}&rdquo;</p>
                <div className="testi-author">
                  <span className="testi-name">{t.name}</span>
                  <span className="testi-role">{t.role}</span>
                </div>
                <div className="testi-stars">{"★★★★★"}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLARITY SCORE ── */}
      <section className="score-section">
        <div className="score-inner">
          <div className="score-left">
            <p className="section-eyebrow">Self-Assessment</p>
            <h2 className="section-title">Are you ready for<br />CEO Square?</h2>
            <p className="score-sub">Answer five questions. See your readiness score.</p>
            <div className="score-display">
              <svg viewBox="0 0 120 120" className="score-ring-svg">
                <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(212,175,55,0.1)" strokeWidth="4"/>
                <circle cx="60" cy="60" r="52" fill="none" stroke="#D4AF37" strokeWidth="4"
                  strokeDasharray={`${2*Math.PI*52}`}
                  strokeDashoffset={`${2*Math.PI*52*(1-score/100)}`}
                  strokeLinecap="round"
                  style={{transform:"rotate(-90deg)",transformOrigin:"center",transition:"stroke-dashoffset 0.6s ease"}}
                />
              </svg>
              <div className="score-num-wrap">
                <span className="score-num">{score}</span>
                <span className="score-denom">/100</span>
              </div>
            </div>
          </div>
          <div className="score-right">
            {[
              { q:"Are you actively looking to expand your network with high-calibre global leaders?", pts:20 },
              { q:"Do you want access to executive mentorship and personalised leadership coaching?", pts:20 },
              { q:"Are you building a business you want to scale beyond your current market?", pts:20 },
              { q:"Do you want to elevate your personal brand and become a recognised thought leader?", pts:20 },
              { q:"Are you ready to collaborate, invest, and grow alongside visionary entrepreneurs?", pts:20 },
            ].map((item, i) => (
              <div key={i} className={`score-item${opened===i?" score-open":""}`}
                onClick={() => { setOpened(opened===i?null:i); setScore(s => opened===i ? Math.max(0,s-item.pts) : Math.min(100,s+item.pts)); }}>
                <div className="score-q-row">
                  <span className="score-q-num">0{i+1}</span>
                  <p className="score-q-text">{item.q}</p>
                  <span className="score-q-icon">{opened===i?"−":"+"}</span>
                </div>
                {opened===i && (
                  <div className="score-answer">
                    <div className="score-bar"><div className="score-bar-fill" style={{width:`${item.pts}%`}} /></div>
                    <p className="score-pts">+{item.pts} readiness points added</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="about-cta">
        <div className="cta-bg-glow" />
        <div ref={ctaRef} className="cta-inner">
          <p className="section-eyebrow">Ready to join?</p>
          <h2 className="cta-headline">Your next chapter<br />starts in Dubai.</h2>
          <p className="cta-sub">CEO Square is arriving soon. Be among the first visionary leaders to join a global ecosystem built for influence, growth, and lasting legacy.</p>
          <div className="cta-btn-wrap">
            <div className="cta-ring-text-wrap" aria-hidden="true">
              <svg className="cta-ring-text" viewBox="0 0 200 200">
                <defs>
                  <path id="circle-path" d="M 100,100 m -75,0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" />
                </defs>
                <text fontSize="11" fill="rgba(212,175,55,0.55)" letterSpacing="6">
                  <textPath href="#circle-path">JOIN CEO SQUARE · DUBAI 2025 · LEAD THE FUTURE · </textPath>
                </text>
              </svg>
            </div>
            <Link href="/contact" className="btn-gold cta-main-btn">Join the waitlist</Link>
          </div>
          <Link href="/home" className="btn-outline">Explore more</Link>
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
  .hero-cta-row{display:flex;align-items:center;gap:2.5rem;flex-wrap:wrap}
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
  .stat-outline{font-family:var(--serif);font-size:clamp(2.8rem,6vw,6rem);font-weight:300;line-height:1;-webkit-text-stroke:1px rgba(212,175,55,0.35);color:transparent;display:block}
  .stat-fill{font-family:var(--serif);font-size:clamp(2.8rem,6vw,6rem);font-weight:300;line-height:1;color:var(--gold);position:absolute;inset:0;clip-path:inset(0 100% 0 0);display:block}
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

  /* GRAIN */
  .grain-canvas{position:fixed;inset:0;pointer-events:none;z-index:9998;mix-blend-mode:overlay;opacity:.7}

  /* HORIZONTAL SCROLL */
  .hscroll-wrap{position:relative;height:100vh;overflow:hidden;border-top:1px solid rgba(212,175,55,0.08)}
  .hscroll-track{display:flex;height:100%;will-change:transform}
  .hpanel{
    min-width:100vw;height:100%;display:flex;flex-direction:column;justify-content:center;
    padding:0 12vw;border-right:1px solid rgba(212,175,55,0.08);position:relative;
    background:radial-gradient(ellipse at 30% 60%,rgba(212,175,55,0.04) 0%,transparent 55%);
    flex-shrink:0;
  }
  .hp-tag{font-family:var(--mono);font-size:.6rem;letter-spacing:.28em;text-transform:uppercase;color:var(--gold);opacity:.6;margin-bottom:1.5rem;display:block}
  .hp-num{font-family:var(--serif);font-size:clamp(5rem,12vw,11rem);font-weight:300;line-height:1;color:transparent;-webkit-text-stroke:1px rgba(212,175,55,0.15);position:absolute;right:10vw;bottom:8vh;pointer-events:none}
  .hp-title{font-family:var(--serif);font-size:clamp(2.2rem,6vw,5.5rem);font-weight:300;line-height:1.05;color:var(--ivory);margin-bottom:1.8rem}
  .hp-body{font-family:var(--serif);font-size:clamp(1rem,1.4vw,1.2rem);font-weight:300;line-height:1.85;color:var(--ivory-lo);max-width:520px;margin-bottom:3rem}
  .hp-bar{width:200px;height:1px;background:rgba(212,175,55,0.15)}
  .hp-bar-fill{height:100%;background:var(--gold);transition:width 1s ease}
  .hscroll-progress-hint{position:absolute;bottom:2.5rem;right:3rem;display:flex;align-items:center;gap:.8rem;font-family:var(--mono);font-size:.6rem;letter-spacing:.18em;text-transform:uppercase;color:var(--ivory-lo)}
  .hp-arrow{color:var(--gold);animation:arrowBounce .9s ease-in-out infinite}
  @keyframes arrowBounce{0%,100%{transform:translateX(0)}50%{transform:translateX(6px)}}
  .mono-xs{font-family:var(--mono);font-size:.6rem;letter-spacing:.18em;text-transform:uppercase}

  /* CLARITY SCORE */
  .score-section{padding:130px 7vw;border-top:1px solid rgba(212,175,55,0.08)}
  .score-inner{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1.4fr;gap:8vw;align-items:start}
  .score-sub{font-family:var(--serif);font-size:1.05rem;font-weight:300;color:var(--ivory-lo);margin-top:1rem;margin-bottom:2.5rem}
  .score-display{position:relative;width:160px;height:160px;display:flex;align-items:center;justify-content:center}
  .score-ring-svg{position:absolute;inset:0;width:100%;height:100%}
  .score-num-wrap{display:flex;align-items:baseline;gap:.2rem;position:relative;z-index:1}
  .score-num{font-family:var(--serif);font-size:3rem;font-weight:300;color:var(--gold);line-height:1;transition:all .4s}
  .score-denom{font-family:var(--mono);font-size:.7rem;color:var(--ivory-lo)}
  .score-item{border-bottom:1px solid rgba(212,175,55,0.1);cursor:pointer;transition:background .3s;padding:.1rem 0}
  .score-item:first-child{border-top:1px solid rgba(212,175,55,0.1)}
  .score-item:hover{background:rgba(212,175,55,0.02)}
  .score-q-row{display:grid;grid-template-columns:2.5rem 1fr 2rem;align-items:center;gap:1rem;padding:1.4rem 1rem}
  .score-q-num{font-family:var(--mono);font-size:.6rem;letter-spacing:.18em;color:var(--gold);opacity:.55}
  .score-q-text{font-family:var(--serif);font-size:1rem;font-weight:300;line-height:1.6;color:var(--ivory)}
  .score-q-icon{font-family:var(--mono);font-size:1.2rem;color:var(--gold);text-align:right;transition:transform .3s}
  .score-open .score-q-icon{transform:rotate(180deg)}
  .score-answer{padding:.5rem 1rem 1.5rem 3.5rem}
  .score-bar{height:2px;background:rgba(212,175,55,0.12);margin-bottom:.8rem;overflow:hidden}
  .score-bar-fill{height:100%;background:linear-gradient(to right,var(--gold),rgba(212,175,55,0.4));animation:fillBar .6s ease forwards}
  @keyframes fillBar{from{width:0}to{width:100%}}
  .score-pts{font-family:var(--mono);font-size:.65rem;letter-spacing:.14em;color:var(--gold);opacity:.7}

  /* NAMES TICKER */
  .names-ticker-wrap{padding:60px 7vw;border-top:1px solid rgba(212,175,55,0.08)}
  .ticker-label{font-family:var(--mono);font-size:.62rem;letter-spacing:.22em;text-transform:uppercase;color:var(--ivory-lo);margin-bottom:2rem}
  .names-ticker{overflow:hidden;cursor:grab;user-select:none;-webkit-user-select:none}
  .names-row{display:flex;gap:3rem;width:max-content}
  .ticker-name{font-family:var(--serif);font-size:clamp(2.2rem,4.5vw,4rem);font-weight:300;color:transparent;-webkit-text-stroke:1px rgba(212,175,55,0.28);white-space:nowrap;transition:color .3s,-webkit-text-stroke .3s;flex-shrink:0}
  .ticker-name:hover{color:var(--gold);-webkit-text-stroke:1px var(--gold)}

  /* THE GAP */
  .gap-section{padding:130px 7vw;border-top:1px solid rgba(212,175,55,0.08);background:linear-gradient(135deg,rgba(212,175,55,0.03) 0%,transparent 50%)}
  .gap-inner{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:8vw;align-items:start}
  .gap-heading{font-family:var(--serif);font-size:clamp(2.4rem,4.5vw,4.2rem);font-weight:300;line-height:1.05;color:var(--ivory);margin:1rem 0 1.8rem}
  .gap-body{font-family:var(--serif);font-size:1.05rem;font-weight:300;line-height:1.85;color:var(--ivory-lo)}
  .gap-stat-block{margin-bottom:3rem;padding-bottom:3rem;border-bottom:1px solid rgba(212,175,55,0.12)}
  .gap-big-num{font-family:var(--serif);font-size:clamp(3.5rem,10vw,9rem);font-weight:300;line-height:1;color:var(--gold);display:block}
  .gap-pct{font-size:.5em;vertical-align:super}
  .gap-stat-desc{font-family:var(--serif);font-size:1rem;font-weight:300;line-height:1.75;color:var(--ivory-lo);max-width:380px;margin-top:.8rem}
  .gap-quote-block{position:relative;padding-left:1.8rem;border-left:2px solid rgba(212,175,55,0.3)}
  .gap-quote-mark{font-family:var(--serif);font-size:4rem;line-height:.6;color:var(--gold);opacity:.4;display:block;margin-bottom:.5rem}
  .gap-quote-text{font-family:var(--serif);font-size:1.15rem;font-weight:300;line-height:1.75;color:var(--ivory);min-height:3.5em}
  .gap-quote-text::after{content:"|";animation:blink 1s step-end infinite;color:var(--gold)}
  .gap-quote-attr{display:block;margin-top:1rem;font-family:var(--mono);font-size:.62rem;letter-spacing:.18em;text-transform:uppercase;color:var(--gold);opacity:.6}

  /* TESTIMONIALS */
  .testi-section{padding:130px 7vw;border-top:1px solid rgba(212,175,55,0.08)}
  .testi-inner{max-width:1200px;margin:0 auto}
  .testi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem}
  .testi-card{position:relative;padding:2.8rem 2.4rem;border:1px solid rgba(212,175,55,0.14);background:rgba(255,255,255,0.02);overflow:hidden;transform-style:preserve-3d;will-change:transform;transition:box-shadow .25s}
  .testi-card:hover{box-shadow:0 20px 60px rgba(0,0,0,0.5),0 0 40px rgba(212,175,55,0.08)}
  .testi-shine{position:absolute;inset:0;pointer-events:none;transition:background .15s}
  .testi-quote{font-family:var(--serif);font-size:1.08rem;font-weight:300;line-height:1.8;color:var(--ivory);margin-bottom:2rem;position:relative;z-index:1}
  .testi-author{display:flex;flex-direction:column;gap:.3rem;margin-bottom:1.2rem;position:relative;z-index:1}
  .testi-name{font-family:var(--mono);font-size:.68rem;letter-spacing:.12em;color:var(--ivory)}
  .testi-role{font-family:var(--mono);font-size:.62rem;letter-spacing:.1em;color:var(--ivory-lo)}
  .testi-stars{color:var(--gold);font-size:.85rem;letter-spacing:.1em;position:relative;z-index:1}

  /* RESPONSIVE */
  @media(max-width:1100px){
    .hpanel{padding:0 8vw}
    .hp-num{right:5vw;bottom:5vh}
  }

  @media(max-width:900px){
    .about-hero{grid-template-columns:1fr;padding-top:100px}
    .hero-right{display:none}
    .stats-inner{grid-template-columns:1fr}
    .stat-card{border-right:none;border-bottom:1px solid rgba(212,175,55,0.1)}
    .stat-card:last-child{border-bottom:none}
    .principles-grid{grid-template-columns:1fr}
    .gap-inner{grid-template-columns:1fr}
    .testi-grid{grid-template-columns:1fr}
    .score-inner{grid-template-columns:1fr}
  }

  @media(max-width:767px){
    .hscroll-wrap{height:auto;overflow:visible}
    .hscroll-track{flex-direction:column;height:auto;transform:none!important}
    .hpanel{
      min-width:100%;height:auto;padding:80px 7vw;
      border-right:none;border-bottom:1px solid rgba(212,175,55,0.08);
      background:none;
    }
    .hp-num{position:static;font-size:4rem;margin-bottom:1rem;color:rgba(212,175,55,0.15);-webkit-text-stroke:none;display:block}
    .hp-title{font-size:2.8rem;margin-bottom:1.2rem}
    .hp-body{font-size:1.05rem;margin-bottom:2.5rem;max-width:100%}
    .hp-bar{width:100%}
    .hscroll-progress-hint{display:none}
  }

  @media(max-width:600px){
    .about-hero,.manifesto-section,.principles-section{padding-left:1.5rem;padding-right:1.5rem}
    .stats-section,.about-cta,.gap-section,.testi-section,.score-section{padding-left:1.5rem;padding-right:1.5rem}
    .hero-headline{font-size:3rem}
    .manifesto-text{font-size:1.8rem}
    .section-title{font-size:2.2rem}
    .hp-num{font-size:3.5rem}
    .hp-title{font-size:2.4rem}
    .principle-card{padding:2.5rem 1.8rem}
    .cta-ring-text-wrap{display:none}
    .hero-cta-row{gap:1.5rem}
    .testi-card{padding:2rem 1.5rem}
    .score-q-row{padding:1.2rem 0.5rem; gap:0.8rem}
    .score-answer{padding:0.5rem 0.5rem 1.2rem 2.5rem}
  }

  @media(prefers-reduced-motion:reduce){
    .scroll-line,.cta-bg-glow,.hcl-dot,.marquee-track{animation:none!important}
  }
`;
