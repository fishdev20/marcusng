"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

export default function ReadingProgress() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: reduceMotion ? 1000 : 180,
    damping: reduceMotion ? 100 : 28,
    mass: 0.45,
  });

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-px bg-border">
      <motion.div className="h-full origin-left bg-foreground" style={{ scaleX }} />
    </div>
  );
}
