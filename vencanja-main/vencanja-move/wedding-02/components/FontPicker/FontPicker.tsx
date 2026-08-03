"use client";
import { fonts } from "@/fontsForInvites";
import { FC } from "react";
import styles from "./FontPicker.module.css";

interface Props {
  value: keyof typeof fonts;
  onChange: (key: keyof typeof fonts) => void;
}

const FontPicker: FC<Props> = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as keyof typeof fonts)}
      className={styles.selectStyle}
    >
      {Object.entries(fonts).map(([key, font]) => (
        <option
          key={key}
          value={key}
          style={{ fontFamily: font.style.fontFamily }}
        >
          {key}
        </option>
      ))}
    </select>
  );
};

export default FontPicker;
