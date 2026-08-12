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

const RADIUS = 88;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const Countdown: FC<Props> = ({ section, event, theme }) => {
  const { data, id } = section;
  const targetDate = new Date(event.date).getTime();
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

  const dayFraction =
    (timeLeft.hours * 3600 + timeLeft.minutes * 60 + timeLeft.seconds) /
    86400;
  const progress = Math.min(1, Math.max(0, 1 - dayFraction));
  const dashOffset = CIRCUMFERENCE * (1 - progress);

  const subItems = [
    { label: "Sati", value: timeLeft.hours },
    { label: "Minuta", value: timeLeft.minutes },
    { label: "Sekundi", value: timeLeft.seconds },
  ];

  return (
    <section id={id} className="ks-section bg-ks-ivory">
      <div className="ks-container-narrow text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="ks-eyebrow mb-4"
        >
          Odbrojavanje
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="ks-heading mb-14"
          style={{ color: ink }}
        >
          {data.title}
        </motion.h2>

        {/* Progress ring fills through the day cycle, days numeral centered */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="ks-ring-wrap"
        >
          <svg viewBox="0 0 200 200">
            <circle
              className="ks-ring-track"
              cx="100"
              cy="100"
              r={RADIUS}
              fill="none"
              strokeWidth="10"
            />
            <circle
              className="ks-ring-value"
              cx="100"
              cy="100"
              r={RADIUS}
              fill="none"
              strokeWidth="10"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={dashOffset}
            />
          </svg>
          <div className="ks-ring-center">
            <p className="ks-ring-days">
              {String(timeLeft.days).padStart(2, "0")}
            </p>
            <p className="ks-ring-label">Dana</p>
          </div>
        </motion.div>

        <div className="ks-ring-sub">
          {subItems.map((item) => (
            <div key={item.label}>
              <p className="ks-ring-sub__num">
                {String(item.value).padStart(2, "0")}
              </p>
              <p className="ks-ring-sub__label">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Countdown;
