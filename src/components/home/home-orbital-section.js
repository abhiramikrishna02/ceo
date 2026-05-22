import { Calendar, Code, FileText, Rocket, User } from "lucide-react";

import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

const timelineData = [
  {
    id: 1,
    title: "Discovery",
    date: "Week 01",
    content:
      "Leadership goals, audience expectations, and business priorities are mapped into one clear brief.",
    category: "Planning",
    icon: Calendar,
    relatedIds: [2],
    status: "completed",
    energy: 100,
  },
  {
    id: 2,
    title: "Positioning",
    date: "Week 02",
    content:
      "CEO2 sharpens the message, hierarchy, and trust signals that should carry the page.",
    category: "Strategy",
    icon: FileText,
    relatedIds: [1, 3],
    status: "completed",
    energy: 90,
  },
  {
    id: 3,
    title: "Experience",
    date: "Week 03",
    content:
      "The visual system, scroll rhythm, and interaction moments are designed for a premium first impression.",
    category: "Design",
    icon: User,
    relatedIds: [2, 4],
    status: "in-progress",
    energy: 72,
  },
  {
    id: 4,
    title: "Build",
    date: "Week 04",
    content:
      "The page becomes a responsive Next.js experience with refined motion and production-ready details.",
    category: "Development",
    icon: Code,
    relatedIds: [3, 5],
    status: "in-progress",
    energy: 58,
  },
  {
    id: 5,
    title: "Launch",
    date: "Week 05",
    content: "Final polish, QA, and launch support turn the first impression into momentum.",
    category: "Release",
    icon: Rocket,
    relatedIds: [4],
    status: "pending",
    energy: 32,
  },
];

export default function HomeOrbitalSection() {
  return (
    <section className="border-t border-white/10">
      <RadialOrbitalTimeline timelineData={timelineData} />
    </section>
  );
}
