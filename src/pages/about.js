"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, CircleDot } from "lucide-react";

import { cn } from "@/lib/utils";

const SCENES = [
  {
    id: 0,
    chapter: "01",
    label: "Atmosphere",
    title: "Clarity.\nDirection.\nExecution.",
    body:
      "A cinematic about page built as a scroll story, not a static wall of text.",
    visual: "intro",
  },
  {
    id: 1,
    chapter: "02",
    label: "Arrival",
    title: "We help leaders\nthink clearer.",
    body:
      "CEO Studio is the strategic partner for founders and executives who need clarity, not noise.",
    visual: "glow-panel",
  },
  {
    id: 2,
    chapter: "03",
    label: "Tension",
    title: "The pressure\nnever stops.",
    body:
      "Fast growth hides slow confusion. Every morning brings decisions no framework was built to answer.",
    visual: "shards",
  },
  {
    id: 3,
    chapter: "04",
    label: "Clarity",
    title: "There is a\nway through.",
    body:
      "We bring a live thinking system into the room - structured, precise, built around how you actually decide.",
    visual: "ring-open",
  },
  {
    id: 4,
    chapter: "05",
    label: "Rhythm",
    title: "Cadence creates\nmomentum.",
    body:
      "Consistent language. Weekly rhythm. Shared maps. When the team runs on the same clock, execution flows.",
    visual: "rails",
  },
  {
    id: 5,
    chapter: "06",
    label: "Alignment",
    title: "Your team\naligns faster.",
    body:
      "We work at the leadership layer - with you and your direct reports. Alignment is a system, not a meeting.",
    visual: "grid",
  },
  {
    id: 6,
    chapter: "07",
    label: "Execution",
    title: "Decisions lock\ninto motion.",
    body:
      "When the thinking is done well, the doing becomes easy. Teams stop waiting for clarity and start building.",
    visual: "streaks",
  },
  {
    id: 7,
    chapter: "08",
    label: "Trust",
    title: "Consistency\nbuilds everything.",
    body:
      "Same quality. Same language. Quarter after quarter. The organisations that endure are the most dependable.",
    visual: "symmetry",
  },
  {
    id: 8,
    chapter: "09",
    label: "Resolve",
    title: "Quiet confidence\nis the goal.",
    body:
      "Not louder. Not faster. Just clearer - until the whole organisation moves with precision.",
    visual: "ring-close",
  },
  {
    id: 9,
    chapter: "10",
    label: "Begin",
    title: "Ready to think\nclearer?",
    body: "The first conversation is always the most revealing.",
    visual: "cta",
  },
];

const SERVICES = [
  "Homepage narrative and section strategy",
  "Responsive interface design direction",
  "Conversion-focused contact path",
  "Motion and visual polish for premium pacing",
];

const METRICS = [
  { value: "05", label: "Focused sections" },
  { value: "01", label: "Clear next action" },
  { value: "24/7", label: "Always-on first impression" },
];

