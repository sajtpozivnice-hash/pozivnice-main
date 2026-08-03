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

  const handleClick = () => {
    router.push("/pozivnice");
  };
  return (
    <Section>
      <div className={styles.contentContainer}>
        <div className={styles.infoContainer}>
          <div className={styles.infoContainerInner}>
            <Heading>Kontakt informacije</Heading>
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
                  initial="offscreen"
                  whileInView="onscreen"
                  viewport={{ once: true }}
                  variants={{
                    offscreen: { opacity: 0 },
                    onscreen: {
                      opacity: 1,
                      transition: {
                        delay: 0.4,
                        duration: 0.5,
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
                  initial="offscreen"
                  whileInView="onscreen"
                  viewport={{ once: true }}
                  variants={{
                    offscreen: { opacity: 0 },
                    onscreen: {
                      opacity: 1,
                      transition: {
                        delay: 0.4,
                        duration: 0.5,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      },
                    },
                  }}
                  style={{ fontWeight: 400 }}
                >
                  +38165888888
                </motion.a>
              </div>
            </div>
          </div>
          <div className={styles.info}>
            <div>
              <Heading variant={HeadingVariant.H3}>Gotova rešenja</Heading>
              <Paragraph center={false}>
                Odaberite dizajn i prilagodite slike, tekstove, boje i detalje
                događaja.
              </Paragraph>
              <Button onClick={handleClick} icon={AnimatedArrowRight}>
                Pogledajte rešenja
              </Button>
            </div>
          </div>
          <div className={styles.info}>
            <div>
              <Heading variant={HeadingVariant.H3}>Imate pitanja?</Heading>
              <Paragraph center={false}>
                Pošaljite nam upit putem forme
              </Paragraph>
            </div>
          </div>
        </div>
        <div className={styles.formContainer}>
          <ContactPageForm config={undefined} />
        </div>
      </div>
    </Section>
  );
};

export default ContactContent;
