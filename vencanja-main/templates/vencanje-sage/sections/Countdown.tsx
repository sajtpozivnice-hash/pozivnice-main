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

const Countdown: FC<Props> = ({ section, event, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#6b7f6a";
  const ink = theme.colors?.base?.secondary?.value ?? "#2c2a26";
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

  const pills = [
    { label: "dana", value: timeLeft.days },
    { label: "sati", value: timeLeft.hours },
    { label: "minuta", value: timeLeft.minutes },
    { label: "sekundi", value: timeLeft.seconds },
  ];

  return (
    <section id={id} className="vs-section-tight bg-vs-oat">
      <div className="vs-container-narrow text-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="vs-eyebrow mb-4"
          style={{ color: accent }}
        >
          {formatDate(event.date, "D_MMMM_YYYY")}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl leading-tight sm:text-5xl"
          style={{ fontFamily: "var(--font-primary)", color: ink }}
        >
          {data.title}
        </motion.h2>
        {data.description ? (
          <p className="vs-body mx-auto mt-4 max-w-md text-vs-muted">
            {data.description}
          </p>
        ) : null}

        <div className="mt-10 flex flex-wrap justify-center gap-3 sm:gap-4">
          {pills.map((pill, index) => (
            <motion.div
              key={pill.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="min-w-[4.5rem] border border-vs-line bg-vs-linen px-4 py-5 sm:min-w-[5.5rem]"
            >
              <p
                className="text-3xl tabular-nums sm:text-4xl"
                style={{ fontFamily: "var(--font-primary)", color: ink }}
              >
                {String(pill.value).padStart(2, "0")}
              </p>
              <p className="mt-2 text-[12px] uppercase tracking-[0.24em] text-vs-muted sm:text-[13px]">
                {pill.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Countdown;
