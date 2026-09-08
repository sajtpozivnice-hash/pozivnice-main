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
        title="Bolje kroz dizajn?"
        description="Izaberite pozivnicu, prilagodite je i naručite odatle — tako nam stigne i vaš izbor."
        primaryLabel="Pogledaj dizajne"
        primaryHref="/pozivnice"
        meta="3.999 RSD · jednokratno · bez pretplate"
      />
      <Footer />
    </div>
  );
};

export default Kontakt;
