import PreviewHeader from "@/app/(app)/PreviewHeader";
import { FooterSection } from "@/app/(app)/_components/home/footer-section";
import { PageHero, PageShell, RailSection } from "@/app/(app)/_components/site-frame";
import { Providers } from "@/app/providers";
import {
  BLOG_STUDIO_PROXY_PATH,
  DEFAULT_BLOG_STUDIO_URL,
  PORTFOLIO_STUDIO_PATH,
  getBlogStudioUrl,
} from "@/lib/studio-links";
import { getProfile } from "@/sanity/lib/query";
import { ArrowUpRight, Database, ExternalLink, Newspaper } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Content Studio | Marcus Nguyen",
  description: "Choose a Sanity workspace for the portfolio or blog.",
};

const workspaces = [
  {
    label: "Portfolio",
    title: "Portfolio content",
    description: "Manage profile details, experience, projects, education, and site content.",
    href: PORTFOLIO_STUDIO_PATH,
    icon: Database,
    route: PORTFOLIO_STUDIO_PATH,
  },
  {
    label: "Writing",
    title: "Blog content",
    description: "Manage posts, authors, categories, article media, and editorial content.",
    href: BLOG_STUDIO_PROXY_PATH,
    icon: Newspaper,
    route: BLOG_STUDIO_PROXY_PATH,
  },
];

export default async function StudioHubPage() {
  const [profile, blogStudioUrl] = await Promise.all([
    getProfile().catch(() => null),
    Promise.resolve(getBlogStudioUrl()),
  ]);

  return (
    <Providers>
      <PreviewHeader profile={profile} />
      <PageShell>
        <PageHero
          label="Content studio"
          title="Choose a workspace."
          description="The portfolio and blog use separate Sanity projects. Open the workspace that owns the content you want to update."
        />

        <RailSection label="Workspaces">
          <div className="border-y">
            {workspaces.map(({ label, title, description, href, icon: Icon, route }) => (
              <Link
                key={title}
                href={href}
                className="group grid gap-5 border-b py-6 transition-colors last:border-b-0 hover:bg-muted sm:grid-cols-[48px_minmax(0,1fr)_auto] sm:items-center sm:px-5"
              >
                <span className="grid size-12 place-items-center rounded-sm border bg-background text-muted-foreground transition-colors group-hover:text-foreground">
                  <Icon className="size-5" strokeWidth={1.7} />
                </span>

                <span className="min-w-0">
                  <span className="mb-2 block font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
                    {label}
                  </span>
                  <span className="block text-[18px] font-semibold leading-6 text-foreground">
                    {title}
                  </span>
                  <span className="mt-2 block max-w-[560px] text-[13px] font-medium leading-6 text-muted-foreground">
                    {description}
                  </span>
                </span>

                <span className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                  <code className="font-mono text-[10px] text-muted-foreground">{route}</code>
                  <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-foreground">
                    Open studio
                    <ArrowUpRight
                      className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      strokeWidth={1.8}
                    />
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </RailSection>

        <RailSection label="Configuration" className="pb-14 sm:pb-20">
          <div className="border-y">
            <ConfigRow label="Portfolio route" value={PORTFOLIO_STUDIO_PATH} />
            <ConfigRow label="Blog shortcut" value={BLOG_STUDIO_PROXY_PATH} />
            <ConfigRow label="Blog studio" value={blogStudioUrl} external />
          </div>

          <div className="mt-6 grid gap-3 text-[13px] font-medium leading-6 text-muted-foreground">
            <p>
              Set <code className="font-mono text-foreground">BLOG_STUDIO_URL</code> in
              <code className="ml-1 font-mono text-foreground">.env.local</code> when the blog
              studio runs somewhere other than
              <code className="ml-1 font-mono text-foreground">{DEFAULT_BLOG_STUDIO_URL}</code>.
            </p>
            <p>
              For deployed editing, add the production domain to each Sanity project&apos;s CORS
              origins and enable credentials.
            </p>
          </div>
        </RailSection>
      </PageShell>

      <div className="bg-background text-foreground">
        <div className="mx-auto w-full max-w-310 bg-background px-3 sm:px-5 lg:px-8">
          <div className="relative mx-auto w-full max-w-230 border-x px-4 sm:px-8 lg:px-12">
            <FooterSection profile={profile} />
          </div>
        </div>
      </div>
    </Providers>
  );
}

function ConfigRow({
  label,
  value,
  external = false,
}: {
  label: string;
  value: string;
  external?: boolean;
}) {
  const content = (
    <>
      <span className="font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
        {label}
      </span>
      <span className="flex min-w-0 items-center gap-2 text-[13px] font-semibold text-foreground">
        <code className="truncate font-mono font-medium">{value}</code>
        {external ? <ExternalLink className="size-3.5 shrink-0" strokeWidth={1.8} /> : null}
      </span>
    </>
  );

  return external ? (
    <a
      href={value}
      target="_blank"
      rel="noopener noreferrer"
      className="grid gap-2 border-b py-4 transition-colors last:border-b-0 hover:bg-muted sm:grid-cols-[150px_minmax(0,1fr)] sm:px-4"
    >
      {content}
    </a>
  ) : (
    <div className="grid gap-2 border-b py-4 last:border-b-0 sm:grid-cols-[150px_minmax(0,1fr)] sm:px-4">
      {content}
    </div>
  );
}
