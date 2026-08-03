import HeroBadge from "@/components/hero/HeroBadge";
import styles from "./Pozivnice.module.css";
import Heading from "@/components/shared/typography/Heading";
import { motion } from "framer-motion";

const PozivniceHeader = () => {
  return (
    <div className={styles.pozivniceContainer}>
      <div className={styles.contactHeroContent}>
        <HeroBadge text={"Primeri Pozivnica"} />
        <Heading className={`${styles.pozivniceMainTitle} `}>
          Kreirajte Vašu
          <span className={styles.pozivniceMainTitleSpan}> Pozivnicu</span>
        </Heading>
        <motion.p
          className={`${styles.pozivniceMainDescription}`}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.5,
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          Pregledajte naše elegantne šablone i izaberite dizajn koji vam se
          najviše dopada. <br />
          Sve pozivnice su potpuno prilagodljive – menjajte tekstove, slike,
          <br />
          boje i fontove, birajte sekcije koje želite i upravljajte spiskom
          gostiju <br />i planom sedenja direktno u svom nalogu.
        </motion.p>
      </div>
    </div>
  );
};
export default PozivniceHeader;
