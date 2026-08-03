"use client";

import Header from "@/components/header/Header";
import PozivniceHeader from "./PozivniceHeader";
import PozivniceContent from "./PozivniceContent";
import Footer from "@/components/footer/Footer";

const Pozivnice = () => {
  return (
    <div>
      <Header />
      <PozivniceHeader />
      <PozivniceContent />
      <Footer />
    </div>
  );
};

export default Pozivnice;
