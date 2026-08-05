"use client";

import ContactHero from "./ContactHero";
import ContactContent from "./ContactContent";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import Cta from "@/components/cta/Cta";

const Kontakt = () => {
  return (
    <div>
      <Header />
      <ContactHero />
      <ContactContent />
      <Cta
        title="Još birate dizajn?"
        description="Pregledajte primere pa nam se javite — ili odmah napišite šta želite, pa ćemo predložiti rešenje."
        primaryLabel="Pogledaj primere"
        primaryHref="/pozivnice"
        secondaryLabel="Cenovnik"
        secondaryHref="/#cenovnik"
      />
      <Footer />
    </div>
  );
};

export default Kontakt;
