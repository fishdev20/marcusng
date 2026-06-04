import SectionWrapper from "@/components/ui/section-wrapper";
import { getExperiences } from "@/sanity/lib/query";
import ExperienceList from "./ExperienceList";

export default async function ExperienceSection() {
  const experiences = await getExperiences();

  return (
    <SectionWrapper reveal={false} className="gap-8 md:gap-10">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,0.74fr)_minmax(0,1.26fr)] xl:items-end">
        <div className="space-y-4">
          <p className="text-[0.72rem] uppercase tracking-[0.32em] text-primary">Experience</p>
          <h2 className="max-w-lg text-balance font-incognito text-[clamp(2.25rem,4.6vw,4rem)] leading-[0.98] tracking-[-0.03em]">
            Roles and companies I have worked with.
          </h2>
        </div>

        <div className="flex flex-col gap-4 xl:items-end">
          <p className="max-w-xl text-pretty text-base leading-7 text-muted-foreground md:text-lg xl:text-right">
            A focused timeline of the companies, responsibilities, and delivery work that shaped how
            I build software today.
          </p>
        </div>
      </div>

      <ExperienceList experiences={experiences} />
    </SectionWrapper>
  );
}
