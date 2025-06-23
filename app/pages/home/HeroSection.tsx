"use client";
import { Slide } from "@/app/animation/Slide";
import { InteractiveHoverButton } from "@/app/components/share/InteractiveHoverButton";
import Social from "@/app/components/share/Social";

import VoxelDog from "@/app/components/share/VoxelDog";
import { LinkPreview } from "@/components/ui/link-preview";
import { lazy } from "react";
import Stats from "./Stats";

const Spline = lazy(() => import("@splinetool/react-spline"));

export function HeroSection() {
  return (
    <section className="h-[100vh-40px] flex flex-col justify-center gap-5 sm:gap-20 mt-15 md:mt-30 mb-20">
      <div className="flex xl:flex-row flex-col justify-start xl:items-center items-start gap-2 sm:gap-12 md:gap-20">
        <div className="max-w-xl">
          <Slide>
            <h1 className="font-incognito font-semibold tracking-tight text-2xl sm:text-6xl mb-6 lg:leading-[3.7rem] lg:min-w-[900px] leading-tight min-w-full">
              {"Marcus Nguyen - Software Engineer"}
            </h1>
            <h2 className="font-sans text-base sm:text-xl text-neutral-700 dark:text-neutral-300">
              Results-driven Software Engineer with expertise in building high-performance Web,
              Mobile, and Desktop applications. Skilled in modern UI frameworks, full-stack
              development, and performance optimization, with a focus on delivering seamless user
              experiences and driving engineering excellence. . Currently, I’m focused on building
              products at{" "}
              <LinkPreview
                url="https://triona.fi/"
                className="font-bold text-red-600 dark:text-red-600 relative no-underline before:content-[''] before:absolute before:w-full before:h-0.5 before:rounded before:bg-red-600 before:bottom-[-3px] before:left-0 before:origin-right before:scale-x-0 before:transition-transform before:duration-300 before:ease-in-out hover:before:origin-left hover:before:scale-x-100"
              >
                @Triona Oy
              </LinkPreview>
              .
            </h2>
          </Slide>
          <Slide delay={0.1}>
            <Social />
          </Slide>

          <Slide delay={0.2}>
            <InteractiveHoverButton className="rounded-sm">Let's talk</InteractiveHoverButton>
          </Slide>
        </div>
        <div className="w-full flex justify-center items-center">
          <VoxelDog />
        </div>
      </div>
      <Stats />
    </section>
  );
}
