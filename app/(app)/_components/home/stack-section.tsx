import { TechPill } from "@/components/tech-pill";
import { formatStackLabel, getStackGroups } from "./helpers";
import { Section } from "./section";

export function StackSection({ skills: profileSkills }: { skills?: string[] }) {
  const stackGroups = getStackGroups(profileSkills);

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
            {group.items.map((skill) => (
              <StackChip key={`${group.label}-${skill}`} skill={skill} />
            ))}
          </ul>
        </div>
      ))}
    </Section>
  );
}

function StackChip({ skill }: { skill: string }) {
  return (
    <li>
      <TechPill skill={skill} label={formatStackLabel(skill)} />
    </li>
  );
}
