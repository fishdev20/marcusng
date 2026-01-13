"use client";
import { motion, useInView, Variants } from "framer-motion";
import * as React from "react";

interface FadeUpProps {
  direction?: "up" | "down";
  children: React.ReactNode;
  className?: string;
  once?: boolean;
  stagger?: number; // control spacing between each letter animation
  delay?: number; // optional delay before animation starts
}

export function FadeUp({
  direction = "up",
  children,
  className = "",
  once = true,
  stagger = 0.05,
  delay = 0,
}: FadeUpProps) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once });

  // Character animation variants
  const charVariants: Variants = {
    hidden: {
      opacity: 0,
      y: direction === "down" ? -20 : 20,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 18,
        stiffness: 120,
      },
    },
  };

  // Container variant with stagger timing
  const containerVariants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  // If children is plain text — split to characters
  if (typeof children === "string") {
    return (
      <motion.span
        ref={ref}
        className={className}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        style={{ display: "inline-block" }}
      >
        {children.split("").map((char, index) => (
          <motion.span
            key={index}
            variants={charVariants}
            style={{ display: "inline-block", whiteSpace: "pre" }}
          >
            {char}
          </motion.span>
        ))}
      </motion.span>
    );
  }

  // Otherwise: treat as normal child animation
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? (
          <motion.div variants={charVariants}>{child}</motion.div>
        ) : (
          child
        ),
      )}
    </motion.div>
  );
}
