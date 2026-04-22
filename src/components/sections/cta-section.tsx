"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

export function CTASection() {
  return (
    <section className="py-24">
      <div className="container">
        <ScrollReveal>
          <div className="relative rounded-3xl bg-foreground p-12 sm:p-16 text-center overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                Ready to close the gap between
                <br className="hidden sm:block" />
                what you do and how the world sees you?
              </h2>
              <p className="mt-6 text-lg text-white/60 max-w-2xl mx-auto">
                We start with a free audit. No pitch decks, no commitments.
                Just a clear-eyed look at where you are and where you could be.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  asChild
                  className="text-sm font-bold uppercase tracking-wider px-8 h-14 rounded-2xl bg-primary text-foreground hover:bg-primary/90"
                >
                  <Link href="/contact">
                    Get Your Free Audit
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="text-sm font-bold uppercase tracking-wider px-8 h-14 rounded-2xl bg-transparent text-white border-white/20 hover:bg-white/10 hover:text-white"
                >
                  <Link href="/work">See Our Work</Link>
                </Button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
