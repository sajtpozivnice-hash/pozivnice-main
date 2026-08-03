import { FC } from "react";
import styles from "./FormLabel.module.css";
import { motion } from "framer-motion";

interface FormLabelProps {
  text: string;
  required?: boolean;
}

const FormLabel: FC<FormLabelProps> = ({ text, required = false }) => {
  return (
    <motion.label
      className={styles.container}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true }}
      variants={{
        offscreen: { opacity: 0, y: -20 },
        onscreen: {
          opacity: 1,
          y: 0,
          transition: {
            delay: 0.3,
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          },
        },
      }}
    >
      {text}
      {required && <span className={styles.required}>*</span>}
    </motion.label>
  );
};

export default FormLabel;
