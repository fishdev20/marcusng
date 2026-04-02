import { createClient } from "next-sanity";
import { blogApiVersion, blogDataset, blogProjectId } from "@/sanity/blog-env";

export const blogClient = createClient({
  apiVersion: blogApiVersion,
  dataset: blogDataset,
  projectId: blogProjectId,
  useCdn: false,
});
