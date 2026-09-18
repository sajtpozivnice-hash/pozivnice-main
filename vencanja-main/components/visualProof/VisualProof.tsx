"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Section from "../layout/Section";
import Heading from "../shared/typography/Heading";
import Paragraph from "../shared/typography/Paragraph";
import Button from "../button/Button";
import AnimatedArrowRight from "../icons/AnimatedArrowRight";
import styles from "./VisualProof.module.css";

const INVITE_PREVIEW =
  "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787046392/wedding/jeremy-wong-weddings-464ps_nOflw-unsplash.jpg";

const VisualProof = () => {
  return (
    <div className={styles.wrapper}>
      <Section>
        <div className={styles.grid}>
          <motion.div
            className={styles.copy}
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className={styles.eyebrow}>Kako izgleda na telefonu</p>
            <Heading className={styles.title}>
              Pogledajte pozivnicu na telefonu — pre porudžbine.
            </Heading>
            <Paragraph variant="subtitle" center={false} className={styles.lead}>
              Gosti skoro uvek otvaraju link sa mobilnog. Zato prvo vidite kako
              izgleda, pa uredite tekst i naručite.
            </Paragraph>
            <p className={styles.assurance}>
              3.999 RSD · pozivnica + nalog · sve uključeno
            </p>
            <div className={styles.actions}>
              <Button icon={AnimatedArrowRight}>
                <Link href="/demo" className="white-color">
                  Pogledaj demo
                </Link>
              </Button>
              <Button variant="secondary">
                <Link href="/pozivnice" className="white-color">
                  Izaberi dizajn
                </Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            className={styles.stage}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.65,
              delay: 0.12,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <div className={styles.glow} aria-hidden />

            <div className={styles.laptop} aria-hidden={false}>
              <div className={styles.laptopChrome}>
                <span className={styles.dot} />
                <span className={styles.dot} />
                <span className={styles.dot} />
                <span className={styles.url}>anaimarko.vasdogadjaj.com</span>
              </div>
              <div className={styles.laptopScreen}>
                <img
                  src={INVITE_PREVIEW}
                  alt="Primer digitalne pozivnice na laptopu"
                  className={styles.screenImage}
                  referrerPolicy="no-referrer"
                />
                <div className={styles.screenCaption}>
                  <span className={styles.captionNames}>Ana &amp; Marko</span>
                  <span className={styles.captionMeta}>12. septembar 2026.</span>
                </div>
              </div>
              <div className={styles.laptopBase} />
            </div>

            <div className={styles.phone}>
              <div className={styles.phoneNotch} aria-hidden />
              <div className={styles.phoneScreen}>
                <img
                  src={INVITE_PREVIEW}
                  alt="Primer digitalne pozivnice na telefonu"
                  className={styles.phoneImage}
                  referrerPolicy="no-referrer"
                />
                <div className={styles.phoneOverlay}>
                  <p className={styles.phoneNames}>Ana &amp; Marko</p>
                  <p className={styles.phoneCta}>Potvrdi dolazak</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>
    </div>
  );
};

export default VisualProof;
