import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Target, Heart, Zap, Users, Shield, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/shared/section-header";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about our team, mission, and values. We're a full-service digital agency helping businesses grow online.",
};

const values = [
  {
    icon: Target,
    title: "Results-Driven",
    description:
      "Everything we do is measured against real business outcomes. Vanity metrics don't pay the bills — results do.",
  },
  {
    icon: Heart,
    title: "Client-First",
    description:
      "Your success is our success. We treat every project as if it were our own business on the line.",
  },
  {
    icon: Zap,
    title: "Move Fast",
    description:
      "We believe in shipping quickly, learning from data, and iterating. Speed is a competitive advantage.",
  },
  {
    icon: Shield,
    title: "Transparency",
    description:
      "No hidden fees, no jargon, no surprises. You'll always know exactly where your project stands.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description:
      "We work with you, not just for you. Your insights combined with our expertise create the best outcomes.",
  },
  {
    icon: Lightbulb,
    title: "Continuous Learning",
    description:
      "The digital world evolves fast. We stay ahead by constantly learning, testing, and adopting what works.",
  },
];

const team = [
  {
    name: "Alex Johnson",
    role: "Founder & CEO",
    bio: "10+ years building digital products. Passionate about helping businesses grow through technology.",
    image: null,
  },
  {
    name: "Sarah Chen",
    role: "Head of Development",
    bio: "Full-stack engineer who loves clean code and fast websites. React & Next.js enthusiast.",
    image: null,
  },
  {
    name: "Marcus Williams",
    role: "SEO Strategist",
    bio: "Data-driven SEO expert. Helped 50+ businesses rank on page one and grow organic traffic.",
    image: null,
  },
  {
    name: "Priya Patel",
    role: "Creative Director",
    bio: "Award-winning designer who believes great design is invisible — it just works.",
    image: null,
  },
  {
    name: "David Kim",
    role: "Business Consultant",
    bio: "Former startup founder turned consultant. Specializes in growth strategy and market expansion.",
    image: null,
  },
  {
    name: "Emma Rodriguez",
    role: "Finance Advisor",
    bio: "CPA with 15 years of experience helping businesses optimize their financial operations.",
    image: null,
  },
];

const milestones = [
  { year: "2020", title: "Founded", description: "Started with a vision to make expert digital services accessible to growing businesses." },
  { year: "2021", title: "First 10 Clients", description: "Built our reputation through word-of-mouth and exceptional results." },
  { year: "2022", title: "Team of 5", description: "Expanded our team to cover web development, SEO, and social media." },
  { year: "2023", title: "50+ Projects", description: "Hit a major milestone delivering successful projects across multiple industries." },
  { year: "2024", title: "Full-Service Agency", description: "Added business development and finance consultancy to become a complete growth partner." },
  { year: "2025", title: "Scaling Up", description: "Expanding our team and capabilities to serve more clients worldwide." },
];

export default function AboutPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="container">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              About Us
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold font-jakarta tracking-tight">
              We&apos;re a Team That{" "}
              <span className="text-primary">Actually Cares</span> About Your
              Growth
            </h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl">
              We&apos;re not just another agency. We&apos;re a team of
              strategists, developers, designers, and consultants who are
              genuinely invested in helping your business succeed.
            </p>
          </div>
        </div>
      </section>

      {/* ===== OUR STORY ===== */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
                Our Story
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold font-jakarta">
                Born From Frustration, Built on Results
              </h2>
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  We started this agency because we saw too many businesses
                  getting burned by agencies that overpromise and underdeliver.
                  Flashy proposals, mediocre execution, and zero accountability.
                </p>
                <p>
                  We knew there had to be a better way. So we built an agency
                  around a simple principle:{" "}
                  <strong className="text-foreground">
                    deliver real results, or don&apos;t bother.
                  </strong>
                </p>
                <p>
                  Today, we help businesses of all sizes grow their online
                  presence, optimize their operations, and make smarter
                  decisions. Every strategy we create is backed by data, and
                  every project we deliver is built to perform.
                </p>
              </div>
            </div>

            {/* Stats card */}
            <div className="bg-slate-50 rounded-3xl p-8 sm:p-10">
              <div className="grid grid-cols-2 gap-8">
                {[
                  { value: "150+", label: "Projects Delivered" },
                  { value: "50+", label: "Happy Clients" },
                  { value: "98%", label: "Client Retention" },
                  { value: "5+", label: "Years of Experience" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-3xl sm:text-4xl font-bold font-jakarta text-primary">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== VALUES ===== */}
      <section className="py-24 bg-slate-50">
        <div className="container">
          <SectionHeader
            label="Our Values"
            title="What We Stand For"
            description="These aren't just words on a wall. They guide every decision we make."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="p-6 rounded-2xl bg-white border hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold font-jakarta mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TIMELINE ===== */}
      <section className="py-24 bg-white">
        <div className="container">
          <SectionHeader
            label="Our Journey"
            title="How We Got Here"
            description="From a small idea to a full-service agency."
          />

          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <div
                key={milestone.year}
                className="relative flex gap-6 pb-12 last:pb-0"
              >
                {/* Vertical line */}
                {index < milestones.length - 1 && (
                  <div className="absolute left-[23px] top-12 bottom-0 w-px bg-border" />
                )}

                {/* Year badge */}
                <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold text-xs shrink-0">
                  {milestone.year}
                </div>

                {/* Content */}
                <div className="pt-2">
                  <h3 className="text-lg font-semibold font-jakarta">
                    {milestone.title}
                  </h3>
                  <p className="mt-1 text-muted-foreground">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TEAM ===== */}
      <section className="py-24 bg-slate-50">
        <div className="container">
          <SectionHeader
            label="Our Team"
            title="Meet the People Behind the Work"
            description="A diverse team of experts united by a shared passion for results."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-2xl border p-6 text-center hover:shadow-md transition-shadow"
              >
                {/* Avatar placeholder */}
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary font-jakarta">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>

                <h3 className="text-lg font-semibold font-jakarta">
                  {member.name}
                </h3>
                <p className="text-sm text-primary font-medium mt-0.5">
                  {member.role}
                </p>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="relative rounded-3xl bg-gradient-to-br from-primary to-blue-700 p-12 sm:p-16 text-center overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white font-jakarta">
                Want to Work With Us?
              </h2>
              <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
                We&apos;re always looking for exciting projects and great people
                to work with. Let&apos;s talk.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  variant="secondary"
                  asChild
                  className="text-base px-8 h-12"
                >
                  <Link href="/contact">
                    Start a Conversation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
