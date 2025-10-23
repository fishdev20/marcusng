"use client";
import { FadeUp } from "@/app/components/animation/FadeUp";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function SectionWrapper({
  title,
  className,
  children,
}: {
  title?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={cn("max-w-6xl mx-auto px-6 md:px-16 flex flex-col gap-4 my-32", className)}>
      {title && (
        <FadeUp direction="up" className="flex-col flex space-y-0">
          <h1 className="font-incognito text-3xl font-semibold md:text-4xl max-w-4xl">{title}</h1>
        </FadeUp>
      )}
      {children}
    </section>
  );
}
