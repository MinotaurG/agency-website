import {
  Code,
  Search,
  Share2,
  TrendingUp,
  Calculator,
  type LucideIcon,
} from "lucide-react";

export interface ServiceFeature {
  title: string;
  description: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Service {
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  icon: LucideIcon;
  color: string;
  features: string[];
  detailedFeatures: ServiceFeature[];
  process: ProcessStep[];
  faqs: FAQ[];
  stats: { value: string; label: string }[];
}

export const services: Service[] = [
  {
    title: "Web Development",
    slug: "web-development",
    description:
      "Custom websites and web applications built with modern technologies that convert visitors into customers.",
    longDescription:
      "We design and develop stunning, high-performance websites and web applications that are built to convert. Using modern technologies like React, Next.js, and TypeScript, we create digital experiences that look beautiful, load fast, and drive real business results.",
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
    detailedFeatures: [
      {
        title: "Custom Website Design",
        description:
          "Unique, brand-aligned designs crafted from scratch. No templates, no compromises — every pixel serves a purpose.",
      },
      {
        title: "E-commerce Development",
        description:
          "Full-featured online stores with seamless checkout, inventory management, and payment processing.",
      },
      {
        title: "Web Application Development",
        description:
          "Complex web apps with user authentication, dashboards, real-time features, and API integrations.",
      },
      {
        title: "Landing Page Optimization",
        description:
          "High-converting landing pages designed with A/B testing, clear CTAs, and persuasive copy.",
      },
      {
        title: "Performance Optimization",
        description:
          "Lightning-fast load times through code splitting, image optimization, caching, and Core Web Vitals tuning.",
      },
      {
        title: "Maintenance & Support",
        description:
          "Ongoing updates, security patches, performance monitoring, and feature enhancements to keep your site running smoothly.",
      },
    ],
    process: [
      { step: 1, title: "Discovery & Brief", description: "We learn about your business, goals, target audience, and competitors to create a detailed project brief." },
      { step: 2, title: "Wireframes & Design", description: "We create wireframes for layout and user flow, then design high-fidelity mockups for your approval." },
      { step: 3, title: "Development", description: "Our developers build your site with clean, modern code — responsive, accessible, and SEO-friendly." },
      { step: 4, title: "Testing & QA", description: "Rigorous testing across devices and browsers to ensure everything works flawlessly before launch." },
      { step: 5, title: "Launch & Support", description: "We handle deployment, DNS, SSL, and provide ongoing support to keep your site performing at its best." },
    ],
    faqs: [
      { question: "How long does it take to build a website?", answer: "A typical website takes 4-8 weeks from kickoff to launch. Complex web applications may take 8-16 weeks depending on features and scope." },
      { question: "What technologies do you use?", answer: "We primarily use React, Next.js, TypeScript, and Tailwind CSS for the frontend. For backends, we use Node.js, PostgreSQL, and various headless CMS platforms." },
      { question: "Do you provide hosting?", answer: "Yes, we can set up and manage hosting on platforms like Vercel, AWS, or your preferred provider. We recommend the best option based on your needs." },
      { question: "Will my website be mobile-friendly?", answer: "Absolutely. Every website we build is fully responsive and optimized for all devices — mobile, tablet, and desktop." },
    ],
    stats: [
      { value: "100+", label: "Websites Built" },
      { value: "99.9%", label: "Uptime" },
      { value: "<2s", label: "Avg Load Time" },
      { value: "4.9★", label: "Client Rating" },
    ],
  },
  {
    title: "SEO",
    slug: "seo",
    description:
      "Data-driven SEO strategies that improve your rankings, drive organic traffic, and deliver measurable ROI.",
    longDescription:
      "Our SEO strategies are built on data, not guesswork. We combine technical expertise, content optimization, and authority building to help you rank higher, attract qualified traffic, and convert more visitors into customers.",
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
    detailedFeatures: [
      { title: "Technical SEO Audit", description: "Comprehensive analysis of your site's technical health — crawlability, indexing, site speed, schema markup, and more." },
      { title: "Keyword Research & Strategy", description: "In-depth keyword research to identify high-value opportunities that align with your business goals and buyer intent." },
      { title: "On-Page Optimization", description: "Optimizing titles, meta descriptions, headers, content, internal linking, and images for maximum search visibility." },
      { title: "Link Building", description: "White-hat link building through quality content, digital PR, guest posting, and strategic outreach campaigns." },
      { title: "Local SEO", description: "Dominate local search results with Google Business Profile optimization, local citations, and review management." },
      { title: "SEO Reporting & Analytics", description: "Monthly reports with clear metrics — rankings, traffic, conversions, and actionable recommendations." },
    ],
    process: [
      { step: 1, title: "SEO Audit", description: "We analyze your current SEO performance, identify issues, and benchmark against competitors." },
      { step: 2, title: "Keyword Strategy", description: "We research and map target keywords to your pages based on search volume, difficulty, and intent." },
      { step: 3, title: "On-Page Optimization", description: "We optimize your existing pages and create new content targeting high-value keywords." },
      { step: 4, title: "Off-Page & Links", description: "We build high-quality backlinks through outreach, content marketing, and digital PR." },
      { step: 5, title: "Monitor & Scale", description: "We track rankings, analyze data, and continuously refine the strategy for compounding growth." },
    ],
    faqs: [
      { question: "How long does SEO take to show results?", answer: "SEO is a long-term strategy. You'll typically start seeing improvements in 3-6 months, with significant results in 6-12 months." },
      { question: "Do you guarantee #1 rankings?", answer: "No legitimate SEO agency can guarantee specific rankings. We focus on sustainable growth through proven strategies and transparent reporting." },
      { question: "What's included in the monthly reports?", answer: "Our reports cover keyword rankings, organic traffic, backlink profile, technical health scores, conversion data, and next-month action items." },
      { question: "Do you work with our existing content?", answer: "Yes. We audit and optimize your existing content while also creating new content to fill keyword gaps and build topical authority." },
    ],
    stats: [
      { value: "300%", label: "Avg Traffic Growth" },
      { value: "50+", label: "SEO Campaigns" },
      { value: "10K+", label: "Keywords Ranked" },
      { value: "85%", label: "Page 1 Rankings" },
    ],
  },
  {
    title: "Social Media",
    slug: "social-media",
    description:
      "Strategic social media management that builds brand awareness, engages your audience, and drives growth.",
    longDescription:
      "We create and execute social media strategies that go beyond vanity metrics. Our approach focuses on building genuine community engagement, creating share-worthy content, and driving measurable business outcomes across all major platforms.",
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
    detailedFeatures: [
      { title: "Social Media Strategy", description: "Custom strategies aligned with your brand voice, target audience, and business goals across the right platforms." },
      { title: "Content Creation", description: "Eye-catching graphics, engaging videos, compelling copy, and content calendars that keep your feed fresh." },
      { title: "Community Management", description: "Active engagement with your audience — responding to comments, DMs, and building meaningful conversations." },
      { title: "Paid Social Campaigns", description: "Targeted ad campaigns on Facebook, Instagram, LinkedIn, and more to reach your ideal customers." },
      { title: "Influencer Marketing", description: "Identifying and partnering with relevant influencers to amplify your brand reach and credibility." },
      { title: "Analytics & Reporting", description: "Detailed performance reports with insights on engagement, reach, follower growth, and ROI." },
    ],
    process: [
      { step: 1, title: "Brand Audit", description: "We analyze your current social presence, audience demographics, and competitor landscape." },
      { step: 2, title: "Strategy & Calendar", description: "We create a content strategy and monthly calendar aligned with your goals and brand voice." },
      { step: 3, title: "Content Production", description: "Our creative team produces high-quality posts, stories, reels, and videos for your channels." },
      { step: 4, title: "Publish & Engage", description: "We handle posting, community management, and real-time engagement with your audience." },
      { step: 5, title: "Analyze & Optimize", description: "Monthly reporting and strategy refinement based on performance data and emerging trends." },
    ],
    faqs: [
      { question: "Which platforms do you manage?", answer: "We manage Instagram, Facebook, LinkedIn, Twitter/X, TikTok, and YouTube. We'll recommend the best platforms for your business." },
      { question: "How many posts per week?", answer: "Typically 3-5 posts per week per platform, plus stories and engagement activities. The exact cadence depends on your plan and goals." },
      { question: "Do you create all the content?", answer: "Yes, our team handles copywriting, graphic design, and video production. We also welcome any brand assets or content you'd like to share." },
      { question: "Can you run paid ad campaigns?", answer: "Absolutely. We create, manage, and optimize paid campaigns across all major social platforms with detailed ROI reporting." },
    ],
    stats: [
      { value: "2M+", label: "Total Reach" },
      { value: "500K+", label: "Engagements" },
      { value: "40+", label: "Brands Managed" },
      { value: "5x", label: "Avg Engagement Lift" },
    ],
  },
  {
    title: "Business Development",
    slug: "business-development",
    description:
      "Strategic consulting to identify growth opportunities, optimize operations, and scale your business.",
    longDescription:
      "We help businesses identify untapped opportunities, build scalable systems, and execute growth strategies that deliver real results. From market research to partnership development, we're your strategic growth partner.",
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
    detailedFeatures: [
      { title: "Market Research & Analysis", description: "Deep market analysis to understand your industry, competitors, customer segments, and growth opportunities." },
      { title: "Growth Strategy", description: "Actionable growth plans with clear milestones, KPIs, and resource allocation for sustainable scaling." },
      { title: "Sales Process Optimization", description: "Streamlining your sales funnel — from lead generation to closing — to improve conversion rates and revenue." },
      { title: "Partnership Development", description: "Identifying and building strategic partnerships that expand your reach and create new revenue streams." },
      { title: "Business Model Innovation", description: "Exploring new revenue models, pricing strategies, and value propositions to stay ahead of the competition." },
      { title: "Go-to-Market Strategy", description: "Comprehensive launch plans for new products, services, or market entries with clear positioning and messaging." },
    ],
    process: [
      { step: 1, title: "Assessment", description: "We evaluate your current business model, market position, strengths, and areas for improvement." },
      { step: 2, title: "Research", description: "Deep dive into market trends, competitor analysis, and customer insights to inform strategy." },
      { step: 3, title: "Strategy Development", description: "We create a comprehensive growth roadmap with prioritized initiatives and clear success metrics." },
      { step: 4, title: "Implementation", description: "We work alongside your team to execute the strategy, providing hands-on guidance and support." },
      { step: 5, title: "Review & Iterate", description: "Regular check-ins to measure progress, adjust tactics, and ensure you're on track to hit your goals." },
    ],
    faqs: [
      { question: "What size businesses do you work with?", answer: "We work with startups, SMBs, and mid-market companies. Our strategies are tailored to your stage, budget, and goals." },
      { question: "How is this different from regular consulting?", answer: "We don't just deliver a strategy deck and walk away. We stay involved through implementation, providing hands-on support and accountability." },
      { question: "What's the typical engagement length?", answer: "Most engagements run 3-6 months for strategy development and initial implementation. Many clients continue with ongoing advisory retainers." },
      { question: "Do you help with fundraising?", answer: "Yes, we can help with pitch decks, financial modeling, investor introductions, and fundraising strategy." },
    ],
    stats: [
      { value: "$50M+", label: "Revenue Generated" },
      { value: "35+", label: "Businesses Scaled" },
      { value: "3x", label: "Avg Revenue Growth" },
      { value: "90%", label: "Client Satisfaction" },
    ],
  },
  {
    title: "Finance Consultancy",
    slug: "finance-consultancy",
    description:
      "Expert financial guidance to help you make informed decisions, manage cash flow, and maximize profitability.",
    longDescription:
      "Our finance consultancy services help businesses take control of their financial health. From cash flow management to fundraising support, we provide the clarity and confidence you need to make smart financial decisions.",
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
    detailedFeatures: [
      { title: "Financial Planning", description: "Comprehensive financial plans that align with your business goals — budgets, forecasts, and long-term projections." },
      { title: "Cash Flow Management", description: "Strategies to optimize cash flow, reduce burn rate, and ensure you always have runway for growth." },
      { title: "Investment Advisory", description: "Guidance on where to invest your capital for maximum returns — from marketing spend to infrastructure." },
      { title: "Tax Strategy", description: "Proactive tax planning to minimize liability, maximize deductions, and ensure full compliance." },
      { title: "Financial Modeling", description: "Detailed financial models for business planning, fundraising, scenario analysis, and board presentations." },
      { title: "Fundraising Support", description: "End-to-end support for raising capital — financial projections, pitch decks, due diligence preparation, and investor relations." },
    ],
    process: [
      { step: 1, title: "Financial Assessment", description: "We review your current financial position — revenue, expenses, cash flow, debt, and key metrics." },
      { step: 2, title: "Goal Setting", description: "We define clear financial goals and benchmarks aligned with your business objectives." },
      { step: 3, title: "Strategy & Modeling", description: "We build financial models and create actionable strategies to hit your targets." },
      { step: 4, title: "Implementation", description: "We help implement financial systems, processes, and controls for better money management." },
      { step: 5, title: "Ongoing Advisory", description: "Regular financial reviews, reporting, and advisory to keep you on track and adapt to changes." },
    ],
    faqs: [
      { question: "Do you replace our accountant?", answer: "No, we complement your accountant. We focus on strategic financial planning and advisory, while your accountant handles bookkeeping, tax filing, and compliance." },
      { question: "What industries do you serve?", answer: "We work across industries including SaaS, e-commerce, professional services, manufacturing, and startups. Our principles apply broadly." },
      { question: "Can you help us prepare for fundraising?", answer: "Absolutely. We create investor-ready financial models, projections, and help you tell a compelling financial story to potential investors." },
      { question: "How do you charge for finance consultancy?", answer: "We offer both project-based pricing for specific deliverables and monthly retainers for ongoing advisory. We'll recommend the best fit during our consultation." },
    ],
    stats: [
      { value: "$100M+", label: "Funds Raised" },
      { value: "40%", label: "Avg Cost Savings" },
      { value: "60+", label: "Clients Advised" },
      { value: "15+", label: "Years Experience" },
    ],
  },
];

// Helper to find a service by slug
export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

// Get all service slugs (for static generation)
export function getAllServiceSlugs(): string[] {
  return services.map((s) => s.slug);
}
