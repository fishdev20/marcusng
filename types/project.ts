export interface Project {
  _id: string;
  title: string;
  featured: boolean;
  description: string;
  thumbnail?: {
    url: string;
    alt?: string;
  };
  techStack?: {
    name: string;
    icon?: string;
  }[];
  links?: {
    github?: string;
    liveDemo?: string;
    video?: string;
  };
  tags?: string[];
  date?: string;
}
