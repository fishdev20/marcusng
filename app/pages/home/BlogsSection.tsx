import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Button } from "@/components/ui/button";
import SectionWrapper from "@/components/ui/section-wrapper";
import { client } from "@/lib/sanity";
import { formatDate } from "@/lib/utils";
import { urlForImage } from "@/sanity/image";
import { IBlogCard } from "@/types/blog";
import Link from "next/link";

export const revalidate = 30;

async function getData() {
  const query = `
    *[_type == 'post'] | order(_createdAt desc)[0...5]{
      "slug": slug.current,
      "date": _createdAt,
      author->{
        name,
      },
      categories[]->{
        title,
      },
      mainImage,
      title,
      smallDesc
    }
  `;

  const data = await client.fetch(query);
  return data;
}

export default async function BlogsSection() {
  const data: IBlogCard[] = await getData();
  return (
    <SectionWrapper title="Blogs" className="z-50">
      <BentoGrid className="md:auto-rows-[20rem]">
        {data.map((item: IBlogCard, idx: number) => (
          <BentoGridItem
            key={idx}
            date={formatDate(item.date)}
            description={item.smallDesc}
            header={item.title}
            imageUrl={urlForImage(item.mainImage)}
            className={
              idx === 0 || idx === 6 ? "md:col-span-2 !bg-yellow-100/40 !dark:bg-yellow-500/10" : ""
            }
            href={`https://marcusng-blog.vercel.app/blog/${item.slug}`}
          />
        ))}
      </BentoGrid>
      <Button className="z-50 md:w-[32%] w-full self-center" variant={"outline"}>
        <Link href={"/blog"} prefetch={false} className="w-full">
          {"Read more"}
        </Link>
      </Button>
    </SectionWrapper>
  );
}
