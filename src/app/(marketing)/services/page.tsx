import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { services } from "@/config/services";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "From web development and SEO to social media management and business consulting — explore our full range of digital services.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="container">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              Our Services
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold font-jakarta tracking-tight">
              Everything You Need to{" "}
              <span className="text-primary">Grow Online</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl">
              We offer end-to-end digital solutions — each tailored to your
              unique business goals. Pick one service or combine them for
              maximum impact.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="space-y-8">
            {services.map((service, index) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group block"
              >
                <div className="relative rounded-2xl border bg-card p-8 sm:p-10 hover:shadow-lg transition-all duration-300 overflow-hidden">
                  {/* Background number */}
                  <div className="absolute top-6 right-8 text-8xl font-bold text-muted/10 font-jakarta select-none">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12">
                    {/* Icon */}
                    <div
                      className={cn(
                        "inline-flex items-center justify-center w-16 h-16 rounded-2xl shrink-0",
                        service.color
                      )}
                    >
                      <service.icon className="h-8 w-8" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold font-jakarta mb-2 group-hover:text-primary transition-colors">
                        {service.title}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed max-w-2xl">
                        {service.description}
                      </p>

                      {/* Features row */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {service.features.map((feature) => (
                          <span
                            key={feature}
                            className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="shrink-0">
                      <div className="w-12 h-12 rounded-full border flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all">
                        <ArrowRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-slate-50">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold font-jakarta">
              Not Sure What You Need?
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Book a free consultation and we&apos;ll help you figure out the
              best strategy for your business.
            </p>
            <Button size="lg" asChild className="mt-8 text-base px-8 h-12">
              <Link href="/contact">
                Get Free Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
