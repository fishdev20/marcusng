import { Box, Flex, Text } from "@sanity/ui";
import { Icon } from "@iconify/react";
import { defineField, defineType } from "sanity";
import { IconifyPicker } from "../components/iconify-picker";

function TechnologyPreview({ icon, name }: { icon?: string; name?: string }) {
  return (
    <Flex align="center" gap={3}>
      <Box style={{ width: 24 }}>
        {icon && /^[a-z0-9-]+:[a-z0-9-]+$/i.test(icon) ? (
          <Icon icon={icon} width={20} height={20} aria-hidden />
        ) : icon ? (
          <img src={icon} alt="" width={20} height={20} style={{ objectFit: "contain" }} />
        ) : null}
      </Box>
      <Text size={1}>{name || "Untitled technology"}</Text>
    </Flex>
  );
}

const technology = defineType({
  name: "tech",
  title: "Technology",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      description: "Search Iconify and select an icon. No SVG upload is required.",
      components: {
        input: IconifyPicker,
      },
    }),
  ],
  preview: {
    select: {
      name: "name",
      icon: "icon",
    },
    prepare({ name, icon }) {
      return {
        title: name || "Untitled technology",
        subtitle: icon || "No icon selected",
        media: <TechnologyPreview name={name} icon={icon} />,
      };
    },
  },
});

export default technology;
