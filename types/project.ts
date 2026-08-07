import type { Technology } from "./technology";

export interface Project {
  _id: string;
  title: string;
  featured: boolean;
  description: string;
  thumbnail?: {
    url: string;
    alt?: string;
  };
  techStack?: Technology[];
  links?: {
    github?: string;
    liveDemo?: string;
    video?: string;
  };
  tags?: string[];
  date?: string;
}
