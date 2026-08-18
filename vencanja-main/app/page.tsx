import Controls from "@/components/controls/Controls";
import Cta from "@/components/cta/Cta";
import Faq from "@/components/faq/Faq";
import FeaturedInvites from "@/components/featuredInvites/FeaturedInvites";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Hero from "@/components/hero/Hero";
import InstructionsForTemplates from "@/components/InstructionsForTemplates/InstructionsForTemplates";
import Packages from "@/components/packages/Packages";
import BackofficePanel from "@/components/backoffice/BackofficePanel";
import EditorFreedom from "@/components/editorFreedom/EditorFreedom";
import EventOs from "@/components/eventOs/EventOs";
import PersonalizedDomain from "@/components/personalizedDomain/PersonalizedDomain";
import AlwaysFresh from "@/components/alwaysFresh/AlwaysFresh";
import TemplateSection from "@/components/templateSection/TemplateSection";
import VisualProof from "@/components/visualProof/VisualProof";
import WhyUs from "@/components/whyUs/WhyUs";
import Workflow from "@/components/workflow/Workflow";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <VisualProof />
      <TemplateSection />
      <EditorFreedom />
      <EventOs />
      <BackofficePanel />
      <PersonalizedDomain />
      <AlwaysFresh />
      <Workflow />
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
