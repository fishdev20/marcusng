import { type SchemaTypeDefinition } from "sanity";

import experience from "./_experience";
import pet from "./_pet";
import profile from "./_profile";
import project from "./_project";
import skill from "./_skill";
import testimonial from "./_testimonial";
import technology from "./_technology";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [technology, skill, profile, experience, project, testimonial, pet],
};
