"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Section from "../layout/Section";
import Button from "../button/Button";
import AnimatedArrowRight from "../icons/AnimatedArrowRight";
import { getFeaturedCatalogTemplates } from "@/templates/catalog";
import { EVENT_TYPE_LABELS } from "@/types/catalog";
import styles from "./SocialProof.module.css";

/**
 * Soft-launch social proof: real invitation examples, not fabricated reviews.
 * Later swap the header for testimonials when you have real customers.
 */
const SocialProof = () => {
  const examples = getFeaturedCatalogTemplates(6);

  return (
    <div className={styles.wrapper}>
      <Section>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
        >
          <p className={styles.eyebrow}>Social proof</p>
          <h2 className={styles.title}>
            Napravljeno za vaše najvažnije
            <br />
            trenutke.
          </h2>
          <p className={styles.lead}>
            Pogledajte kako izgledaju pozivnice koje možete potpuno prilagoditi
            sebi.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {examples.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{
                delay: Math.min(index * 0.06, 0.3),
                duration: 0.45,
              }}
            >
              <Link href={item.projectLink} className={styles.card}>
                <div className={styles.imageWrap}>
                  {item.imageLink ? (
                    <img
                      src={item.imageLink}
                      alt={item.title}
                      className={styles.image}
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className={styles.imageFallback} />
                  )}
                </div>
                <div className={styles.meta}>
                  <span className={styles.category}>
                    {EVENT_TYPE_LABELS[item.eventType]}
                  </span>
                  <span className={styles.name}>{item.title}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className={styles.actions}>
          <Button icon={AnimatedArrowRight}>
            <Link href="/pozivnice" className="white-color">
              Pogledaj sve dizajne
            </Link>
          </Button>
        </div>
      </Section>
    </div>
  );
};

export default SocialProof;
