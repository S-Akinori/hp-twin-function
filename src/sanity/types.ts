import type { PortableTextBlock } from "@portabletext/types";

export type SanityImage = {
  asset?: {
    _ref?: string;
    _type?: "reference";
  };
  alt?: string;
  caption?: string;
  crop?: unknown;
  hotspot?: unknown;
};

export type BlogCta = {
  _key: string;
  _type: "cta";
  label: string;
  url: string;
  variant?: "primary" | "secondary";
  newWindow?: boolean;
};

export type BlogPostSummary = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  readingTime: number;
  mainImage?: SanityImage;
  category?: {
    title: string;
    slug: string;
  };
};

export type BlogPost = BlogPostSummary & {
  body: Array<
    | PortableTextBlock
    | (SanityImage & { _key: string; _type: "image" })
    | BlogCta
  >;
  updatedAt: string;
  seo: {
    title: string;
    description: string;
    image?: SanityImage;
    noIndex: boolean;
  };
};
