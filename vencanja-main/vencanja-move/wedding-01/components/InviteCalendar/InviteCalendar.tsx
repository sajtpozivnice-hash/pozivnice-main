"use client";

import { generateCalendar } from "@/helpers/generateCalendar";
import styles from "./InviteCalendar.module.css";
import Secondstyles from "../../css/Components.module.css";
import { useInviteConfig } from "../../InviteConfigContext";
import { hsvaToHex } from "@uiw/react-color";

const InviteCalendar = () => {
  const { config } = useInviteConfig();

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
        background: hsvaToHex(config.main.secondaryColor),
        color: hsvaToHex(config.main.primaryColor),
      }}
    >
      <h1
        style={{
          color: hsvaToHex(config.main.primaryColor),
          fontFamily: `var(--font)`,
        }}
        className={`${Secondstyles.fontSizeH2} ${Secondstyles.marginBottom15} `}
      >
        {formatted}
      </h1>
      <div className={styles.calendarGrid}>
        {["Pon", "Uto", "Sre", "Čet", "Pet", "Sub", "Ned"].map((d) => (
          <div key={d} className={styles.calendarHeader}>
            {d}
          </div>
        ))}
        {calendar.map((day, index) => (
          <div
            key={index}
            style={{
              background: !day.currentMonth
                ? "#ccc"
                : hsvaToHex(config.main.primaryColor),
              opacity: !day.currentMonth ? 0.3 : 1,
              fontWeight: day.isEventDay ? "900" : "normal",
              border: `1px solid ${hsvaToHex(config.main.primaryColor)}`,
            }}
            className={styles.calendarCell}
          >
            {day.isEventDay && (
              <div
                className={styles.heart}
                style={{
                  background: hsvaToHex(config.main.secondaryColor),
                }}
              />
            )}
            <p
              style={{
                color: day.isEventDay
                  ? hsvaToHex(config.main.primaryColor)
                  : hsvaToHex(config.main.secondaryColor),
                zIndex: 1000,
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
