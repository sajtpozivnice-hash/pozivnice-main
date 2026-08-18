"use client";

import { FC, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CountdownSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { formatDate } from "@/helpers/formatDate";
import { LinenMedia } from "../components/Media";

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
  const accent = theme.colors?.base?.primary?.value ?? "#C4A574";
  const ink = theme.colors?.base?.secondary?.value ?? "#2A2420";
  const targetDate = new Date(event.date).getTime();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(EMPTY);
  const hasImage = Boolean(data.imageUrl?.trim());

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
    <section id={id} className="vl-section-tight vl-linen-ground">
      <div className="vl-container text-center">
        {hasImage ? (
          <LinenMedia
            src={data.imageUrl}
            alt={data.title ?? "Odbrojavanje"}
            className="mx-auto mb-8 h-16 w-16 rounded-full sm:h-20 sm:w-20"
          />
        ) : null}

        <p className="vl-eyebrow mb-4" style={{ color: accent }}>
          Odbrojavanje
        </p>
        <h2 className="vl-display-sm" style={{ color: ink }}>
          {data.title}
        </h2>
        <p className="vl-caption mt-4">
          {formatDate(event.date, "DD.MM.YYYY")}
        </p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8 }}
          className="vl-count-row mt-12"
        >
          {cells.map((cell, index) => (
            <div key={cell.label} className="flex items-stretch">
              {index > 0 ? <div className="vl-count-divider" /> : null}
              <div className="vl-count-cell">
                <span className="vl-count-value">
                  {String(cell.value).padStart(2, "0")}
                </span>
                <span className="vl-count-label">{cell.label}</span>
              </div>
            </div>
          ))}
        </motion.div>

        {data.description ? (
          <p className="vl-body mt-10 text-vl-muted">{data.description}</p>
        ) : null}
      </div>
    </section>
  );
};

export default Countdown;
