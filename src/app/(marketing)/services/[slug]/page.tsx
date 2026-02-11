import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/shared/section-header";
import { services, getServiceBySlug, getAllServiceSlugs } from "@/config/services";
import { cn } from "@/lib/utils";

// Generate static pages for all services at build time
export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

// Dynamic metadata per service
export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const service = getServiceBySlug(slug);
    if (!service) return { title: "Service Not Found" };

    return {
      title: `${service.title} Services`,
      description: service.description,
    };
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  // Get other services for cross-linking
  const otherServices = services.filter((s) => s.slug !== slug);

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="container">
          <div className="max-w-3xl">
            <Link
              href="/services"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              ← All Services
            </Link>

            <div
              className={cn(
                "inline-flex items-center justify-center w-16 h-16 rounded-2xl mt-6 mb-4",
                service.color
              )}
            >
              <service.icon className="h-8 w-8" />
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold font-jakarta tracking-tight">
              {service.title}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl">
              {service.longDescription}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="text-base px-8 h-12">
                <Link href="/contact">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="text-base px-8 h-12"
              >
                <Link href="/work">See Results</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="py-12 bg-primary">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {service.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-white font-jakarta">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-primary-foreground/80">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DETAILED FEATURES ===== */}
      <section className="py-24 bg-white">
        <div className="container">
          <SectionHeader
            label="What's Included"
            title="Everything You Get"
            description={`Our ${service.title.toLowerCase()} service covers everything you need for success.`}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.detailedFeatures.map((feature, index) => (
              <div
                key={feature.title}
                className="p-6 rounded-2xl border bg-card hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="mt-1">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold font-jakarta">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed ml-8">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section className="py-24 bg-slate-50">
        <div className="container">
          <SectionHeader
            label="How It Works"
            title={`Our ${service.title} Process`}
            description="A clear, proven process that delivers results every time."
          />

          <div className="max-w-3xl mx-auto">
            {service.process.map((step, index) => (
              <div key={step.title} className="relative flex gap-6 pb-12 last:pb-0">
                {/* Vertical line */}
                {index < service.process.length - 1 && (
                  <div className="absolute left-[19px] top-10 bottom-0 w-px bg-border" />
                )}

                {/* Step number circle */}
                <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold text-sm shrink-0">
                  {step.step}
                </div>

                {/* Content */}
                <div className="pt-1">
                  <h3 className="text-lg font-semibold font-jakarta mb-1">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-24 bg-white">
        <div className="container">
          <SectionHeader
            label="FAQ"
            title="Frequently Asked Questions"
            description={`Common questions about our ${service.title.toLowerCase()} services.`}
          />

          <div className="max-w-3xl mx-auto space-y-6">
            {service.faqs.map((faq) => (
              <div
                key={faq.question}
                className="p-6 rounded-2xl border bg-card"
              >
                <h3 className="text-base font-semibold font-jakarta mb-2">
                  {faq.question}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== OTHER SERVICES ===== */}
      <section className="py-24 bg-slate-50">
        <div className="container">
          <SectionHeader
            label="Explore More"
            title="Other Services"
            description="Combine services for maximum impact on your business."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherServices.map((other) => (
              <Link
                key={other.slug}
                href={`/services/${other.slug}`}
                className="group p-6 rounded-2xl border bg-card hover:shadow-md transition-all"
              >
                <div
                  className={cn(
                    "inline-flex items-center justify-center w-10 h-10 rounded-lg mb-3",
                    other.color
                  )}
                >
                  <other.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold font-jakarta group-hover:text-primary transition-colors">
                  {other.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                  {other.description}
                </p>
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
                Ready to Get Started with {service.title}?
              </h2>
              <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
                Book a free consultation and let&apos;s discuss how we can help
                your business grow.
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
