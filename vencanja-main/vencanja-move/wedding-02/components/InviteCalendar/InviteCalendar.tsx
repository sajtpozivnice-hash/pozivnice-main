"use client";

import { generateCalendar } from "@/helpers/generateCalendar";
import styles from "./InviteCalendar.module.css";
import { useConfig } from "../../ConfigContext";
import { hsvaToHex } from "@uiw/react-color";
import { fonts } from "@/fontsForInvites";

const InviteCalendar = () => {
  const { config } = useConfig();
  const eventDate = new Date(config.main.date);
  const calendar = generateCalendar(eventDate);
  const formatted = new Intl.DateTimeFormat("sr-Latn-RS", {
    month: "long",
    year: "numeric",
  }).format(eventDate);
  return (
    <div
      className={styles.wrapper}
      style={{
        background: hsvaToHex(config.main.primaryColor),
        color: hsvaToHex(config.main.secondaryColor),
      }}
    >
      <h1
        style={{
          color: hsvaToHex(config.main.secondaryColor),
          fontFamily: fonts[config.main.primaryFont].style.fontFamily,
          textAlign: "center",
        }}
        className={`${styles.heading}`}
      >
        {formatted}
      </h1>
      <div className={styles.calendarGrid}>
        {["Pon", "Uto", "Sre", "Čet", "Pet", "Sub", "Ned"].map((d) => (
          <div
            key={d}
            className={styles.calendarHeader}
            style={{
              fontFamily: fonts[config.main.primaryFont].style.fontFamily,
            }}
          >
            {d}
          </div>
        ))}
        {calendar.map((day, index) => (
          <div
            key={index}
            style={{
              background: hsvaToHex(config.main.secondaryColor),
              opacity: !day.currentMonth ? 0.5 : 1,

              fontWeight: day.isEventDay ? "900" : "normal",
              border: `1px solid ${hsvaToHex(config.main.primaryColor)}`,
            }}
            className={styles.calendarCell}
          >
            {day.isEventDay && (
              <div
                className={styles.heart}
                style={{
                  background: hsvaToHex(config.main.primaryColor),
                }}
              />
            )}
            <p
              style={{
                color: day.isEventDay
                  ? hsvaToHex(config.main.secondaryColor)
                  : hsvaToHex(config.main.primaryColor),
                zIndex: 1000,
                fontFamily: fonts[config.main.secondaryFont].style.fontFamily,
              }}
            >
              {day.day}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InviteCalendar;
