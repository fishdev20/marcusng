import { ArrowLeft, type LucideIcon } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { TextReveal, TextRevealBlock } from "@/components/text-reveal";
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
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto min-h-dvh w-full max-w-310 bg-background px-3 sm:px-5 lg:px-8">
        <div className="relative mx-auto min-h-dvh w-full max-w-230 border-x px-4 pt-28 sm:px-8 sm:pt-32 lg:px-12 lg:pt-34">
          {children}
        </div>
      </div>
    </main>
  );
}
export function PageHero({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="pb-12 sm:pb-16">
      <p className="mb-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
        <span className="h-1.5 w-1.5 rounded-full bg-success" /> {label}
      </p>
      <h1 className="max-w-180 text-balance font-incognito text-[clamp(36px,7vw,64px)] font-semibold leading-[0.96] tracking-[-0.03em] text-foreground">
        <TextReveal text={title} className="flex" />
      </h1>
      {description ? (
        <TextRevealBlock className="mt-5 max-w-150" delay={0.62}>
          <p className="text-[14px] leading-6 text-muted-foreground">{description}</p>
        </TextRevealBlock>
      ) : null}
    </section>
  );
}
export function RailSection({
  label,
  children,
  className = "",
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`relative -mx-4 grid grid-cols-1 gap-5 border-t px-4 py-10 sm:-mx-8 sm:grid-cols-[110px_minmax(0,1fr)] sm:gap-8 sm:px-8 sm:py-14 lg:-mx-12 lg:px-12 ${className}`}
    >
      <SectionCorners />
      <p className="pt-1 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
        {label}
      </p>
      <div>{children}</div>
    </section>
  );
}
export function RowAction({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="text-[14px] font-medium text-muted-foreground transition-colors hover:text-foreground"
    >
      {children}
    </Link>
  );
}
export function EmptyState({ children }: { children: ReactNode }) {
  return (
    <div className="border-y py-8 text-[13px] leading-6 text-muted-foreground">{children}</div>
  );
}

export function DetailHeader({
  backHref,
  backLabel,
  title,
  description,
  actions,
}: {
  backHref: string;
  backLabel: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <header className="pb-10 sm:pb-14">
      <Link
        href={backHref}
        className="group inline-flex items-center gap-2 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft
          className="size-4 transition-transform group-hover:-translate-x-0.5"
          strokeWidth={1.8}
        />
        {backLabel}
      </Link>

      <h1 className="mt-10 max-w-[760px] text-balance font-incognito text-[clamp(38px,7vw,68px)] font-semibold leading-[0.96] tracking-[-0.035em] text-foreground">
        <TextReveal text={title} className="flex" />
      </h1>

      {description ? (
        <TextRevealBlock className="mt-6 max-w-[680px]" delay={0.62}>
          <p className="text-[15px] font-medium leading-7 text-muted-foreground sm:text-[16px] sm:leading-8">
            {description}
          </p>
        </TextRevealBlock>
      ) : null}

      {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
    </header>
  );
}

export function DetailMedia({ children }: { children: ReactNode }) {
  return (
    <section className="relative -mx-4 border-y bg-muted sm:-mx-8 lg:-mx-12">
      <SectionCorners />
      {children}
    </section>
  );
}

export function DetailFacts({
  facts,
}: {
  facts: Array<{ label: string; value: ReactNode; icon?: LucideIcon }>;
}) {
  return (
    <section className="relative -mx-4 border-b px-4 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
      <SectionCorners />
      <dl className="grid text-[13px] font-semibold text-foreground sm:grid-cols-3 sm:divide-x">
        {facts.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="flex min-h-[96px] flex-col justify-between gap-5 border-b py-4 last:border-b-0 sm:border-b-0 sm:px-4 sm:first:pl-0 sm:last:pr-0"
          >
            <dt className="font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
              {label}
            </dt>
            <dd className="flex min-w-0 items-center gap-2 leading-5">
              {Icon ? (
                <Icon className="size-3.5 shrink-0 text-muted-foreground" strokeWidth={1.8} />
              ) : null}
              <span className="min-w-0">{value}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function DetailBody({ children, sidebar }: { children: ReactNode; sidebar: ReactNode }) {
  return (
    <section className="relative -mx-4 grid grid-cols-1 gap-10 border-b px-4 py-10 sm:-mx-8 sm:px-8 sm:py-14 lg:-mx-12 lg:grid-cols-[minmax(0,1fr)_190px] lg:gap-14 lg:px-12">
      <SectionCorners />
      <div className="min-w-0">{children}</div>
      <aside className="order-first space-y-8 lg:order-none lg:sticky lg:top-28 lg:self-start">
        {sidebar}
      </aside>
    </section>
  );
}
