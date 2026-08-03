"use client";

import { useState } from "react";
import styles from "../css/Components.module.css";
import { boxShadow } from "../constants";
import BorderBottom from "./BorderBottom";
import { hsvaToHex } from "@uiw/react-color";
import { useInviteConfig } from "../InviteConfigContext";
import FormMessage from "./FormMessage";
import { fonts } from "@/fontsForInvites";

export enum Attendance {
  EMPTY = "",
  YES = "yes",
  NO = "no",
}

const RsvpForm = () => {
  const { config } = useInviteConfig();
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    attending: Attendance.EMPTY,
    guests: "1",
    message: "",
  });

  const placeholderStyle = `
    .dynamic-input {
      font-size: 16px;
    }
    .dynamic-input::placeholder {
      color: ${hsvaToHex(config.main.primaryColor)};
      font-family: ${fonts[config.main.font].style.fontFamily};
      font-size: 16px;
    }
  `;

  return (
    <div
      id="confirmation"
      className={styles.cardStyle}
      style={{
        backgroundColor: hsvaToHex(config.main.secondaryColor),
        color: hsvaToHex(config.main.primaryColor),
        ...boxShadow(hsvaToHex(config.main.primaryColor)),
      }}
    >
      <BorderBottom />
      <h2
        className={`${styles.fontSizeH2} ${styles.editable} ${styles.fontInviteClassic}`}
        style={{ color: hsvaToHex(config.main.primaryColor) }}
      >
        Da li se vidimo?
      </h2>
      <div className={styles.formContainer}>
        <style>{placeholderStyle}</style>
        <input
          name="name"
          className={`${styles.inputStyle} dynamic-input`}
          type="text"
          placeholder="Ime i Prezime"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          style={{
            color: hsvaToHex(config.main.primaryColor),
            background: hsvaToHex(config.main.secondaryColor),
            ...boxShadow(hsvaToHex(config.main.primaryColor)),
            fontFamily: fonts[config.main.font].style.fontFamily,
          }}
        />
        <select
          className={`${styles.selectStyle} dynamic-input`}
          id="attendance"
          value={formData.attending}
          onChange={(e) =>
            setFormData({
              ...formData,
              attending: e.target.value as Attendance,
            })
          }
          style={{
            padding: "12px",
            borderRadius: "8px",
            fontSize: "16px",
            fontFamily: fonts[config.main.font].style.fontFamily,
            color: hsvaToHex(config.main.primaryColor),
            background: hsvaToHex(config.main.secondaryColor),
            ...boxShadow(hsvaToHex(config.main.primaryColor)),
          }}
        >
          <option value="" disabled>
            Da li se vidimo
          </option>
          <option value="yes">Da, vidimo se</option>
          <option value="no">Nažalost, ne dolazimo</option>
        </select>
        <input
          name="guestNumber"
          type="number"
          placeholder="Broj Gostiju"
          value={formData.guests}
          onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
          className={`${styles.inputStyle} dynamic-input`}
          style={{
            color: hsvaToHex(config.main.primaryColor),
            background: hsvaToHex(config.main.secondaryColor),
            ...boxShadow(hsvaToHex(config.main.primaryColor)),
          }}
        />
        <textarea
          className={`${styles.inputStyle} dynamic-input`}
          name="message"
          rows={8}
          placeholder="Poruka..."
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          style={{
            color: hsvaToHex(config.main.primaryColor),
            background: hsvaToHex(config.main.secondaryColor),
            ...boxShadow(hsvaToHex(config.main.primaryColor)),
          }}
        />
        <button
          className={styles.button}
          onClick={() => setVisible(true)}
          style={{
            color: hsvaToHex(config.main.primaryColor),
            background: hsvaToHex(config.main.secondaryColor),
            ...boxShadow(hsvaToHex(config.main.primaryColor)),
            fontFamily: fonts[config.main.font].style.fontFamily,
          }}
        >
          Pošalji potvrdu
        </button>
      </div>
      {visible && (
        <FormMessage
          onClick={() => setVisible(false)}
          attendance={formData.attending}
        />
      )}
      <BorderBottom />
    </div>
  );
};

export default RsvpForm;
