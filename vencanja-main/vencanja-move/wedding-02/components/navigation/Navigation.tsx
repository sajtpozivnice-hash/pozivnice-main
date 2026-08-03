"use client";

import React, { useState, useEffect } from "react";
import styles from "./Navigation.module.css";
import { Menu, X, Heart } from "lucide-react";
import { hsvaToHex } from "@uiw/react-color";
import { useConfig } from "../../ConfigContext";
import { fonts } from "@/fontsForInvites";
import SettingsApplication from "../SettingsApplication/SettingsApplication";

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { config } = useConfig();
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Nasa Prica", href: "#story" },
    { name: "Dogadjaji", href: "#schedule" },
    { name: "Lokacija", href: "#location" },
    { name: "Potvrda", href: "#rsvp" },
  ];

  return (
    <nav
      className={`${styles.navbar} ${isScrolled ? styles.scrolled : styles.default}`}
    >
      <div className={styles["nav-container"]}>
        <a
          href="#"
          style={{
            color: isScrolled
              ? hsvaToHex(config.main.primaryColor)
              : hsvaToHex(config.main.fontColor),
          }}
          className={styles.brand}
        >
          <Heart />
        </a>

        <div
          style={{ color: hsvaToHex(config.main.fontColor) }}
          className={styles["menu-desktop"]}
        >
          {navLinks.map((link) => (
            <a
              style={{
                color: isScrolled
                  ? hsvaToHex(config.main.primaryColor)
                  : hsvaToHex(config.main.fontColor),
                fontFamily: fonts[config.main.primaryFont].style.fontFamily,
              }}
              key={link.name}
              href={link.href}
            >
              {link.name}
            </a>
          ))}
          <SettingsApplication />
        </div>

        <button
          className={styles["mobile-toggle"]}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
        <div className={styles.navigationSettingsMobileTrigger}>
          <SettingsApplication />
        </div>
      </div>

      <div className={`${styles["menu-mobile"]} ${isOpen ? styles.open : ""}`}>
        {navLinks.map((link) => (
          <a
            style={{
              fontFamily: fonts[config.main.secondaryFont].style.fontFamily,
            }}
            key={link.name}
            href={link.href}
            onClick={() => setIsOpen(false)}
          >
            {link.name}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
