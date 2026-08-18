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

const Countdown: FC<Props> = ({ section, event }) => {
  const { data, id } = section;
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
    { label: "Min", value: timeLeft.minutes },
    { label: "Sek", value: timeLeft.seconds },
  ];

  return (
    <section id={id} className="va-section-tight bg-va-paper">
      <div className="va-shell">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="va-eyebrow mb-3">Odbrojavanje</p>
            <h2 className="va-display">{data.title}</h2>
          </div>
          <p className="va-caption">{formatDate(event.date, "DD.MM.YYYY")}</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="va-count"
        >
          {cells.map((cell) => (
            <div key={cell.label} className="va-count-cell">
              <span className="va-count-value">
                {String(cell.value).padStart(2, "0")}
              </span>
              <span className="va-count-label">{cell.label}</span>
            </div>
          ))}
        </motion.div>

        {data.description ? (
          <p className="va-body mt-8 max-w-lg text-va-muted">
            {data.description}
          </p>
        ) : null}
      </div>
    </section>
  );
};

export default Countdown;
