import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { Button } from "@/components/ui/button";
import { getBlogBySlug, getBlogSlugs } from "@/lib/blog";
import { formatDate, slugify } from "@/lib/utils";
import { blogDataset, blogProjectId } from "@/sanity/blog-env";
import { urlForBlogImage } from "@/sanity/blog-image";
import { IBlogArticle, IBlogHeading } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 30;

function getHeadingText(heading: IBlogHeading) {
  return (
    heading.children
      ?.map((child) => child.text || "")
      .join("")
      .trim() || ""
  );
}

function getAuthorName(author: IBlogArticle["author"]) {
  return author?.name || "Marcus Nguyen";
}

const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children, value }) => (
      <h2
        id={slugify(getHeadingText(value as IBlogHeading))}
        className="mt-12 scroll-mt-28 font-incognito text-3xl font-semibold"
      >
        {children}
      </h2>
    ),
    h3: ({ children, value }) => (
      <h3
        id={slugify(getHeadingText(value as IBlogHeading))}
        className="mt-10 scroll-mt-28 font-incognito text-2xl font-semibold"
      >
        {children}
      </h3>
    ),
    h4: ({ children, value }) => (
      <h4
        id={slugify(getHeadingText(value as IBlogHeading))}
        className="mt-8 scroll-mt-28 font-incognito text-xl font-semibold"
      >
        {children}
      </h4>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value) {
        return null;
      }

      return (
        <div className="my-8 overflow-hidden rounded-2xl border border-border/70">
          <Image
            src={urlForBlogImage(value)}
            alt={value.alt || "Blog image"}
            width={1600}
            height={900}
            className="h-auto w-full object-cover"
          />
        </div>
      );
    },
    code: ({ value }) => (
      <pre className="my-6 overflow-x-auto rounded-2xl border border-border/70 bg-muted/60 p-4 text-sm leading-6">
        <code>{value.code}</code>
      </pre>
    ),
    table: ({ value }) => {
      const rows = value?.rows || [];

      if (!rows.length) {
        return null;
      }

      return (
        <div className="my-8 overflow-x-auto rounded-2xl border border-border/70">
          <table className="min-w-full border-collapse text-sm">
            <tbody>
              {rows.map((row: { _key?: string; cells?: string[] }, rowIndex: number) => (
                <tr key={row._key || rowIndex} className="border-b border-border/70">
                  {row.cells?.map((cell, cellIndex) => (
                    <td key={`${row._key || rowIndex}-${cellIndex}`} className="px-4 py-3">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    },
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href || "#";
      const isExternal = href.startsWith("http");

      return (
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noreferrer noopener" : undefined}
          className="text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:decoration-primary"
        >
          {children}
        </a>
      );
    },
  },
};

export async function generateStaticParams() {
  const slugs: Array<{ slug: string }> = await getBlogSlugs();

  return slugs.map(({ slug }) => ({ slug }));
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article: IBlogArticle | null = await getBlogBySlug(slug);

  if (!article) {
    notFound();
  }

  const headings = article.headings?.filter((heading) => getHeadingText(heading)) || [];
  const coverImageUrl = article.mainImage ? urlForBlogImage(article.mainImage) : null;

  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-24 pt-28 md:px-16">
      <div className="flex flex-col gap-6 border-b border-border/70 pb-10">
        <Link
          href="/blog"
          className="text-sm uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
        >
          Back to blog
        </Link>

        <div className="flex max-w-4xl flex-col gap-5">
          <h1 className="font-incognito text-4xl font-semibold leading-tight md:text-6xl">
            {article.title}
          </h1>
          <p className="text-base leading-7 text-muted-foreground md:text-lg">
            {article.smallDesc}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span>{formatDate(article.date)}</span>
          <span className="h-1 w-1 rounded-full bg-primary/70" />
          <span>{getAuthorName(article.author)}</span>
          {article.categories?.length ? (
            <>
              <span className="h-1 w-1 rounded-full bg-primary/70" />
              <span>{article.categories.map((category) => category.title).join(", ")}</span>
            </>
          ) : null}
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_240px]">
        <article className="min-w-0">
          {coverImageUrl ? (
            <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-[2rem] border border-border/70">
              <Image
                src={coverImageUrl}
                alt={article.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 70vw"
              />
            </div>
          ) : null}

          <div className="prose prose-neutral max-w-none dark:prose-invert prose-headings:font-incognito prose-a:text-primary prose-pre:bg-transparent">
            <PortableText
              value={article.body}
              components={portableTextComponents}
              onMissingComponent={false}
            />
          </div>
        </article>

        <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-2xl border border-border/70 bg-background/80 p-5 backdrop-blur-sm">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Contents</p>
            <div className="mt-4 flex flex-col gap-3">
              {headings.length ? (
                headings.map((heading) => {
                  const text = getHeadingText(heading);

                  return (
                    <a
                      key={heading._key}
                      href={`#${slugify(text)}`}
                      className="text-sm leading-6 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {text}
                    </a>
                  );
                })
              ) : (
                <p className="text-sm text-muted-foreground">
                  This article has no section headings.
                </p>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-border/70 bg-muted/30 p-5">
            <p className="text-sm leading-6 text-muted-foreground">
              Source: Sanity project{" "}
              <span className="font-mono text-foreground">{blogProjectId}</span> in dataset{" "}
              <span className="font-mono text-foreground">{blogDataset}</span>.
            </p>
            <Button asChild variant="outline" className="mt-4 w-full">
              <Link href="/blog">Browse more posts</Link>
            </Button>
          </div>
        </aside>
      </div>
    </section>
  );
}
