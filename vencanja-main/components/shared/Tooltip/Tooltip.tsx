import { FC, useState } from "react";
import AnimatedQuestion from "../../icons/AnimatedQuestion";
import styles from "./Tooltip.module.css";
import { motion, AnimatePresence } from "framer-motion";

interface TootlipProps {
  text: string;
}

const Tooltip: FC<TootlipProps> = ({ text }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className={styles.container}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatedQuestion />
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={styles.textContainer}
          >
            <p>{text}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;
