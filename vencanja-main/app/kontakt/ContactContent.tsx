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
            Ako imate pitanje u vezi sa digitalnim pozivnicama, editorom, privatnim nalogom ili bilo kojom funkcijom platforme, slobodno nam pošaljite poruku. Trudimo se da odgovorimo u najkraćem mogućem roku.
            </Paragraph>

            <div className={styles.scenario}>
              <Heading variant={HeadingVariant.H3} className={styles.smallHeading}>
              Treba vam dodatna informacija?
              </Heading>
              <Paragraph center={false}>
              Ako niste sigurni kako funkcionišu digitalne pozivnice ili vas zanima neka od funkcija platforme, rado ćemo odgovoriti na sva vaša pitanja i pomoći vam da pronađete odgovarajuće rešenje.
              </Paragraph>
            </div>

            <div className={styles.scenario}>
              <Heading variant={HeadingVariant.H3} className={styles.smallHeading}>
              Već ste odabrali pozivnicu?
              </Heading>
              <Paragraph center={false}>
              Ako ste pronašli pozivnicu koja vam se dopada i imate pitanje pre slanja zahteva za aktivaciju, slobodno nam pišite. Tu smo da pomognemo.
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
              <Heading variant={HeadingVariant.H3}>Šta sve možete da očekujete?</Heading>
              <Paragraph center={false}>
              Naša platforma omogućava mnogo više od same digitalne pozivnice. Nakon aktivacije dobijate pristup privatnom nalogu iz kog možete uređivati sadržaj pozivnice, pratiti potvrde dolaska gostiju, organizovati raspored sedenja, voditi pregled troškova, planirati obaveze i pregledati fotografije koje vam gosti pošalju.
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
              Pošaljite nam poruku putem forme. Bilo da vam treba dodatna informacija ili savet, odgovorićemo vam u najkraćem mogućem roku.
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
