import Reveal from "@/app/components/animation/Reveal";
import { PortableBlock } from "@/components/portable-text";
import { getPetBySlug } from "@/sanity/lib/query";
import { ArrowLeft, ArrowUpRight, ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Params = Promise<{ slug: string }>;

const categoryLabels: Record<string, string> = {
  web: "Web project",
  mobile: "Mobile project",
  desktop: "Desktop project",
  ai: "AI project",
  game: "Game project",
};

function getCategoryLabel(category?: string) {
  if (!category) return "Project";
  return categoryLabels[category] || category;
}

function ProjectMedia({
  name,
  image,
  logo,
}: {
  name: string;
  image?: { url?: string; alt?: string };
  logo?: { url?: string; alt?: string };
}) {
  if (image?.url) {
    return (
      <div className="group relative overflow-hidden rounded-[2rem] border border-border/70 bg-muted/40">
        <div className="relative aspect-[16/10]">
          <Image
            src={image.url}
            alt={image.alt || name}
            fill
            priority
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025]"
            sizes="(max-width: 1280px) 100vw, 72vw"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 animate-ambient-drift bg-[radial-gradient(circle_at_top_left,color-mix(in_oklch,var(--primary)_18%,transparent),transparent_34%),radial-gradient(circle_at_bottom_right,color-mix(in_oklch,var(--secondary)_16%,transparent),transparent_30%)] opacity-80 mix-blend-screen transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100" />
      </div>
    );
  }

  return (
    <div
      className="relative flex min-h-[22rem] items-end overflow-hidden rounded-[2rem] border border-border/70 p-6 md:min-h-[28rem] md:p-8"
      style={{
        background:
          "linear-gradient(145deg, color-mix(in oklch, var(--primary) 20%, var(--background) 80%) 0%, color-mix(in oklch, var(--background) 82%, var(--secondary) 18%) 100%)",
      }}
    >
      <div className="absolute inset-0 animate-soft-float bg-[radial-gradient(circle_at_top_left,color-mix(in_oklch,var(--primary)_22%,transparent),transparent_42%),radial-gradient(circle_at_bottom_right,color-mix(in_oklch,var(--secondary)_20%,transparent),transparent_38%)]" />
      <div className="relative flex items-end gap-5">
        {logo?.url ? (
          <div className="flex h-16 w-16 animate-soft-float items-center justify-center rounded-[1.2rem] border border-white/20 bg-white/85 p-3 shadow-[0_18px_45px_rgba(15,23,42,0.12)]">
            <Image
              src={logo.url}
              alt={logo.alt || `${name} logo`}
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />
          </div>
        ) : null}

        <p className="max-w-xl font-incognito text-[clamp(2.4rem,6vw,4.8rem)] leading-[0.9] tracking-[-0.05em] text-foreground">
          {name}
        </p>
      </div>
    </div>
  );
}

