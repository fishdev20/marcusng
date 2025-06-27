import { StaticImageData } from "next/image";

export type ProjectType = "Featured" | "Solo";
export interface Project {
  name: string;
  type: ProjectType;
  role?: string;
  url?: string;
  github?: string;
  desc: string;
  stack: string[];
  images: StaticImageData[];
}
