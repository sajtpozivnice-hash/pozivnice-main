"use client";

import { FC, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HeroSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { formatDate } from "@/helpers/formatDate";
import { PremiumMedia } from "../components/PremiumMedia";

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
  const accent = theme.colors?.base?.primary?.value ?? "#9c7a45";
  const backgroundImage = data.backgroundImage || data.image;
  const targetDate = new Date(date).getTime();

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
    { label: "Dani", value: timeLeft.days },
    { label: "Sati", value: timeLeft.hours },
    { label: "Min", value: timeLeft.minutes },
    { label: "Sek", value: timeLeft.seconds },
  ];

  return (
    <section id={id} className="relative min-h-[100svh] w-full overflow-hidden">
      <PremiumMedia
        src={backgroundImage}
        alt=""
        className="absolute inset-0 h-full w-full"
        imgClassName="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.35)_100%)]" />

      <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-5 py-24 text-center text-white">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 text-[11px] uppercase tracking-[0.45em] text-white/75"
          style={{ fontFamily: "var(--font-secondary)", color: accent }}
        >
          {data.subtitle}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.05, delay: 0.1 }}
          className="max-w-5xl text-5xl leading-[0.92] sm:text-7xl lg:text-8xl text-white"
          style={{ fontFamily: "var(--font-primary)" }}
        >
          {names}
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="my-8 h-px w-20 origin-center"
          style={{ background: accent }}
        />

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.7 }}
          className="text-base font-medium uppercase tracking-[0.22em] text-white sm:text-lg md:text-xl"
          style={{ fontFamily: "var(--font-secondary)" }}
        >
          {formatDate(date, "DAY_D_MMMM_YYYY")}
        </motion.p>

        {data.title ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-5 text-sm italic text-white/70 sm:text-base"
            style={{ fontFamily: "var(--font-primary)" }}
          >
            {data.title}
          </motion.p>
        ) : null}

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95 }}
          className="mt-14 grid w-full max-w-md grid-cols-4 gap-px border border-white/20 bg-white/10 backdrop-blur-sm"
        >
          {countdownItems.map((item) => (
            <div key={item.label} className="bg-black/25 px-2 py-5">
              <p
                className="text-2xl sm:text-3xl"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                {String(item.value).padStart(2, "0")}
              </p>
              <p className="mt-2 text-[9px] uppercase tracking-[0.28em] text-white/55">
                {item.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
