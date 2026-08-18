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
    <div className="border-t border-b border-[var(--color-vn-line)] py-14 text-center">
      <p className="vn-eyebrow">
        {isYes ? "Potvrđeno" : "Zabeleženo"}
      </p>
      <div
        className="mx-auto mt-5 h-px w-16"
        style={{ background: accent ?? "var(--color-vn-champagne)" }}
      />
      <h3 className="vn-display-sm mt-8">
        {isYes
          ? "Sa zadovoljstvom očekujemo Vaš dolazak."
          : "Hvala što ste nam javili."}
      </h3>
      <p className="vn-body mx-auto mt-5 max-w-md">
        {isYes
          ? "Vaše ime je na listi gostiju. Javljamo se sa poslednjim detaljima pred sam dan."
          : "Nedostajaćete nam. Čuvamo Vam zdravicu za neku drugu priliku."}
      </p>
      <button type="button" onClick={onClick} className="vn-btn-ghost mt-10">
        Pošalji novi odgovor
      </button>
    </div>
  );
};

export default FormConfirmMessage;
