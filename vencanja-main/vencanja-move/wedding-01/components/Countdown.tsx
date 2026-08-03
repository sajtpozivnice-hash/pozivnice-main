"use client";

import { useState, useEffect } from "react";
import styles from "../css/Components.module.css";
import { boxShadow } from "../constants";
import { hsvaToHex } from "@uiw/react-color";
import { useInviteConfig } from "../InviteConfigContext";

const Countdown = () => {
  const { config } = useInviteConfig();

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

  if (!mounted) return null;

  const countdownBoxStyle = {
    background: hsvaToHex(config.main.secondaryColor),
    color: hsvaToHex(config.main.primaryColor),
    ...boxShadow(hsvaToHex(config.main.primaryColor)),
  };

  return (
    <div className={styles.coutdownContainer}>
      <div
        className={`${styles.countdownBoxStyle} ${styles.fontInviteClassic}`}
        style={countdownBoxStyle}
      >
        {timeLeft.days} <span className={styles.countdownSpan}>dana</span>
      </div>
      <div
        className={`${styles.countdownBoxStyle} ${styles.fontInviteClassic}`}
        style={countdownBoxStyle}
      >
        {timeLeft.hours} <span className={styles.countdownSpan}>sati</span>
      </div>
      <div
        className={`${styles.countdownBoxStyle} ${styles.fontInviteClassic}`}
        style={countdownBoxStyle}
      >
        {timeLeft.minutes} <span className={styles.countdownSpan}>minuta</span>
      </div>
      <div
        className={`${styles.countdownBoxStyle} ${styles.fontInviteClassic}`}
        style={countdownBoxStyle}
      >
        {timeLeft.seconds} <span className={styles.countdownSpan}>sekundi</span>
      </div>
    </div>
  );
};

export default Countdown;
