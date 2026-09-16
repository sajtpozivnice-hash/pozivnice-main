"use client";

import Section from "../layout/Section";
import Heading, { HeadingVariant } from "../shared/typography/Heading";
import Paragraph from "../shared/typography/Paragraph";
import Logo from "@/components/brand/Logo";
import styles from "./Footer.module.css";
import Link from "next/link";

const Footer = () => {
  return (
    <div className={styles.wrapper}>
      <Section>
        <div className={styles.container}>
          <div className={styles.item}>
            <Logo className={styles.footerLogo} size="lg" />
            <Paragraph center={false} color="var(--color-primary)">
              Digitalne pozivnice za venčanje, rođendan i krštenje. 3.999 RSD,
              jednokratno.
            </Paragraph>
          </div>

          <div className={styles.item}>
            <Heading
              variant={HeadingVariant.H2}
              className={styles.footerSecondaryTitle}
            >
              Navigacija
            </Heading>
            <nav className={styles.linkList}>
              <Link href="/">Početna</Link>
              <Link href="/pozivnice">Pozivnice</Link>
              <Link href="/#cenovnik">Cenovnik</Link>
              <Link href="/kontakt">Kontakt</Link>
              <Link href="/demo">Demo nalog</Link>
              <Link href="/privatnost">Privatnost</Link>
              <Link href="/login">Prijava</Link>
            </nav>
          </div>

          <div className={styles.item}>
            <Heading
              variant={HeadingVariant.H2}
              className={styles.footerSecondaryTitle}
            >
              Naručivanje
            </Heading>
            <nav className={styles.linkList}>
              <Link href="/pozivnice">1. Izaberite dizajn</Link>
              <Link href="/pozivnice">2. Prilagodite i naručite</Link>
              <Link href="/demo">Isprobaj demo nalog</Link>
              <Link href="/login">Prijava u nalog</Link>
            </nav>
          </div>

          <div className={styles.item}>
            <Heading
              variant={HeadingVariant.H2}
              className={styles.footerSecondaryTitle}
            >
              Kontakt
            </Heading>
            <Paragraph center={false} color="var(--color-primary)">
              Pišite nam ili naručite preko dizajna — šaljemo uputstvo za
              uplatu.
            </Paragraph>
            <Link className={styles.inlineLink} href="/pozivnice">
              Pogledaj dizajne
            </Link>
            <a
              className={styles.inlineLink}
              href="https://www.instagram.com/vasdogadjaj/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram @vasdogadjaj
            </a>
          </div>
        </div>
      </Section>
      <div className={`${styles.footerBottom} text-center`}>
        <p className={styles.description} suppressHydrationWarning>
          © {new Date().getFullYear()} Vaš događaj. Sva prava zadržana.{" "}
          <Link href="/privatnost">Politika privatnosti</Link>
        </p>
      </div>
    </div>
  );
};

export default Footer;
