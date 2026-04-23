"use client";

import Link from "next/link";
import { ArrowRight, Brain } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { caseStudies } from "@/config/case-studies";

const aiHighlight = {
  label: "Capability",
  title: "AI-Powered Solutions",
  excerpt:
    "From intelligent chatbots and automated content to predictive analytics — we build AI tools that solve real business problems, not just demo well.",
  href: "/services/ai-solutions",
};

export function FeaturedInsights() {
  const featured = caseStudies.filter((cs) => cs.featured).slice(0, 2);

  return (
    <section className="py-24 bg-muted/50">
      <div className="container">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
                Featured
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold font-heading">
                Our Work & Thinking
              </h2>
            </div>
            <Link
              href="/work"
              className="hidden sm:flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {featured.map((study, index) => (
            <ScrollReveal key={study.slug} delay={index * 0.1}>
              <Link href={`/work/${study.slug}`} className="group block h-full">
                <div className="relative rounded-2xl border bg-background p-8 h-full flex flex-col hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-4">
                    Case Study — {study.industry}
                  </p>
                  <h3 className="text-xl font-bold font-heading mb-3 group-hover:text-primary transition-colors leading-snug">
                    {study.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {study.excerpt}
                  </p>
                  <div className="mt-6 flex items-center gap-4">
                    {study.results.slice(0, 2).map((r) => (
                      <div key={r.metric} className="text-sm">
                        <span className="font-bold text-primary font-heading">{r.after}</span>
                        <span className="text-muted-foreground ml-1">{r.metric}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center text-sm font-medium text-primary">
                    Read More
                    <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}

          <ScrollReveal delay={0.2}>
            <Link href={aiHighlight.href} className="group block h-full">
              <div className="relative rounded-2xl border bg-foreground p-8 h-full flex flex-col hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
                <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-4">
                  {aiHighlight.label}
                </p>
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold font-heading mb-3 text-white group-hover:text-primary transition-colors leading-snug">
                  {aiHighlight.title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed flex-1">
                  {aiHighlight.excerpt}
                </p>
                <div className="mt-6 flex items-center text-sm font-medium text-primary">
                  Explore AI Solutions
                  <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
