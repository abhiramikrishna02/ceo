import Link from "next/link";

import { revealStyle, useReveal } from "@/components/home/use-reveal";

const nextSteps = [
  "Clearer brand story",
  "More confident first impression",
  "A stronger path to contact",
];

export default function HomeClosingSection() {
  const [sectionRef, sectionVisible] = useReveal(0.24);

  return (
    <section
      ref={sectionRef}
      className="border-t border-white/10 bg-black px-6 py-24 sm:px-10 lg:px-12"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div style={revealStyle(sectionVisible)}>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/40">
            Next Step
          </p>
          <h2 className="mt-5 max-w-2xl text-4xl font-semibold leading-tight sm:text-6xl">
            Turn the first impression into momentum.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/62">
            Keep the pitch quiet and confident: one strong message, one clear
            path forward, and a page that feels serious from the first scroll.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex h-14 items-center justify-center rounded-full bg-white px-8 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              Contact CEO2
            </Link>
            <Link
              href="/benefits"
              className="inline-flex h-14 items-center justify-center rounded-full border border-white/12 bg-white/8 px-8 text-sm font-semibold text-white transition hover:bg-white/12"
            >
              Review Benefits
            </Link>
          </div>
        </div>

        <div
          className="rounded-lg border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl"
          style={revealStyle(sectionVisible, 180)}
        >
          {nextSteps.map((item, index) => (
            <div
              key={item}
              className="flex items-center justify-between gap-6 border-b border-white/10 py-5 last:border-b-0"
            >
              <span className="text-sm text-white/42">0{index + 1}</span>
              <span className="text-right font-medium text-white/86">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
