import type { APIRoute } from "astro";
import { sanityClient } from "sanity:client";
import { SITEMAP_POSTS_QUERY } from "../sanity/queries";

interface SitemapPost {
  slug: string;
  updatedAt: string;
}

const staticPaths = [
  "/",
  "/features/",
  "/story/",
  "/manual/",
  "/spec/",
  "/faq/",
  "/blog/",
];

const escapeXml = (value: string) =>
  value.replace(
    /[<>&'"]/g,
    (character) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        "'": "&apos;",
        '"': "&quot;",
      })[character] ?? character,
  );

const toUrlEntry = (location: URL, lastModified?: string) => {
  const lastmod = lastModified
    ? `<lastmod>${escapeXml(lastModified)}</lastmod>`
    : "";

  return `<url><loc>${escapeXml(location.href)}</loc>${lastmod}</url>`;
};

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = site ?? new URL("http://localhost:4321");
  const posts = await sanityClient.fetch<SitemapPost[]>(SITEMAP_POSTS_QUERY);

  const entries = [
    ...staticPaths.map((path) => toUrlEntry(new URL(path, baseUrl))),
    ...posts.map((post) =>
      toUrlEntry(
        new URL(`/blog/${encodeURIComponent(post.slug)}/`, baseUrl),
        post.updatedAt,
      ),
    ),
  ];

  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries,
    "</urlset>",
  ].join("\n");

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
