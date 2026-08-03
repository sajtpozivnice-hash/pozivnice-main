"use client";

import { motion, Variants } from "framer-motion";
import PackageBox from "./PackageBox";
import { packages } from "@/data/data";
import styles from "./Packages.module.css";

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const ListedPackages = () => {
  return (
    <motion.div
      className={styles.cardsContainer}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      {packages.map((pack) => (
        <motion.div key={pack.id} variants={itemVariants}>
          <PackageBox {...pack} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ListedPackages;
