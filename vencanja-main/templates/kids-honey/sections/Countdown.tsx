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
    <section id={id} className="khny-section">
      <div className="khny-shell text-center">
        <p className="khny-lid mx-auto mb-5">Odbrojavanje</p>
        <h2 className="khny-heading">{data.title}</h2>
        {data.description ? (
          <p className="khny-body mx-auto mt-3 max-w-md">{data.description}</p>
        ) : null}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-10 grid max-w-lg grid-cols-4 gap-2 sm:gap-4"
        >
          {cells.map((cell) => (
            <div key={cell.label} className="khny-hex px-1 py-4 sm:py-6">
              <p
                className="text-xl font-bold tabular-nums sm:text-3xl"
                style={{ fontFamily: "var(--font-secondary)" }}
              >
                {String(cell.value).padStart(2, "0")}
              </p>
              <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.16em] sm:text-[10px]">
                {cell.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Countdown;
