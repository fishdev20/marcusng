import { Badge } from "@/components/ui/badge";
import SectionWrapper from "@/components/ui/section-wrapper";
import { formatDate } from "@/lib/utils";
import { getExperiences } from "@/sanity/lib/query";
import { BriefcaseBusiness, MapPin } from "lucide-react";
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

export default async function ExperienceSection() {
  const experiences = await getExperiences();

  return (
    <SectionWrapper className="gap-8 md:gap-10">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,0.74fr)_minmax(0,1.26fr)] xl:items-end">
        <div className="space-y-4">
          <p className="text-[0.72rem] uppercase tracking-[0.32em] text-primary">Experience</p>
          <h2 className="max-w-lg font-incognito text-[clamp(2.25rem,4.6vw,4rem)] leading-[0.95] tracking-[-0.04em]">
            Roles and companies I have worked with.
          </h2>
        </div>

        <div className="flex flex-col gap-4 xl:items-end">
          <p className="max-w-xl text-base leading-7 text-muted-foreground md:text-lg xl:text-right">
            A timeline of the companies, responsibilities, and delivery work that shaped how I build
            software today.
          </p>
          <div className="flex flex-wrap gap-3 xl:justify-end">
            {["frontend systems", "product delivery", "cross-functional work"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-border/70 px-4 py-2 text-xs uppercase tracking-[0.22em] text-muted-foreground"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {!experiences.length ? (
        <div className="rounded-[2rem] border border-dashed border-border/70 px-6 py-10 text-muted-foreground">
          No experience entries are available yet.
        </div>
      ) : (
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
                  <div className="hidden pt-5 pr-5 text-right md:block">
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

                  <div className="relative hidden md:flex justify-center pt-5">
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

                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div
                          className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-[1.2rem] border"
                          style={{
                            borderColor: `color-mix(in oklch, var(--border) 68%, ${tint} 32%)`,
                            background: `color-mix(in oklch, ${tint} 12%, var(--background) 88%)`,
                          }}
                        >
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

                        <div className="space-y-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-incognito text-[2rem] leading-none md:text-[1.8rem] xl:text-[2rem]">
                              {experience.company}
                            </h3>
                            {experience.isCurrent ? (
                              <span className="rounded-full bg-primary px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.22em] text-primary-foreground">
                                Current
                              </span>
                            ) : null}
                          </div>

                          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground md:text-[0.95rem]">
                            <span className="font-medium text-foreground/88">
                              {experience.role}
                            </span>
                            <span className="h-1 w-1 rounded-full bg-primary/70" />
                            <span>{getEmploymentLabel(experience.employmentType)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 md:text-right">
                        {experience.location ? (
                          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground md:justify-end">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span>{experience.location}</span>
                          </div>
                        ) : null}

                        <p className="text-sm text-muted-foreground">
                          {getExperienceRange(
                            experience.startDate,
                            experience.endDate,
                            experience.isCurrent,
                          )}
                        </p>
                      </div>
                    </div>

                    <p className="max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
                      {experience.description}
                    </p>

                    {experience.highlights?.length ? (
                      <ul className="grid gap-x-8 gap-y-3 md:grid-cols-2">
                        {experience.highlights.map((point, highlightIndex) => (
                          <li
                            key={`${experience._id}-highlight-${highlightIndex}`}
                            className="flex gap-3 text-sm leading-7 text-muted-foreground"
                          >
                            <span
                              className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full"
                              style={{
                                background: `color-mix(in oklch, ${tint} 78%, var(--background) 22%)`,
                              }}
                            />
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
                            className="rounded-full border border-border/70 bg-background/65 px-3 py-1 text-[0.72rem] uppercase tracking-[0.16em] text-muted-foreground"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      )}
    </SectionWrapper>
  );
}
