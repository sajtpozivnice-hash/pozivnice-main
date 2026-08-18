"use client";

import { FC, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CountdownSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { formatDate } from "@/helpers/formatDate";

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

const EMPTY: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

const Countdown: FC<Props> = ({ section, event, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#111111";
  const targetDate = new Date(event.date).getTime();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(EMPTY);

  useEffect(() => {
    const tick = () => {
      const difference = targetDate - Date.now();

      if (difference <= 0) {
        setTimeLeft(EMPTY);
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

  const cells = [
    { label: "Dana", value: timeLeft.days },
    { label: "Sati", value: timeLeft.hours },
    { label: "Minuta", value: timeLeft.minutes },
    { label: "Sekundi", value: timeLeft.seconds },
  ];

  return (
    <section id={id} className="vi-section-tight">
      <div className="vi-shell">
        <div className="grid grid-cols-1 items-baseline gap-4 pb-6 sm:grid-cols-12">
          <div className="sm:col-span-7">
            <p className="vi-eyebrow">Odbrojavanje</p>
            <h2 className="vi-display-sm mt-4">{data.title}</h2>
          </div>
          <div className="sm:col-span-5 sm:text-right">
            <p className="vi-caption">{formatDate(event.date, "DD.MM.YYYY")}</p>
          </div>
        </div>

        <div className="vi-accent mb-6" style={{ background: accent }} />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="vi-count"
        >
          {cells.map((cell) => (
            <div key={cell.label} className="vi-count-cell">
              <span className="vi-count-value">
                {String(cell.value).padStart(2, "0")}
              </span>
              <span className="vi-count-label">{cell.label}</span>
            </div>
          ))}
        </motion.div>

        {data.description ? (
          <p className="vi-caption mt-6">{data.description}</p>
        ) : null}
      </div>
    </section>
  );
};

export default Countdown;
