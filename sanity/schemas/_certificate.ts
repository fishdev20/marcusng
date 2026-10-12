import { BadgeCheck } from "lucide-react";
import { defineField, defineType } from "sanity";

const certificate = defineType({
  name: "certificate",
  title: "Certificates",
  type: "document",
  icon: BadgeCheck,
  fields: [
    defineField({
      name: "title",
      title: "Certificate Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "issuer",
      title: "Issuing Organization",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "issuerLogo",
      title: "Issuer Logo",
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
      name: "issueDate",
      title: "Issue Date",
      type: "date",
      options: { dateFormat: "MMM yyyy" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "expirationDate",
      title: "Expiration Date",
      type: "date",
      options: { dateFormat: "MMM yyyy" },
      description: "Leave empty when the certificate does not expire.",
      validation: (rule) =>
        rule.custom((expirationDate, context) => {
          const issueDate = context.document?.issueDate;

          if (!expirationDate || typeof issueDate !== "string") return true;
          return expirationDate >= issueDate || "Expiration must be after the issue date.";
        }),
    }),
    defineField({
      name: "credentialId",
      title: "Credential ID",
      type: "string",
    }),
    defineField({
      name: "credentialUrl",
      title: "Credential URL",
      type: "url",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "Optional context about the skills or assessment covered.",
      validation: (rule) => rule.max(240),
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
      description: "Lower numbers appear first.",
      validation: (rule) => rule.integer().min(0),
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "displayOrder",
      by: [
        { field: "order", direction: "asc" },
        { field: "issueDate", direction: "desc" },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      issuer: "issuer",
      issueDate: "issueDate",
      media: "issuerLogo",
    },
    prepare({ title, issuer, issueDate, media }) {
      const year = typeof issueDate === "string" ? issueDate.slice(0, 4) : null;

      return {
        title: title || "Certificate",
        subtitle: [issuer, year].filter(Boolean).join(" | "),
        media,
      };
    },
  },
});

export default certificate;
