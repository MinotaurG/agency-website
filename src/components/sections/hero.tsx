"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px]" />

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium bg-white shadow-sm">
              🚀 Now accepting new clients for 2025
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="mt-8 text-5xl sm:text-6xl lg:text-7xl font-bold font-jakarta tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            We Build Digital
            <span className="text-primary block mt-2">
              Experiences That Grow
            </span>
            Your Business
          </motion.h1>

          {/* Subtext */}
          <motion.p
            className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            From stunning websites to SEO dominance, social media growth to
            strategic business consulting — we&apos;re your all-in-one growth
            partner.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button size="lg" asChild className="text-base px-8 h-12">
              <Link href="/contact">
                Start a Project
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="text-base px-8 h-12"
            >
              <Link href="/work">View Our Work</Link>
            </Button>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            className="mt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <p className="text-sm text-muted-foreground mb-6">
              Trusted by forward-thinking companies
            </p>
            <div className="flex items-center justify-center gap-8 flex-wrap opacity-40 grayscale">
              {["Acme Corp", "TechFlow", "Pinnacle", "Vertex", "NovaBrand"].map(
                (client) => (
                  <div
                    key={client}
                    className="h-8 px-6 bg-muted rounded-md flex items-center justify-center text-xs font-medium"
                  >
                    {client}
                  </div>
                )
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
