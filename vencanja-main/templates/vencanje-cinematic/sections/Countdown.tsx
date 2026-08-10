"use client";

import { FC, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CountdownSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { SceneFrame } from "../components/SceneFrame";

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
  const accent = theme.colors?.base?.primary?.value ?? "#d4a574";
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
    { label: "Dani", value: timeLeft.days },
    { label: "Sati", value: timeLeft.hours },
    { label: "Min", value: timeLeft.minutes },
    { label: "Sek", value: timeLeft.seconds },
  ];

  return (
    <SceneFrame id={id} backgroundImage={data.imageUrl} overlay="heavy">
      <div className="vc-stage-narrow text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="vc-eyebrow mb-5"
          style={{ color: accent }}
        >
          Naslovni kadar
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="vc-title mb-12"
        >
          {data.title}
        </motion.h2>

        <div className="grid grid-cols-2 gap-px bg-white/15 sm:grid-cols-4">
          {items.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07 }}
              className="bg-vc-void/80 px-3 py-8 backdrop-blur-sm"
            >
              <p
                className="text-4xl sm:text-5xl"
                style={{ fontFamily: "var(--font-primary)", color: accent }}
              >
                {String(item.value).padStart(2, "0")}
              </p>
              <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-white/45">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </SceneFrame>
  );
};

export default Countdown;
