export interface Tech {
  name: string;
  icon?: string;
}

export interface Pet {
  _id: string;
  name: string;
  slug: string; // now simplified from slug.current
  logo?: {
    url?: string;
    alt?: string;
  };
  projectUrl?: string;
  repository?: string;
  coverImage?: {
    url?: string;
    alt?: string;
  };
  category?: "web" | "mobile" | "desktop" | "ai" | "game";
  techStack?: Tech[];
  description?: Array<
    | {
        _type: "block";
        children: Array<{ _key: string; text: string; marks?: string[] }>;
      }
    | {
        _type: "image";
        url: string;
        alt?: string;
      }
    | {
        _type: "table";
        rows?: { _key: string; cells: string[] }[];
      }
  >;
}
