// schemas/experience.ts

import { BriefcaseBusiness } from "lucide-react";
import { defineField } from "sanity";

const experience = {
  name: "experience",
  title: "Work Experience",
  type: "document",
  icon: BriefcaseBusiness,
  fields: [
    defineField({
      name: "company",
      title: "Company Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Company Logo",
      type: "image",
      options: { hotspot: true },
      description: "Upload the company logo image",
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
      title: "Job Title / Role",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "employmentType",
      title: "Employment Type",
      type: "string",
      options: {
        list: [
          { title: "Full-time", value: "fulltime" },
          { title: "Part-time", value: "parttime" },
          { title: "Internship", value: "internship" },
          { title: "Freelance", value: "freelance" },
        ],
        layout: "radio",
      },
      initialValue: "fulltime",
    }),
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "date",
      options: { dateFormat: "MMM, yyyy" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "endDate",
      title: "End Date",
      type: "date",
      options: { dateFormat: "MMM, yyyy" },
      description: "Leave empty if currently working here",
    }),
    defineField({
      name: "isCurrent",
      title: "Currently Working Here",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: "Where did you work? (e.g., Helsinki, Finland or Remote)",
    }),
    defineField({
      name: "description",
      title: "Company Overview / Summary",
      type: "text",
      rows: 3,
      description: "A short overview of your work environment or company",
    }),
    defineField({
      name: "highlights",
      title: "Key Achievements / Responsibilities",
      type: "array",
      of: [{ type: "string" }],
      description: "List of bullet points shown in the experience section",
    }),
    {
      name: "technologies",
      title: "Technologies",
      type: "array",
      description: "Add a list of technologies",
      of: [{ type: "string" }],
    },
  ],
  preview: {
    select: {
      title: "company",
      subtitle: "role",
      media: "logo",
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prepare(selection: any) {
      const { title, subtitle, media } = selection;
      return {
        title,
        subtitle,
        media,
      };
    },
  },
};

export default experience;
