import { table } from "@sanity/table";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schemas";
export default defineConfig({
  name: "marcusng-site",
  title: "Marcusng site",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [deskTool(), table()],
  schema: { types: schema.types },
});
