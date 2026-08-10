"use client";

import { FC, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CountdownSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";

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

const Countdown: FC<Props> = ({ section, event }) => {
  const { data, id } = section;
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
    { label: "DANA", value: timeLeft.days },
    { label: "SATI", value: timeLeft.hours },
    { label: "MINUTA", value: timeLeft.minutes },
    { label: "SEKUNDI", value: timeLeft.seconds },
  ];

  return (
    <section id={id} className="b18b-section overflow-hidden">
      <div className="b18b-blob b18b-blob--mint b18b-float absolute -left-8 top-8 h-40 w-40" />
      <div className="b18b-blob b18b-blob--peach b18b-float-slow absolute -right-6 bottom-4 h-44 w-44 opacity-50" style={{ background: "radial-gradient(circle at 40% 40%, #ffd5b8, #ffb08a)", opacity: 0.35 }} />

      <div className="b18b-shell relative z-10">
        <div className="mb-10 text-center">
          <p className="b18b-eyebrow mb-3">{data.description}</p>
          <h2 className="b18b-heading">{data.title || "JOŠ MALO…"}</h2>
        </div>

        <div className="b18b-count-grid">
          {items.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07 }}
              className="b18b-count-card"
            >
              <p className="b18b-count-value">
                {String(item.value).padStart(2, "0")}
              </p>
              <p className="b18b-count-label">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Countdown;
