import { Icon } from "@iconify/react";
import { Flex } from "@sanity/ui";
import { CodeXml } from "lucide-react";
import { defineField, defineType } from "sanity";

function SkillCategoryPreview({ icon }: { icon?: string }) {
  if (!icon) return <CodeXml />;

  return (
    <Flex align="center" justify="center">
      {icon && /^[a-z0-9-]+:[a-z0-9-]+$/i.test(icon) ? (
        <Icon icon={icon} width={24} height={24} aria-hidden />
      ) : (
        <img src={icon} alt="" width={24} height={24} style={{ objectFit: "contain" }} />
      )}
    </Flex>
  );
}

const skill = defineType({
  name: "skill",
  title: "Skills",
  type: "document",
  icon: CodeXml,
  fields: [
    defineField({
      name: "name",
      title: "Category",
      type: "string",
      description: "For example Language, Frontend, Backend & Database, or Design.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "items",
      title: "Skills",
      type: "array",
      description: "Add the technologies that belong to this category.",
      of: [{ type: "tech" }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers place this category closer to the top.",
      initialValue: 0,
      validation: (rule) => rule.integer().min(0),
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "displayOrder",
      by: [
        { field: "order", direction: "asc" },
        { field: "name", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: {
      title: "name",
      items: "items",
      order: "order",
    },
    prepare({ title, items, order }) {
      const count = Array.isArray(items) ? items.length : 0;
      const icon = items?.[0]?.icon;

      return {
        title: title || "Untitled category",
        subtitle: `${count} ${count === 1 ? "skill" : "skills"} · order ${order ?? 0}`,
        media: <SkillCategoryPreview icon={icon} />,
      };
    },
  },
});

export default skill;
