import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import Link from "next/link";
import styles from "./privatnost.module.css";

export default function PrivatnostPage() {
  return (
    <div>
      <Header />
      <main className={styles.page}>
        <div className={styles.inner}>
          <p className={styles.eyebrow}>Vaš događaj</p>
          <h1 className={styles.title}>Politika privatnosti</h1>
          <p className={styles.lead}>
            Ova stranica objašnjava koje podatke prikupljamo na{" "}
            <strong>vasdogadjaj.com</strong>, zašto ih koristimo i koja su vaša
            prava. Poslednji put ažurirano: 2. septembar 2026.
          </p>

          <section className={styles.section}>
            <h2>Ko smo mi</h2>
            <p>
              Uslugu digitalnih pozivnica i organizacije događaja pruža{" "}
              <strong>Vaš događaj</strong> (domen{" "}
              <a href="https://www.vasdogadjaj.com">www.vasdogadjaj.com</a>).
            </p>
            <p>
              Kontakt za pitanja o privatnosti:{" "}
              <a href="mailto:office@vasdogadjaj.com">office@vasdogadjaj.com</a>{" "}
              ili preko stranice <Link href="/kontakt">Kontakt</Link>.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Koje podatke prikupljamo</h2>
            <ul>
              <li>
                <strong>Kontakt / porudžbina:</strong> ime, email, telefon i
                poruka koju pošaljete preko forme (npr. na /kontakt ili u
                editoru).
              </li>
              <li>
                <strong>Nalog klijenta:</strong> podaci potrebni za prijavu i
                upravljanje događajem (gosti, RSVP, budžet, planer, fotografije
                gostiju — u okviru vašeg projekta).
              </li>
              <li>
                <strong>Tehnički podaci:</strong> IP adresa (ograničeno, npr. radi
                zaštite od zloupotrebe), tip uređaja/browsera, stranice koje
                posetite.
              </li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>Zašto obrađujemo podatke</h2>
            <ul>
              <li>da odgovorimo na upit ili porudžbinu pozivnice,</li>
              <li>da pružimo nalog i funkcije platforme,</li>
              <li>da unapredimo sajt i merimo posete (analitika),</li>
              <li>da merimo efikasnost oglasa (Google Ads),</li>
              <li>da štitimo servis od spama i zloupotrebe.</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>Kolačići i merenje</h2>
            <p>
              Na sajtu koristimo kolačiće i slične tehnologije trećih strana:
            </p>
            <ul>
              <li>
                <strong>Google Analytics 4 (GA4)</strong> — broj poseta, stranice,
                događaji (npr. slanje kontakt forme). Measurement ID tipa{" "}
                <code>G-…</code>.
              </li>
              <li>
                <strong>Google Ads</strong> — merenje konverzija (npr. uspešno
                slanje lead forme) i, gde je primenljivo, optimizacija oglasa.
              </li>
            </ul>
            <p>
              Ovi alati mogu postaviti kolačiće koje kontrolišu Google. Više o
              Google privatnosti:{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                policies.google.com/privacy
              </a>
              .
            </p>
            <p>
              Kolačiće možete ograničiti u podešavanjima browsera ili
              ekstenzijama (npr. blokatori reklama). Ako ih blokirate, deo
              merenja možda neće raditi.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Sa kim delimo podatke</h2>
            <p>
              Podatke ne prodajemo. Koristimo pouzdane procesore koliko je
              potrebno za rad usluge, npr.:
            </p>
            <ul>
              <li>hosting / infrastruktura (npr. Vercel),</li>
              <li>baza i autentifikacija (Supabase),</li>
              <li>email dostava (Resend),</li>
              <li>analitika i oglasi (Google).</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>Koliko čuvamo podatke</h2>
            <p>
              Kontakt upite čuvamo dok je potrebno da odgovorimo i vodimo
              saradnju. Podatke u klijentskom nalogu čuvamo dok nalog / projekat
              postoji ili dok ne zatražite brisanje. Analitički podaci podležu
              periodima zadržavanja koje podešava Google Analytics nalog.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Vaša prava</h2>
            <p>
              Možete zatražiti uvid, ispravku ili brisanje podataka koje
              držimo o vama, kao i povlačenje saglasnosti gde se obrada na njoj
              zasniva. Pišite na{" "}
              <a href="mailto:office@vasdogadjaj.com">office@vasdogadjaj.com</a>.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Izmene</h2>
            <p>
              Politiku možemo ažurirati. Nova verzija biće objavljena na ovoj
              stranici sa ažuriranim datumom.
            </p>
          </section>

          <p className={styles.back}>
            <Link href="/kontakt">Kontaktirajte nas</Link>
            {" · "}
            <Link href="/">Nazad na početnu</Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
