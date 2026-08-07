import { TechPill } from "@/components/tech-pill";
import { formatMonthYear } from "./helpers";
import { Action, Section } from "./section";
import type { Project } from "@/types/project";
import { Monitor } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export function ProjectsSection({ projects }: { projects: Project[] }) {
  const visibleProjects = projects.slice(0, 4);
  return (
    <Section
      id="projects"
      label="Projects"
      titlePosition="top"
      action={<Action href="/projects">View all projects</Action>}
      className="pb-14 sm:pb-20"
    >
      {visibleProjects.length ? (
        <div className="grid gap-x-6 gap-y-9 sm:grid-cols-2">
          {visibleProjects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      ) : (
        <p className="text-[13px] leading-6 text-muted-foreground">
          Project entries will appear here when Sanity content is available.
        </p>
      )}
    </Section>
  );
}
function ProjectCard({ project }: { project: Project }) {
  const href = project.links?.liveDemo || project.links?.github || "/projects";
  const external = Boolean(project.links?.liveDemo || project.links?.github);
  const projectType = project.tags?.[0] || (project.links?.liveDemo ? "Website" : "Project");
  return (
    <article className="space-y-3">
      <Link
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="group block overflow-hidden rounded-md border bg-muted"
      >
        {project.thumbnail?.url ? (
          <Image
            src={project.thumbnail.url}
            alt={project.thumbnail.alt || project.title}
            width={560}
            height={380}
            className="aspect-[1.22/1] w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
          />
        ) : (
          <div className="grid aspect-[1.22/1] place-items-center p-5 text-center text-[17px] font-semibold text-foreground">
            {project.title}
          </div>
        )}
      </Link>
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-4 font-mono text-[11px] text-muted-foreground">
          <span>{formatMonthYear(project.date) || "SELECTED WORK"}</span>
          <span className="inline-flex items-center gap-1">
            <Monitor className="h-3 w-3" /> {projectType.toUpperCase()}
          </span>
        </div>
        <h3 className="text-[15px] font-semibold leading-5 text-foreground">{project.title}</h3>
        <p className="text-[13px] leading-5 text-muted-foreground">{project.description}</p>
        {project.techStack?.length ? (
          <ul className="flex flex-wrap gap-2 pt-1" aria-label={`${project.title} technologies`}>
            {project.techStack.map((technology) => (
              <li key={`${project._id}-${technology.name}`}>
                <TechPill technology={technology} />
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}
