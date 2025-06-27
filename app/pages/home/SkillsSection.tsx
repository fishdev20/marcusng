"use client";

import useIsSmallScreen from "@/app/hooks/useMediaQuery";
import GlassWrapper from "@/components/ui/glass-wrapper";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import SectionWrapper from "@/components/ui/section-wrapper";
import { skills } from "@/constants/skill";
import { getDevIcon } from "@/lib/utils";
import { Brain } from "lucide-react";
import Image from "next/image";

export default function SkillsSection() {
  const isSmall = useIsSmallScreen();
  return (
    <SectionWrapper title="Skills" className="my-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(skills).map(([category, items], idx) => {
          return (
            <GlassWrapper
              key={category}
              className={`p-4 sticky sm:relative`}
              style={isSmall ? { top: `calc(100px + ${idx * 60}px)` } : {}}
            >
              <GlowingEffect
                blur={0}
                borderWidth={3}
                spread={80}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
              />
              <h4 className="text-lg font-semibold capitalize text-blue-600 dark:text-blue-400 mb-4">
                {category}
              </h4>
              <ul className="list-disc list-inside text-neutral-700 dark:text-neutral-300 space-y-2">
                {items.map((skill) => {
                  const iconUrl = getDevIcon(skill);
                  return (
                    <li key={skill} className="flex items-center gap-2">
                      {iconUrl && <Image alt={skill} src={iconUrl} width={30} height={30} />}
                      {!iconUrl && <Brain className="w-7 h-7" />}
                      {skill}
                    </li>
                  );
                })}
              </ul>
            </GlassWrapper>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
