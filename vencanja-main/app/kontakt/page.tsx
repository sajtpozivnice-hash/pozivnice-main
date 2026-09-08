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
        title="Spremni za pozivnicu?"
        description="Pregledajte dizajne ili odmah pošaljite upit — dogovaramo izradu lično."
        primaryLabel="Pogledaj dizajne"
        primaryHref="/pozivnice"
        secondaryLabel="Pošalji upit"
        secondaryHref="/kontakt"
        meta="3.999 RSD · Bez mesečne pretplate · Neograničeno trajanje"
      />
      <Footer />
    </div>
  );
};

export default Kontakt;
