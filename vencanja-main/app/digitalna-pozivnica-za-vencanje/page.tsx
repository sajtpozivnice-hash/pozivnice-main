import type { Metadata } from "next";
import { SeoLanding } from "@/components/seo/SeoLanding";
import { SEO_PRODUCT_SECTIONS } from "@/lib/seoProductFeatures";

export const metadata: Metadata = {
  title: "Digitalna pozivnica za venčanje",
  description:
    "Digitalna pozivnica za venčanje sa RSVP, editorom, nalogom za goste, stolove, budžet i planer. 3.999 RSD jednokratno, povrat novca u 7 dana.",
  alternates: { canonical: "/digitalna-pozivnica-za-vencanje" },
  openGraph: {
    title: "Digitalna pozivnica za venčanje | Vaš događaj",
    description:
      "Lepa digitalna pozivnica za venčanje + nalog za organizaciju. Jednokratno 3.999 RSD.",
    url: "/digitalna-pozivnica-za-vencanje",
  },
};

export default function DigitalnaPozivnicaZaVencanjePage() {
  return (
    <SeoLanding
      eyebrow="Venčanje"
      title="Digitalna pozivnica za venčanje"
      lead="Umesto štampanih pozivnica — jedan lep link za goste. Izaberete dizajn za venčanje, unesete imena i datum, naručite. Posle uplate dobijate link, RSVP i privatni nalog za celu organizaciju."
      sections={[
        {
          title: "Zašto digitalna pozivnica za venčanje?",
          paragraphs: [
            "Gosti je otvore na telefonu za par sekundi. Vi menjate tekst i slike kad god želite — i pre i posle porudžbine. Nema čekanja štampe i skupih ispravki. Idealno kada se planovi menjaju do samog dana.",
          ],
        },
        ...SEO_PRODUCT_SECTIONS,
      ]}
      related={[
        { href: "/elektronska-pozivnica", label: "Elektronska pozivnica" },
        { href: "/pozivnica-za-rodjendan", label: "Pozivnica za rođendan" },
        { href: "/pozivnice", label: "Svi dizajni" },
        { href: "/demo", label: "Demo nalog" },
      ]}
      ctaTitle="Nađite dizajn za venčanje"
      ctaDescription="Pregledajte pozivnice, prilagodite svoju i naručite. 3.999 RSD · povrat novca u 7 dana."
    />
  );
}
