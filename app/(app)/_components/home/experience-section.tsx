import { WorkExperience } from "@/components/work-experience";
import type { Experience } from "@/types/experience";
import { toWorkExperienceItems } from "./helpers";
import { Section } from "./section";

export function ExperienceSection({ experiences }: { experiences: Experience[] }) {
  const workExperiences = toWorkExperienceItems(experiences);

  return (
    <Section id="experience" label="Experience" titlePosition="top">
      {workExperiences.length ? (
        <WorkExperience
          experiences={workExperiences}
          className="bg-transparent px-0 text-foreground"
        />
      ) : (
        <p className="text-[13px] leading-6 text-muted-foreground">Experience is on the way.</p>
      )}
    </Section>
  );
}
