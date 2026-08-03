"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import MenuList from "./MenuList";

const Header = () => {
  const { scrollY } = useScroll();

  const height = useTransform(scrollY, [0, 120], [90, 44]);
  const bg = useTransform(
    scrollY,
    [0, 80],
    ["rgba(255,255,255,0)", "rgba(255,255,255,0.95)"],
  );
  const shadow = useTransform(
    scrollY,
    [0, 80],
    ["0px 0px 0px rgba(0,0,0,0)", "0px 8px 30px rgba(0,0,0,0.12)"],
  );
  const blur = useTransform(scrollY, [0, 80], ["blur(0px)", "blur(12px)"]);
  const textColor = useTransform(
    scrollY,
    [0, 80],
    ["#ffffff", "var(--color-hot)"],
  );

  return (
    <motion.header
      style={{
        height,
        backgroundColor: bg,
        boxShadow: shadow,
        backdropFilter: blur,
        WebkitBackdropFilter: blur,
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MenuList textColor={textColor} />
    </motion.header>
  );
};

export default Header;
