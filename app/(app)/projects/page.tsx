import SectionWrapper from "@/components/ui/section-wrapper";
import { getAllPets } from "@/sanity/lib/query";
import Image from "next/image";
import Link from "next/link";

export default async function ProjectsPage() {
  const pets = await getAllPets();
  return (
    <SectionWrapper>
      <h1 className="text-4xl font-bold mb-10">Projects</h1>

      <div className="grid md:grid-cols-2 gap-12">
        {pets.map((pet) => (
          <Link key={pet._id} href={`/projects/${pet.slug.current}`} className="group">
            <div className="overflow-hidden rounded-xl border border-border/50 bg-muted/20">
              {pet.coverImage?.asset?.url && (
                <Image
                  src={pet.coverImage.asset.url}
                  alt={pet.coverImage.alt || pet.name}
                  width={800}
                  height={600}
                  className="object-cover w-full h-64 group-hover:scale-105 transition-transform"
                />
              )}
              <div className="p-6 space-y-2">
                <h2 className="text-2xl font-semibold">{pet.name}</h2>
                <p className="text-sm text-muted-foreground capitalize">{pet.category}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </SectionWrapper>
  );
}
