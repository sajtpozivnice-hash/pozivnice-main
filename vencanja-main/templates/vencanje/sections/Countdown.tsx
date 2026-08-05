"use client";

import { EventConfig, ThemeConfig } from "@/types/config";
import { CountdownSection } from "@/types/sections";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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

const Countdown: React.FC<Props> = ({ section, event, theme }) => {
  const { data, id } = section;
  const { date } = event;
  const { colors } = theme;
  const targetDate = new Date(date).getTime();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

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

  const items = [
    { label: "Dana", value: timeLeft.days },
    { label: "Sati", value: timeLeft.hours },
    { label: "Minuta", value: timeLeft.minutes },
    { label: "Sekundi", value: timeLeft.seconds },
  ];

  return (
    <section
      id={id}
      className="section-padding relative overflow-hidden bg-white"
    >
      {data.imageUrl ? (
        <div className="section-bg opacity-[0.08]">
          <img src={data.imageUrl} alt="" referrerPolicy="no-referrer" />
        </div>
      ) : null}

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 font-display text-4xl md:text-5xl"
          style={{ color: colors?.base?.secondary?.value }}
        >
          {data.title}
        </motion.h2>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {items.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center"
            >
              <div
                style={{ borderColor: colors?.base?.primary?.value }}
                className="mb-4 flex h-24 w-24 items-center justify-center rounded-full border bg-wedding-cream/30 md:h-32 md:w-32"
              >
                <span
                  style={{ color: colors?.base?.primary?.value }}
                  className="font-serif text-3xl md:text-4xl"
                >
                  {String(item.value).padStart(2, "0")}
                </span>
              </div>
              <span
                style={{ color: colors?.base?.primary?.value }}
                className="text-xs font-semibold tracking-widest uppercase opacity-60"
              >
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Countdown;
