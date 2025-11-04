"use client";

import { Pet } from "@/types/pet";
import Image from "next/image";
import Link from "next/link";

export function ProjectCard({ pet }: { pet: Pet }) {
  return (
    <div className="flex flex-col sm:flex-row rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-card">
      {pet.coverImage?.url && (
        <div className="relative w-full sm:w-1/2 aspect-video sm:aspect-auto">
          <Image
            src={pet.coverImage.url}
            alt={pet.coverImage.alt || pet.name}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="flex flex-col justify-between p-6 sm:w-1/2">
        <div>
          {pet.category && (
            <span className="inline-block text-xs font-medium bg-muted text-muted-foreground px-2 py-0.5 rounded mb-2 capitalize">
              {pet.category}
            </span>
          )}

          <h3 className="text-lg font-semibold mb-2">{pet.name}</h3>

          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
            {pet.shortDescription || "No description provided."}
          </p>

          {pet.techStack && (
            <div className="flex flex-wrap gap-2 mb-4">
              {pet.techStack.map((tech) => (
                <span
                  key={tech.name}
                  className="px-2 py-0.5 text-xs rounded-md bg-muted text-muted-foreground border border-border"
                >
                  {tech.name}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 mt-auto">
          <Link
            href={`/projects/${pet.slug}`}
            className="px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition"
          >
            View Details
          </Link>

          {pet.projectUrl && (
            <Link
              href={pet.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              Live Demo ↗
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
