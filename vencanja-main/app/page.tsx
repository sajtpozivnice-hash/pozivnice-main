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

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <InstructionsForTemplates />
      <WhyUs />
      <Controls />
      <Packages />
      <Cta />
      <FeaturedInvites />
      <Faq />
      <Footer />
    </div>
  );
}
