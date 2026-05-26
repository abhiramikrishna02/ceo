import { useEffect, useState } from "react";

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);

    update();

    if (mq.addEventListener) {
      mq.addEventListener("change", update);
      return () => mq.removeEventListener("change", update);
    }

    mq.addListener(update);
    return () => mq.removeListener(update);
  }, [query]);

  return matches;
}

export function getCommunityBenefitsResponsiveMotion() {
  return {
    mobileAnchors: [0.16, 0.52, 0.88],
    phaseOffsets: {
      y: [-0.05, 0.08, 0.2],
      x: [0, -0.055, 0.06],
      lift: [0, 1.4, 2.4],
    },
    mobilePhaseRanges: [
      [0, 0.9],
      [0.9, 1.55],
      [1.55, 2],
    ],
    mobileTimeline: {
      start: "top top",
      end: "+=320%",
      duration: 3.2,
      rotation: Math.PI * 3.1,
    },
    mobileSceneTriggers: [
      { start: "top 94%" },
      { start: "top 82%" },
      { start: "top 80%" },
    ],
  };
}

export function ResponsiveStyles() {
  return (
    <style>{`
      @media(max-width:768px){
        .story-grid{grid-template-columns:1fr!important;gap:36px!important;padding:72px 0!important}
        .story-grid>div:nth-child(2){order:-1!important}
        .story-grid h3{font-size:clamp(26px,7vw,42px)!important}
        .story-grid p{font-size:15px!important;line-height:1.75!important}
        .story-grid span[style*="fontSize: 24px"]{font-size:18px!important;margin-right:10px!important}
        .home-statement-section{height:auto!important;margin-top:0!important}
        .home-statement-stage{position:relative!important;top:auto!important;height:auto!important;min-height:auto!important;display:block!important;padding:72px 20px!important;overflow:visible!important}
        .home-statement-main{position:relative!important;max-width:100%!important;opacity:1!important;transform:none!important;filter:none!important;margin:0 auto}
        .home-statement-main p{white-space:normal!important;letter-spacing:-0.01em!important;text-align:center!important}
        .home-statement-headline{padding:28px 0!important}
        .home-statement-cards{position:relative!important;inset:auto!important;display:grid!important;grid-template-columns:1fr!important;gap:16px!important;pointer-events:auto!important}
        .home-statement-card{position:relative!important;width:100%!important;height:auto!important;min-height:unset!important;padding:18px!important;transform:none!important;opacity:1!important}
        .home-statement-card h4{font-size:16px!important}
        .home-statement-card p{font-size:12px!important}
        .home-benefits-grid{height:auto!important;min-height:auto!important}
        .home-benefits-slide{position:relative!important;display:grid!important;grid-template-columns:1fr!important;height:auto!important;min-height:auto!important;z-index:auto!important;margin-bottom:56px!important}
        .home-benefits-image{width:100%!important;height:240px!important}
        .home-benefits-content{width:100%!important;padding:24px 0 0!important}
        .home-benefits-giant{position:relative!important;left:auto!important;bottom:auto!important;transform:none!important;justify-content:flex-start!important;margin-top:18px!important;font-size:clamp(34px,10vw,68px)!important}
        .home-stats-section{padding:88px 20px!important}
        .home-story-section{padding:80px 20px 96px!important}
        .home-quotes-section{padding:84px 20px!important}
        .home-cta-section{padding:72px 20px 120px!important}
        .home-cta-section h2{font-size:clamp(32px,9vw,64px)!important}
        .home-cta-section button{width:100%!important;max-width:360px!important}
        .community-benefits-block{display:block!important;height:auto!important;min-height:100vh;padding:64px 0 56px!important;overflow-x:hidden!important;overflow-y:visible!important}
        .community-benefits-block__axis{display:none!important}
        .community-benefits-block__text,.community-benefits-block__visual{width:100%!important}
        .community-benefits-block__text{padding:0 20px 24px!important}
        .community-benefits-block__scenes{position:relative!important;height:auto!important;display:flex!important;flex-direction:column!important;gap:clamp(28px,6vw,44px)!important;padding:0 18px!important;align-items:center!important}
        .community-benefits-block__scene{position:relative!important;top:auto!important;left:auto!important;right:auto!important;inset:auto!important;width:100%!important;max-width:560px!important;background:transparent!important;border:none!important;box-shadow:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;overflow:visible!important}
        .community-benefits-block__visual{display:none!important;min-height:0!important}
        .community-benefits-block__canvas-wrap{position:sticky!important;top:0!important;height:100vh!important;margin-bottom:-100vh!important;display:block!important;opacity:1!important;mix-blend-mode:screen!important;z-index:2!important}
      }
      @media(max-width:980px){
        .community-benefits-block{display:block!important;height:auto!important;min-height:100vh;padding:72px 0 64px!important;overflow-x:hidden!important;overflow-y:visible!important}
        .community-benefits-block__axis{display:none!important}
        .community-benefits-block__scenes{position:relative!important;height:auto!important;display:flex!important;flex-direction:column!important;gap:clamp(32px,5vw,56px)!important;padding:0 24px!important;align-items:center!important}
        .community-benefits-block__scene{position:relative!important;top:auto!important;left:auto!important;right:auto!important;inset:auto!important;width:100%!important;max-width:620px!important;background:transparent!important;border:none!important;box-shadow:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;overflow:visible!important}
        .community-benefits-block__canvas-wrap{position:sticky!important;top:0!important;height:100vh!important;margin-bottom:-100vh!important;display:block!important;opacity:1!important;mix-blend-mode:screen!important;z-index:2!important}
      }
      @media(max-width:1024px){
        html,body{overflow-x:hidden;max-width:100vw}
        .community-benefits-block{overflow-x:hidden!important;overflow-y:visible!important}
        .community-benefits-block__canvas-wrap{
          position:sticky!important;
          top:0!important;
          left:-10vw!important;
          width:120vw!important;
          height:100vh!important;
          margin-bottom:-100vh!important;
          display:block!important;
          opacity:1!important;
          mix-blend-mode:screen!important;
          z-index:3!important;
          transform:scale(1.16)!important;
          transform-origin:center center!important;
          filter:saturate(1.15) contrast(1.05)!important;
        }
        .community-benefits-block__scenes{
          position:relative!important;
          inset:auto!important;
          z-index:4!important;
          pointer-events:none!important;
        }
        .community-benefits-block__scene{
          background:transparent!important;
          border:none!important;
          box-shadow:none!important;
          backdrop-filter:none!important;
          -webkit-backdrop-filter:none!important;
          overflow:visible!important;
        }
        .community-benefits-block__scene h2,.community-benefits-block__scene .scene-eyebrow,.community-benefits-block__scene .scene-sub,.community-benefits-block__scene .scene-detail,.community-benefits-block__scene .scene-stat h3,.community-benefits-block__scene .scene-stat p{text-shadow:0 2px 18px rgba(0,0,0,0.32)}
        .benefits-grid-section{height:auto!important;overflow:visible!important}
        .benefits-slide-wrapper{position:relative!important;display:flex!important;flex-direction:column!important;width:100%!important;height:auto!important;z-index:auto!important;border-bottom:1px solid rgba(201,168,76,0.08);padding-bottom:8px!important;margin-bottom:24px!important}
        .benefits-slide-wrapper:last-child{margin-bottom:0!important}
        .benefits-slide-image{width:100%!important;height:56vw!important;min-height:220px!important;max-height:380px!important;flex-shrink:0}
        .benefits-slide-content{width:100%!important;padding:28px 20px 24px!important}
        .benefits-slide-content h3{font-size:clamp(24px,6vw,36px)!important;line-height:1.15!important;margin-bottom:16px!important}
        .benefits-slide-content p{font-size:14px!important;line-height:1.7!important;margin-bottom:28px!important}
        .benefits-slide-content li{font-size:13px!important}
        .benefits-slide-giant{position:relative!important;bottom:auto!important;left:auto!important;transform:none!important;display:block!important;font-size:clamp(32px,9vw,64px)!important;text-align:left!important;padding:0 20px 24px!important;opacity:0.25!important;pointer-events:none;overflow:hidden;white-space:normal!important;overflow-wrap:anywhere!important;word-break:break-word!important}
        .home-statement-section{height:auto!important;margin-top:0!important}
        .home-statement-stage{position:relative!important;top:auto!important;height:auto!important;min-height:auto!important;display:flex!important;flex-direction:column!important;align-items:center!important;padding:64px 20px 56px!important;overflow:visible!important;gap:20px!important}
        .home-statement-main{position:relative!important;max-width:100%!important;opacity:1!important;transform:none!important;filter:none!important;margin:0 auto!important;width:100%!important;display:flex!important;flex-direction:column!important;align-items:center!important;gap:12px!important}
        .home-statement-mobile-stack{display:flex!important}
        .home-statement-cards{display:none!important}
        .home-statement-main>div{width:100%!important;transform:none!important}
        .home-statement-main p{white-space:normal!important;letter-spacing:-0.01em!important;text-align:center!important;font-size:clamp(18px,5vw,30px)!important;line-height:1.08!important}
        .home-statement-headline{padding:22px 0 28px!important;text-align:center!important}
        .home-statement-headline h2{font-size:clamp(22px,5.5vw,34px)!important;line-height:1.35!important}
        .home-statement-cards{position:relative!important;inset:auto!important;display:flex!important;flex-direction:column!important;align-items:stretch!important;gap:14px!important;pointer-events:auto!important;width:100%!important;max-width:520px!important;margin:0 auto!important;padding:0!important}
        .home-statement-card{position:relative!important;width:100%!important;height:auto!important;min-height:unset!important;padding:18px 20px!important;transform:none!important;opacity:1!important;border-radius:16px!important}
        .home-statement-card h4{font-size:16px!important;margin-top:6px!important}
        .home-statement-card p{font-size:12px!important}
        .home-stats-section{padding:72px 20px!important}
        .stats-grid{grid-template-columns:1fr 1fr!important;gap:2px!important}
        .stat-cell{padding:36px 20px!important}
        .stat-value{font-size:clamp(34px,9vw,54px)!important}
        .home-story-section{padding:64px 20px 80px!important}
        .story-section-heading{font-size:clamp(26px,7vw,52px)!important;text-align:center!important}
        .story-grid{grid-template-columns:1fr!important;gap:32px!important;padding:64px 0!important}
        .story-text-col{order:1!important}
        .story-image-col{order:0!important}
        .story-grid h3{font-size:clamp(24px,6.5vw,38px)!important;line-height:1.25!important}
        .story-grid p{font-size:15px!important;line-height:1.75!important}
        .home-quotes-section{padding:72px 20px 80px!important}
        .quotes-text{font-size:clamp(19px,5vw,32px)!important;line-height:1.55!important}
        .quotes-dots{gap:10px!important;margin-top:28px!important}
        .home-cta-section{padding:56px 16px 100px!important}
        .cta-inner{padding:clamp(40px,8vw,72px) clamp(24px,5vw,56px)!important}
        .cta-heading-large{font-size:clamp(30px,8vw,56px)!important;line-height:1.2!important}
        .cta-sub{font-size:16px!important;margin-bottom:40px!important}
        .cta-buttons{flex-direction:column!important;align-items:center!important;gap:14px!important}
        .cta-btn-primary{width:100%!important;max-width:360px!important;padding:20px 32px!important}
        .community-benefits-block__scene h2{font-size:clamp(30px,6vw,48px)!important}
        .community-benefits-block__scene p{font-size:15px!important}
        .community-benefits-block{height:auto!important;min-height:100vh!important;padding:64px 0 56px!important;overflow-x:hidden!important;overflow-y:visible!important}
        .community-benefits-block__axis{display:none!important}
        .community-benefits-block__canvas-wrap{position:sticky!important;top:0!important;height:100vh!important;margin-bottom:-100vh!important;display:block!important;opacity:1!important;mix-blend-mode:screen!important;z-index:2!important}
        .community-benefits-block__scenes{position:relative!important;inset:auto!important;display:flex!important;flex-direction:column!important;gap:clamp(28px,5vw,44px)!important;padding:0 18px!important;align-items:center!important}
        .community-benefits-block__scene{position:relative!important;top:auto!important;left:auto!important;right:auto!important;inset:auto!important;width:100%!important;max-width:620px!important;height:auto!important;padding:16px 6px 10px!important;border-radius:0!important;background:transparent!important;border:none!important;box-shadow:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;overflow:visible!important}
        .community-benefits-block__scene h2{font-size:clamp(30px,8vw,44px)!important;line-height:1.15!important;margin-bottom:22px!important}
        .community-benefits-block__scene .scene-eyebrow{letter-spacing:0.18em!important}
        .community-benefits-block__scene .scene-sub{font-size:16px!important;line-height:1.6!important;margin-bottom:18px!important}
        .community-benefits-block__scene .scene-detail{font-size:13px!important;line-height:1.8!important;margin-bottom:24px!important}
        .community-benefits-block__scene .scene-stat{margin-bottom:24px!important}
        .community-benefits-block__scene .scene-stat h3{font-size:34px!important}
      }
      @media(max-width:640px){
        .home-statement-headline h2{font-size:clamp(20px,6vw,28px)!important}
        .stats-grid{grid-template-columns:1fr 1fr!important}
        .stat-cell{padding:28px 14px!important}
        .stat-value{font-size:clamp(30px,10vw,46px)!important}
        .story-grid{gap:24px!important;padding:48px 0!important}
        .benefits-slide-image{height:62vw!important}
        .benefits-slide-content{padding:22px 16px 18px!important}
        .benefits-slide-content h3{font-size:clamp(22px,7vw,30px)!important;margin-bottom:14px!important}
        .benefits-slide-content p{font-size:13px!important;margin-bottom:24px!important}
        .benefits-slide-content li{font-size:12px!important}
        .benefits-slide-giant{font-size:clamp(28px,10vw,48px)!important;padding:0 16px 20px!important}
        .home-cta-section{padding:44px 14px 80px!important}
        .cta-inner{padding:32px 20px!important}
        .community-benefits-block{padding:48px 0 44px!important}
        .community-benefits-block__scenes{gap:clamp(24px,5vw,36px)!important;padding:0 14px!important}
        .community-benefits-block__scene h2{font-size:clamp(26px,8vw,40px)!important}
        .home-quotes-section{padding:56px 16px 64px!important}
        .quotes-text{font-size:clamp(18px,5.5vw,26px)!important}
      }
      @media(min-width:641px) and (max-width:1024px){
        .stats-grid{grid-template-columns:repeat(2,1fr)!important}
        .stat-cell{padding:44px 28px!important}
        .story-grid{grid-template-columns:1fr!important;gap:40px!important;padding:80px 0!important}
        .benefits-slide-image{height:44vw!important}
      }
    `}</style>
  );
}
