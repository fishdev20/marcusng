import { groq } from "next-sanity";
import { blogClient } from "./blog-sanity";

const blogCardFields = `
  "slug": slug.current,
  "date": _createdAt,
  author->{
    name
  },
  categories[]->{
    title
  },
  mainImage,
  title,
  smallDesc
`;

const blogArticleFields = `
  ${blogCardFields},
  body,
  "headings": body[style in ["h2", "h3", "h4"]]
`;

const allBlogsQuery = groq`
  *[_type == "post"] | order(_createdAt desc) {
    ${blogCardFields}
  }
`;

const latestBlogsQuery = groq`
  *[_type == "post"] | order(_createdAt desc)[0...$limit] {
    ${blogCardFields}
  }
`;

const blogBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    ${blogArticleFields}
  }
`;

const blogSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)][]{
    "slug": slug.current
  }
`;

export async function getBlogs() {
  return blogClient.fetch(allBlogsQuery);
}

export async function getLatestBlogs(limit = 5) {
  return blogClient.fetch(latestBlogsQuery, { limit });
}

export async function getBlogBySlug(slug: string) {
  return blogClient.fetch(blogBySlugQuery, { slug });
}

export async function getBlogSlugs() {
  return blogClient.fetch(blogSlugsQuery);
}
