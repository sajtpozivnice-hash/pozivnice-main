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
    <div className="border border-vp-line bg-vp-ivory px-6 py-14 text-center sm:px-10">
      <p className="vp-eyebrow mb-4" style={{ color: accent }}>
        {isYes ? "Hvala" : "Razumemo"}
      </p>
      <h3 className="vp-display text-3xl sm:text-4xl">
        {isYes
          ? "Vaš odgovor je primljen."
          : "Hvala što ste nam javili."}
      </h3>
      <p className="vp-body mx-auto mt-4 max-w-md text-vp-muted">
        {isYes
          ? "Jedva čekamo da slavimo sa Vama."
          : "Nedostajaćete nam — hvala na poruci."}
      </p>
      <button
        type="button"
        onClick={onClick}
        className="mt-8 cursor-pointer text-xs uppercase tracking-[0.28em] text-vp-ink underline underline-offset-4"
      >
        Pošalji novi odgovor
      </button>
    </div>
  );
};

export default FormConfirmMessage;
