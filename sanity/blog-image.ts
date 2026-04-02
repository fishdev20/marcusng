import createImageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";
import { blogDataset, blogProjectId } from "./blog-env";

const imageBuilder = createImageUrlBuilder({
  projectId: blogProjectId,
  dataset: blogDataset,
});

export const urlForBlogImage = (source: Image) => {
  return imageBuilder.image(source).auto("format").fit("max").url();
};
