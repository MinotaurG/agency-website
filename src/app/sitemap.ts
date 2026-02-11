import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getAllServiceSlugs } from "@/config/services";
import { getAllCaseStudySlugs } from "@/config/case-studies";
import { client } from "@/sanity/lib/client";
import { POST_SLUGS_QUERY } from "@/sanity/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  // Static pages
  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${baseUrl}/work`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
  ];

  // Service pages
  const servicePages = getAllServiceSlugs().map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Case study pages
  const caseStudyPages = getAllCaseStudySlugs().map((slug) => ({
    url: `${baseUrl}/work/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Blog posts from Sanity
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const postSlugs = await client.fetch(POST_SLUGS_QUERY);
    blogPages = postSlugs.map((slug: string) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error("Failed to fetch blog slugs for sitemap:", error);
  }

  return [...staticPages, ...servicePages, ...caseStudyPages, ...blogPages];
}
