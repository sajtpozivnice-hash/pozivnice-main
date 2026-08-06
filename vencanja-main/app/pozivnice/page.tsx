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
        title="Spremni da napravite svoju digitalnu pozivnicu?"
        description="Izaberite dizajn, unesite podatke, podesite sve kako Vam odgovara i pošaljite zahtev. Nakon evidentirane uplate dobijate aktivnu pozivnicu koju možete odmah deliti sa gostima i uređivati kad god poželite."
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
