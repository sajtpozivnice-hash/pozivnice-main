"use client";

import { FC, useEffect, useMemo, useState } from "react";
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
  const targetDate = useMemo(
    () => new Date(event.date).getTime(),
    [event.date],
  );
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

  const hms = [
    { label: "H", value: timeLeft.hours },
    { label: "M", value: timeLeft.minutes },
    { label: "S", value: timeLeft.seconds },
  ];

  return (
    <section id={id} className="ed-section ed-count">
      <div className="ed-grain" aria-hidden />
      <div className="ed-shell relative z-10">
        <p className="ed-label text-white/70">{data.description || "ODBROJAVANJE"}</p>
        <h2 className="ed-display mt-3 text-4xl text-white sm:text-5xl lg:text-6xl">
          {data.title || "DO IZLASKA IZDANJA"}
        </h2>

        {/* Magazine T-minus — one oversized DAYS headline, tiny HH:MM:SS strip beneath */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="ed-tminus"
        >
          <span className="ed-tminus__prefix">T&minus;</span>
          <span className="ed-tminus__days">{timeLeft.days}</span>
          <span className="ed-tminus__unit">DANA</span>
        </motion.div>

        <div className="ed-tminus__strip">
          {hms.map((item, index) => (
            <span className="ed-tminus__chip" key={item.label}>
              <b>{String(item.value).padStart(2, "0")}</b>
              {item.label}
              {index < hms.length - 1 ? (
                <i className="ed-tminus__colon">:</i>
              ) : null}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Countdown;
