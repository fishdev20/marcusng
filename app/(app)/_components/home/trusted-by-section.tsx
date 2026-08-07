import type { Experience } from "@/types/experience";
import { CompanyLogo } from "./company-logo";
import { Section } from "./section";

export function TrustedBySection({ experiences }: { experiences: Experience[] }) {
  const companies = experiences.reduce<Experience[]>((items, experience) => {
    if (!experience.company || items.some((item) => item.company === experience.company)) {
      return items;
    }

    return [...items, experience];
  }, []);

  if (!companies.length) return null;

  return (
    <Section label="Trusted by" className="py-8 sm:py-10">
      <ul className="flex flex-wrap items-center gap-x-9 gap-y-5">
        {companies.slice(0, 5).map((experience) => (
          <li
            key={experience.company}
            className="flex items-center gap-3 text-[17px] font-semibold text-foreground"
          >
            <CompanyLogo experience={experience} size="trusted" />
            <span>{experience.company}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
