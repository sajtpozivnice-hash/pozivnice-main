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
        title="Još razgledate pozivnice?"
        description="Pregledajte našu kolekciju digitalnih pozivnica za venčanja, rođendane i krštenja. Isprobajte editor, pronađite dizajn koji vam najviše odgovara."
        primaryLabel="Pogledajte pozivnice"
        primaryHref="/pozivnice"
        secondaryLabel="Cenovnik"
        secondaryHref="/#cenovnik"
      />
      <Footer />
    </div>
  );
};

export default Kontakt;
