import type { Profile } from "@/types/profile";
import Link from "next/link";
import { portableTextToParagraphs } from "./helpers";
import { Section } from "./section";

export function AboutSection({ profile }: { profile: Profile | null }) {
  const paragraphs = portableTextToParagraphs(profile?.fullBio).slice(0, 2);
  const visibleParagraphs = paragraphs.length
    ? paragraphs
    : [
        profile?.shortBio ||
          "I build production-ready software with clear architecture, careful interfaces, and a strong bias for maintainable product decisions.",
      ];

  return (
    <Section label="About me" id="about">
      <div
        className={
          profile?.profileImage?.url
            ? "grid gap-8 sm:grid-cols-[minmax(0,1fr)_150px] sm:items-start lg:grid-cols-[minmax(0,1fr)_176px] lg:gap-12"
            : undefined
        }
      >
        <div className="space-y-5">
          {visibleParagraphs.map((paragraph, index) => (
            <p
              key={paragraph}
              className={`w-full text-[13px] leading-6 ${
                index === 0 ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {paragraph}
              {index === visibleParagraphs.length - 1 ? (
                <>
                  {" "}
                  <Link
                    href="/about"
                    className="font-semibold text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-muted-foreground hover:decoration-foreground"
                  >
                    Read more
                  </Link>
                </>
              ) : null}
            </p>
          ))}

          <div className="pt-3">
            <p className="text-[15px] font-semibold text-foreground">
              {profile?.fullName || "Marcus Nguyen"}
            </p>
          </div>
        </div>

        {profile?.profileImage?.url ? (
          <div
            data-portrait-destination
            aria-hidden="true"
            className="invisible order-first aspect-[4/5] w-full justify-self-stretch sm:order-none sm:justify-self-auto"
          />
        ) : null}
      </div>
    </Section>
  );
}
