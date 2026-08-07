"use client";

import { differenceInMonths, parse } from "date-fns";
import { useCallback, useRef, type ComponentProps } from "react";
import ReactMarkdown from "react-markdown";

import type { ChevronsUpDownIconHandle } from "@/components/chevrons-up-down-icon";
import { ChevronsUpDownIcon } from "@/components/chevrons-up-down-icon";
import { TechPill } from "@/components/tech-pill";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { Technology } from "@/types/technology";
import { BriefcaseBusinessIcon, InfinityIcon } from "lucide-react";

export type ExperiencePositionItemType = {
  /** Unique identifier for the position */
  id: string;
  /** The job title or position name */
  title: string;
  /**
   * Employment period of the position.
   * Use "MM.YYYY" or "YYYY" format. Omit `end` for current roles.
   */
  employmentPeriod: {
    /** Start date (e.g., "10.2022" or "2020"). */
    start: string;
    /** End date; leave undefined for "Present". */
    end?: string;
  };
  /** The type of employment (e.g., "Full-time", "Part-time", "Contract") */
  employmentType?: string;
  /** A brief description of the position or responsibilities */
  description?: string;
  /** An icon representing the position */
  icon?: React.ReactElement;
  /** A list of skills associated with the position */
  skills?: Technology[];
  /** Indicates if the position details are expanded in the UI */
  isExpanded?: boolean;
};

export type ExperienceItemType = {
  /** Unique identifier for the experience item */
  id: string;
  /** Name of the company where the experience was gained */
  companyName: string;
  /** URL or path to the company's logo image */
  companyLogo?: string;
  /** URL to the company's website. */
  companyWebsite?: string;
  /** Company location, for example "Melbourne, Australia". */
  location?: string;
  /** Work arrangement for the company. */
  workType?: "remote" | "onsite" | "hybrid";
  /**
   * List of positions held at the company
   * @fumadocsHref #experiencepositionitemtype
   * */
  positions: ExperiencePositionItemType[];
  /** Indicates if this is the user's current employer */
  isCurrentEmployer?: boolean;
};

export type WorkExperienceProps = {
  className?: string;
  /** @fumadocsHref #experienceitemtype */
  experiences: ExperienceItemType[];
};

export function WorkExperience({ className, experiences }: WorkExperienceProps) {
  return (
    <div className={cn("bg-transparent px-0 text-foreground", className)}>
      {experiences.map((experience) => (
        <ExperienceItem key={experience.id} experience={experience} />
      ))}
    </div>
  );
}

export type ExperienceItemProps = {
  experience: ExperienceItemType;
};

export function ExperienceItem({ experience }: ExperienceItemProps) {
  const locationLabel = formatLocation(experience.location, experience.workType);

  return (
    <div className="space-y-5 border-b py-8 last:border-b-0 first:pt-0">
      <div className="not-prose relative flex min-h-12 flex-col items-start gap-2 pl-18 sm:flex-row sm:items-center sm:gap-3 sm:pl-20">
        <div className="absolute top-1/2 left-0 z-1 flex size-12 -translate-y-1/2 shrink-0 items-center justify-center overflow-hidden rounded-sm border bg-muted">
          {experience.companyLogo ? (
            <img
              src={experience.companyLogo}
              alt={experience.companyName}
              className="size-full object-cover"
              aria-hidden
            />
          ) : (
            <span className="font-mono text-[12px] font-semibold text-muted-foreground">
              {experience.companyName.slice(0, 2)}
            </span>
          )}
        </div>

        <h3 className="text-[15px] leading-snug font-semibold text-foreground">
          {experience.companyWebsite ? (
            <a
              className="transition-colors hover:text-foreground"
              href={experience.companyWebsite}
              target="_blank"
              rel="noopener noreferrer"
            >
              {experience.companyName}
            </a>
          ) : (
            experience.companyName
          )}
        </h3>

        <div className="flex items-center gap-3 sm:ml-auto">
          {locationLabel ? (
            <p className="text-[13px] leading-5 font-medium text-muted-foreground">
              {locationLabel}
            </p>
          ) : null}

          {experience.isCurrentEmployer && (
            <span
              className="relative flex items-center justify-center"
              aria-label="Current Employer"
            >
              <span className="absolute inline-flex size-3 animate-ping rounded-full bg-info opacity-50" />
              <span className="relative inline-flex size-2 rounded-full bg-info" />
            </span>
          )}
        </div>
      </div>

      <div className="relative space-y-6 before:absolute before:top-0 before:bottom-0 before:left-6 before:border-l">
        {experience.positions.map((position) => (
          <ExperiencePositionItem key={position.id} position={position} />
        ))}
      </div>
    </div>
  );
}

function formatLocation(location?: string, workType?: ExperienceItemType["workType"]) {
  const workTypeLabels: Record<NonNullable<ExperienceItemType["workType"]>, string> = {
    remote: "Remote",
    onsite: "On-site",
    hybrid: "Hybrid",
  };
  const workTypeLabel = workType ? workTypeLabels[workType] : null;

  if (location && workTypeLabel) return `${location} (${workTypeLabel})`;
  return location || workTypeLabel;
}

export type ExperiencePositionItemProps = {
  position: ExperiencePositionItemType;
};

