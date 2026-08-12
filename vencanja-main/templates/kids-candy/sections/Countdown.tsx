"use client";

import { CSSProperties, FC, useEffect, useState } from "react";
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

const BARS = [2, 1, 3, 1, 2, 3, 1, 2, 1, 3, 1, 1, 2, 3, 1, 2, 1, 3];

const Countdown: FC<Props> = ({ section, event, theme }) => {
  const { data, id, name } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#FF5C8A";
  const secondary = theme.colors?.base?.secondary?.value ?? "#3D8BFF";
  const mint = theme.colors?.base?.ternary?.value ?? "#2EC4B6";
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

  const stubStats = [
    { label: "Sati", value: timeLeft.hours, color: secondary },
    { label: "Min", value: timeLeft.minutes, color: mint },
    { label: "Sek", value: timeLeft.seconds, color: "#FFD400" },
  ];

  return (
    <section id={id} className="kcan-section overflow-hidden">
      <div className="kcan-shell">
        <div className="mb-12 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="kcan-eyebrow mb-4"
          >
            {name}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="kcan-heading"
          >
            {data.title}
          </motion.h2>
          {data.description ? (
            <p className="mt-3 text-black/55">{data.description}</p>
          ) : null}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="kcan-admit"
        >
          <div className="kcan-admit-main">
            <span className="kcan-admit-eyebrow">Do rođendana</span>
            <p className="kcan-admit-hero" style={{ color: accent }}>
              {String(timeLeft.days).padStart(2, "0")}
            </p>
            <p className="kcan-admit-hero-label">Dana</p>
          </div>

          <div className="kcan-admit-tear" aria-hidden="true" />

          <div className="kcan-admit-stub">
            <p className="kcan-admit-stub-title">Ulaznica</p>
            <div className="kcan-admit-stub-row">
              {stubStats.map((item) => (
                <div key={item.label} className="kcan-admit-stub-cell">
                  <p
                    className="kcan-admit-stub-num"
                    style={{ color: item.color } as CSSProperties}
                  >
                    {String(item.value).padStart(2, "0")}
                  </p>
                  <p className="kcan-admit-stub-lbl">{item.label}</p>
                </div>
              ))}
            </div>
            <div className="kcan-admit-barcode" aria-hidden="true">
              {BARS.map((weight, index) => (
                <span key={index} style={{ width: `${weight}px` }} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Countdown;
