"use client";

import type { Profile } from "@/types/profile";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import whiteLogo from "@/assets/images/white_logo.png";
import { ThemeToggle } from "./_components/theme-toggle";

export default function PreviewHeader({ profile }: { profile: Profile | null }) {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

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
        <Link
          href="/about"
          className="transition-colors duration-300 [transition-timing-function:var(--expo-out)] hover:text-foreground"
        >
          About
        </Link>
        <Link
          href="/#experience"
          className="transition-colors duration-300 [transition-timing-function:var(--expo-out)] hover:text-foreground"
        >
          Experience
        </Link>
        <Link
          href="/projects"
          className="transition-colors duration-300 [transition-timing-function:var(--expo-out)] hover:text-foreground"
        >
          Projects
        </Link>
        <Link
          href="/blog"
          className="transition-colors duration-300 [transition-timing-function:var(--expo-out)] hover:text-foreground"
        >
          Blog
        </Link>
      </nav>

      <div className="flex items-center gap-3">
        <ThemeToggle />
      </div>
    </motion.header>
  );
}
