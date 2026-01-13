import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SectionWrapper from "@/components/ui/section-wrapper";
import { getAllPets } from "@/sanity/lib/query";
import Image from "next/image";
import Link from "next/link";

export default async function ProjectsPage() {
  const projects = await getAllPets();
  return (
    <SectionWrapper className="max-w-7xl">
      <div className="">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">Projects</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project._id}
              className="group bg-muted border border-border/50 rounded-xl overflow-hidden shadow-sm
                       hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row"
            >
              {/* Image */}
              {project.coverImage?.url && (
                <div className="relative w-full md:w-1/2 h-48 md:h-auto">
                  <Image
                    src={project.coverImage.url}
                    alt={project.coverImage.alt || project.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              {/* Content */}
              <div className="flex flex-col justify-between p-6 w-full md:w-1/2">
                <div>
                  {project.category && (
                    <Badge variant="secondary" className="px-2 py-1 mb-2">
                      {project.category}
                    </Badge>
                  )}

                  <h2 className="text-xl font-semibold mb-2">{project.name}</h2>

                  <p className="text-muted-foreground text-sm line-clamp-3">
                    {project.shortDescription || "No description provided."}
                  </p>
                </div>

                {/* Buttons */}
                <div className="mt-6 flex items-center gap-4">
                  <Button asChild>
                    <Link href={`/projects/${project.slug}`}>View Details</Link>
                  </Button>

                  {project.projectUrl && (
                    <Button variant="ghost" asChild>
                      <Link
                        href={project.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-primary transition"
                      >
                        Live Demo ↗
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
