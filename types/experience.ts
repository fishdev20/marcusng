// types/experience.ts

export interface Experience {
  _id: string;
  _type: "experience";
  company: string;
  logo?: {
    alt?: string;
    url?: string; // resolved from asset->url
  };
  role: string;
  employmentType: "fulltime" | "parttime" | "internship" | "freelance";
  startDate: string; // ISO date string
  endDate?: string | null;
  isCurrent: boolean;
  location?: string;
  description?: string;
  highlights?: string[];
  technologies?: string[];
}