export function ExperiencePositionItem({ position }: ExperiencePositionItemProps) {
  const chevronsUpDownIconRef = useRef<ChevronsUpDownIconHandle>(null);

  const handleOpenChange = useCallback((open: boolean) => {
    const controls = chevronsUpDownIconRef.current;
    if (!controls) return;

    if (open) {
      controls.startAnimation();
    } else {
      controls.stopAnimation();
    }
  }, []);

  const { start, end } = position.employmentPeriod;
  const isOngoing = !end;
  const duration = formatDuration(start, end);

  return (
    <Collapsible
      defaultOpen={position.isExpanded}
      onOpenChange={handleOpenChange}
      disabled={!position.description}
      asChild
    >
      <div className="group/experience-position relative">
        <CollapsibleTrigger
          className={cn(
            "group/experience-trigger not-prose block w-full text-left select-none",
            "relative before:absolute before:-top-2 before:-right-2 before:-bottom-2 before:left-16 before:rounded-sm hover:before:bg-muted",
            "data-disabled:before:content-none",
          )}
        >
          <div className="relative z-1 mb-2 flex items-start pl-18 text-base sm:pl-20">
            <div
              className={cn(
                "absolute left-2.5 top-0 flex size-7 shrink-0 items-center justify-center rounded-sm",
                "border bg-muted text-muted-foreground",
                "[&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              )}
            >
              {position.icon ?? <BriefcaseBusinessIcon />}
            </div>

            <h4 className="flex-1 text-balance font-incognito text-[16px] font-semibold leading-6 text-foreground">
              {position.title}
            </h4>

            <div className="shrink-0 text-muted-foreground group-disabled/experience-trigger:hidden [&_svg]:h-lh [&_svg]:w-4">
              <ChevronsUpDownIcon ref={chevronsUpDownIconRef} duration={0.15} />
            </div>
          </div>

          <dl className="relative z-1 flex flex-wrap items-center gap-2 pl-18 font-mono text-[11px] uppercase tracking-[0.04em] text-muted-foreground sm:pl-20">
            {position.employmentType && (
              <>
                <div>
                  <dt className="sr-only">Employment Type</dt>
                  <dd>{position.employmentType}</dd>
                </div>

                <Separator
                  className="data-vertical:h-3.5 data-vertical:w-px data-vertical:self-center data-vertical:bg-border"
                  orientation="vertical"
                />
              </>
            )}

            <div>
              <dt className="sr-only">Employment Period</dt>
              <dd className="flex items-center gap-0.5 tabular-nums">
                <span>{start}</span>
                <span className="font-mono">-</span>
                {isOngoing ? (
                  <InfinityIcon className="size-4 translate-y-[0.5px]" aria-label="Present" />
                ) : (
                  <span>{end}</span>
                )}
              </dd>
            </div>

            {duration && (
              <>
                <Separator
                  className="data-vertical:h-3.5 data-vertical:w-px data-vertical:self-center data-vertical:bg-border"
                  orientation="vertical"
                />
                <div>
                  <dt className="sr-only">Duration</dt>
                  <dd className="tabular-nums">{duration}</dd>
                </div>
              </>
            )}
          </dl>
        </CollapsibleTrigger>

        <CollapsibleContent className="overflow-hidden">
          {position.description && (
            <Prose className="max-w-[840px] pt-4 pl-18 sm:pl-20">
              <ReactMarkdown>{position.description}</ReactMarkdown>
            </Prose>
          )}
        </CollapsibleContent>

        {Array.isArray(position.skills) && position.skills.length > 0 && (
          <ul className="not-prose flex max-w-[840px] flex-wrap gap-2 pt-5 pl-18 sm:pl-20">
            {position.skills.map((technology, index) => (
              <li key={technology._key || `${technology.name}-${index}`} className="flex">
                <TechPill technology={technology} />
              </li>
            ))}
          </ul>
        )}

        <div
          className="pointer-events-none absolute bottom-0 left-6 hidden size-4 bg-background group-last/experience-position:flex"
          aria-hidden="true"
        >
          <span className="size-full -translate-y-2.25 rounded-bl-sm border-b border-l" />
        </div>
      </div>
    </Collapsible>
  );
}

function Prose({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "prose max-w-none prose-zinc prose-p:my-0 prose-p:text-[14px] prose-p:leading-6 prose-p:text-muted-foreground prose-ul:my-3 prose-ul:pl-4 prose-li:my-1 prose-li:pl-1 prose-li:text-[14px] prose-li:leading-[1.55] prose-li:text-foreground prose-li:marker:text-muted-foreground dark:prose-invert",
        className,
      )}
      {...props}
    />
  );
}

function formatDuration(start: string, end?: string): string {
  const startHasMonth = start.includes(".");
  const endHasMonth = end ? end.includes(".") : true;

  // Both year-only: granularity is years, no month arithmetic needed.
  if (!startHasMonth && end && !endHasMonth) {
    const years = parseInt(end, 10) - parseInt(start, 10);
    if (years <= 0) {
      return "";
    }
    return `${years}y`;
  }

  const startDate = parsePeriodDate(start, "first");
  const endDate = end ? parsePeriodDate(end, "last") : new Date();

  // +1 to count both the start and end months inclusively.
  const totalMonths = differenceInMonths(endDate, startDate) + 1;
  if (totalMonths <= 0) {
    return "";
  }

  if (totalMonths < 12) {
    return `${totalMonths}m`;
  }

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  if (months === 0) {
    return `${years}y`;
  }
  return `${years}y ${months}m`;
}

function parsePeriodDate(str: string, fallbackMonth: "first" | "last"): Date {
  if (str.includes(".")) {
    return parse(str, "MM.yyyy", new Date());
  }
  return parse(`${fallbackMonth === "last" ? "12" : "01"}.${str}`, "MM.yyyy", new Date());
}
