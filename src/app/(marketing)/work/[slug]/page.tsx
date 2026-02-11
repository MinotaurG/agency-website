import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowLeft, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/shared/section-header";
import {
  caseStudies,
  getCaseStudyBySlug,
  getAllCaseStudySlugs,
} from "@/config/case-studies";

const serviceLabels: Record<string, string> = {
  "web-development": "Web Development",
  seo: "SEO",
  "social-media": "Social Media",
  "business-development": "Business Development",
  finance: "Finance Consultancy",
};

export function generateStaticParams() {
  return getAllCaseStudySlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const study = getCaseStudyBySlug(slug);
    if (!study) return { title: "Case Study Not Found" };

    return {
      title: `${study.title} — Case Study`,
      description: study.excerpt,
    };
  });
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  // Get other case studies for cross-linking
  const otherStudies = caseStudies
    .filter((cs) => cs.slug !== slug)
    .slice(0, 3);

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="container">
          <div className="max-w-3xl">
            <Link
              href="/work"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              All Case Studies
            </Link>

            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary">{study.industry}</Badge>
              {study.services.map((service) => (
                <Badge key={service} variant="outline">
                  {serviceLabels[service] || service}
                </Badge>
              ))}
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold font-jakarta tracking-tight">
              {study.title}
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Client:{" "}
              <span className="font-medium text-foreground">
                {study.client}
              </span>
            </p>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl">
              {study.excerpt}
            </p>
          </div>
        </div>
      </section>

      {/* ===== RESULTS BANNER ===== */}
      <section className="py-12 bg-primary">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {study.results.map((result) => (
              <div key={result.metric} className="text-center">
                <div className="text-sm text-primary-foreground/70 mb-1">
                  {result.metric}
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-white font-jakarta">
                  {result.after}
                </div>
                <div className="text-sm text-primary-foreground/60 mt-1">
                  from {result.before}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CHALLENGE ===== */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="mb-16">
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
                The Challenge
              </p>
              <h2 className="text-3xl font-bold font-jakarta mb-4">
                What They Were Facing
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {study.challenge}
              </p>
            </div>

            <div className="mb-16">
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
                Our Solution
              </p>
              <h2 className="text-3xl font-bold font-jakarta mb-4">
                How We Solved It
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {study.solution}
              </p>
            </div>

            {/* Services used */}
            <div>
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
                Services Used
              </p>
              <div className="flex flex-wrap gap-3">
                {study.services.map((service) => (
                  <Link
                    key={service}
                    href={`/services/${service}`}
                    className="inline-flex items-center px-4 py-2 rounded-lg bg-slate-50 border text-sm font-medium hover:bg-primary hover:text-white hover:border-primary transition-colors"
                  >
                    {serviceLabels[service] || service}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== RESULTS DETAIL ===== */}
      <section className="py-24 bg-slate-50">
        <div className="container">
          <SectionHeader
            label="The Results"
            title="Impact by the Numbers"
            description="Here's exactly what changed after working with us."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {study.results.map((result) => (
              <div
                key={result.metric}
                className="bg-white rounded-2xl border p-6 text-center"
              >
                <p className="text-sm text-muted-foreground mb-2">
                  {result.metric}
                </p>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground line-through">
                    {result.before}
                  </p>
                  <p className="text-3xl font-bold font-jakarta text-primary">
                    {result.after}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIAL ===== */}
      {study.testimonial && (
        <section className="py-24 bg-white">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <Quote className="h-12 w-12 text-primary/20 mx-auto mb-6" />
              <blockquote className="text-2xl sm:text-3xl font-medium font-jakarta leading-snug text-foreground">
                &ldquo;{study.testimonial.quote}&rdquo;
              </blockquote>
              <div className="mt-8">
                <p className="font-semibold">{study.testimonial.author}</p>
                <p className="text-sm text-muted-foreground">
                  {study.testimonial.role}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== OTHER CASE STUDIES ===== */}
      <section className="py-24 bg-slate-50">
        <div className="container">
          <SectionHeader
            label="More Work"
            title="Other Case Studies"
            description="See more results we've delivered."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherStudies.map((other) => (
              <Link
                key={other.slug}
                href={`/work/${other.slug}`}
                className="group bg-white rounded-2xl border p-6 hover:shadow-md transition-all"
              >
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs">
                    {other.industry}
                  </Badge>
                </div>
                <h3 className="font-semibold font-jakarta group-hover:text-primary transition-colors line-clamp-2">
                  {other.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {other.client}
                </p>
                <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                  {other.excerpt}
                </p>
                <div className="mt-4 flex items-center text-sm font-medium text-primary">
                  Read More
                  <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="relative rounded-3xl bg-gradient-to-br from-primary to-blue-700 p-12 sm:p-16 text-center overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white font-jakarta">
                Want Similar Results?
              </h2>
              <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
                Let&apos;s discuss how we can deliver the same kind of impact
                for your business.
              </p>
              <Button
                size="lg"
                variant="secondary"
                asChild
                className="mt-8 text-base px-8 h-12"
              >
                <Link href="/contact">
                  Get Free Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
