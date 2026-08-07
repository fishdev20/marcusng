import type { Experience } from "@/types/experience";
import Image from "next/image";

export function CompanyLogo({
  experience,
  size = "md",
}: {
  experience: Experience;
  size?: "xs" | "sm" | "md" | "trusted" | "timeline";
}) {
  const initials = experience.company
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
  const boxSize =
    size === "xs"
      ? "h-4 w-4"
      : size === "sm"
        ? "h-6 w-6"
        : size === "trusted"
          ? "h-8 w-8"
          : size === "timeline"
            ? "h-12 w-12"
            : "h-8 w-8";
  const imageSize =
    size === "xs"
      ? 12
      : size === "sm"
        ? 16
        : size === "timeline"
          ? 48
          : size === "trusted"
            ? 32
            : 22;
  const imageClass =
    size === "timeline" || size === "trusted"
      ? "h-full w-full object-cover"
      : "h-[70%] w-[70%] object-contain";

  return (
    <span
      className={`inline-grid ${boxSize} shrink-0 place-items-center overflow-hidden rounded-sm border bg-muted`}
    >
      {experience.logo?.url ? (
        <Image
          src={experience.logo.url}
          alt={experience.logo.alt || `${experience.company} logo`}
          width={imageSize}
          height={imageSize}
          className={imageClass}
        />
      ) : (
        <span
          className={
            size === "timeline"
              ? "text-[14px] font-semibold text-foreground"
              : "text-[8px] font-semibold text-foreground"
          }
        >
          {initials}
        </span>
      )}
    </span>
  );
}
