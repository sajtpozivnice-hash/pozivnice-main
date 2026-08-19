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
    { label: "Dana", value: timeLeft.days, bg: "var(--color-kcart-tomato)" },
    { label: "Sati", value: timeLeft.hours, bg: "var(--color-kcart-blue)" },
    { label: "Min", value: timeLeft.minutes, bg: "var(--color-kcart-sun)" },
    { label: "Sek", value: timeLeft.seconds, bg: "var(--color-kcart-mint)" },
  ];

  return (
    <section id={id} className="kcart-section">
      <div className="kcart-shell text-center">
        <p className="kcart-eyebrow mb-4">Odbrojavanje</p>
        <h2 className="kcart-heading">{data.title}</h2>
        {data.description ? (
          <p className="kcart-body mx-auto mt-3 max-w-md">{data.description}</p>
        ) : null}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
        >
          {cells.map((cell) => (
            <div
              key={cell.label}
              className="rounded-[1.5rem] border-[3.5px] border-[var(--color-kcart-ink)] px-3 py-5"
              style={{
                background: cell.bg,
                boxShadow: "4px 4px 0 0 var(--color-kcart-ink)",
              }}
            >
              <p
                className="text-3xl font-black tabular-nums sm:text-4xl"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                {String(cell.value).padStart(2, "0")}
              </p>
              <p className="mt-2 text-[10px] font-black uppercase tracking-[0.2em]">
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
