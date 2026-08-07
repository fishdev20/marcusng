import type { Profile } from "@/types/profile";
import { Github, type LucideIcon, Linkedin, Twitch, Twitter } from "lucide-react";
import Link from "next/link";
import { FlyingPortrait } from "./flying-portrait";
import { HeroGlobe } from "./hero-globe";
import { Section } from "./section";

export function HeroSection({ profile }: { profile: Profile | null }) {
  const headline = profile?.headline || "Software Engineer";
  const socialLinks = [
    profile?.socialLinks?.github
      ? { label: "GitHub", href: profile.socialLinks.github, icon: Github }
      : null,
    profile?.socialLinks?.linkedin
      ? { label: "LinkedIn", href: profile.socialLinks.linkedin, icon: Linkedin }
      : null,
    profile?.socialLinks?.twitter
      ? { label: "Twitter", href: profile.socialLinks.twitter, icon: Twitter }
      : null,
    profile?.socialLinks?.twitch
      ? { label: "Twitch", href: profile.socialLinks.twitch, icon: Twitch }
      : null,
  ].filter((item): item is { label: string; href: string; icon: LucideIcon } => Boolean(item));

  return (
    <Section
      label="Hero"
      titlePosition="top"
      showCorners={false}
      showHeader={false}
      className="min-h-[680px] overflow-hidden border-t-0 pb-0 pt-28 sm:min-h-[820px] sm:pt-32 lg:pt-[8.5rem]"
    >
      <div className="relative z-10 max-w-[650px]">
        <p className="mb-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          Open to work
        </p>

        <h1 className="max-w-[620px] text-balance text-[clamp(32px,5vw,48px)] font-semibold leading-[1.02] tracking-[-0.02em] text-foreground">
          Hello, I am
          {profile?.profileImage?.url ? (
            <FlyingPortrait
              src={profile.profileImage.url}
              alt={profile.profileImage.alt || `${profile.fullName} portrait`}
            />
          ) : null}
          {profile?.fullName || "Marcus Nguyen"}
          <span className="block">{headline}</span>
        </h1>

        <p className="mt-4 max-w-[500px] text-[14px] leading-6 text-muted-foreground">
          {profile?.shortBio ||
            "Building polished web products with clear interfaces and dependable systems."}
        </p>

        {socialLinks.length ? (
          <nav
            aria-label="Social links"
            className="mt-7 flex flex-wrap items-center text-[13px] font-semibold text-foreground"
          >
            {socialLinks.slice(0, 4).map(({ label, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-1.5 border-l px-3 first:border-l-0 first:pl-0 transition-colors hover:text-muted-foreground"
              >
                <Icon
                  className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-colors group-hover/link:text-foreground"
                  strokeWidth={1.8}
                />
                {label}
              </Link>
            ))}
          </nav>
        ) : null}

        {profile?.email ? (
          <Link
            href={`mailto:${profile.email}`}
            className="mt-7 inline-flex h-11 items-center rounded-sm bg-primary px-5 text-[14px] font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 active:translate-y-px"
          >
            Book a call
          </Link>
        ) : null}
      </div>

      <HeroGlobe location={profile?.location || "Helsinki, Finland"} />
    </Section>
  );
}
