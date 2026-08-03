"use client";

import { FC } from "react";
import styles from "./Rsvp.module.css";
import Confetti from "react-confetti-boom";
import { hsvaToHex } from "@uiw/react-color";
import { Attendance } from "./Rsvp";
import { useConfig } from "../../ConfigContext";
import CloseArrowSvg from "./CloseArrowSvg";

const successMessage = "Vaš dolazak je potvrđen!";
const successMessageDescription =
  "Hvala što delite ovaj poseban trenutak sa nama. Vidimo se uskoro ❤️";

const rejectMessage = "Hvala na odgovoru.";
const rejectMessageDescription =
  "Razumemo i cenimo što ste odvojili vreme da nam se javite. Šaljemo vam puno ljubavi ✨";

interface FormMessageProps {
  onClick: () => void;
  attendance: Attendance;
}

const FormMessage: FC<FormMessageProps> = ({ onClick, attendance }) => {
  const { config } = useConfig();
  console.log(attendance, "attendace");
  return (
    <div
      style={{ color: hsvaToHex(config.main.primaryColor) }}
      className={styles.formMessageContainer}
    >
      <div
        className={styles.formMessageContent}
        style={{ backgroundColor: hsvaToHex(config.main.secondaryColor) }}
      >
        <div onClick={onClick}>
          <CloseArrowSvg
            color={hsvaToHex(config.main.primaryColor)}
            width={30}
            height={30}
          />
        </div>
        <h1
          style={{ color: hsvaToHex(config.main.primaryColor) }}
          className={styles.fontInviteClassic}
        >
          {attendance === Attendance.YES ? successMessage : rejectMessage}
        </h1>
        <p
          style={{ color: hsvaToHex(config.main.primaryColor) }}
          className={`${styles.fontInviteClassic} ${styles.fontSizeP}`}
        >
          {attendance === Attendance.YES
            ? successMessageDescription
            : rejectMessageDescription}
        </p>
      </div>
      {attendance === Attendance.YES && (
        <Confetti
          mode="fall"
          particleCount={50}
          shapeSize={30}
          fadeOutHeight={0.5}
        />
      )}
    </div>
  );
};

export default FormMessage;
