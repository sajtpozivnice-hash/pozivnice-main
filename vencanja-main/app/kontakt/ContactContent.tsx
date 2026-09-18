"use client";

import { motion } from "framer-motion";
import styles from "./Contact.module.css";
import Section from "@/components/layout/Section";
import Heading, {
  HeadingVariant,
} from "@/components/shared/typography/Heading";
import AnimatedLetter from "@/components/icons/AnimatedLetter";
import AnimatedPhone from "@/components/icons/AnimatedPhone";
import Button from "@/components/button/Button";
import AnimatedArrowRight from "@/components/icons/AnimatedArrowRight";
import ContactPageForm from "@/components/ContactPageForm/ContactPageForm";
import { useRouter } from "next/navigation";
import Paragraph from "@/components/shared/typography/Paragraph";

const ContactContent = () => {
  const router = useRouter();

  return (
    <Section>
      <div className={styles.contentContainer}>
        <div className={styles.infoContainer}>
          <div className={styles.infoContainerInner}>
            <Heading>Kako naručiti</Heading>
            <Paragraph center={false}>
              1) Otvorite Pozivnice · 2) Izaberite dizajn · 3) Pošaljite
              porudžbinu · 4) Platite po uputstvu koje vam pošaljemo.
            </Paragraph>

            <div className={styles.scenario}>
              <Heading variant={HeadingVariant.H3} className={styles.smallHeading}>
                Imate pitanje?
              </Heading>
              <Paragraph center={false}>
                Pišite nam ovde — odgovaramo lično, obično brzo.
              </Paragraph>
            </div>

            <div className={styles.scenario}>
              <Heading variant={HeadingVariant.H3} className={styles.smallHeading}>
                Već znate koji dizajn želite?
              </Heading>
              <Paragraph center={false}>
                Idite na Pozivnice, otvorite taj dizajn i naručite iz editora —
                tako nam stigne i vaša konfiguracija.
              </Paragraph>
            </div>

            <div className={styles.infoContainerInnerContent}>
              <div className={styles.iconWrapper}>
                <AnimatedLetter color="var(--color-bg)" size={30} />
              </div>
              <div>
                <Heading
                  variant={HeadingVariant.H3}
                  className={styles.smallHeading}
                >
                  Email
                </Heading>
                <motion.a
                  href="mailto:office@vasdogadjaj.com"
                  initial="offscreen"
                  whileInView="onscreen"
                  viewport={{ once: true }}
                  variants={{
                    offscreen: { opacity: 0 },
                    onscreen: {
                      opacity: 1,
                      transition: {
                        delay: 0.25,
                        duration: 0.45,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      },
                    },
                  }}
                  style={{ fontWeight: 400 }}
                >
                  office@vasdogadjaj.com
                </motion.a>
              </div>
            </div>
            <div className={styles.infoContainerInnerContent}>
              <div className={styles.iconWrapper}>
                <AnimatedPhone color="var(--color-bg)" size={30} />
              </div>
              <div>
                <Heading
                  variant={HeadingVariant.H3}
                  className={styles.smallHeading}
                >
                  Instagram
                </Heading>
                <motion.a
                  href="https://www.instagram.com/vasdogadjaj/"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial="offscreen"
                  whileInView="onscreen"
                  viewport={{ once: true }}
                  variants={{
                    offscreen: { opacity: 0 },
                    onscreen: {
                      opacity: 1,
                      transition: {
                        delay: 0.25,
                        duration: 0.45,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      },
                    },
                  }}
                  style={{ fontWeight: 400 }}
                >
                  @vasdogadjaj
                </motion.a>
              </div>
            </div>
          </div>
          <div className={styles.info}>
            <div>
              <Heading variant={HeadingVariant.H3}>Šta dobijate?</Heading>
              <Paragraph center={false}>
                Digitalnu pozivnicu sa vašim linkom (3.999 RSD) i privatni nalog
                za organizaciju: gosti, RSVP, stolovi, budžet, planer i
                fotografije.
              </Paragraph>
              <Button
                onClick={() => router.push("/pozivnice")}
                icon={AnimatedArrowRight}
              >
                Pogledaj dizajne
              </Button>
            </div>
          </div>
          <div className={styles.info}>
            <div>
              <Heading variant={HeadingVariant.H3}>Sledeći korak</Heading>
              <Paragraph center={false}>
                Izaberite dizajn i pošaljite porudžbinu. Mi šaljemo uputstvo za
                uplatu.
              </Paragraph>
            </div>
          </div>
        </div>
        <div className={styles.formContainer}>
          <ContactPageForm />
        </div>
      </div>
    </Section>
  );
};

export default ContactContent;
