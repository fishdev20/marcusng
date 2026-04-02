import SectionWrapper from "@/components/ui/section-wrapper";
import { getBlogs } from "@/lib/blog";
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

export default async function BlogPage() {
  const posts: IBlogCard[] = await getBlogs();
  const [leadPost, ...otherPosts] = posts;

  return (
    <SectionWrapper
      reveal={false}
      className="mb-24 mt-20 gap-10 pt-10 sm:pt-12 md:my-32 md:gap-12 md:pt-24"
    >
      <div className="gap-6 xl:grid-cols-[minmax(0,0.76fr)_minmax(0,1.24fr)] xl:items-end">
        <div className="space-y-4">
          <p className="text-[0.72rem] uppercase tracking-[0.32em] text-primary">Writing</p>
          <h1 className="w-full font-incognito text-[clamp(2.8rem,5.8vw,5.5rem)] leading-[0.94] tracking-[-0.05em]">
            Notes on engineering, interface craft, and shipped work.
          </h1>
        </div>
      </div>

      {!leadPost ? (
        <div className="rounded-[2rem] border border-dashed border-border/70 px-6 py-10 text-muted-foreground">
          No blog posts are available from the Sanity blog project yet.
        </div>
      ) : (
        <div className="space-y-10">
          <article className="border-t border-border/70 pt-8 md:pt-10">
            <div className="flex flex-col gap-8 xl:flex-row xl:items-start xl:gap-10">
              <div className="w-full max-w-[14rem] shrink-0 space-y-3 xl:pt-2">
                <p className="text-[0.72rem] uppercase tracking-[0.26em] text-primary">
                  Latest post
                </p>
                <p className="text-[0.72rem] uppercase tracking-[0.22em] text-muted-foreground">
                  {formatDate(leadPost.date)}
                </p>
                <p className="text-sm text-muted-foreground">{getAuthorName(leadPost.author)}</p>
              </div>

              <div className="flex-1 space-y-6">
                <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:gap-8">
                  <div className="flex-1 space-y-5">
                    <h2 className="max-w-2xl font-incognito text-[clamp(2.4rem,4.8vw,4.5rem)] leading-[0.93] tracking-[-0.05em]">
                      {leadPost.title}
                    </h2>

                    <p className="max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
                      {leadPost.smallDesc}
                    </p>

                    {leadPost.categories?.length ? (
                      <div className="flex flex-wrap gap-2.5">
                        {leadPost.categories.map((category) => (
                          <span
                            key={`${leadPost.slug}-${category.title}`}
                            className="rounded-full border border-border/70 px-3 py-1 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-foreground/88"
                            style={{
                              borderColor:
                                "color-mix(in oklch, var(--border) 58%, var(--primary) 42%)",
                              background:
                                "linear-gradient(135deg, color-mix(in oklch, var(--background) 84%, var(--primary) 16%), color-mix(in oklch, var(--background) 94%, var(--primary) 6%))",
                            }}
                          >
                            {category.title}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    <Link
                      href={`/blog/${leadPost.slug}`}
                      className="inline-flex items-center gap-2 text-[0.78rem] font-medium uppercase tracking-[0.2em] text-foreground transition-colors hover:text-primary"
                    >
                      Read article
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>

                  <Link href={`/blog/${leadPost.slug}`} className="block w-full xl:max-w-[31rem]">
                    <div className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-muted/45">
                      {leadPost.mainImage ? (
                        <div className="relative aspect-[16/10]">
                          <Image
                            src={urlForBlogImage(leadPost.mainImage)}
                            alt={leadPost.title}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                            sizes="(max-width: 1280px) 100vw, 42vw"
                          />
                        </div>
                      ) : (
                        <div className="flex aspect-[16/10] items-end bg-gradient-to-br from-primary/20 via-background to-secondary/20 p-6">
                          <p className="max-w-sm font-incognito text-4xl leading-[0.94] tracking-[-0.04em]">
                            {leadPost.title}
                          </p>
                        </div>
                      )}

                      <div className="absolute left-4 top-4 rounded-full border border-primary/30 bg-primary px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.22em] text-primary-foreground shadow-[0_12px_28px_color-mix(in_oklch,var(--primary)_26%,transparent)]">
                        Featured first
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </article>

          <section className="border-t border-border/65 pt-8 md:pt-10">
            <div className="grid gap-6 xl:grid-cols-[minmax(0,14rem)_minmax(0,1fr)]">
              <div className="space-y-3">
                <p className="text-[0.72rem] uppercase tracking-[0.26em] text-primary">Archive</p>
                <p className="max-w-[12rem] text-sm leading-7 text-muted-foreground">
                  Earlier posts, product notes, and technical articles from the same Sanity blog.
                </p>
              </div>

              <div className="flex flex-col">
                {otherPosts.length ? (
                  otherPosts.map((post, index) => (
                    <article
                      key={post.slug}
                      className={`py-6 ${index === 0 ? "pt-0" : "border-t border-border/60"}`}
                    >
                      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-8">
                        <div className="w-full space-y-2 lg:max-w-[10.5rem]">
                          <p className="text-[0.72rem] uppercase tracking-[0.22em] text-muted-foreground">
                            {formatDate(post.date)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {getAuthorName(post.author)}
                          </p>
                        </div>

                        <Link
                          href={`/blog/${post.slug}`}
                          className="block w-full lg:max-w-[14rem] xl:max-w-[15.5rem]"
                        >
                          <div className="relative overflow-hidden rounded-[1.6rem] border border-border/60 bg-muted/45">
                            {post.mainImage ? (
                              <div className="relative aspect-[4/3]">
                                <Image
                                  src={urlForBlogImage(post.mainImage)}
                                  alt={post.title}
                                  fill
                                  className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                                  sizes="(max-width: 1024px) 100vw, 20vw"
                                />
                              </div>
                            ) : (
                              <div className="flex aspect-[4/3] items-end bg-gradient-to-br from-primary/20 via-background to-secondary/20 p-4">
                                <p className="font-incognito text-2xl leading-[0.94] tracking-[-0.03em]">
                                  {post.title}
                                </p>
                              </div>
                            )}
                          </div>
                        </Link>

                        <div className="min-w-0 flex-1 space-y-4">
                          <div className="space-y-3">
                            <Link href={`/blog/${post.slug}`} className="group inline-block">
                              <h2 className="font-incognito text-[clamp(1.8rem,3vw,2.8rem)] leading-[0.96] tracking-[-0.04em] transition-colors group-hover:text-primary">
                                {post.title}
                              </h2>
                            </Link>
                            <p className="max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
                              {post.smallDesc}
                            </p>
                          </div>

                          <div className="flex flex-wrap items-center gap-4">
                            {post.categories?.length ? (
                              <div className="flex flex-wrap gap-2.5">
                                {post.categories.slice(0, 3).map((category) => (
                                  <span
                                    key={`${post.slug}-${category.title}`}
                                    className="rounded-full border border-border/70 px-3 py-1 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-foreground/88"
                                    style={{
                                      borderColor:
                                        index % 2 === 0
                                          ? "color-mix(in oklch, var(--border) 58%, var(--secondary) 42%)"
                                          : "color-mix(in oklch, var(--border) 58%, var(--primary) 42%)",
                                      background:
                                        index % 2 === 0
                                          ? "linear-gradient(135deg, color-mix(in oklch, var(--background) 84%, var(--secondary) 16%), color-mix(in oklch, var(--background) 94%, var(--secondary) 6%))"
                                          : "linear-gradient(135deg, color-mix(in oklch, var(--background) 84%, var(--primary) 16%), color-mix(in oklch, var(--background) 94%, var(--primary) 6%))",
                                    }}
                                  >
                                    {category.title}
                                  </span>
                                ))}
                              </div>
                            ) : null}

                            <Link
                              href={`/blog/${post.slug}`}
                              className="inline-flex items-center gap-2 text-[0.78rem] font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
                            >
                              Read
                              <ArrowRight className="h-4 w-4" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))
                ) : (
                  <p className="text-muted-foreground">No additional posts are available yet.</p>
                )}
              </div>
            </div>
          </section>
        </div>
      )}
    </SectionWrapper>
  );
}
