import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const bounceAnimation = {
  initial: {
    y: -50,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
};

export const linkAnimation = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 5,
    },
  },
};

export const staggeredAnimation = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export const staggeredAnimationFast = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export const menuItemAnimation = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

export const navigationAnimation = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

export const sidebarAnimation = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

export const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
};

const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC", // Optionally specify the timezone
};

export const formatDate = (value: string) => {
  const date = new Date(value);
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
  return formattedDate;
};

export const getDevIcon = (skill: string): string | null => {
  const map: Record<string, string> = {
    JavaScript: "javascript",
    TypeScript: "typescript",
    Java: "java",
    Go: "go",
    HTML: "html5",
    CSS: "css3",
    React: "react",
    "Next.js": "nextjs",
    Redux: "redux",
    "React Query": "react",
    "Tailwind CSS": "tailwindcss",
    SASS: "sass",
    MUI: "materialui",
    "Ant Design": "antdesign",
    "Node.js": "nodejs",
    Springboot: "spring",
    Firebase: "firebase",
    MongoDB: "mongodb",
    PostgreSQL: "postgresql",
    SQLite: "sqlite",
    Docker: "docker",
    AWS: "amazonwebservices",
    Git: "git",
    GitHub: "github",
    GitLab: "gitlab",
    Redis: "redis",
    Sanity: "sanity",
    Vercel: "vercel",
  };

  const deviconName = map[skill];
  if (!deviconName) return null;

  // List of known exceptions that need -original-wordmark.svg instead
  const useWordmark: string[] = ["amazonwebservices"];

  const suffix = useWordmark.includes(deviconName) ? "-original-wordmark.svg" : "-original.svg";

  return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${deviconName}/${deviconName}${suffix}`;
};
