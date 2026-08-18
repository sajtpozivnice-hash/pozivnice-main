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
    <div className="vo-vellum-strong rounded-3xl px-6 py-14 text-center sm:px-12">
      <p className="vo-eyebrow mb-5" style={{ color: accent }}>
        {isYes ? "Zabeleženo" : "Razumemo"}
      </p>
      <h3 className="vo-display text-3xl sm:text-4xl">
        {isYes ? "Radujemo se Vašem dolasku." : "Hvala što ste nam javili."}
      </h3>
      <p className="vo-body mx-auto mt-5 max-w-md text-vo-muted">
        {isYes
          ? "Vaš odgovor je stigao do nas. Vidimo se uskoro."
          : "Nedostajaćete nam tog dana — hvala na lepim rečima."}
      </p>
      <button
        type="button"
        onClick={onClick}
        className="mt-9 cursor-pointer text-[10px] uppercase tracking-[0.3em] text-vo-charcoal underline underline-offset-8 transition hover:text-vo-blush-deep"
      >
        Pošalji novi odgovor
      </button>
    </div>
  );
};

export default FormConfirmMessage;
