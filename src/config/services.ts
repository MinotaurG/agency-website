import {
  Code,
  Search,
  Share2,
  TrendingUp,
  Calculator,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  title: string;
  slug: string;
  description: string;
  icon: LucideIcon;
  color: string;
  features: string[];
}

export const services: Service[] = [
  {
    title: "Web Development",
    slug: "web-development",
    description:
      "Custom websites and web applications built with modern technologies that convert visitors into customers.",
    icon: Code,
    color: "bg-blue-500/10 text-blue-500",
    features: [
      "Custom Website Design",
      "E-commerce Development",
      "Web Application Development",
      "Landing Page Optimization",
      "Performance Optimization",
      "Maintenance & Support",
    ],
  },
  {
    title: "SEO",
    slug: "seo",
    description:
      "Data-driven SEO strategies that improve your rankings, drive organic traffic, and deliver measurable ROI.",
    icon: Search,
    color: "bg-green-500/10 text-green-500",
    features: [
      "Technical SEO Audit",
      "Keyword Research & Strategy",
      "On-Page Optimization",
      "Link Building",
      "Local SEO",
      "SEO Reporting & Analytics",
    ],
  },
  {
    title: "Social Media",
    slug: "social-media",
    description:
      "Strategic social media management that builds brand awareness, engages your audience, and drives growth.",
    icon: Share2,
    color: "bg-purple-500/10 text-purple-500",
    features: [
      "Social Media Strategy",
      "Content Creation",
      "Community Management",
      "Paid Social Campaigns",
      "Influencer Marketing",
      "Analytics & Reporting",
    ],
  },
  {
    title: "Business Development",
    slug: "business-development",
    description:
      "Strategic consulting to identify growth opportunities, optimize operations, and scale your business.",
    icon: TrendingUp,
    color: "bg-orange-500/10 text-orange-500",
    features: [
      "Market Research & Analysis",
      "Growth Strategy",
      "Sales Process Optimization",
      "Partnership Development",
      "Business Model Innovation",
      "Go-to-Market Strategy",
    ],
  },
  {
    title: "Finance Consultancy",
    slug: "finance-consultancy",
    description:
      "Expert financial guidance to help you make informed decisions, manage cash flow, and maximize profitability.",
    icon: Calculator,
    color: "bg-emerald-500/10 text-emerald-500",
    features: [
      "Financial Planning",
      "Cash Flow Management",
      "Investment Advisory",
      "Tax Strategy",
      "Financial Modeling",
      "Fundraising Support",
    ],
  },
];
