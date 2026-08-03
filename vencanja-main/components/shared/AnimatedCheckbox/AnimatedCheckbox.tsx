"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FC } from "react";
import styles from "./AnimatedCheckbox.module.css";

interface AnimatedCheckboxProps {
  label: string;
  checked: boolean;
  setChecked: (arg: boolean) => void;
}

const AnimatedCheckbox: FC<AnimatedCheckboxProps> = ({
  label,
  checked,
  setChecked,
}) => {
  return (
    <label className={styles.checkboxLabel}>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      <div className={styles.checkboxBox}>
        <AnimatePresence>
          {checked && (
            <motion.svg
              key="check"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={styles.checkmark}
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="#ff66cc"
                strokeWidth="3"
                d="M4 12l6 6L20 6"
              />
            </motion.svg>
          )}
        </AnimatePresence>
      </div>
      <p>{label}</p>
    </label>
  );
};

export default AnimatedCheckbox;
