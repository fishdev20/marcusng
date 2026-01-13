import { PortableBlock } from "@/components/portable-text";
import SectionWrapper from "@/components/ui/section-wrapper";
import { getPetBySlug } from "@/sanity/lib/query";
import Image from "next/image";
import { notFound } from "next/navigation";

type Params = Promise<{ slug: string }>;

export default async function ProjectDetails(props: { params: Params }) {
  const params = await props.params;

  const pet = await getPetBySlug(params.slug);

  if (!pet) return notFound();

  return (
    <SectionWrapper>
      <article className="max-w-4xl mx-auto">
        {pet.coverImage?.url && (
          <div className="flex justify-center mb-8">
            <Image
              src={pet.coverImage.url}
              alt={pet.coverImage.alt || pet.name}
              width={1000}
              height={600}
              className="rounded-xl object-cover w-full max-w-3xl border border-border shadow-sm"
              priority
            />
          </div>
        )}

        <h1 className="text-4xl font-bold mb-4 text-center">{pet.name}</h1>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
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
          <div className="prose dark:prose-invert max-w-none mx-auto">
            <PortableBlock value={pet.description} />
          </div>
        )}

        <div className="mt-8 flex justify-center gap-6">
          {pet.projectUrl && (
            <a
              href={pet.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-4 hover:no-underline"
            >
              Live Demo
            </a>
          )}

          {pet.repository && (
            <a
              href={pet.repository}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-4 hover:no-underline"
            >
              GitHub
            </a>
          )}
        </div>
      </article>
    </SectionWrapper>
  );
}
