"use client";

import Contact from "@/app/components/contact/Contact";
import Experience from "@/app/components/experience/Experience";
import { InteractiveHoverButton } from "@/app/components/share/InteractiveHoverButton";
import VoxelDog from "@/app/components/share/VoxelDog";
import GlassWrapper from "@/components/ui/glass-wrapper";
import SectionWrapper from "@/components/ui/section-wrapper";
import { personal } from "@/constants/personal";
import { Earth } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  const { name, email, company, github, linkedIn, location, phone, role } = personal;
  return (
    <SectionWrapper className="h-full justify-center mt-40 md:mt-30 mb-20 md:mb-0">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="col-span-1 flex flex-col gap-6 h-full">
          <Image
            src="/banner.gif"
            alt="Contact animation"
            width={400}
            height={600}
            className="w-full rounded-lg object-cover border dark:border-white/20 border-black/20 shadow-lg"
          />
          <GlassWrapper className="p-6 flex flex-col items-center h-full">
            <VoxelDog />
            <h4 className="text-2xl font-bold">{name}</h4>
            <p className="text-sm text-gray-500 mb-4">
              {role}{" "}
              <Link target="_blank" rel="noopener" href={company.url}>
                @{company.name}
              </Link>
            </p>
            <p className="flex gap-2">
              <Earth className="text-blue-500" />
              {personal.location}
            </p>
            <p className="w-full py-4">
              Results-driven Software Engineer with expertise in building high-performance Web,
              Mobile, and Desktop applications. Skilled in modern UI frameworks, full-stack
              development, and performance optimization, with a focus on delivering seamless user
              experiences and driving engineering excellence.
            </p>
            <InteractiveHoverButton className="rounded-sm w-full">
              Let's talk
            </InteractiveHoverButton>
          </GlassWrapper>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-6">
          <Experience />
          <Contact />
        </div>
      </div>
    </SectionWrapper>
  );
}
