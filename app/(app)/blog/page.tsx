import { getBlogs } from "@/lib/blog";
import { urlForBlogImage } from "@/sanity/blog-image";
import type { IBlogCard } from "@/types/blog";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { EmptyState, PageHero, PageShell, RailSection } from "../_components/site-frame";
export const revalidate = 30;
export const metadata = {
  title: "Blog | Marcus Nguyen",
  description: "Writing by Marcus Nguyen on engineering, interfaces, and product work.",
};
function formatPostDate(date?: string | null) {
  if (!date) return null;
  return new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(
    new Date(date),
  );
}
export default async function BlogPage() {
  const posts: IBlogCard[] = await getBlogs().catch(() => []);
  return (
    <PageShell>
      <PageHero
        label="Blog"
        title="Notes on engineering and interface craft."
        description="Writing from production work: performance, frontend systems, product details, and the small decisions that make software easier to use."
      />
      <RailSection label="Writing" className="pb-14">
        {posts.length ? (
          <div className="border-y ">
            {posts.map((post) => (
              <BlogRow key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <EmptyState>No blog posts are available from Sanity yet.</EmptyState>
        )}
      </RailSection>
    </PageShell>
  );
}
function BlogRow({ post }: { post: IBlogCard }) {
  const date = formatPostDate(post.date);
  const category = post.categories?.[0]?.title;
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid gap-4 border-b py-5 last:border-b-0 sm:grid-cols-[96px_minmax(0,1fr)_116px_16px] sm:items-center"
    >
      <div className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground sm:grid sm:gap-2">
        {date ? <span>{date}</span> : null} {category ? <span>{category}</span> : null}
      </div>
      <div className="min-w-0">
        <h2 className="font-incognito text-[22px] font-semibold leading-[1.05] tracking-[-0.02em] text-foreground transition-colors group-hover:text-foreground">
          {post.title}
        </h2>
        {post.smallDesc ? (
          <p className="mt-2 line-clamp-2 max-w-[62ch] text-[13px] leading-6 text-muted-foreground">
            {post.smallDesc}
          </p>
        ) : null}
      </div>
      <div className="relative aspect-[1.35/1] overflow-hidden rounded-sm border bg-muted">
        {post.mainImage ? (
          <Image
            src={urlForBlogImage(post.mainImage)}
            alt={post.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.04]"
            sizes="116px"
          />
        ) : (
          <div className="grid h-full place-items-center px-3 text-center font-incognito text-[15px] font-semibold leading-none text-foreground">
            {post.title}
          </div>
        )}
      </div>
      <ArrowUpRight
        className="hidden h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground sm:block"
        strokeWidth={1.8}
      />
    </Link>
  );
}
