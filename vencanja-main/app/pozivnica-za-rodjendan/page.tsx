import type { Metadata } from "next";
import { SeoLanding } from "@/components/seo/SeoLanding";
import { SEO_PRODUCT_SECTIONS } from "@/lib/seoProductFeatures";

export const metadata: Metadata = {
  title: "Pozivnica za rođendan",
  description:
    "Digitalna pozivnica za rođendan sa RSVP, editorom i nalogom za goste, stolove, budžet i planer. 3.999 RSD jednokratno.",
  alternates: { canonical: "/pozivnica-za-rodjendan" },
  openGraph: {
    title: "Pozivnica za rođendan | Vaš događaj",
    description:
      "Lepa digitalna pozivnica za rođendan + nalog za organizaciju. Jednokratno 3.999 RSD.",
    url: "/pozivnica-za-rodjendan",
  },
};

export default function PozivnicaZaRodjendanPage() {
  return (
    <SeoLanding
      eyebrow="Rođendan"
      title="Pozivnica za rođendan — digitalno i jednostavno"
      lead="Pošaljite gostima link umesto papirne pozivnice. Izaberete dizajn za rođendan, unesete ime, datum i detalje, pa naručite. Posle uplate delite link, pratite RSVP i koristite nalog za organizaciju."
      sections={[
        {
          title: "Zašto digitalna pozivnica za rođendan?",
          paragraphs: [
            "Brzo se šalje (Viber, WhatsApp, Instagram), gosti potvrđuju dolazak, a vi možete da menjate tekst i do samog dana. Idealno za dečije proslave, 18. rođendan i porodične žurke.",
          ],
        },
        ...SEO_PRODUCT_SECTIONS,
      ]}
      related={[
        {
          href: "/digitalna-pozivnica-za-vencanje",
          label: "Digitalna pozivnica za venčanje",
        },
        { href: "/elektronska-pozivnica", label: "Elektronska pozivnica" },
        { href: "/pozivnice", label: "Katalog pozivnica" },
        { href: "/demo", label: "Demo nalog" },
      ]}
      ctaTitle="Nađite pozivnicu za rođendan"
      ctaDescription="Izaberite dizajn, prilagodite ga i naručite. 3.999 RSD · jednokratno · povrat u 7 dana."
    />
  );
}
