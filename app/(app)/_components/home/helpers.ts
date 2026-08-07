import type { ExperienceItemType, ExperiencePositionItemType } from "@/components/work-experience";
import { fallbackTestimonials } from "@/constants/testimonial";
import { getLatestBlogs } from "@/lib/blog";
import {
  getExperiences,
  getProfile,
  getProjects,
  getSkills,
  getTestimonials,
} from "@/sanity/lib/query";
import type { IBlogCard } from "@/types/blog";
import type { Experience, ExperiencePosition } from "@/types/experience";
import type { Profile } from "@/types/profile";
import type { Project } from "@/types/project";
import type { Testimonial } from "@/types/testimonial";
import type { SkillGroup } from "@/types/technology";

export function formatMonthYear(date?: string | null) {
  if (!date) return null;

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  })
    .format(new Date(date))
    .toUpperCase();
}

export function formatWorkExperienceDate(date?: string | null) {
  if (!date) return "";

  const value = new Date(date);
  if (Number.isNaN(value.getTime())) return "";

  return new Intl.DateTimeFormat("en-US", {
    month: "2-digit",
    year: "numeric",
  })
    .format(value)
    .replace("/", ".");
}

type EmploymentType = NonNullable<Experience["employmentType"]>;

export function formatEmploymentType(type?: Experience["employmentType"]) {
  const labels: Record<EmploymentType, string> = {
    fulltime: "Full-time",
    parttime: "Part-time",
    internship: "Internship",
    freelance: "Freelance",
  };

  return type ? labels[type] : null;
}

export function formatBlogDate(date?: string | null) {
  if (!date) return null;

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export function portableTextToParagraphs(value?: Profile["fullBio"]) {
  if (!Array.isArray(value)) return [];

  return value
    .map((block) => {
      if (!block || typeof block !== "object" || !("children" in block)) return "";

      const children = (block as { children?: Array<{ text?: string }> }).children;
      if (!Array.isArray(children)) return "";

      return children
        .map((child) => child.text)
        .filter(Boolean)
        .join("");
    })
    .map((text) => text.trim())
    .filter(Boolean);
}

export function sortProjects(projects: Project[]) {
  return [...projects].sort((a, b) => {
    if (a.featured === b.featured) {
      return Number(new Date(b.date || 0)) - Number(new Date(a.date || 0));
    }

    return Number(b.featured) - Number(a.featured);
  });
}

export function getStackGroups(skillGroups?: SkillGroup[]) {
  return (skillGroups ?? [])
    .filter((group) => group.items?.length)
    .map((group, index) => ({
      label: group.name,
      items: group.items,
      index,
    }));
}

export function getExperienceDescription(position: ExperiencePosition) {
  const sections: string[] = [];

  if (position.description) {
    sections.push(position.description);
  }

  if (position.highlights?.length) {
    sections.push(position.highlights.map((highlight) => `- ${highlight}`).join("\n"));
  }

  return sections.join("\n\n");
}

export function getExperiencePositions(experience: Experience): ExperiencePosition[] {
  if (experience.positions?.length) {
    return experience.positions;
  }

  return [
    {
      _key: `${experience._id}-legacy`,
      title: experience.role,
      employmentType: experience.employmentType,
      startDate: experience.startDate,
      endDate: experience.endDate,
      isCurrent: experience.isCurrent,
      description: experience.description,
      highlights: experience.highlights,
      technologies: experience.technologies,
      isExpanded: true,
    },
  ].filter((position) => position.title && position.startDate);
}

export function toWorkExperienceItems(experiences: Experience[]): ExperienceItemType[] {
  return experiences
    .map((experience) => {
      const positions: ExperiencePositionItemType[] = [];

      getExperiencePositions(experience).forEach((position, index) => {
        const start = formatWorkExperienceDate(position.startDate);
        if (!position.title || !start) return;

        positions.push({
          id: position._key || `${experience._id}-position-${index}`,
          title: position.title,
          employmentPeriod: {
            start,
            end: position.isCurrent ? undefined : formatWorkExperienceDate(position.endDate),
          },
          employmentType: formatEmploymentType(position.employmentType) || undefined,
          description: getExperienceDescription(position),
          skills: position.technologies,
          isExpanded: position.isExpanded ?? index === 0,
        });
      });

      return {
        id: experience._id,
        companyName: experience.company,
        companyLogo: experience.logo?.url,
        companyWebsite: experience.companyWebsite,
        location: experience.location,
        workType: experience.workType,
        positions,
        isCurrentEmployer:
          experience.isCurrentEmployer ??
          positions.some((position) => !position.employmentPeriod.end),
      };
    })
    .filter((experience) => experience.positions.length);
}

export async function loadPortfolioData() {
  const [profile, experiences, skills, projects, posts, sanityTestimonials] = await Promise.all([
    getProfile().catch(() => null) as Promise<Profile | null>,
    getExperiences().catch(() => []) as Promise<Experience[]>,
    getSkills().catch(() => []) as Promise<SkillGroup[]>,
    getProjects().catch(() => []) as Promise<Project[]>,
    getLatestBlogs(3).catch(() => []) as Promise<IBlogCard[]>,
    getTestimonials().catch(() => []) as Promise<Testimonial[]>,
  ]);

  return {
    profile,
    experiences,
    skills,
    projects: sortProjects(projects),
    posts,
    testimonials: sanityTestimonials.length ? sanityTestimonials : fallbackTestimonials,
  };
}
