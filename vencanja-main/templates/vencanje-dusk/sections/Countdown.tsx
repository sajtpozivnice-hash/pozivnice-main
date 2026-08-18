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

const ZERO: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

/** Film-strip counter: perforated copper-bordered frames on black. */
const Countdown: FC<Props> = ({ section, event }) => {
  const { data, id } = section;
  const targetDate = new Date(event.date).getTime();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(ZERO);

  useEffect(() => {
    const tick = () => {
      const difference = targetDate - Date.now();
      if (difference <= 0) {
        setTimeLeft(ZERO);
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
    <section id={id} className="vd-section">
      <div className="vd-shell">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="vd-strip"
        >
          <div className="text-center">
            <p className="vd-eyebrow">Odbrojavanje</p>
            <h2 className="vd-title mt-3">{data.title}</h2>
          </div>

          <div className="vd-strip__cells">
            {cells.map((cell, index) => (
              <motion.div
                key={cell.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07 }}
                className="vd-frame-cell"
              >
                <p className="vd-frame-cell__value">
                  {String(cell.value).padStart(2, "0")}
                </p>
                <p className="vd-frame-cell__label">{cell.label}</p>
              </motion.div>
            ))}
          </div>

          {data.description ? (
            <p className="vd-body text-center">{data.description}</p>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
};

export default Countdown;
