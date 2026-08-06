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
        Izaberite pozivnicu koja vam se<span className={styles.pozivniceMainTitleSpan}>
            {" "}
            najviše dopada 
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
          Svaka pozivnica može se jednostavno prilagoditi vašem događaju. Isprobajte editor i pogledajte kako izgleda menjanje tekstova, fotografija, boja i fontova.
        </motion.p>
      </div>
    </div>
  );
};

export default PozivniceHeader;
