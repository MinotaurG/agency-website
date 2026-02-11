import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { caseStudies } from "@/config/case-studies";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "See the results we've delivered for our clients. Real case studies with real numbers.",
};

const serviceLabels: Record<string, string> = {
  "web-development": "Web Dev",
  seo: "SEO",
  "social-media": "Social Media",
  "business-development": "Biz Dev",
  finance: "Finance",
};

export default function WorkPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="container">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              Our Work
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold font-jakarta tracking-tight">
              Results That{" "}
              <span className="text-primary">Speak for Themselves</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl">
              We don&apos;t just talk about results — we prove them. Explore
              our case studies to see the real impact we&apos;ve delivered for
              businesses like yours.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="space-y-8">
            {caseStudies.map((study, index) => (
              <Link
                key={study.slug}
                href={`/work/${study.slug}`}
                className="group block"
              >
                <div className="rounded-2xl border bg-card overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="p-8 sm:p-10">
                    {/* Top row: badges */}
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <Badge variant="secondary">{study.industry}</Badge>
                      {study.services.map((service) => (
                        <Badge key={service} variant="outline">
                          {serviceLabels[service] || service}
                        </Badge>
                      ))}
                      {study.featured && (
                        <Badge className="bg-primary/10 text-primary border-0">
                          Featured
                        </Badge>
                      )}
                    </div>

                    {/* Title & excerpt */}
                    <h2 className="text-2xl sm:text-3xl font-bold font-jakarta group-hover:text-primary transition-colors">
                      {study.title}
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Client: <span className="font-medium text-foreground">{study.client}</span>
                    </p>
                    <p className="mt-3 text-muted-foreground leading-relaxed max-w-3xl">
                      {study.excerpt}
                    </p>

                    {/* Results preview */}
                    <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {study.results.map((result) => (
                        <div
                          key={result.metric}
                          className="bg-slate-50 rounded-xl p-4"
                        >
                          <p className="text-xs text-muted-foreground mb-1">
                            {result.metric}
                          </p>
                          <div className="flex items-baseline gap-2">
                            <span className="text-lg font-bold font-jakarta text-primary">
                              {result.after}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            from {result.before}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Read more */}
                    <div className="mt-6 flex items-center text-sm font-medium text-primary">
                      Read Full Case Study
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-50">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold font-jakarta">
              Want Results Like These?
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Every project starts with a conversation. Tell us about your
              goals and we&apos;ll show you what&apos;s possible.
            </p>
            <Button size="lg" asChild className="mt-8 text-base px-8 h-12">
              <Link href="/contact">
                Start Your Project
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
