import type { Technology } from "@/types/technology";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MediaTransitionLink } from "./media-transition-link";
import { TechPill } from "./tech-pill";

type SecondaryLink = {
  href: string;
  label: string;
};

export function CurrentProjectFeature({
  id,
  title,
  description,
  imageUrl,
  imageAlt,
  href,
  external = false,
  primaryLabel,
  category,
  meta,
  technologies = [],
  transitionName,
  secondaryLinks = [],
  headingAs: Heading = "h3",
}: {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
  href: string;
  external?: boolean;
  primaryLabel: string;
  category: string;
  meta?: string;
  technologies?: Technology[];
  transitionName?: string;
  secondaryLinks?: SecondaryLink[];
  headingAs?: "h2" | "h3";
}) {
  const media = imageUrl ? (
    <div
      className="relative aspect-[16/10] size-full overflow-hidden lg:min-h-[340px] lg:aspect-auto"
      data-media-transition-source={transitionName}
      style={
        transitionName
          ? {
              viewTransitionName: transitionName,
              viewTransitionClass: "media-image",
            }
          : undefined
      }
    >
      <Image
        src={imageUrl}
        alt={imageAlt || title}
        fill
        className="object-cover transition-transform duration-500 [transition-timing-function:var(--expo-out)] group-hover:scale-[1.025] motion-reduce:transform-none"
        sizes="(max-width: 1023px) 100vw, 560px"
      />
    </div>
  ) : (
    <div className="grid aspect-[16/10] min-h-[260px] place-items-center bg-muted p-6 text-center font-incognito text-[28px] font-semibold leading-none text-muted-foreground lg:min-h-[340px] lg:aspect-auto">
      {title}
    </div>
  );

  return (
    <article className="sm:col-span-2">
      <div className="grid lg:grid-cols-[minmax(0,1.25fr)_minmax(260px,0.75fr)]">
        <div className="p-3 sm:p-4">
          {transitionName ? (
            <MediaTransitionLink
              href={href}
              transitionName={transitionName}
              className="group block h-full overflow-hidden rounded-sm border bg-muted outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {media}
            </MediaTransitionLink>
          ) : (
            <Link
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="group block h-full overflow-hidden rounded-sm border bg-muted outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {media}
            </Link>
          )}
        </div>

        <div className="flex min-h-full flex-col p-5 sm:p-6">
          <div className="flex items-center justify-between gap-4 text-[12px]">
            <span className="inline-flex items-center gap-2 font-semibold text-foreground">
              <span className="size-1.5 rounded-full bg-success" aria-hidden="true" />
              Currently building
            </span>
            <span className="font-mono text-[11px] text-muted-foreground">{category}</span>
          </div>

          <Heading className="mt-7 text-balance font-incognito text-[clamp(26px,4vw,38px)] font-semibold leading-[1.02] tracking-[-0.03em] text-foreground">
            {title}
          </Heading>
          <p className="mt-4 text-pretty text-[13px] leading-6 text-muted-foreground">
            {description}
          </p>

          {technologies.length ? (
            <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${title} technologies`}>
              {technologies.slice(0, 7).map((technology) => (
                <li key={`${id}-${technology.name}`}>
                  <TechPill technology={technology} />
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-auto pt-8">
            {meta ? (
              <p className="mb-4 font-mono text-[11px] text-muted-foreground">{meta}</p>
            ) : null}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-4">
              {transitionName ? (
                <MediaTransitionLink
                  href={href}
                  transitionName={transitionName}
                  className="group inline-flex items-center gap-1.5 text-[13px] font-semibold text-foreground outline-none transition-opacity hover:opacity-65 focus-visible:underline active:translate-y-px"
                >
                  {primaryLabel}
                  <ArrowUpRight
                    className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </MediaTransitionLink>
              ) : (
                <Link
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="group inline-flex items-center gap-1.5 text-[13px] font-semibold text-foreground outline-none transition-opacity hover:opacity-65 focus-visible:underline active:translate-y-px"
                >
                  {primaryLabel}
                  <ArrowUpRight
                    className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </Link>
              )}

              {secondaryLinks.map((link) => (
                <Link
                  key={`${link.href}-${link.label}`}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[12px] font-medium text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:underline active:translate-y-px"
                >
                  {link.label}
                  <ArrowUpRight className="size-3.5" strokeWidth={1.8} aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
