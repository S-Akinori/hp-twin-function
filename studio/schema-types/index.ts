import type { SchemaTypeDefinition } from "sanity";
import { blockContent } from "./objects/block-content";
import { seo } from "./objects/seo";
import { category } from "./documents/category";
import { post } from "./documents/post";

export const schemaTypes: SchemaTypeDefinition[] = [
  blockContent,
  seo,
  category,
  post,
];
