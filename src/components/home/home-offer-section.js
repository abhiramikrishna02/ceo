import { Check, CircleDot } from "lucide-react";

import { revealStyle, useReveal } from "@/components/home/use-reveal";
import { DottedSurface } from "@/components/ui/dotted-surface";
import { cn } from "@/lib/utils";

const services = [
  "Homepage narrative and section strategy",
  "Responsive interface design direction",
  "Conversion-focused contact path",
  "Motion and visual polish for premium pacing",
];

const metrics = [
  { value: "05", label: "Focused sections" },
  { value: "01", label: "Clear next action" },
  { value: "24/7", label: "Always-on first impression" },
];

export default function HomeOfferSection() {
  const [sectionRef, sectionVisible] = useReveal(0.24);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden border-t border-white/10 bg-black px-6 py-24 sm:px-10 lg:px-12"
    >
      <DottedSurface className="opacity-45" />
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -top-20 left-1/2 z-[1] h-[620px] w-[620px] -translate-x-1/2 rounded-full",
          "bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.12),transparent_58%)]",
          "blur-[30px]"
        )}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div style={revealStyle(sectionVisible)}>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/40">
            What Gets Built
          </p>
          <h2 className="mt-5 text-4xl font-semibold leading-tight sm:text-6xl">
            A homepage system, not just another screen.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/62">
            Each section has a job: establish authority, explain the process,
            prove the value, and move the right visitor toward a conversation.
          </p>
        </div>

        <div className="grid gap-5" style={revealStyle(sectionVisible, 160)}>
          <div className="rounded-lg border border-white/10 bg-black/60 p-6 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <CircleDot className="h-5 w-5 text-white/60" />
              <h3 className="text-xl font-semibold">Core Deliverables</h3>
            </div>

            <div className="mt-6 grid gap-3">
              {services.map((service) => (
                <div
                  key={service}
                  className="flex items-start gap-3 border-t border-white/10 pt-3 first:border-t-0 first:pt-0"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-white/70" />
                  <p className="leading-7 text-white/70">{service}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-lg border border-white/10 bg-black/60 p-5 backdrop-blur-xl"
              >
                <p className="text-3xl font-semibold text-white">{metric.value}</p>
                <p className="mt-2 text-sm leading-6 text-white/55">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
