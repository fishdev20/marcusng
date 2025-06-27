import { FadeUp } from "@/app/components/animation/FadeUp";
import GlassWrapper from "@/components/ui/glass-wrapper";
import { experienceData } from "@/constants/experience";
import Image from "next/image";

export default function Experience() {
  return (
    <GlassWrapper className="p-6">
      <FadeUp direction="up" className="flex-col flex space-y-0" staggerChildren={0.25}>
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
      </FadeUp>
    </GlassWrapper>
  );
}
