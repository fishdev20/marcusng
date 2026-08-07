import type { ExperienceItemType, ExperiencePositionItemType } from "@/components/work-experience";
import { skills } from "@/constants/skill";
import { fallbackTestimonials } from "@/constants/testimonial";
import { getLatestBlogs } from "@/lib/blog";
import { getExperiences, getProfile, getProjects, getTestimonials } from "@/sanity/lib/query";
import type { IBlogCard } from "@/types/blog";
import type { Experience, ExperiencePosition } from "@/types/experience";
import type { Profile } from "@/types/profile";
import type { Project } from "@/types/project";
import type { Testimonial } from "@/types/testimonial";

export const stackGroupConfig = [
  { label: "Language", items: [...skills.languages, "python"] },
  {
    label: "Frontend",
    items: [...skills.frontend, ...skills.ui, "expo", "base ui", "radix ui", "motion"],
  },
  {
    label: "Backend & Database",
    items: [...skills.backend, ...skills.other],
  },
  {
    label: "Workflow & AI",
    items: [...skills.devops, "codex", "gemini", "chatgpt", "vercel"],
  },
  {
    label: "Design",
    items: ["figma"],
  },
];

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

export function normalizeStackSkill(skill: string) {
  return skill
    .toLowerCase()
    .trim()
    .replace(/\+\+/g, "plusplus")
    .replace(/#/g, "sharp")
    .replace(/[._-]+/g, " ")
    .replace(/\s+/g, " ");
}

export function stackSkillAliases(skill: string) {
  const normalized = normalizeStackSkill(skill);
  const aliases: Record<string, string> = {
    "next js": "nextjs",
    "node js": "nodejs",
    "vue js": "vuejs",
    "material ui": "mui",
    materialui: "mui",
    "shadcn ui": "shadcn ui",
    tailwindcss: "tailwind css",
    postgres: "postgresql",
    mongo: "mongodb",
    "spring boot": "springboot",
    reactquery: "react query",
    "mobx state tree": "mobx state tree",
    "google cloud": "google cloud platform",
    googlecloud: "google cloud platform",
    "google cloud platform": "google cloud platform",
    posthog: "posthog",
    "post hog": "posthog",
    openpanel: "openpanel",
    "open panel": "openpanel",
    "ci cd": "ci/cd",
    "c plusplus": "cplusplus",
    "c++": "cplusplus",
  };

  return aliases[normalized] || normalized;
}

export function formatStackLabel(skill: string) {
  const normalizedSkill = stackSkillAliases(skill);
  const labels: Record<string, string> = {
    javascript: "JavaScript",
    typescript: "TypeScript",
    java: "Java",
    go: "Go",
    html: "HTML",
    css: "CSS",
    react: "React",
    "react native": "React Native",
    nextjs: "Next.js",
    "next js": "Next.js",
    redux: "Redux",
    zustand: "Zustand",
    "react query": "React Query",
    vuejs: "Vue.js",
    "tailwind css": "Tailwind CSS",
    sass: "Sass",
    mui: "Material UI",
    "material ui": "Material UI",
    "base ui": "Base UI",
    "radix ui": "Radix UI",
    "ant design": "Ant Design",
    "shadcn ui": "shadcn/ui",
    motion: "Motion",
    expo: "Expo",
    electron: "Electron",
    tanstack: "TanStack",
    nodejs: "Node.js",
    bun: "Bun",
    springboot: "Spring Boot",
    "spring boot": "Spring Boot",
    firebase: "Firebase",
    mongodb: "MongoDB",
    postgresql: "PostgreSQL",
    sqlite: "SQLite",
    nginx: "nginx",
    docker: "Docker",
    aws: "AWS",
    azure: "Azure",
    k8s: "K8s",
    kubernetes: "Kubernetes",
    vercel: "Vercel",
    git: "Git",
    github: "GitHub",
    gitlab: "GitLab",
    "ci/cd": "CI/CD",
    redis: "Redis",
    rabbitmq: "RabbitMQ",
    "rabbit mq": "RabbitMQ",
    openlayers: "OpenLayers",
    "open layers": "OpenLayers",
    "robot framework": "Robot Framework",
    robotframework: "Robot Framework",
    "google cloud platform": "Google Cloud",
    figma: "Figma",
    cursor: "Cursor",
    claude: "Claude",
    gemini: "Gemini",
    chatgpt: "ChatGPT",
    photoshop: "Photoshop",
    posthog: "PostHog",
    openpanel: "OpenPanel",
    paper: "Paper",
    "mobx state tree": "MobX-State-Tree",
    websocket: "WebSocket",
  };

  return labels[normalizedSkill] || skill;
}

export function getStackGroups(profileSkills?: string[]) {
  const cleanProfileSkills =
    profileSkills?.map((skill) => skill.trim()).filter((skill) => skill.length > 0) ?? [];

  if (!cleanProfileSkills.length) {
    return stackGroupConfig.map((group, index) => ({
      ...group,
      index,
    }));
  }

  const groups = stackGroupConfig.map((group) => ({
    ...group,
    items: [] as string[],
  }));

  cleanProfileSkills.forEach((skill) => {
    const normalizedSkill = stackSkillAliases(skill);
    const groupIndex = stackGroupConfig.findIndex((item) =>
      item.items.some((groupSkill) => stackSkillAliases(groupSkill) === normalizedSkill),
    );
    const group = groups[groupIndex >= 0 ? groupIndex : groups.length - 1];

    if (!group.items.some((item) => stackSkillAliases(item) === normalizedSkill)) {
      group.items.push(skill);
    }
  });

  return groups.map((group, index) => ({ ...group, index })).filter((group) => group.items.length);
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
  const [profile, experiences, projects, posts, sanityTestimonials] = await Promise.all([
    getProfile().catch(() => null) as Promise<Profile | null>,
    getExperiences().catch(() => []) as Promise<Experience[]>,
    getProjects().catch(() => []) as Promise<Project[]>,
    getLatestBlogs(3).catch(() => []) as Promise<IBlogCard[]>,
    getTestimonials().catch(() => []) as Promise<Testimonial[]>,
  ]);

  return {
    profile,
    experiences,
    projects: sortProjects(projects),
    posts,
    testimonials: sanityTestimonials.length ? sanityTestimonials : fallbackTestimonials,
  };
}
