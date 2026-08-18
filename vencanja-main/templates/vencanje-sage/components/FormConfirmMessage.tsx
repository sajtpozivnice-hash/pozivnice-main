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
    <div className="border border-vs-line bg-vs-linen px-6 py-14 sm:px-12">
      <p className="vs-eyebrow mb-5" style={{ color: accent }}>
        {isYes ? "Zabeleženo" : "Razumemo"}
      </p>
      <h3 className="vs-display text-3xl sm:text-4xl">
        {isYes ? "Radujemo se Vašem dolasku." : "Hvala što ste nam javili."}
      </h3>
      <p className="vs-body mt-5 max-w-md text-vs-muted">
        {isYes
          ? "Vaš odgovor je stigao do nas. Vidimo se uskoro."
          : "Nedostajaćete nam tog dana — hvala na lepim rečima."}
      </p>
      <button
        type="button"
        onClick={onClick}
        className="mt-9 cursor-pointer text-[10px] uppercase tracking-[0.3em] text-vs-ink underline underline-offset-8 transition hover:text-vs-sage"
      >
        Pošalji novi odgovor
      </button>
    </div>
  );
};

export default FormConfirmMessage;
