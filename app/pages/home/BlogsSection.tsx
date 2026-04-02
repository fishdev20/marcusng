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

export default async function BlogsSection() {
  const posts: IBlogCard[] = await getLatestBlogs(5);
  const [featuredPost, ...otherPosts] = posts;
  const sidePosts = otherPosts.slice(0, 2);
  const bottomPosts = otherPosts.slice(2);

  return (
    <SectionWrapper className="gap-8 md:gap-10">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] xl:items-end">
        <div className="space-y-4">
          <p className="text-[0.72rem] uppercase tracking-[0.32em] text-primary">Journal</p>
          <h2 className="max-w-xl font-incognito text-[clamp(2.6rem,5.2vw,4.6rem)] leading-[0.95] tracking-[-0.04em]">
            Latest notes on software and interface craft.
          </h2>
        </div>

        <div className="flex flex-col gap-4 xl:items-end">
          <p className="max-w-lg text-base leading-7 text-muted-foreground md:text-lg xl:text-right">
            Recent posts pulled directly into the portfolio from the blog Sanity project.
          </p>
          <Button asChild variant="outline" className="rounded-full px-6">
            <Link href="/blog" prefetch={false}>
              Browse all posts
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>

      {!featuredPost ? (
        <div className="rounded-[2rem] border border-dashed border-border/70 px-6 py-10 text-muted-foreground">
          No blog posts are available yet.
        </div>
      ) : (
        <div className="grid items-start gap-4 xl:grid-cols-12">
          <article className="group relative overflow-hidden rounded-[2.25rem] border border-primary/20 shadow-[0_0_0_1px_color-mix(in_oklch,var(--primary)_12%,transparent)] xl:col-span-8 xl:row-span-2 xl:self-stretch">
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(160deg, color-mix(in oklch, var(--primary) 9%, transparent), transparent 42%, color-mix(in oklch, var(--secondary) 12%, transparent))",
              }}
            />
            <Link href={`/blog/${featuredPost.slug}`} className="relative block h-full p-4 md:p-6">
              <div className="grid h-full gap-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] bg-muted/60">
                  <div className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-full bg-background/88 px-3 py-1.5 text-[0.66rem] font-medium uppercase tracking-[0.22em] text-foreground shadow-[0_12px_30px_rgba(0,0,0,0.24)] backdrop-blur-sm">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    Newest entry
                  </div>
                  {featuredPost.mainImage ? (
                    <Image
                      src={urlForBlogImage(featuredPost.mainImage)}
                      alt={featuredPost.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                  ) : (
                    <div className="flex h-full items-end bg-gradient-to-br from-primary/20 via-background to-secondary/20 p-6">
                      <p className="font-incognito text-3xl leading-none">{featuredPost.title}</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col justify-between gap-8 py-1">
                  <div className="space-y-5">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.22em] text-primary-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
                        Latest blog
                      </span>
                      <span className="text-[0.68rem] uppercase tracking-[0.22em] text-muted-foreground">
                        Featured first in the portfolio
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-[0.72rem] uppercase tracking-[0.22em] text-muted-foreground">
                      <span>Published {formatDate(featuredPost.date)}</span>
                      <span className="h-1 w-1 rounded-full bg-primary/70" />
                      <span>{getAuthorName(featuredPost.author)}</span>
                    </div>

                    <div className="space-y-4">
                      <h3 className="max-w-xl font-incognito text-[2.2rem] leading-[0.96] tracking-[-0.03em] md:text-[3.2rem]">
                        {featuredPost.title}
                      </h3>
                      <p className="max-w-xl text-base leading-7 text-muted-foreground md:text-lg">
                        {featuredPost.smallDesc}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-5">
                    {featuredPost.categories?.length ? (
                      <div className="flex flex-wrap gap-2.5">
                        {featuredPost.categories.map((category) => (
                          <span
                            key={`${featuredPost.slug}-${category.title}`}
                            className="rounded-full border border-border/70 px-3 py-1 text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground"
                          >
                            {category.title}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    <div className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
                      Read latest article
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </article>

          <div className="contents">
            {sidePosts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group relative overflow-hidden rounded-[1.8rem] border border-border/70 p-5 transition-transform duration-300 hover:-translate-y-1 xl:col-span-4"
                style={{
                  background:
                    index % 2 === 0
                      ? "linear-gradient(150deg, color-mix(in oklch, var(--background) 93%, var(--primary) 7%), color-mix(in oklch, var(--background) 98%, var(--primary) 2%))"
                      : "linear-gradient(150deg, color-mix(in oklch, var(--background) 93%, var(--secondary) 7%), color-mix(in oklch, var(--background) 98%, var(--secondary) 2%))",
                }}
              >
                <div className="flex h-full flex-col gap-5">
                  <div className="flex items-center justify-between gap-4 text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
                    <span>{formatDate(post.date)}</span>
                    <span>{getAuthorName(post.author)}</span>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-incognito text-2xl leading-none md:text-[2rem]">
                      {post.title}
                    </h3>
                    <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
                      {post.smallDesc}
                    </p>
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-2">
                      {post.categories?.slice(0, 2).map((category) => (
                        <span
                          key={`${post.slug}-${category.title}`}
                          className="rounded-full border border-border/70 px-2.5 py-1 text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground"
                        >
                          {category.title}
                        </span>
                      ))}
                    </div>

                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-foreground" />
                  </div>
                </div>
              </Link>
            ))}

            {bottomPosts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={`group relative overflow-hidden rounded-[1.8rem] border border-border/70 p-5 transition-transform duration-300 hover:-translate-y-1 ${
                  bottomPosts.length === 1 ? "xl:col-span-12" : "xl:col-span-6"
                }`}
                style={{
                  background:
                    index % 2 === 0
                      ? "linear-gradient(150deg, color-mix(in oklch, var(--background) 93%, var(--primary) 7%), color-mix(in oklch, var(--background) 98%, var(--primary) 2%))"
                      : "linear-gradient(150deg, color-mix(in oklch, var(--background) 93%, var(--secondary) 7%), color-mix(in oklch, var(--background) 98%, var(--secondary) 2%))",
                }}
              >
                <div className="flex h-full flex-col gap-5">
                  <div className="flex items-center justify-between gap-4 text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
                    <span>{formatDate(post.date)}</span>
                    <span>{getAuthorName(post.author)}</span>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-incognito text-2xl leading-none md:text-[2rem]">
                      {post.title}
                    </h3>
                    <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
                      {post.smallDesc}
                    </p>
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-2">
                      {post.categories?.slice(0, 2).map((category) => (
                        <span
                          key={`${post.slug}-${category.title}`}
                          className="rounded-full border border-border/70 px-2.5 py-1 text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground"
                        >
                          {category.title}
                        </span>
                      ))}
                    </div>

                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-foreground" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </SectionWrapper>
  );
}
