// schemas/project.ts

import { FolderGit2 } from "lucide-react";
import { defineField } from "sanity";

const project = {
  name: "project",
  title: "Projects",
  type: "document",
  icon: FolderGit2,
  fields: [
    defineField({
      name: "title",
      title: "Project Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
      description: "Mark this project as featured to highlight it on the homepage.",
    }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "text",
      rows: 3,
      description: "A short summary of what the project does or why it’s special.",
      validation: (rule) => rule.required().max(300),
    }),
    defineField({
      name: "thumbnail",
      title: "Project Image",
      type: "image",
      options: { hotspot: true },
      description: "Upload a screenshot or hero image for this project.",
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
        },
      ],
    }),
    defineField({
      name: "techStack",
      title: "Technologies Used",
      type: "array",
      description: "Add the tools, libraries, and technologies used in this project.",
      of: [
        defineField({
          name: "tech",
          title: "Tech",
          type: "object",
          fields: [
            {
              name: "name",
              title: "Name",
              type: "string",
              validation: (rule) => rule.required(),
            },
            {
              name: "icon",
              title: "Icon (Optional)",
              type: "url",
              description: "Link of icon display in UI.",
            },
          ],
          preview: {
            select: {
              title: "name",
              subtitle: "icon",
              image: "url",
            },
          },
        }),
      ],
    }),
    defineField({
      name: "links",
      title: "Project Links",
      type: "object",
      description: "Links to source code, demo, or related resources.",
      fields: [
        {
          name: "github",
          title: "GitHub Repository",
          type: "url",
        },
        {
          name: "liveDemo",
          title: "Live Demo / Website",
          type: "url",
        },
        {
          name: "video",
          title: "Video or Showcase Link",
          type: "url",
        },
      ],
      options: {
        collapsed: false,
        collapsible: true,
        columns: 2,
      },
    }),
    defineField({
      name: "tags",
      title: "Tags / Keywords",
      type: "array",
      of: [{ type: "string" }],
      description: "Optional tags for filtering or SEO (e.g., 'desktop', 'mapping').",
    }),
    defineField({
      name: "date",
      title: "Date Created or Published",
      type: "date",
      options: { dateFormat: "MMM yyyy" },
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
      media: "thumbnail",
    },
  },
};

export default project;
