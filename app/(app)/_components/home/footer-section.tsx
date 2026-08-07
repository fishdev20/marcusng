import type { Profile } from "@/types/profile";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { Section } from "./section";
export function FooterSection({ profile }: { profile: Profile | null }) {
  const email = profile?.email || "minhnguyen.dev20@gmail.com";
  const exploreLinks = [
    { label: "About", href: "/#about" },
    { label: "Projects", href: "/projects" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/#contact" },
  ];
  const socialLinks = [
    profile?.socialLinks?.github ? { label: "GitHub", href: profile.socialLinks.github } : null,
    profile?.socialLinks?.linkedin
      ? { label: "LinkedIn", href: profile.socialLinks.linkedin }
      : null,
    profile?.socialLinks?.twitter ? { label: "Twitter", href: profile.socialLinks.twitter } : null,
    profile?.socialLinks?.twitch ? { label: "Twitch", href: profile.socialLinks.twitch } : null,
  ].filter((item): item is { label: string; href: string } => Boolean(item));
  const builtWith = [
    { label: "Sanity", href: "https://sanity.io" },
    { label: "Next.js", href: "https://nextjs.org" },
    { label: "Vercel", href: "https://vercel.com" },
  ];
  return (
    <Section as="footer" label="Closing note" titlePosition="top" className="py-12 sm:py-16">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div>
          <h2 className="max-w-[500px] text-balance text-[clamp(34px,5vw,56px)] font-semibold leading-[1.08] tracking-[-0.035em] text-foreground">
            Building software with care, clarity, and dependable engineering.
          </h2>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-[14px] font-semibold text-muted-foreground">
            {profile?.location ? (
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-info" /> {profile.location}
              </span>
            ) : null}
            <Link
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2 hover:text-foreground"
            >
              <Mail className="h-4 w-4 text-info" /> {email}
            </Link>
          </div>
        </div>
        <div className="grid gap-10 sm:grid-cols-2">
          <FooterLinks title="Explore" links={exploreLinks} />
          <div className="grid gap-10">
            {socialLinks.length ? (
              <FooterLinks title="Elsewhere" links={socialLinks} external />
            ) : null}
            {profile?.currentCompany ? (
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                  Currently
                </p>
                <p className="mt-5 text-[14px] font-semibold leading-6 text-muted-foreground">
                  Building at
                  {profile.currentCompanyLink ? (
                    <Link
                      href={profile.currentCompanyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground transition-colors hover:text-foreground"
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
      <div className="mt-14 flex flex-col gap-5 border-t pt-6 text-[13px] font-semibold text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          Copyright {new Date().getFullYear()} {profile?.fullName || "Marcus Nguyen"}. All rights
          reserved.
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <span>Built with</span>
          {builtWith.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </Section>
  );
}
function FooterLinks({
  title,
  links,
  external = false,
}: {
  title: string;
  links: { label: string; href: string }[];
  external?: boolean;
}) {
  return (
    <div>
      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
        {title}
      </p>
      <div className="mt-5 grid gap-0">
        {links.map((item) => (
          <Link
            key={`${title}-${item.label}`}
            href={item.href}
            target={external || item.href.startsWith("http") ? "_blank" : undefined}
            rel={external || item.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="group flex items-center justify-between border-b py-3 text-[15px] font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            {item.label}
            <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
          </Link>
        ))}
      </div>
    </div>
  );
}
