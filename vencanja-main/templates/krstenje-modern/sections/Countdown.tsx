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

  return (
    <section id={id} className="km-section bg-km-ivory">
      <div className="km-container-narrow text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="km-eyebrow mb-4"
        >
          Odbrojavanje
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="km-heading mb-14"
          style={{ color: ink }}
        >
          {data.title}
        </motion.h2>

        {/* Typographic T-minus headline — one large days figure, small HH:MM:SS beneath */}
        <div className="km-tminus">
          <div className="km-tminus-row">
            <span className="km-tminus-prefix">T&minus;</span>
            <span className="km-tminus-days">{timeLeft.days}</span>
            <span className="km-tminus-unit">dana</span>
          </div>
          <p className="km-tminus-sub">
            <b>{String(timeLeft.hours).padStart(2, "0")}</b>
            <span>h</span>
            <b>{String(timeLeft.minutes).padStart(2, "0")}</b>
            <span>m</span>
            <b>{String(timeLeft.seconds).padStart(2, "0")}</b>
            <span>s</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Countdown;
