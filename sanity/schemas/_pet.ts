import { Cat } from "lucide-react";
import { defineArrayMember, defineField } from "sanity";

const pet = {
  name: "pet",
  title: "Pets",
  description: "Pet Schema",
  type: "document",
  icon: Cat,
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      description: "Enter the name of the project",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Generate from name or type manually.",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "logo",
      title: "Project Logo",
      type: "image",
    },
    {
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 3,
      description: "A concise summary shown in project listings or previews.",
      validation: (Rule) => Rule.max(250),
    },
    {
      name: "projectUrl",
      title: "Project URL",
      type: "url",
      description: "Leaving this URL blank will add a coming soon to the link.",
    },
    {
      name: "repository",
      title: "Repository URL",
      type: "url",
      description: 'Leaving this URL blank will add a "No Repository" message to the link.',
    },
    {
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      description: "Upload a cover image for this project",
      options: {
        hotspot: true,
        metadata: ["lqip"],
      },
      fields: [
        {
          name: "alt",
          title: "Alt",
          type: "string",
        },
      ],
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Web App", value: "web" },
          { title: "Mobile App", value: "mobile" },
          { title: "Desktop App", value: "desktop" },
          { title: "AI / Data", value: "ai" },
          { title: "Game / Visualization", value: "game" },
        ],
        layout: "dropdown",
      },
      description: "Used to group projects by type or focus area.",
    },
    {
      name: "techStack",
      title: "Tech Stack",
      type: "array",
      of: [
        defineField({
          name: "tech",
          title: "Technology",
          type: "object",
          fields: [
            {
              name: "name",
              title: "Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "icon",
              title: "Icon URL",
              type: "url",
              description: "Optional: add a logo/icon link for display.",
            },
          ],
        }),
      ],
      description: "Technologies, tools, or frameworks used in this project.",
    },
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      description: "Write a full description about this project",
      of: [
        defineArrayMember({
          title: "Block",
          type: "block",
          // Styles let you define what blocks can be marked up as. The default
          // set corresponds with HTML tags, but you can set any title or value
          // you want, and decide how you want to deal with it where you want to
          // use your content.
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H1", value: "h1" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [{ title: "Bullet", value: "bullet" }],
          // Marks let you mark up inline text in the Portable Text Editor
          marks: {
            // Decorators usually describe a single property – e.g. a typographic
            // preference or highlighting
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
            // Annotations can be any object structure – e.g. a link or a footnote.
            annotations: [
              {
                title: "URL",
                name: "link",
                type: "object",
                fields: [
                  {
                    title: "URL",
                    name: "href",
                    type: "url",
                  },
                ],
              },
            ],
          },
        }),
        // You can add additional types here. Note that you can't use
        // primitive types such as 'string' and 'number' in the same array
        // as a block type.
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative Text",
            },
          ],
        }),
        defineArrayMember({
          type: "table",
          title: "Table",
          description: "Insert a data table (requires @sanity/table plugin).",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "coverImage",
    },
  },
};

export default pet;
