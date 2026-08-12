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

const Countdown: FC<Props> = ({ section, event }) => {
  const { data, id } = section;
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
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const items = [
    { label: "DANA", value: timeLeft.days },
    { label: "SATI", value: timeLeft.hours },
    { label: "MINUTA", value: timeLeft.minutes },
    { label: "SEKUNDI", value: timeLeft.seconds },
  ];

  return (
    <section id={id} className="b18-section overflow-hidden">
      {data.imageUrl ? (
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <img
            src={data.imageUrl}
            alt=""
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[var(--b18-bg)]/85" />
        </div>
      ) : null}

      <div className="b18-shell relative z-10">
        <div className="mb-12 text-center">
          <p className="b18-eyebrow mb-4">{data.description}</p>
          <h2 className="b18-heading">{data.title || "DO POČETKA"}</h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="b18-ticker"
        >
          {items.map((item, index) => (
            <div key={item.label} className="b18-ticker__group">
              <div className="b18-ticker__unit">
                <p
                  className="b18-metal text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
                  style={{ fontFamily: "var(--font-primary)" }}
                >
                  {String(item.value).padStart(2, "0")}
                </p>
                <p className="mt-2 text-[10px] font-semibold tracking-[0.28em] text-white/45 uppercase">
                  {item.label}
                </p>
              </div>
              {index < items.length - 1 ? (
                <span className="b18-ticker__sep" aria-hidden>
                  :
                </span>
              ) : null}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Countdown;
