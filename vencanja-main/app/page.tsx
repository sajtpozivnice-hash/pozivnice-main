import BackofficeShowcase from "@/components/backoffice/BackofficeShowcase";
import Controls from "@/components/controls/Controls";
import Cta from "@/components/cta/Cta";
import Faq from "@/components/faq/Faq";
import FeaturedInvites from "@/components/featuredInvites/FeaturedInvites";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Hero from "@/components/hero/Hero";
import InstructionsForTemplates from "@/components/InstructionsForTemplates/InstructionsForTemplates";
import Packages from "@/components/packages/Packages";
import WhyUs from "@/components/whyUs/WhyUs";
import Workflow from "@/components/workflow/Workflow";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <Workflow />
      <BackofficeShowcase />
      <InstructionsForTemplates />
      <WhyUs />
      <Controls />
      <Packages />
      <FeaturedInvites />
      <Faq />
      <Cta />
      <Footer />
    </div>
  );
}
