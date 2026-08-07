import { cn, getIconSource } from "@/lib/utils";
import type { Technology } from "@/types/technology";
import { PackageCheck } from "lucide-react";
import type { ComponentProps } from "react";

export function TechPill({
  technology,
  label = technology.name,
  className,
  ...props
}: ComponentProps<"span"> & {
  technology: Technology;
  label?: string;
}) {
  const icon = getIconSource(technology.icon);

  return (
    <span
      className={cn(
        "group inline-flex h-7 items-center gap-1.5 rounded-full border bg-muted px-2.5 font-mono text-[12px] font-medium leading-none text-foreground transition-colors duration-300 [transition-timing-function:var(--expo-out)] hover:bg-muted",
        className,
      )}
      {...props}
    >
      <span className="grid size-3.5 shrink-0 place-items-center opacity-80 transition-opacity group-hover:opacity-100">
        {icon ? (
          <img src={icon} alt="" className="size-4 object-contain" aria-hidden />
        ) : (
          <PackageCheck className="size-3.5 text-muted-foreground" strokeWidth={1.8} />
        )}
      </span>
      {label}
    </span>
  );
}
