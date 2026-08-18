import Cta from "@/components/cta/Cta";
import Faq from "@/components/faq/Faq";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Hero from "@/components/hero/Hero";
import BackofficePanel from "@/components/backoffice/BackofficePanel";
import EditorFreedom from "@/components/editorFreedom/EditorFreedom";
import EventOs from "@/components/eventOs/EventOs";
import PersonalizedDomain from "@/components/personalizedDomain/PersonalizedDomain";
import AlwaysFresh from "@/components/alwaysFresh/AlwaysFresh";
import HowItWorks from "@/components/howItWorks/HowItWorks";
import ClearPricing from "@/components/clearPricing/ClearPricing";
import SocialProof from "@/components/socialProof/SocialProof";
import TemplateSection from "@/components/templateSection/TemplateSection";
import VisualProof from "@/components/visualProof/VisualProof";

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
      <HowItWorks />
      <ClearPricing />
      <SocialProof />
      <Faq />
      <Cta />
      <Footer />
    </div>
  );
}
