"use client";

import React from "react";
import styles from "./Footer.module.css";
import { hsvaToHex } from "@uiw/react-color";
import { Heart } from "lucide-react";

import { useConfig } from "../../ConfigContext";
import { fonts } from "@/fontsForInvites";

const Footer: React.FC = () => {
  const { config } = useConfig();
  return (
    <footer
      className={styles.footer}
      style={{ backgroundColor: hsvaToHex(config.main.secondaryColor) }}
    >
      <h2
        style={{
          color: hsvaToHex(config.main.primaryColor),
          fontFamily: fonts[config.main.primaryFont].style.fontFamily,
        }}
        className={styles.footerTitle}
      >
        {config.main.coupleNames}
        <Heart color={hsvaToHex(config.main.primaryColor)} size={52} />
      </h2>
    </footer>
  );
};

export default Footer;
