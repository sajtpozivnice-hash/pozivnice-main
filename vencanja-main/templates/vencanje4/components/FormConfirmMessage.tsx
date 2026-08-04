"use client";

import { FC } from "react";

export type Attendance = "yes" | "no";

type Props = {
  attendance: Attendance;
  onClick: () => void;
  accent?: string;
};

const FormConfirmMessage: FC<Props> = ({ attendance, onClick, accent }) => {
  const isYes = attendance === "yes";

  return (
    <div className="v4-glass-strong px-6 py-12 text-center sm:px-10">
      <p
        className="v4-eyebrow mb-4"
        style={{ color: accent ?? "#c9a86a" }}
      >
        {isYes ? "Hvala Vam" : "Žao nam je"}
      </p>
      <h3
        className="text-3xl text-white sm:text-4xl"
        style={{ fontFamily: "var(--font-primary)" }}
      >
        {isYes
          ? "Vaša potvrda je uspešno poslata."
          : "Hvala što ste nas obavestili."}
      </h3>
      <p className="mt-4 text-sm text-white/60">
        {isYes
          ? "Jedva čekamo da slavimo sa Vama."
          : "Biće nam žao što ne možete doći, ali hvala na poruci."}
      </p>
      <button
        type="button"
        onClick={onClick}
        className="mt-8 cursor-pointer text-sm text-white/80 underline underline-offset-4"
      >
        Pošalji novu potvrdu
      </button>
    </div>
  );
};

export default FormConfirmMessage;
