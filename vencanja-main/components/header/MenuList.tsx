"use client";

import Link from "next/link";
import styles from "./MenuList.module.css";
import { FC } from "react";
import {
  motion,
  MotionValue,
  useMotionTemplate,
  Variants,
} from "framer-motion";

interface MenuListProps {
  textColor: MotionValue<string>;
}

const MotionLink = motion.create(Link);

const listVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const MenuList: FC<MenuListProps> = ({ textColor }) => {
  const color = useMotionTemplate`${textColor}`;

  const links = [
    { label: "Početna", href: "/" },
    { label: "Pozivnice", href: "/pozivnice" },
    { label: "Logo", href: "/" },
    { label: "Cenovnik", href: "/" },
    { label: "Kontakt", href: "/kontakt" },
  ];

  return (
    <motion.ul
      className={styles.menuList}
      variants={listVariants}
      initial="hidden"
      animate="show"
    >
      {links.map((link, index) => (
        <motion.li
          key={index}
          variants={itemVariants}
          whileHover={{ y: -2, scale: 1.05 }}
        >
          <MotionLink
            style={{ color }}
            className={styles.link}
            href={link.href}
          >
            {link.label}
          </MotionLink>
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default MenuList;
