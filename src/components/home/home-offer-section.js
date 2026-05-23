import { Check, CircleDot } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

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

const listVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 18,
    x: -10,
    filter: "blur(6px)",
  },
  show: {
    opacity: 1,
    y: 0,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.55,
      ease: "easeOut",
    },
  },
};

const metricVariants = {
  hidden: {
    opacity: 0,
    y: 22,
    scale: 0.96,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function HomeOfferSection() {
  const [sectionRef, sectionVisible] = useReveal(0.24);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 0.35, 1], [70, 0, -20]);
  const titleX = useTransform(scrollYProgress, [0, 0.5, 1], [-18, 0, 10]);
  const titleRotate = useTransform(scrollYProgress, [0, 1], [0.7, -0.4]);

  const cardY = useTransform(scrollYProgress, [0, 0.45, 1], [110, 0, -70]);
  const cardX = useTransform(scrollYProgress, [0, 0.45, 1], [28, 0, -18]);
  const cardRotate = useTransform(scrollYProgress, [0, 0.45, 1], [4, 0, -3]);

  const metricsY = useTransform(scrollYProgress, [0, 0.45, 1], [140, 10, -45]);
  const metricsX = useTransform(scrollYProgress, [0, 0.45, 1], [18, 0, -12]);

  const glowY = useTransform(scrollYProgress, [0, 1], [-30, 120]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden border-t border-white/10 bg-black px-6 py-24 sm:px-10 lg:px-12"
    >
      <DottedSurface className="opacity-45" />

      <motion.div
        aria-hidden="true"
        style={{ y: glowY, scale: glowScale }}
        className={cn(
          "pointer-events-none absolute -top-20 left-1/2 z-[1] h-[620px] w-[620px] -translate-x-1/2 rounded-full",
          "bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.12),transparent_58%)]",
          "blur-[30px]"
        )}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div style={revealStyle(sectionVisible)}>
          <motion.div
            style={{ y: titleY, x: titleX, rotate: titleRotate }}
            className="will-change-transform"
          >
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
          </motion.div>
        </div>

        <div className="grid gap-5" style={revealStyle(sectionVisible, 160)}>
          <motion.div
            style={{ y: cardY, x: cardX, rotate: cardRotate }}
            className="rounded-lg border border-white/10 bg-black/60 p-6 backdrop-blur-xl will-change-transform"
          >
            <div className="flex items-center gap-3">
              <CircleDot className="h-5 w-5 text-white/60" />
              <h3 className="text-xl font-semibold">Core Deliverables</h3>
            </div>

            <motion.div
              className="mt-6 grid gap-3"
              variants={listVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.35 }}
            >
              {services.map((service) => (
                <motion.div
                  key={service}
                  variants={itemVariants}
                  className="flex items-start gap-3 border-t border-white/10 pt-3 first:border-t-0 first:pt-0"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-white/70" />
                  <p className="leading-7 text-white/70">{service}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            style={{ y: metricsY, x: metricsX }}
            className="grid gap-4 sm:grid-cols-3 will-change-transform"
          >
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                variants={metricVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.45 }}
                transition={{ delay: index * 0.08 }}
                className="rounded-lg border border-white/10 bg-black/60 p-5 backdrop-blur-xl"
              >
                <p className="text-3xl font-semibold text-white">{metric.value}</p>
                <p className="mt-2 text-sm leading-6 text-white/55">
                  {metric.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}