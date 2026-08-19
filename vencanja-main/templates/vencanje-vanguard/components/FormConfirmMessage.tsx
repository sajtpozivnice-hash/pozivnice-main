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
    <div className="py-10 text-left">
      <div
        className="vg-bar-accent"
        style={accent ? { background: accent } : undefined}
      />
      <p className="vg-kicker mt-8">{isYes ? "Potvrđeno" : "Zabeleženo"}</p>
      <h3 className="vg-display-sm mt-5">
        {isYes
          ? "Vaše ime je u izdanju."
          : "Hvala što ste nam javili."}
      </h3>
      <p className="vg-body mt-5 max-w-md">
        {isYes
          ? "Čuvamo Vas na listi. Javljamo se sa poslednjim detaljima pred dan."
          : "Nedostajaćete nam. Zdravica ostaje za neku drugu priliku."}
      </p>
      <button type="button" onClick={onClick} className="vg-btn-ghost mt-10">
        Pošalji novi odgovor
      </button>
    </div>
  );
};

export default FormConfirmMessage;
