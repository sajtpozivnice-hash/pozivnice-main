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

const Countdown: FC<Props> = ({ section, event, theme }) => {
  const { data, id } = section;
  const targetDate = new Date(event.date).getTime();
  const accent = theme.colors?.base?.primary?.value;
  const ink = theme.colors?.base?.secondary?.value;

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const difference = targetDate - Date.now();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const votives = [
    { label: "Sati", value: timeLeft.hours, color: "#e6c48a" },
    { label: "Minuta", value: timeLeft.minutes, color: "#d1a15c" },
    { label: "Sekundi", value: timeLeft.seconds, color: "#f3d9a8" },
  ];

  return (
    <section id={id} className="kd-section bg-kd-ivory">
      <div className="kd-container-narrow text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="kd-eyebrow mb-4"
        >
          Odbrojavanje
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="kd-heading mb-14"
          style={{ color: ink }}
        >
          {data.title}
        </motion.h2>

        {/* Vigil — one tall pillar candle burning down the day count, small votives for H:M:S */}
        <div className="kd-vigil">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="kd-vigil-pillar"
            style={{ "--flame-color": accent ?? "#d1a15c" } as CSSProperties}
          >
            <span className="kd-vigil-pillar__flame" />
            <span className="kd-vigil-pillar__wax">
              <span className="kd-vigil-pillar__num">{timeLeft.days}</span>
              <span className="kd-vigil-pillar__label">Dana do obreda</span>
            </span>
          </motion.div>

          <div className="kd-vigil-votives">
            {votives.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="kd-vigil-votive"
                style={{ "--flame-color": item.color } as CSSProperties}
              >
                <span className="kd-vigil-votive__flame" />
                <p className="kd-vigil-votive__num">
                  {String(item.value).padStart(2, "0")}
                </p>
                <p className="kd-vigil-votive__label">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Countdown;
