import {
  BLOG_STUDIO_PROXY_PATH,
  DEFAULT_BLOG_STUDIO_URL,
  PORTFOLIO_STUDIO_PATH,
  getBlogStudioUrl,
} from "@/lib/studio-links";
import { ArrowRight, ExternalLink, FilePenLine, Newspaper, UserRound } from "lucide-react";
import Link from "next/link";

function StudioCard({
  eyebrow,
  title,
  description,
  href,
  icon: Icon,
  external = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  icon: typeof UserRound;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group relative overflow-hidden rounded-[2rem] border border-border/70 p-6 transition-transform duration-300 hover:-translate-y-1 md:p-7"
      style={{
        background:
          eyebrow === "Portfolio studio"
            ? "linear-gradient(155deg, color-mix(in oklch, var(--background) 90%, var(--primary) 10%), color-mix(in oklch, var(--background) 97%, var(--primary) 3%))"
            : "linear-gradient(155deg, color-mix(in oklch, var(--background) 90%, var(--secondary) 10%), color-mix(in oklch, var(--background) 97%, var(--secondary) 3%))",
      }}
    >
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border/70 bg-background/72 text-primary">
            <Icon className="h-5 w-5" />
          </div>

          <div className="space-y-2">
            <p className="text-[0.72rem] uppercase tracking-[0.24em] text-muted-foreground">
              {eyebrow}
            </p>
            <h2 className="font-incognito text-[clamp(2rem,4vw,3rem)] leading-[0.94] tracking-[-0.04em]">
              {title}
            </h2>
            <p className="max-w-xl text-sm leading-7 text-muted-foreground md:text-base">
              {description}
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 text-[0.78rem] font-medium uppercase tracking-[0.2em] text-foreground">
          Open studio
          {external ? (
            <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          ) : (
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          )}
        </div>
      </div>
    </Link>
  );
}

export default function StudioHubPage() {
  const blogStudioUrl = getBlogStudioUrl();

  return (
    <section className="mx-auto flex max-w-7xl flex-col gap-10 px-6 pb-24 pt-28 md:px-16">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] xl:items-end">
        <div className="space-y-4">
          <p className="text-[0.72rem] uppercase tracking-[0.32em] text-primary">Content</p>
          <h1 className="max-w-xl font-incognito text-[clamp(2.8rem,5.8vw,5.3rem)] leading-[0.94] tracking-[-0.05em]">
            Choose which Sanity workspace you want to edit.
          </h1>
        </div>

        <div className="flex flex-col gap-4 xl:items-end">
          <p className="max-w-2xl text-base leading-7 text-muted-foreground md:text-lg xl:text-right">
            The portfolio and blog now read from separate Sanity projects. This page keeps both
            editing paths in one place so you can jump straight into adding or updating content.
          </p>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <StudioCard
          eyebrow="Portfolio studio"
          title="Portfolio content"
          description="Edit profile, experience, home sections, projects, and portfolio-specific content inside the main site studio."
          href={PORTFOLIO_STUDIO_PATH}
          icon={UserRound}
        />

        <StudioCard
          eyebrow="Blog studio"
          title="Blog content"
          description="Open the separate blog studio to manage posts, categories, authors, and article content from the dedicated Sanity project."
          href={BLOG_STUDIO_PROXY_PATH}
          icon={Newspaper}
        />
      </div>

      <div className="border-t border-border/65 pt-6">
        <div className="flex flex-col gap-3 text-sm text-muted-foreground">
          <div className="inline-flex items-center gap-2 text-foreground">
            <FilePenLine className="h-4 w-4 text-primary" />
            <span>Path summary</span>
          </div>
          <p>
            Portfolio studio: <code>{PORTFOLIO_STUDIO_PATH}</code>
          </p>
          <p>
            Blog studio shortcut: <code>{BLOG_STUDIO_PROXY_PATH}</code> which forwards to{" "}
            <code>{blogStudioUrl}</code>
          </p>
          <p>
            If your blog studio runs on a different host or port, set <code>BLOG_STUDIO_URL</code>{" "}
            in <code>.env.local</code>. Default fallback: <code>{DEFAULT_BLOG_STUDIO_URL}</code>
          </p>
          <p>
            Production note: to create or edit documents from the deployed studio, add your
            production domain to the matching Sanity project CORS origins and enable credentials.
          </p>
        </div>
      </div>
    </section>
  );
}
