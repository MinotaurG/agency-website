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
    title: "E-commerce Revenue Grew 3x in 6 Months",
    slug: "ecommerce-revenue-3x",
    client: "StyleHub",
    industry: "E-commerce / Fashion",
    services: ["web-development", "seo", "social-media"],
    excerpt:
      "A complete digital overhaul that transformed a struggling online store into a revenue-generating machine.",
    challenge:
      "StyleHub had a slow, outdated website with poor mobile experience and virtually no organic traffic. Their conversion rate was below 1% and they were entirely dependent on paid ads for sales.",
    solution:
      "We rebuilt their entire e-commerce platform on a modern stack with blazing-fast performance. Simultaneously, we launched an aggressive SEO campaign targeting high-intent product keywords and built a social media presence that drove engaged traffic back to the store.",
    results: [
      { metric: "Revenue", before: "$45K/mo", after: "$142K/mo" },
      { metric: "Organic Traffic", before: "1,200/mo", after: "18,500/mo" },
      { metric: "Conversion Rate", before: "0.8%", after: "3.2%" },
      { metric: "Page Load Time", before: "6.2s", after: "1.4s" },
    ],
    testimonial: {
      quote:
        "They didn't just build us a website — they built us a business. The results speak for themselves. Best investment we've ever made.",
      author: "Jessica Martinez",
      role: "Founder, StyleHub",
    },
    featured: true,
  },
  {
    title: "SaaS Startup: From 0 to 10K Organic Visitors",
    slug: "saas-seo-growth",
    client: "CloudMetrics",
    industry: "SaaS / Technology",
    services: ["seo", "web-development"],
    excerpt:
      "A targeted SEO strategy that established a new SaaS product as an authority in their niche within 8 months.",
    challenge:
      "CloudMetrics was a new SaaS product with zero domain authority and no organic presence. They were spending $15K/month on Google Ads with diminishing returns and needed a sustainable traffic source.",
    solution:
      "We developed a comprehensive content strategy targeting the entire buyer journey — from awareness to decision. We built a resource hub with in-depth guides, comparison pages, and technical documentation, all optimized for search.",
    results: [
      { metric: "Organic Traffic", before: "0/mo", after: "10,200/mo" },
      { metric: "Domain Authority", before: "0", after: "34" },
      { metric: "Ranking Keywords", before: "0", after: "850+" },
      { metric: "Ad Spend Saved", before: "$15K/mo", after: "$5K/mo" },
    ],
    testimonial: {
      quote:
        "Our organic channel now drives more signups than paid ads at a fraction of the cost. The ROI has been incredible.",
      author: "Ryan Park",
      role: "CEO, CloudMetrics",
    },
    featured: true,
  },
  {
    title: "Local Business Dominates City Search Results",
    slug: "local-business-seo",
    client: "Premier Dental",
    industry: "Healthcare / Dental",
    services: ["seo", "web-development"],
    excerpt:
      "Local SEO strategy that made a dental practice the #1 result in their city for all major keywords.",
    challenge:
      "Premier Dental was invisible in local search results despite being one of the best practices in the city. New patient inquiries were declining and competitors were dominating Google Maps.",
    solution:
      "We redesigned their website with a local SEO focus, optimized their Google Business Profile, built local citations, implemented review generation campaigns, and created location-specific content targeting every service they offer.",
    results: [
      { metric: "Google Maps Ranking", before: "Not ranked", after: "#1 for 12 keywords" },
      { metric: "Monthly Inquiries", before: "15/mo", after: "65/mo" },
      { metric: "Website Traffic", before: "800/mo", after: "4,200/mo" },
      { metric: "Google Reviews", before: "23", after: "180+" },
    ],
    testimonial: {
      quote:
        "We went from barely getting any calls to being fully booked three weeks out. They completely transformed our online presence.",
      author: "Dr. Sarah Mitchell",
      role: "Owner, Premier Dental",
    },
    featured: true,
  },
  {
    title: "Restaurant Chain Social Media Transformation",
    slug: "restaurant-social-media",
    client: "Fuego Kitchen",
    industry: "Food & Beverage",
    services: ["social-media"],
    excerpt:
      "A social media strategy that turned a local restaurant into a regional brand with a cult following.",
    challenge:
      "Fuego Kitchen had 3 locations but minimal social media presence. Their Instagram had 500 followers with almost no engagement, and they weren't leveraging social media for customer acquisition at all.",
    solution:
      "We created a content strategy centered around behind-the-scenes kitchen content, chef stories, and user-generated content campaigns. We launched a micro-influencer program and ran targeted campaigns around new menu launches.",
    results: [
      { metric: "Instagram Followers", before: "500", after: "28,000" },
      { metric: "Monthly Engagement", before: "50", after: "12,000+" },
      { metric: "In-Store Traffic", before: "Baseline", after: "+40%" },
      { metric: "UGC Posts/Month", before: "2", after: "150+" },
    ],
    testimonial: {
      quote:
        "People now come to our restaurants because they saw us on Instagram. Social media went from an afterthought to our biggest marketing channel.",
      author: "Marco Rivera",
      role: "Co-founder, Fuego Kitchen",
    },
    featured: false,
  },
  {
    title: "Startup Raises $2M After Financial Restructuring",
    slug: "startup-fundraising",
    client: "GreenLoop",
    industry: "CleanTech / Startup",
    services: ["finance", "business-development"],
    excerpt:
      "Financial modeling and business strategy that helped a cleantech startup secure Series A funding.",
    challenge:
      "GreenLoop had a great product but messy financials, no clear unit economics, and a pitch that wasn't resonating with investors. They had been rejected by 15 VCs.",
    solution:
      "We restructured their financial model, clarified unit economics, built investor-ready projections, and refined their pitch narrative. We also introduced them to our network of climate-focused investors.",
    results: [
      { metric: "Funding Raised", before: "$0", after: "$2M Series A" },
      { metric: "Investor Meetings", before: "2/month", after: "8/month" },
      { metric: "Burn Rate", before: "$120K/mo", after: "$75K/mo" },
      { metric: "Runway", before: "4 months", after: "18 months" },
    ],
    testimonial: {
      quote:
        "They didn't just fix our financials — they changed how we think about our business. We closed our round in 6 weeks after working with them.",
      author: "Aisha Thompson",
      role: "CEO, GreenLoop",
    },
    featured: false,
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
