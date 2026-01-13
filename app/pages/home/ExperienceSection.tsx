import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { getExperiences } from "@/sanity/lib/query";
import { CalendarDays, MapPin, MoveUpRight } from "lucide-react";
import Image from "next/image";

export default async function ExperienceSection() {
  const experiences = await getExperiences();
  return (
    <div className="max-w-4xl mx-auto py-12 md:py-20 px-6">
      <div className="relative ml-4">
        <div className="absolute left-0 inset-y-0 border-l-2" />

        {experiences.map(
          (
            {
              company,
              isCurrent,
              startDate,
              endDate,
              location,
              logo,
              role,
              highlights,
              employmentType,
              description,
              technologies,
            },
            index,
          ) => (
            <div key={index} className="relative pl-10 pb-12 last:pb-0">
              <div className="absolute left-px -translate-x-1/2 h-9 w-9 md:h-12 md:w-12 flex items-center justify-center rounded-full bg-accent ring-8 ring-background">
                <Image src={logo?.url as string} fill alt="logo" className="rounded-full" />
              </div>

              <div className="pt-2 sm:pt-1 space-y-3">
                <div className="flex justify-between">
                  <p className="text-base md:text-xl font-medium flex gap-0.5 items-center">
                    {company} <MoveUpRight className="h-4 w-4" />
                  </p>
                  <p className="text-xs md:text-sm font-medium flex gap-0.5 items-center">
                    <MapPin className="h-4 w-4" />
                    {location}
                  </p>
                </div>

                <div>
                  <h3 className="text-base md:text-xl font-semibold">
                    {role} -{" "}
                    <span className="text-xs md:text-base !font-sans font-medium text-muted-foreground">
                      {employmentType}
                    </span>
                  </h3>
                  <div className="flex items-center gap-2 mt-2 text-xs md:text-base text-muted-foreground">
                    <CalendarDays className="h-4 w-4" />
                    <span>
                      {formatDate(startDate)} -{" "}
                      {isCurrent ? "present" : formatDate(endDate as string)}
                    </span>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground text-pretty">
                  {description}
                </p>
                {highlights && highlights.length > 0 && (
                  <ul className="list-disc list-inside space-y-1 text-xs sm:text-base text-muted-foreground mt-2">
                    {highlights.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                )}
                <div className="flex flex-wrap gap-2">
                  {technologies &&
                    technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="rounded-3xl">
                        {tech}
                      </Badge>
                    ))}
                </div>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
