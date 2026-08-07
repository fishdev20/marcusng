// types/experience.ts

import type { Technology } from "./technology";

export interface ExperiencePosition {
  _key?: string;
  title?: string;
  employmentType?: "fulltime" | "parttime" | "internship" | "freelance";
  startDate?: string;
  endDate?: string | null;
  isCurrent?: boolean;
  description?: string;
  highlights?: string[];
  technologies?: Technology[];
  isExpanded?: boolean;
}

export interface Experience {
  _id: string;
  _type: "experience";
  company: string;
  companyWebsite?: string;
  location?: string;
  workType?: "remote" | "onsite" | "hybrid";
  logo?: {
    alt?: string;
    url?: string; // resolved from asset->url
  };
  isCurrentEmployer?: boolean;
  positions?: ExperiencePosition[];

  // Legacy single-role fields. Kept so existing Sanity entries continue to render.
  role?: string;
  employmentType?: "fulltime" | "parttime" | "internship" | "freelance";
  startDate?: string; // ISO date string
  endDate?: string | null;
  isCurrent?: boolean;
  description?: string;
  highlights?: string[];
  technologies?: Technology[];
}
