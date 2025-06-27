import { FadeUp } from "@/app/components/animation/FadeUp";
import { Button } from "@/components/ui/button";
import GlassWrapper from "@/components/ui/glass-wrapper";
import SectionWrapper from "@/components/ui/section-wrapper";
import { projects } from "@/constants/projects";
import { getDevIcon } from "@/lib/utils";
import { Github, SquareArrowOutUpRight } from "lucide-react";
import Image from "next/legacy/image";
import Link from "next/link";

const fallbackImage: string =
  "https://res.cloudinary.com/victoreke/image/upload/v1692608339/victoreke/blog.png";

export default async function ProjectsSection() {
  return (
    <SectionWrapper title="Featured Projects" className="gap-6">
      {projects.map((project, idx) => (
        <article
          key={idx}
          className="group z-10 sticky"
          style={{ top: `calc(100px + ${idx * 80}px)` }}
        >
          <GlassWrapper className="flex lg:flex-row flex-col lg:items-center items-start gap-6 p-6 ">
            <div className="relative lg:h-52 w-full h-56 overflow-clip">
              <Image
                src={project.images[0]}
                className="dark:bg-zinc-800 bg-zinc-100 rounded-md object-cover group-hover:scale-125 duration-300"
                alt={project.name}
                layout="fill"
                placeholder={project.name ? "blur" : "empty"}
              />
            </div>
            <div className="w-full">
              <FadeUp direction="up" className="flex-col flex space-y-0" staggerChildren={0.25}>
                <div className="flex items-center justify-between w-full">
                  <h4 className="text-2xl font-semibold tracking-tight">{project.name}</h4>
                  <div>
                    {project.github && (
                      <Button variant={"ghost"} size={"icon"}>
                        <Link href={project.github}>
                          <Github />
                        </Link>
                      </Button>
                    )}
                    {project.url && (
                      <Button variant={"ghost"} size={"icon"}>
                        <Link href={project.url}>
                          <SquareArrowOutUpRight />
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>

                <p className="dark:text-neutral-300 text-neutral-500">{project.type}</p>
                <p className="dark:text-zinc-400 text-zinc-600 text-[0.95rem]">{project.desc}</p>
              </FadeUp>
              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
                {project.stack.map((tech, i) => (
                  <li
                    key={i}
                    className="flex gap-2 items-center bg-zinc-200 dark:bg-zinc-700 px-2 py-1 rounded-md"
                  >
                    <Image src={getDevIcon(tech) ?? ""} width={20} height={20} alt={tech} />{" "}
                    <span key={i} className="text-sm text-zinc-700 dark:text-zinc-200">
                      {tech}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </GlassWrapper>
        </article>
      ))}
    </SectionWrapper>
  );
}
