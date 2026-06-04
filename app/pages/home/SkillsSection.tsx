import SectionWrapper from "@/components/ui/section-wrapper";
import { skills, type SkillCategory } from "@/constants/skill";
import { getDevIcon } from "@/lib/utils";
import { Blocks, Brain, Code2, Database, Orbit } from "lucide-react";
import Image from "next/image";

type StackLane = {
  title: string;
  label: string;
  description: string;
  tint: string;
  icon: typeof Code2;
  categories: SkillCategory[];
};

const stackLanes: StackLane[] = [
  {
    title: "Product interfaces",
    label: "Frontend and UI",
    description:
      "The tools I reach for when the work is interaction, layout, motion, and reusable interface systems.",
    tint: "var(--secondary)",
    icon: Orbit,
    categories: ["frontend", "ui"],
  },
  {
    title: "Application systems",
    label: "Languages and backend",
    description:
      "Languages, frameworks, databases, and services I use to shape product logic and data flows.",
    tint: "var(--primary)",
    icon: Database,
    categories: ["languages", "backend"],
  },
  {
    title: "Shipping work",
    label: "Delivery tools",
    description:
      "The supporting toolkit around deployment, version control, infrastructure, and everyday product work.",
    tint: "var(--secondary)",
    icon: Blocks,
    categories: ["devops", "other"],
  },
];

const categoryLabels: Record<SkillCategory, string> = {
  languages: "Languages",
  frontend: "Frontend",
  ui: "UI",
  backend: "Backend",
  devops: "DevOps",
  other: "Other",
};

function SkillChip({ skill, tint }: { skill: string; tint: string }) {
  const iconUrl = getDevIcon(skill);

  return (
    <li
      className="group flex min-h-11 items-center gap-3 rounded-full border px-4 py-2 text-sm leading-none transition-transform duration-300 hover:-translate-y-0.5"
      style={{
        borderColor: `color-mix(in oklch, var(--border) 76%, ${tint} 24%)`,
        background: `linear-gradient(135deg, color-mix(in oklch, var(--background) 90%, ${tint} 10%), color-mix(in oklch, var(--background) 96%, ${tint} 4%))`,
      }}
    >
      <span
        className="flex h-8 w-8 items-center justify-center rounded-full border"
        style={{
          borderColor: `color-mix(in oklch, var(--border) 70%, ${tint} 30%)`,
          background: `color-mix(in oklch, ${tint} 10%, var(--background) 90%)`,
        }}
      >
        {iconUrl ? (
          <Image alt={skill} src={iconUrl} width={18} height={18} className="h-[18px] w-[18px]" />
        ) : (
          <Brain className="h-4 w-4" />
        )}
      </span>
      <span className="capitalize text-foreground/90 transition-transform duration-300 group-hover:translate-x-0.5">
        {skill}
      </span>
    </li>
  );
}

function StackLaneCard({ lane, index }: { lane: StackLane; index: number }) {
  const Icon = lane.icon;

  return (
    <article className="relative overflow-hidden rounded-2xl border border-border/70">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            index % 2 === 0
              ? "linear-gradient(150deg, color-mix(in oklch, var(--background) 92%, var(--secondary) 8%), color-mix(in oklch, var(--background) 98%, var(--primary) 4%))"
              : "linear-gradient(150deg, color-mix(in oklch, var(--background) 90%, var(--primary) 10%), color-mix(in oklch, var(--background) 98%, var(--secondary) 4%))",
        }}
      />

      <div className="relative z-10 grid gap-7 p-5 md:p-6 xl:grid-cols-[minmax(14rem,0.46fr)_minmax(0,1fr)] xl:p-7">
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <span
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border"
              style={{
                borderColor: `color-mix(in oklch, var(--border) 70%, ${lane.tint} 30%)`,
                background: `color-mix(in oklch, ${lane.tint} 12%, var(--background) 88%)`,
              }}
            >
              <Icon className="h-4 w-4" />
            </span>
            <div className="min-w-0 space-y-1.5">
              <p className="text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
                {lane.label}
              </p>
              <h3 className="font-incognito text-3xl leading-[0.98] tracking-[-0.01em] md:text-[2.4rem]">
                {lane.title}
              </h3>
            </div>
          </div>

          <p className="max-w-md text-sm leading-6 text-muted-foreground md:text-[0.95rem]">
            {lane.description}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {lane.categories.map((category) => (
            <div key={category} className="space-y-3">
              <p className="text-[0.72rem] uppercase tracking-[0.22em] text-muted-foreground">
                {categoryLabels[category]}
              </p>
              <ul className="flex flex-wrap gap-3">
                {skills[category].map((skill) => (
                  <SkillChip key={skill} skill={skill} tint={lane.tint} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function SkillsSection() {
  return (
    <SectionWrapper reveal={false} className="my-24 gap-10 md:my-32 md:gap-14">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:items-end">
        <div className="space-y-4">
          <p className="text-[0.72rem] uppercase tracking-[0.32em] text-primary">Tools & Stack</p>
          <h2 className="max-w-4xl text-balance font-incognito text-[clamp(2.65rem,5.4vw,4.8rem)] leading-[0.98] tracking-[-0.03em]">
            A practical stack for building and shipping.
          </h2>
        </div>

        <p className="max-w-xl text-pretty text-base leading-7 text-muted-foreground md:text-lg xl:ml-auto xl:text-right">
          Technologies grouped by how I use them in real projects: shaping interfaces, building
          systems, and getting work into production.
        </p>
      </div>

      <div className="grid gap-5 md:gap-6">
        {stackLanes.map((lane, index) => (
          <StackLaneCard key={lane.title} lane={lane} index={index} />
        ))}
      </div>
    </SectionWrapper>
  );
}
