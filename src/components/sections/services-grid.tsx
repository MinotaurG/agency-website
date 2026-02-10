"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { services } from "@/config/services";
import { cn } from "@/lib/utils";

export function ServicesGrid() {
  return (
    <section className="py-24 bg-white">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            What We Do
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold font-jakarta">
            Services That Drive Results
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Comprehensive digital solutions tailored to your business goals.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/services/${service.slug}`}>
                <div className="group relative p-6 rounded-2xl border bg-card hover:shadow-lg transition-all duration-300 h-full">
                  {/* Icon */}
                  <div
                    className={cn(
                      "inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4",
                      service.color
                    )}
                  >
                    <service.icon className="h-6 w-6" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold font-jakarta mb-2">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {/* Features Preview */}
                  <ul className="space-y-1.5 mb-6">
                    {service.features.slice(0, 3).map((feature) => (
                      <li
                        key={feature}
                        className="text-sm text-muted-foreground flex items-center gap-2"
                      >
                        <div className="h-1 w-1 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Link */}
                  <div className="flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all">
                    Learn More
                    <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
