export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
}

export interface ServicePage {
  _id: string;
  title: string;
  slug: { current: string };
  shortDescription: string;
  icon: string;
  heroImage: SanityImage;
  imageUrl?: string;
  overview: any[];
  features: { title: string; description: string }[];
  process: { step: number; title: string; description: string }[];
  seo: { metaTitle: string; metaDescription: string };
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  coverImageUrl: string;
  category: string;
  publishedAt: string;
  author: {
    name: string;
    avatarUrl: string;
  };
  body?: any[];
}

export interface CaseStudy {
  _id: string;
  title: string;
  slug: { current: string };
  client: string;
  industry: string;
  services: string[];
  excerpt: string;
  coverImageUrl: string;
  featured: boolean;
  results: { metric: string; before: string; after: string }[];
}

export interface Testimonial {
  _id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatarUrl: string;
  rating: number;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  company?: string;
  service: string;
  budget_range?: string;
  message: string;
  source: string;
  status: string;
  created_at: string;
}
