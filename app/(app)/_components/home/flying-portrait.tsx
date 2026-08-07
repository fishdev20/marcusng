"use client";

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type FlightMetrics = {
  originX: number;
  originY: number;
  originWidth: number;
  originHeight: number;
  destinationX: number;
  destinationY: number;
  destinationWidth: number;
  destinationHeight: number;
  startScroll: number;
  endScroll: number;
};

const lerp = (from: number, to: number, progress: number) => from + (to - from) * progress;

const clamp = (value: number) => Math.min(1, Math.max(0, value));

const easeOutQuart = (progress: number) => 1 - Math.pow(1 - progress, 4);

const smoothStep = (progress: number) => progress * progress * (3 - 2 * progress);

export function FlyingPortrait({ src, alt }: { src: string; alt: string }) {
  const originRef = useRef<HTMLSpanElement>(null);
  const metricsRef = useRef<FlightMetrics | null>(null);
  const isSettledRef = useRef(false);
  const [ready, setReady] = useState(false);
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const rawProgress = useMotionValue(0);
  const smoothProgress = useSpring(rawProgress, {
    stiffness: 110,
    damping: 24,
    mass: 0.45,
    restDelta: 0.0005,
    restSpeed: 0.0005,
  });
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const width = useMotionValue(0);
  const height = useMotionValue(0);
  const opacity = useMotionValue(0);

  const renderPosition = useCallback(
    (progress: number, currentScroll: number) => {
      const metrics = metricsRef.current;
      if (!metrics) return;

      const horizontalProgress = easeOutQuart(progress);
      const verticalProgress = Math.pow(progress, 1.35);
      const scaleProgress = smoothStep(progress);
      const headerBottom =
        document.querySelector<HTMLElement>("[data-site-header]")?.getBoundingClientRect().bottom ??
        0;
      const viewportY =
        lerp(metrics.originY, metrics.destinationY, verticalProgress) - currentScroll;

      x.set(lerp(metrics.originX, metrics.destinationX, horizontalProgress));
      y.set(progress < 1 ? Math.max(headerBottom + 12, viewportY) : viewportY);
      width.set(lerp(metrics.originWidth, metrics.destinationWidth, scaleProgress));
      height.set(lerp(metrics.originHeight, metrics.destinationHeight, scaleProgress));
      opacity.set(1);
    },
    [height, opacity, width, x, y],
  );

  const updateProgress = useCallback(
    (currentScroll: number) => {
      const metrics = metricsRef.current;
      if (!metrics) return;

      const progress = clamp(
        (currentScroll - metrics.startScroll) / (metrics.endScroll - metrics.startScroll),
      );

      const terminalBuffer = Math.min(160, window.innerHeight * 0.16);
      const hasPassedDestination = currentScroll >= metrics.endScroll + terminalBuffer;

      if (hasPassedDestination) {
        isSettledRef.current = true;
        rawProgress.set(1);
        renderPosition(1, currentScroll);
        return;
      }

      isSettledRef.current = false;

      if (reduceMotion) {
        const reducedProgress = progress < 1 ? 0 : 1;
        rawProgress.set(reducedProgress);
        renderPosition(reducedProgress, currentScroll);
        return;
      }

      rawProgress.set(progress);
      renderPosition(smoothProgress.get(), currentScroll);
    },
    [rawProgress, reduceMotion, renderPosition, smoothProgress],
  );

  const measure = useCallback(() => {
    const origin = originRef.current;
    const destination = document.querySelector<HTMLElement>("[data-portrait-destination]");
    if (!origin || !destination) return;

    const currentScroll = window.scrollY;
    const originRect = origin.getBoundingClientRect();
    const destinationRect = destination.getBoundingClientRect();
    const originY = originRect.top + currentScroll;
    const destinationY = destinationRect.top + currentScroll;
    const startScroll = Math.max(0, originY - 220);
    const endScroll = Math.max(startScroll + 1, destinationY - window.innerHeight * 0.38);

    metricsRef.current = {
      originX: originRect.left,
      originY,
      originWidth: originRect.width,
      originHeight: originRect.height,
      destinationX: destinationRect.left,
      destinationY,
      destinationWidth: destinationRect.width,
      destinationHeight: destinationRect.height,
      startScroll,
      endScroll,
    };

    updateProgress(currentScroll);
    setReady(true);
  }, [updateProgress]);

  useEffect(() => {
    const frame = requestAnimationFrame(measure);
    const destination = document.querySelector<HTMLElement>("[data-portrait-destination]");
    const resizeObserver = new ResizeObserver(measure);

    if (originRef.current) resizeObserver.observe(originRef.current);
    if (destination) resizeObserver.observe(destination);
    window.addEventListener("resize", measure);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  useMotionValueEvent(scrollY, "change", updateProgress);
  useMotionValueEvent(smoothProgress, "change", (progress) => {
    if (!reduceMotion && !isSettledRef.current) renderPosition(progress, scrollY.get());
  });

  return (
    <span
      ref={originRef}
      className="relative top-[0.13em] mx-1 inline-block h-[1.02em] w-[1.02em] overflow-visible rounded-sm bg-muted align-baseline"
    >
      <Image
        src={src}
        alt=""
        width={64}
        height={64}
        aria-hidden
        className={`h-full w-full rounded-sm object-cover transition-opacity duration-150 ${ready ? "opacity-0" : "opacity-100"}`}
        priority
      />

      <motion.span
        data-flying-portrait
        className="pointer-events-none fixed left-0 top-0 z-20 block overflow-hidden rounded-sm border bg-muted"
        style={{ x, y, width, height, opacity, willChange: "transform, width, height" }}
        aria-hidden="true"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 640px) calc(100vw - 32px), 176px"
        />
      </motion.span>
    </span>
  );
}
