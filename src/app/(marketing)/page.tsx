import { Hero } from "@/components/sections/hero";
import { ServicesGrid } from "@/components/sections/services-grid";
import { StatsCounter } from "@/components/sections/stats-counter";
import { ProcessSteps } from "@/components/sections/process-steps";
import { CTASection } from "@/components/sections/cta-section";
import { OrganizationJsonLd } from "@/components/shared/json-ld";

export default function HomePage() {
  return (
    <>
      <OrganizationJsonLd />
      <Hero />
      <ServicesGrid />
      <StatsCounter />
      <ProcessSteps />
      <CTASection />
    </>
  );
}
