"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;
const FADE_EASE = [0.16, 1, 0.3, 1] as const;

export function TextReveal({
  text,
  className,
  delay = 0.1,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  const words = text.trim().split(/\s+/);

  return (
    <motion.span
      className={cn("inline-flex flex-wrap items-baseline gap-x-[0.24em]", className)}
      initial="hidden"
      animate="visible"
      aria-label={text}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: reduceMotion ? 0 : delay,
            staggerChildren: reduceMotion ? 0 : 0.07,
          },
        },
      }}
    >
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="inline-flex overflow-hidden pb-[0.08em]"
          aria-hidden="true"
        >
          <motion.span
            className="inline-block"
            variants={
              reduceMotion
                ? {
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { duration: 0.5 } },
                  }
                : {
                    hidden: { y: "120%" },
                    visible: {
                      y: "0%",
                      transition: { duration: 0.9, ease: REVEAL_EASE },
                    },
                  }
            }
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

export function TextRevealBlock({
  children,
  className,
  delay = 0.7,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
      animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0.3 : 0.7, delay, ease: FADE_EASE }}
    >
      {children}
    </motion.div>
  );
}
