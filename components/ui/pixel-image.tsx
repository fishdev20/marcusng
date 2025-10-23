"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type Grid = {
  rows: number;
  cols: number;
};

const DEFAULT_GRIDS: Record<string, Grid> = {
  "6x4": { rows: 4, cols: 6 },
  "8x8": { rows: 8, cols: 8 },
  "8x3": { rows: 3, cols: 8 },
  "4x6": { rows: 6, cols: 4 },
  "3x8": { rows: 8, cols: 3 },
};

type PredefinedGridKey = keyof typeof DEFAULT_GRIDS;

interface PixelImageProps {
  src: string;
  grid?: PredefinedGridKey;
  customGrid?: Grid;
  grayscaleAnimation?: boolean;
  pixelFadeInDuration?: number; // ms
  maxAnimationDelay?: number; // ms
  colorRevealDelay?: number; // ms
  borderRadius?: string; // e.g. "1rem" or "2xl"
  width?: string; // e.g. "100%", "20rem"
  height?: string; // e.g. "24rem"
  startInView?: boolean; // trigger only when visible
}

export const PixelImage = ({
  src,
  grid = "6x4",
  grayscaleAnimation = true,
  pixelFadeInDuration = 800,
  maxAnimationDelay = 1000,
  colorRevealDelay = 1200,
  borderRadius = "2rem",
  width = "100%",
  height = "24rem",
  startInView = true,
  customGrid,
}: PixelImageProps) => {
  const [isVisible, setIsVisible] = useState(!startInView);
  const [showColor, setShowColor] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // 🧠 Intersection observer — triggers when in viewport
  useEffect(() => {
    if (!startInView) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [startInView]);

  // 🎨 Delayed color reveal
  useEffect(() => {
    if (!isVisible) return;
    const timeout = setTimeout(() => setShowColor(true), colorRevealDelay);
    return () => clearTimeout(timeout);
  }, [isVisible, colorRevealDelay]);

  // 🧩 Grid pieces setup
  const { rows, cols } = useMemo(() => {
    const g = customGrid || DEFAULT_GRIDS[grid];
    return {
      rows: Math.max(1, Math.min(g.rows, 16)),
      cols: Math.max(1, Math.min(g.cols, 16)),
    };
  }, [customGrid, grid]);

  const pieces = useMemo(() => {
    return Array.from({ length: rows * cols }, (_, i) => {
      const row = Math.floor(i / cols);
      const col = i % cols;
      const clipPath = `polygon(
        ${col * (100 / cols)}% ${row * (100 / rows)}%,
        ${(col + 1) * (100 / cols)}% ${row * (100 / rows)}%,
        ${(col + 1) * (100 / cols)}% ${(row + 1) * (100 / rows)}%,
        ${col * (100 / cols)}% ${(row + 1) * (100 / rows)}%
      )`;
      return {
        clipPath,
        delay: Math.random() * maxAnimationDelay,
      };
    });
  }, [rows, cols, maxAnimationDelay]);

  return (
    <div ref={ref} className={cn("relative select-none overflow-hidden")} style={{ width, height }}>
      {pieces.map((piece, i) => (
        <div
          key={i}
          className={cn(
            "absolute inset-0 transition-all ease-out",
            isVisible ? "opacity-100" : "opacity-0",
          )}
          style={{
            clipPath: piece.clipPath,
            transitionDelay: `${piece.delay}ms`,
            transitionDuration: `${pixelFadeInDuration}ms`,
          }}
        >
          <Image
            src={src}
            alt={`Pixel piece ${i + 1}`}
            draggable={false}
            fill
            className={cn(
              "object-cover w-full h-full",
              grayscaleAnimation ? (showColor ? "grayscale-0" : "grayscale") : "",
            )}
            style={{
              borderRadius,
              transition: grayscaleAnimation
                ? `filter ${pixelFadeInDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`
                : "none",
            }}
          />
        </div>
      ))}
    </div>
  );
};
