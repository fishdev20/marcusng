import { type SchemaTypeDefinition } from "sanity";

import experience from "./_experience";
import pet from "./_pet";
import profile from "./_profile";
import project from "./_project";
import testimonial from "./_testimonial";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [profile, experience, project, testimonial, pet],
};
