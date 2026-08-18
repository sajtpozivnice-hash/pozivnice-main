"use client";

import { FC, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CountdownSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { formatDate } from "@/helpers/formatDate";
import { TerraMedia } from "../components/Media";

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
  const accent = theme.colors?.base?.primary?.value ?? "#C45C26";
  const ink = theme.colors?.base?.secondary?.value ?? "#3D3429";
  const olive = theme.colors?.base?.ternary?.value ?? "#5C6B4A";
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

  const units = [
    { label: "dana", value: timeLeft.days },
    { label: "sati", value: timeLeft.hours },
    { label: "min", value: timeLeft.minutes },
    { label: "sek", value: timeLeft.seconds },
  ];

  return (
    <section id={id} className="vt-section bg-vt-cream">
      <div className="vt-container text-center">
        {hasImage ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mb-8"
          >
            <TerraMedia
              src={data.imageUrl}
              alt={data.title ?? "Odbrojavanje"}
              className="mx-auto h-16 w-16 rounded-full border border-vt-line sm:h-20 sm:w-20"
            />
          </motion.div>
        ) : null}

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="vt-eyebrow mb-4"
          style={{ color: olive }}
        >
          {formatDate(event.date, "D_MMMM_YYYY")}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="vt-display"
          style={{ color: ink }}
        >
          {data.title}
        </motion.h2>
        {data.description ? (
          <p className="vt-body mx-auto mt-4 max-w-md text-vt-muted">
            {data.description}
          </p>
        ) : null}

        <div className="mx-auto mt-12 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {units.map((unit, index) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06, duration: 0.5 }}
              className="vt-pill flex flex-col items-center gap-2 border border-vt-line/60"
            >
              <span
                className="text-3xl leading-none sm:text-4xl"
                style={{ fontFamily: "var(--font-primary)", color: accent }}
              >
                {String(unit.value).padStart(2, "0")}
              </span>
              <span className="text-[10px] uppercase tracking-[0.22em] text-vt-muted">
                {unit.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Countdown;
