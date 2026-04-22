"use client";

import { ScrollReveal } from "@/components/shared/scroll-reveal";

const stats = [
  { value: "4", label: "IIM and NLU Alumni" },
  { value: "3+", label: "Years in Tech" },
  { value: "100%", label: "Founder-Led Projects" },
  { value: "1", label: "Practicing High Court Advocate" },
];

export function StatsCounter() {
  return (
    <section className="py-20 bg-foreground">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <ScrollReveal key={stat.label} delay={index * 0.1}>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-primary font-heading">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-white/60">
                  {stat.label}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
