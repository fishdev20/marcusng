// schemas/experience.ts

import { BriefcaseBusiness } from "lucide-react";
import { defineField } from "sanity";

const employmentTypes = [
  { title: "Full-time", value: "fulltime" },
  { title: "Part-time", value: "parttime" },
  { title: "Internship", value: "internship" },
  { title: "Freelance", value: "freelance" },
];

const workTypes = [
  { title: "Remote", value: "remote" },
  { title: "On-site", value: "onsite" },
  { title: "Hybrid", value: "hybrid" },
];

const experience = {
  name: "experience",
  title: "Work Experience",
  type: "document",
  icon: BriefcaseBusiness,
  fields: [
    defineField({
      name: "companyName",
      title: "Company Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "companyLogo",
      title: "Company Logo",
      type: "image",
      options: { hotspot: true },
      description: "Used as the large company marker in the experience timeline.",
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
        },
      ],
    }),
    defineField({
      name: "companyWebsite",
      title: "Company Website",
      type: "url",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: "Shown beside the company name, for example Helsinki, Finland.",
    }),
    defineField({
      name: "workType",
      title: "Work Type",
      type: "string",
      options: {
        list: workTypes,
        layout: "radio",
      },
      description: "Shown after the location as Remote, On-site, or Hybrid.",
    }),
    defineField({
      name: "isCurrentEmployer",
      title: "Current Employer",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "positions",
      title: "Positions",
      type: "array",
      validation: (rule) => rule.required().min(1),
      of: [
        {
          type: "object",
          title: "Position",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "employmentType",
              title: "Employment Type",
              type: "string",
              options: {
                list: employmentTypes,
                layout: "radio",
              },
              initialValue: "fulltime",
            }),
            defineField({
              name: "startDate",
              title: "Start Date",
              type: "date",
              options: { dateFormat: "MM.yyyy" },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "endDate",
              title: "End Date",
              type: "date",
              options: { dateFormat: "MM.yyyy" },
              description: "Leave empty for current positions.",
            }),
            defineField({
              name: "isCurrent",
              title: "Current Position",
              type: "boolean",
              initialValue: false,
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
              description: "Optional intro text shown before the bullet list.",
            }),
            defineField({
              name: "highlights",
              title: "Highlights",
              type: "array",
              of: [{ type: "string" }],
              description: "Bullet points shown inside the expanded position.",
            }),
            defineField({
              name: "technologies",
              title: "Skills",
              type: "array",
              of: [{ type: "tech" }],
              description: "Choose technologies and their icons from Iconify.",
            }),
            defineField({
              name: "isExpanded",
              title: "Expanded by Default",
              type: "boolean",
              initialValue: true,
            }),
          ],
          preview: {
            select: {
              title: "title",
              employmentType: "employmentType",
              startDate: "startDate",
              endDate: "endDate",
              isCurrent: "isCurrent",
            },
            prepare(selection: {
              title?: string;
              employmentType?: string;
              startDate?: string;
              endDate?: string;
              isCurrent?: boolean;
            }) {
              const range = [
                selection.startDate,
                selection.isCurrent ? "Present" : selection.endDate,
              ]
                .filter(Boolean)
                .join(" - ");

              return {
                title: selection.title || "Position",
                subtitle: [selection.employmentType, range].filter(Boolean).join(" | "),
              };
            },
          },
        },
      ],
    }),

    defineField({
      name: "company",
      title: "Legacy Company Name",
      type: "string",
      hidden: true,
    }),
    defineField({
      name: "logo",
      title: "Legacy Company Logo",
      type: "image",
      hidden: true,
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
        },
      ],
    }),
    defineField({
      name: "role",
      title: "Legacy Job Title / Role",
      type: "string",
      hidden: true,
    }),
    defineField({
      name: "employmentType",
      title: "Legacy Employment Type",
      type: "string",
      options: {
        list: employmentTypes,
        layout: "radio",
      },
      hidden: true,
    }),
    defineField({
      name: "startDate",
      title: "Legacy Start Date",
      type: "date",
      hidden: true,
    }),
    defineField({
      name: "endDate",
      title: "Legacy End Date",
      type: "date",
      hidden: true,
    }),
    defineField({
      name: "isCurrent",
      title: "Legacy Current Role",
      type: "boolean",
      hidden: true,
    }),
    defineField({
      name: "description",
      title: "Legacy Description",
      type: "text",
      hidden: true,
    }),
    defineField({
      name: "highlights",
      title: "Legacy Highlights",
      type: "array",
      of: [{ type: "string" }],
      hidden: true,
    }),
    defineField({
      name: "technologies",
      title: "Legacy Skills",
      type: "array",
      of: [{ type: "tech" }],
      hidden: true,
    }),
  ],
  preview: {
    select: {
      title: "companyName",
      legacyTitle: "company",
      positions: "positions",
      media: "companyLogo",
      legacyMedia: "logo",
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prepare(selection: any) {
      const firstPosition = selection.positions?.[0]?.title;

      return {
        title: selection.title || selection.legacyTitle || "Company",
        subtitle: firstPosition || `${selection.positions?.length || 0} positions`,
        media: selection.media || selection.legacyMedia,
      };
    },
  },
};

export default experience;
