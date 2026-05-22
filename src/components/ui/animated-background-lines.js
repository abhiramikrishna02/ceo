import Link from "next/link";

function GlobalStylesAndKeyframes() {
  return (
    <style jsx global>{`
      @keyframes gradientShift {
        0% {
          filter: hue-rotate(0deg);
        }
        100% {
          filter: hue-rotate(30deg);
        }
      }

      @keyframes lineMove {
        0% {
          transform: translateX(-100%);
        }
        100% {
          transform: translateX(100%);
        }
      }

      @keyframes cornerLineAnimation {
        0% {
          stroke-dashoffset: 0;
        }
        25% {
          stroke-dashoffset: 100;
        }
        50% {
          stroke-dashoffset: 200;
        }
        75% {
          stroke-dashoffset: 300;
        }
        100% {
          stroke-dashoffset: 400;
        }
      }

      @keyframes gridMove {
        0% {
          background-position: 0 0;
        }
        100% {
          background-position: 50px 50px;
        }
      }
    `}</style>
  );
}

function AnimatedCTASection({
  eyebrow = "Authority",
  title = "Ready to build",
  highlight = "the software of the future?",
  description = "CEO2 turns executive positioning into a focused digital experience that earns trust before the first call.",
  buttonText = "Start building",
  buttonHref = "/contact",
}) {
  const lineWrapperTops = [
    "top-[10%]",
    "top-[30%]",
    "top-[50%]",
    "top-[70%]",
    "top-[90%]",
  ];

  return (
    <>
      <GlobalStylesAndKeyframes />
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black p-8 font-sans text-white sm:p-16">
        <div className="absolute inset-0 z-0 h-full w-full animate-[gridMove_20s_linear_infinite] bg-[linear-gradient(rgba(255,149,0,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,149,0,0.07)_1px,transparent_1px)] bg-[length:50px_50px]" />

        <div className="absolute inset-0 z-[1] h-full w-full overflow-hidden">
          {lineWrapperTops.map((topClass, index) => (
            <div key={topClass} className={`absolute h-[100px] w-full ${topClass}`}>
              <div className="relative h-0.5 w-full overflow-hidden">
                <div
                  className={`absolute top-0 h-full w-full animate-[lineMove_4s_linear_infinite] ${
                    index % 2 !== 0
                      ? "[animation-direction:reverse] [animation-delay:2s]"
                      : ""
                  }`}
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, #ff9500 20%, #ffd700 50%, #ff9500 80%, transparent 100%)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="absolute left-1/2 top-1/2 z-[5] hidden h-[100px] w-[300px] -translate-x-1/2 -translate-y-1/2 md:block">
          <svg
            className="absolute left-[-150px] top-1/2 h-[60px] w-[120px] -translate-y-1/2 animate-[cornerLineAnimation_6s_linear_infinite]"
            viewBox="0 0 120 60"
            stroke="#ff9500"
            strokeWidth="2"
            fill="none"
            strokeDasharray="50"
          >
            <path d="M120 0 L20 0 Q0 0 0 20 L0 60" />
          </svg>
          <svg
            className="absolute right-[-150px] top-1/2 h-[60px] w-[120px] -translate-y-1/2 scale-x-[-1] animate-[cornerLineAnimation_6s_linear_infinite] [animation-delay:3s]"
            viewBox="0 0 120 60"
            stroke="#ff9500"
            strokeWidth="2"
            fill="none"
            strokeDasharray="50"
          >
            <path d="M120 0 L20 0 Q0 0 0 20 L0 60" />
          </svg>
        </div>

        <div className="relative z-[10] max-w-3xl text-center">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
            {eyebrow}
          </p>
          <h2 className="mb-8 text-[clamp(2.5rem,5vw,4rem)] font-bold leading-tight">
            {title}
            <br />
            <span
              className="inline-block animate-[gradientShift_3s_ease-in-out_infinite_alternate]"
              style={{
                backgroundImage: "linear-gradient(45deg, #ff9500, #ffb347, #ffd700)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {highlight}
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-7 text-white/68 sm:text-lg">
            {description}
          </p>
          <Link
            href={buttonHref}
            className="mt-10 inline-block rounded-lg bg-white px-8 py-3 text-base font-semibold text-black no-underline transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(255,255,255,0.15)] active:translate-y-0 active:shadow-[0_5px_15px_rgba(255,255,255,0.1)] sm:px-10 sm:py-4 sm:text-lg"
          >
            {buttonText}
          </Link>
        </div>
      </section>
    </>
  );
}

export default function CtaPage(props) {
  return (
    <div className="bg-black">
      <AnimatedCTASection {...props} />
    </div>
  );
}
