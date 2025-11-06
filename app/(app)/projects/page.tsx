import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SectionWrapper from "@/components/ui/section-wrapper";
import { getAllPets } from "@/sanity/lib/query";
import Image from "next/image";
import Link from "next/link";

export default async function ProjectsPage() {
  const projects = await getAllPets();
  console.log(projects);
  return (
    <SectionWrapper className="max-w-7xl">
      <div className="">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">Projects</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={project._id}
              className={`flex flex-col md:flex-row ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              } bg-muted border border-border/50 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group`}
            >
              {project.coverImage?.url && (
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src={project.coverImage.url}
                    alt={project.coverImage.alt || project.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Content */}
              <div className="flex flex-col justify-between p-6 w-full">
                <div>
                  {project.category && (
                    <Badge variant={"secondary"} className="px-2 py-1 mb-2">
                      {project.category}
                    </Badge>
                  )}
                  <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
                  <p className="text-muted-foreground text-sm mt-2 line-clamp-3">
                    {project.shortDescription || "No description provided."}
                  </p>
                </div>

                {/* Links */}
                <div className="mt-6 flex items-center gap-4">
                  <Button>
                    <Link href={`/projects/${project.slug}`}>View Details</Link>
                  </Button>

                  {project.projectUrl && (
                    <Button variant={"ghost"}>
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
