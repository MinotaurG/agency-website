export const siteConfig = {
  // ✏️ Change these two fields to rebrand the entire site
  name: "Elevate Strategy",
  nameHighlight: "Elevate", // the accented/colored part of the name
  nameSuffix: "Strategy", // the rest of the name

  legalName: "Elevate Strategy Management", // for invoices, contracts, legal docs
  description:
    "We help ambitious sports and lifestyle brands bridge the gap between their ground-level impact and their digital presence.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ogImage: "/images/og-image.jpg",
  creator: "Elevate Strategy",
  keywords: [
    "brand strategy agency",
    "sports brand consulting",
    "digital marketing India",
    "website redesign",
    "SEO services",
    "social media management",
    "brand growth partner",
  ],
  links: {
    twitter: "https://twitter.com/elevatestrategy",
    linkedin: "https://linkedin.com/company/elevatestrategy",
    instagram: "https://instagram.com/elevatestrategy",
  },
  contact: {
    email: "hello@elevatestrategy.co.in",
    phone: "+91 XXXXX XXXXX",
  },
};
