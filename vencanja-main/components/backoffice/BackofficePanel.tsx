"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Section from "../layout/Section";
import Heading from "../shared/typography/Heading";
import Paragraph from "../shared/typography/Paragraph";
import Button from "../button/Button";
import AnimatedArrowRight from "../icons/AnimatedArrowRight";
import styles from "./BackofficePanel.module.css";

const HIGHLIGHTS = [
  "koliko gostiju dolazi",
  "koliko njih još nije odgovorilo",
  "stanje budžeta",
  "raspored sedenja",
  "fotografije gostiju",
  "sve informacije sa vaše pozivnice",
];

const BackofficePanel = () => {
  return (
    <div className={styles.wrapper}>
      <Section>
        <div className={styles.grid}>
          <motion.div
            className={styles.copy}
            initial={{ opacity: 0, x: -22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className={styles.eyebrow}>Backoffice</p>
            <Heading className={styles.title}>
              Vaš događaj. Vaš kontrolni centar.
            </Heading>
            <Paragraph variant="subtitle" center={false} className={styles.lead}>
              Nakon kupovine dobijate svoj privatni panel iz kojeg možete da
              upravljate celom pozivnicom i organizacijom događaja.
            </Paragraph>

            <p className={styles.glance}>
              U jednom pogledu vidite ono što vam je najvažnije:
            </p>

            <ul className={styles.list}>
              {HIGHLIGHTS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <p className={styles.assurance}>
              I sve možete menjati kad god poželite.
            </p>

            <div className={styles.actions}>
              <Button icon={AnimatedArrowRight}>
                <Link href="/demo" className="white-color">
                  Isprobaj demo nalog
                </Link>
              </Button>
              <Button variant="secondary">
                <Link href="/login" className="white-color">
                  Prijavite se
                </Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            className={styles.stage}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.55,
              delay: 0.1,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <div className={styles.dashboard} aria-hidden>
              <div className={styles.dashTop}>
                <div className={styles.dashBrand}>
                  <span className={styles.dashDot} />
                  Ana &amp; Marko
                </div>
                <div className={styles.dashNav}>
                  <span className={styles.navActive}>Pregled</span>
                  <span>Gosti</span>
                  <span>Budžet</span>
                  <span>Planer</span>
                </div>
              </div>

              <div className={styles.dashGrid}>
                <div className={`${styles.tile} ${styles.tileWide}`}>
                  <span className={styles.tileLabel}>RSVP</span>
                  <p className={styles.tileStat}>
                    84 <span>/ 120</span>
                  </p>
                  <div className={styles.bar}>
                    <div className={styles.barFill} />
                  </div>
                  <p className={styles.tileMeta}>12 još nije odgovorilo</p>
                </div>

                <div className={styles.tile}>
                  <span className={styles.tileLabel}>Budžet</span>
                  <p className={styles.tileStat}>€4.820</p>
                  <p className={styles.tileMeta}>od €6.000 · 80%</p>
                </div>

                <div className={styles.tile}>
                  <span className={styles.tileLabel}>Planer</span>
                  <p className={styles.tileStat}>
                    7 <span>/ 12</span>
                  </p>
                  <p className={styles.tileMeta}>završeno</p>
                </div>

                <div className={`${styles.tile} ${styles.tileDark}`}>
                  <span className={styles.tileLabel}>Sedenje</span>
                  <div className={styles.miniTables}>
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                  <p className={styles.tileMeta}>8 stolova · 92 mesta</p>
                </div>

                <div className={`${styles.tile} ${styles.tilePhotos}`}>
                  <span className={styles.tileLabel}>Fotografije</span>
                  <div className={styles.photoRow}>
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                  <p className={styles.tileMeta}>248 od 63 gosta</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>
    </div>
  );
};

export default BackofficePanel;
