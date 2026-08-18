"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Section from "../layout/Section";
import Heading from "../shared/typography/Heading";
import Paragraph from "../shared/typography/Paragraph";
import Button from "../button/Button";
import AnimatedArrowRight from "../icons/AnimatedArrowRight";
import styles from "./PersonalizedDomain.module.css";

const configuredRoot = process.env.NEXT_PUBLIC_ROOT_DOMAIN?.trim().toLowerCase();
const ROOT_DOMAIN =
  configuredRoot && !configuredRoot.includes("localhost")
    ? configuredRoot.replace(/^www\./, "")
    : "vasdogadjaj.com";

const EXAMPLE_HOST = `anaimarko.${ROOT_DOMAIN}`;

const SHARE_CHANNELS = ["WhatsApp", "Viber", "Instagram", "QR kod"];

const PersonalizedDomain = () => {
  return (
    <div className={styles.wrapper}>
      <Section>
        <div className={styles.grid}>
          <motion.div
            className={styles.stage}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className={styles.browser}>
              <div className={styles.chrome}>
                <span className={styles.dot} />
                <span className={styles.dot} />
                <span className={styles.dot} />
                <div className={styles.urlBar}>
                  <span className={styles.lock} aria-hidden />
                  <span className={styles.url}>{EXAMPLE_HOST}</span>
                </div>
              </div>
              <div className={styles.screen}>
                <p className={styles.screenEyebrow}>Vaša pozivnica</p>
                <p className={styles.screenNames}>Ana &amp; Marko</p>
                <p className={styles.screenMeta}>12. septembar 2026.</p>
                <div className={styles.qr} aria-hidden>
                  <div className={styles.qrInner} />
                  <span>Skeniraj</span>
                </div>
              </div>
            </div>

            <div className={styles.channels} aria-label="Kanali deljenja">
              {SHARE_CHANNELS.map((channel) => (
                <span key={channel} className={styles.channel}>
                  {channel}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            className={styles.copy}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.5,
              delay: 0.08,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <p className={styles.eyebrow}>Personalizovani domen</p>
            <Heading className={styles.title}>
              Vaša priča ima svoju adresu.
            </Heading>
            <Paragraph variant="subtitle" center={false} className={styles.lead}>
              Umesto generičkog linka, dobijate personalizovanu adresu za vašu
              pozivnicu.
            </Paragraph>

            <p className={styles.domainExample}>
              <span className={styles.domainHost}>{EXAMPLE_HOST}</span>
            </p>

            <Paragraph variant="subtitle" center={false} className={styles.share}>
              Lako je podelite sa gostima putem WhatsApp-a, Vibera, Instagrama
              ili QR koda.
            </Paragraph>

            <p className={styles.assurance}>
              Jedan link. Sve informacije. Svi gosti.
            </p>

            <div className={styles.actions}>
              <Button icon={AnimatedArrowRight}>
                <Link href="/pozivnice" className="white-color">
                  Pogledaj primere
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </Section>
    </div>
  );
};

export default PersonalizedDomain;
