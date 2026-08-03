"use client";

import { useState, useEffect } from "react";
import styles from "./Hero.module.css";
import fontStyles from "../Fonts.module.css";
import { hsvaToHex } from "@uiw/react-color";
import { useConfig } from "../../ConfigContext";
import { formatDate } from "../../helpers/formatDate";
import { fonts } from "@/fontsForInvites";
import editable from "../GlobalCss.module.css";

const Hero = () => {
  const { config, setConfig } = useConfig();
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const calculateTimeLeft = () => {
      const difference =
        new Date(config.main.date).getTime() - new Date().getTime();
      if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [config.main.date, mounted]);

  return (
    <section
      className={styles.hero}
      style={{ backgroundColor: hsvaToHex(config.main.primaryColor) }}
    >
      <div
        className={styles.heroBg}
        style={{
          backgroundImage: `url(${config.hero.heroImage})`,
        }}
      />
      <div className={styles.heroOverlay} />
      <div className={styles.heroContent}>
        <p
          style={{
            color: hsvaToHex(config.main.fontColor),
            fontFamily: fonts[config.main.primaryFont].style.fontFamily,
          }}
          className={`${styles.heroSubtitle} ${fontStyles.fontSecondary} ${editable.editable}`}
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) =>
            setConfig({
              ...config,
              hero: {
                ...config.hero,
                heroTitle: e.currentTarget.innerText,
              },
            })
          }
        >
          {config.hero.heroTitle}
        </p>

        <h1
          style={{
            color: hsvaToHex(config.main.fontColor),
            fontFamily: fonts[config.main.primaryFont].style.fontFamily,
          }}
          className={`${styles.heroTitle} ${fontStyles.fontPrimary} ${editable.editable}`}
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) =>
            setConfig({
              ...config,
              main: {
                ...config.main,
                coupleNames: e.currentTarget.innerText,
              },
            })
          }
        >
          {config.main.coupleNames}
        </h1>
        <p
          style={{
            color: hsvaToHex(config.main.fontColor),
            fontFamily: fonts[config.main.secondaryFont].style.fontFamily,
          }}
          className={`${styles.heroDate} ${fontStyles.fontSecondary}`}
        >
          {formatDate(config.main.date, config.main.dateFormat)} •{" "}
          <span
            className={editable.editable}
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) =>
              setConfig({
                ...config,
                main: {
                  ...config.main,
                  place: e.currentTarget.innerText,
                },
              })
            }
          >
            {config.main.place}
          </span>
        </p>

        <div className={styles.countdown}>
          {[
            { label: "Dana", value: timeLeft.days },
            { label: "Sati", value: timeLeft.hours },
            { label: "Min", value: timeLeft.minutes },
            { label: "Sek", value: timeLeft.seconds },
          ].map((item) => (
            <div key={item.label} className={styles.countdownBox}>
              <span
                style={{
                  color: hsvaToHex(config.main.fontColor),
                  fontFamily: fonts[config.main.secondaryFont].style.fontFamily,
                }}
                className={`${styles.countdownNumber} ${fontStyles.fontTernary}`}
              >
                {item.value}
              </span>
              <span
                style={{
                  color: hsvaToHex(config.main.fontColor),
                  fontFamily: fonts[config.main.secondaryFont].style.fontFamily,
                }}
                className={styles.countdownLabel}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <span
          className={`${styles.rsvpBtn} ${editable.editable}`}
          style={{
            color: hsvaToHex(config.main.secondaryColor),
            backgroundColor: hsvaToHex(config.main.primaryColor),
            fontFamily: fonts[config.main.primaryFont].style.fontFamily,
          }}
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) =>
            setConfig({
              ...config,
              hero: {
                ...config.hero,
                buttonText: e.currentTarget.innerText,
              },
            })
          }
        >
          {config.hero.buttonText}
        </span>
      </div>
    </section>
  );
};

export default Hero;
