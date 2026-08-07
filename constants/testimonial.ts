import type { Testimonial } from "@/types/testimonial";

export const fallbackTestimonials: Testimonial[] = [
  {
    _id: "avery-cole-placeholder",
    name: "Avery Cole",
    role: "Product Engineer",
    company: "Northstar Labs",
    recommendationDate: "2025-06-12",
    featured: true,
    order: 1,
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel sem at sapien faucibus posuere.",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel sem at sapien faucibus posuere. Sed vitae purus vitae neque luctus interdum.\n\nPraesent commodo, lacus id consequat aliquet, justo lorem feugiat erat, vitae tincidunt urna lectus sed augue. Donec posuere feugiat massa, sed facilisis velit tincidunt non.",
  },
  {
    _id: "jordan-lee-placeholder",
    name: "Jordan Lee",
    role: "Design Engineer",
    company: "Fieldwork Studio",
    recommendationDate: "2024-08-17",
    featured: true,
    order: 2,
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur feugiat justo vitae sem consequat, at commodo erat pretium.",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur feugiat justo vitae sem consequat, at commodo erat pretium. Nulla facilisi. Suspendisse potenti.\n\nMorbi dictum, nibh sed aliquet tincidunt, mauris tortor ultrices nibh, sed feugiat lectus arcu non nisl.",
  },
];
