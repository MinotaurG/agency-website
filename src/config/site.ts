export const siteConfig = {
  name: "YourAgency",
  description:
    "We build websites, grow your SEO, manage social media, and consult on business & finance.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ogImage: "/images/og-image.jpg",
  creator: "YourAgency Team",
  keywords: [
    "web development agency",
    "SEO services",
    "social media management",
    "business consulting",
    "finance consultancy",
  ],
  links: {
    twitter: "https://twitter.com/youragency",
    linkedin: "https://linkedin.com/company/youragency",
    github: "https://github.com/youragency",
    instagram: "https://instagram.com/youragency",
  },
  contact: {
    email: "hello@youragency.com",
    phone: "+1 (555) 000-0000",
  },
};
