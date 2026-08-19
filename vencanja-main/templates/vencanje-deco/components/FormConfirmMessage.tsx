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
    <div className="py-8 text-center">
      <div className="vd-diamond" style={accent ? { background: accent } : undefined} />
      <p className="vd-eyebrow mt-8">{isYes ? "Potvrđeno" : "Zabeleženo"}</p>
      <h3 className="vd-display-sm mt-5">
        {isYes
          ? "Sa radošću očekujemo Vaš dolazak."
          : "Hvala što ste nam javili."}
      </h3>
      <p className="vd-body mx-auto mt-5 max-w-md">
        {isYes
          ? "Vaše ime je na listi gostiju. Javljamo se sa poslednjim detaljima pred dan."
          : "Nedostajaćete nam. Čuvamo Vam zdravicu za neku drugu priliku."}
      </p>
      <button type="button" onClick={onClick} className="vd-btn-ghost mt-10">
        Pošalji novi odgovor
      </button>
    </div>
  );
};

export default FormConfirmMessage;
