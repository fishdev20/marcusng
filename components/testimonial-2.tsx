"use client";

import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useId, useState } from "react";

export type Testimonial2Props = {
  authorName: string;
  authorTagline: string;
  authorImage?: string;
  authorImageAlt?: string;
  url?: string;
  quote: string;
  className?: string;
};

export function Testimonial2({
  className,
  authorName,
  authorTagline,
  authorImage,
  authorImageAlt,
  url,
  quote,
}: Testimonial2Props) {
  const [expanded, setExpanded] = useState(false);
  const quoteId = useId();
  const isLong = quote.length > 420;
  const visibleQuote = isLong && !expanded ? truncateQuote(quote, 360) : quote;

  return (
    <figure className={cn("relative flex flex-col gap-7 py-9 sm:py-12", className)}>
      <div className="max-w-[740px]">
        <blockquote
          id={quoteId}
          className="font-serif text-[15px] font-medium leading-7 text-foreground sm:text-[16px] sm:leading-8"
        >
          <span
            className="relative top-[0.08em] mr-[-0.08em] inline-block text-[1.55em] leading-none text-muted-foreground select-none"
            aria-hidden="true"
          >
            &ldquo;
          </span>
          <p className="inline whitespace-pre-line text-pretty">{visibleQuote}</p>
          {isLong ? (
            <>
              {" "}
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls={quoteId}
                onClick={() => setExpanded((value) => !value)}
                className="font-serif text-[inherit] font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-muted-foreground hover:decoration-foreground"
              >
                {expanded ? "Show less" : "Read more"}
              </button>
            </>
          ) : null}
          <span
            className="relative top-[0.08em] inline-block text-[1.55em] leading-none text-muted-foreground select-none"
            aria-hidden="true"
          >
            &rdquo;
          </span>
        </blockquote>
      </div>

      <figcaption className="ml-auto flex w-full items-center gap-3 sm:w-[62%]">
        <span className="hidden h-px grow bg-border sm:block" />
        <AuthorImage src={authorImage} alt={authorImageAlt || authorName} name={authorName} />
        <div className="min-w-0 text-left">
          {url ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${authorName}'s testimonial source`}
              className="group inline-flex max-w-full items-center gap-1.5 text-[13px] font-semibold text-foreground transition-colors hover:text-muted-foreground"
            >
              <span className="truncate">{authorName}</span>
              <ArrowUpRight
                className="size-3.5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </a>
          ) : (
            <span className="block truncate text-[13px] font-semibold text-foreground">
              {authorName}
            </span>
          )}
          <span className="mt-1 block truncate text-[11px] text-muted-foreground">
            {authorTagline}
          </span>
        </div>
      </figcaption>
    </figure>
  );
}

function truncateQuote(quote: string, maximumLength: number) {
  if (quote.length <= maximumLength) return quote;

  const shortened = quote.slice(0, maximumLength);
  const lastSpace = shortened.lastIndexOf(" ");

  return `${shortened.slice(0, lastSpace > 0 ? lastSpace : maximumLength).trimEnd()}...`;
}

function AuthorImage({ src, alt, name }: { src?: string; alt: string; name: string }) {
  return (
    <span className="relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-full border bg-muted text-[12px] font-semibold text-foreground">
      {src ? (
        <Image src={src} alt={alt} fill className="object-cover" sizes="40px" />
      ) : (
        name
          .split(/\s+/)
          .slice(0, 2)
          .map((part) => part[0])
          .join("")
          .toUpperCase()
      )}
    </span>
  );
}
