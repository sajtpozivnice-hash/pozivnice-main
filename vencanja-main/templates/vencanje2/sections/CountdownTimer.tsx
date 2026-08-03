import React, { useState, useEffect } from "react";
export const WEDDING_DATE = new Date("2026-06-20T16:00:00");

export const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = WEDDING_DATE.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-4 md:gap-8 justify-center items-center py-8">
      {[
        { label: "Days", value: timeLeft.days },
        { label: "Hours", value: timeLeft.hours },
        { label: "Min", value: timeLeft.minutes },
        { label: "Sec", value: timeLeft.seconds },
      ].map((item, idx) => (
        <div key={idx} className="text-center">
          <div className="text-3xl md:text-5xl font-display text-wedding-gold mb-1">
            {String(item.value).padStart(2, "0")}
          </div>
          <div className="text-[10px] uppercase tracking-widest text-wedding-ink/60 font-medium">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
};
