"use client";

import { Suspense } from "react";
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
      <Suspense fallback={null}>
        <PozivniceContent />
      </Suspense>
      <Cta
        title="Izabrali ste dizajn?"
        description="Pošaljite upit i javićemo vam se sa detaljima porudžbine. U cenu ulazi pozivnica + privatni nalog."
        primaryLabel="Pošalji upit"
        primaryHref="/kontakt"
        secondaryLabel="Nazad na početnu"
        secondaryHref="/"
        meta="3.999 RSD · Bez mesečne pretplate · Neograničeno trajanje"
      />
      <Footer />
    </div>
  );
};

export default Pozivnice;