export default async function ProjectDetails(props: { params: Params }) {
  const params = await props.params;
  const pet = await getPetBySlug(params.slug);

  if (!pet) {
    return notFound();
  }

  const projectLinks = [
    pet.projectUrl
      ? {
          href: pet.projectUrl,
          label: "Live project",
          note: "Open the shipped build or public demo.",
          icon: ExternalLink,
        }
      : null,
    pet.repository
      ? {
          href: pet.repository,
          label: "Repository",
          note: "Browse the implementation and source.",
          icon: Github,
        }
      : null,
  ].filter(Boolean) as Array<{
    href: string;
    label: string;
    note: string;
    icon: typeof ExternalLink;
  }>;

  return (
    <section className="mx-auto flex max-w-7xl flex-col gap-10 px-6 pb-24 pt-28 md:px-16">
      <article className="space-y-10">
        <header className="border-b border-border/70 pb-10">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.95fr)] xl:items-end">
            <Reveal delay={0.02} className="space-y-5">
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.22em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-0.5" />
                Back to projects
              </Link>

              <div className="flex flex-wrap items-center gap-3">
                <span
                  className="rounded-full border px-3 py-1 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-foreground/88"
                  style={{
                    borderColor: "color-mix(in oklch, var(--border) 58%, var(--primary) 42%)",
                    background:
                      "linear-gradient(135deg, color-mix(in oklch, var(--background) 84%, var(--primary) 16%), color-mix(in oklch, var(--background) 94%, var(--primary) 6%))",
                  }}
                >
                  {getCategoryLabel(pet.category)}
                </span>

                {pet.logo?.url ? (
                  <span className="inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.2em] text-muted-foreground">
                    <span className="h-1 w-1 rounded-full bg-primary/70" />
                    Identity included
                  </span>
                ) : null}
              </div>

              <div className="space-y-4">
                <h1 className="max-w-4xl font-incognito text-[clamp(2.9rem,6vw,5.9rem)] leading-[0.92] tracking-[-0.055em]">
                  {pet.name}
                </h1>

                <p className="max-w-3xl text-base leading-7 text-muted-foreground md:text-lg">
                  {pet.shortDescription || "A project from the portfolio archive."}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.12} className="xl:pl-8">
              <div className="border-t border-border/65 pt-5">
                <p className="text-[0.72rem] uppercase tracking-[0.24em] text-primary">
                  Project links
                </p>

                <div className="mt-5 flex flex-col gap-4">
                  {projectLinks.length ? (
                    projectLinks.map((link) => {
                      const Icon = link.icon;

                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-start justify-between gap-4 border-b border-border/55 pb-4 text-sm transition-colors duration-300 hover:text-foreground"
                        >
                          <div className="space-y-1">
                            <div className="inline-flex items-center gap-2 text-[0.82rem] font-medium uppercase tracking-[0.2em] text-foreground">
                              <Icon className="h-4 w-4 text-primary/80 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                              <span>{link.label}</span>
                            </div>
                            <p className="max-w-sm text-sm leading-6 text-muted-foreground transition-colors duration-300 group-hover:text-foreground/82">
                              {link.note}
                            </p>
                          </div>

                          <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                        </Link>
                      );
                    })
                  ) : (
                    <p className="max-w-sm text-sm leading-7 text-muted-foreground">
                      No public links are available for this project yet.
                    </p>
                  )}
                </div>
              </div>
            </Reveal>
          </div>
        </header>

        <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_17rem]">
          <div className="min-w-0 space-y-10">
            <Reveal delay={0.18}>
              <ProjectMedia name={pet.name} image={pet.coverImage} logo={pet.logo} />
            </Reveal>

            <Reveal delay={0.08}>
              <div className="grid gap-8 border-t border-border/65 pt-8 lg:grid-cols-[minmax(0,1fr)_15rem]">
                <div className="space-y-4">
                  <p className="text-[0.72rem] uppercase tracking-[0.24em] text-primary">
                    Project overview
                  </p>

                  {pet.description ? (
                    <PortableBlock
                      value={pet.description}
                      className="prose-headings:font-incognito prose-headings:tracking-[-0.03em] prose-h2:mt-14 prose-h2:text-[2rem] prose-h2:leading-[0.98] prose-h3:mt-10 prose-h3:text-[1.45rem] prose-h3:leading-[1.02] prose-p:text-base prose-p:leading-8 prose-p:text-muted-foreground prose-li:text-base prose-li:leading-8 prose-li:text-muted-foreground prose-strong:text-foreground prose-a:text-primary prose-a:decoration-primary/35 prose-a:underline-offset-4 prose-blockquote:border-l-primary/40 prose-blockquote:font-incognito prose-blockquote:text-[1.18rem] prose-blockquote:leading-8 prose-img:rounded-[1.6rem] prose-img:border prose-img:border-border/70 prose-hr:border-border/60"
                    />
                  ) : (
                    <p className="max-w-3xl text-base leading-8 text-muted-foreground">
                      This project does not have a long-form write-up yet, but it remains part of
                      the portfolio archive.
                    </p>
                  )}
                </div>

                <div className="space-y-8 lg:pt-1">
                  <div className="border-t border-border/55 pt-5">
                    <p className="text-[0.72rem] uppercase tracking-[0.24em] text-primary">
                      Toolset
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2.5">
                      {pet.techStack?.length ? (
                        pet.techStack.map((tech, index) => (
                          <span
                            key={`${pet._id}-${tech.name}`}
                            className="rounded-full border px-3 py-1 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-foreground/92 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5"
                            style={{
                              borderColor:
                                index % 2 === 0
                                  ? "color-mix(in oklch, var(--border) 48%, var(--primary) 52%)"
                                  : "color-mix(in oklch, var(--border) 48%, var(--secondary) 52%)",
                              background:
                                index % 2 === 0
                                  ? "linear-gradient(135deg, color-mix(in oklch, var(--background) 80%, var(--primary) 20%), color-mix(in oklch, var(--background) 93%, var(--primary) 7%))"
                                  : "linear-gradient(135deg, color-mix(in oklch, var(--background) 80%, var(--secondary) 20%), color-mix(in oklch, var(--background) 93%, var(--secondary) 7%))",
                            }}
                          >
                            {tech.name}
                          </span>
                        ))
                      ) : (
                        <p className="text-sm leading-7 text-muted-foreground">
                          Tech stack details are not listed for this project yet.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <aside className="space-y-8 xl:sticky xl:top-28 xl:self-start">
            <Reveal delay={0.14} className="space-y-8">
              <div className="border-t border-border/65 pt-5">
                <p className="text-[0.72rem] uppercase tracking-[0.24em] text-primary">Category</p>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {getCategoryLabel(pet.category)}
                </p>
              </div>

              <div className="border-t border-border/65 pt-5">
                <p className="text-[0.72rem] uppercase tracking-[0.24em] text-primary">
                  Availability
                </p>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {pet.projectUrl
                    ? "Public build available."
                    : pet.repository
                      ? "Source available."
                      : "Private or internal work."}
                </p>
              </div>
            </Reveal>
          </aside>
        </div>
      </article>
    </section>
  );
}
