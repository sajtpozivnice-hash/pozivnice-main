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
    <div className="vb-glass px-6 py-12 text-center sm:px-10">
      <p className="vb-eyebrow mb-4" style={{ color: accent }}>
        {isYes ? "Hvala Vam" : "Žao nam je"}
      </p>
      <h3 className="vb-title text-3xl sm:text-4xl">
        {isYes
          ? "Vaša potvrda je uspešno poslata."
          : "Hvala što ste nas obavestili."}
      </h3>
      <p className="vb-body mx-auto mt-4 max-w-md text-white/60">
        {isYes
          ? "Jedva čekamo da slavimo sa Vama."
          : "Biće nam žao što ne možete doći."}
      </p>
      <button
        type="button"
        onClick={onClick}
        className="mt-8 cursor-pointer text-xs text-white/75 underline underline-offset-4"
      >
        Pošalji novu potvrdu
      </button>
    </div>
  );
};

export default FormConfirmMessage;
