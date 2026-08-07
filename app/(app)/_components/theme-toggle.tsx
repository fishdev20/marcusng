"use client";

import { Button } from "@/components/ui/button";
import { motion, type Variants, useReducedMotion } from "motion/react";
import { useTheme } from "next-themes";
import { useCallback, useEffect } from "react";

const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
} as const;

const SUN_PATH =
  "M70 49.5C70 60.8218 60.8218 70 49.5 70C38.1782 70 29 60.8218 29 49.5C29 38.1782 38.1782 29 49.5 29C60 29 69.5 38 70 49.5Z";
const MOON_PATH =
  "M70 49.5C70 60.8218 60.8218 70 49.5 70C38.1782 70 29 60.8218 29 49.5C29 38.1782 38.1782 29 49.5 29C39 45 49.5 59.5 70 49.5Z";

const moonFlashVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 2,
    strokeDasharray: "20, 1000",
    strokeDashoffset: 0,
    filter: "blur(0px)",
  },
  visible: {
    opacity: [0, 1, 0],
    strokeDashoffset: [0, -50, -100],
    filter: ["blur(2px)", "blur(2px)", "blur(0px)"],
    transition: { duration: 0.75 },
  },
};

const sunRaysVariants: Variants = {
  hidden: {
    strokeOpacity: 0,
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
  visible: {
    strokeOpacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const sunRayVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0, scale: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      pathLength: { duration: 0.3 },
      opacity: { duration: 0.2 },
      scale: { duration: 0.3 },
    },
  },
};

type ViewTransition = {
  ready: Promise<void>;
  finished: Promise<void>;
  updateCallbackDone: Promise<void>;
  skipTransition: () => void;
};

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => ViewTransition;
};

function setMetaColor(color: string) {
  let meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');

  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "theme-color";
    document.head.appendChild(meta);
  }

  meta.content = color;
}

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  return (
    target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT"
  );
}

export function ThemeToggle() {
  const reduceMotion = useReducedMotion();
  const { resolvedTheme, systemTheme, setTheme } = useTheme();
  const currentTheme = resolvedTheme ?? systemTheme ?? "light";
  const nextTheme = currentTheme === "dark" ? "light" : "dark";

  const switchTheme = useCallback(async () => {
    const next = currentTheme === "dark" ? "light" : "dark";
    const applyTheme = () => {
      setTheme(next === systemTheme ? "system" : next);
      setMetaColor(META_THEME_COLORS[next]);
    };

    const viewTransitionDocument = document as ViewTransitionDocument;

    if (reduceMotion || !viewTransitionDocument.startViewTransition) {
      applyTheme();
      return;
    }

    const root = document.documentElement;
    root.classList.add("theme-transition");

    const transition = viewTransitionDocument.startViewTransition(applyTheme);

    try {
      await transition.finished;
    } finally {
      root.classList.remove("theme-transition");
    }
  }, [currentTheme, reduceMotion, setTheme, systemTheme]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.defaultPrevented ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.shiftKey ||
        isEditableTarget(event.target) ||
        event.key.toLowerCase() !== "d"
      ) {
        return;
      }

      event.preventDefault();
      void switchTheme();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [switchTheme]);

  return (
    <Button
      type="button"
      className="relative touch-manipulation border-none text-muted-foreground transition-[background-color,color,transform] duration-300 [transition-timing-function:var(--expo-out)] hover:-translate-y-0.5 hover:bg-muted hover:text-foreground active:translate-y-px"
      variant="ghost"
      size="icon-sm"
      aria-label="Toggle mode"
      title="Toggle mode (D)"
      onClick={() => void switchTheme()}
    >
      <span
        className="pointer-events-none absolute size-12 [@media(pointer:fine)]:hidden"
        aria-hidden
      />
      <MoonIcon
        key={`moon-${currentTheme}`}
        className="hidden size-4 [html.dark_&]:block"
        aria-hidden
      />
      <SunMediumIcon
        key={`sun-${currentTheme}`}
        className="hidden size-4 [html.light_&]:block"
        aria-hidden
      />
      <span className="sr-only">Switch to {nextTheme} theme</span>
    </Button>
  );
}

type ThemeIconProps = {
  className?: string;
  "aria-hidden"?: boolean | "true" | "false";
};

function MoonIcon({ className, ...props }: ThemeIconProps) {
  return (
    <motion.svg
      strokeWidth="4"
      strokeLinecap="round"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <motion.path
        variants={moonFlashVariants}
        d={MOON_PATH}
        className="stroke-[#dbeafe]"
        initial="hidden"
        animate="visible"
      />
      <motion.path
        d={MOON_PATH}
        initial={{ fillOpacity: 0, strokeOpacity: 0, rotate: -24, scale: 1.8 }}
        animate={{
          fillOpacity: 0.35,
          strokeOpacity: 1,
          rotate: -360,
          scale: 2,
          transition: { delay: 0.1, type: "spring", duration: 1 },
        }}
        className="origin-center fill-[#90c5ff] stroke-[#90c5ff]"
      />
    </motion.svg>
  );
}

function SunMediumIcon({ className, ...props }: ThemeIconProps) {
  return (
    <motion.svg
      strokeWidth="4"
      strokeLinecap="round"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <motion.g
        variants={sunRaysVariants}
        initial="hidden"
        animate="visible"
        className="stroke-[#edb200]"
        style={{ strokeLinecap: "round", strokeWidth: 6 }}
      >
        <motion.path className="origin-center" variants={sunRayVariants} d="M50 2V11" />
        <motion.path variants={sunRayVariants} d="M85 15L78 22" />
        <motion.path variants={sunRayVariants} d="M98 50H89" />
        <motion.path variants={sunRayVariants} d="M85 85L78 78" />
        <motion.path variants={sunRayVariants} d="M50 98V89" />
        <motion.path variants={sunRayVariants} d="M23 78L16 84" />
        <motion.path variants={sunRayVariants} d="M11 50H2" />
        <motion.path variants={sunRayVariants} d="M23 23L16 16" />
      </motion.g>
      <motion.path
        d={SUN_PATH}
        fill="transparent"
        initial={{ fillOpacity: 0, strokeOpacity: 0, scale: 0.82 }}
        animate={{
          fillOpacity: 0.35,
          strokeOpacity: 1,
          scale: 1,
          transition: { delay: 0.1, type: "spring", duration: 0.8 },
        }}
        className="origin-center fill-[#edb200] stroke-[#edb200]"
      />
    </motion.svg>
  );
}
