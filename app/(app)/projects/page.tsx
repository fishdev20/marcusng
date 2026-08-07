import { TechPill } from "@/components/tech-pill";
import { getAllPets } from "@/sanity/lib/query";
import type { Pet } from "@/types/pet";
import { ArrowUpRight, ExternalLink, Github, Monitor } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { EmptyState, PageHero, PageShell, RailSection } from "../_components/site-frame";
export const metadata = {
  title: "Projects | Marcus Nguyen",
  description: "Selected projects and shipped builds by Marcus Nguyen.",
};
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
export default async function ProjectsPage() {
  const projects: Pet[] = await getAllPets().catch(() => []);
  return (
    <PageShell>
      <PageHero
        label="Projects"
        title="Product work, experiments, and shipped builds."
        description="A broader archive of web, mobile, desktop, and product-focused work, organized for scanning instead of spectacle."
      />
      <RailSection label="Archive" className="pb-14">
        {projects.length ? (
          <div className="grid gap-x-6 gap-y-9 sm:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        ) : (
          <EmptyState>No projects are available yet.</EmptyState>
        )}
      </RailSection>
    </PageShell>
  );
}
function ProjectCard({ project }: { project: Pet }) {
  return (
    <article className="space-y-3">
      <Link
        href={getProjectHref(project)}
        className="group block overflow-hidden rounded-sm border bg-muted"
      >
        {project.coverImage?.url ? (
          <Image
            src={project.coverImage.url}
            alt={project.coverImage.alt || project.name}
            width={560}
            height={380}
            className="aspect-[1.22/1] w-full object-cover transition duration-500 group-hover:scale-[1.025]"
          />
        ) : (
          <div className="grid aspect-[1.22/1] place-items-center p-5 text-center font-incognito text-[24px] font-semibold leading-none text-muted-foreground">
            {project.name}
          </div>
        )}
      </Link>
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-4 font-mono text-[11px] text-muted-foreground">
          <span>{getCategoryLabel(project.category).toUpperCase()}</span>
          <span className="inline-flex items-center gap-1">
            <Monitor className="h-3 w-3" /> PROJECT
          </span>
        </div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-[15px] font-semibold leading-5 text-foreground">{project.name}</h2>
            <p className="mt-2 text-[13px] leading-5 text-muted-foreground">
              {project.shortDescription || "No description provided."}
            </p>
          </div>
          <Link
            href={getProjectHref(project)}
            aria-label={`View ${project.name}`}
            className="mt-0.5 shrink-0 text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
          </Link>
        </div>
        {project.techStack?.length ? (
          <ul className="flex flex-wrap gap-2">
            {project.techStack.slice(0, 7).map((tech) => (
              <li key={`${project._id}-${tech.name}`}>
                <TechPill technology={tech} />
              </li>
            ))}
          </ul>
        ) : null}
        <div className="flex flex-wrap gap-x-4 gap-y-2 border-t pt-3">
          {project.projectUrl ? (
            <ProjectAction href={project.projectUrl} icon={ExternalLink}>
              Live demo
            </ProjectAction>
          ) : null}
          {project.repository ? (
            <ProjectAction href={project.repository} icon={Github}>
              Repository
            </ProjectAction>
          ) : null}
        </div>
      </div>
    </article>
  );
}
function ProjectAction({
  href,
  icon: Icon,
  children,
}: {
  href: string;
  icon: typeof Github;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-[12px] font-medium text-muted-foreground transition-colors hover:text-foreground"
    >
      <Icon className="h-3.5 w-3.5" /> {children}
    </Link>
  );
}
