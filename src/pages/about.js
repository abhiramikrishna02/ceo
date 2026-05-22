"use client";

/**
 * CEO Studio — About Page
 * Cinematic scroll story — FIXED version.
 * Each scene occupies 100vh. Scenes are shown/hidden based on
 * window.scrollY directly — no percentage math, no scrub misfires.
 *
 * pages/about.jsx  (Pages Router)
 * app/about/page.jsx  (App Router — remove Head import, keep "use client")
 */

import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";

const SCENES = [
  { id: 0, chapter: null,   label: null,         title: null,                      body: null,                                                                                       visual: "atmosphere" },
  { id: 1, chapter: "02",   label: "Arrival",     title: "We help leaders\nthink clearer.",        body: "CEO Studio is the strategic partner for founders and executives who need clarity, not noise.",           visual: "glow-panel"  },
  { id: 2, chapter: "03",   label: "Tension",     title: "The pressure\nnever stops.",             body: "Fast growth hides slow confusion. Every morning brings decisions no framework was built to answer.",      visual: "shards"      },
  { id: 3, chapter: "04",   label: "Clarity",     title: "There is a\nway through.",               body: "We bring a live thinking system into the room — structured, precise, built around how you decide.",      visual: "ring-open"   },
  { id: 4, chapter: "05",   label: "Rhythm",      title: "Cadence creates\nmomentum.",             body: "Consistent language. Weekly rhythm. Shared maps. When the team runs on the same clock, it flows.",      visual: "rails"       },
  { id: 5, chapter: "06",   label: "Alignment",   title: "Your team\naligns faster.",              body: "We work at the leadership layer — with you and your direct reports. Alignment is a system.",            visual: "grid"        },
  { id: 6, chapter: "07",   label: "Execution",   title: "Decisions lock\ninto motion.",           body: "When the thinking is done well, the doing becomes easy. Teams stop waiting for clarity.",               visual: "streaks"     },
  { id: 7, chapter: "08",   label: "Trust",       title: "Consistency\nbuilds everything.",        body: "Same quality. Same language. Quarter after quarter. The organisations that endure are dependable.",      visual: "symmetry"    },
  { id: 8, chapter: "09",   label: "Resolve",     title: "Quiet confidence\nis the goal.",         body: "Not louder. Not faster. Just clearer — until the whole organisation moves with precision.",              visual: "ring-close"  },
  { id: 9, chapter: "10",   label: "Begin",       title: "Ready to think\nclearer?",              body: "The first conversation is always the most revealing.",                                                   visual: "cta"         },
];

const N = SCENES.length; // 10

