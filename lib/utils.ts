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

export function getIconSource(icon?: string): string | null {
  if (!icon) return null;
  if (/^(https?:\/\/|\/)/.test(icon)) return icon;

  const match = icon.match(/^([a-z0-9-]+):([a-z0-9-]+)$/i);
  if (!match) return null;

  return `https://api.iconify.design/${match[1]}/${match[2]}.svg`;
}

// export function formatDate(dateString?: string): string {
//   if (!dateString) return "";

//   const date = new Date(dateString);

//   // Handle invalid dates gracefully
//   if (isNaN(date.getTime())) return "";

//   const day = date.getDate().toString().padStart(2, "0");
//   const month = (date.getMonth() + 1).toString().padStart(2, "0");
//   const year = date.getFullYear();

//   return `${day}.${month}.${year}`;
// }
