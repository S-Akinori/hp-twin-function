import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";

const builder = createImageUrlBuilder({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || "4rsr93ao",
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || "production",
});

export function urlForImage(source: SanityImageSource) {
  return builder.image(source).auto("format");
}
