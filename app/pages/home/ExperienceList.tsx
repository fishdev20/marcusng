"use client";

import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { Experience } from "@/types/experience";
import { BriefcaseBusiness, MapPin } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";

function getEmploymentLabel(type?: string) {
  if (!type) return "Role";

  const labels: Record<string, string> = {
    fulltime: "Full-time",
    parttime: "Part-time",
    internship: "Internship",
    freelance: "Freelance",
  };

  return labels[type] || type;
}

function getExperienceRange(startDate: string, endDate?: string | null, isCurrent?: boolean) {
  return `${formatDate(startDate)} - ${isCurrent ? "Present" : formatDate(endDate || startDate)}`;
}

function ExperienceLogo({ experience }: { experience: Experience }) {
  return (
    <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border/70 bg-background/70">
      {experience.logo?.url ? (
        <Image
          src={experience.logo.url}
          alt={experience.logo.alt || `${experience.company} logo`}
          fill
          className="object-cover"
        />
      ) : (
        <BriefcaseBusiness className="h-5 w-5 text-foreground/70" />
      )}
    </div>
  );
}

function ExperienceDetail({ experience }: { experience: Experience }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-6"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <ExperienceLogo experience={experience} />
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-incognito text-[2rem] leading-none md:text-[2.35rem]">
                {experience.company}
              </h3>
              {experience.isCurrent ? (
                <span className="rounded-full bg-primary px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.22em] text-primary-foreground">
                  Current
                </span>
              ) : null}
            </div>
            <p className="text-sm text-muted-foreground md:text-base">
              <span className="font-medium text-foreground/88">{experience.role}</span>
              <span className="px-2 text-primary">/</span>
              {getEmploymentLabel(experience.employmentType)}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-3 text-sm text-muted-foreground md:grid-cols-2">
        {experience.location ? (
          <p className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            {experience.location}
          </p>
        ) : null}
        <p>{getExperienceRange(experience.startDate, experience.endDate, experience.isCurrent)}</p>
      </div>

      {experience.description ? (
        <p className="max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
          {experience.description}
        </p>
      ) : null}

      {experience.highlights?.length ? (
        <ul className="grid gap-x-8 gap-y-3 md:grid-cols-2">
          {experience.highlights.map((point, index) => (
            <li
              key={`${experience._id}-detail-${index}`}
              className="flex gap-3 text-sm leading-7 text-muted-foreground"
            >
              <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {experience.technologies?.length ? (
        <div className="flex flex-wrap gap-2">
          {experience.technologies.map((tech) => (
            <Badge
              key={`${experience._id}-${tech}`}
              variant="secondary"
              className="rounded-full border px-3 py-1 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-foreground/88"
              style={{
                borderColor: "color-mix(in oklch, var(--border) 56%, var(--primary) 44%)",
                background:
                  "linear-gradient(135deg, color-mix(in oklch, var(--background) 84%, var(--primary) 16%), color-mix(in oklch, var(--background) 94%, var(--primary) 6%))",
              }}
            >
              {tech}
            </Badge>
          ))}
        </div>
      ) : null}
    </motion.article>
  );
}

export default function ExperienceList({ experiences }: { experiences: Experience[] }) {
  if (!experiences.length) {
    return (
      <div className="rounded-2xl border border-dashed border-border/70 px-6 py-10 text-muted-foreground">
        No experience entries are available yet.
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-4 top-0 w-px md:left-[10.25rem]"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in oklch, var(--primary) 66%, transparent), color-mix(in oklch, var(--secondary) 42%, transparent) 48%, color-mix(in oklch, var(--primary) 22%, transparent))",
        }}
      />

      <div className="space-y-6 md:space-y-8">
        {experiences.map((experience, index) => {
          const tint = index % 2 === 0 ? "var(--primary)" : "var(--secondary)";

          return (
            <article
              key={experience._id || `${experience.company}-${experience.role}-${index}`}
              className="relative grid gap-5 pl-12 md:grid-cols-[8.75rem_3rem_minmax(0,1fr)] md:gap-0 md:pl-0"
            >
              <div className="hidden pr-5 pt-5 text-right md:block">
                <p className="text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">
                  {experience.isCurrent ? "Current role" : "Previous role"}
                </p>
              </div>

              <div
                aria-hidden="true"
                className="absolute left-4 top-9 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-background shadow-[0_0_0_8px_var(--background)] md:hidden"
                style={{
                  background: `color-mix(in oklch, ${tint} 82%, var(--background) 18%)`,
                }}
              />

              <div className="relative hidden justify-center pt-5 md:flex">
                <div
                  className="h-3.5 w-3.5 rounded-full border-2 border-background shadow-[0_0_0_10px_var(--background)]"
                  style={{
                    background: `color-mix(in oklch, ${tint} 82%, var(--background) 18%)`,
                  }}
                />
              </div>

              <div className="relative flex flex-col gap-5 border-t border-border/65 pt-5 md:pt-6">
                <div
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-px w-28"
                  style={{
                    background: `linear-gradient(90deg, color-mix(in oklch, ${tint} 58%, transparent), transparent)`,
                  }}
                />

                <ExperienceDetail experience={experience} />
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
