"use client";

import { FC, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CountdownSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { SceneShell } from "../components/SceneShell";

type Props = {
  section: CountdownSection;
  event: EventConfig;
  theme: ThemeConfig;
};

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const Countdown: FC<Props> = ({ section, event, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#c9a86a";
  const targetDate = new Date(event.date).getTime();

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

  const items = [
    { label: "Dana", value: timeLeft.days },
    { label: "Sati", value: timeLeft.hours },
    { label: "Minuta", value: timeLeft.minutes },
    { label: "Sekundi", value: timeLeft.seconds },
  ];

  return (
    <SceneShell
      id={id}
      backgroundImage={data.imageUrl}
      overlay="dark"
    >
      <div className="v4-content-narrow text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="v4-eyebrow mb-5"
          style={{ color: accent }}
        >
          Odbrojavanje
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="v4-heading mb-4"
        >
          {data.title}
        </motion.h2>
        {data.description ? (
          <p className="mb-12 text-sm text-white/60">{data.description}</p>
        ) : (
          <div className="v4-line mb-12" />
        )}

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {items.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="v4-glass-strong px-3 py-8"
            >
              <p
                className="text-4xl text-white sm:text-5xl"
                style={{
                  fontFamily: "var(--font-primary)",
                  color: accent,
                }}
              >
                {String(item.value).padStart(2, "0")}
              </p>
              <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-white/50">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </SceneShell>
  );
};

export default Countdown;
