"use client";

import { FC, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CountdownSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { OpalMedia } from "../components/Media";

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
  const accent = theme.colors?.base?.primary?.value ?? "#C9A9A0";
  const ink = theme.colors?.base?.secondary?.value ?? "#3A3532";
  const targetDate = new Date(event.date).getTime();
  const hasImage = Boolean(data.imageUrl?.trim());

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

  const items = [
    { label: "Dani", value: timeLeft.days },
    { label: "Sati", value: timeLeft.hours },
    { label: "Min", value: timeLeft.minutes },
    { label: "Sek", value: timeLeft.seconds },
  ];

  return (
    <section id={id} className="vo-section bg-vo-pearl-deep">
      <div className="vo-container text-center">
        {hasImage ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mx-auto mb-8"
          >
            <OpalMedia
              src={data.imageUrl}
              alt={data.title ?? "Odbrojavanje"}
              className="mx-auto h-16 w-16 rounded-full shadow-[0_12px_28px_-14px_rgba(58,53,50,0.35)] sm:h-20 sm:w-20"
            />
          </motion.div>
        ) : null}

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="vo-eyebrow mb-5"
          style={{ color: accent }}
        >
          Odbrojavanje
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="vo-display mb-12"
          style={{ color: ink }}
        >
          {data.title}
        </motion.h2>

        <div className="mx-auto flex max-w-3xl flex-wrap items-stretch justify-center gap-3 sm:gap-5">
          {items.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07 }}
              className="vo-chip min-w-[5.5rem] flex-1 sm:min-w-[7rem]"
              style={{
                transform: `translateY(${index % 2 === 0 ? 0 : 10}px)`,
              }}
            >
              <p
                className="text-3xl sm:text-4xl"
                style={{ fontFamily: "var(--font-primary)", color: accent }}
              >
                {String(item.value).padStart(2, "0")}
              </p>
              <p className="mt-2 text-[10px] uppercase tracking-[0.28em] text-vo-muted">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Countdown;
