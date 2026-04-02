export const PORTFOLIO_STUDIO_PATH = "/studio/portfolio";
export const BLOG_STUDIO_PROXY_PATH = "/studio/blog";
export const DEFAULT_BLOG_STUDIO_URL = "http://localhost:3001/studio";

export function getBlogStudioUrl() {
  return process.env.BLOG_STUDIO_URL || DEFAULT_BLOG_STUDIO_URL;
}
