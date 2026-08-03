"use client";

import { FC } from "react";
import { generateCalendar } from "@/helpers/generateCalendar";
import { useConfig } from "../ConfigContext";

interface InviteCalendarProps {
  date: string;
  color: string;
  background: string;
  font: string;
}

const InviteCalendar: FC<InviteCalendarProps> = ({
  date,
  color,
  background,
  font,
}) => {
  const { config } = useConfig();
  const eventDate = new Date(config.main.date);
  const calendar = generateCalendar(eventDate);
  const formatted = new Intl.DateTimeFormat("sr-Latn-RS", {
    month: "long",
    year: "numeric",
  }).format(eventDate);

  return (
    <section
      className="py-24 px-4 bg-retro-cream relative overflow-hidden"
      style={{ background, color }}
    >
      <div
        style={{ background: "#fff" }}
        className="max-w-4xl mx-auto relative z-10 border-2 border-retro-brown rounded-lg p-4 md:p-8"
      >
        <h1
          className="text-center font-bold text-2xl mb-4 text-retro-brown"
          style={{ fontFamily: "var(--font)" }}
        >
          {formatted}
        </h1>

        <div className="grid grid-cols-7 gap-[6px] p-5">
          {["Pon", "Uto", "Sre", "Čet", "Pet", "Sub", "Ned"].map((d) => (
            <div
              key={d}
              className="text-center font-bold opacity-90 text-[20px] text-retro-brown"
            >
              {d}
            </div>
          ))}

          {calendar.map((day, index) => (
            <div
              key={index}
              className="relative h-12 flex items-center justify-center rounded-lg border"
              style={{
                background: !day.currentMonth ? "#ccc" : background,
                opacity: !day.currentMonth ? 0.3 : 1,
                fontWeight: day.isEventDay ? "900" : "normal",
                borderColor: color,
              }}
            >
              {day.isEventDay && (
                <div
                  className="absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2 rotate-[-45deg]
                           animate-heartPulse shadow-lg"
                  style={{
                    background: color,
                    top: "50%",
                    left: "50%",
                  }}
                >
                  <span
                    className="absolute w-6 h-6 rounded-full top-[-12px] left-0"
                    style={{ background: "inherit" }}
                  />
                  <span
                    className="absolute w-6 h-6 rounded-full top-0 left-[12px]"
                    style={{ background: "inherit" }}
                  />
                </div>
              )}

              <p
                className="relative z-10 text-retro-brown font-bold"
                style={{
                  color: day.isEventDay ? background : color,
                }}
              >
                {day.day}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InviteCalendar;
