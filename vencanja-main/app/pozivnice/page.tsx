"use client";

import Header from "@/components/header/Header";
import PozivniceHeader from "./PozivniceHeader";
import PozivniceContent from "./PozivniceContent";
import Footer from "@/components/footer/Footer";
import Cta from "@/components/cta/Cta";

const Pozivnice = () => {
  return (
    <div>
      <Header />
      <PozivniceHeader />
      <PozivniceContent />
      <Cta
        title="Sviđa vam se dizajn?"
        description="Javite nam koji primer želite — ili opišite kako zamišljate potpuno prilagođenu pozivnicu. Izradu dogovorimo lično."
        primaryLabel="Kontaktirajte nas"
        primaryHref="/kontakt"
        secondaryLabel="Pogledaj cenovnik"
        secondaryHref="/#cenovnik"
      />
      <Footer />
    </div>
  );
};

export default Pozivnice;
