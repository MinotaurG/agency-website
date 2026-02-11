"use client";

import { Search, Lightbulb, Rocket, BarChart3, RefreshCw } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

const steps = [
  { icon: Search, title: "Discovery", description: "We dive deep into your business, goals, audience, and competition to understand the full picture." },
  { icon: Lightbulb, title: "Strategy", description: "We craft a tailored plan with clear milestones, timelines, and measurable KPIs." },
  { icon: Rocket, title: "Execute", description: "Our team brings the strategy to life with precision, creativity, and technical excellence." },
  { icon: BarChart3, title: "Measure", description: "We track performance, analyze data, and report results with full transparency." },
  { icon: RefreshCw, title: "Optimize", description: "Continuous improvement based on real data to maximize your ROI over time." },
];

export function ProcessSteps() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              How We Work
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold font-jakarta">
              Our Proven Process
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              A systematic approach that delivers consistent results.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {steps.map((step, index) => (
            <ScrollReveal key={step.title} delay={index * 0.1}>
              <div className="relative text-center">
                <div className="text-6xl font-bold text-muted/30 font-jakarta mb-2">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-4">
                  <step.icon className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-semibold font-jakarta mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
