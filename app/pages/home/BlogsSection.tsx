import { Button } from "@/components/ui/button";
import SectionWrapper from "@/components/ui/section-wrapper";
import { getLatestBlogs } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import { urlForBlogImage } from "@/sanity/blog-image";
import { IBlogCard } from "@/types/blog";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 30;

function getAuthorName(author: IBlogCard["author"]) {
  return author?.name || "Marcus Nguyen";
}

function CategoryPill({ title, warm = false }: { title: string; warm?: boolean }) {
  return (
    <span
      className="rounded-full border px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-foreground/88"
      style={{
        borderColor: warm
          ? "color-mix(in oklch, var(--border) 58%, var(--primary) 42%)"
          : "color-mix(in oklch, var(--border) 58%, var(--secondary) 42%)",
        background: warm
          ? "linear-gradient(135deg, color-mix(in oklch, var(--background) 84%, var(--primary) 16%), color-mix(in oklch, var(--background) 94%, var(--primary) 6%))"
          : "linear-gradient(135deg, color-mix(in oklch, var(--background) 84%, var(--secondary) 16%), color-mix(in oklch, var(--background) 94%, var(--secondary) 6%))",
      }}
    >
      {title}
    </span>
  );
}

export default async function BlogsSection() {
  const posts: IBlogCard[] = await getLatestBlogs(5);
  const [featuredPost, ...recentPosts] = posts;

  return (
    <SectionWrapper reveal={false} className="gap-8 md:gap-10">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:items-start">
        <div className="space-y-4">
          <p className="text-[0.72rem] uppercase tracking-[0.32em] text-primary">Journal</p>
          <h2 className="max-w-3xl text-balance font-incognito text-[clamp(2.6rem,5.2vw,4.8rem)] leading-[0.98] tracking-[-0.03em]">
            Field notes from the workbench.
          </h2>
        </div>

        <div className="flex flex-col gap-4 xl:ml-auto xl:max-w-xl xl:items-end xl:pt-14 xl:text-right">
          <p className="max-w-xl text-pretty text-base leading-7 text-muted-foreground md:text-lg">
            Short reads on software, interfaces, and the decisions behind shipped work.
          </p>
          <Button asChild variant="outline" className="rounded-full px-6">
            <Link href="/blog" prefetch={false}>
              View all writing
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>

      {!featuredPost ? (
        <div className="rounded-2xl border border-dashed border-border/70 px-6 py-10 text-muted-foreground">
          No blog posts are available yet.
        </div>
      ) : (
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.08fr)_minmax(21rem,0.92fr)]">
          <article className="relative overflow-hidden rounded-2xl border border-border/70">
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(150deg, color-mix(in oklch, var(--background) 90%, var(--primary) 10%), color-mix(in oklch, var(--background) 98%, var(--secondary) 5%))",
              }}
            />

            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group relative z-10 block p-4 md:p-5"
            >
              <div className="flex flex-col gap-6">
                <div className="relative aspect-[16/9] min-h-[16rem] overflow-hidden rounded-2xl border border-border/60 bg-muted/45 md:min-h-[22rem]">
                  {featuredPost.mainImage ? (
                    <Image
                      src={urlForBlogImage(featuredPost.mainImage)}
                      alt={featuredPost.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 1024px) 100vw, 38vw"
                    />
                  ) : (
                    <div className="flex h-full items-end bg-gradient-to-br from-primary/20 via-background to-secondary/20 p-6">
                      <p className="max-w-sm font-incognito text-4xl leading-[0.94] tracking-[-0.03em]">
                        {featuredPost.title}
                      </p>
                    </div>
                  )}

                  <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/88 px-3 py-1.5 text-[0.66rem] font-medium uppercase tracking-[0.22em] text-foreground backdrop-blur-sm">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    Latest note
                  </div>
                </div>

                <div className="flex flex-col justify-between gap-8 px-1 pb-1 md:px-2 md:pb-2">
                  <div className="space-y-5">
                    <div className="flex flex-wrap items-center gap-3 text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
                      <span>{formatDate(featuredPost.date)}</span>
                      <span className="h-1 w-1 rounded-full bg-primary/70" />
                      <span>{getAuthorName(featuredPost.author)}</span>
                    </div>

                    <div className="space-y-4">
                      <h3 className="max-w-3xl font-incognito text-[clamp(2.2rem,4vw,3.7rem)] leading-[0.96] tracking-[-0.03em] transition-colors group-hover:text-primary">
                        {featuredPost.title}
                      </h3>
                      <p className="max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
                        {featuredPost.smallDesc}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-5">
                    {featuredPost.categories?.length ? (
                      <div className="flex flex-wrap gap-2.5">
                        {featuredPost.categories.slice(0, 3).map((category) => (
                          <CategoryPill
                            key={`${featuredPost.slug}-${category.title}`}
                            title={category.title}
                            warm
                          />
                        ))}
                      </div>
                    ) : null}

                    <div className="inline-flex items-center gap-2 text-[0.78rem] font-medium uppercase tracking-[0.2em] text-foreground">
                      Read featured note
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </article>

          <aside className="overflow-hidden rounded-2xl border border-border/70">
            <div
              className="h-full p-5 md:p-6"
              style={{
                background:
                  "linear-gradient(150deg, color-mix(in oklch, var(--background) 92%, var(--secondary) 8%), color-mix(in oklch, var(--background) 98%, var(--primary) 4%))",
              }}
            >
              <div className="mb-6 flex items-end justify-between gap-4">
                <div className="space-y-2">
                  <p className="text-[0.72rem] uppercase tracking-[0.24em] text-muted-foreground">
                    Recent
                  </p>
                  <h3 className="font-incognito text-3xl leading-none tracking-[-0.01em]">
                    More notes
                  </h3>
                </div>
                <span className="text-[0.72rem] uppercase tracking-[0.2em] text-muted-foreground">
                  {recentPosts.length} shown
                </span>
              </div>

              {recentPosts.length ? (
                <div className="divide-y divide-border/65">
                  {recentPosts.map((post, index) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group grid gap-4 py-5 first:pt-0 last:pb-0 sm:grid-cols-[3rem_minmax(0,1fr)]"
                    >
                      <span className="font-incognito text-3xl leading-none text-foreground/35 transition-colors group-hover:text-primary">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="min-w-0 space-y-3">
                        <span className="flex flex-wrap items-center gap-3 text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
                          <span>{formatDate(post.date)}</span>
                          <span className="h-1 w-1 rounded-full bg-secondary/70" />
                          <span>{getAuthorName(post.author)}</span>
                        </span>

                        <span className="block space-y-2">
                          <span className="block font-incognito text-[1.8rem] leading-[0.98] tracking-[-0.02em] text-foreground transition-colors group-hover:text-primary">
                            {post.title}
                          </span>
                          <span className="line-clamp-2 block text-sm leading-6 text-muted-foreground">
                            {post.smallDesc}
                          </span>
                        </span>

                        <span className="flex items-center gap-3">
                          {post.categories?.slice(0, 1).map((category) => (
                            <CategoryPill
                              key={`${post.slug}-${category.title}`}
                              title={category.title}
                              warm={index % 2 === 0}
                            />
                          ))}
                          <span className="inline-flex items-center gap-2 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-muted-foreground transition-colors group-hover:text-foreground">
                            Read
                            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                          </span>
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-sm leading-6 text-muted-foreground">
                  More posts will appear here once they are published.
                </p>
              )}
            </div>
          </aside>
        </div>
      )}
    </SectionWrapper>
  );
}
