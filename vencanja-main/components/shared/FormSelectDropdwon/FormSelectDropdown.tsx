import { FC, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./FormSelectDropdown.module.css";

interface FormSelectDropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

const FormSelectDropdown: FC<FormSelectDropdownProps> = ({
  options,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.customSelectWrapper} ref={wrapperRef}>
      <motion.div
        className={styles.selectInput}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {value || "Izaberite tip događaja"}
        <span className={styles.arrow}>▼</span>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className={styles.customOptions}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {options.map((option) => (
              <li
                key={option}
                onClick={() => handleSelect(option)}
                className={`${styles.customOptionItem} ${
                  option === value ? styles.selectedOption : ""
                }`}
              >
                {option}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FormSelectDropdown;
