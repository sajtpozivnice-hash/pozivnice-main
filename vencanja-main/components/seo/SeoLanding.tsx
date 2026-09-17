import Link from "next/link";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import Cta from "@/components/cta/Cta";
import styles from "./SeoLanding.module.css";

export type SeoLandingSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

type SeoLandingProps = {
  eyebrow: string;
  title: string;
  lead: string;
  sections: SeoLandingSection[];
  related?: { href: string; label: string }[];
  ctaTitle?: string;
  ctaDescription?: string;
};

export function SeoLanding({
  eyebrow,
  title,
  lead,
  sections,
  related,
  ctaTitle = "Spremni za svoju pozivnicu?",
  ctaDescription = "Izaberite dizajn, prilagodite ga i pošaljite porudžbinu. 3.999 RSD jednokratno · povrat novca u 7 dana.",
}: SeoLandingProps) {
  return (
    <div>
      <Header />
      <main className={styles.page}>
        <div className={styles.inner}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.lead}>{lead}</p>

          <div className={styles.actions}>
            <Link href="/pozivnice" className={styles.primaryBtn}>
              Pogledaj dizajne
            </Link>
            <Link href="/demo" className={styles.secondaryBtn}>
              Isprobaj demo nalog
            </Link>
          </div>

          {sections.map((section) => (
            <section key={section.title} className={styles.section}>
              <h2>{section.title}</h2>
              {section.paragraphs?.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {section.bullets ? (
                <ul>
                  {section.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          {related && related.length > 0 ? (
            <nav className={styles.related} aria-label="Povezane stranice">
              <p className={styles.relatedLabel}>Pogledajte i:</p>
              <ul>
                {related.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
        </div>
      </main>
      <Cta title={ctaTitle} description={ctaDescription} />
      <Footer />
    </div>
  );
}
