"use client"

import * as React from "react"
import { useMeasure } from "@uidotdev/usehooks"
import { cva } from "class-variance-authority"
import { motion, useScroll, useTransform } from "motion/react"
import { Sparkles, Rocket, Globe, Orbit } from "lucide-react"

import { cn } from "@/lib/utils"

// ----------------------------------------------------------------------
// 1. COMPONENT DEFINITIONS
// ----------------------------------------------------------------------

const processCardVariants = cva("flex border backdrop-blur-md transition-colors", {
  variants: {
    variant: {
      // Matte Black and Gold Theme
      gold: "flex border text-neutral-100 border-[#D4AF37]/20 bg-gradient-to-br from-[#121212]/90 to-[#0a0a0a]/95 shadow-[0_0_30px_rgba(212,175,55,0.03)]",
      light: "shadow",
    },
    size: {
      sm: "min-w-[25%] max-w-[25%]",
      md: "min-w-[50%] max-w-[50%]",
      lg: "min-w-[75%] max-w-[75%]",
      xl: "min-w-full max-w-full",
    },
  },
  defaultVariants: {
    variant: "gold",
    size: "md",
  },
})

const ContainerScrollContext = React.createContext(undefined)

function useContainerScrollContext() {
  const context = React.useContext(ContainerScrollContext)
  if (!context) {
    throw new Error(
      "useContainerScrollContext must be used within a ContainerScroll Component"
    )
  }
  return context
}

export const ContainerScroll = ({
  children,
  className,
  ...props
}) => {
  const scrollRef = React.useRef(null)
  const { scrollYProgress } = useScroll({
    target: scrollRef,
  })
  return (
    <ContainerScrollContext.Provider value={{ scrollYProgress }}>
      <div
        ref={scrollRef}
        className={cn("relative min-h-[120vh]", className)}
        {...props}
      >
        {children}
      </div>
    </ContainerScrollContext.Provider>
  )
}

export const ContainerSticky = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("sticky left-0 top-0 w-full overflow-hidden", className)}
    {...props}
  />
))
ContainerSticky.displayName = "ContainerSticky"

export const ProcessCardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 flex items-center justify-center border-r border-[#D4AF37]/20 bg-black/40", className)} {...props} />
))
ProcessCardTitle.displayName = "ProcessCardTitle"

export const ProcessCardBody = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-6 p-8 md:p-12", className)}
    {...props}
  />
))
ProcessCardBody.displayName = "ProcessCardBody"

