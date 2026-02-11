import { siteConfig } from "@/config/site";

interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Organization schema — used on homepage
export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: siteConfig.name,
        description: siteConfig.description,
        url: siteConfig.url,
        logo: `${siteConfig.url}/images/logo.png`,
        contactPoint: {
          "@type": "ContactPoint",
          email: siteConfig.contact.email,
          telephone: siteConfig.contact.phone,
          contactType: "customer service",
        },
        sameAs: Object.values(siteConfig.links),
        serviceType: [
          "Web Development",
          "Search Engine Optimization",
          "Social Media Marketing",
          "Business Consulting",
          "Financial Consulting",
        ],
        areaServed: "Worldwide",
        priceRange: "$$",
      }}
    />
  );
}

// Blog post schema
export function BlogPostJsonLd({
  title,
  description,
  url,
  datePublished,
  authorName,
  imageUrl,
}: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  authorName: string;
  imageUrl?: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: title,
        description,
        url,
        datePublished,
        author: {
          "@type": "Person",
          name: authorName,
        },
        publisher: {
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.url,
        },
        ...(imageUrl && {
          image: {
            "@type": "ImageObject",
            url: imageUrl,
          },
        }),
      }}
    />
  );
}

// Service schema
export function ServiceJsonLd({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        url,
        provider: {
          "@type": "ProfessionalService",
          name: siteConfig.name,
          url: siteConfig.url,
        },
      }}
    />
  );
}

// FAQ schema
export function FAQJsonLd({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }}
    />
  );
}
