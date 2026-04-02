import { Button } from "@/components/ui/button";
import SectionWrapper from "@/components/ui/section-wrapper";
import { getProjects } from "@/sanity/lib/query";
import type { Project } from "@/types/project";
import { ArrowRight, ExternalLink, Github, PlayCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function formatProjectDate(date?: string) {
  if (!date) return null;

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

function sortProjects(projects: Project[]) {
  return [...projects].sort((a, b) => {
    if (a.featured === b.featured) {
      return Number(new Date(b.date || 0)) - Number(new Date(a.date || 0));
    }

    return Number(b.featured) - Number(a.featured);
  });
}

function ProjectActions({ project }: { project: Project }) {
  const links = [
    project.links?.liveDemo
      ? {
          href: project.links.liveDemo,
          label: "Visit project",
          icon: ExternalLink,
        }
      : null,
    project.links?.github
      ? {
          href: project.links.github,
          label: "GitHub",
          icon: Github,
        }
      : null,
    project.links?.video
      ? {
          href: project.links.video,
          label: "Walkthrough",
          icon: PlayCircle,
        }
      : null,
  ].filter(
    (
      link,
    ): link is {
      href: string;
      label: string;
      icon: typeof ExternalLink;
    } => Boolean(link),
  );

  if (!links.length) return null;

  return (
    <div className="flex flex-wrap gap-x-5 gap-y-3">
      {links.map(({ href, label, icon: Icon }) => (
        <Link
          key={`${project._id}-${label}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground"
        >
          <Icon className="h-4 w-4" />
          <span>{label}</span>
        </Link>
      ))}
    </div>
  );
}

function ProjectImage({
  project,
  sizes,
  label,
}: {
  project: Project;
  sizes: string;
  label?: string;
}) {
  const href = project.links?.liveDemo || project.links?.github || "/projects";
  const external = Boolean(project.links?.liveDemo || project.links?.github);

  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group relative block overflow-hidden rounded-[1.8rem] border border-border/60 bg-muted/45"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, transparent 58%, color-mix(in oklch, var(--background) 72%, transparent) 100%)",
        }}
      />

      {project.thumbnail?.url ? (
        <div className="relative aspect-[16/10]">
          <Image
            src={project.thumbnail.url}
            alt={project.thumbnail.alt || project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes={sizes}
          />
        </div>
      ) : (
        <div className="flex aspect-[16/10] items-end bg-gradient-to-br from-primary/20 via-background to-secondary/20 p-6">
          <p className="max-w-sm font-incognito text-4xl leading-[0.94] tracking-[-0.04em]">
            {project.title}
          </p>
        </div>
      )}

      {label ? (
        <div className="absolute left-4 top-4 z-[2] rounded-full border border-primary/30 bg-primary px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.22em] text-primary-foreground shadow-[0_12px_28px_color-mix(in_oklch,var(--primary)_26%,transparent)]">
          {label}
        </div>
      ) : null}
    </Link>
  );
}

export default async function ProjectsSection() {
  const projects = sortProjects(await getProjects()).slice(0, 5);
  const [leadProject, ...otherProjects] = projects;

  return (
    <SectionWrapper className="gap-8 md:gap-10">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
        <div className="space-y-4">
          <p className="text-[0.72rem] uppercase tracking-[0.32em] text-primary">
            Featured projects
          </p>
          <h2 className="max-w-xl font-incognito text-[clamp(2.5rem,5vw,4.8rem)] leading-[0.95] tracking-[-0.04em]">
            Selected work across products and interfaces.
          </h2>
        </div>

        <div className="flex max-w-xl flex-col gap-4 xl:items-end">
          <p className="text-base leading-7 text-muted-foreground md:text-lg xl:text-right">
            A flatter look at the projects I have shipped, from interface-heavy product work to
            full-stack builds and implementation-focused systems.
          </p>
          <Button asChild variant="outline" className="rounded-full px-6">
            <Link href="/projects">
              View all projects
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>

      {!leadProject ? (
        <div className="rounded-[2rem] border border-dashed border-border/70 px-6 py-10 text-muted-foreground">
          No featured projects are available yet.
        </div>
      ) : (
        <div className="border-t border-border/70">
          <article className="flex flex-col gap-8 py-8 lg:py-10 xl:flex-row xl:items-start xl:gap-10">
            <div className="w-full max-w-[14rem] shrink-0 space-y-3 xl:pt-2">
              <p className="text-[0.72rem] uppercase tracking-[0.26em] text-primary">
                Lead project
              </p>
              <p className="text-[0.72rem] uppercase tracking-[0.22em] text-muted-foreground">
                {formatProjectDate(leadProject.date) || "Featured work"}
              </p>
            </div>

            <div className="flex-1 space-y-6">
              <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:gap-8">
                <div className="flex-1 space-y-5">
                  <h3 className="max-w-2xl font-incognito text-[clamp(2.3rem,4.4vw,4.2rem)] leading-[0.93] tracking-[-0.05em]">
                    {leadProject.title}
                  </h3>
                  <p className="max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
                    {leadProject.description}
                  </p>

                  {leadProject.techStack?.length ? (
                    <div className="flex flex-wrap gap-2.5">
                      {leadProject.techStack.slice(0, 6).map((tech) => (
                        <span
                          key={`${leadProject._id}-${tech.name}`}
                          className="rounded-full border border-border/70 px-3 py-1 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-foreground/88"
                          style={{
                            borderColor:
                              "color-mix(in oklch, var(--border) 58%, var(--primary) 42%)",
                            background:
                              "linear-gradient(135deg, color-mix(in oklch, var(--background) 84%, var(--primary) 16%), color-mix(in oklch, var(--background) 94%, var(--primary) 6%))",
                          }}
                        >
                          {tech.name}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  <ProjectActions project={leadProject} />
                </div>

                <div className="w-full xl:max-w-[31rem]">
                  <ProjectImage
                    project={leadProject}
                    sizes="(max-width: 1280px) 100vw, 42vw"
                    label="Featured"
                  />
                </div>
              </div>
            </div>
          </article>

          <div className="flex flex-col">
            {otherProjects.map((project, index) => (
              <article key={project._id} className="border-t border-border/65 py-8 lg:py-10">
                <div
                  className={`flex flex-col gap-6 xl:items-start ${
                    index % 2 === 0 ? "xl:flex-row" : "xl:flex-row-reverse"
                  } xl:gap-10`}
                >
                  <div className="w-full xl:max-w-[26rem]">
                    <ProjectImage project={project} sizes="(max-width: 1280px) 100vw, 36vw" />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col gap-5">
                    <div className="flex flex-wrap items-center gap-3 text-[0.72rem] uppercase tracking-[0.22em] text-muted-foreground">
                      <span>{project.featured ? "Featured" : "Project"}</span>
                      {formatProjectDate(project.date) ? (
                        <>
                          <span className="h-1 w-1 rounded-full bg-primary/70" />
                          <span>{formatProjectDate(project.date)}</span>
                        </>
                      ) : null}
                    </div>

                    <div className="space-y-4">
                      <h3 className="max-w-xl font-incognito text-[clamp(2rem,3.2vw,3rem)] leading-[0.95] tracking-[-0.04em]">
                        {project.title}
                      </h3>
                      <p className="max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
                        {project.description}
                      </p>
                    </div>

                    {project.techStack?.length ? (
                      <div className="flex flex-wrap gap-x-4 gap-y-2">
                        {project.techStack.slice(0, 6).map((tech) => (
                          <span
                            key={`${project._id}-${tech.name}`}
                            className="rounded-full border border-border/70 px-3 py-1 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-foreground/88"
                            style={{
                              borderColor:
                                "color-mix(in oklch, var(--border) 60%, var(--secondary) 40%)",
                              background:
                                "linear-gradient(135deg, color-mix(in oklch, var(--background) 86%, var(--secondary) 14%), color-mix(in oklch, var(--background) 95%, var(--secondary) 5%))",
                            }}
                          >
                            {tech.name}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    <ProjectActions project={project} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </SectionWrapper>
  );
}
