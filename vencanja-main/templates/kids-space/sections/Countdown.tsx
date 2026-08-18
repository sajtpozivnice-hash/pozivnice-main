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
  const { data, id, name } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#FF5C8A";
  const secondary = theme.colors?.base?.secondary?.value ?? "#3D8BFF";
  const mint = theme.colors?.base?.ternary?.value ?? "#2EC4B6";
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

  const items = [
    { label: "Dana", value: timeLeft.days, color: accent },
    { label: "Sati", value: timeLeft.hours, color: secondary },
    { label: "Min", value: timeLeft.minutes, color: mint },
    { label: "Sek", value: timeLeft.seconds, color: "#FBBF24" },
  ];

  return (
    <section id={id} className="kspc-section overflow-hidden">
      <div className="kspc-shell">
        <div className="mb-14 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="kspc-eyebrow mb-4"
          >
            {name}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="kspc-heading"
          >
            {data.title}
          </motion.h2>
          {data.description ? (
            <p className="mt-3 text-white/55">{data.description}</p>
          ) : null}
        </div>

        <div className="relative overflow-hidden rounded-2xl">
          {data.imageUrl ? (
            <img
              src={data.imageUrl}
              alt=""
              className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.14]"
              referrerPolicy="no-referrer"
            />
          ) : null}
          <div className="kspc-orbit-path relative z-10">
            {items.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 150 }}
                className="kspc-orbit-node"
                style={{ "--planet-color": item.color } as CSSProperties}
              >
                <span className="kspc-orbit-node__dot">
                  <span className="kspc-orbit-node__num">
                    {String(item.value).padStart(2, "0")}
                  </span>
                </span>
                <span className="kspc-orbit-node__label">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Countdown;
