import Link from "next/link";
import type { ReactNode } from "react";
export function SectionCorners() {
  const cornerClass =
    "pointer-events-none absolute z-[1] size-2.5 rotate-45 rounded-[2px] border bg-background";
  return (
    <>
      <span
        aria-hidden="true"
        className={`${cornerClass} left-0 top-0 -translate-x-1/2 -translate-y-1/2`}
      />
      <span
        aria-hidden="true"
        className={`${cornerClass} right-0 top-0 translate-x-1/2 -translate-y-1/2`}
      />
      <span
        aria-hidden="true"
        className={`${cornerClass} bottom-0 left-0 -translate-x-1/2 translate-y-1/2`}
      />
      <span
        aria-hidden="true"
        className={`${cornerClass} bottom-0 right-0 translate-x-1/2 translate-y-1/2`}
      />
    </>
  );
}
export function Section({
  as: Comp = "section",
  label,
  id,
  children,
  action,
  className = "",
  contentClassName = "",
  headerClassName = "",
  labelClassName,
  showCorners = true,
  showHeader = true,
  titlePosition = "rail",
}: {
  as?: "section" | "footer";
  label: string;
  id?: string;
  children: ReactNode;
  action?: ReactNode;
  className?: string;
  contentClassName?: string;
  headerClassName?: string;
  labelClassName?: string;
  showCorners?: boolean;
  showHeader?: boolean;
  titlePosition?: "rail" | "top";
}) {
  const defaultLabelClassName =
    labelClassName ||
    "pt-1 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-muted-foreground";

  if (titlePosition === "top") {
    return (
      <Comp
        id={id}
        className={`relative -mx-4 border-t px-4 py-10 sm:-mx-8 sm:px-8 sm:py-14 lg:-mx-12 lg:px-12 ${className}`}
      >
        {showCorners ? <SectionCorners /> : null}
        {showHeader ? (
          <div className={`mb-8 flex items-center justify-between gap-4 ${headerClassName}`}>
            <h2 className={defaultLabelClassName}>{label}</h2>
            {action ? <div className="shrink-0">{action}</div> : null}
          </div>
        ) : null}
        <div className={contentClassName}>{children}</div>
      </Comp>
    );
  }

  return (
    <Comp
      id={id}
      className={`relative -mx-4 grid grid-cols-1 gap-5 border-t px-4 py-10 sm:-mx-8 sm:grid-cols-[110px_minmax(0,1fr)] sm:gap-8 sm:px-8 sm:py-16 lg:-mx-12 lg:px-12 ${className}`}
    >
      {showCorners ? <SectionCorners /> : null}
      {showHeader ? <p className={defaultLabelClassName}>{label}</p> : null}
      <div className={contentClassName}>
        {action ? <div className="mb-8 flex justify-end">{action}</div> : null}
        {children}
      </div>
    </Comp>
  );
}
export function Action({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="text-[14px] font-medium text-muted-foreground transition-colors hover:text-foreground"
    >
      {children}
    </Link>
  );
}
