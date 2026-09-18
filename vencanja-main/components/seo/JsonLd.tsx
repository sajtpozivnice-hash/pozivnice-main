import { getSiteUrl } from "@/lib/siteUrl";

const OG_IMAGE =
  "https://res.cloudinary.com/dqqnpfbyf/image/upload/f_jpg,q_auto,w_1200/v1787146655/photo-1510076857177-7470076d4098_srlt0i.avif";

export function JsonLd() {
  const site = getSiteUrl();

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site}/#organization`,
        name: "Vaš događaj",
        url: site,
        logo: `${site}/icon.png`,
        email: "office@vasdogadjaj.com",
        sameAs: ["https://www.instagram.com/vasdogadjaj/"],
      },
      {
        "@type": "WebSite",
        "@id": `${site}/#website`,
        url: site,
        name: "Vaš događaj",
        inLanguage: "sr-RS",
        publisher: { "@id": `${site}/#organization` },
      },
      {
        "@type": "Product",
        "@id": `${site}/#product`,
        name: "Digitalna pozivnica + organizacija događaja",
        description:
          "Digitalna pozivnica sa RSVP i privatnim nalogom za goste, stolove, budžet, planer i fotografije. Jednokratna cena, bez mesečne pretplate.",
        image: OG_IMAGE,
        brand: { "@id": `${site}/#organization` },
        offers: {
          "@type": "Offer",
          url: `${site}/pozivnice`,
          priceCurrency: "RSD",
          price: "3999",
          availability: "https://schema.org/InStock",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