export default function About() {
  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);

  const shellRefs = useRef([]);
  const contentRefs = useRef([]);
  const visualRefs = useRef([]);

  const [active, setActive] = useState(0);

  useEffect(() => {
    document.title = "About - CEO Studio";
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      shellRefs.current.forEach((shell, i) => {
        if (!shell) return;

        const content = contentRefs.current[i];
        const visual = visualRefs.current[i];
        const chips = shell.querySelectorAll("[data-intro-chip]");
        const metrics = shell.querySelectorAll("[data-intro-metric]");

        if (content) {
          gsap.fromTo(
            content,
            { y: 64, opacity: 0, filter: "blur(10px)" },
            {
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              ease: "none",
              scrollTrigger: {
                trigger: shell,
                start: "top 78%",
                end: "top 35%",
                scrub: 1,
              },
            }
          );
        }

        if (visual) {
          gsap.fromTo(
            visual,
            { y: 96, x: i % 2 === 0 ? 36 : -36, rotate: i % 2 === 0 ? 6 : -6, opacity: 0 },
            {
              y: 0,
              x: 0,
              rotate: 0,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: shell,
                start: "top 78%",
                end: "top 35%",
                scrub: 1,
              },
            }
          );
        }

        if (chips && chips.length) {
          gsap.fromTo(
            chips,
            { y: 22, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.05,
              ease: "none",
              scrollTrigger: {
                trigger: shell,
                start: "top 82%",
                end: "top 35%",
                scrub: 1,
              },
            }
          );
        }

        if (metrics && metrics.length) {
          gsap.fromTo(
            metrics,
            { y: 26, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.06,
              ease: "none",
              scrollTrigger: {
                trigger: shell,
                start: "top 80%",
                end: "top 35%",
                scrub: 1,
              },
            }
          );
        }

        ScrollTrigger.create({
          trigger: shell,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActive(i),
          onEnterBack: () => setActive(i),
        });
      });

      ScrollTrigger.create({
        trigger: trackRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * (SCENES.length - 1)}`,
        scrub: 1,
        onUpdate: (self) => {
          if (progressRef.current) {
            progressRef.current.style.transform = `scaleX(${self.progress})`;
          }
          const idx = Math.min(
            SCENES.length - 1,
            Math.round(self.progress * (SCENES.length - 1))
          );
          setActive(idx);
        },
      });

      ScrollTrigger.refresh();
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const scrollToScene = (i) => {
    if (!trackRef.current) return;
    const top = trackRef.current.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + i * window.innerHeight, behavior: "smooth" });
  };

  return (
    <div ref={rootRef} className="ceo-page">
      <style>{STYLES}</style>

      <nav className="ceo-nav">
        <Link href="/home" className="ceo-logo">
          CEO Studio
        </Link>
        <Link href="/home" className="ceo-navlink">
          Home
        </Link>
      </nav>

      <div ref={progressRef} className="ceo-progress" />

      <div ref={trackRef} className="ceo-track">
        <div className="ceo-stage">
          <div className="orb-main" />
          <div className="orb-secondary" />
          <div className="vig-top" />
          <div className="vig-bot" />
          <div className="gold-streak gs-1" />
          <div className="gold-streak gs-2" />

          {SCENES.map((scene, i) => (
            <SceneShell
              key={scene.id}
              scene={scene}
              index={i}
              setShellRef={(el) => {
                shellRefs.current[i] = el;
              }}
              setContentRef={(el) => {
                contentRefs.current[i] = el;
              }}
              setVisualRef={(el) => {
                visualRefs.current[i] = el;
              }}
            />
          ))}
        </div>
      </div>

      <div className="scene-dots">
        {SCENES.map((_, i) => (
          <button
            key={i}
            className={cn("dot", i === active && "dot-active")}
            aria-label={`Scene ${i + 1}`}
            onClick={() => scrollToScene(i)}
          />
        ))}
      </div>
    </div>
  );
}

function SceneShell({ scene, index, setShellRef, setContentRef, setVisualRef }) {
  const isIntro = index === 0;
  const isCta = index === SCENES.length - 1;

  return (
    <section
      ref={setShellRef}
      className={cn(
        "ceo-shell",
        index === 0 && "scene-intro",
        scene.visual === "shards" && "scene-tension",
        scene.visual === "cta" && "scene-cta"
      )}
      style={{ zIndex: 20 + index }}
    >
      <div className="ceo-sticky">
        {isIntro ? (
          <IntroScene setContentRef={setContentRef} setVisualRef={setVisualRef} />
        ) : isCta ? (
          <CtaScene scene={scene} setContentRef={setContentRef} setVisualRef={setVisualRef} />
        ) : (
          <StoryScene scene={scene} setContentRef={setContentRef} setVisualRef={setVisualRef} />
        )}
      </div>
    </section>
  );
}

function IntroScene({ setContentRef, setVisualRef }) {
  return (
    <div className="s0-center">
      <div className="s0-copy" ref={setContentRef}>
        <p className="s0-brand">CEO Studio</p>
        <h1 className="s0-headline">
          Clarity.
          <br />
          Direction.
          <br />
          Execution.
        </h1>
        <p className="s0-kicker">
          A cinematic about page with scenes that actually move, instead of sitting there like decorative furniture.
        </p>

        <div className="s0-chiprow">
          {SERVICES.map((item) => (
            <span key={item} className="s0-chip" data-intro-chip>
              {item}
            </span>
          ))}
        </div>

        <div className="s0-metrics" ref={setVisualRef}>
          {METRICS.map((metric) => (
            <div key={metric.label} className="s0-metric" data-intro-metric>
              <p>{metric.value}</p>
              <span>{metric.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StoryScene({ scene, setContentRef, setVisualRef }) {
  return (
    <div className="ceo-layout">
      <div className="ceo-left" ref={setContentRef}>
        <span className={cn("sc-chapter", scene.chapter === "03" && "sc-chapter-bronze")}>
          {scene.chapter} — {scene.label}
        </span>
        <h2 className={cn("sc-title", (scene.chapter === "04" || scene.chapter === "09") && "gold")}>
          {scene.title.split("\n").map((line, idx) => (
            <span key={idx} style={{ display: "block" }}>
              {line}
            </span>
          ))}
        </h2>
        <p className="sc-body">{scene.body}</p>

        {scene.visual === "glow-panel" && (
          <div className="sc-mini-grid">
            <div className="mini-box">
              <Check className="mini-icon" />
              <span>Authority</span>
            </div>
            <div className="mini-box">
              <Check className="mini-icon" />
              <span>Strategy</span>
            </div>
            <div className="mini-box">
              <Check className="mini-icon" />
              <span>Motion</span>
            </div>
          </div>
        )}
      </div>

      <div className="sc-visual" ref={setVisualRef}>
        {scene.visual === "glow-panel" && <GlowPanel />}
        {scene.visual === "shards" && <Shards />}
        {scene.visual === "ring-open" && <RingOpen />}
        {scene.visual === "rails" && <Rails />}
        {scene.visual === "grid" && <GridExpand />}
        {scene.visual === "streaks" && <ExecutionStreaks />}
        {scene.visual === "symmetry" && <Symmetry />}
        {scene.visual === "ring-close" && <RingClose />}
      </div>
    </div>
  );
}

function CtaScene({ scene, setContentRef, setVisualRef }) {
  return (
    <div className="cta-inner">
      <span className="sc-chapter" ref={setContentRef}>
        {scene.chapter} — {scene.label}
      </span>
      <h2 className="sc-title gold cta-h2" ref={setContentRef}>
        {scene.title.split("\n").map((line, idx) => (
          <span key={idx} style={{ display: "block" }}>
            {line}
          </span>
        ))}
      </h2>
      <p className="sc-body cta-body" ref={setContentRef}>
        {scene.body}
      </p>
      <div className="cta-btns" ref={setVisualRef}>
        <Link href="/contact" className="btn-primary">
          Start a conversation
        </Link>
        <Link href="/home" className="btn-ghost">
          Return home
        </Link>
      </div>
      <div className="cta-halo" />
    </div>
  );
}

function GlowPanel() {
  return (
    <div className="glow-panel">
      <div className="gp-shine" />
      <div className="gp-line" />
      <div className="gp-orb gp-one" />
      <div className="gp-orb gp-two" />
      <div className="gp-glow" />
      <Corner pos="tl" />
      <Corner pos="br" />
    </div>
  );
}

function Shards() {
  return (
    <div className="shards-wrap">
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="shard"
          style={{
            width: `${36 + i * 15}px`,
            height: `${36 + i * 15}px`,
            top: `${i * 12}%`,
            left: `${6 + i * 13}%`,
            opacity: 0.22 + i * 0.15,
            animationDelay: `${i * 0.7}s`,
          }}
        />
      ))}
    </div>
  );
}

function RingOpen() {
  return (
    <div className="ring-open">
      <div className="ro-outer" />
      <div className="ro-mid" />
      <div className="ro-core" />
      <div className="ro-beam-h" />
      <div className="ro-beam-d" />
    </div>
  );
}

function Rails() {
  return (
    <div className="rails-wrap">
      {[1, 0.88, 0.74, 0.6, 0.46, 0.32, 0.18].map((op, i) => (
        <div key={i} className="rail-line" style={{ opacity: op, width: `${100 - i * 8}%` }} />
      ))}
    </div>
  );
}

function GridExpand() {
  return (
    <div className="grid-expand">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="ge-block" style={{ opacity: 0.3 + (i % 3) * 0.22 }} />
      ))}
    </div>
  );
}

function ExecutionStreaks() {
  return (
    <div className="exec-wrap">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="exec-streak"
          style={{
            top: `${18 + i * 18}%`,
            width: `${52 + i * 9}%`,
            opacity: 0.3 + i * 0.17,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}
    </div>
  );
}

function Symmetry() {
  return (
    <div className="sym-wrap">
      {[0, 1, 2].map((i) => (
        <div key={i} className="sym-row">
          <div className="sym-block" style={{ opacity: 0.42 + i * 0.24 }} />
          <div className="sym-gap" />
          <div className="sym-block" style={{ opacity: 0.42 + i * 0.24 }} />
        </div>
      ))}
    </div>
  );
}

function RingClose() {
  return (
    <div className="ring-close">
      <div className="rc-outer" />
      <div className="rc-mid" />
      <div className="rc-core" />
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

const STYLES = `
  *,:before,:after{box-sizing:border-box}
  html,body{margin:0;padding:0;background:#070706;color:#F4EFE6;overflow-x:hidden}
  html{scroll-behavior:smooth}
  a{text-decoration:none}

  .ceo-page{position:relative;isolation:isolate;background:
    radial-gradient(ellipse at top, rgba(212,175,55,0.07) 0%, transparent 42%),
    radial-gradient(ellipse at 80% 18%, rgba(255,255,255,0.03) 0%, transparent 30%),
    #070706;
  }

  :root{
    --blk:#070706;
    --gold:#D4AF37;
    --bronze:#A07840;
    --ivory:#F4EFE6;
    --ivory-lo:rgba(244,239,230,0.52);
    --serif:'Cormorant Garamond',Georgia,serif;
    --mono:'DM Mono',monospace;
  }

  .ceo-progress{position:fixed;top:0;left:0;height:2px;width:100%;background:var(--gold);transform-origin:left;transform:scaleX(0);z-index:200}

  .ceo-nav{
    position:fixed;top:0;left:0;right:0;z-index:150;
    display:flex;align-items:center;justify-content:space-between;
    padding:1.25rem 2rem;background:linear-gradient(to bottom,rgba(7,7,6,0.9),transparent);
    backdrop-filter:blur(8px);border-bottom:1px solid rgba(212,175,55,0.08)
  }
  .ceo-logo{font-family:var(--serif);font-size:1.05rem;font-weight:600;letter-spacing:.1em;color:var(--ivory)}
  .ceo-navlink{font-family:var(--mono);font-size:.68rem;letter-spacing:.18em;text-transform:uppercase;color:var(--ivory-lo);transition:color .3s}
  .ceo-navlink:hover{color:var(--gold)}

  .ceo-track{position:relative}
  .ceo-stage{position:relative}

  .orb-main{position:fixed;width:640px;height:640px;border-radius:50%;background:radial-gradient(circle,rgba(212,175,55,0.12) 0%,transparent 68%);top:44%;left:58%;transform:translate(-50%,-50%);pointer-events:none;z-index:1;filter:blur(6px)}
  .orb-secondary{position:fixed;width:340px;height:340px;border-radius:50%;background:radial-gradient(circle,rgba(160,120,64,0.08) 0%,transparent 70%);top:18%;left:10%;pointer-events:none;z-index:1;filter:blur(4px)}
  .vig-top{position:fixed;top:0;left:0;right:0;height:180px;background:linear-gradient(to bottom,var(--blk),transparent);z-index:30;pointer-events:none}
  .vig-bot{position:fixed;bottom:0;left:0;right:0;height:180px;background:linear-gradient(to top,var(--blk),transparent);z-index:30;pointer-events:none}

  .gold-streak{position:fixed;left:0;right:0;height:1px;background:linear-gradient(to right,transparent,rgba(212,175,55,0.38),transparent);z-index:5;pointer-events:none;opacity:.3}
  .gs-1{top:36%}
  .gs-2{top:64%}

  .ceo-shell{position:relative;min-height:160vh;background:transparent}
  .ceo-sticky{position:sticky;top:0;height:100vh;height:100svh;display:flex;align-items:center;justify-content:center;padding:0 7vw;overflow:hidden;box-shadow:0 -1px 0 rgba(212,175,55,0.04)}

  .ceo-layout{position:relative;z-index:80;display:grid;grid-template-columns:minmax(0,1.02fr) minmax(0,0.98fr);gap:4.5vw;align-items:center;width:min(100%,1440px)}
  .ceo-left{position:relative;padding-left:2.2rem;border-left:1px solid rgba(212,175,55,0.2);max-width:560px}

  .sc-chapter{display:block;font-family:var(--mono);font-size:.66rem;letter-spacing:.22em;text-transform:uppercase;color:var(--gold);margin-bottom:1.6rem;opacity:.82}
  .sc-chapter-bronze{color:var(--bronze)}
  .sc-title{font-family:var(--serif);font-size:clamp(2.2rem,4.5vw,4.35rem);font-weight:300;line-height:1.02;color:var(--ivory);margin-bottom:1.5rem;text-shadow:0 0 26px rgba(255,255,255,0.03)}
  .sc-title.gold{color:var(--gold)}
  .sc-body{font-family:var(--serif);font-size:clamp(1rem,1.5vw,1.18rem);font-weight:300;line-height:1.82;color:var(--ivory-lo);max-width:420px}

  .sc-visual{position:relative;width:min(100%,520px);display:flex;align-items:center;justify-content:center;margin-left:auto}
  .scene-dots{position:fixed;right:1.8rem;top:50%;transform:translateY(-50%);display:flex;flex-direction:column;gap:10px;z-index:100}
  .dot{width:6px;height:6px;border-radius:50%;background:rgba(212,175,55,0.3);border:none;cursor:pointer;padding:0;transition:background .3s,transform .3s}
  .dot-active{background:var(--gold);transform:scale(1.5)}

  .scene-intro{background:radial-gradient(ellipse at 50% 56%,rgba(212,175,55,0.04) 0%,transparent 58%)}
  .scene-tension{background:radial-gradient(ellipse at 68% 50%,rgba(212,175,55,0.03) 0%,transparent 55%)}
  .scene-cta{background:radial-gradient(ellipse at 50% 56%,rgba(212,175,55,0.07) 0%,transparent 62%)}

  .s0-center{position:relative;z-index:80;display:flex;align-items:center;justify-content:center;width:min(100%,1200px);min-height:100vh}
  .s0-copy{max-width:820px}
  .s0-brand{font-family:var(--mono);font-size:.72rem;letter-spacing:.36em;text-transform:uppercase;color:var(--gold);opacity:.72;margin-bottom:1.6rem}
  .s0-headline{font-family:var(--serif);font-size:clamp(3rem,7vw,6.2rem);font-weight:300;line-height:1.02;color:var(--ivory);margin:0}
  .s0-kicker{max-width:42ch;margin:1.6rem 0 0;font-family:var(--serif);font-size:clamp(1rem,1.35vw,1.15rem);line-height:1.8;color:var(--ivory-lo)}
  .s0-chiprow{display:flex;flex-wrap:wrap;gap:0.7rem;margin-top:1.8rem}
  .s0-chip{border:1px solid rgba(212,175,55,0.16);background:rgba(255,255,255,0.03);backdrop-filter:blur(10px);padding:.65rem .95rem;border-radius:999px;font-family:var(--mono);font-size:.68rem;letter-spacing:.09em;color:var(--ivory-lo)}
  .s0-metrics{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1rem;margin-top:2rem}
  .s0-metric{border:1px solid rgba(212,175,55,0.12);background:rgba(0,0,0,0.45);border-radius:18px;padding:1rem 1.1rem;text-align:left;box-shadow:0 0 40px rgba(0,0,0,0.22)}
  .s0-metric p{margin:0;font-size:2rem;font-weight:700;color:#fff}
  .s0-metric span{display:block;margin-top:.35rem;font-size:.8rem;line-height:1.4;color:var(--ivory-lo)}

  .glow-panel{width:min(100%,460px);aspect-ratio:3/4;border:1px solid rgba(212,175,55,0.2);background:linear-gradient(135deg,rgba(212,175,55,0.06) 0%,transparent 58%);box-shadow:0 0 90px rgba(212,175,55,0.09),inset 0 0 50px rgba(212,175,55,0.05);position:relative;overflow:hidden;border-radius:2px}
  .gp-shine{position:absolute;inset:0;background:linear-gradient(180deg,rgba(212,175,55,0.08) 0%,transparent 42%)}
  .gp-line{position:absolute;bottom:22%;left:50%;transform:translateX(-50%);width:58%;height:1px;background:linear-gradient(to right,transparent,var(--gold),transparent);box-shadow:0 0 14px var(--gold)}
  .gp-corner{position:absolute;width:18px;height:18px;border-color:rgba(212,175,55,0.5);border-style:solid}
  .gp-orb{position:absolute;border-radius:50%;background:radial-gradient(circle,rgba(212,175,55,0.16) 0%,transparent 70%);filter:blur(10px)}
  .gp-one{width:180px;height:180px;top:-20px;left:-10px}
  .gp-two{width:260px;height:260px;bottom:-40px;right:-30px}
  .gp-glow{position:absolute;inset:18% 10% auto 10%;height:40%;background:radial-gradient(ellipse at center,rgba(255,141,52,0.3) 0%,rgba(212,175,55,0.12) 38%,transparent 72%);filter:blur(18px);mix-blend-mode:screen}

  .shards-wrap{position:relative;width:100%;height:320px}
  .shard{position:absolute;border:1px solid rgba(212,175,55,0.35);background:rgba(212,175,55,0.04);transform:rotate(15deg);animation:tumble 7s ease-in-out infinite}
  @keyframes tumble{0%,100%{transform:rotate(15deg) translateY(0)}50%{transform:rotate(55deg) translateY(-18px)}}

  .ring-open{position:relative;width:clamp(180px,22vw,260px);height:clamp(180px,22vw,260px);display:flex;align-items:center;justify-content:center}
  .ro-outer{position:absolute;inset:0;border-radius:50%;border:1px solid rgba(212,175,55,0.25);box-shadow:0 0 60px rgba(212,175,55,0.14);animation:rpulse 4s ease-in-out infinite}
  .ro-mid{position:absolute;width:64%;height:64%;border-radius:50%;border:1px solid rgba(212,175,55,0.38)}
  .ro-core{position:absolute;width:26%;height:26%;border-radius:50%;background:radial-gradient(circle,rgba(212,175,55,0.5) 0%,transparent 75%);animation:cpulse 2.2s ease-in-out infinite}
  .ro-beam-h{position:absolute;height:1px;width:145%;top:50%;background:linear-gradient(to right,transparent,rgba(212,175,55,0.35),transparent)}
  .ro-beam-d{position:absolute;height:1px;width:105%;top:32%;background:linear-gradient(to right,transparent,rgba(212,175,55,0.25),transparent);transform:rotate(32deg)}
  @keyframes rpulse{0%,100%{box-shadow:0 0 30px rgba(212,175,55,0.1)}50%{box-shadow:0 0 80px rgba(212,175,55,0.28)}}
  @keyframes cpulse{0%,100%{transform:scale(1);opacity:.8}50%{transform:scale(1.4);opacity:1}}

  .rails-wrap{display:flex;flex-direction:column;gap:18px;width:100%;max-width:480px}
  .rail-line{height:1px;background:linear-gradient(to right,rgba(212,175,55,.9),rgba(212,175,55,.04));transform-origin:left}

  .grid-expand{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;width:min(100%,420px)}
  .ge-block{aspect-ratio:1;border:1px solid rgba(212,175,55,0.2);background:rgba(212,175,55,0.04)}

  .exec-wrap{position:relative;width:min(100%,460px);height:230px}
  .exec-streak{position:absolute;left:0;height:1px;background:linear-gradient(to right,rgba(212,175,55,.85),rgba(212,175,55,.03));animation:execAnim 2.6s ease-in-out infinite}
  @keyframes execAnim{0%{transform:scaleX(0) translateX(-10px);opacity:0}20%{opacity:1}80%{opacity:1}100%{transform:scaleX(1) translateX(10px);opacity:0}}

  .sym-wrap{display:flex;flex-direction:column;gap:20px;width:min(100%,460px)}
  .sym-row{display:flex;align-items:center}
  .sym-block{flex:1;height:clamp(26px,4vh,44px);border:1px solid rgba(212,175,55,0.24);background:rgba(212,175,55,0.05)}
  .sym-gap{width:22px;height:1px;background:rgba(212,175,55,0.38)}

  .ring-close{position:relative;width:clamp(160px,20vw,240px);height:clamp(160px,20vw,240px);display:flex;align-items:center;justify-content:center}
  .rc-outer{position:absolute;inset:0;border-radius:50%;border:1px solid rgba(212,175,55,0.22);box-shadow:0 0 70px rgba(212,175,55,0.2);animation:rpulse 3.5s ease-in-out infinite}
  .rc-mid{position:absolute;width:62%;height:62%;border-radius:50%;border:1px solid rgba(212,175,55,0.38);box-shadow:0 0 35px rgba(212,175,55,0.18)}
  .rc-core{position:absolute;width:26%;height:26%;border-radius:50%;background:radial-gradient(circle,rgba(212,175,55,0.65) 0%,transparent 78%);box-shadow:0 0 22px rgba(212,175,55,0.45);animation:cpulse 2s ease-in-out infinite}

  .sc-mini-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:.75rem;margin-top:1.6rem;max-width:520px}
  .mini-box{display:flex;align-items:center;gap:.6rem;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.03);padding:.85rem .9rem;border-radius:16px;font-family:var(--mono);font-size:.7rem;letter-spacing:.08em;color:var(--ivory-lo)}
  .mini-icon{width:14px;height:14px;color:rgba(255,255,255,.72);flex:none}

  .cta-inner{position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;text-align:center;max-width:560px;width:min(100%,560px)}
  .cta-h2,.cta-body{text-align:center}
  .cta-h2{margin-bottom:1.2rem}
  .cta-body{margin-bottom:2.8rem}
  .cta-btns{display:flex;gap:1.2rem;flex-wrap:wrap;justify-content:center}
  .cta-halo{position:absolute;width:520px;height:520px;border-radius:50%;border:1px solid rgba(212,175,55,0.12);box-shadow:0 0 140px rgba(212,175,55,0.12);animation:rpulse 5s ease-in-out infinite;pointer-events:none}
  .btn-primary{font-family:var(--mono);font-size:.72rem;letter-spacing:.18em;text-transform:uppercase;color:var(--blk);background:var(--gold);padding:.9rem 2.3rem;text-decoration:none;transition:opacity .3s}
  .btn-primary:hover{opacity:.82}
  .btn-ghost{font-family:var(--mono);font-size:.72rem;letter-spacing:.18em;text-transform:uppercase;color:var(--gold);border:1px solid rgba(212,175,55,0.38);padding:.9rem 2.3rem;text-decoration:none;transition:border-color .3s}
  .btn-ghost:hover{border-color:var(--gold)}

  @media (max-width: 1100px){
    .ceo-layout{grid-template-columns:1fr;gap:3rem}
    .sc-visual{justify-content:flex-start;margin-left:0}
  }

  @media(max-width:768px){
    .ceo-nav{padding:1rem 1.2rem}
    .ceo-sticky{padding:0 1.2rem}
    .ceo-layout{grid-template-columns:1fr;gap:2rem}
    .ceo-left{border-left:none;padding-left:0;border-top:1px solid rgba(212,175,55,0.18);padding-top:1.2rem;max-width:100%}
    .sc-visual{display:none}
    .s0-center{align-items:flex-start}
    .s0-headline{font-size:clamp(2.8rem,11vw,4.6rem)}
    .s0-metrics{grid-template-columns:1fr}
    .sc-mini-grid{grid-template-columns:1fr}
    .scene-dots{display:none}
    .cta-halo{width:320px;height:320px}
  }

  @media(prefers-reduced-motion:reduce){
    .shard,.exec-streak,.ro-outer,.rc-outer,.cta-halo,.ro-core,.rc-core{animation:none!important}
    .sc-title,.sc-body{transition:none!important;opacity:1!important;transform:none!important}
  }
`;
