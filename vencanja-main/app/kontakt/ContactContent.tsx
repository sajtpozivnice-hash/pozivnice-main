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
            <Heading>Kako možemo da vam pomognemo</Heading>
            <Paragraph center={false}>
              Na sajtu nema automatske kupovine. Pošaljite nam poruku — odgovaramo
              lično i dogovorimo izradu pozivnice.
            </Paragraph>

            <div className={styles.scenario}>
              <Heading variant={HeadingVariant.H3} className={styles.smallHeading}>
                Dopada vam se postojeći dizajn
              </Heading>
              <Paragraph center={false}>
                Otvorite primer koji vam se sviđa, pa nam napišite koji je to
                dizajn i osnovne podatke o događaju. Zatim dogovorimo izradu.
              </Paragraph>
            </div>

            <div className={styles.scenario}>
              <Heading variant={HeadingVariant.H3} className={styles.smallHeading}>
                Želite nešto drugačije
              </Heading>
              <Paragraph center={false}>
                Ako vam nijedan primer ne odgovara, opišite šta želite — stil,
                boje, sadržaj, posebne želje. Predložićemo odgovarajuće rešenje
                ili potpuno prilagođenu pozivnicu.
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
                  href="mailto:hello@eventplanner.com"
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
                  hello@eventplanner.com
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
                  Telefon
                </Heading>
                <motion.a
                  href="tel:+38165888888"
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
                  +381 65 888 888
                </motion.a>
              </div>
            </div>
          </div>
          <div className={styles.info}>
            <div>
              <Heading variant={HeadingVariant.H3}>Šta dobijate</Heading>
              <Paragraph center={false}>
                Online pozivnicu i privatni nalog: menjate sadržaj, pratite ko
                dolazi, pravite raspored sedenja, vodite budžet i primáte
                fotografije od gostiju.
              </Paragraph>
              <Button
                onClick={() => router.push("/pozivnice")}
                icon={AnimatedArrowRight}
              >
                Pogledaj primere
              </Button>
            </div>
          </div>
          <div className={styles.info}>
            <div>
              <Heading variant={HeadingVariant.H3}>Imate pitanja?</Heading>
              <Paragraph center={false}>
                Pitajte preko forme ili drugih kontakata — rado ćemo objasniti
                pakete i kako funkcioniše vaš nalog.
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
