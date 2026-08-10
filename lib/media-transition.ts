export function getMediaTransitionName(type: "blog" | "project", slug: string) {
  const safeSlug = slug.replace(/[^a-zA-Z0-9_-]/g, "-");
  return `${type}-image-${safeSlug}`;
}
