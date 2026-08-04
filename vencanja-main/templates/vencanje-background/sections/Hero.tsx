"use client";

import { FC, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HeroSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { formatDate } from "@/helpers/formatDate";
import { FixedBackdrop } from "../components/FixedBackdrop";
import { GlassPanel } from "../components/GlassPanel";
import "../index.css";

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
  const accent = theme.colors?.base?.primary?.value ?? "#e2c4a0";
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
    { label: "Dana", value: timeLeft.days },
    { label: "Sati", value: timeLeft.hours },
    { label: "Min", value: timeLeft.minutes },
    { label: "Sek", value: timeLeft.seconds },
  ];

  return (
    <>
      <FixedBackdrop src={backgroundImage} />
      <section id={id} className="vb-section-hero">
        <div className="vb-wrap text-center">
          <GlassPanel strong className="px-6 py-12 sm:px-12 sm:py-16">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="vb-eyebrow mb-6"
              style={{ color: accent }}
            >
              {data.subtitle}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 1 }}
              className="text-5xl leading-[1.1] text-white sm:text-7xl lg:text-8xl"
              style={{
                fontFamily: "var(--font-primary)",
                textShadow: "0 4px 30px rgba(0,0,0,0.45)",
              }}
            >
              {names}
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="mx-auto my-7 h-px w-16 origin-center"
              style={{ background: accent }}
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="text-xs uppercase tracking-[0.38em] text-white/75"
              style={{ fontFamily: "var(--font-secondary)" }}
            >
              {formatDate(date, "DAY_D_MMMM_YYYY")}
            </motion.p>
            {data.title ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mx-auto mt-5 max-w-md text-sm text-white/65 sm:text-base"
              >
                {data.title}
              </motion.p>
            ) : null}

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="mt-10 grid grid-cols-4 gap-2 sm:gap-3"
            >
              {countdownItems.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/15 bg-black/20 px-2 py-4"
                >
                  <p
                    className="text-xl text-white sm:text-2xl"
                    style={{ fontFamily: "var(--font-primary)" }}
                  >
                    {String(item.value).padStart(2, "0")}
                  </p>
                  <p className="mt-1 text-[9px] uppercase tracking-[0.22em] text-white/50">
                    {item.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </GlassPanel>
        </div>
      </section>
    </>
  );
};

export default Hero;
