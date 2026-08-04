"use client";

import { FC, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HeroSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { formatDate } from "@/helpers/formatDate";
import { SceneShell } from "../components/SceneShell";

type Props = {
  section: HeroSection;
  event: EventConfig;
  theme: ThemeConfig;
};

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const Hero: FC<Props> = ({ section, event, theme }) => {
  const { data, id } = section;
  const { names, date } = event;
  const accent = theme.colors?.base?.primary?.value ?? "#c9a86a";
  const targetDate = new Date(date).getTime();
  const backgroundImage = data.backgroundImage || data.image;

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const tick = () => {
      const difference = targetDate - Date.now();
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        ),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    };

    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const countdownItems = [
    { label: "Dana", value: timeLeft.days },
    { label: "Sati", value: timeLeft.hours },
    { label: "Min", value: timeLeft.minutes },
    { label: "Sek", value: timeLeft.seconds },
  ];

  return (
    <SceneShell
      id={id}
      backgroundImage={backgroundImage}
      overlay="soft"
    >
      <div className="v4-content flex min-h-[100svh] flex-col items-center justify-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="v4-eyebrow mb-8"
          style={{ color: accent }}
        >
          {data.subtitle ?? "Wedding invitation"}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.12 }}
          className="max-w-5xl text-5xl leading-[0.92] tracking-tight text-white sm:text-7xl lg:text-8xl"
          style={{ fontFamily: "var(--font-primary)" }}
        >
          {names}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.85, delay: 0.4 }}
          className="my-8 h-px w-24 origin-center"
          style={{ background: accent }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.8 }}
          className="text-xs uppercase tracking-[0.42em] text-white/80 sm:text-sm"
          style={{ fontFamily: "var(--font-secondary)" }}
        >
          {formatDate(date, "DAY_D_MMMM_YYYY")}
        </motion.p>

        {data.title ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-6 max-w-md text-base text-white/70 sm:text-lg"
            style={{ fontFamily: "var(--font-secondary)" }}
          >
            {data.title}
          </motion.p>
        ) : null}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.9 }}
          className="mt-14 grid w-full max-w-lg grid-cols-4 gap-2 sm:gap-3"
        >
          {countdownItems.map((item) => (
            <div
              key={item.label}
              className="v4-glass px-2 py-4 sm:px-3 sm:py-5"
            >
              <p
                className="text-2xl text-white sm:text-3xl"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                {String(item.value).padStart(2, "0")}
              </p>
              <p className="mt-2 text-[9px] uppercase tracking-[0.28em] text-white/55 sm:text-[10px]">
                {item.label}
              </p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.35, duration: 1 }}
          className="mt-16 flex flex-col items-center gap-3"
        >
          <div className="h-12 w-px bg-white/35" />
          <span className="text-[10px] uppercase tracking-[0.35em] text-white/45">
            Scroll
          </span>
        </motion.div>
      </div>
    </SceneShell>
  );
};

export default Hero;
