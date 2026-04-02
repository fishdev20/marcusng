import { PortableBlock } from "@/components/portable-text";
import SectionWrapper from "@/components/ui/section-wrapper";
import { getProfile } from "@/sanity/lib/query";
import {
  ArrowRight,
  Download,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Twitch,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type SocialItem = {
  href: string;
  label: string;
  icon: typeof Github;
};

export default async function AboutPage() {
  const profile = await getProfile();

  if (!profile) {
    return (
      <SectionWrapper>
        <p className="text-center text-muted-foreground">Profile not found.</p>
      </SectionWrapper>
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
    <SectionWrapper className="gap-10 md:gap-12">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] xl:items-end">
        <div className="space-y-4">
          <p className="text-[0.72rem] uppercase tracking-[0.32em] text-primary">About</p>
          <h1 className="max-w-xl font-incognito text-[clamp(2.7rem,5.8vw,5.3rem)] leading-[0.94] tracking-[-0.05em]">
            Who am I?
          </h1>
        </div>

        <div className="flex flex-col gap-4 xl:items-end">
          <p className="max-w-xl text-base leading-7 text-muted-foreground md:text-lg xl:text-right">
            Product-minded software engineer focused on building interfaces that feel clear,
            dependable, and carefully shipped.
          </p>
        </div>
      </div>

      <div className="grid gap-10 xl:grid-cols-[minmax(0,0.74fr)_minmax(0,1.26fr)] xl:items-start">
        <aside className="space-y-8 xl:sticky xl:top-28">
          <div className="space-y-5">
            <div className="overflow-hidden rounded-[2.2rem] border border-border/70 bg-muted/35 p-3">
              {profile.profileImage?.url ? (
                <Image
                  src={profile.profileImage.url}
                  alt={profile.profileImage.alt || profile.fullName}
                  width={900}
                  height={1200}
                  className="aspect-[4/5] w-full rounded-[1.6rem] object-cover"
                />
              ) : (
                <div className="flex aspect-[4/5] items-end rounded-[1.6rem] bg-gradient-to-br from-primary/20 via-background to-secondary/18 p-6">
                  <p className="max-w-[12rem] font-incognito text-4xl leading-[0.94] tracking-[-0.04em]">
                    {profile.fullName}
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <p className="text-[0.72rem] uppercase tracking-[0.26em] text-muted-foreground">
                Profile
              </p>
              <h2 className="font-incognito text-[clamp(2rem,3.6vw,3.1rem)] leading-[0.92] tracking-[-0.04em]">
                {profile.fullName}
              </h2>
              {profile.headline ? (
                <p className="max-w-md text-base leading-7 text-muted-foreground">
                  {profile.headline}
                </p>
              ) : null}
            </div>
          </div>

          <div className="border-t border-border/65 pt-6">
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-1">
              {profile.currentCompany ? (
                <div className="space-y-2">
                  <p className="text-[0.68rem] uppercase tracking-[0.24em] text-muted-foreground">
                    Currently
                  </p>
                  <Link
                    href={profile.currentCompanyLink || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-foreground/90 transition-colors hover:text-primary"
                  >
                    <ArrowRight className="h-4 w-4 text-primary" />
                    <span>{profile.currentCompany}</span>
                  </Link>
                </div>
              ) : null}

              {profile.location ? (
                <div className="space-y-2">
                  <p className="text-[0.68rem] uppercase tracking-[0.24em] text-muted-foreground">
                    Base
                  </p>
                  <div className="inline-flex items-center gap-2 text-sm text-foreground/90">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{profile.location}</span>
                  </div>
                </div>
              ) : null}

              {profile.email ? (
                <div className="space-y-2 sm:col-span-2 xl:col-span-1">
                  <p className="text-[0.68rem] uppercase tracking-[0.24em] text-muted-foreground">
                    Email
                  </p>
                  <Link
                    href={`mailto:${profile.email}`}
                    className="inline-flex items-center gap-2 text-sm text-foreground/90 transition-colors hover:text-primary"
                  >
                    <Mail className="h-4 w-4 text-primary" />
                    <span>{profile.email}</span>
                  </Link>
                </div>
              ) : null}
            </div>
          </div>

          {socialItems.length ? (
            <div className="space-y-3 border-t border-border/65 pt-6">
              <p className="text-[0.68rem] uppercase tracking-[0.24em] text-muted-foreground">
                Elsewhere
              </p>
              <div className="flex flex-wrap gap-2.5">
                {socialItems.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border/70 px-3 py-2 text-sm text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/35 hover:text-foreground"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

          <div className="flex flex-wrap gap-3 border-t border-border/65 pt-6">
            {profile.resumeURL ? (
              <Link
                href={profile.resumeURL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5"
              >
                <Download className="h-4 w-4" />
                Download resume
              </Link>
            ) : null}

            {profile.email ? (
              <Link
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-border/70 px-5 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
              >
                <Mail className="h-4 w-4" />
                Send email
              </Link>
            ) : null}
          </div>
        </aside>

        <div className="space-y-12">
          <section className="space-y-5 border-t border-border/65 pt-6">
            <p className="text-[0.72rem] uppercase tracking-[0.24em] text-muted-foreground">
              Overview
            </p>
            {profile.shortBio ? (
              <p className="max-w-3xl font-incognito text-[clamp(1.8rem,3.4vw,2.7rem)] leading-[1.02] tracking-[-0.04em] text-foreground/95">
                {profile.shortBio}
              </p>
            ) : null}
          </section>

          {profile.fullBio ? (
            <section className="space-y-5 border-t border-border/65 pt-6">
              <p className="text-[0.72rem] uppercase tracking-[0.24em] text-muted-foreground">
                Narrative
              </p>
              <PortableBlock
                value={profile.fullBio}
                className="[&_h2]:font-incognito [&_h2]:text-[2rem] [&_h2]:leading-[0.98] [&_h2]:tracking-[-0.03em] [&_h2]:text-foreground [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:font-incognito [&_h3]:text-[1.5rem] [&_h3]:tracking-[-0.02em] [&_p]:text-base [&_p]:leading-8 [&_p]:text-muted-foreground [&_li]:text-base [&_li]:leading-8 [&_li]:text-muted-foreground [&_strong]:text-foreground [&_table]:rounded-[1rem] [&_table]:overflow-hidden [&_img]:rounded-[1.6rem]"
              />
            </section>
          ) : null}

          {profile.education?.length ? (
            <section className="space-y-5 border-t border-border/65 pt-6">
              <div className="flex items-center gap-3">
                <GraduationCap className="h-5 w-5 text-primary" />
                <p className="text-[0.72rem] uppercase tracking-[0.24em] text-muted-foreground">
                  Education
                </p>
              </div>

              <div className="flex flex-col">
                {profile.education.map((edu, idx) => (
                  <article
                    key={`${edu.school}-${idx}`}
                    className="flex flex-col gap-5 border-t border-border/60 py-6 first:border-t-0 first:pt-0 md:flex-row md:items-start"
                  >
                    <div className="flex w-full items-start gap-4 md:max-w-[18rem] md:flex-col md:gap-3">
                      {edu.logo?.url ? (
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[1rem] border border-border/70 bg-background/70">
                          <Image
                            src={edu.logo.url}
                            alt={edu.logo.alt || edu.school}
                            fill
                            className="object-contain p-2"
                          />
                        </div>
                      ) : null}

                      <div className="space-y-1">
                        <p className="font-incognito text-[1.55rem] leading-[0.96] tracking-[-0.03em]">
                          {edu.school}
                        </p>
                        {edu.years ? (
                          <p className="text-[0.72rem] uppercase tracking-[0.22em] text-muted-foreground">
                            {edu.years}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex-1 space-y-3">
                      <div className="space-y-1">
                        <p className="text-base font-medium text-foreground/92">
                          {edu.degree}
                          {edu.major ? ` — ${edu.major}` : ""}
                        </p>
                        {edu.location ? (
                          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span>{edu.location}</span>
                          </div>
                        ) : null}
                      </div>

                      {edu.details ? (
                        <p className="max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
                          {edu.details}
                        </p>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </SectionWrapper>
  );
}
