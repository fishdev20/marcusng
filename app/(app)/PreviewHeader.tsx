"use client";

import type { Profile } from "@/types/profile";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Menu, X } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import whiteLogo from "@/assets/images/white_logo.png";
import { ThemeToggle } from "./_components/theme-toggle";

const navigation = [
  { label: "About", href: "/about" },
  { label: "Experience", href: "/#experience" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
];

export default function PreviewHeader({ profile }: { profile: Profile | null }) {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const rawProgress = useTransform(scrollY, [0, 140], [0, 1]);
  const smoothProgress = useSpring(rawProgress, {
    stiffness: 180,
    damping: 28,
    mass: 0.55,
    restDelta: 0.001,
  });
  const progress = reduceMotion ? rawProgress : smoothProgress;
  const top = useTransform(progress, [0, 1], reduceMotion ? [16, 16] : [0, 16]);
  const width = useTransform(
    progress,
    [0, 1],
    reduceMotion
      ? ["min(calc(100vw - 32px), 640px)", "min(calc(100vw - 32px), 640px)"]
      : ["min(100vw, 920px)", "min(calc(100vw - 32px), 640px)"],
  );
  const height = useTransform(progress, [0, 1], reduceMotion ? [48, 48] : [64, 48]);
  const radius = useTransform(progress, [0, 1], reduceMotion ? [4, 4] : [0, 4]);
  const backgroundColor = useTransform(
    progress,
    [0, 1],
    [
      "color-mix(in oklab, var(--background) 68%, transparent)",
      "color-mix(in oklab, var(--background) 88%, transparent)",
    ],
  );

  return (
    <motion.header
      data-site-header
      className="fixed left-1/2 z-50 flex items-center justify-between border bg-background/80 px-4 shadow-sm backdrop-blur-xl will-change-[width,height,transform] sm:px-5"
      style={{
        top,
        width,
        height,
        borderRadius: radius,
        x: "-50%",
        backgroundColor,
      }}
    >
      <Link
        href="/"
        aria-label="Marcus Nguyen home"
        className="grid h-8 w-8 place-items-center transition-transform duration-300 [transition-timing-function:var(--expo-out)] hover:-translate-y-0.5 active:translate-y-px"
      >
        <Image
          src={whiteLogo}
          alt=""
          width={929}
          height={1219}
          className="h-7 w-7 object-contain brightness-0 transition-[filter] duration-300 dark:brightness-100"
          priority
        />
      </Link>

      <nav className="hidden items-center gap-8 text-[13px] text-muted-foreground sm:flex">
        {navigation.map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            className="transition-colors duration-300 [transition-timing-function:var(--expo-out)] hover:text-foreground"
          >
            {label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-1">
        <ThemeToggle />
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="sm:hidden"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
        </Button>
      </div>

      <AnimatePresence initial={false}>
        {menuOpen ? (
          <motion.nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: reduceMotion ? 0 : -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -4 }}
            transition={{ duration: reduceMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-[calc(100%+8px)] overflow-hidden rounded-sm border bg-background/95 p-2 shadow-sm backdrop-blur-xl sm:hidden"
          >
            {navigation.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="flex min-h-11 items-center justify-between border-b px-3 text-[14px] font-semibold text-foreground transition-colors last:border-b-0 hover:bg-muted"
              >
                {label}
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-3.5 text-muted-foreground"
                  strokeWidth={1.8}
                />
              </Link>
            ))}
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
