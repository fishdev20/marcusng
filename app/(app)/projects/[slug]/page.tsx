import { PortableBlock } from "@/components/portable-text";
import { TechPill } from "@/components/tech-pill";
import { getMediaTransitionName } from "@/lib/media-transition";
import { getAllPets, getPetBySlug } from "@/sanity/lib/query";
import type { Pet } from "@/types/pet";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  DetailBody,
  DetailFacts,
  DetailHeader,
  DetailMedia,
  PageShell,
} from "../../_components/site-frame";

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

function getAvailability(project: Pet) {
  if (project.projectUrl) return "Public build";
  if (project.repository) return "Source available";
  return "Private work";
}

export async function generateStaticParams() {
  const projects = await getAllPets().catch(() => []);
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPetBySlug(slug).catch(() => null);

  if (!project) return { title: "Project not found | Marcus Nguyen" };

  return {
    title: `${project.name} | Marcus Nguyen`,
    description: project.shortDescription || `A project by Marcus Nguyen: ${project.name}.`,
  };
}

export default async function ProjectDetails({ params }: { params: Params }) {
  const { slug } = await params;
  const project = await getPetBySlug(slug).catch(() => null);

  if (!project) notFound();

  return (
    <PageShell>
      <article>
        <DetailHeader
          backHref="/projects"
          backLabel="All projects"
          title={project.name}
          description={project.shortDescription}
          actions={
            project.projectUrl || project.repository ? (
              <>
                {project.projectUrl ? (
                  <ProjectAction href={project.projectUrl} icon={ExternalLink} primary>
                    Open project
                  </ProjectAction>
                ) : null}
                {project.repository ? (
                  <ProjectAction href={project.repository} icon={Github}>
                    View repository
                  </ProjectAction>
                ) : null}
              </>
            ) : undefined
          }
        />
        <ProjectMedia project={project} />
        <ProjectFacts project={project} />

        <DetailBody sidebar={<ProjectSidebar project={project} />}>
          {project.description?.length ? (
            <PortableBlock
              value={project.description}
              className="max-w-[70ch] prose-headings:font-incognito prose-headings:font-semibold prose-headings:tracking-[-0.025em] prose-h1:mb-4 prose-h1:mt-12 prose-h1:text-[30px] prose-h1:leading-[1.05] prose-h2:mb-4 prose-h2:mt-12 prose-h2:text-[28px] prose-h2:leading-[1.05] prose-h3:mb-3 prose-h3:mt-9 prose-h3:text-[21px] prose-h3:leading-[1.1] prose-p:text-[15px] prose-p:font-medium prose-p:leading-8 prose-p:text-muted-foreground prose-li:text-[15px] prose-li:font-medium prose-li:leading-8 prose-li:text-muted-foreground prose-li:marker:text-muted-foreground prose-strong:text-foreground prose-a:text-foreground prose-a:underline prose-a:decoration-border prose-a:underline-offset-4 hover:prose-a:decoration-foreground prose-blockquote:border-border prose-blockquote:text-foreground prose-img:rounded-sm prose-img:border prose-img:border-border prose-hr:border-border"
            />
          ) : (
            <p className="max-w-[65ch] text-[15px] font-medium leading-8 text-muted-foreground">
              {project.shortDescription ||
                "A detailed project write-up has not been published yet."}
            </p>
          )}
        </DetailBody>
      </article>
    </PageShell>
  );
}

function ProjectMedia({ project }: { project: Pet }) {
  const transitionName = getMediaTransitionName("project", project.slug);

  return (
    <DetailMedia>
      {project.coverImage?.url ? (
        <div
          className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-[16/9]"
          data-media-transition-target={transitionName}
          style={{
            viewTransitionName: transitionName,
            viewTransitionClass: "media-image",
          }}
        >
          <Image
            src={project.coverImage.url}
            alt={project.coverImage.alt || project.name}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 920px) 100vw, 920px"
          />
        </div>
      ) : (
        <div className="flex aspect-[16/8] items-end p-6 sm:p-10">
          <p className="max-w-[620px] text-balance font-incognito text-[clamp(30px,6vw,56px)] font-semibold leading-[1] tracking-[-0.03em] text-muted-foreground">
            {project.name}
          </p>
        </div>
      )}
    </DetailMedia>
  );
}

function ProjectFacts({ project }: { project: Pet }) {
  const facts = [
    { label: "Type", value: getCategoryLabel(project.category) },
    { label: "Status", value: getAvailability(project) },
    {
      label: "Toolset",
      value: project.techStack?.length
        ? `${project.techStack.length} ${project.techStack.length === 1 ? "technology" : "technologies"}`
        : "Not listed",
    },
  ];

  return <DetailFacts facts={facts} />;
}

function ProjectSidebar({ project }: { project: Pet }) {
  return (
    <div className="space-y-8">
      <div className="border-t pt-5">
        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
          Toolset
        </p>
        {project.techStack?.length ? (
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <li key={`${project._id}-${tech.name}`}>
                <TechPill technology={tech} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-[13px] leading-6 text-muted-foreground">No tools listed.</p>
        )}
      </div>

      <div className="border-t pt-5">
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Back to all projects
          <ArrowUpRight
            className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            strokeWidth={1.8}
          />
        </Link>
      </div>
    </div>
  );
}

function ProjectAction({
  href,
  icon: Icon,
  children,
  primary = false,
}: {
  href: string;
  icon: typeof Github;
  children: React.ReactNode;
  primary?: boolean;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex h-10 items-center gap-2 rounded-md border px-4 text-[13px] font-semibold transition-colors active:translate-y-px ${
        primary
          ? "border-foreground bg-foreground text-background hover:bg-foreground/85"
          : "bg-background text-foreground hover:bg-muted"
      }`}
    >
      <Icon className="size-4" strokeWidth={1.8} />
      {children}
    </Link>
  );
}
