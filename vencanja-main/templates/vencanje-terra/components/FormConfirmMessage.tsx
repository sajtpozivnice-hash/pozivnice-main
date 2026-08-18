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
    <div className="vt-soft border border-vt-line bg-vt-cream px-7 py-14 sm:px-12">
      <p className="vt-eyebrow mb-5" style={{ color: accent }}>
        {isYes ? "Primljeno" : "Razumemo"}
      </p>
      <h3 className="vt-display text-3xl sm:text-4xl">
        {isYes ? "Radujemo se Vašem dolasku." : "Hvala što ste nam javili."}
      </h3>
      <p className="vt-body mt-5 max-w-md text-vt-muted">
        {isYes
          ? "Vaš odgovor je stigao. Vidimo se pod mediteranskim nebom."
          : "Nedostajaćete nam tog dana — hvala na toplim rečima."}
      </p>
      <button
        type="button"
        onClick={onClick}
        className="mt-9 cursor-pointer text-[10px] uppercase tracking-[0.28em] text-vt-ink underline underline-offset-8 transition hover:text-vt-terracotta"
      >
        Pošalji novi odgovor
      </button>
    </div>
  );
};

export default FormConfirmMessage;
