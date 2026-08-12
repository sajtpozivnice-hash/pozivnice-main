"use client";

import { FC, Fragment, useEffect, useState } from "react";
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
    { label: "Dana", value: timeLeft.days },
    { label: "Sati", value: timeLeft.hours },
    { label: "Min", value: timeLeft.minutes },
    { label: "Sek", value: timeLeft.seconds },
  ];

  return (
    <section id={id} className="b18a-section">
      <div className="b18a-shell text-center">
        <p className="b18a-label mb-3">{data.description || "Odbrojavanje"}</p>
        <h2 className="b18a-display mb-8 text-2xl sm:text-3xl">
          {data.title || "Do revije"}
        </h2>
        <div className="b18a-countnum">
          {items.map((item, index) => (
            <Fragment key={item.label}>
              {index > 0 ? <span className="b18a-countnum__sep">/</span> : null}
              <div className="b18a-countnum__cell">
                <span className="b18a-countnum__value">
                  {String(item.value).padStart(2, "0")}
                </span>
                <span className="b18a-muted-label">{item.label}</span>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Countdown;
