import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Code, Scale, PenLine, Eye, Target, Lightbulb, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/shared/section-header";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Two childhood friends from Hazaribagh, Jharkhand — one from Amazon, one from the Ranchi High Court — building an agency that brings big-company thinking to growing businesses.",
};

const team = [
  {
    name: "Aditya Shubham",
    role: "Co-Founder & Tech Lead",
    credentials: "MBA, IIM (Indian Institute of Management)  |  Ex-Amazon",
    icon: Code,
    bio: "Started with an economics degree and a spot at CBSE Nationals for football, then the IIM route, then Amazon. Spent over two years managing vendor portfolios for brands like TP-Link and LG across Amazon's European markets. Built automation tools that saved 700+ hours a year and earned a Trailblazer Award. Before any of that, he digitized his family's healthcare clinic back in Hazaribagh — computers, software, lab reports, the whole thing. Plays chess badly and watches too many movies.",
  },
  {
    name: "Adam Khan",
    role: "Co-Founder & Strategy Lead",
    credentials: "B.A. L.L.B., National Law University (NLU)  |  Research Analyst & Advocate, Ranchi High Court (4+ years)",
    icon: Scale,
    bio: "Four years of practicing civil, criminal, and company law at the Ranchi High Court taught him something most lawyers don't talk about — that the businesses he represented didn't just need legal solutions. They needed someone to help them think ahead. Someone to spot the problems before they became courtroom problems. That realization is why this agency exists. Also the person most likely to make you laugh in a strategy meeting.",
  },
  {
    name: "Simardeep Kaur",
    role: "Content & SEO Lead",
    credentials: "MA English Literature, Panjab University  |  Asst. Professor, DAV College Chandigarh",
    icon: PenLine,
    bio: "English literature professor at DAV College Chandigarh who has been writing professionally since 2016. From editorial work at Pocket FM to content across tech, lifestyle, and culture, she has spent six years making brands sound like humans instead of press releases. The rare writer who can move between academic rigor and Instagram captions without losing her voice.",
  },
];

const values = [
  {
    icon: Eye,
    title: "Honesty Over Hype",
    description:
      "Every number we share is real. Every recommendation comes with the reasoning behind it. You will always know exactly where your money is going and why.",
  },
  {
    icon: Target,
    title: "Systems Thinking",
    description:
      "We bring the same rigor to a local brand that Amazon applies to a global supply chain. Every recommendation backed by data, every decision traceable.",
  },
  {
    icon: Lightbulb,
    title: "Strategy First",
    description:
      "We start by understanding your business — the revenue, the customers, the gaps. The right strategy comes first, then we figure out what to build.",
  },
  {
    icon: Handshake,
    title: "Built to Last",
    description:
      "Quick wins are nice. We would rather build something that compounds over years — systems, content, and relationships that keep working long after a project ends.",
  },
];

const highlights = [
  { label: "Where We Come From", value: "Hazaribagh, Jharkhand" },
  { label: "Education", value: "IIM, NLU, Panjab University" },
  { label: "Experience", value: "Amazon, Ranchi High Court, DAV College Chandigarh" },
  { label: "Partnership", value: "50/50, Founder-Led" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-background">
        <div className="container">
          <ScrollReveal>
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
                About Us
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading tracking-tight">
                Built by People,{" "}
                <span className="text-primary">Not a Pitch Deck</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
                We are two friends from a small town in Jharkhand who believe
                growing businesses deserve the same quality of thinking that the
                biggest companies in the world get.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-muted/50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <ScrollReveal>
              <div>
                <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
                  Our Story
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold font-heading">
                  Same School, Different Paths, One Idea
                </h2>
                <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    We grew up in Hazaribagh, a quiet town in Jharkhand. Same school,
                    same neighborhood, different ambitions. Aditya went to
                    IIM, then Amazon. Adam went to NLU, then the
                    Ranchi High Court.
                  </p>
                  <p>
                    But we kept noticing the same thing from opposite ends. At Amazon,
                    Aditya saw how large corporations move — the systems, the data, the
                    precision that drives decisions across global portfolios. At the
                    High Court, Adam saw how small businesses struggle — not for lack of
                    effort, but for lack of the kind of forward-looking thinking that
                    bigger companies take for granted.
                  </p>
                  <p>
                    The businesses Adam represented did not just need legal help. They
                    needed someone thinking ahead — spotting opportunities and problems
                    before they escalated. The tools and systems Aditya built at Amazon
                    should not be exclusive to companies with billion-dollar revenues.
                  </p>
                  <p>
                    After enough conversations about the same frustration, we decided to
                    stop talking about it and actually do something.{" "}
                    <strong className="text-foreground">
                      That is how Elevate Strategy started.
                    </strong>{" "}
                    Not to build the next big agency. Just to bring honest, rigorous,
                    forward-looking thinking to businesses that deserve better —
                    whether you are a startup in Asansol or a brand in Bengaluru.
                  </p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="bg-background rounded-3xl p-8 sm:p-10 border">
                <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-8">
                  At a Glance
                </h3>
                <div className="space-y-6">
                  {highlights.map((item) => (
                    <div key={item.label}>
                      <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        {item.label}
                      </div>
                      <div className="mt-1 text-base font-medium text-foreground">
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-background">
        <div className="container">
          <SectionHeader
            label="Our Team"
            title="The People Behind the Work"
            description="No stock photos. No invented titles. Just the three of us and what we actually bring."
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <ScrollReveal key={member.name} delay={index * 0.1}>
                <div className="bg-muted/50 rounded-3xl border p-8 h-full flex flex-col">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                      <member.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold font-heading">{member.name}</h3>
                      <p className="text-sm font-medium text-primary">{member.role}</p>
                    </div>
                  </div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
                    {member.credentials}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {member.bio}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-muted/50">
        <div className="container">
          <SectionHeader
            label="What We Believe"
            title="How We Work"
            description="Not aspirational slogans. These are the actual principles behind every decision we make."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <ScrollReveal key={value.title} delay={index * 0.1}>
                <div className="p-8 rounded-3xl bg-background border hover:shadow-md transition-shadow h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold font-heading mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container">
          <ScrollReveal>
            <div className="relative rounded-3xl bg-foreground p-12 sm:p-16 text-center overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading">
                  We would rather show you than tell you.
                </h2>
                <p className="mt-6 text-lg text-white/60 max-w-2xl mx-auto">
                  Start with a conversation. No pitch, no pressure — just an honest
                  look at where your business is and where it could go.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    size="lg"
                    asChild
                    className="text-sm font-bold uppercase tracking-wider px-8 h-14 rounded-2xl bg-primary text-foreground hover:bg-primary/90"
                  >
                    <Link href="/contact">
                      Start a Conversation
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
    </>
  );
}
