"use client";

import { motion, Variants } from "framer-motion";

type Props = {
  text: string;
  className?: string;
  stagger?: number; // delay between letters
  delay?: number; // initial delay
  from?: "up" | "down";
};

export default function CharacterFadeUpText({
  text,
  className,
  stagger = 0.045,
  delay = 0,
  from = "up",
}: Props) {
  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const char: Variants = {
    hidden: {
      opacity: 0,
      y: from === "down" ? -20 : 20,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 120, damping: 16 },
    },
  };

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      animate="show" // or use whileInView="show" viewport={{ once: true }}
      style={{ display: "inline-block", lineHeight: "1" }}
    >
      {text.split("").map((c, i) => (
        <motion.span key={`${c}-${i}`} variants={char}>
          {c}
        </motion.span>
      ))}
    </motion.span>
  );
}
