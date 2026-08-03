"use client";

import React, { useState, useEffect } from "react";
import { useConfig } from "../ConfigContext";

export const Countdown: React.FC = () => {
  const { config } = useConfig();
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +new Date(config.main.date) - +new Date();
    let timeLeft = {
      dana: 0,
      sati: 0,
      minuta: 0,
      sekundi: 0,
    };

    if (difference > 0) {
      timeLeft = {
        dana: Math.floor(difference / (1000 * 60 * 60 * 24)),
        sati: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minuta: Math.floor((difference / 1000 / 60) % 60),
        sekundi: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-retro-yellow border-y-2 border-retro-brown py-12 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {Object.entries(timeLeft).map(([unit, value], idx) => (
            <div
              key={unit}
              className={`flex flex-col items-center transform ${idx % 2 === 0 ? "rotate-2" : "-rotate-2"}`}
            >
              <div className="bg-retro-cream border-2 border-retro-brown shadow-hard p-4 md:p-8 min-w-[100px] md:min-w-[140px] text-center rounded-lg">
                <span className="font-serif text-4xl md:text-6xl text-retro-brown">
                  {String(value).padStart(2, "0")}
                </span>
              </div>
              <span className="font-sans font-bold uppercase tracking-black mt-4 bg-retro-brown text-retro-cream px-3 py-1 rounded-full text-xs">
                {unit}
              </span>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <p className="font-serif text-2xl italic">
            {config.countdown.description}
          </p>
        </div>
      </div>
    </div>
  );
};
