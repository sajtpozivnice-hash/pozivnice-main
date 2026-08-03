"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FC, useEffect, useRef, useState } from "react";
import Heading, { HeadingVariant } from "../shared/typography/Heading";
import { FaqBoxProps, FaqBoxType } from "@/app/types/types";
import styles from "./FaqBox.module.css";
import FaqBoxAnswer from "./FaqBoxAnswer";

const FaqBox: FC<FaqBoxProps & FaqBoxType> = ({
  title,
  description,
  isOpen,
  setIsOpen,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [description, isOpen]);

  return (
    <div className={styles.faqContainer}>
      <motion.div onClick={setIsOpen}>
        <div className={styles.headingContainer}>
          <Heading
            className={`${isOpen ? styles.activeItem : ""}`}
            variant={HeadingVariant.H3}
          >
            {title}
          </Heading>
          <div className={styles.iconWrapper}>
            <motion.span
              className={`${styles.line}`}
              animate={{
                rotate: isOpen ? 0 : 90,
                backgroundColor: isOpen
                  ? "var(--color-hot)"
                  : "var(--color-accent)",
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
            <motion.span
              className={`${styles.line}`}
              animate={{
                opacity: isOpen ? 0 : 1,
                backgroundColor: isOpen
                  ? "var(--color-hot)"
                  : "var(--color-accent)",
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
          </div>
        </div>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: height, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
              style={{ overflow: "hidden" }}
            >
              <div ref={contentRef} style={{ padding: "10px 0" }}>
                <FaqBoxAnswer descripiton={description} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default FaqBox;
