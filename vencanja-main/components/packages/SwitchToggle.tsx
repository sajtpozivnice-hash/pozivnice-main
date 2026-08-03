import { FC } from "react";
import styles from "./PackageToggle.module.css";
import { motion } from "framer-motion";
import { Tag } from "@/types/general";

const SwitchToggle: FC<any> = ({ onClick, selected }) => {
  return (
    <div className={styles.container}>
      <motion.div
        className={styles.innerContainer}
        key={1}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {[
          { label: "Svi Šabloni", value: "" },
          { label: "Venčanja", value: Tag.WEDDING },
          { label: "Rođendani", value: Tag.BIRTHDAY },
          { label: "Krštenja", value: Tag.BAPTISM },
        ].map(({ label, value }) => (
          <motion.span
            key={value}
            className={styles.action}
            onClick={() => onClick(value)}
            initial={{
              backgroundColor:
                selected === value ? "var(--color-hot)" : "rgba(250,218,221,0)",
              fontWeight: selected === value ? 900 : 400,
              opacity: selected === value ? 1 : 0.5,
              color:
                selected === value ? "var(--color-bg)" : "var(--color-text)",
            }}
            animate={{
              backgroundColor:
                selected === value ? "var(--color-hot)" : "rgba(250,218,221,0)",
              fontWeight: selected === value ? 900 : 400,
              opacity: selected === value ? 1 : 0.5,
              color:
                selected === value ? "var(--color-bg)" : "var(--color-text)",
            }}
            transition={{ duration: 0.5 }}
          >
            {label}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};
export default SwitchToggle;
