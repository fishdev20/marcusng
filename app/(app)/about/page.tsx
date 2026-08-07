import { PortableBlock } from "@/components/portable-text";
import { getProfile } from "@/sanity/lib/query";
import {
  ArrowUpRight,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Twitch,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { EmptyState, PageHero, PageShell, RailSection } from "../_components/site-frame";
type SocialItem = { href: string; label: string; icon: typeof Github };
export const metadata = {
  title: "About | Marcus Nguyen",
  description: "About Marcus Nguyen, software engineer.",
};
export default async function AboutPage() {
  const profile = await getProfile().catch(() => null);
  if (!profile) {
    return (
      <PageShell>
        <PageHero label="About" title="Profile unavailable" />
        <RailSection label="Status">
          <EmptyState>Profile content is not available yet.</EmptyState>
        </RailSection>
      </PageShell>
    );
  }
  const socialItems: SocialItem[] = [
    profile.socialLinks?.github
      ? { href: profile.socialLinks.github, label: "GitHub", icon: Github }
      : null,
    profile.socialLinks?.linkedin
      ? { href: profile.socialLinks.linkedin, label: "LinkedIn", icon: Linkedin }
      : null,
    profile.socialLinks?.twitter
      ? { href: profile.socialLinks.twitter, label: "Twitter", icon: Twitter }
      : null,
    profile.socialLinks?.twitch
      ? { href: profile.socialLinks.twitch, label: "Twitch", icon: Twitch }
      : null,
  ].filter((item): item is SocialItem => Boolean(item));
  return (
    <PageShell>
      <PageHero
        label="About"
        title={profile.fullName}
        description={
          profile.shortBio ||
          "Software engineer focused on clear product interfaces, reliable systems, and maintainable delivery."
        }
      />
      <RailSection label="Profile">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-start">
          <div className="space-y-5">
            {profile.headline ? (
              <h2 className="max-w-[560px] font-incognito text-[30px] font-semibold leading-[1.02] tracking-[-0.025em] text-foreground sm:text-[36px]">
                {profile.headline}
              </h2>
            ) : null}
            <div className="grid gap-3 border-y py-5 sm:grid-cols-2">
              {profile.location ? (
                <ProfileMeta icon={MapPin} label="Base" value={profile.location} />
              ) : null}
              {profile.currentCompany ? (
                <ProfileMeta label="Currently" value={`Building at ${profile.currentCompany}`} />
              ) : null}
              {profile.email ? (
                <ProfileMeta icon={Mail} label="Email" value={profile.email} />
              ) : null}
            </div>
            <div className="flex flex-wrap gap-3">
              {profile.resumeURL ? (
                <Link
                  href={profile.resumeURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center gap-2 rounded-sm bg-primary px-4 text-[13px] font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
                >
                  <Download className="h-3.5 w-3.5" /> Download resume
                </Link>
              ) : null}
              {profile.email ? (
                <Link
                  href={`mailto:${profile.email}`}
                  className="inline-flex h-10 items-center gap-2 rounded-sm border px-4 text-[13px] font-semibold text-foreground transition-colors  hover:text-foreground"
                >
                  <Mail className="h-3.5 w-3.5" /> Send email
                </Link>
              ) : null}
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm border bg-muted">
            {profile.profileImage?.url ? (
              <Image
                src={profile.profileImage.url}
                alt={profile.profileImage.alt || profile.fullName}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 220px"
              />
            ) : (
              <div className="grid h-full place-items-center p-6 text-center font-incognito text-[32px] font-semibold leading-none text-foreground">
                {profile.fullName}
              </div>
            )}
          </div>
        </div>
      </RailSection>
      <RailSection label="Narrative">
        {profile.fullBio ? (
          <PortableBlock
            value={profile.fullBio}
            className="max-w-[640px] [&_h2]:mb-4 [&_h2]:mt-8 [&_h2]:font-incognito [&_h2]:text-[28px] [&_h2]:font-semibold [&_h2]:leading-[1.05] [&_h2]:tracking-[-0.02em] [&_h2]:text-foreground [&_h3]:mb-3 [&_h3]:mt-6 [&_h3]:font-incognito [&_h3]:text-[22px] [&_h3]:text-foreground [&_li]:text-[14px] [&_li]:leading-7 [&_li]:text-muted-foreground [&_p]:text-[14px] [&_p]:leading-7 [&_p]:text-muted-foreground [&_strong]:text-foreground"
          />
        ) : (
          <EmptyState>
            Narrative content will appear here when Sanity content is available.
          </EmptyState>
        )}
      </RailSection>
      {profile.education?.length ? (
        <RailSection label="Education">
          <div className="border-y ">
            {profile.education.map((edu, index) => (
              <article
                key={`${edu.school}-${index}`}
                className="grid gap-4 border-b py-5 last:border-b-0 sm:grid-cols-[150px_minmax(0,1fr)]"
              >
                <div className="flex items-center gap-3">
                  {edu.logo?.url ? (
                    <span className="relative h-9 w-9 overflow-hidden rounded-sm border bg-muted">
                      <Image
                        src={edu.logo.url}
                        alt={edu.logo.alt || edu.school}
                        fill
                        className="object-contain p-1.5"
                      />
                    </span>
                  ) : null}
                  <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                    {edu.years || "Education"}
                  </p>
                </div>
                <div>
                  <h2 className="font-incognito text-[22px] font-semibold leading-none text-foreground">
                    {edu.school}
                  </h2>
                  <p className="mt-2 text-[13px] leading-6 text-muted-foreground">
                    {[edu.degree, edu.major].filter(Boolean).join(", ")}
                  </p>
                  {edu.details ? (
                    <p className="mt-3 max-w-[560px] text-[13px] leading-6 text-muted-foreground">
                      {edu.details}
                    </p>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </RailSection>
      ) : null}
      {socialItems.length ? (
        <RailSection label="Elsewhere" className="pb-14">
          <div className="grid border-y sm:grid-cols-2">
            {socialItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 border-b py-4 text-[15px] font-semibold text-foreground transition-colors last:border-b-0 hover:text-foreground sm:px-4 sm:odd:border-r"
              >
                <span className="inline-flex items-center gap-3">
                  <Icon className="h-4 w-4 text-muted-foreground" /> {label}
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
              </Link>
            ))}
          </div>
        </RailSection>
      ) : null}
    </PageShell>
  );
}
function ProfileMeta({
  icon: Icon,
  label,
  value,
}: {
  icon?: typeof Mail;
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 inline-flex items-center gap-2 text-[13px] font-medium leading-5 text-foreground">
        {Icon ? <Icon className="h-3.5 w-3.5 text-info" /> : null} {value}
      </p>
    </div>
  );
}
