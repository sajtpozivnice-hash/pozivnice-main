"use client";

import { FC, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CountdownSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { GlassPanel } from "../components/GlassPanel";

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
  const accent = theme.colors?.base?.primary?.value ?? "#e2c4a0";
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
    <section id={id} className="vb-section">
      <div className="vb-wrap-narrow">
        <GlassPanel strong className="px-6 py-10 text-center sm:px-10 sm:py-12">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="vb-eyebrow mb-4"
            style={{ color: accent }}
          >
            Odbrojavanje
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="vb-title mb-10"
          >
            {data.title}
          </motion.h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {items.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="rounded-2xl border border-white/15 bg-black/15 px-2 py-6"
              >
                <p
                  className="text-3xl sm:text-4xl"
                  style={{ fontFamily: "var(--font-primary)", color: accent }}
                >
                  {String(item.value).padStart(2, "0")}
                </p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.24em] text-white/50">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>
        </GlassPanel>
      </div>
    </section>
  );
};

export default Countdown;
