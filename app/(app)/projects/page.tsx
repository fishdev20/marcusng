import SectionWrapper from "@/components/ui/section-wrapper";
import { getAllPets } from "@/sanity/lib/query";
import type { Pet } from "@/types/pet";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const categoryLabels: Record<string, string> = {
  web: "Web",
  mobile: "Mobile",
  desktop: "Desktop",
  ai: "AI",
  game: "Game",
};

function getProjectHref(project: Pet) {
  return `/projects/${project.slug}`;
}

function getCategoryLabel(category?: Pet["category"]) {
  if (!category) return "Project";
  return categoryLabels[category] || category;
}

function ProjectMeta({ project, accent = "var(--primary)" }: { project: Pet; accent?: string }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span
        className="rounded-full border px-3 py-1 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-foreground/88"
        style={{
          borderColor: `color-mix(in oklch, var(--border) 58%, ${accent} 42%)`,
          background: `linear-gradient(135deg, color-mix(in oklch, var(--background) 84%, ${accent} 16%), color-mix(in oklch, var(--background) 94%, ${accent} 6%))`,
        }}
      >
        {getCategoryLabel(project.category)}
      </span>

      {project.techStack?.slice(0, 4).map((tech) => (
        <span
          key={`${project._id}-${tech.name}`}
          className="text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground"
        >
          {tech.name}
        </span>
      ))}
    </div>
  );
}

function ProjectActions({ project }: { project: Pet }) {
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-3">
      <Link
        href={getProjectHref(project)}
        className="inline-flex items-center gap-2 text-[0.78rem] font-medium uppercase tracking-[0.2em] text-foreground transition-colors hover:text-primary"
      >
        View details
        <ArrowRight className="h-4 w-4" />
      </Link>

      {project.projectUrl ? (
        <Link
          href={project.projectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground"
        >
          <ExternalLink className="h-4 w-4" />
          <span>Live demo</span>
        </Link>
      ) : null}

      {project.repository ? (
        <Link
          href={project.repository}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground"
        >
          <Github className="h-4 w-4" />
          <span>Repository</span>
        </Link>
      ) : null}
    </div>
  );
}

