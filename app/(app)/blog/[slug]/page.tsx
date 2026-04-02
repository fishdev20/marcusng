import ReadingProgress from "@/app/components/blog/ReadingProgress";
import CodeBlock from "@/app/components/blog/CodeBlock";
import { getBlogBySlug, getBlogSlugs } from "@/lib/blog";
import { highlightCode } from "@/lib/code-highlight";
import { formatDate, slugify } from "@/lib/utils";
import { urlForBlogImage } from "@/sanity/blog-image";
import { IBlogArticle, IBlogHeading } from "@/types/blog";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { ArrowLeft, Link2 } from "lucide-react";
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
        className="mt-14 scroll-mt-28 font-incognito text-[2rem] leading-[0.98] tracking-[-0.03em] md:text-[2.35rem]"
      >
        {children}
      </h2>
    ),
    h3: ({ children, value }) => (
      <h3
        id={slugify(getHeadingText(value as IBlogHeading))}
        className="mt-12 scroll-mt-28 font-incognito text-[1.55rem] leading-[1] tracking-[-0.02em] md:text-[1.85rem]"
      >
        {children}
      </h3>
    ),
    h4: ({ children, value }) => (
      <h4
        id={slugify(getHeadingText(value as IBlogHeading))}
        className="mt-10 scroll-mt-28 font-incognito text-[1.2rem] leading-[1.05] tracking-[-0.01em] md:text-[1.35rem]"
      >
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-2 border-primary/40 pl-5 font-incognito text-[1.2rem] leading-8 text-foreground/88 md:text-[1.35rem]">
        {children}
      </blockquote>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value) {
        return null;
      }

      return (
        <div className="my-10 overflow-hidden rounded-[1.8rem] border border-border/70">
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
    code: ({ value }) => {
      const code = value?.code || "";
      const { highlighted, language } = highlightCode(code, value?.language);

      return <CodeBlock code={code} language={language} highlighted={highlighted} />;
    },
    table: ({ value }) => {
      const rows = value?.rows || [];

      if (!rows.length) {
        return null;
      }

      return (
        <div className="my-10 overflow-x-auto rounded-[1.6rem] border border-border/70">
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
          className="text-primary underline decoration-primary/35 underline-offset-4 transition-colors hover:decoration-primary"
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
    <section className="mx-auto flex max-w-7xl flex-col gap-10 px-6 pb-24 pt-28 md:px-16">
      <ReadingProgress />
      <div className="border-b border-border/70 pb-10">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] xl:items-end">
          <div className="space-y-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to blog
            </Link>

            <div className="flex flex-wrap gap-2.5">
              {article.categories?.length ? (
                article.categories.map((category) => (
                  <span
                    key={`${article.slug}-${category.title}`}
                    className="rounded-full border border-border/70 px-3 py-1 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-foreground/88"
                    style={{
                      borderColor: "color-mix(in oklch, var(--border) 58%, var(--primary) 42%)",
                      background:
                        "linear-gradient(135deg, color-mix(in oklch, var(--background) 84%, var(--primary) 16%), color-mix(in oklch, var(--background) 94%, var(--primary) 6%))",
                    }}
                  >
                    {category.title}
                  </span>
                ))
              ) : (
                <span
                  className="rounded-full border border-border/70 px-3 py-1 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-foreground/88"
                  style={{
                    borderColor: "color-mix(in oklch, var(--border) 58%, var(--secondary) 42%)",
                    background:
                      "linear-gradient(135deg, color-mix(in oklch, var(--background) 84%, var(--secondary) 16%), color-mix(in oklch, var(--background) 94%, var(--secondary) 6%))",
                  }}
                >
                  Article
                </span>
              )}
            </div>

            <h1 className="max-w-4xl font-incognito text-[clamp(2.8rem,6vw,5.8rem)] leading-[0.92] tracking-[-0.055em]">
              {article.title}
            </h1>
          </div>

          <div className="flex flex-col gap-5 xl:items-end">
            <p className="max-w-2xl text-base leading-7 text-muted-foreground md:text-lg xl:text-right">
              {article.smallDesc}
            </p>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground xl:justify-end">
              <span>{formatDate(article.date)}</span>
              <span>{getAuthorName(article.author)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_17rem]">
        <article className="min-w-0">
          {coverImageUrl ? (
            <div className="relative mb-10 overflow-hidden rounded-[2.2rem] border border-border/70">
              <div className="relative aspect-[16/9]">
                <Image
                  src={coverImageUrl}
                  alt={article.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1280px) 100vw, 72vw"
                />
              </div>
            </div>
          ) : null}

          <div className="gap-8">
            <div className="min-w-0">
              <div className="prose prose-neutral max-w-none dark:prose-invert prose-headings:font-incognito prose-a:text-primary prose-pre:bg-transparent prose-p:text-base prose-p:leading-8 prose-p:text-muted-foreground prose-li:text-base prose-li:leading-8 prose-li:text-muted-foreground prose-strong:text-foreground prose-hr:border-border/60">
                <PortableText
                  value={article.body}
                  components={portableTextComponents}
                  onMissingComponent={false}
                />
              </div>
            </div>
          </div>
        </article>

        <aside className="space-y-5 xl:sticky xl:top-28 xl:self-start">
          <div className="border-t border-border/65 pt-5">
            <p className="text-[0.72rem] uppercase tracking-[0.24em] text-primary">Contents</p>
            <div className="mt-5 flex flex-col gap-3">
              {headings.length ? (
                headings.map((heading) => {
                  const text = getHeadingText(heading);

                  return (
                    <a
                      key={heading._key}
                      href={`#${slugify(text)}`}
                      className="inline-flex items-start gap-2 text-sm leading-6 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <Link2 className="mt-1 h-3.5 w-3.5 shrink-0 text-primary/70" />
                      <span>{text}</span>
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
        </aside>
      </div>
    </section>
  );
}
