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
              Digitalne pozivnice i privatni nalog za goste, stolove, budžet i
              planiranje događaja.
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
              <Link href="/login">Prijava</Link>
            </nav>
          </div>

          <div className={styles.item}>
            <Heading
              variant={HeadingVariant.H2}
              className={styles.footerSecondaryTitle}
            >
              Sledeći korak
            </Heading>
            <nav className={styles.linkList}>
              <Link href="/pozivnice">Pogledaj primere</Link>
              <Link href="/kontakt">Pošaljite upit</Link>
              <Link href="/login">Uđite u svoj nalog</Link>
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
              Javite se zbog postojećeg dizajna ili potpuno prilagođene
              pozivnice — odgovaramo lično i dogovorimo izradu.
            </Paragraph>
            <Link className={styles.inlineLink} href="/kontakt">
              Idi na kontakt
            </Link>
          </div>
        </div>
      </Section>
      <div className={`${styles.footerBottom} text-center`}>
        <p className={styles.description} suppressHydrationWarning>
          © {new Date().getFullYear()} Vaš događaj. Sva prava zadržana.
        </p>
      </div>
    </div>
  );
};

export default Footer;
