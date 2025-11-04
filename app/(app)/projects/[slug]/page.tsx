import { PortableBlock } from "@/components/portable-text";
import SectionWrapper from "@/components/ui/section-wrapper";
import { getPetBySlug } from "@/sanity/lib/query";
import Image from "next/image";
import { notFound } from "next/navigation";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectDetails(props: ProjectPageProps) {
  const { slug } = await props.params;
  const pet = await getPetBySlug(slug);
  if (!pet) return notFound();
  console.log(pet);
  return (
    <SectionWrapper>
      <article>
        {pet.coverImage?.url && (
          <Image
            src={pet.coverImage.url}
            alt={pet.coverImage.alt || pet.name}
            width={1000}
            height={600}
            className="rounded-xl object-cover mb-8"
          />
        )}
        <h1 className="text-4xl font-bold mb-4">{pet.name}</h1>
        {pet.category && (
          <p className="text-sm text-muted-foreground mb-4 capitalize">{pet.category}</p>
        )}
        <div className="flex flex-wrap gap-2 mb-6">
          {pet.techStack?.map((tech) => (
            <span
              key={tech.name}
              className="px-3 py-1 text-sm bg-primary/10 rounded-full text-primary font-medium"
            >
              {tech.name}
            </span>
          ))}
        </div>
        {pet.description && (
          <div className="prose dark:prose-invert max-w-none">
            <PortableBlock value={pet.description} />
          </div>
        )}
        <div className="mt-8 flex gap-4">
          {pet.projectUrl && (
            <a href={pet.projectUrl} target="_blank" rel="noopener" className="underline">
              Live Demo
            </a>
          )}
          {pet.repository && (
            <a href={pet.repository} target="_blank" rel="noopener" className="underline">
              GitHub
            </a>
          )}
        </div>
      </article>
    </SectionWrapper>
  );
}
