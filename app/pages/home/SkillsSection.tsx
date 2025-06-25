"use client";
import { getSkillIcon } from "@/app/components/skills/utils";
import useIsSmallScreen from "@/app/hooks/useMediaQuery";
import GlassWrapper from "@/components/ui/glass-wrapper";
import SectionWrapper from "@/components/ui/section-wrapper";
import { skills } from "@/constants/skill";
import { FaTools } from "react-icons/fa";

export default function SkillsSection() {
  const isSmall = useIsSmallScreen();
  return (
    <SectionWrapper title="Skills" className="my-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.entries(skills).map(([category, items], idx) => {
          return (
            <GlassWrapper
              key={category}
              className={`p-4 sticky sm:relative`}
              style={isSmall ? { top: `calc(100px + ${idx * 60}px)` } : {}}
            >
              <h2 className="text-lg font-semibold capitalize text-blue-600 dark:text-blue-400 mb-4">
                {category}
              </h2>
              <ul className="list-disc list-inside text-neutral-700 dark:text-neutral-300 space-y-2">
                {items.map((skill) => {
                  const Icon = getSkillIcon(skill) ?? FaTools;
                  return (
                    <li key={skill} className="flex items-center gap-2">
                      <Icon className="text-blue-500 dark:text-blue-400 w-6 h-6" />
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
