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

  const waypoints = [
    { label: "Sati", value: timeLeft.hours, color: secondary },
    { label: "Min", value: timeLeft.minutes, color: mint },
    { label: "Sek", value: timeLeft.seconds, color: "#A4552C" },
  ];
  const compassAngle = (timeLeft.days % 30) * 12;

  return (
    <section id={id} className="ksaf-section overflow-hidden">
      <div className="ksaf-shell">
        <div className="mb-12 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="ksaf-eyebrow mb-4"
          >
            {name}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="ksaf-heading"
          >
            {data.title}
          </motion.h2>
          {data.description ? (
            <p className="mt-3 text-black/55">{data.description}</p>
          ) : null}
        </div>

        <div className="ksaf-card-strong relative overflow-hidden px-4 py-10 sm:px-10">
          {data.imageUrl ? (
            <img
              src={data.imageUrl}
              alt=""
              className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.12]"
              referrerPolicy="no-referrer"
            />
          ) : null}
          <div className="ksaf-map relative z-10">
            {/* Compass reads the day count as a heading, not another grid cell */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="ksaf-compass"
              style={{ "--trail-color": accent } as CSSProperties}
            >
              <span className="ksaf-compass-tick ksaf-compass-tick--n">N</span>
              <span className="ksaf-compass-tick ksaf-compass-tick--e">E</span>
              <span className="ksaf-compass-tick ksaf-compass-tick--s">S</span>
              <span className="ksaf-compass-tick ksaf-compass-tick--w">W</span>
              <span
                className="ksaf-compass-needle"
                style={{ transform: `rotate(${compassAngle}deg)` }}
              />
              <div className="ksaf-compass-plate">
                <p className="ksaf-compass-days">{timeLeft.days}</p>
                <p className="ksaf-compass-label">Dana</p>
              </div>
            </motion.div>

            {/* Trail markers zig-zag toward the destination instead of sitting in a straight row */}
            <div className="ksaf-waypoints">
              {waypoints.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="ksaf-waypoint"
                  style={
                    {
                      "--trail-color": item.color,
                      "--offset": index % 2 === 0 ? "-0.9rem" : "0.9rem",
                    } as CSSProperties
                  }
                >
                  <span className="ksaf-waypoint-pin">{index + 1}</span>
                  <p className="ksaf-waypoint-value">
                    {String(item.value).padStart(2, "0")}
                  </p>
                  <p className="ksaf-waypoint-label">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Countdown;
