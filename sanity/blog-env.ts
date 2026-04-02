export const blogApiVersion = process.env.NEXT_PUBLIC_BLOG_SANITY_API_VERSION || "2024-04-23";

export const blogDataset = assertValue(
  process.env.NEXT_PUBLIC_BLOG_SANITY_DATASET,
  "Missing environment variable: NEXT_PUBLIC_BLOG_SANITY_DATASET",
);

export const blogProjectId = assertValue(
  process.env.NEXT_PUBLIC_BLOG_SANITY_PROJECT_ID,
  "Missing environment variable: NEXT_PUBLIC_BLOG_SANITY_PROJECT_ID",
);

function assertValue<T>(value: T | undefined, errorMessage: string): T {
  if (value === undefined) {
    throw new Error(errorMessage);
  }

  return value;
}
