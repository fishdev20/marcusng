import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getProjects } from "@/sanity/lib/query";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function ProjectsSection() {
  const projects = await getProjects();

  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="max-w-5xl w-full py-10 px-6">
        <h2 className="text-4xl md:text-[2.75rem] md:leading-[1.2] font-semibold tracking-[-0.03em] sm:max-w-xl sm:mx-auto sm:text-center font-incognito">
          Featured Projects
        </h2>
        <p className="mt-2 text-muted-foreground text-lg sm:text-xl sm:text-center">
          Explore some of my recent work — crafted with precision and creativity.
        </p>

        <div className="mt-8 md:mt-16 w-full mx-auto space-y-12">
          {projects.map((project) => (
            <div
              key={project._id}
              className="flex flex-col md:flex-row items-center justify-between gap-y-6 md:even:flex-row-reverse"
            >
              {/* Project Thumbnail */}
              <div className="w-full md:w-[40%] aspect-[16/10] bg-muted rounded-xl border border-border/50 overflow-hidden relative shrink-0">
                {project.thumbnail?.url ? (
                  <Image
                    src={project.thumbnail.url}
                    alt={project.thumbnail.alt || project.title}
                    fill
                    className="object-cover rounded-xl transition-transform duration-500 hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    No Image
                  </div>
                )}
              </div>

              {/* Project Info */}
              <div className="basis-1/2 shrink-0">
                {/* Optional Date */}
                {project.date && (
                  <span className="uppercase font-medium text-sm text-muted-foreground">
                    {new Date(project.date).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                )}

                <h4 className="my-3 text-2xl font-semibold tracking-tight">{project.title}</h4>

                <p className="text-muted-foreground">{project.description}</p>

                {/* Tech Stack */}
                {project.techStack && project.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.techStack.map((tech) => (
                      <Badge key={tech.name} className="rounded-md text-foreground bg-muted">
                        {tech.name}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Links */}
                <div className="flex flex-wrap gap-4 mt-6">
                  {project.links?.liveDemo && (
                    <Button asChild size="lg" className="rounded-full gap-3">
                      <Link href={project.links.liveDemo} target="_blank" rel="noopener noreferrer">
                        Live Demo <ArrowRight />
                      </Link>
                    </Button>
                  )}

                  {project.links?.github && (
                    <Button asChild variant="outline" size="lg" className="rounded-full gap-3">
                      <Link href={project.links.github} target="_blank" rel="noopener noreferrer">
                        GitHub <ArrowRight />
                      </Link>
                    </Button>
                  )}

                  {project.links?.video && (
                    <Button asChild variant="secondary" size="lg" className="rounded-full gap-3">
                      <Link href={project.links.video} target="_blank" rel="noopener noreferrer">
                        Watch Video <ArrowRight />
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
