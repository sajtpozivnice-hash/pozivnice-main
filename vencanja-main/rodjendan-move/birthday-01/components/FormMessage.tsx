"use client";

import { FC } from "react";
import { Attendance } from "./RSVP";
import Confetti from "react-confetti-boom";
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
  return (
    <div
      className="fixed inset-0 z-[1000] bg-black/70 p-5"
      style={{ color: "#000" }}
    >
      <div
        className="
          absolute left-1/2 top-1/2 w-full max-w-[500px]
          -translate-x-1/2 -translate-y-1/2
          rounded-[30px] p-[80px_30px]
          flex flex-col gap-2
          shadow-[-2px_-2px_18px_-2px_#fff]
          max-[500px]:w-[90%]
        "
        style={{ backgroundColor: "#fff" }}
      >
        <button onClick={onClick} className="self-start">
          <CloseArrowSvg color={"#000"} width={30} height={30} />
        </button>

        <h1
          className="font-inviteClassic"
          style={{ color: "#000", fontSize: "32px", fontWeight: "bold" }}
        >
          {attendance === Attendance.YES ? successMessage : rejectMessage}
        </h1>

        <p
          className="font-inviteClassic text-base"
          style={{ color: "#000", fontSize: "18px" }}
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
