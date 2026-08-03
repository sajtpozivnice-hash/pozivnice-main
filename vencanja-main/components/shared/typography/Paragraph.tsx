import { motion } from "framer-motion";
import styles from "./Paragraph.module.css";
import { ReactNode } from "react";
import clsx from "clsx";

type ParagraphProps = {
  children: ReactNode;
  center?: boolean;
  variant?: "body" | "subtitle";
  color?: string;
  className?: string;
};

const Paragraph = ({
  children,
  center = true,
  variant = "body",
  color,
  className,
}: ParagraphProps) => {
  return (
    <motion.p
      style={{ color: color && color }}
      className={clsx(
        styles.description,
        center && styles.center,
        variant === "body" ? styles.body : styles.subtitle,
        className && className,
      )}
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.p>
  );
};

export default Paragraph;
