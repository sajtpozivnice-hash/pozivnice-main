import type { Metadata } from "next";
import { SeoLanding } from "@/components/seo/SeoLanding";
import { SEO_PRODUCT_SECTIONS } from "@/lib/seoProductFeatures";

export const metadata: Metadata = {
  title: "Elektronska pozivnica",
  description:
    "Elektronska pozivnica sa editorom, RSVP, gostima, stolovima, budžetom i planerom. Za venčanje, rođendan i krštenje — 3.999 RSD jednokratno.",
  alternates: { canonical: "/elektronska-pozivnica" },
  openGraph: {
    title: "Elektronska pozivnica | Vaš događaj",
    description:
      "Elektronska pozivnica koju delite linkom + nalog za organizaciju. 3.999 RSD jednokratno.",
    url: "/elektronska-pozivnica",
  },
};

export default function ElektronskaPozivnicaPage() {
  return (
    <SeoLanding
      eyebrow="Elektronska pozivnica"
      title="Elektronska pozivnica — brzo, lepo, jednokratno"
      lead="Elektronska (digitalna) pozivnica je web stranica koju šaljete gostima umesto papira: imena, datum, lokacije, tekst i potvrda dolaska. Kod nas birate gotov dizajn, uređujete u editoru i naručujete za 3.999 RSD."
      sections={[
        {
          title: "Šta je elektronska pozivnica?",
          paragraphs: [
            "To je personalizovana stranica-pozivnica sa vašim linkom. Gosti je otvore na telefonu; vi pratite ko dolazi i ostale detalje organizacije u privatnom nalogu.",
          ],
        },
        {
          title: "Za koje događaje?",
          bullets: [
            "Venčanje",
            "Rođendan (dečiji, 18. i ostali)",
            "Krštenje",
            "Drugi privatni događaji",
          ],
        },
        ...SEO_PRODUCT_SECTIONS,
      ]}
      related={[
        {
          href: "/digitalna-pozivnica-za-vencanje",
          label: "Digitalna pozivnica za venčanje",
        },
        { href: "/pozivnica-za-rodjendan", label: "Pozivnica za rođendan" },
        { href: "/demo", label: "Demo nalog" },
        { href: "/pozivnice", label: "Katalog" },
      ]}
    />
  );
}
