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
        title="Vaš dan počinje jednom pozivnicom."
        description="Izaberite dizajn iznad, prilagodite ga sebi i imajte sve što vam treba za organizaciju — na jednom mestu."
        primaryLabel="Kreiraj svoju pozivnicu"
        primaryHref="/kontakt"
        meta="Bez mesečne pretplate • 3.999 RSD • Neograničeno trajanje"
      />
      <Footer />
    </div>
  );
};

export default Pozivnice;
