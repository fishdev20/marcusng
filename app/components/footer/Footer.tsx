import { getProfile } from "@/sanity/lib/query";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import Link from "next/link";

const primaryLinks = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

const stackLinks = [
  { label: "Sanity", href: "https://sanity.io" },
  { label: "Next.js", href: "https://nextjs.org" },
  { label: "Vercel", href: "https://vercel.com" },
];

type FooterLink = {
  label: string;
  href: string;
};

function getSocialLinks(socialLinks?: {
  github?: string;
  linkedin?: string;
  twitter?: string;
  twitch?: string;
}): FooterLink[] {
  return [
    socialLinks?.github ? { label: "GitHub", href: socialLinks.github } : null,
    socialLinks?.linkedin ? { label: "LinkedIn", href: socialLinks.linkedin } : null,
    socialLinks?.twitter ? { label: "Twitter", href: socialLinks.twitter } : null,
    socialLinks?.twitch ? { label: "Twitch", href: socialLinks.twitch } : null,
  ].filter((item): item is FooterLink => Boolean(item));
}

export default async function Footer() {
  const profile = await getProfile();
  const socialLinks = getSocialLinks(profile?.socialLinks);
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border/70">
      <div className="mx-auto flex max-w-7xl flex-col gap-14 px-6 pb-10 pt-14 md:px-16 md:pb-12 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-[0.72rem] uppercase tracking-[0.3em] text-primary">Closing note</p>
              <h2 className="max-w-xl font-incognito text-[clamp(2.2rem,4.8vw,4.6rem)] leading-[0.94] tracking-[-0.05em]">
                Building software with care, clarity, and dependable engineering.
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-muted-foreground">
              {profile?.location ? (
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  {profile.location}
                </span>
              ) : null}

              {profile?.email ? (
                <Link
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
                >
                  <Mail className="h-4 w-4 text-primary" />
                  {profile.email}
                </Link>
              ) : null}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2">
            <div className="space-y-4">
              <p className="text-[0.72rem] uppercase tracking-[0.24em] text-muted-foreground">
                Explore
              </p>
              <div className="flex flex-col gap-3">
                {primaryLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group inline-flex items-center justify-between gap-4 border-b border-border/55 pb-3 text-sm text-foreground transition-colors hover:text-primary"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              {socialLinks.length ? (
                <div className="space-y-4">
                  <p className="text-[0.72rem] uppercase tracking-[0.24em] text-muted-foreground">
                    Elsewhere
                  </p>
                  <div className="flex flex-col gap-3">
                    {socialLinks.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center justify-between gap-4 border-b border-border/55 pb-3 text-sm text-foreground transition-colors hover:text-primary"
                      >
                        <span>{item.label}</span>
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}

              {profile?.currentCompany ? (
                <div className="space-y-2">
                  <p className="text-[0.72rem] uppercase tracking-[0.24em] text-muted-foreground">
                    Currently
                  </p>
                  <p className="max-w-sm text-sm leading-7 text-muted-foreground">
                    Building at{" "}
                    {profile.currentCompanyLink ? (
                      <Link
                        href={profile.currentCompanyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground transition-colors hover:text-primary"
                      >
                        {profile.currentCompany}
                      </Link>
                    ) : (
                      <span className="text-foreground">{profile.currentCompany}</span>
                    )}
                    .
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-border/60 pt-5 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted-foreground">
            Copyright {year} {profile?.fullName || "Marcus Nguyen"}. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <span>Built with</span>
            {stackLinks.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-foreground"
              >
                {item.label}
                {index < stackLinks.length - 1 ? <span className="ml-4 text-border">/</span> : null}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
