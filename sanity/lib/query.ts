import { client } from "@/lib/sanity";
import { Experience } from "@/types/experience";
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
