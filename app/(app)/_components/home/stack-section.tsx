import { TechPill } from "@/components/tech-pill";
import type { SkillGroup, Technology } from "@/types/technology";
import { getStackGroups } from "./helpers";
import { Section } from "./section";

export function StackSection({ skills }: { skills?: SkillGroup[] }) {
  const stackGroups = getStackGroups(skills);

  return (
    <Section id="stack" label="Stack" titlePosition="top">
      {stackGroups.map((group) => (
        <div
          key={group.label}
          className="grid border-b last:border-b-0 sm:grid-cols-[190px_minmax(0,1fr)]"
        >
          <div className="border-b py-4 sm:border-b-0">
            <p className="font-mono text-[13px] font-medium leading-6 text-muted-foreground sm:whitespace-nowrap">
              <span className="mr-2 text-muted-foreground">
                {String(group.index + 1).padStart(2, "0")}
              </span>
              {group.label}
            </p>
          </div>

          <ul className="flex flex-wrap gap-2 px-4 py-4 sm:px-5 lg:px-6">
            {group.items.map((technology) => (
              <StackChip
                key={`${group.label}-${technology._key || technology.name}`}
                technology={technology}
              />
            ))}
          </ul>
        </div>
      ))}
    </Section>
  );
}

function StackChip({ technology }: { technology: Technology }) {
  return (
    <li>
      <TechPill technology={technology} />
    </li>
  );
}
