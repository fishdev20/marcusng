import CodeBlock from "@/app/components/blog/CodeBlock";
import ReadingProgress from "@/app/components/blog/ReadingProgress";
import { getBlogBySlug, getBlogSlugs } from "@/lib/blog";
import { highlightCode } from "@/lib/code-highlight";
import { formatDate, slugify } from "@/lib/utils";
import { urlForBlogImage } from "@/sanity/blog-image";
import { IBlogArticle, IBlogHeading } from "@/types/blog";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { ArrowUpRight, CalendarDays, Link2, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  DetailBody,
  DetailFacts,
  DetailHeader,
  DetailMedia,
  PageShell,
} from "../../_components/site-frame";

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
        className="mt-14 scroll-mt-28 font-incognito text-[1.9rem] font-semibold leading-[1.04] tracking-[-0.025em] text-foreground md:text-[2.2rem]"
      >
        {children}
      </h2>
    ),
    h3: ({ children, value }) => (
      <h3
        id={slugify(getHeadingText(value as IBlogHeading))}
        className="mt-12 scroll-mt-28 font-incognito text-[1.45rem] font-semibold leading-[1.08] tracking-[-0.02em] text-foreground md:text-[1.7rem]"
      >
        {children}
      </h3>
    ),
    h4: ({ children, value }) => (
      <h4
        id={slugify(getHeadingText(value as IBlogHeading))}
        className="mt-10 scroll-mt-28 font-incognito text-[1.15rem] font-semibold leading-[1.15] tracking-[-0.01em] text-foreground md:text-[1.3rem]"
      >
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-10 border-y py-6 font-incognito text-[1.2rem] leading-8 text-foreground md:text-[1.3rem]">
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
        <div className="my-10 overflow-hidden rounded-sm border bg-muted">
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
        <div className="my-10 overflow-x-auto rounded-sm border">
          <table className="min-w-full border-collapse text-sm">
            <tbody>
              {rows.map((row: { _key?: string; cells?: string[] }, rowIndex: number) => (
                <tr key={row._key || rowIndex} className="border-b last:border-b-0">
                  {row.cells?.map((cell, cellIndex) => (
                    <td
                      key={`${row._key || rowIndex}-${cellIndex}`}
                      className="border-r px-4 py-3 last:border-r-0"
                    >
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
          className="font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-muted-foreground hover:decoration-foreground"
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
  const categoryLabel =
    article.categories?.map((category) => category.title).join(", ") || "Article";

  return (
    <PageShell>
      <ReadingProgress />
      <article>
        <DetailHeader
          backHref="/blog"
          backLabel="All posts"
          title={article.title}
          description={article.smallDesc}
        />

        {coverImageUrl ? (
          <DetailMedia>
            <div className="relative aspect-[16/10] sm:aspect-[16/9]">
              <Image
                src={coverImageUrl}
                alt={article.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1240px) 100vw, 920px"
              />
            </div>
          </DetailMedia>
        ) : null}

        <DetailFacts
          facts={[
            { label: "Category", value: categoryLabel },
            { label: "Published", value: formatDate(article.date), icon: CalendarDays },
            { label: "Author", value: getAuthorName(article.author), icon: UserRound },
          ]}
        />

        <DetailBody
          sidebar={
            <div className="space-y-8">
              <div className="border-y py-5 sm:border-t sm:border-b-0 sm:pb-0">
                <p className="font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
                  Contents
                </p>
                <div className="mt-5 flex flex-col gap-3">
                  {headings.length ? (
                    headings.map((heading) => {
                      const text = getHeadingText(heading);

                      return (
                        <a
                          key={heading._key}
                          href={`#${slugify(text)}`}
                          className="group inline-flex items-start gap-2 text-[13px] font-medium leading-5 text-muted-foreground transition-colors hover:text-foreground"
                        >
                          <Link2
                            className="mt-0.5 h-3.5 w-3.5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            strokeWidth={1.8}
                          />
                          <span>{text}</span>
                        </a>
                      );
                    })
                  ) : (
                    <p className="text-[13px] leading-6 text-muted-foreground">
                      No section headings yet.
                    </p>
                  )}
                </div>
              </div>

              <div className="border-t pt-5">
                <Link
                  href="/blog"
                  className="group inline-flex items-center gap-2 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Back to all posts
                  <ArrowUpRight
                    className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={1.8}
                  />
                </Link>
              </div>
            </div>
          }
        >
          <div className="prose prose-neutral max-w-[70ch] dark:prose-invert prose-headings:font-incognito prose-a:text-foreground prose-pre:bg-transparent prose-p:text-[15px] prose-p:font-medium prose-p:leading-8 prose-p:text-muted-foreground prose-li:text-[15px] prose-li:font-medium prose-li:leading-8 prose-li:text-muted-foreground prose-li:marker:text-muted-foreground prose-strong:text-foreground prose-hr:border-border">
            <PortableText
              value={article.body}
              components={portableTextComponents}
              onMissingComponent={false}
            />
          </div>
        </DetailBody>
      </article>
    </PageShell>
  );
}
