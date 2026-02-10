"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-24 bg-white">
      <div className="container">
        <motion.div
          className="relative rounded-3xl bg-gradient-to-br from-primary to-blue-700 p-12 sm:p-16 text-center overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {/* Background decoration */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:24px_24px]" />

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-jakarta">
              Ready to Grow Your Business?
            </h2>
            <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
              Let&apos;s discuss your project and find the perfect solution.
              Free consultation, no strings attached.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                variant="secondary"
                asChild
                className="text-base px-8 h-12"
              >
                <Link href="/contact">
                  Get Free Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="text-base px-8 h-12 bg-transparent text-white border-white/30 hover:bg-white/10 hover:text-white"
              >
                <Link href="/work">See Our Results</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
