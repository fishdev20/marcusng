import CharacterFadeUpText from "@/app/components/animation/CharacterFadupText";
import { PixelImage } from "@/components/ui/pixel-image";
import { getProfile } from "@/sanity/lib/query";
import { ArrowRight, Building2, Github, Linkedin, MapPin, Twitter } from "lucide-react";
import Link from "next/link";

type SocialLink = {
  href: string;
  label: string;
  icon: typeof Github;
};

function getQuickLinks() {
  return [
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "#contact" },
  ];
}

export async function HeroSection() {
  const profile = await getProfile();

  const socialLinks: SocialLink[] = [
    profile.socialLinks?.github
      ? { href: profile.socialLinks.github, label: "GitHub", icon: Github }
      : null,
    profile.socialLinks?.linkedin
      ? { href: profile.socialLinks.linkedin, label: "LinkedIn", icon: Linkedin }
      : null,
    profile.socialLinks?.twitter
      ? { href: profile.socialLinks.twitter, label: "Twitter", icon: Twitter }
      : null,
  ].filter((item): item is SocialLink => Boolean(item));

  const quickLinks = getQuickLinks();
  const intro = profile.headline || "Software engineer shaping polished products for the web.";
  const bio =
    profile.shortBio ||
    "I build production-ready products with an emphasis on clear engineering, strong frontend execution, and thoughtful product decisions.";

  return (
    <section className="relative isolate w-full overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-screen w-screen -translate-x-1/2 opacity-100"
        style={{
          background:
            "radial-gradient(circle at 10% 16%, color-mix(in oklch, var(--primary) 24%, transparent), transparent 32%), radial-gradient(circle at 82% 18%, color-mix(in oklch, var(--secondary) 22%, transparent), transparent 30%), radial-gradient(circle at 48% 56%, color-mix(in oklch, var(--primary) 10%, transparent), transparent 42%), linear-gradient(180deg, color-mix(in oklch, var(--background) 38%, transparent), color-mix(in oklch, var(--background) 96%, transparent))",
        }}
      />
      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col justify-center gap-8 px-6 pb-10 pt-24 md:px-12 md:pb-14 md:pt-28 xl:px-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.04fr)_minmax(18rem,0.76fr)] lg:items-start xl:grid-cols-[minmax(0,1.08fr)_minmax(18rem,0.72fr)] xl:items-center">
          <div className="space-y-7 md:space-y-8">
            <div className="space-y-5">
              <h1 className="max-w-5xl font-incognito text-[clamp(3rem,8vw,7.35rem)] leading-[0.88] tracking-[-0.065em] text-balance">
                Building for the web.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-foreground/84 md:text-lg md:leading-8">
                {intro}
              </p>
            </div>

            <div className="grid gap-7 xl:grid-cols-[minmax(0,1fr)_minmax(15rem,0.5fr)] xl:items-start">
              <div className="space-y-6">
                <p className="max-w-xl text-sm leading-7 text-muted-foreground md:text-base">
                  {bio}
                </p>

                <div className="flex flex-wrap gap-3">
                  {profile.email ? (
                    <Link
                      href={`mailto:${profile.email}`}
                      className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5"
                    >
                      Start a conversation
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  ) : null}

                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 rounded-full border border-border/80 px-5 py-3 text-sm font-medium text-foreground transition-colors duration-300 hover:border-primary/40 hover:text-primary"
                  >
                    See selected work
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="space-y-5 border-t border-border/70 pt-5 xl:border-l xl:border-t-0 xl:pl-6 xl:pt-0">
                {profile.location ? (
                  <div className="space-y-2">
                    <p className="text-[0.68rem] uppercase tracking-[0.26em] text-muted-foreground">
                      Base
                    </p>
                    <div className="inline-flex items-center gap-2 text-sm text-foreground/90">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>{profile.location}</span>
                    </div>
                  </div>
                ) : null}

                {profile.currentCompany ? (
                  <div className="space-y-2">
                    <p className="text-[0.68rem] uppercase tracking-[0.26em] text-muted-foreground">
                      Currently
                    </p>
                    <Link
                      href={profile.currentCompanyLink || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-foreground/90 transition-colors hover:text-primary"
                    >
                      <Building2 className="h-4 w-4 text-primary" />
                      <span>{profile.currentCompany}</span>
                    </Link>
                  </div>
                ) : null}

                {socialLinks.length ? (
                  <div className="space-y-3">
                    <p className="text-[0.68rem] uppercase tracking-[0.26em] text-muted-foreground">
                      Elsewhere
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {socialLinks.map(({ href, label, icon: Icon }) => (
                        <Link
                          key={label}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-border/70 px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/35 hover:text-foreground"
                          aria-label={label}
                        >
                          <Icon className="h-4 w-4" />
                          <span>{label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="w-full max-w-[25rem] space-y-4 md:max-w-[28rem] lg:ml-auto lg:max-w-[22rem] xl:max-w-[26rem]">
            <div className="overflow-hidden rounded-[2rem] border border-border/70 bg-muted/35 p-3">
              {profile.profileImage?.url ? (
                <PixelImage
                  src={profile.profileImage.url}
                  height="22rem"
                  borderRadius="1.4rem"
                  grid="8x8"
                />
              ) : (
                <div className="flex h-[22rem] items-end rounded-[1.4rem] bg-gradient-to-br from-primary/20 via-background to-secondary/18 p-6">
                  <p className="max-w-[12rem] font-incognito text-4xl leading-[0.95] tracking-[-0.04em]">
                    {profile.fullName}
                  </p>
                </div>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
              <div className="space-y-3">
                <p className="font-incognito text-[clamp(1.8rem,3.8vw,2.7rem)] leading-[0.92] tracking-[-0.04em]">
                  <CharacterFadeUpText text={profile.fullName} stagger={0.028} delay={0.15} />
                </p>
              </div>

              <div className="grid gap-2 text-[0.72rem] uppercase tracking-[0.24em] text-muted-foreground">
                {quickLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center justify-between gap-3 border-b border-border/55 pb-2 text-right transition-colors hover:text-foreground"
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
