import HeroBadge from "@/components/hero/HeroBadge";
import styles from "./Pozivnice.module.css";
import Heading from "@/components/shared/typography/Heading";
import { motion } from "framer-motion";

const PozivniceHeader = () => {
  return (
    <div className={styles.pozivniceContainer}>
      <div className={styles.contactHeroContent}>
        <HeroBadge text="Primeri pozivnica" />
        <Heading className={styles.pozivniceMainTitle}>
          Izaberite dizajn,
          <span className={styles.pozivniceMainTitleSpan}>
            {" "}
            ili opišite svoj
          </span>
        </Heading>
        <motion.p
          className={styles.pozivniceMainDescription}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.35,
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          Otvorite primer i vidite šta možete da promenite: tekstove, slike,
          boje i fontove. Ako vam se dopada — kontaktirajte nas. Ako ne — opišite
          želje i predložićemo drugo rešenje.
        </motion.p>
      </div>
    </div>
  );
};

export default PozivniceHeader;
