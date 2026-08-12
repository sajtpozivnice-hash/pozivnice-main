"use client";

import { FC } from "react";

export type Attendance = "yes" | "no";

type Props = {
  attendance: Attendance;
  onClick: () => void;
};

const FormConfirmMessage: FC<Props> = ({ attendance, onClick }) => {
  const isYes = attendance === "yes";

  return (
    <div className="kg-card px-6 py-12 text-center text-kg-ink sm:px-10">
      <p className="kg-eyebrow mb-4 justify-center">{isYes ? "Hvala Vam" : "Žao nam je"}</p>
      <h3
        className="text-3xl sm:text-4xl"
        style={{ fontFamily: "var(--font-primary)" }}
      >
        {isYes
          ? "Vaša potvrda je uspešno poslata."
          : "Hvala što ste nas obavestili."}
      </h3>
      <p className="mt-4 text-sm text-kg-muted">
        {isYes
          ? "Jedva čekamo da slavimo sa Vama."
          : "Biće nam žao što ne možete doći, ali hvala na poruci."}
      </p>
      <button
        type="button"
        onClick={onClick}
        className="mt-8 cursor-pointer text-sm underline underline-offset-4"
      >
        Pošalji novu potvrdu
      </button>
    </div>
  );
};

export default FormConfirmMessage;
