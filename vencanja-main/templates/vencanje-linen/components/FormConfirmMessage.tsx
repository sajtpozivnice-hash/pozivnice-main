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
    <div className="border border-vl-line bg-vl-paper px-7 py-14 text-center sm:px-12">
      <p className="vl-eyebrow mb-5" style={{ color: accent }}>
        {isYes ? "Primljeno" : "Razumemo"}
      </p>
      <h3 className="vl-display-sm">
        {isYes ? "Radujemo se Vašem dolasku." : "Hvala što ste nam javili."}
      </h3>
      <p className="vl-body mt-5 text-vl-muted">
        {isYes
          ? "Vaš odgovor je stigao. Vidimo se u avgustu, u toplini platna i šampanjca."
          : "Nedostajaćete nam tog dana — hvala na toplim rečima."}
      </p>
      <button
        type="button"
        onClick={onClick}
        className="mt-9 cursor-pointer text-[10px] uppercase tracking-[0.28em] text-vl-ink underline underline-offset-8 transition hover:text-vl-champagne"
      >
        Pošalji novi odgovor
      </button>
    </div>
  );
};

export default FormConfirmMessage;
