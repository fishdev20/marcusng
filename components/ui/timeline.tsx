"use client";
import { FadeUp } from "@/app/components/animation/FadeUp";
import { motion, useScroll, useTransform } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  duration: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="font-sans" ref={containerRef}>
      <div className="mx-auto px-4 md:px-8 lg:px-10">
        <FadeUp direction="up" className="flex-col flex justify-center items-center space-y-0">
          <h1 className="font-incognito text-3xl font-semibold md:text-5xl max-w-4xl">
            Work Experience
          </h1>
        </FadeUp>
      </div>

      <div ref={ref} className="relative mx-auto pb-20">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-5 md:pt-20 md:gap-10">
            <div className="sticky flex flex-col md:flex-row z-10 items-center top-40 self-start max-w-xs md:w-full">
              <div className="h-10 absolute left-0 md:left-0 w-10 rounded-full flex items-center">
                <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-3xl font-bold text-neutral-500 dark:text-neutral-300 ">
                {item.duration}
              </h3>
            </div>

            <FadeUp direction="up" className="relative pl-20 md:pr-0 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-300 dark:text-neutral-300">
                {item.duration}
              </h3>
              {item.content}{" "}
            </FadeUp>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-2 left-2 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[90%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[4px] bg-gradient-to-t from-blue-500 via-blue-300 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
