"use client";

import { InteractiveHoverButton } from "@/app/components/share/InteractiveHoverButton";
import VoxelDog from "@/app/components/share/VoxelDog";
import GlassWrapper from "@/components/ui/glass-wrapper";
import SectionWrapper from "@/components/ui/section-wrapper";
import { experienceData } from "@/constants/experience";
import { personal } from "@/constants/personal";
import { Earth, Github, Linkedin, Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { lazy } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

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
          <GlassWrapper className="p-6">
            <h3 className="text-xl md:text-3xl font-semibold mb-4">Work Experience</h3>
            <div className="space-y-4 text-sm">
              {experienceData.map((exp, idx) => (
                <div key={idx}>
                  <div className="flex items-center gap-2">
                    <Image
                      key={idx}
                      src={exp.companyLogo}
                      alt={`${exp.companyName} logo ${idx + 1}`}
                      width={65}
                      height={65}
                      className="rounded-md border border-neutral-300 dark:border-neutral-700"
                    />
                    <div className="flex flex-col justify-center">
                      <a
                        href={exp.companyUrl}
                        className="hover:underline text-xl font-semibold font-incognito"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {exp.companyName}
                      </a>
                      <p className="text-sm text-neutral-500 dark:text-neutral-300">{exp.role}</p>
                      <div className="mb-2 text-sm text-blue-400 dark:text-blue-300 font-medium">
                        {exp.duration}
                      </div>
                    </div>
                  </div>
                  <ul className="mt-3 list-disc list-inside text-neutral-700 dark:text-neutral-300">
                    {exp.highlights.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </GlassWrapper>

          <GlassWrapper className="p-6 flex flex-col md:flex-row gap-6 md:items-center">
            <h3 className="text-xl md:text-3xl font-semibold text-left">Contact</h3>
            <div className="flex w-full gap-4 flex-wrap">
              <div className="flex flex-wrap gap-4">
                <a
                  href={`mailto:${personal.email}`}
                  className="border border-border p-2 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-500"
                >
                  <Mail size={28} className="text-red-600" />
                </a>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${personal.phone}`}
                  className="border border-border p-2 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-500"
                >
                  <Phone size={28} className="text-green-600" />
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={personal.github}
                  target="_blank"
                  className="border border-border p-2 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-500"
                >
                  <Github size={28} className="text-black dark:text-white" />{" "}
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={personal.linkedIn}
                  target="_blank"
                  className="border border-border p-2 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-500"
                >
                  <Linkedin size={28} className="text-[#0077B5]" />
                </Link>
              </div>
            </div>
          </GlassWrapper>
        </div>
      </div>
    </SectionWrapper>
  );
}
