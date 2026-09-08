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
        title="Našli ste dizajn?"
        description="Otvorite ga, unesite svoje podatke i pošaljite porudžbinu. Šaljemo uputstvo za uplatu."
        primaryLabel="Nazad na početak kataloga"
        primaryHref="#katalog"
        meta="3.999 RSD · jednokratno · bez pretplate"
      />
      <Footer />
    </div>
  );
};

export default Pozivnice;
