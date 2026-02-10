export const mainNav = [
  {
    title: "Services",
    href: "/services",
    children: [
      {
        title: "Web Development",
        href: "/services/web-development",
        icon: "code",
        description: "Custom websites & web applications",
      },
      {
        title: "SEO",
        href: "/services/seo",
        icon: "search",
        description: "Dominate search engine rankings",
      },
      {
        title: "Social Media",
        href: "/services/social-media",
        icon: "share-2",
        description: "Grow your social presence",
      },
      {
        title: "Business Development",
        href: "/services/business-development",
        icon: "trending-up",
        description: "Strategic growth consulting",
      },
      {
        title: "Finance Consultancy",
        href: "/services/finance-consultancy",
        icon: "calculator",
        description: "Financial planning & advisory",
      },
    ],
  },
  { title: "Work", href: "/work" },
  { title: "About", href: "/about" },
  { title: "Blog", href: "/blog" },
  { title: "Contact", href: "/contact" },
] as const;

export const footerNav = {
  services: [
    { title: "Web Development", href: "/services/web-development" },
    { title: "SEO", href: "/services/seo" },
    { title: "Social Media", href: "/services/social-media" },
    { title: "Business Development", href: "/services/business-development" },
    { title: "Finance Consultancy", href: "/services/finance-consultancy" },
  ],
  company: [
    { title: "About", href: "/about" },
    { title: "Work", href: "/work" },
    { title: "Blog", href: "/blog" },
    { title: "Contact", href: "/contact" },
    { title: "Careers", href: "/careers" },
  ],
  legal: [
    { title: "Privacy Policy", href: "/privacy" },
    { title: "Terms of Service", href: "/terms" },
  ],
};
