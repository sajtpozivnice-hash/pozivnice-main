"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Section from "../layout/Section";
import Heading from "../shared/typography/Heading";
import Paragraph from "../shared/typography/Paragraph";
import Button from "../button/Button";
import AnimatedArrowRight from "../icons/AnimatedArrowRight";
import { getCatalogTemplates } from "@/templates/catalog";
import { EventType } from "@/types/config";
import styles from "./TemplateSection.module.css";

const CATEGORIES: { label: string; eventType: EventType }[] = [
  { label: "Svadbe", eventType: "wedding" },
  { label: "Punoletstva", eventType: "comingOfAge" },
  { label: "Krštenja", eventType: "baptism" },
  { label: "Prvi rođendani", eventType: "kidsBirthday" },
];

const pickByCategory = () => {
  const all = getCatalogTemplates().filter((item) => item.imageLink);

  return CATEGORIES.map((category) => {
    const match =
      all.find((item) =>
        (item.eventTypes ?? [item.eventType]).includes(category.eventType),
      ) ?? all[0];

    return {
      ...category,
      imageLink: match?.imageLink ?? "",
    };
  });
};

const TemplateSection = () => {
  const total = getCatalogTemplates().length;
  const previews = pickByCategory();

  return (
    <div className={styles.wrapper}>
      <Section>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Heading className={styles.title}>
            Pronađite dizajn koji je baš vaš
          </Heading>
          <Paragraph variant="subtitle" className={styles.lead}>
            Od elegantnih i minimalističkih do romantičnih i modernih —
            izaberite dizajn, a zatim ga prilagodite sebi.
          </Paragraph>
          <p className={styles.meta}>
            {CATEGORIES.map((category) => category.label).join(" · ")}
          </p>
          <p className={styles.count}>
            {total} pažljivo dizajnirana template-a
          </p>
        </motion.div>

        <div className={styles.previews}>
          {previews.map((item, index) => (
            <motion.div
              key={item.eventType}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                delay: index * 0.07,
                duration: 0.45,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <Link
                href={`/pozivnice?eventType=${item.eventType}`}
                className={styles.preview}
              >
                <div className={styles.imageWrap}>
                  <img
                    src={item.imageLink}
                    alt={item.label}
                    className={styles.image}
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className={styles.previewLabel}>{item.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={styles.actions}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.15 }}
        >
          <Button icon={AnimatedArrowRight} maxWidth={280}>
            <Link href="/pozivnice" className="white-color">
              Pogledaj sve dizajne
            </Link>
          </Button>
        </motion.div>
      </Section>
    </div>
  );
};

export default TemplateSection;