export default function About() {
  const trackRef    = useRef(null);
  const canvasRef   = useRef(null);
  const progressRef = useRef(null);

  // Which scene is currently active (0–9)
  const [active, setActive]     = useState(0);
  // 0–1 progress within the current scene
  const [sceneP, setSceneP]     = useState(0);

  /* ── Scroll listener ───────────────────────────────── */
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const vh        = window.innerHeight;
      // Each scene = 1 × vh of scroll (scene 0 at top, scene N-1 at bottom)
      const rawScene  = scrollTop / vh;
      const idx       = Math.min(Math.floor(rawScene), N - 1);
      const progress  = rawScene - Math.floor(rawScene); // 0–1 within scene

      setActive(idx);
      setSceneP(progress);

      // progress bar
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${rawScene / (N - 1)})`;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run once on mount
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Particles ─────────────────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W, H, raf;
    const pts = Array.from({ length: 110 }, () => null);

    const spawn = () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.4 + 0.2,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      a: Math.random() * 0.45 + 0.08,
      life: 0, max: 300 + Math.random() * 500,
    });

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    pts.forEach((_, i) => { pts[i] = spawn(); pts[i].life = Math.random() * pts[i].max; });

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach((p, i) => {
        p.life++;
        if (p.life > p.max) { pts[i] = spawn(); return; }
        const fi = Math.min(p.life / 80, 1);
        const fo = Math.min((p.max - p.life) / 80, 1);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212,175,55,${p.a * fi * fo})`;
        ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  /* ── Scene visibility helpers ──────────────────────── */
  // For a given scene index, return CSS transform/opacity/filter
  const sceneStyle = (i) => {
    if (i === active) {
      // active — fully visible, slight parallax on sceneP
      const y = sceneP * -12;
      return { opacity: 1, transform: `translateY(${y}px) scale(1)`, filter: "blur(0px)", pointerEvents: "auto" };
    }
    if (i === active - 1) {
      // exiting — dissolve upward
      const p = sceneP;
      return { opacity: 1 - p, transform: `translateY(${-60 * p}px) scale(${1 + 0.04 * p})`, filter: `blur(${8 * p}px)`, pointerEvents: "none" };
    }
    if (i === active + 1) {
      // next — waiting below
      const p = 1 - sceneP;
      return { opacity: 0, transform: `translateY(60px) scale(0.97)`, filter: "blur(8px)", pointerEvents: "none" };
    }
    // far away
    return { opacity: 0, transform: "translateY(60px) scale(0.97)", filter: "blur(8px)", pointerEvents: "none" };
  };

  // Inner element: title/body stagger based on sceneP
  const enterY = (delay = 0) => {
    // once active, animate in quickly
    const p = Math.max(0, Math.min(1, (sceneP * 8) - delay));
    // But we want these to animate IN as soon as scene becomes active
    // So use a simpler approach: if active use 0 offset, else keep hidden
    return active === active ? 0 : 40; // always 0 when rendered
  };

  return (
    <>
      <Head>
        <title>About — CEO Studio</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=DM+Mono:wght@300;400&display=swap" rel="stylesheet" />
      </Head>

      <style>{STYLES}</style>

      {/* NAV */}
      <nav className="ceo-nav">
        <Link href="/home" className="ceo-logo">CEO Studio</Link>
        <Link href="/home" className="ceo-navlink">Home</Link>
      </nav>

      {/* PROGRESS */}
      <div ref={progressRef} className="ceo-progress" />

      {/* SCROLL TRACK — N×100vh tall, so each scene = 1 scroll-vh */}
      <div ref={trackRef} style={{ height: `${N * 100}vh`, position: "relative" }}>

        {/* STICKY STAGE */}
        <div className="ceo-stage">

          {/* Ambient always-on layer */}
          <canvas ref={canvasRef} className="ceo-canvas" />
          <div className="orb-main"      style={{ transform: `translate(-50%,-50%) translateY(${active * -8}px)` }} />
          <div className="orb-secondary" style={{ transform: `translateY(${active * 5}px)` }} />
          <div className="vig-top" />
          <div className="vig-bot" />

          {/* Gold streaks — CSS animation, always present */}
          <div className="gold-streak gs-1" />
          <div className="gold-streak gs-2" />

          {/* ══ SCENES ══ */}

          {/* S0 — Atmosphere */}
          <div className="ceo-scene s0-bg" style={sceneStyle(0)}>
            <div className="s0-center">
              <p className="s0-brand">CEO Studio</p>
              <h1 className="s0-headline">Clarity.<br />Direction.<br />Execution.</h1>
            </div>
            {[...Array(10)].map((_, i) => (
              <span key={i} className="diamond" style={{ left: `${8 + i * 9}%`, top: `${16 + (i % 4) * 18}%`, animationDelay: `${i * 0.6}s` }} />
            ))}
          </div>

          {/* S1 — Arrival */}
          <div className="ceo-scene" style={sceneStyle(1)}>
            <SceneContent
              chapter="02" label="Arrival"
              title={"We help leaders\nthink clearer."}
              body="CEO Studio is the strategic partner for founders and executives who need clarity, not noise."
              active={active === 1}
            />
            <div className="sc-visual">
              <div className="glow-panel">
                <div className="gp-shine" />
                <div className="gp-line" />
                <Corner pos="tl" /> <Corner pos="br" />
              </div>
            </div>
          </div>

          {/* S2 — Tension */}
          <div className="ceo-scene s2-bg" style={sceneStyle(2)}>
            <SceneContent
              chapter="03" label="Tension"
              title={"The pressure\nnever stops."}
              body="Fast growth hides slow confusion. Every morning brings decisions no framework was built to answer."
              active={active === 2} goldChapter
            />
            <div className="sc-visual">
              <div className="shards-wrap">
                {[0,1,2,3,4].map(i => (
                  <div key={i} className="shard" style={{ width: `${36+i*15}px`, height: `${36+i*15}px`, top: `${i*12}%`, left: `${6+i*13}%`, opacity: 0.22 + i * 0.15, animationDelay: `${i*0.7}s` }} />
                ))}
              </div>
            </div>
          </div>

          {/* S3 — Clarity */}
          <div className="ceo-scene" style={sceneStyle(3)}>
            <SceneContent
              chapter="04" label="Clarity"
              title={"There is a\nway through."}
              body="We bring a live thinking system into the room — structured, precise, built around how you actually decide."
              active={active === 3} goldTitle
            />
            <div className="sc-visual">
              <div className="ring-open">
                <div className="ro-outer" />
                <div className="ro-mid" />
                <div className="ro-core" />
                <div className="ro-beam-h" />
                <div className="ro-beam-d" />
              </div>
            </div>
          </div>

          {/* S4 — Rhythm */}
          <div className="ceo-scene" style={sceneStyle(4)}>
            <SceneContent
              chapter="05" label="Rhythm"
              title={"Cadence creates\nmomentum."}
              body="Consistent language. Weekly rhythm. Shared maps. When the team runs on the same clock, execution flows."
              active={active === 4}
            />
            <div className="sc-visual">
              <div className="rails-wrap">
                {[1,.88,.74,.6,.46,.32,.18].map((op,i) => (
                  <div key={i} className="rail-line" style={{ opacity: op, width: `${100-i*8}%` }} />
                ))}
              </div>
            </div>
          </div>

          {/* S5 — Alignment */}
          <div className="ceo-scene" style={sceneStyle(5)}>
            <SceneContent
              chapter="06" label="Alignment"
              title={"Your team\naligns faster."}
              body="We work at the leadership layer — with you and your direct reports. Alignment is a system, not a meeting."
              active={active === 5}
            />
            <div className="sc-visual">
              <div className="grid-expand">
                {[...Array(6)].map((_,i) => (
                  <div key={i} className="ge-block" style={{ opacity: 0.3+(i%3)*0.22 }} />
                ))}
              </div>
            </div>
          </div>

          {/* S6 — Execution */}
          <div className="ceo-scene s6-bg" style={sceneStyle(6)}>
            <SceneContent
              chapter="07" label="Execution"
              title={"Decisions lock\ninto motion."}
              body="When the thinking is done well, the doing becomes easy. Teams stop waiting for clarity and start building."
              active={active === 6}
            />
            <div className="sc-visual">
              <div className="exec-wrap">
                {[0,1,2,3].map(i => (
                  <div key={i} className="exec-streak" style={{ top:`${18+i*18}%`, width:`${52+i*9}%`, opacity:0.3+i*0.17, animationDelay:`${i*0.5}s` }} />
                ))}
              </div>
            </div>
          </div>

          {/* S7 — Trust */}
          <div className="ceo-scene" style={sceneStyle(7)}>
            <SceneContent
              chapter="08" label="Trust"
              title={"Consistency\nbuilds everything."}
              body="Same quality. Same language. Quarter after quarter. The organisations that endure are the most dependable."
              active={active === 7}
            />
            <div className="sc-visual">
              <div className="sym-wrap">
                {[0,1,2].map(i => (
                  <div key={i} className="sym-row">
                    <div className="sym-block" style={{ opacity:0.42+i*0.24 }} />
                    <div className="sym-gap" />
                    <div className="sym-block" style={{ opacity:0.42+i*0.24 }} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* S8 — Resolve */}
          <div className="ceo-scene" style={sceneStyle(8)}>
            <SceneContent
              chapter="09" label="Resolve"
              title={"Quiet confidence\nis the goal."}
              body="Not louder. Not faster. Just clearer — until the whole organisation moves with the precision of one decision."
              active={active === 8} goldTitle
            />
            <div className="sc-visual">
              <div className="ring-close">
                <div className="rc-outer" />
                <div className="rc-mid" />
                <div className="rc-core" />
              </div>
            </div>
          </div>

          {/* S9 — CTA */}
          <div className="ceo-scene s9-cta" style={sceneStyle(9)}>
            <div className="cta-inner">
              <span className="sc-chapter" style={{ textAlign:"center" }}>10 — Begin</span>
              <h2 className="sc-title gold cta-h2">Ready to think<br />clearer?</h2>
              <p className="sc-body cta-body">The first conversation is always the most revealing.</p>
              <div className="cta-btns">
                <Link href="/contact" className="btn-primary">Start a conversation</Link>
                <Link href="/home"    className="btn-ghost">Return home</Link>
              </div>
            </div>
            <div className="cta-halo" />
          </div>

        </div>{/* /stage */}
      </div>{/* /track */}

      {/* Scene indicator dots */}
      <div className="scene-dots">
        {SCENES.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === active ? "dot-active" : ""}`}
            onClick={() => window.scrollTo({ top: i * window.innerHeight, behavior: "smooth" })}
            aria-label={`Scene ${i + 1}`}
          />
        ))}
      </div>
    </>
  );
}

/* ── Sub-components ───────────────────────────────────── */
function SceneContent({ chapter, label, title, body, active, goldTitle, goldChapter }) {
  return (
    <div className={`ceo-left ${active ? "scene-active" : ""}`}>
      <span className={`sc-chapter ${goldChapter ? "sc-chapter-bronze" : ""}`}>
        {chapter} — {label}
      </span>
      <h2 className={`sc-title ${goldTitle ? "gold" : ""} ${active ? "title-in" : ""}`}>
        {title.split("\n").map((line, i) => <span key={i} style={{ display: "block" }}>{line}</span>)}
      </h2>
      <p className={`sc-body ${active ? "body-in" : ""}`}>{body}</p>
    </div>
  );
}

function Corner({ pos }) {
  const styles = {
    tl: { top: 10, left: 10, borderWidth: "1px 0 0 1px" },
    br: { bottom: 10, right: 10, borderWidth: "0 1px 1px 0" },
  };
  return <div className="gp-corner" style={styles[pos]} />;
}

/* ── All styles ───────────────────────────────────────── */
const STYLES = `
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

  :root{
    --blk:#070706;
    --gold:#D4AF37;
    --gold-lo:rgba(212,175,55,0.13);
    --gold-md:rgba(212,175,55,0.32);
    --bronze:#A07840;
    --ivory:#F4EFE6;
    --ivory-lo:rgba(244,239,230,0.52);
    --serif:'Cormorant Garamond',Georgia,serif;
    --mono:'DM Mono',monospace;
    --ease-out:cubic-bezier(0.22,1,0.36,1);
  }

  html,body{background:var(--blk);color:var(--ivory);overflow-x:hidden}

  /* ── Stage (sticky viewport) ── */
  .ceo-stage{
    position:sticky;top:0;
    height:100vh;width:100vw;
    overflow:hidden;
  }

  /* ── Canvas ── */
  .ceo-canvas{position:absolute;inset:0;pointer-events:none;z-index:1}

  /* ── Orbs ── */
  .orb-main{
    position:absolute;width:640px;height:640px;border-radius:50%;
    background:radial-gradient(circle,rgba(212,175,55,0.15) 0%,transparent 68%);
    top:42%;left:58%;
    pointer-events:none;z-index:2;
    transition:transform 1.2s ease;
  }
  .orb-secondary{
    position:absolute;width:380px;height:380px;border-radius:50%;
    background:radial-gradient(circle,rgba(160,120,64,0.11) 0%,transparent 70%);
    top:18%;left:10%;
    pointer-events:none;z-index:2;
    transition:transform 1.2s ease;
  }

  /* ── Vignettes ── */
  .vig-top{position:absolute;top:0;left:0;right:0;height:200px;background:linear-gradient(to bottom,var(--blk),transparent);z-index:30;pointer-events:none}
  .vig-bot{position:absolute;bottom:0;left:0;right:0;height:200px;background:linear-gradient(to top,var(--blk),transparent);z-index:30;pointer-events:none}

  /* ── Gold streaks ── */
  .gold-streak{
    position:absolute;left:0;right:0;height:1px;
    background:linear-gradient(to right,transparent,rgba(212,175,55,0.38),transparent);
    z-index:5;pointer-events:none;
    opacity:0;
    animation:streakFly 8s ease-in-out infinite;
  }
  .gs-1{top:36%}
  .gs-2{top:64%;animation-delay:4s}
  @keyframes streakFly{
    0%{opacity:0;transform:translateX(-110%)}
    15%{opacity:1}
    85%{opacity:1}
    100%{opacity:0;transform:translateX(110%)}
  }

  /* ── Progress bar ── */
  .ceo-progress{
    position:fixed;top:0;left:0;height:2px;width:100%;
    background:var(--gold);transform-origin:left;transform:scaleX(0);
    z-index:200;transition:transform .1s linear;
  }

  /* ── Nav ── */
  .ceo-nav{
    position:fixed;top:0;left:0;right:0;z-index:150;
    display:flex;align-items:center;justify-content:space-between;
    padding:1.5rem 3rem;
    background:linear-gradient(to bottom,rgba(7,7,6,0.9),transparent);
    backdrop-filter:blur(8px);
    border-bottom:1px solid rgba(212,175,55,0.1);
  }
  .ceo-logo{font-family:var(--serif);font-size:1.05rem;font-weight:600;letter-spacing:.1em;color:var(--ivory);text-decoration:none}
  .ceo-navlink{font-family:var(--mono);font-size:.68rem;letter-spacing:.18em;text-transform:uppercase;color:var(--ivory-lo);text-decoration:none;transition:color .3s}
  .ceo-navlink:hover{color:var(--gold)}

  /* ── Scene base ── */
  .ceo-scene{
    position:absolute;inset:0;
    display:flex;align-items:center;
    padding:0 7vw;
    z-index:20;
    /* transition driven by inline style via JS */
    transition:opacity .7s var(--ease-out), transform .7s var(--ease-out), filter .7s var(--ease-out);
    will-change:transform,opacity,filter;
  }

  /* ── Content left ── */
  .ceo-left{
    flex:1;
    padding-left:2.2rem;
    border-left:1px solid rgba(212,175,55,0.22);
    max-width:560px;
  }

  /* ── Visual right ── */
  .sc-visual{
    flex:0 0 auto;
    width:clamp(200px,26vw,360px);
    display:flex;align-items:center;justify-content:center;
    margin-left:auto;
  }

  /* ── Typography ── */
  .sc-chapter{
    display:block;
    font-family:var(--mono);font-size:.66rem;letter-spacing:.22em;text-transform:uppercase;
    color:var(--gold);margin-bottom:1.6rem;opacity:.8;
  }
  .sc-chapter-bronze{color:var(--bronze)}
  .sc-title{
    font-family:var(--serif);
    font-size:clamp(2.2rem,4.5vw,4rem);
    font-weight:300;line-height:1.1;
    color:var(--ivory);
    margin-bottom:1.5rem;
    opacity:0;transform:translateY(40px);
    transition:opacity .8s .1s var(--ease-out), transform .8s .1s var(--ease-out);
  }
  .sc-title.gold{color:var(--gold)}
  .title-in{opacity:1!important;transform:translateY(0)!important}

  .sc-body{
    font-family:var(--serif);
    font-size:clamp(1rem,1.5vw,1.18rem);font-weight:300;line-height:1.82;
    color:var(--ivory-lo);max-width:420px;
    opacity:0;transform:translateY(30px);
    transition:opacity .8s .28s var(--ease-out), transform .8s .28s var(--ease-out);
  }
  .body-in{opacity:1!important;transform:translateY(0)!important}

  .sc-chapter{
    opacity:0;transform:translateX(-16px);
    transition:opacity .6s var(--ease-out), transform .6s var(--ease-out);
  }
  .scene-active .sc-chapter{opacity:.8!important;transform:translateX(0)!important}

  /* ════ S0 Atmosphere ════ */
  .s0-bg{background:radial-gradient(ellipse at 50% 58%,rgba(212,175,55,0.07) 0%,transparent 62%)}
  .s0-center{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;z-index:25}
  .s0-brand{font-family:var(--mono);font-size:.72rem;letter-spacing:.36em;text-transform:uppercase;color:var(--gold);opacity:.7;margin-bottom:2rem}
  .s0-headline{font-family:var(--serif);font-size:clamp(3rem,7vw,6.2rem);font-weight:300;line-height:1.05;color:var(--ivory)}
  .diamond{position:absolute;width:7px;height:7px;background:var(--gold);transform:rotate(45deg);opacity:0;animation:dpulse 3.2s ease-in-out infinite}
  @keyframes dpulse{0%,100%{opacity:0;transform:rotate(45deg) scale(.5)}50%{opacity:.55;transform:rotate(45deg) scale(1)}}

  /* ════ S1 Glow Panel ════ */
  .glow-panel{width:100%;aspect-ratio:3/4;border:1px solid rgba(212,175,55,0.2);background:linear-gradient(135deg,rgba(212,175,55,0.07) 0%,transparent 58%);box-shadow:0 0 90px rgba(212,175,55,0.09),inset 0 0 50px rgba(212,175,55,0.05);position:relative;overflow:hidden}
  .gp-shine{position:absolute;inset:0;background:linear-gradient(180deg,rgba(212,175,55,0.09) 0%,transparent 42%)}
  .gp-line{position:absolute;bottom:22%;left:50%;transform:translateX(-50%);width:55%;height:1px;background:linear-gradient(to right,transparent,var(--gold),transparent);box-shadow:0 0 14px var(--gold)}
  .gp-corner{position:absolute;width:18px;height:18px;border-color:rgba(212,175,55,0.5);border-style:solid}

  /* ════ S2 Shards ════ */
  .s2-bg{background:radial-gradient(ellipse at 68% 50%,rgba(212,175,55,0.04) 0%,transparent 55%)}
  .shards-wrap{position:relative;width:100%;height:300px}
  .shard{position:absolute;border:1px solid rgba(212,175,55,0.4);background:rgba(212,175,55,0.04);transform:rotate(15deg);animation:tumble 7s ease-in-out infinite}
  @keyframes tumble{0%,100%{transform:rotate(15deg) translateY(0)}50%{transform:rotate(55deg) translateY(-18px)}}

  /* ════ S3 Ring Open ════ */
  .ring-open{position:relative;width:clamp(180px,22vw,260px);height:clamp(180px,22vw,260px);display:flex;align-items:center;justify-content:center}
  .ro-outer{position:absolute;inset:0;border-radius:50%;border:1px solid rgba(212,175,55,0.25);box-shadow:0 0 60px rgba(212,175,55,0.14);animation:rpulse 4s ease-in-out infinite}
  .ro-mid{position:absolute;width:64%;height:64%;border-radius:50%;border:1px solid rgba(212,175,55,0.38)}
  .ro-core{position:absolute;width:26%;height:26%;border-radius:50%;background:radial-gradient(circle,rgba(212,175,55,0.5) 0%,transparent 75%);animation:cpulse 2.2s ease-in-out infinite}
  .ro-beam-h{position:absolute;height:1px;width:145%;top:50%;background:linear-gradient(to right,transparent,rgba(212,175,55,0.35),transparent)}
  .ro-beam-d{position:absolute;height:1px;width:105%;top:32%;background:linear-gradient(to right,transparent,rgba(212,175,55,0.25),transparent);transform:rotate(32deg)}
  @keyframes rpulse{0%,100%{box-shadow:0 0 30px rgba(212,175,55,0.1)}50%{box-shadow:0 0 80px rgba(212,175,55,0.28)}}
  @keyframes cpulse{0%,100%{transform:scale(1);opacity:.8}50%{transform:scale(1.4);opacity:1}}

  /* ════ S4 Rails ════ */
  .rails-wrap{display:flex;flex-direction:column;gap:18px;width:100%}
  .rail-line{height:1px;background:linear-gradient(to right,rgba(212,175,55,.9),rgba(212,175,55,.04));transform-origin:left}

  /* ════ S5 Grid ════ */
  .grid-expand{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;width:100%}
  .ge-block{aspect-ratio:1;border:1px solid rgba(212,175,55,0.2);background:rgba(212,175,55,0.04)}

  /* ════ S6 Execution ════ */
  .s6-bg{background:radial-gradient(ellipse at 62% 50%,rgba(212,175,55,0.05) 0%,transparent 58%)}
  .exec-wrap{position:relative;width:100%;height:230px}
  .exec-streak{position:absolute;left:0;height:1px;background:linear-gradient(to right,rgba(212,175,55,.85),rgba(212,175,55,.03));animation:execAnim 2.6s ease-in-out infinite}
  @keyframes execAnim{0%{transform:scaleX(0) translateX(-10px);opacity:0}20%{opacity:1}80%{opacity:1}100%{transform:scaleX(1) translateX(10px);opacity:0}}

  /* ════ S7 Symmetry ════ */
  .sym-wrap{display:flex;flex-direction:column;gap:20px;width:100%}
  .sym-row{display:flex;align-items:center}
  .sym-block{flex:1;height:clamp(26px,4vh,44px);border:1px solid rgba(212,175,55,0.24);background:rgba(212,175,55,0.05)}
  .sym-gap{width:22px;height:1px;background:rgba(212,175,55,0.38)}

  /* ════ S8 Ring Close ════ */
  .ring-close{position:relative;width:clamp(160px,20vw,240px);height:clamp(160px,20vw,240px);display:flex;align-items:center;justify-content:center}
  .rc-outer{position:absolute;inset:0;border-radius:50%;border:1px solid rgba(212,175,55,0.22);box-shadow:0 0 70px rgba(212,175,55,0.2);animation:rpulse 3.5s ease-in-out infinite}
  .rc-mid{position:absolute;width:62%;height:62%;border-radius:50%;border:1px solid rgba(212,175,55,0.38);box-shadow:0 0 35px rgba(212,175,55,0.18)}
  .rc-core{position:absolute;width:26%;height:26%;border-radius:50%;background:radial-gradient(circle,rgba(212,175,55,0.65) 0%,transparent 78%);box-shadow:0 0 22px rgba(212,175,55,0.45);animation:cpulse 2s ease-in-out infinite}

  /* ════ S9 CTA ════ */
  .s9-cta{align-items:center;justify-content:center;flex-direction:column;background:radial-gradient(ellipse at 50% 56%,rgba(212,175,55,0.09) 0%,transparent 62%)}
  .cta-inner{display:flex;flex-direction:column;align-items:center;text-align:center;max-width:560px;position:relative;z-index:2}
  .cta-h2,.cta-body{text-align:center}
  .cta-h2{margin-bottom:1.2rem}
  .cta-body{margin-bottom:2.8rem}
  .cta-btns{display:flex;gap:1.2rem;flex-wrap:wrap;justify-content:center}
  .cta-halo{position:absolute;width:520px;height:520px;border-radius:50%;border:1px solid rgba(212,175,55,0.12);box-shadow:0 0 140px rgba(212,175,55,0.12);animation:rpulse 5s ease-in-out infinite;pointer-events:none}

  .btn-primary{font-family:var(--mono);font-size:.72rem;letter-spacing:.18em;text-transform:uppercase;color:var(--blk);background:var(--gold);padding:.9rem 2.3rem;text-decoration:none;transition:opacity .3s}
  .btn-primary:hover{opacity:.82}
  .btn-ghost{font-family:var(--mono);font-size:.72rem;letter-spacing:.18em;text-transform:uppercase;color:var(--gold);border:1px solid rgba(212,175,55,0.38);padding:.9rem 2.3rem;text-decoration:none;transition:border-color .3s}
  .btn-ghost:hover{border-color:var(--gold)}

  /* ── Scene indicator dots ── */
  .scene-dots{
    position:fixed;right:1.8rem;top:50%;transform:translateY(-50%);
    display:flex;flex-direction:column;gap:10px;z-index:100;
  }
  .dot{
    width:6px;height:6px;border-radius:50%;
    background:rgba(212,175,55,0.3);border:none;cursor:pointer;padding:0;
    transition:background .3s, transform .3s;
  }
  .dot-active{background:var(--gold);transform:scale(1.5)}

  /* ── Mobile ── */
  @media(max-width:768px){
    .ceo-nav{padding:1rem 1.4rem}
    .ceo-scene{padding:0 1.4rem;flex-direction:column;justify-content:center}
    .ceo-left{border-left:none;padding-left:0;border-top:1px solid rgba(212,175,55,0.2);padding-top:1.2rem;max-width:100%}
    .sc-visual{display:none}
    .s0-headline{font-size:clamp(2.6rem,10vw,4.5rem)}
    .scene-dots{display:none}
  }
  @media(prefers-reduced-motion:reduce){
    .diamond,.shard,.exec-streak,.ro-outer,.rc-outer,.cta-halo,.ro-core,.rc-core,.gold-streak{animation:none!important}
    .sc-title,.sc-body{transition:none!important;opacity:1!important;transform:none!important}
  }
`;