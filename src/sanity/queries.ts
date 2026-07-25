import { defineQuery } from "groq";

export const BLOG_POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)]
  | order(coalesce(publishedAt, _createdAt) desc) {
    _id,
    title,
    "slug": slug.current,
    "excerpt": coalesce(excerpt, pt::text(body)[0...150]),
    "publishedAt": coalesce(publishedAt, _createdAt),
    "readingTime": round(length(pt::text(body)) / 500.0),
    mainImage,
    "category": category->{ title, "slug": slug.current }
  }
`);

export const BLOG_POST_SLUGS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)] {
    "params": { "slug": slug.current }
  }
`);

export const BLOG_POST_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    "excerpt": coalesce(excerpt, pt::text(body)[0...150]),
    "publishedAt": coalesce(publishedAt, _createdAt),
    "updatedAt": _updatedAt,
    "readingTime": round(length(pt::text(body)) / 500.0),
    mainImage,
    body,
    "category": category->{ title, "slug": slug.current },
    "seo": {
      "title": coalesce(seo.title, title),
      "description": coalesce(seo.description, excerpt, pt::text(body)[0...150]),
      "image": coalesce(seo.image, mainImage),
      "noIndex": seo.noIndex == true
    }
  }
`);

export const SITEMAP_POSTS_QUERY = defineQuery(`
  *[
    _type == "post" &&
    defined(slug.current) &&
    seo.noIndex != true
  ] {
    "slug": slug.current,
    "updatedAt": _updatedAt
  }
`);
