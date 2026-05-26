import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { AnimatePresence, motion, useInView, useScroll, useSpring, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ResponsiveHeroBanner from "@/components/ui/responsive-hero-banner";
import { ResponsiveStyles, getCommunityBenefitsResponsiveMotion, useMediaQuery } from "@/components/responsive";
import { useRouter } from "next/router";

gsap.registerPlugin(ScrollTrigger);

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const GOLD = "#c9a84c", BG = "#0a0a0a", TEXT = "#f5f0e8", EASE = [0.16, 1, 0.3, 1];
const FADE_EDGE = (dir) => ({ position:"absolute",[dir==="left"?"left":"right"]:0,top:0,height:"100%",width:"220px",background:`linear-gradient(${dir==="left"?"90deg":"-90deg"},${BG} 35%,transparent 100%)`,pointerEvents:"none",zIndex:3 });
const MINI_CARD_BASE = { position:"absolute",borderRadius:24,backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",padding:24,transformStyle:"preserve-3d",backfaceVisibility:"hidden",willChange:"transform, opacity" };

const stats = [
  { value:"180+", label:"Countries", note:"Global Reach" },
  { value:"500+", label:"Elite Members", note:"Founders & CEOs" },
  { value:"50+", label:"Annual Summits", note:"Invite-Only" },
  { value:"24/7", label:"Mentorship", note:"Executive Access" },
];
const stories = [
  { eyebrow:"Elite Global Network", title:"Elite Global Network", body:"Connect with influential entrepreneurs, executives, investors, and industry pioneers through curated networking experiences, private communities, and international business events.", accent:"Curated Introductions", footer:"Private Communities", align:"left" },
  { eyebrow:"Executive Mentorship", title:"Executive Mentorship", body:"Gain direct access to experienced business leaders and mentors through personalized coaching, leadership guidance, and mastermind-driven growth sessions.", accent:"Mastermind Sessions", footer:"Executive Access", align:"right" },
  { eyebrow:"Exclusive Leadership Summits", title:"Exclusive Leadership Summits", body:"Attend invitation-only conferences, executive forums, and leadership retreats featuring impactful keynote speakers, interactive workshops, and transformative discussions.", accent:"Leadership Retreats", footer:"International Events", align:"left" },
  { eyebrow:"Strategic Investment Opportunities", title:"Strategic Investment Opportunities", body:"Access curated investment networks and connect with qualified investors, venture partners, and high-growth business opportunities designed for scalable success.", accent:"Deal Flow Network", footer:"Venture Partners", align:"right" },
];
const storySlides = [
  { id:"01", img:"https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=2000", giantText:"Elite Network", title:"Global Connections", desc:"Connect with influential entrepreneurs, executives, investors, and industry pioneers through curated networking experiences, private communities, and international business events.", features:["Curated Introductions","Private Communities","International Events"] },
  { id:"02", img:"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000", giantText:"Mentorship", title:"Executive Guidance", desc:"Gain direct access to experienced business leaders and mentors through personalized coaching, leadership guidance, and mastermind-driven growth sessions.", features:["1-on-1 Coaching","Mastermind Sessions","Leadership Frameworks"] },
  { id:"03", img:"https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?auto=format&fit=crop&q=80&w=2000", giantText:"Leadership Summits", title:"Exclusive Retreats", desc:"Attend invitation-only conferences, executive forums, and leadership retreats featuring impactful keynote speakers, interactive workshops, and transformative discussions.", features:["Keynote Speakers","Executive Forums","Leadership Retreats"] },
  { id:"04", img:"/ceo.png", giantText:"Investment Access", title:"Strategic Capital", desc:"Access curated investment networks and connect with qualified investors, venture partners, and high-growth business opportunities designed for scalable success.", features:["Venture Partners","Investor Access","Deal Flow Network"] },
];
const quotes = [
  { text:"CEO Square gave me the connections and clarity I needed to scale beyond what I thought was possible.", name:"Vikram S.", role:"Founder & CEO, Series D Venture" },
  { text:"The mentorship inside CEO Square is unlike anything I've experienced – direct, elite, and genuinely transformative.", name:"Ananya R.", role:"Co-Founder, Global Fintech Group" },
  { text:"This community doesn't just open doors – it builds them where none existed before.", name:"Rohan M.", role:"CEO, International Consulting Group" },
];
const communityBenefits = [
  { id:"01", eyebrow:"Network & Influence", headline:"The Architecture\nof Connection.", sub:"Forge relationships that reshape markets and redefine industries.", detail:"At CEO Square, influence is cultivated through an elite global network that connects you directly with entrepreneurs, investors, and executives shaping the future.", tags:["Elite Introductions","Global Community","Industry Pioneers"], stat:{ value:"180+", label:"Countries in the global network." }, accent:"Your network is your most valuable asset." },
  { id:"02", eyebrow:"Mentorship & Growth", headline:"The Mentor\nAdvantage.", sub:"Access wisdom that compresses decades into decisive moments.", detail:"CEO Square pairs you with battle-tested leaders and executive mentors who offer personalized coaching, strategic guidance, and mastermind-driven sessions.", tags:["Personalized Coaching","Mastermind Groups","Executive Access"], stat:{ value:"500+", label:"Founders and CEOs engaged in mentorship." }, accent:"Proximity to greatness accelerates everything." },
  { id:"03", eyebrow:"Summits & Innovation", headline:"The Mandate\nof Leadership.", sub:"Attend exclusive gatherings where tomorrow's business landscape is decided.", detail:"CEO Square summits and retreats are invitation-only experiences built for visionary leaders who want to grow, connect, and lead at a higher level.", tags:["Invite-Only Summits","Global Retreats","Innovation Forums"], stat:{ value:"50+", label:"Annual summits and retreats." }, accent:"The room you're in determines the future you build." },
];

// ---------------------------------------------------------------------------
// Style helpers
// ---------------------------------------------------------------------------
const eyebrowStyle = { fontFamily:"Poppins",fontSize:11,fontWeight:300,color:GOLD,letterSpacing:"0.4em",textTransform:"uppercase",marginBottom:24 };
const poppins = (weight, size, color, extra={}) => ({ fontFamily:"Poppins",fontWeight:weight,fontSize:size,color,...extra });
const storyVariants = { hidden:{ opacity:0,y:30 }, visible:(delay)=>({ opacity:1,y:0,transition:{ duration:1.0,delay,ease:EASE } }) };

// ---------------------------------------------------------------------------
// Utilities
// ---------------------------------------------------------------------------
const createParticle = (index) => {
  const seed = (index+1)*9973;
  const rand = (o) => { const v=Math.sin(seed+o)*10000; return v-Math.floor(v); };
  return { id:index,left:`${rand(1)*100}%`,delay:`${rand(2)*12}s`,duration:`${8+rand(3)*12}s`,size:`${1+rand(4)*3}px`,drift:`${(rand(5)-0.5)*200}px` };
};
function splitTextToSpans(text) {
  return text.split("").map((char,i)=>(
    <span key={i} className="char" style={{ display:"inline-block",willChange:"transform, opacity",transformOrigin:"50% 50% -20px" }}>
      {char===" "?"\u00A0":char}
    </span>
  ));
}
// ---------------------------------------------------------------------------
// Global styles & Particles
// ---------------------------------------------------------------------------
function GlobalStyle() {
  return (
    <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400&display=swap');
      *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
      html{scroll-behavior:smooth}
      body,#root{font-family:'Poppins',sans-serif;background:#0a0a0a;color:#f5f0e8;overflow-x:hidden}
      ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:#0a0a0a}::-webkit-scrollbar-thumb{background:#c9a84c;border-radius:2px}
      ::selection{background:rgba(201,168,76,0.3);color:#f5f0e8}
      .gold{color:#c9a84c}
      .gold-gradient{background:linear-gradient(135deg,#c9a84c 0%,#f0d080 40%,#b8882a 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
      .glass{background:rgba(255,255,255,0.03);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(201,168,76,0.12)}
      .noise-overlay{position:fixed;inset:0;pointer-events:none;z-index:9999;opacity:0.035;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
      @keyframes glowPulse{0%,100%{box-shadow:0 0 20px rgba(201,168,76,0.2),0 0 60px rgba(201,168,76,0.05)}50%{box-shadow:0 0 40px rgba(201,168,76,0.4),0 0 100px rgba(201,168,76,0.15)}}
      @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
      @keyframes spin-slow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
      @keyframes spin-reverse{from{transform:rotate(360deg)}to{transform:rotate(0deg)}}
      @keyframes particle-drift{0%{transform:translateY(100vh) translateX(0) scale(0);opacity:0}10%{opacity:1}90%{opacity:0.6}100%{transform:translateY(-100px) translateX(var(--drift)) scale(1);opacity:0}}
      @keyframes borderShimmer{0%,100%{border-color:rgba(201,168,76,0.1)}50%{border-color:rgba(201,168,76,0.4)}}
      .card-tilt{transform-style:preserve-3d;transition:transform 0.4s cubic-bezier(0.23,1,0.32,1),box-shadow 0.4s ease}
      .card-tilt:hover{box-shadow:0 30px 80px rgba(201,168,76,0.15),0 0 0 1px rgba(201,168,76,0.2)}
      .shimmer-text{background:linear-gradient(90deg,#c9a84c 0%,#f0d080 25%,#fff8e7 50%,#f0d080 75%,#c9a84c 100%);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 4s linear infinite}
    `}</style>
    <ResponsiveStyles />
    </>
  );
}

function Particles() {
  return (
    <div style={{ position:"fixed",inset:0,pointerEvents:"none",zIndex:1,overflow:"hidden" }}>
      {Array.from({ length:25 },(_,i)=>createParticle(i)).map((p)=>(
        <div key={p.id} style={{ position:"absolute",bottom:"-10px",left:p.left,width:p.size,height:p.size,borderRadius:"50%",background:"radial-gradient(circle,#c9a84c,#f0d080)",animation:`particle-drift ${p.duration} ${p.delay} infinite linear`,"--drift":p.drift,boxShadow:"0 0 6px rgba(201,168,76,0.8)" }} />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Shared UI Components
// ---------------------------------------------------------------------------
function Reveal({ children, delay=0, y=60 }) {
  const ref=useRef(null);
  const inView=useInView(ref,{ once:true,margin:"-10% 0px" });
  return (
    <motion.div ref={ref} initial={{ opacity:0,y }} animate={inView?{ opacity:1,y:0 }:{}} transition={{ duration:0.9,delay,ease:EASE }}>
      {children}
    </motion.div>
  );
}

function StaggerText({ text, delay=0 }) {
  const ref=useRef(null);
  const inView=useInView(ref,{ once:true,margin:"-5% 0px" });
  return (
    <span ref={ref} style={{ display:"inline-flex",flexWrap:"wrap",gap:"0.25em" }}>
      {text.split(" ").map((word,i)=>(
        <motion.span key={i} initial={{ opacity:0,y:40,rotateX:-30 }} animate={inView?{ opacity:1,y:0,rotateX:0 }:{}} transition={{ duration:0.7,delay:delay+i*0.08,ease:EASE }} style={{ display:"inline-block" }}>
          {word}
        </motion.span>
      ))}
    </span>
  );
}

function TiltCard({ children, style={}, className="" }) {
  const ref=useRef(null);
  const [tilt,setTilt]=useState({ x:0,y:0 });
  const [hovered,setHovered]=useState(false);
  const handleMouseMove=(e)=>{
    const rect=ref.current.getBoundingClientRect();
    setTilt({ x:-((e.clientY-rect.top-rect.height/2)/(rect.height/2))*8,y:((e.clientX-rect.left-rect.width/2)/(rect.width/2))*8 });
  };
  return (
    <motion.div ref={ref} className={`card-tilt ${className}`} onMouseMove={handleMouseMove} onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>{ setTilt({ x:0,y:0 }); setHovered(false); }} animate={{ rotateX:tilt.x,rotateY:tilt.y,scale:hovered?1.02:1 }} transition={{ type:"spring",stiffness:300,damping:30 }} style={{ ...style,perspective:1000,transformStyle:"preserve-3d" }}>
      {children}
      {hovered&&<motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} style={{ position:"absolute",inset:0,borderRadius:"inherit",pointerEvents:"none",background:"radial-gradient(circle at 50% 50%,rgba(201,168,76,0.08),transparent 70%)" }} />}
    </motion.div>
  );
}

function CornerAccents({ color="rgba(201,168,76,0.4)", inset=20, size=20 }) {
  return (
    <>
      {[["top","left"],["top","right"],["bottom","left"],["bottom","right"]].map(([v,h])=>(
        <div key={`${v}${h}`} style={{ position:"absolute",[v]:inset,[h]:inset,width:size,height:size,borderTop:v==="top"?`1px solid ${color}`:"none",borderBottom:v==="bottom"?`1px solid ${color}`:"none",borderLeft:h==="left"?`1px solid ${color}`:"none",borderRight:h==="right"?`1px solid ${color}`:"none" }} />
      ))}
    </>
  );
}

function Eyebrow({ children, style={} }) {
  return <p style={{ ...eyebrowStyle,...style }}>{children}</p>;
}

function AccentLine({ text }) {
  return (
    <div style={{ display:"flex",alignItems:"center",gap:12 }}>
      <div style={{ width:24,height:1,backgroundColor:GOLD }} />
      <span style={poppins(400,12,GOLD,{ letterSpacing:"0.05em" })}>{text}</span>
    </div>
  );
}

function TagPill({ children, className="" }) {
  return (
    <span className={className} style={{ padding:"6px 14px",borderRadius:"20px",border:"1px solid rgba(201,168,76,0.25)",backgroundColor:"rgba(201,168,76,0.05)",...poppins(400,11,GOLD,{ letterSpacing:"0.05em",textTransform:"uppercase" }) }}>
      {children}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Section 1: Hero
// ---------------------------------------------------------------------------
function Section1Hero() {
  return (
    <ResponsiveHeroBanner
      badgeLabel="Welcome to CEO Square"
      badgeText=""
      title="Where Visionary Leaders Build Influence, Connections & Legacy"
      titleLine2=""
      description="A global entrepreneurial community empowering CEOs, founders, and innovators through elite networking, executive mentorship, and strategic growth opportunities."
      primaryButtonText=""
      secondaryButtonText=""
      backgroundImageUrl="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/0e2dbea0-c0a9-413f-a57b-af279633c0df_3840w.jpg"
    />
  );
}

// ---------------------------------------------------------------------------
// Section 2: Community Benefits
// ---------------------------------------------------------------------------
export const CommunityBenefitsBlock = () => {
  const wrapperRef=useRef(null), canvasRef=useRef(null);
  const sceneTextRefs=useRef([]), progressLineRef=useRef(null), progressDotsRef=useRef([]);
  const isCompactLayout=useMediaQuery("(max-width: 1024px)");
  const isMobileScreen=useMediaQuery("(max-width: 768px)");

  useEffect(()=>{
    const wrapper=wrapperRef.current;
    if(!wrapper) return undefined;
    const compactLayout=isCompactLayout;
    const mobileOnlyLayout=typeof window!=="undefined"&&window.matchMedia("(max-width: 768px)").matches;
    const communityBenefitsMotion=getCommunityBenefitsResponsiveMotion();
    const revealMobileScene=(scene)=>{
      gsap.to(scene,{ opacity:1,visibility:"visible",y:0,duration:0.1,ease:"power2.out",overwrite:"auto" });
      gsap.to(scene.querySelector(".scene-eyebrow"),{ opacity:1,y:0,letterSpacing:"0.45em",duration:0.28,ease:"power2.out",overwrite:"auto" });
      gsap.to(scene.querySelectorAll(".char-item"),{ opacity:1,y:0,filter:"blur(0px)",scale:1,rotateX:0,stagger:0.01,duration:0.42,ease:"power3.out",overwrite:"auto" });
      gsap.to(scene.querySelector(".scene-sub"),{ opacity:1,y:0,filter:"blur(0px)",duration:0.3,ease:"power2.out",overwrite:"auto" });
      gsap.to(scene.querySelector(".scene-detail"),{ opacity:1,x:0,filter:"blur(0px)",duration:0.32,ease:"power2.out",overwrite:"auto" });
      gsap.to(scene.querySelectorAll(".scene-tag-node"),{ opacity:1,y:0,scale:1,stagger:0.025,duration:0.32,ease:"back.out(1.4)",overwrite:"auto" });
      gsap.to(scene.querySelector(".scene-stat"),{ opacity:1,y:0,filter:"blur(0px)",scale:1,duration:0.34,ease:"power3.out",overwrite:"auto" });
      gsap.to(scene.querySelector(".scene-accent"),{ opacity:1,x:0,duration:0.28,ease:"power2.out",overwrite:"auto" });
    };

    if(mobileOnlyLayout){
      const scenes=sceneTextRefs.current.filter(Boolean);
      const mobileContext=gsap.context(()=>{
        scenes.forEach((scene,index)=>{
          const start=communityBenefitsMotion.mobileSceneTriggers[index]?.start??"top 82%";
          gsap.set(scene,{ opacity:0,visibility:"hidden",y:36 });
          if(index===0){
            revealMobileScene(scene);
          } else {
            ScrollTrigger.create({
              trigger:scene,
              start,
              once:true,
              onEnter:()=>revealMobileScene(scene),
              onEnterBack:()=>revealMobileScene(scene)
            });
          }
        });
      },wrapper);

      return ()=>{
        mobileContext.revert();
      };
    }

    const canvas=canvasRef.current;
    if(!canvas) return undefined;
    const ctx=canvas.getContext("2d");
    if(!ctx) return undefined;
    let animationFrameId;

    const resizeCanvas=()=>{
      const dpr=window.devicePixelRatio||1, rect=wrapper.getBoundingClientRect();
      canvas.width=rect.width*dpr; canvas.height=rect.height*dpr;
      ctx.setTransform(1,0,0,1,0,0); ctx.scale(dpr,dpr);
    };

    const getFormationCoords=(index,total,phaseIndex,width,height)=>{
      const baseScale=Math.min(width,height)*0.28;
      let x=0,y=0,z=0;
      if(phaseIndex===0){
        const goldenRatio=1+Math.sqrt(5);
        if(index<total*0.75){
          const count=total*0.75,i=index;
          const phi=Math.acos(1-2*(i+0.5)/count),theta=Math.PI*goldenRatio*i;
          const radius=baseScale*1.1;
          x=Math.cos(theta)*Math.sin(phi)*radius; y=Math.cos(phi)*radius; z=Math.sin(theta)*Math.sin(phi)*radius;
        } else {
          const count=total*0.25,i=index-total*0.75;
          const phi=Math.acos(1-2*(i+0.5)/count),theta=Math.PI*goldenRatio*i;
          const radius=baseScale*0.45;
          x=Math.cos(theta)*Math.sin(phi)*radius; y=Math.cos(phi)*radius; z=Math.sin(theta)*Math.sin(phi)*radius;
        }
      } else if(phaseIndex===1){
        const rows=28,cols=Math.floor(total/rows);
        const r=index%rows,c=Math.floor(index/rows);
        const lengthRatio=c/cols,radRatio=r/rows;
        const tubeLength=baseScale*3.2,tubeRadius=baseScale*0.65;
        const cy=(lengthRatio-0.5)*tubeLength;
        const angle=radRatio*Math.PI*2+(lengthRatio*Math.PI*2.5);
        const cx=Math.cos(angle)*tubeRadius,cz=Math.sin(angle)*tubeRadius;
        const tilt=-Math.PI/4;
        x=cx*Math.cos(tilt)-cy*Math.sin(tilt); y=cx*Math.sin(tilt)+cy*Math.cos(tilt); z=cz;
      } else if(phaseIndex===2){
        const floors=9;
        if(index<total*0.75){
          const c=total*0.75,floorIndex=index%floors,i=Math.floor(index/floors),perFloor=c/floors;
          y=((floorIndex/(floors-1))-0.5)*baseScale*2.6;
          const a=(i/perFloor)*Math.PI*2;
          const radius=baseScale*0.75*(0.85+0.15*Math.cos(a*4));
          x=Math.cos(a)*radius; z=Math.sin(a)*radius;
        } else {
          const i=index-total*0.75,c=total*0.25,struts=4;
          const strutIndex=i%struts,heightRatio=Math.floor(i/struts)/(c/struts);
          y=(heightRatio-0.5)*baseScale*2.8;
          const a=(strutIndex/struts)*Math.PI*2+(Math.PI/4);
          const radius=baseScale*0.75;
          x=Math.cos(a)*radius; z=Math.sin(a)*radius;
        }
      }
      return { x,y,z };
    };

    resizeCanvas();
    window.addEventListener("resize",resizeCanvas);

    const particleCount=compactLayout?900:850;
    const particles=Array.from({ length:particleCount },()=>{
      const angle=Math.random()*Math.PI*2;
      const sweepAngle=angle+(Math.random()-0.5)*0.6;
      const forceDistance=Math.random()*0.8+0.2;
      return {
        seed:Math.random()*120,
        size:compactLayout?Math.random()*1.5+0.65:Math.random()*1.8+0.8,
        alpha:compactLayout?Math.random()*0.28+0.42:Math.random()*0.5+0.45,
        blastX:Math.cos(sweepAngle)*forceDistance,
        blastY:Math.sin(sweepAngle)*forceDistance,
        blastZ:(Math.random()-0.5)*2.5,
        currentX:0,
        currentY:0,
        currentZ:0
      };
    });
    const ambientParticles=Array.from({ length:compactLayout?140:120 },()=>({ x:Math.random(),y:Math.random(),size:compactLayout?Math.random()*1.05+0.45:Math.random()*1.0+0.4,alpha:compactLayout?Math.random()*0.24+0.1:Math.random()*0.25+0.1,speedX:(Math.random()-0.5)*0.0004,speedY:(Math.random()-0.5)*0.0002,seed:Math.random()*Math.PI }));
    const engineState={ progress:0,blastFactor:0,rotation:0 };

    const renderEngine=()=>{
      const dpr=window.devicePixelRatio||1;
      const width=canvas.width/dpr,height=canvas.height/dpr;
      ctx.clearRect(0,0,width,height);
      const time=Date.now()*0.001;
      const baseScale=Math.min(width,height)*0.28;
      const frameRect=compactLayout?canvas.getBoundingClientRect():wrapper.getBoundingClientRect();
      const currentPhase=Math.floor(engineState.progress);
      const phaseRatio=engineState.progress%1;
      const nextPhase=Math.min(currentPhase+1,communityBenefits.length-1);
      let activeCenterX,activeCenterY;
      if(compactLayout){
        const mobileAnchors=[0.16,0.52,0.88];
        const currentAnchor=mobileAnchors[Math.min(currentPhase,mobileAnchors.length-1)]??0.5;
        const nextAnchor=mobileAnchors[Math.min(nextPhase,mobileAnchors.length-1)]??currentAnchor;
        const anchorY=currentAnchor+(nextAnchor-currentAnchor)*phaseRatio;
        const phasePulse=Math.sin(phaseRatio*Math.PI)*Math.min(height*0.28,176);
        const phaseYOffset=[-height*0.05,height*0.08,height*0.2][Math.min(currentPhase,2)]??0;
        const phaseXOffset=[0,-width*0.055,width*0.06][Math.min(currentPhase,2)]??0;
        activeCenterX=width*0.5+phaseXOffset+Math.sin((currentPhase+phaseRatio)*Math.PI)*Math.min(width*0.05,18);
        activeCenterY=height*anchorY+phasePulse+phaseYOffset;
      } else {
        const getTargetCenter=(p)=>p===0?width*0.74:p===1?width*0.26:width*0.74;
        activeCenterX=getTargetCenter(currentPhase)+(getTargetCenter(nextPhase)-getTargetCenter(currentPhase))*phaseRatio;
        activeCenterY=height*0.5;
      }

      ambientParticles.forEach((p)=>{
        p.x+=p.speedX; p.y+=p.speedY;
        if(p.x<0) p.x=1; if(p.x>1) p.x=0;
        if(p.y<0) p.y=1; if(p.y>1) p.y=0;
        ctx.fillStyle=GOLD;
        ctx.globalAlpha=compactLayout?p.alpha*(0.64+Math.sin(time+p.seed)*0.32):p.alpha*(0.4+Math.sin(time+p.seed)*0.3);
        ctx.beginPath();
        ctx.arc(p.x*width+Math.sin(time*0.5+p.seed)*(compactLayout?10:8),p.y*height+Math.cos(time*0.3+p.seed)*(compactLayout?6:5),p.size,0,Math.PI*2);
        ctx.fill();
      });

      ctx.strokeStyle="rgba(201,168,76,0.015)"; ctx.lineWidth=0.5; ctx.beginPath();
      for(let x=0;x<width;x+=100){ ctx.moveTo(x,0); ctx.lineTo(x,height); }
      for(let y=0;y<height;y+=100){ ctx.moveTo(0,y); ctx.lineTo(width,y); }
      ctx.stroke();

      if(engineState.blastFactor<0.2){
        ctx.strokeStyle=`rgba(201,168,76,${compactLayout?0.14*(1-engineState.blastFactor/0.2):0.08*(1-engineState.blastFactor/0.2)})`; ctx.lineWidth=0.5; ctx.beginPath();
        const step=compactLayout?(currentPhase===1?6:10):currentPhase===1?8:15;
        for(let i=0;i<particles.length;i+=step){
          for(let j=i+1;j<i+4;j++){
            if(j>=particles.length) break;
            const dx=particles[i].finalX-particles[j].finalX,dy=particles[i].finalY-particles[j].finalY;
            if(dx*dx+dy*dy<8500){ ctx.moveTo(particles[i].finalX,particles[i].finalY); ctx.lineTo(particles[j].finalX,particles[j].finalY); }
          }
        }
        ctx.stroke();
      }

      particles.forEach((particle,index)=>{
        const p1=getFormationCoords(index,particleCount,currentPhase,width,height);
        const p2=getFormationCoords(index,particleCount,nextPhase,width,height);
        let targetX=p1.x+(p2.x-p1.x)*phaseRatio+particle.blastX*engineState.blastFactor*(baseScale*2.35)+Math.sin(time*1.2+particle.seed)*(compactLayout?3:3);
        let targetY=p1.y+(p2.y-p1.y)*phaseRatio+particle.blastY*engineState.blastFactor*(baseScale*2.35)+Math.cos(time*0.9+particle.seed)*(compactLayout?5.5:3);
        let targetZ=p1.z+(p2.z-p1.z)*phaseRatio+particle.blastZ*engineState.blastFactor*(baseScale*2.2);
        particle.currentX+=(targetX-particle.currentX)*0.12;
        particle.currentY+=(targetY-particle.currentY)*0.12;
        particle.currentZ+=(targetZ-particle.currentZ)*0.12;
        const rotY=engineState.rotation+time*0.1,rotX=Math.sin(time*0.15)*0.08;
        const cosY=Math.cos(rotY),sinY=Math.sin(rotY);
        let nx=particle.currentX*cosY-particle.currentZ*sinY;
        let nz=particle.currentX*sinY+particle.currentZ*cosY;
        const cosX=Math.cos(rotX),sinX=Math.sin(rotX);
        let ny=particle.currentY*cosX-nz*sinX;
        nz=particle.currentY*sinX+nz*cosX;
        if(compactLayout){
          const phaseLift=[0,1.4,2.4][Math.min(currentPhase,2)]??0;
          ny*=0.72;
          ny+=Math.sin(time*0.6+particle.seed)*1.1+phaseLift;
        }
        particle.finalX=nx+activeCenterX; particle.finalY=ny+activeCenterY; particle.finalZ=nz;
        const perspective=(particle.finalZ+400)/800;
        ctx.fillStyle=index%5===0?"#ffffff":GOLD;
        ctx.globalAlpha=Math.max(compactLayout?0.1:0.05,particle.alpha*(perspective+(compactLayout?0.55:0.3)));
        ctx.shadowBlur=compactLayout?12:0;
        ctx.shadowColor="rgba(201,168,76,0.55)";
        ctx.beginPath();
        ctx.arc(particle.finalX,particle.finalY,Math.max(compactLayout?0.65:0.35,particle.size*(perspective+(compactLayout?0.68:0.5))),0,Math.PI*2);
        ctx.fill();
      });

      ctx.globalAlpha=1;
      ctx.shadowBlur=0;
      animationFrameId=window.requestAnimationFrame(renderEngine);
    };

    renderEngine();

    const timelineContext=gsap.context(()=>{
      const scenes=sceneTextRefs.current.filter(Boolean);
      scenes.forEach((scene)=>{
        gsap.set(scene,{ opacity:0,visibility:"hidden" });
        gsap.set(scene.querySelector(".scene-eyebrow"),{ opacity:0,y:15,letterSpacing:"0.2em" });
        gsap.set(scene.querySelectorAll(".char-item"),{ opacity:0,y:35,filter:"blur(12px)",scale:0.9,rotateX:-30 });
        gsap.set(scene.querySelector(".scene-sub"),{ opacity:0,y:20,filter:"blur(8px)" });
        gsap.set(scene.querySelector(".scene-detail"),{ opacity:0,x:-15,filter:"blur(6px)" });
        gsap.set(scene.querySelectorAll(".scene-tag-node"),{ opacity:0,y:15,scale:0.85 });
        gsap.set(scene.querySelector(".scene-stat"),{ opacity:0,y:25,filter:"blur(10px)",scale:0.95 });
        gsap.set(scene.querySelector(".scene-accent"),{ opacity:0,x:10 });
      });

      const buildSceneEntrance=(tl,scene,startTime)=>{
        tl.to(scene,{ opacity:1,visibility:"visible",duration:0.05 },startTime)
          .to(scene.querySelector(".scene-eyebrow"),{ opacity:1,y:0,letterSpacing:"0.45em",duration:0.4,ease:"power2.out" },startTime+0.05)
          .to(scene.querySelectorAll(".char-item"),{ opacity:1,y:0,filter:"blur(0px)",scale:1,rotateX:0,stagger:0.015,duration:0.55,ease:"power3.out" },startTime+0.1)
          .to(scene.querySelector(".scene-sub"),{ opacity:1,y:0,filter:"blur(0px)",duration:0.45,ease:"power2.out" },startTime+0.25)
          .to(scene.querySelector(".scene-detail"),{ opacity:1,x:0,filter:"blur(0px)",duration:0.5,ease:"power2.out" },startTime+0.35)
          .to(scene.querySelectorAll(".scene-tag-node"),{ opacity:1,y:0,scale:1,stagger:0.04,duration:0.4,ease:"back.out(1.4)" },startTime+0.4)
          .to(scene.querySelector(".scene-stat"),{ opacity:1,y:0,filter:"blur(0px)",scale:1,duration:0.5,ease:"power3.out" },startTime+0.45)
          .to(scene.querySelector(".scene-accent"),{ opacity:1,x:0,duration:0.4,ease:"power2.out" },startTime+0.55);
      };

      const blastKeyframes=[{ blastFactor:0.96,duration:0.3,ease:"power3.out" },{ blastFactor:0.14,duration:0.32,ease:"power2.inOut" },{ blastFactor:0,duration:0.26,ease:"power2.out" },{ blastFactor:0,duration:0.82 },{ blastFactor:0.96,duration:0.3,ease:"power3.out" },{ blastFactor:0.14,duration:0.32,ease:"power2.inOut" },{ blastFactor:0,duration:0.26,ease:"power2.out" }];
      if(compactLayout){
        scenes.forEach((scene,index)=>{
          const start=communityBenefitsMotion.mobileSceneTriggers[index]?.start??"top 82%";
          gsap.set(scene,{ opacity:0,visibility:"hidden",y:36 });
          if(index===0){
            revealMobileScene(scene);
          } else {
            ScrollTrigger.create({
              trigger:scene,
              start,
              once:true,
              onEnter:()=>revealMobileScene(scene),
              onEnterBack:()=>revealMobileScene(scene)
            });
          }
        });
      } else {
        const masterTimeline=gsap.timeline({ scrollTrigger:{ trigger:wrapper,start:"top top",end:"+=380%",pin:true,scrub:1.2,anticipatePin:1 } });
        masterTimeline.to(engineState,{ progress:2,rotation:Math.PI*2.2,ease:"none",duration:3 },0);
        masterTimeline.to(engineState,{ keyframes:blastKeyframes,duration:3,ease:"none" },0);
        if(progressLineRef.current) masterTimeline.to(progressLineRef.current,{ scaleY:1,ease:"none",duration:3 },0);
        progressDotsRef.current.forEach((dot,index)=>{
          if(!dot) return;
          if(index===0){ gsap.set(dot,{ background:GOLD,boxShadow:`0 0 16px ${GOLD}`,scale:1.3 }); return; }
          masterTimeline.to(dot,{ background:GOLD,boxShadow:`0 0 18px ${GOLD}`,scale:1.3,duration:0.3,ease:"power2.out" },(index*1.5)-0.5);
        });
        const buildSceneExit=(tl,scene,exitTime)=>{
          tl.to([scene.querySelector(".scene-eyebrow"),scene.querySelectorAll(".char-item"),scene.querySelector(".scene-sub"),scene.querySelector(".scene-detail"),scene.querySelectorAll(".scene-tag-node"),scene.querySelector(".scene-stat"),scene.querySelector(".scene-accent")],{ opacity:0,y:-40,filter:"blur(12px)",stagger:0.01,duration:0.45,ease:"power2.in" },exitTime)
            .to(scene,{ opacity:0,visibility:"hidden",duration:0.05 },exitTime+0.45);
        };
        buildSceneEntrance(masterTimeline,scenes[0],0.0);
        buildSceneExit(masterTimeline,scenes[0],0.9);
        buildSceneEntrance(masterTimeline,scenes[1],1.4);
        buildSceneExit(masterTimeline,scenes[1],2.3);
        buildSceneEntrance(masterTimeline,scenes[2],2.7);
      }
    },wrapper);

    return ()=>{
      window.removeEventListener("resize",resizeCanvas);
      window.cancelAnimationFrame(animationFrameId);
      timelineContext.revert();
    };
  },[isCompactLayout,isMobileScreen]);

  return (
    <section ref={wrapperRef} className="community-benefits-block" style={{ height:isCompactLayout?"auto":"100vh",minHeight:"100vh",position:"relative",backgroundColor:BG,overflow:isCompactLayout?"visible":"hidden",padding:isCompactLayout?"60px 0 52px":0 }}>
      <div style={{ position:"absolute",inset:0,background:"radial-gradient(circle at 50% 50%,rgba(201,168,76,0.03) 0%,transparent 75%)",pointerEvents:"none",zIndex:1 }} />
      <div style={FADE_EDGE("left")} />
      <div style={FADE_EDGE("right")} />
      <div className="community-benefits-block__axis" style={{ position:"absolute",left:60,top:"50%",transform:"translateY(-50%)",height:"300px",display:isCompactLayout?"none":"flex",flexDirection:"column",alignItems:"center",zIndex:10,pointerEvents:"none" }}>
        <div style={{ position:"relative",width:1,height:"100%",backgroundColor:"rgba(201,168,76,0.12)" }}>
          <div ref={progressLineRef} style={{ position:"absolute",top:0,left:0,width:"100%",height:"100%",background:`linear-gradient(to bottom,${GOLD},#ffffff)`,transformOrigin:"top center",transform:"scaleY(0)" }} />
        </div>
        {communityBenefits.map((benefit,index)=>(
          <div key={benefit.id} ref={(el)=>{ progressDotsRef.current[index]=el; }} style={{ position:"absolute",top:`${(index/(communityBenefits.length-1))*100}%`,transform:"translateY(-50%) translateX(-3.5px)",width:8,height:8,borderRadius:"50%",backgroundColor:"#0d0d0d",border:"1px solid rgba(201,168,76,0.55)",transition:"background 0.5s cubic-bezier(0.25,1,0.5,1),box-shadow 0.5s ease" }} />
        ))}
      </div>
      {!isMobileScreen&&(
        <div className="community-benefits-block__canvas-wrap" style={{ position:"absolute",inset:0,zIndex:2,pointerEvents:"none",opacity:1,mixBlendMode:isCompactLayout?"screen":"normal" }}>
          <canvas ref={canvasRef} style={{ width:"100%",height:"100%",display:"block" }} />
        </div>
      )}
      <div className="community-benefits-block__scenes" style={{ position:isCompactLayout?"relative":"absolute",inset:isCompactLayout?"auto":0,zIndex:5,pointerEvents:"none",display:isCompactLayout?"flex":"block",flexDirection:isCompactLayout?"column":"initial",alignItems:isCompactLayout?"center":"initial",gap:isCompactLayout?"24px":0,padding:isCompactLayout?"0 16px":0 }}>
        {communityBenefits.map((benefit,index)=>{
          const isLeft=index%2===0;
          return (
            <div key={benefit.id} ref={(el)=>{ sceneTextRefs.current[index]=el; }} className="community-benefits-block__scene" style={{ position:isCompactLayout?"relative":"absolute",top:isCompactLayout?"auto":0,left:isCompactLayout?"auto":(isLeft?"12%":"auto"),right:isCompactLayout?"auto":(isLeft?"auto":"12%"),width:isCompactLayout?"100%":"42%",maxWidth:isCompactLayout?560:"none",height:isCompactLayout?"auto":"100%",display:"flex",flexDirection:"column",justifyContent:isCompactLayout?"flex-start":"center",pointerEvents:"auto",perspective:1000,willChange:"transform, opacity",padding:isCompactLayout?"22px 16px 10px":0,borderRadius:isCompactLayout?0:0,background:isCompactLayout?"transparent":"transparent",border:isCompactLayout?"none":"none",boxShadow:isCompactLayout?"none":"none",backdropFilter:isCompactLayout?"none":"none",WebkitBackdropFilter:isCompactLayout?"none":"none",overflow:"visible",alignSelf:isCompactLayout?"center":"auto" }}>
              <div style={{ marginBottom:isCompactLayout?18:22 }}>
                <span className="scene-eyebrow" style={poppins(500,11,GOLD,{ letterSpacing:"0.2em",textTransform:"uppercase",display:"inline-block" })}>
                  CHAPTER {benefit.id} · {benefit.eyebrow}
                </span>
              </div>
              <h2 style={poppins(300,"clamp(36px,3.8vw,56px)",TEXT,{ lineHeight:1.12,letterSpacing:"-0.02em",marginBottom:32 })}>
                {benefit.headline.split("\n").map((line,lineIndex)=>(
                  <span key={`${benefit.id}-${lineIndex}`} style={{ display:"block",overflow:"hidden",paddingBottom:"8px" }}>
                    {line.split("").map((char,charIndex)=>(
                      <span key={`${benefit.id}-${lineIndex}-${charIndex}`} className="char-item" style={{ display:"inline-block",whiteSpace:char===" "?"pre":"normal",willChange:"transform,opacity,filter",backgroundImage:lineIndex===1?"linear-gradient(135deg,#c9a84c 0%,#ffffff 100%)":"none",WebkitBackgroundClip:lineIndex===1?"text":"initial",WebkitTextFillColor:lineIndex===1?"transparent":"initial",backgroundClip:lineIndex===1?"text":"initial" }}>
                        {char}
                      </span>
                    ))}
                  </span>
                ))}
              </h2>
              <p className="scene-sub" style={poppins(400,18,"rgba(245,240,232,0.95)",{ lineHeight:1.6,marginBottom:24,maxWidth:520 })}>{benefit.sub}</p>
              <p className="scene-detail" style={poppins(300,14,"rgba(245,240,232,0.52)",{ lineHeight:1.8,marginBottom:32,maxWidth:480 })}>{benefit.detail}</p>
              <div style={{ display:"flex",flexWrap:"wrap",gap:"10px",marginBottom:40 }}>
                {benefit.tags.map((tag,i)=><TagPill key={i} className="scene-tag-node">{tag}</TagPill>)}
              </div>
              <div className="scene-stat" style={{ borderLeft:`2px solid ${GOLD}`,paddingLeft:20,marginBottom:32 }}>
                <h3 style={poppins(300,42,TEXT,{ lineHeight:1,marginBottom:8 })}>{benefit.stat.value}</h3>
                <p style={poppins(300,12,"rgba(245,240,232,0.6)",{ maxWidth:280,lineHeight:1.5 })}>{benefit.stat.label}</p>
              </div>
              <div className="scene-accent"><AccentLine text={benefit.accent} /></div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

// ---------------------------------------------------------------------------
// Section 3: Statement
// ---------------------------------------------------------------------------
function Section3Statement() {
  const ref=useRef(null);
  const isCompactLayout=useMediaQuery("(max-width: 1024px)");
  const { scrollYProgress }=useScroll({ target:ref,offset:["start end","end start"] });
  const sp=useSpring(scrollYProgress,{ stiffness:70,damping:24,mass:0.35 });

  const x1=useTransform(sp,[0,1],[-50,50]);
  const x2=useTransform(sp,[0,1],[50,-50]);
  const sectionLift=useTransform(sp,[0,0.15],[120,0]);
  const handoffGlow=useTransform(sp,[0,0.2,0.5,1],[0,0.75,0.5,0.18]);
  const textOpacity=useTransform(sp,[0,0.15,0.45,0.65],[0,1,1,0.02]);
  const textScale=useTransform(sp,[0.45,0.65],[1,0.92]);
  const textBlur=useTransform(sp,[0.45,0.65],["blur(0px)","blur(16px)"]);
  const finalCardText1Opacity=useTransform(sp,[0,0.72,0.82],[1,1,0]);
  const finalCardText2Opacity=useTransform(sp,[0,0.72,0.82],[0,0,1]);

  const c1Y=useTransform(sp,[0.3,0.55,0.75,1],[200,0,0,0]);
  const c1Scale=useTransform(sp,[0.3,0.55,0.75,0.95],[0.95,1,1,1.03]);
  const c1Opacity=useTransform(sp,[0,0.3,0.4,1],[0,0,1,1]);
  const c2X=useTransform(sp,[0.22,0.45,0.6,0.75],["-60vw","-22vw","-5vw","0vw"]);
  const c2Y=useTransform(sp,[0.22,0.45,0.6,0.75],["-40vh","-15vh","-5vh","0vh"]);
  const c2Rot=useTransform(sp,[0.22,0.45,0.6,0.75],[-3,-1.5,-0.4,0]);
  const c2Opacity=useTransform(sp,[0,0.22,0.3,0.6,0.75],[0,0,1,1,0]);
  const c5X=useTransform(sp,[0.24,0.47,0.62,0.77],["-50vw","-18vw","-6vw","0vw"]);
  const c5Y=useTransform(sp,[0.24,0.47,0.62,0.77],["50vh","22vh","6vh","0vh"]);
  const c5Rot=useTransform(sp,[0.24,0.47,0.62,0.77],[-2,-1,-0.3,0]);
  const c5Opacity=useTransform(sp,[0,0.24,0.32,0.62,0.77],[0,0,1,1,0]);
  const c3X=useTransform(sp,[0.26,0.49,0.64,0.79],["60vw","25vw","8vw","0vw"]);
  const c3Y=useTransform(sp,[0.26,0.49,0.64,0.79],["40vh","18vh","5vh","0vh"]);
  const c3Rot=useTransform(sp,[0.26,0.49,0.64,0.79],[2.5,1.2,0.3,0]);
  const c3Opacity=useTransform(sp,[0,0.26,0.34,0.64,0.79],[0,0,1,1,0]);
  const c4X=useTransform(sp,[0.28,0.51,0.66,0.81],["55vw","18vw","4vw","0vw"]);
  const c4Y=useTransform(sp,[0.28,0.51,0.66,0.81],["-50vh","-22vh","-8vh","0vh"]);
  const c4Rot=useTransform(sp,[0.28,0.51,0.66,0.81],[3.5,1.8,0.5,0]);
  const c4Opacity=useTransform(sp,[0,0.28,0.36,0.66,0.81],[0,0,1,1,0]);

  const mobileCards=[
    { label:"Global Reach", title:"180+ Countries", copy:"Worldwide network access", accent:GOLD, bg:"linear-gradient(145deg,rgba(30,30,30,0.95),rgba(15,15,15,0.95))", border:"1px solid rgba(255,255,255,0.05)" },
    { label:"Investment Access", title:"Curated Deal Flow", copy:"Selective opportunities and capital connections", accent:"rgba(201,168,76,0.88)", bg:"linear-gradient(135deg,rgba(201,168,76,0.08),rgba(10,10,10,0.9))", border:"1px solid rgba(201,168,76,0.14)" },
    { label:"Leadership", title:"Executive Summits", copy:"High-trust rooms and strategic conversations", accent:"#8a8a8a", bg:"linear-gradient(145deg,rgba(20,20,20,0.94),rgba(5,5,5,0.96))", border:"1px solid rgba(255,255,255,0.08)" },
    { label:"Mentorship", title:"1-on-1 Executive Coaching", copy:"Vetted guidance and accountability", accent:"#aaaaaa", bg:"rgba(25,25,25,0.88)", border:"1px solid rgba(255,255,255,0.06)" },
  ];

  return (
    <section ref={ref} className="home-statement-section" style={{ height:"400vh",marginTop:"-10vh",position:"relative",borderTop:"1px solid rgba(201,168,76,0.06)",borderBottom:"1px solid rgba(201,168,76,0.06)",zIndex:1,willChange:"transform" }}>
      <div className="home-statement-stage" style={{ position:"sticky",top:0,height:"100vh",overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center",padding:"0 24px" }}>
        <motion.div aria-hidden="true" style={{ position:"absolute",top:-140,left:"50%",width:"min(980px,92vw)",height:280,transform:"translateX(-50%)",borderRadius:"50%",background:"radial-gradient(ellipse,rgba(201,168,76,0.08) 0%,rgba(10,10,10,0) 72%)",filter:"blur(10px)",opacity:handoffGlow,pointerEvents:"none" }} />
        <motion.div aria-hidden="true" style={{ position:"absolute",inset:"0 0 auto 0",height:240,background:"linear-gradient(180deg,rgba(10,10,10,0.96) 0%,rgba(10,10,10,0.72) 42%,rgba(10,10,10,0) 100%)",opacity:handoffGlow,pointerEvents:"none" }} />
        <motion.div className="home-statement-main" style={{ maxWidth:1200,width:"100%",margin:"0 auto",position:"absolute",zIndex:1,y:sectionLift,opacity:textOpacity,scale:textScale,filter:textBlur,willChange:"transform, opacity, filter" }}>
          <motion.div style={{ x:x1 }}>
            <p style={poppins(800,"clamp(42px,7vw,96px)","rgba(245,240,232,0.04)",{ lineHeight:1.05,textAlign:"left",whiteSpace:"nowrap",letterSpacing:"-0.02em" })}>NETWORK · MENTORSHIP</p>
          </motion.div>
          <div className="home-statement-headline" style={{ padding:"44px 0",textAlign:"center",position:"relative",zIndex:2 }}>
            <Reveal>
              <h2 style={poppins(200,"clamp(28px,4vw,52px)",TEXT,{ lineHeight:1.4,maxWidth:800,margin:"0 auto" })}>
                Not every leader gets a community built for them.<br /><span className="gold-gradient" style={{ fontWeight:600 }}>At CEO Square, you do.</span>
              </h2>
            </Reveal>
          </div>
          <motion.div style={{ x:x2 }}>
            <p style={poppins(800,"clamp(42px,7vw,96px)","rgba(201,168,76,0.04)",{ lineHeight:1.05,textAlign:"right",whiteSpace:"nowrap",letterSpacing:"-0.02em" })}>INFLUENCE · LEGACY</p>
          </motion.div>
        </motion.div>
        <div className="home-statement-cards" style={{ position:"absolute",inset:0,zIndex:10,pointerEvents:"none",display:"flex",alignItems:"center",justifyContent:"center" }}>
          <motion.div className="home-statement-card" style={{ ...MINI_CARD_BASE,width:230,height:155,background:"linear-gradient(145deg,rgba(30,30,30,0.9),rgba(15,15,15,0.9))",border:"1px solid rgba(255,255,255,0.05)",boxShadow:"0 20px 40px rgba(0,0,0,0.5)",x:c5X,y:c5Y,rotate:c5Rot,opacity:c5Opacity,zIndex:7 }}>
            <p style={poppins(undefined,11,"#888",{ letterSpacing:1 })}>Global Reach</p>
            <h4 style={poppins(400,16,TEXT,{ marginTop:6 })}>180+ Countries</h4>
          </motion.div>
          <motion.div className="home-statement-card" style={{ ...MINI_CARD_BASE,width:250,height:185,background:"linear-gradient(135deg,rgba(201,168,76,0.08),rgba(10,10,10,0.8))",border:"1px solid rgba(201,168,76,0.15)",x:c4X,y:c4Y,rotate:c4Rot,opacity:c4Opacity,zIndex:4 }}>
            <p style={poppins(undefined,11,"rgba(201,168,76,0.8)",{ letterSpacing:1 })}>Investment Access</p>
            <h4 style={poppins(300,18,TEXT,{ marginTop:6 })}>Curated Deal Flow</h4>
          </motion.div>
          <motion.div className="home-statement-card" style={{ ...MINI_CARD_BASE,width:280,height:170,background:"linear-gradient(145deg,rgba(20,20,20,0.8),rgba(5,5,5,0.9))",border:"1px solid rgba(255,255,255,0.08)",x:c3X,y:c3Y,rotate:c3Rot,opacity:c3Opacity,zIndex:6 }}>
            <p style={poppins(undefined,11,"#888",{ letterSpacing:1 })}>Leadership</p>
            <h4 style={poppins(300,19,TEXT,{ marginTop:6 })}>Executive Summits</h4>
          </motion.div>
          <motion.div className="home-statement-card" style={{ ...MINI_CARD_BASE,width:310,height:210,background:"rgba(25,25,25,0.6)",border:"1px solid rgba(255,255,255,0.06)",boxShadow:"0 30px 60px rgba(0,0,0,0.6)",x:c2X,y:c2Y,rotate:c2Rot,opacity:c2Opacity,zIndex:5,display:"flex",flexDirection:"column" }}>
            <p style={poppins(undefined,11,"#aaa",{ letterSpacing:1 })}>Mentorship</p>
            <h4 style={poppins(300,19,TEXT,{ marginTop:6 })}>1-on-1 Executive Coaching</h4>
            <div style={{ marginTop:"auto",paddingTop:20 }}>
              <div style={{ height:1,background:"rgba(255,255,255,0.1)",width:"100%" }} />
              <p style={poppins(undefined,11,"#666",{ marginTop:10 })}>Vetted guidance and accountability</p>
            </div>
          </motion.div>
          <motion.div style={{ position:"absolute",width:"min(90vw,440px)",height:290,borderRadius:24,background:"linear-gradient(145deg,rgba(201,168,76,0.15),rgba(15,15,15,1))",border:"1px solid rgba(201,168,76,0.3)",backdropFilter:"blur(24px)",boxShadow:"0 40px 80px rgba(0,0,0,0.8),inset 0 1px 0 rgba(255,255,255,0.1)",padding:32,display:"flex",flexDirection:"column",justifyContent:"space-between",y:c1Y,scale:c1Scale,opacity:c1Opacity,zIndex:20,pointerEvents:"auto",transformStyle:"preserve-3d",backfaceVisibility:"hidden",willChange:"transform, opacity" }}>
            <div style={{ position:"relative",height:"100%",display:"flex",flexDirection:"column",justifyContent:"space-between" }}>
              <div>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                  <p style={poppins(600,12,"rgba(201,168,76,0.9)",{ letterSpacing:1.5 })}>CEO Square · Dubai</p>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="rgba(201,168,76,0.8)" /></svg>
                </div>
                <div style={{ position:"relative",marginTop:16 }}>
                  <motion.h3 style={{ ...poppins(300,32,TEXT,{ lineHeight:1.2 }),position:"absolute",top:0,left:0,width:"100%",opacity:finalCardText1Opacity }}>Elite Leadership Community</motion.h3>
                  <motion.h3 style={{ ...poppins(300,32,TEXT,{ lineHeight:1.2 }),position:"relative",opacity:finalCardText2Opacity }}>Where Visionaries Shape the Future</motion.h3>
                </div>
              </div>
              <div>
                <p style={poppins(undefined,13,"#aaa")}>Global Members</p>
                <p style={poppins(500,28,TEXT,{ marginTop:4 })}>500+ CEOs & Founders</p>
              </div>
            </div>
          </motion.div>
        </div>
        {isCompactLayout&&(
          <div className="home-statement-mobile-stack" style={{ position:"relative",zIndex:12,width:"100%",maxWidth:520,margin:"0 auto",display:"none",flexDirection:"column",gap:14,pointerEvents:"auto" }}>
            {mobileCards.map((card,i)=>(
              <Reveal key={card.label} delay={0.05+i*0.09}>
                <div style={{ borderRadius:16,padding:"18px 20px",background:card.bg,border:card.border,boxShadow:"0 20px 40px rgba(0,0,0,0.35)" }}>
                  <p style={poppins(undefined,11,card.accent,{ letterSpacing:1.2,textTransform:"uppercase" })}>{card.label}</p>
                  <h4 style={poppins(400+(i===0?100:0),18+(i===0?0:1),TEXT,{ marginTop:8 })}>{card.title}</h4>
                  <p style={poppins(300,12,"rgba(245,240,232,0.55)",{ marginTop:6,lineHeight:1.6 })}>{card.copy}</p>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.42}>
              <div style={{ borderRadius:18,padding:"22px 20px",background:"linear-gradient(145deg,rgba(201,168,76,0.14),rgba(15,15,15,0.98))",border:"1px solid rgba(201,168,76,0.28)",boxShadow:"0 28px 56px rgba(0,0,0,0.44)" }}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",gap:12 }}>
                  <p style={poppins(600,12,"rgba(201,168,76,0.9)",{ letterSpacing:1.5,textTransform:"uppercase" })}>CEO Square · Dubai</p>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="rgba(201,168,76,0.8)" /></svg>
                </div>
                <h3 style={poppins(300,"clamp(24px,6vw,34px)",TEXT,{ lineHeight:1.18,marginTop:16 })}>Elite Leadership Community</h3>
                <p style={poppins(300,13,"rgba(245,240,232,0.7)",{ marginTop:10,lineHeight:1.6 })}>Where Visionaries Shape the Future</p>
                <div style={{ marginTop:18,paddingTop:14,borderTop:"1px solid rgba(255,255,255,0.08)" }}>
                  <p style={poppins(undefined,11,"#aaa")}>Global Members</p>
                  <p style={poppins(500,22,TEXT,{ marginTop:4 })}>500+ CEOs & Founders</p>
                </div>
              </div>
            </Reveal>
          </div>
        )}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Section 4: Benefits Grid
// ---------------------------------------------------------------------------
function Section4BenefitsGrid() {
  const sectionRef=useRef(null);
  const slideRefs=useRef([]), imageRefs=useRef([]), contentRefs=useRef([]), titleRefs=useRef([]);
  const isCompactLayout=useMediaQuery("(max-width: 1024px)");

  useEffect(()=>{
    const ctx=gsap.context(()=>{
      if(isCompactLayout){
        storySlides.forEach((_,i)=>{
          if(imageRefs.current[i]) gsap.set(imageRefs.current[i],{ clipPath:"polygon(0% 100%,100% 100%,100% 100%,0% 100%)" });
          if(contentRefs.current[i]) gsap.set(contentRefs.current[i],{ opacity:0,y:44 });
          if(titleRefs.current[i]) gsap.set(titleRefs.current[i].querySelectorAll(".char"),{ opacity:0,y:56,rotationX:-75 });
        });
        storySlides.forEach((_,i)=>{
          const slide=slideRefs.current[i];
          const cur={ image:imageRefs.current[i],content:contentRefs.current[i],chars:titleRefs.current[i]?.querySelectorAll(".char") };
          if(!slide) return;
          const tl=gsap.timeline({ scrollTrigger:{ trigger:slide,start:"top 78%",toggleActions:"play none none reverse",invalidateOnRefresh:true } });
          if(cur.image) tl.to(cur.image,{ clipPath:"polygon(0% 0%,100% 0%,100% 100%,0% 100%)",duration:1.1,ease:"power2.inOut" },0);
          if(cur.content) tl.to(cur.content,{ opacity:1,y:0,duration:0.85,ease:"power2.out" },0.3);
          if(cur.chars?.length) tl.to(cur.chars,{ opacity:1,y:0,rotationX:0,stagger:0.02,duration:0.9,ease:"back.out(1.4)" },0.45);
        });
      } else {
        storySlides.forEach((_,i)=>{
          if(i===0) return;
          if(imageRefs.current[i]) gsap.set(imageRefs.current[i],{ clipPath:"polygon(0% 100%,100% 100%,100% 100%,0% 100%)" });
          if(contentRefs.current[i]) gsap.set(contentRefs.current[i],{ opacity:0,y:60 });
          if(titleRefs.current[i]) gsap.set(titleRefs.current[i].querySelectorAll(".char"),{ opacity:0,y:80,rotationX:-90 });
        });
        const tl=gsap.timeline({ scrollTrigger:{ trigger:sectionRef.current,start:"top top",end:`+=${storySlides.length*100}%`,pin:true,scrub:1,anticipatePin:1 } });
        storySlides.forEach((_,i)=>{
          if(i===0) return;
          const step=gsap.timeline();
          const prev={ content:contentRefs.current[i-1],chars:titleRefs.current[i-1]?.querySelectorAll(".char") };
          const cur={ image:imageRefs.current[i],content:contentRefs.current[i],chars:titleRefs.current[i]?.querySelectorAll(".char") };
          if(prev.content) step.to(prev.content,{ opacity:0,y:-60,duration:1 },0);
          if(prev.chars?.length) step.to(prev.chars,{ opacity:0,y:-80,rotationX:90,stagger:0.02,duration:0.8 },0);
          if(cur.image) step.to(cur.image,{ clipPath:"polygon(0% 0%,100% 0%,100% 100%,0% 100%)",duration:1.5,ease:"power2.inOut" },0);
          if(cur.content) step.to(cur.content,{ opacity:1,y:0,duration:1,ease:"power2.out" },0.5);
          if(cur.chars?.length) step.to(cur.chars,{ opacity:1,y:0,rotationX:0,stagger:0.03,duration:1,ease:"back.out(1.5)" },0.5);
          tl.add(step);
        });
      }
    },sectionRef);
    return()=>ctx.revert();
  },[isCompactLayout]);

  return (
    <section ref={sectionRef} className="benefits-grid-section" style={{ height:isCompactLayout?"auto":"100vh",minHeight:isCompactLayout?"auto":"100vh",position:"relative",backgroundColor:"#050505",overflow:"hidden",color:TEXT,padding:isCompactLayout?"64px 0 72px":0 }}>
      {storySlides.map((slide,i)=>(
        <div key={slide.id} ref={(el)=>{ slideRefs.current[i]=el; }} className="benefits-slide-wrapper" style={isCompactLayout?{ position:"relative",top:"auto",left:"auto",width:"100%",height:"auto",display:"flex",flexDirection:"column",zIndex:i,marginBottom:i===storySlides.length-1?0:28 }:{ position:"absolute",top:0,left:0,width:"100%",height:"100%",display:"flex",zIndex:i }}>
          <div ref={(el)=>{ imageRefs.current[i]=el; }} className="benefits-slide-image" style={isCompactLayout?{ width:"100%",height:"56vw",minHeight:220,maxHeight:380,position:"relative",overflow:"hidden",willChange:"clip-path" }:{ width:"55%",height:"100%",position:"relative",overflow:"hidden",willChange:"clip-path" }}>
            <div style={{ position:"absolute",inset:0,backgroundColor:"#000",opacity:0.2,zIndex:1 }} />
            <img src={slide.img} alt={slide.title} style={{ width:"100%",height:"100%",objectFit:slide.id==="04"?"contain":"cover",objectPosition:"center",backgroundColor:slide.id==="04"?"#050505":"transparent" }} />
          </div>
          <div className="benefits-slide-content" style={isCompactLayout?{ width:"100%",height:"auto",display:"flex",flexDirection:"column",justifyContent:"center",padding:"28px 20px 18px",position:"relative",zIndex:2 }:{ width:"45%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"center",padding:"0 6%",position:"relative",zIndex:2 }}>
            <div ref={(el)=>{ contentRefs.current[i]=el; }} style={{ maxWidth:isCompactLayout?"100%":480,willChange:"transform, opacity" }}>
              <p style={poppins(400,13,GOLD,{ letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:20 })}>{slide.id}</p>
              <h3 style={poppins(300,"clamp(32px,3vw,48px)","#ffffff",{ lineHeight:1.1,marginBottom:24 })}>{slide.title}</h3>
              <p style={poppins(300,16,"rgba(245,240,232,0.6)",{ lineHeight:1.6,marginBottom:40 })}>{slide.desc}</p>
              <ul style={{ listStyle:"none",padding:0,margin:0,display:"flex",flexDirection:"column",gap:16 }}>
                {slide.features.map((f)=>(
                  <li key={f} style={poppins(300,14,"rgba(245,240,232,0.8)",{ display:"flex",alignItems:"center" })}>
                    <span style={{ color:GOLD,marginRight:16,fontSize:18 }}>✦</span>{f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div ref={(el)=>{ titleRefs.current[i]=el; }} className="benefits-slide-giant" style={isCompactLayout?{ position:"relative",bottom:"auto",left:"auto",transform:"none",zIndex:1,width:"100%",pointerEvents:"none",display:"flex",justifyContent:"flex-start",alignItems:"flex-start",fontFamily:"Poppins,sans-serif",fontWeight:300,fontSize:"clamp(34px,9vw,72px)",color:"rgba(255,255,255,0.22)",letterSpacing:"0.08em",lineHeight:0.92,mixBlendMode:"overlay",textShadow:"0px 12px 36px rgba(0,0,0,0.55)",filter:"drop-shadow(0 0 18px rgba(201,168,76,0.12))",perspective:"1000px",padding:"0 20px 20px" }:{ position:"absolute",bottom:"7%",left:"50%",transform:"translateX(-50%)",zIndex:1,width:"100%",pointerEvents:"none",display:"flex",justifyContent:"center",alignItems:"flex-end",fontFamily:"Poppins,sans-serif",fontWeight:300,fontSize:"clamp(46px,8.5vw,120px)",color:"rgba(255,255,255,0.58)",letterSpacing:"0.08em",lineHeight:0.92,mixBlendMode:"overlay",textShadow:"0px 12px 36px rgba(0,0,0,0.55)",filter:"drop-shadow(0 0 18px rgba(201,168,76,0.12))",perspective:"1000px" }}>
            {splitTextToSpans(slide.giantText)}
          </div>
        </div>
      ))}
    </section>
  );
}

// ---------------------------------------------------------------------------
// Section 5: Stats
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// Section 6: Story
// ---------------------------------------------------------------------------
function Section6Story() {
  return (
    <section className="home-story-section" style={{ padding:"96px 24px 120px",position:"relative" }}>
      <div style={{ maxWidth:1280,margin:"0 auto" }}>
        <motion.div initial={{ opacity:0,y:30 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true,margin:"-100px" }} transition={{ duration:1.6,ease:EASE }} style={{ marginBottom:60 }}>
          <h2 className="story-section-heading" style={poppins(700,"clamp(36px,6vw,72px)",TEXT,{ textAlign:"center",borderBottom:"1px solid rgba(201,168,76,0.1)",paddingBottom:40,textTransform:"uppercase",letterSpacing:"0.05em" })}>The CEO Square Difference</h2>
          <p style={poppins(300,18,"rgba(245,240,232,0.55)",{ textAlign:"center",marginTop:18 })}>Elevating Leadership through Collaboration & Innovation</p>
        </motion.div>
        {stories.map((story,i)=>{
          const isLeft=story.align==="left";
          const imageVariants={
            hidden:{ opacity:0.2,clipPath:isLeft?"inset(0 0 0 100%)":"inset(0 100% 0 0)",x:isLeft?90:-90,scale:0.96 },
            visible:{ opacity:1,clipPath:"inset(0 0% 0 0)",x:0,scale:1,transition:{ duration:2.2,ease:EASE } },
          };
          return (
            <motion.div key={story.eyebrow} initial="hidden" whileInView="visible" viewport={{ once:true,margin:"-30%" }} style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:56,padding:"120px 0",borderBottom:i<stories.length-1?"1px solid rgba(201,168,76,0.06)":"none",alignItems:"center" }} className="story-grid">
              <div className="story-text-col" style={{ order:isLeft?0:2 }}>
                <motion.p custom={0.9} variants={storyVariants} style={poppins(500,13,GOLD,{ letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:20 })}>
                  <span style={{ fontSize:24,fontWeight:300,marginRight:12 }}>{["01","02","03","04"][i]}</span>{story.eyebrow}
                </motion.p>
                <motion.h3 custom={1.1} variants={storyVariants} style={poppins(300,"clamp(28px,3.5vw,52px)",TEXT,{ lineHeight:1.2,marginBottom:20 })}>
                  <StaggerText text={story.title} delay={1.1} />
                </motion.h3>
                <motion.p custom={1.3} variants={storyVariants} style={poppins(300,17,"rgba(245,240,232,0.45)",{ lineHeight:1.9,marginBottom:24,maxWidth:480 })}>{story.body}</motion.p>
                <motion.div custom={1.5} variants={storyVariants}>
                  <p style={poppins(500,15,GOLD,{ letterSpacing:"0.05em",display:"inline-block" })}>{story.accent}</p>
                  <span style={{ marginLeft:32,fontSize:12,textTransform:"uppercase",letterSpacing:"0.1em",borderBottom:"1px solid rgba(201,168,76,0.4)",paddingBottom:4,cursor:"pointer",color:TEXT }}>{story.footer}</span>
                </motion.div>
              </div>
              <motion.div variants={imageVariants} className="story-image-col" style={{ order:isLeft?1:0,position:"relative" }}>
                <TiltCard style={{ borderRadius:4 }}>
                  <div className="glass" style={{ borderRadius:4,padding:"64px 48px",minHeight:320,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",position:"relative",overflow:"hidden" }}>
                    <img src="/ceo.png" alt={story.eyebrow} style={{ position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center",display:"block",transform:"scale(1.02)" }} />
                    <div aria-hidden="true" style={{ position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(10,10,10,0.82) 0%,rgba(10,10,10,0.42) 40%,rgba(10,10,10,0.68) 100%)" }} />
                    <div aria-hidden="true" style={{ position:"absolute",inset:0,background:"radial-gradient(circle at 50% 45%,rgba(201,168,76,0.12) 0%,transparent 40%)",mixBlendMode:"screen" }} />
                    <CornerAccents />
                    <div style={{ position:"relative",zIndex:1,marginTop:"auto",alignSelf:"flex-start" }}>
                      <p style={poppins(200,22,"rgba(245,240,232,0.65)",{ lineHeight:1.6 })}>{story.eyebrow}</p>
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
}

// ---------------------------------------------------------------------------
// Section 7: Quotes
// ---------------------------------------------------------------------------
function Section7Quotes() {
  const [active,setActive]=useState(0);
  useEffect(()=>{
    const id=setInterval(()=>setActive((v)=>(v+1)%quotes.length),5000);
    return()=>clearInterval(id);
  },[]);
  return (
    <section className="home-quotes-section" style={{ padding:"100px 24px",position:"relative",borderTop:"1px solid rgba(201,168,76,0.06)" }}>
      <div style={{ position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",width:1,height:"100%",background:"rgba(201,168,76,0.06)" }} />
      <div style={{ maxWidth:900,margin:"0 auto",textAlign:"center",position:"relative",zIndex:2 }}>
        <Reveal><Eyebrow style={{ marginBottom:56 }}>Voices from the community</Eyebrow></Reveal>
        <div style={{ position:"relative",minHeight:160 }}>
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity:0,y:30,filter:"blur(10px)" }} animate={{ opacity:1,y:0,filter:"blur(0px)" }} exit={{ opacity:0,y:-30,filter:"blur(10px)" }} transition={{ duration:0.7,ease:EASE }}>
              <div style={{ marginBottom:16 }}>
                {[0,1,2].map((s)=><span key={s} style={{ color:GOLD,fontSize:28,marginRight:4,filter:"drop-shadow(0 0 8px rgba(201,168,76,0.5))" }}>★</span>)}
              </div>
              <p className="quotes-text" style={poppins(200,"clamp(22px,3.5vw,42px)",TEXT,{ lineHeight:1.5,marginBottom:48,fontStyle:"italic" })}>&ldquo;{quotes[active].text}&rdquo;</p>
              <div style={{ display:"inline-flex",flexDirection:"column",alignItems:"center",gap:6 }}>
                <div style={{ width:40,height:1,background:"rgba(201,168,76,0.4)",marginBottom:12 }} />
                <p style={poppins(500,15,TEXT)}>{quotes[active].name}</p>
                <p style={poppins(300,12,"rgba(245,240,232,0.35)",{ letterSpacing:"0.1em" })}>{quotes[active].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="quotes-dots" style={{ display:"flex",gap:12,justifyContent:"center",marginTop:36 }}>
          {quotes.map((_,i)=>(
            <motion.button key={i} onClick={()=>setActive(i)} animate={{ width:i===active?40:8,background:i===active?GOLD:"rgba(245,240,232,0.15)" }} transition={{ duration:0.3 }} style={{ height:2,borderRadius:2,border:"none",cursor:"pointer",padding:0 }} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Section 8: Call To Action
// ---------------------------------------------------------------------------
function Section8CallToAction() {
  const ref=useRef(null);
  const router=useRouter();
  const { scrollYProgress }=useScroll({ target:ref,offset:["start end","end start"] });
  const scale=useTransform(scrollYProgress,[0,0.5],[0.9,1]);
  const opacity=useTransform(scrollYProgress,[0,0.3],[0,1]);
  return (
    <section ref={ref} className="home-cta-section" style={{ padding:"80px 24px 160px",position:"relative" }}>
      <motion.div style={{ scale,opacity,maxWidth:1100,margin:"0 auto" }}>
        <TiltCard style={{ borderRadius:6 }}>
          <div className="cta-inner" style={{ borderRadius:6,padding:"clamp(60px,8vw,120px) clamp(40px,6vw,100px)",position:"relative",overflow:"hidden",background:"linear-gradient(135deg,#0f0f0f 0%,#141414 50%,#0a0a0a 100%)",border:"1px solid rgba(201,168,76,0.15)",animation:"borderShimmer 4s ease-in-out infinite" }}>
            <div style={{ position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:"80%",height:"80%",borderRadius:"50%",background:"radial-gradient(ellipse,rgba(201,168,76,0.08),transparent 70%)",pointerEvents:"none" }} />
            <CornerAccents inset={32} size={50} />
            <div style={{ textAlign:"center",position:"relative",zIndex:2 }}>
              <Reveal><Eyebrow style={{ marginBottom:32 }}>Coming Soon · Dubai</Eyebrow></Reveal>
              <Reveal delay={0.15}><h2 className="cta-heading-large" style={poppins(200,"clamp(36px,6vw,80px)",TEXT,{ lineHeight:1.15,marginBottom:12 })}>A new era of</h2></Reveal>
              <Reveal delay={0.25}><h2 className="cta-heading-large" style={{ fontFamily:"Poppins",fontWeight:700,fontSize:"clamp(36px,6vw,80px)",lineHeight:1.15,marginBottom:40 }}><span className="shimmer-text">leadership begins.</span></h2></Reveal>
              <Reveal delay={0.35}><p className="cta-sub" style={poppins(300,18,"rgba(245,240,232,0.45)",{ maxWidth:600,margin:"0 auto 60px",lineHeight:1.8 })}>CEO Square is arriving in Dubai. Join a global community of visionary leaders, founders, and innovators ready to build influence, connections, and legacy.</p></Reveal>
              <Reveal delay={0.45}>
                <div className="cta-buttons" style={{ display:"flex",gap:20,justifyContent:"center",flexWrap:"wrap" }}>
                  <motion.button
                    className="cta-btn-primary"
                    type="button"
                    onClick={()=>router.push("/contact")}
                    whileHover={{ scale:1.05,boxShadow:"0 0 60px rgba(201,168,76,0.5)" }}
                    whileTap={{ scale:0.97 }}
                    style={{ fontFamily:"Poppins",fontWeight:600,fontSize:14,letterSpacing:"0.12em",textTransform:"uppercase",padding:"22px 64px",borderRadius:2,cursor:"pointer",border:"none",background:"linear-gradient(135deg,#c9a84c 0%,#f0d080 50%,#b8882a 100%)",color:BG }}
                  >
                    Join the Waitlist
                  </motion.button>
                </div>
              </Reveal>
              <Reveal delay={0.55}><p style={poppins(300,12,"rgba(245,240,232,0.2)",{ letterSpacing:"0.1em",marginTop:20,textTransform:"uppercase" })}>Invite-only · Limited seats</p></Reveal>
            </div>
          </div>
        </TiltCard>
      </motion.div>
      <div style={{ textAlign:"center",marginTop:100 }}>
        <div style={{ width:1,height:60,background:"linear-gradient(to bottom,rgba(201,168,76,0.4),transparent)",margin:"0 auto 32px" }} />
        <p style={poppins(300,11,"rgba(245,240,232,0.2)",{ letterSpacing:"0.3em",textTransform:"uppercase" })}>© 2025 CEO Square</p>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
function HomePageSections() {
  return (
    <>
      <Section1Hero />
      <CommunityBenefitsBlock />
      <Section3Statement />
      <Section4BenefitsGrid />
      <Section6Story />
      <Section7Quotes />
      <Section8CallToAction />
    </>
  );
}

export default function Home() {
  return (
    <>
      <Head><title>CEO Square | Where Visionary Leaders Build Legacy</title></Head>
      <GlobalStyle />
      <div className="noise-overlay" />
      <Particles />
      <main className="relative z-10 bg-black text-white">
        <HomePageSections />
      </main>
    </>
  );
}
 