function ProjectImage({ project, sizes, label }: { project: Pet; sizes: string; label?: string }) {
  return (
    <Link href={getProjectHref(project)} className="group relative block">
      <div className="relative overflow-hidden rounded-[1.8rem] border border-border/60 bg-muted/45">
        {project.coverImage?.url ? (
          <div className="relative aspect-[16/10]">
            <Image
              src={project.coverImage.url}
              alt={project.coverImage.alt || project.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes={sizes}
            />
          </div>
        ) : (
          <div className="flex aspect-[16/10] items-end bg-gradient-to-br from-primary/20 via-background to-secondary/20 p-6">
            <p className="max-w-sm font-incognito text-4xl leading-[0.94] tracking-[-0.04em]">
              {project.name}
            </p>
          </div>
        )}

        {label ? (
          <div className="absolute left-4 top-4 rounded-full border border-primary/30 bg-primary px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.22em] text-primary-foreground shadow-[0_12px_28px_color-mix(in_oklch,var(--primary)_26%,transparent)]">
            {label}
          </div>
        ) : null}
      </div>
    </Link>
  );
}

export default async function ProjectsPage() {
  const projects: Pet[] = await getAllPets();
  const [leadProject, ...otherProjects] = projects;

  return (
    <SectionWrapper
      reveal={false}
      className="mb-24 mt-20 gap-10 pt-10 sm:pt-12 md:my-32 md:gap-12 md:pt-24"
    >
      <div className="gap-6">
        <div className="space-y-4">
          <p className="text-[0.72rem] uppercase tracking-[0.32em] text-primary">Projects</p>
          <h1 className="w-full font-incognito text-[clamp(2.8rem,5.8vw,5.5rem)] leading-[0.94] tracking-[-0.05em]">
            Product work, experiments, and shipped builds.
          </h1>
        </div>

        <div className="flex flex-col gap-4 xl:items-end">
          <p className="w-full text-base leading-7 text-muted-foreground md:text-lg xl:text-right">
            A broader archive of projects across web, mobile, desktop, and other product-focused
            work.
          </p>
        </div>
      </div>

      {!leadProject ? (
        <div className="rounded-[2rem] border border-dashed border-border/70 px-6 py-10 text-muted-foreground">
          No projects are available yet.
        </div>
      ) : (
        <div className="space-y-10">
          <article className="border-t border-border/70 pt-8 md:pt-10">
            <div className="flex flex-col gap-8 xl:flex-row xl:items-start xl:gap-10">
              <div className="w-full max-w-[14rem] shrink-0 space-y-3 xl:pt-2">
                {leadProject.category ? (
                  <p className="text-[0.72rem] uppercase tracking-[0.22em] text-muted-foreground">
                    {getCategoryLabel(leadProject.category)}
                  </p>
                ) : null}
              </div>

              <div className="flex-1 space-y-6">
                <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:gap-8">
                  <div className="flex-1 space-y-5">
                    <h2 className="max-w-2xl font-incognito text-[clamp(2.4rem,4.8vw,4.5rem)] leading-[0.93] tracking-[-0.05em]">
                      {leadProject.name}
                    </h2>

                    <p className="max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
                      {leadProject.shortDescription || "No description provided."}
                    </p>

                    <ProjectMeta project={leadProject} />
                    <ProjectActions project={leadProject} />
                  </div>

                  <div className="w-full xl:max-w-[31rem]">
                    <ProjectImage
                      project={leadProject}
                      sizes="(max-width: 1280px) 100vw, 42vw"
                      label="Featured first"
                    />
                  </div>
                </div>
              </div>
            </div>
          </article>

          <section className="border-t border-border/65 pt-8 md:pt-10">
            <div className="grid gap-6 xl:grid-cols-[minmax(0,14rem)_minmax(0,1fr)]">
              <div className="space-y-3">
                <p className="text-[0.72rem] uppercase tracking-[0.26em] text-primary">Archive</p>
                <p className="max-w-[12rem] text-sm leading-7 text-muted-foreground">
                  Additional projects from the portfolio, shown as a flatter archive rather than a
                  gallery grid.
                </p>
              </div>

              <div className="flex flex-col">
                {otherProjects.length ? (
                  otherProjects.map((project, index) => (
                    <article
                      key={project._id}
                      className={`py-6 ${index === 0 ? "pt-0" : "border-t border-border/60"}`}
                    >
                      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-8">
                        <div className="w-full space-y-2 lg:max-w-[10.5rem]">
                          <p className="text-[0.72rem] uppercase tracking-[0.22em] text-muted-foreground">
                            {getCategoryLabel(project.category)}
                          </p>
                        </div>

                        <div className="w-full lg:max-w-[15.5rem]">
                          <ProjectImage project={project} sizes="(max-width: 1024px) 100vw, 20vw" />
                        </div>

                        <div className="min-w-0 flex-1 space-y-4">
                          <div className="space-y-3">
                            <Link href={getProjectHref(project)} className="group inline-block">
                              <h2 className="font-incognito text-[clamp(1.8rem,3vw,2.8rem)] leading-[0.96] tracking-[-0.04em] transition-colors group-hover:text-primary">
                                {project.name}
                              </h2>
                            </Link>
                            <p className="max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
                              {project.shortDescription || "No description provided."}
                            </p>
                          </div>

                          <ProjectMeta
                            project={project}
                            accent={index % 2 === 0 ? "var(--secondary)" : "var(--primary)"}
                          />
                          <ProjectActions project={project} />
                        </div>
                      </div>
                    </article>
                  ))
                ) : (
                  <p className="text-muted-foreground">No additional projects are available yet.</p>
                )}
              </div>
            </div>
          </section>
        </div>
      )}
    </SectionWrapper>
  );
}
