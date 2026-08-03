"use client";

import { DateFormat, formatDate } from "@/helpers/formatDate";
import { useInviteConfig } from "../../InviteConfigContext";
import styles from "./DateFormatPicker.module.css";
const exampleDate = "2026-06-15";

const allDateFormats: DateFormat[] = [
  "DD_MM_YYYY",
  "D_M_YYYY",
  "DD_MM_YY",
  "D_M_YY",
  "DD_MMMM_YYYY",
  "D_MMMM_YYYY",
  "MMMM_D_YYYY",
  "D_MMM_YYYY",
  "DD_MMM_YYYY",
  "YYYY_MM_DD",
  "YYYY_M_D",
  "DD_SLASH_MM_YYYY",
  "D_SLASH_M_YYYY",
  "DD_DOT_MM_DOT_YYYY",
  "D_DOT_M_DOT_YYYY",
  "DAY_D_MMMM_YYYY",
  "DAY_D_MMM_YYYY",
  "DAY_DD_MM_YYYY",
  "MMM_D_YYYY",
  "MMM_D_YY",
  "DD-MMM-YYYY",
  "D-MMM-YYYY",
  "DD/MM/YYYY",
  "D/M/YYYY",
  "DD.MM.YYYY",
  "D.M.YYYY",
  "YYYY.MM.DD",
  "YYYY/MM/DD",
  "YYYY-M-D",
];

const uniqueFormats = Array.from(
  new Map(allDateFormats.map((f) => [formatDate(exampleDate, f), f])).values(),
);

const DateFormatPicker = () => {
  const { config, setConfig } = useInviteConfig();

  return (
    <select
      value={config.main.dateFormat}
      onChange={(e) =>
        setConfig({
          ...config,
          main: {
            ...config.main,
            dateFormat: e.target.value as DateFormat,
          },
        })
      }
      className={styles.selectStyle}
    >
      {uniqueFormats.map((format) => (
        <option key={format} value={format}>
          {formatDate(exampleDate, format)}
        </option>
      ))}
    </select>
  );
};

export default DateFormatPicker;
