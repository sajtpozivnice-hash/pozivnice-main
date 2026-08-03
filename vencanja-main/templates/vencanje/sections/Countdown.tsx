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

const Countdown: React.FC<Props> = ({ section, event, theme }) => {
  const { data, id } = section;
  const { date } = event;
  const { colors } = theme;
  const targetDate = new Date(date).getTime();
  const [timeLeft, setTimeLeft] = useState<any>({
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
      className="section-padding bg-white relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-display mb-12"
          style={{ color: colors?.base?.secondary?.value }}
        >
          {data.title}
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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
                className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-wedding-gold/20 flex items-center justify-center mb-4 bg-wedding-cream/30"
              >
                <span
                  style={{ color: colors?.base?.primary?.value }}
                  className="text-3xl md:text-4xl font-serif text-wedding-gold"
                >
                  {String(item.value).padStart(2, "0")}
                </span>
              </div>
              <span
                style={{ color: colors?.base?.primary?.value }}
                className="uppercase tracking-widest text-xs font-semibold opacity-60"
              >
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="absolute top-0 left-0 w-64 h-64 bg-wedding-gold/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-wedding-gold/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
    </section>
  );
};

export default Countdown;
