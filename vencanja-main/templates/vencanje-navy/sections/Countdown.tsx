"use client";

import { FC, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CountdownSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { formatDate } from "@/helpers/formatDate";
import { Media } from "../components/Media";

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
    <section id={id} className="vn-section-tight">
      <div className="vn-shell">
        <div className="mb-10 text-center">
          {hasImage ? (
            <Media
              src={data.imageUrl}
              alt={data.title ?? "Odbrojavanje"}
              className="mx-auto mb-8 h-16 w-16 rounded-full sm:h-20 sm:w-20"
            />
          ) : null}
          <p className="vn-eyebrow">Odbrojavanje</p>
          {data.title ? (
            <h2 className="vn-display-sm mt-4">{data.title}</h2>
          ) : null}
          <p className="vn-caption mt-4">
            {formatDate(event.date, "DD.MM.YYYY")}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8 }}
          className="vn-count-row"
        >
          {cells.map((cell) => (
            <div key={cell.label} className="vn-count-box">
              <span className="vn-count-digit">
                {String(cell.value).padStart(2, "0")}
              </span>
              <span className="vn-count-label">{cell.label}</span>
            </div>
          ))}
        </motion.div>

        {data.description ? (
          <p className="vn-caption mt-8 text-center">{data.description}</p>
        ) : null}
      </div>
    </section>
  );
};

export default Countdown;
