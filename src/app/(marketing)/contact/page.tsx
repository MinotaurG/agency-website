import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with our team. Free consultation for your web development, SEO, social media, or business consulting needs.",
};

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: siteConfig.contact.phone,
    href: `tel:${siteConfig.contact.phone}`,
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Remote — Worldwide",
    href: null,
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "Within 24 hours",
    href: null,
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="container">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              Contact Us
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold font-jakarta tracking-tight">
              Let&apos;s Build Something{" "}
              <span className="text-primary">Great Together</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Have a project in mind? Need help growing your business? We&apos;d
              love to hear from you. Fill out the form below and we&apos;ll get
              back to you within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Form — takes 2 columns */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl border p-6 sm:p-8">
                <h2 className="text-xl font-semibold font-jakarta mb-6">
                  Send Us a Message
                </h2>
                <ContactForm />
              </div>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-8">
              {/* Contact details */}
              <div className="bg-card rounded-2xl border p-6">
                <h3 className="text-lg font-semibold font-jakarta mb-4">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  {contactInfo.map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-sm font-medium hover:text-primary transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm font-medium">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* What to expect */}
              <div className="bg-card rounded-2xl border p-6">
                <h3 className="text-lg font-semibold font-jakarta mb-4">
                  What to Expect
                </h3>
                <ol className="space-y-3">
                  {[
                    "We'll review your message within 24 hours",
                    "A team member will reach out to schedule a call",
                    "We'll discuss your goals and create a proposal",
                    "Once approved, we kick off your project",
                  ].map((step, index) => (
                    <li key={step} className="flex items-start gap-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs font-bold shrink-0">
                        {index + 1}
                      </span>
                      <p className="text-sm text-muted-foreground">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Social links */}
              <div className="bg-card rounded-2xl border p-6">
                <h3 className="text-lg font-semibold font-jakarta mb-4">
                  Follow Us
                </h3>
                <div className="flex flex-wrap gap-3">
                  {Object.entries(siteConfig.links).map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 rounded-lg bg-muted text-sm font-medium hover:bg-primary hover:text-white transition-colors capitalize"
                    >
                      {platform}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
