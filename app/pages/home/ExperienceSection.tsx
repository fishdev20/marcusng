import { ExperienceContent } from "@/app/components/experience/ExperienceContent";
import { Timeline } from "@/components/ui/timeline";
import { experienceData } from "@/constants/experience";

export default function ExperienceSection() {
  const timelineData = experienceData.map((item) => ({
    duration: item.duration,
    content: <ExperienceContent item={item} />,
  }));

  return (
    <section className="relative w-full overflow-hidden max-w-7xl mx-auto px-6 md:px-16">
      <Timeline data={timelineData} />
    </section>
  );
}
