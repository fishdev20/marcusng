import SectionWrapper from "@/components/ui/section-wrapper";
import { skills, type SkillCategory } from "@/constants/skill";
import { cn, getDevIcon } from "@/lib/utils";
import { Blocks, Brain, Brush, Code2, Database, Orbit } from "lucide-react";
import Image from "next/image";

const categoryMeta: Record<
  SkillCategory,
  {
    title: string;
    eyebrow: string;
    description: string;
    tint: string;
    icon: typeof Code2;
    gridClass: string;
    wordClass: string;
    compact?: boolean;
  }
> = {
  languages: {
    title: "Languages",
    eyebrow: "Programming",
    description: "Languages I have worked with regularly across product and backend work.",
    tint: "var(--primary)",
    icon: Code2,
    gridClass: "xl:col-span-5 xl:-rotate-[1.2deg]",
    wordClass: "right-4 top-3",
  },
  frontend: {
    title: "Frontend",
    eyebrow: "Client-side",
    description: "Frameworks and libraries I use to build interfaces and frontend systems.",
    tint: "var(--secondary)",
    icon: Orbit,
    gridClass: "xl:col-span-7 xl:rotate-[0.8deg]",
    wordClass: "right-4 bottom-0",
  },
  ui: {
    title: "UI",
    eyebrow: "Styling",
    description: "Design systems, styling tools, and component libraries I am familiar with.",
    tint: "var(--primary)",
    icon: Brush,
    gridClass: "md:col-span-1 xl:col-span-4",
    wordClass: "right-3 top-2",
    compact: true,
  },
  backend: {
    title: "Backend",
    eyebrow: "Server-side",
    description: "Backend frameworks, databases, and services I have used in real projects.",
    tint: "var(--secondary)",
    icon: Database,
    gridClass: "md:col-span-1 xl:col-span-4",
    wordClass: "right-3 top-2",
    compact: true,
  },
  devops: {
    title: "DevOps",
    eyebrow: "Infra & delivery",
    description: "Tools I use for version control, deployment workflows, and infrastructure work.",
    tint: "var(--primary)",
    icon: Blocks,
    gridClass: "md:col-span-1 xl:col-span-4",
    wordClass: "right-3 top-2",
    compact: true,
  },
  other: {
    title: "Other",
    eyebrow: "Supporting tools",
    description: "Additional technologies that show up often in the products I build.",
    tint: "var(--secondary)",
    icon: Brain,
    gridClass: "md:col-span-2 xl:col-span-12",
    wordClass: "right-4 bottom-0",
  },
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

function SkillPanel({ category }: { category: SkillCategory }) {
  const meta = categoryMeta[category];
  const Icon = meta.icon;
  const items = skills[category];

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-[2rem] border p-5 md:p-6",
        "transition-transform duration-300 hover:-translate-y-1",
        meta.gridClass,
      )}
      style={{
        borderColor: `color-mix(in oklch, var(--border) 72%, ${meta.tint} 28%)`,
        background: `linear-gradient(145deg, color-mix(in oklch, var(--background) 91%, ${meta.tint} 9%), color-mix(in oklch, var(--background) 97%, ${meta.tint} 3%))`,
      }}
    >
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute font-incognito text-[clamp(3rem,8vw,6.5rem)] uppercase tracking-[-0.08em] text-foreground/[0.045]",
          meta.wordClass,
        )}
      >
        {meta.title}
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-6 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, color-mix(in oklch, ${meta.tint} 56%, transparent), transparent)`,
        }}
      />

      <div className="relative z-10 flex flex-col gap-6">
        <div
          className={cn(
            "grid gap-4",
            meta.compact ? "md:grid-cols-1" : "md:grid-cols-[0.9fr_1.1fr]",
          )}
        >
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border"
                style={{
                  borderColor: `color-mix(in oklch, var(--border) 70%, ${meta.tint} 30%)`,
                  background: `color-mix(in oklch, ${meta.tint} 12%, var(--background) 88%)`,
                }}
              >
                <Icon className="h-4 w-4" />
              </span>
              <div className="space-y-1">
                <p className="text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">
                  {meta.eyebrow}
                </p>
                <h3 className="font-incognito text-3xl leading-none md:text-4xl">{meta.title}</h3>
              </div>
            </div>

            <p className="max-w-sm text-sm leading-6 text-muted-foreground md:text-[0.95rem]">
              {meta.description}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-[0.72rem] uppercase tracking-[0.22em] text-muted-foreground">
              Current toolkit
            </p>
            <ul className="flex flex-wrap gap-2.5">
              {items.map((skill) => (
                <SkillChip key={skill} skill={skill} tint={meta.tint} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function SkillsSection() {
  return (
    <SectionWrapper className="my-24 gap-8 md:my-32">
      <div className="space-y-4">
        <p className="text-[0.72rem] uppercase tracking-[0.32em] text-primary">Tools & Stack</p>
        <h2 className="w-full font-incognito text-[clamp(2.8rem,6vw,5.2rem)] leading-[0.94] tracking-[-0.04em]">
          Languages, frameworks, and tools I have worked with.
        </h2>
        <p className="max-w-xl text-base leading-7 text-muted-foreground md:text-lg">
          A straightforward overview of the technologies I am comfortable using across frontend,
          backend, UI, and deployment work.
        </p>
      </div>

      <div className="grid gap-4 xl:grid-cols-12">
        <SkillPanel category="languages" />
        <SkillPanel category="frontend" />
        <SkillPanel category="ui" />
        <SkillPanel category="backend" />
        <SkillPanel category="devops" />
        <SkillPanel category="other" />
      </div>
    </SectionWrapper>
  );
}
