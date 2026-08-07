import { client } from "@/lib/sanity";
import { Experience } from "@/types/experience";
import { Pet } from "@/types/pet";
import { Profile } from "@/types/profile";
import type { Project } from "@/types/project";
import { groq } from "next-sanity";

const SANITY_REVALIDATE_SECONDS = 60;

function sanityFetch<T>(query: string, params?: Record<string, string>) {
  return client.fetch<T>(query, params ?? {}, {
    next: { revalidate: SANITY_REVALIDATE_SECONDS },
  });
}

export async function getExperiences(): Promise<Experience[]> {
  return sanityFetch(
    groq`*[_type == "experience"] | order(coalesce(positions[0].startDate, startDate) desc) {
      _id,
      _type,
      "company": coalesce(companyName, company),
      companyWebsite,
      location,
      workType,
      isCurrentEmployer,
      positions[]{
        _key,
        title,
        employmentType,
        startDate,
        endDate,
        isCurrent,
        description,
        highlights,
        technologies,
        isExpanded
      },
      role,
      employmentType,
      startDate,
      endDate,
      isCurrent,
      description,
      highlights,
      technologies,
      "logo": {
        "alt": coalesce(companyLogo.alt, logo.alt),
        "url": coalesce(companyLogo.asset->url, logo.asset->url)
      }
    }`,
  );
}

export async function getProfile(): Promise<Profile> {
  return sanityFetch(
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
      skills,
      education[]{
        school,
        "logo": {
          "url": logo.asset->url,
          alt
        },
        degree,
        major,
        years,
        location,
        details
      }
    }`,
  );
}

export async function getProjects(): Promise<Project[]> {
  return sanityFetch(
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
  return sanityFetch(
    groq`*[_type == "pet"] | order(_createdAt desc) {
      _id,
      name,
      "slug": slug.current,
      shortDescription,
      logo {
        "url": asset->url,
        alt
      },
      projectUrl,
      repository,
      coverImage {
        "url": asset->url,
        alt
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
  return sanityFetch(
    groq`*[_type == "pet" && slug.current == $slug][0]{
      _id,
      name,
      "slug": slug.current,
      shortDescription,
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
