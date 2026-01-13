import { cn } from "@/lib/utils";
import { CSSProperties, ReactNode } from "react";

export default function GlassWrapper({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={cn(
        "border dark:border-white/20 border-black/20 rounded-lg bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/30 shadow-lg",
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
}
