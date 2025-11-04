import { client } from "@/lib/sanity";
import { Experience } from "@/types/experience";
import { Pet } from "@/types/pet";
import { Profile } from "@/types/profile";
import type { Project } from "@/types/project";
import { groq } from "next-sanity";

export async function getExperiences(): Promise<Experience[]> {
  return client.fetch(
    groq`*[_type == "experience"] | order(startDate desc) {
      _id,
      _type,
      company,
      role,
      employmentType,
      startDate,
      endDate,
      isCurrent,
      location,
      description,
      highlights,
      technologies,
      "logo": {
        alt,
        "url": logo.asset->url
      }
    }`,
  );
}

export async function getProfile(): Promise<Profile> {
  return client.fetch(
    groq`*[_type == "profile"][0]{
      _id,
      fullName,
      headline,
      profileImage {alt, "url": asset->url},
      shortBio,
      location,
      currentCompany,
      currentCompanyLink,
      fullBio,
      email,
      "resumeURL": resumeURL.asset->url,
      socialLinks,
      skills
    }`,
  );
}

export async function getProjects(): Promise<Project[]> {
  return client.fetch(
    groq`*[_type == "project"] | order(_createdAt asc) {
      _id,
      title,
      featured,
      description,
      "thumbnail": {
        "url": thumbnail.asset->url,
        alt
      },
      techStack[]{
        name,
        icon
      },
      links,
      tags,
      date,
      _createdAt
    }`,
  );
}

export async function getAllPets(): Promise<Pet[]> {
  return client.fetch(
    groq`*[_type == "pet"] | order(_createdAt asc) {
      _id,
      name,
      "slug": slug { current },
      logo {
        "asset": asset->{
          "url": url
        }
      },
      projectUrl,
      repository,
      coverImage {
        alt,
        "asset": asset->{
          "url": url
        }
      },
      category,
      techStack[] {
        name,
        icon
      },
      description
    }`,
  );
}

export async function getPetBySlug(slug: string): Promise<Pet | null> {
  return client.fetch(
    groq`*[_type == "pet" && slug.current == $slug][0]{
      _id,
      name,
      "slug": slug.current,
      "logo": {
        "url": logo.asset->url,
        "alt": logo.alt
      },
      "coverImage": {
        "url": coverImage.asset->url,
        "alt": coverImage.alt
      },
      projectUrl,
      repository,
      category,
      techStack[]{
        name,
        icon
      },
      // include all block content (including image/table blocks)
      description[]{
        ...,
        _type == "image" => {
          ...,
          "url": asset->url
        }
      }
    }`,
    { slug },
  );
}
