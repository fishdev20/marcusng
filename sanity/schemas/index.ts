import { type SchemaTypeDefinition } from "sanity";

import experience from "./_experience";
import pet from "./_pet";
import profile from "./_profile";
import project from "./_project";
// import blockContent from './schemaTypes/blockContent';
// import category from './schemaTypes/category';
// import post from './schemaTypes/post';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [profile, experience, project, pet],
};
