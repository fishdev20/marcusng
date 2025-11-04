export interface Tech {
  name: string;
  icon?: string;
}

export interface Pet {
  _id: string;
  name: string;
  slug: { current: string };
  logo?: {
    asset: { url: string };
  };
  projectUrl?: string;
  repository?: string;
  coverImage?: {
    alt?: string;
    asset: { url: string };
  };
  category?: "web" | "mobile" | "desktop" | "ai" | "game";
  techStack?: Tech[];
  description?: any[]; // Portable Text blocks
}
