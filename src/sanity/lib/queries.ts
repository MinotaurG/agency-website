import { defineQuery } from "next-sanity";

// Get all published posts (for blog listing)
export const POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(publishedAt)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    mainImage,
    "author": author-> {
      name,
      image
    },
    "categories": categories[]-> {
      title,
      slug
    }
  }
`);

// Get a single post by slug (for blog detail)
export const POST_BY_SLUG_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    mainImage,
    body,
    seo,
    "author": author-> {
      name,
      slug,
      image,
      bio
    },
    "categories": categories[]-> {
      title,
      slug
    }
  }
`);

// Get all post slugs (for static generation)
export const POST_SLUGS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)].slug.current
`);

// Get recent posts (for homepage or sidebar)
export const RECENT_POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(publishedAt)] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    mainImage,
    "categories": categories[]-> {
      title,
      slug
    }
  }
`);

// Get all categories
export const CATEGORIES_QUERY = defineQuery(`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description
  }
`);
