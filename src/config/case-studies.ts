export interface CaseStudyResult {
  metric: string;
  before: string;
  after: string;
}

export interface CaseStudy {
  title: string;
  slug: string;
  client: string;
  industry: string;
  services: string[];
  excerpt: string;
  challenge: string;
  solution: string;
  results: CaseStudyResult[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
  } | null;
  featured: boolean;
}

export const caseStudies: CaseStudy[] = [
  {
    title: "B2B SaaS Product Grows 3x to #1 in a 40-Product Suite",
    slug: "finder-io-growth",
    client: "finder.io (500apps)",
    industry: "SaaS / B2B Technology",
    services: ["seo", "web-development"],
    excerpt:
      "A data-driven SEO and content strategy — built on a custom ML model — that tripled signups and made finder.io the top-performing product in a 40-product SaaS suite.",
    challenge:
      "finder.io was a B2B email finder tool buried in a 40-product SaaS suite, averaging just 300 signups per month. There was no structured SEO strategy, no content pipeline, and no differentiated positioning. The product was competing for visibility against its own sibling products with no clear path to organic growth.",
    solution:
      "We built a custom ML model using Python and NLP to scrape the site and analyze Google Search Console data, identifying high-potential keywords that competitors were missing. This powered a targeted content strategy focused on high-intent B2B queries. We also built a Neural Prophet time-series forecasting model to project growth trajectories and optimize resource allocation — turning gut-feel marketing into data-backed decisions.",
    results: [
      { metric: "Monthly Signups", before: "300/mo", after: "900/mo" },
      { metric: "Suite Ranking", before: "Mid-tier", after: "#1 of 40 products" },
      { metric: "Growth", before: "Flat", after: "3x in 4 months" },
      { metric: "Forecasted Trajectory", before: "No model", after: "1,800/mo projected" },
    ],
    testimonial: null,
    featured: true,
  },
  {
    title: "Demi-Fine Jewelry Brand Goes D2C with a Custom React Storefront",
    slug: "mulyam-jewels",
    client: "Mulyam Jewels",
    industry: "E-commerce / Jewelry",
    services: ["web-development"],
    excerpt:
      "A fast, modern e-commerce storefront built from scratch for a demi-fine jewelry brand entering the direct-to-consumer market.",
    challenge:
      "Mulyam Jewels had no online presence and was relying entirely on offline sales. They needed a storefront that could showcase their jewelry with the visual quality the product deserved, while being fast enough to convert mobile-first Indian shoppers.",
    solution:
      "We designed and built a custom React single-page application with Vite for blazing-fast load times. The storefront was built with a mobile-first approach, clean product photography layouts, and a streamlined checkout flow — giving Mulyam Jewels a professional D2C presence from day one.",
    results: [
      { metric: "Online Presence", before: "None", after: "Live D2C storefront" },
      { metric: "Tech Stack", before: "No website", after: "React SPA / Vite" },
      { metric: "Mobile Performance", before: "N/A", after: "Sub-2s load times" },
      { metric: "Sales Channel", before: "Offline only", after: "Online + Offline" },
    ],
    testimonial: null,
    featured: true,
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

export function getAllCaseStudySlugs(): string[] {
  return caseStudies.map((cs) => cs.slug);
}

export function getFeaturedCaseStudies(): CaseStudy[] {
  return caseStudies.filter((cs) => cs.featured);
}
