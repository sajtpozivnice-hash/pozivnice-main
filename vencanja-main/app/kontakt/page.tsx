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
        title="Vaš dan počinje jednom pozivnicom."
        description="Pregledajte dizajne, prilagodite pozivnicu i imajte sve što vam treba za organizaciju na jednom mestu."
        primaryLabel="Kreiraj svoju pozivnicu"
        primaryHref="/pozivnice"
        meta="Bez mesečne pretplate • 3.999 RSD • Neograničeno trajanje"
      />
      <Footer />
    </div>
  );
};

export default Kontakt;
