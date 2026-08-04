"use client";

import { FC, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HeroSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { formatDate } from "@/helpers/formatDate";
import { SceneFrame } from "../components/SceneFrame";

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
  const accent = theme.colors?.base?.primary?.value ?? "#d4a574";
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

  return (
    <SceneFrame id={id} backgroundImage={backgroundImage} parallax>
      <div className="vc-stage flex min-h-[100svh] flex-col justify-end pb-16 sm:pb-24">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="vc-eyebrow mb-6"
          style={{ color: accent }}
        >
          {data.subtitle ?? "Scene 01"}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.15 }}
          className="max-w-5xl text-6xl leading-[0.88] text-white sm:text-8xl lg:text-9xl"
          style={{ fontFamily: "var(--font-primary)" }}
        >
          {names}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.8 }}
          className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p
              className="text-xs uppercase tracking-[0.4em] text-white/70"
              style={{ fontFamily: "var(--font-secondary)" }}
            >
              {formatDate(date, "DAY_D_MMMM_YYYY")}
            </p>
            {data.title ? (
              <p
                className="mt-3 text-sm text-white/55 sm:text-base"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                {data.title}
              </p>
            ) : null}
          </div>

          <div className="flex gap-6 border-t border-white/20 pt-4 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-8">
            {[
              { label: "D", value: timeLeft.days },
              { label: "H", value: timeLeft.hours },
              { label: "M", value: timeLeft.minutes },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <p
                  className="text-2xl text-white sm:text-3xl"
                  style={{ fontFamily: "var(--font-primary)" }}
                >
                  {String(item.value).padStart(2, "0")}
                </p>
                <p className="mt-1 text-[9px] uppercase tracking-[0.3em] text-white/45">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </SceneFrame>
  );
};

export default Hero;