export const ProcessCard = ({
  className,
  style,
  variant,
  size,
  itemsLength,
  index,
  ...props
}) => {
  const { scrollYProgress } = useContainerScrollContext()
  const start = index / itemsLength
  const end = start + 1 / itemsLength
  const [innerWidth, setInnerWidth] = React.useState(() =>
    typeof window === "undefined" ? 0 : window.innerWidth
  )
  const [ref, { width }] = useMeasure()

  React.useEffect(() => {
    const handleResize = () => setInnerWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const x = useTransform(
    scrollYProgress,
    [start, end],
    [innerWidth, -((width ?? 0) * index) + 64 * index]
  )

  return (
    <motion.div
      ref={ref}
      style={{
        x: index > 0 ? x : 0,
        ...style,
      }}
      className={cn(processCardVariants({ variant, size }), className)}
      {...props}
    />
  )
}
ProcessCard.displayName = "ProcessCard"

// ----------------------------------------------------------------------
// 2. MAIN EXPORT (REPLACING YOUR TIMELINE)
// ----------------------------------------------------------------------

const PROCESS_PHASES = [
  {
    id: "phase-1",
    title: "Mission Ignition & Feasibility",
    description:
      "Every journey begins with a spark. In this phase, we analyze trajectory physics, structural integrity, and deep-space feasibility. We map out the impossible and turn it into calculated mathematical realities.",
    icon: <Sparkles className="w-5 h-5 text-[#D4AF37]" />,
  },
  {
    id: "phase-2",
    title: "Orbital Architecture",
    description:
      "Transitioning from blueprints to reality. We construct the skeletal framework of the vessel, focusing on aerodynamic resilience and advanced propulsion systems. Here, aesthetics meet absolute zero engineering.",
    icon: <Orbit className="w-5 h-5 text-[#D4AF37]" />,
  },
  {
    id: "phase-3",
    title: "Payload Integration",
    description:
      "Integrating cutting-edge life support and navigation systems. Our specialists ensure seamless synchronization between human operators and AI-driven telemetry. Form and function operating in the vacuum.",
    icon: <Globe className="w-5 h-5 text-[#D4AF37]" />,
  },
  {
    id: "phase-4",
    title: "Launch & Cosmic Touchdown",
    description:
      "The final countdown. Rigorous stress-testing under simulated hyper-gravity conditions guarantees flawless execution. We ignite the thrusters, breaking atmosphere to deliver an unforgettable cosmic experience.",
    icon: <Rocket className="w-5 h-5 text-[#D4AF37]" />,
  },
]

export default function ProcessTimeline() {
  return (
    <section className="relative w-full bg-[#050505] selection:bg-[#D4AF37]/30">
      <ContainerScroll
        className="h-[420vh]"
        style={{
          // Matte black with a subtle, premium gold radial glow originating from the left
          background:
            "radial-gradient(40% 70% at 0% 50%, rgba(212, 175, 55, 0.09) 0%, rgba(5, 5, 5, 1) 78%)",
        }}
      >
        <ContainerSticky className="top-0 flex min-h-screen items-start">
          <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-16 md:px-6 md:py-20">
            <div className="mb-10 space-y-6 md:mb-16">
              <p className="font-mono text-sm uppercase tracking-[0.2em] text-[#D4AF37]">
                Trajectory Established
              </p>
              <h2 className="font-serif text-4xl leading-[1.1] tracking-tight text-white md:text-6xl">
                Mapping the journey <br />
                <span className="bg-gradient-to-r from-[#D4AF37] via-[#FDE047] to-[#B48B25] bg-clip-text text-transparent">
                  into the unknown.
                </span>
              </h2>
              <p className="max-w-[50ch] font-sans text-base leading-relaxed text-neutral-400 md:text-lg">
                We blend celestial mechanics with cutting-edge engineering to
                build stunning, high-performance vessels that elevate humanity and
                conquer the cosmos.
              </p>
            </div>

            <div className="flex flex-nowrap items-stretch gap-0 pb-8">
              {PROCESS_PHASES.map((phase, index) => (
                <ProcessCard
                  key={phase.id}
                  itemsLength={PROCESS_PHASES.length}
                  index={index}
                  className="mr-6 min-w-[85%] max-w-[85%] overflow-hidden rounded-2xl last:mr-0 md:min-w-[60%] md:max-w-[60%]"
                >
                  <ProcessCardTitle className="hidden min-w-[120px] sm:flex">
                    <div className="flex flex-col items-center gap-4">
                      <div className="flex size-12 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 backdrop-blur-md">
                        {phase.icon}
                      </div>
                      <span className="font-mono text-sm text-[#D4AF37]/60">
                        PHASE {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </ProcessCardTitle>

                  <ProcessCardBody className="flex flex-col justify-center">
                    <div className="mb-4 flex size-10 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 sm:hidden">
                      {phase.icon}
                    </div>
                    <h3 className="font-serif text-2xl leading-tight text-neutral-50 md:text-4xl">
                      {phase.title}
                    </h3>
                    <p className="max-w-xl font-sans text-sm leading-relaxed text-neutral-400 md:text-base">
                      {phase.description}
                    </p>
                  </ProcessCardBody>
                </ProcessCard>
              ))}
            </div>
          </div>
        </ContainerSticky>
      </ContainerScroll>
    </section>
  )
}
