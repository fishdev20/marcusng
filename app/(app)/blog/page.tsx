import { Card, CardContent } from "@/components/ui/card";
import SectionWrapper from "@/components/ui/section-wrapper";
import { getBlogs } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import { urlForBlogImage } from "@/sanity/blog-image";
import { IBlogCard } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 30;

function getAuthorName(author: IBlogCard["author"]) {
  return author?.name || "Marcus Nguyen";
}

export default async function BlogPage() {
  const posts: IBlogCard[] = await getBlogs();

  return (
    <SectionWrapper className="pt-24">
      <div className="flex max-w-3xl flex-col gap-4">
        <p className="text-sm uppercase tracking-[0.28em] text-primary">Writing</p>
        <h1 className="font-incognito text-4xl font-semibold md:text-6xl">
          Notes on engineering, frontend craft, and the work behind shipped products.
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
          Articles are now served directly inside the portfolio while still reading from the
          separate Sanity blog project.
        </p>
      </div>

      {posts.length ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => {
            const imageUrl = post.mainImage ? urlForBlogImage(post.mainImage) : null;

            return (
              <Card
                key={post.slug}
                className="overflow-hidden border-border/70 bg-background/80 backdrop-blur-sm"
              >
                <Link href={`/blog/${post.slug}`} className="flex h-full flex-col">
                  <div className="relative aspect-[16/10] overflow-hidden bg-muted/60">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="flex h-full items-end bg-gradient-to-br from-primary/20 via-background to-secondary/20 p-6">
                        <p className="font-incognito text-2xl font-semibold">{post.title}</p>
                      </div>
                    )}
                  </div>

                  <CardContent className="flex flex-1 flex-col gap-4 p-6">
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <span>{formatDate(post.date)}</span>
                      <span className="h-1 w-1 rounded-full bg-primary/70" />
                      <span>{getAuthorName(post.author)}</span>
                    </div>

                    <div className="space-y-3">
                      <h2 className="font-incognito text-2xl font-semibold leading-tight">
                        {post.title}
                      </h2>
                      <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
                        {post.smallDesc}
                      </p>
                    </div>

                    {post.categories?.length ? (
                      <div className="mt-auto flex flex-wrap gap-2 pt-2">
                        {post.categories.map((category) => (
                          <span
                            key={`${post.slug}-${category.title}`}
                            className="rounded-full border border-border/70 px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted-foreground"
                          >
                            {category.title}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </CardContent>
                </Link>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="border-dashed border-border/70 bg-background/80">
          <CardContent className="p-6 text-muted-foreground">
            No blog posts are available from the Sanity blog project yet.
          </CardContent>
        </Card>
      )}
    </SectionWrapper>
  );
}
