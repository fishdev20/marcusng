"use client";

import { cn } from "@/lib/utils";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ReactNode, useRef } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  direction?: "up" | "down" | "left" | "right";
  once?: boolean;
  amount?: number;
  margin?: string;
};

export default function Reveal({
  children,
  className,
  delay = 0,
  distance = 22,
  direction = "up",
  once = true,
  amount = 0.08,
  margin = "0px 0px -12% 0px",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount, margin: margin as never });
  const prefersReducedMotion = useReducedMotion();

  const axis =
    direction === "left" || direction === "right"
      ? { x: direction === "left" ? distance : -distance, y: 0 }
      : { x: 0, y: direction === "up" ? distance : -distance };

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={
        prefersReducedMotion
          ? { opacity: 1, x: 0, y: 0, scale: 1 }
          : { opacity: 0, x: axis.x, y: axis.y, scale: 0.985 }
      }
      animate={
        isInView
          ? { opacity: 1, x: 0, y: 0, scale: 1 }
          : prefersReducedMotion
            ? { opacity: 1, x: 0, y: 0, scale: 1 }
            : undefined
      }
      transition={{
        duration: prefersReducedMotion ? 0.01 : 0.68,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
