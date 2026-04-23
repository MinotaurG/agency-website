"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

const rotatingPhrases = [
  { line1: "We make sure the", line2: "world knows." },
  { line1: "We build systems", line2: "that scale." },
  { line1: "We turn strategy", line2: "into growth." },
];

export function Hero() {
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % rotatingPhrases.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[hsl(var(--background))]" />

      <div className="container relative z-10">
        <div className="max-w-5xl">
          <motion.p
            className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Brand Strategy / Digital Growth / AI-Powered Solutions
          </motion.p>

          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.05]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Your brand does
            <br />
            amazing things.
            <span className="text-primary block mt-2 min-h-[2.2em]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={phraseIndex}
                  className="block"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                >
                  {rotatingPhrases[phraseIndex].line1}
                  <br />
                  {rotatingPhrases[phraseIndex].line2}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>

          <motion.p
            className="mt-8 text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {siteConfig.description}
          </motion.p>

          <motion.div
            className="mt-12 flex flex-col sm:flex-row items-start gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button size="lg" asChild className="text-sm font-bold uppercase tracking-wider px-8 h-14 rounded-2xl">
              <Link href="/contact">
                Get a Free Audit
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="text-sm font-bold uppercase tracking-wider px-8 h-14 rounded-2xl border-foreground/20"
            >
              <Link href="/work">See Our Work</Link>
            </Button>
          </motion.div>

          <motion.div
            className="mt-20 flex items-center gap-8 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <span>IIM Visakhapatnam</span>
            <span className="w-px h-4 bg-border" />
            <span>NLU Patiala</span>
            <span className="w-px h-4 bg-border" />
            <span>Amazon</span>
            <span className="w-px h-4 bg-border" />
            <span>Ranchi High Court</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
