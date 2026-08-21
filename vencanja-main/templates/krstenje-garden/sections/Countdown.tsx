"use client";

import { CSSProperties, FC, useEffect, useState } from "react";
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
  const accent = theme.colors?.base?.primary?.value;
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

  const sage = accent ?? "var(--color-kg-champagne, #5b7d52)";
  const items = [
    { label: "Dana", value: timeLeft.days, color: sage },
    { label: "Sati", value: timeLeft.hours, color: sage },
    { label: "Minuta", value: timeLeft.minutes, color: sage },
    { label: "Sekundi", value: timeLeft.seconds, color: sage },
  ];

  return (
    <section id={id} className="kg-section bg-kg-ivory">
      <div className="kg-container-narrow text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="kg-eyebrow mb-4 justify-center"
        >
          Odbrojavanje
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="kg-heading mb-14"
          style={{ color: ink }}
        >
          {data.title}
        </motion.h2>

        {/* Horizontal string of beads — value sits inside each bead, connected by a dashed vine */}
        <div className="kg-bead-row">
          {items.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="flex flex-col items-center"
            >
              <span
                className="kg-bead"
                style={{ "--bead-color": item.color } as CSSProperties}
              >
                <span className="kg-bead__num">
                  {String(item.value).padStart(2, "0")}
                </span>
              </span>
              <p className="kg-bead-label">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Countdown;
