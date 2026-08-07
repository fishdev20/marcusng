import { MessageSquareQuote } from "lucide-react";
import { defineField, defineType } from "sanity";

const testimonial = defineType({
  name: "testimonial",
  title: "Testimonials",
  type: "document",
  icon: MessageSquareQuote,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
    }),
    defineField({
      name: "company",
      title: "Company",
      type: "string",
    }),
    defineField({
      name: "avatar",
      title: "Avatar",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "quote",
      title: "Full Recommendation",
      type: "text",
      rows: 10,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Homepage Excerpt",
      type: "text",
      rows: 4,
      description:
        "A concise excerpt for the homepage card. The full recommendation is used when empty.",
      validation: (rule) => rule.max(320),
    }),
    defineField({
      name: "recommendationDate",
      title: "Recommendation Date",
      type: "date",
    }),
    defineField({
      name: "linkedinUrl",
      title: "LinkedIn URL",
      type: "url",
    }),
    defineField({
      name: "featured",
      title: "Show on Homepage",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 0,
      validation: (rule) => rule.integer().min(0),
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "displayOrder",
      by: [
        { field: "order", direction: "asc" },
        { field: "recommendationDate", direction: "desc" },
      ],
    },
  ],
  preview: {
    select: {
      title: "name",
      role: "role",
      company: "company",
      media: "avatar",
    },
    prepare({ title, role, company, media }) {
      return {
        title: title || "Testimonial",
        subtitle: [role, company].filter(Boolean).join(" at "),
        media,
      };
    },
  },
});

export default testimonial;
