"use client";

import { FC } from "react";

export type Attendance = "yes" | "no";

type Props = {
  attendance: Attendance;
  onClick: () => void;
  accent?: string;
};

const FormConfirmMessage: FC<Props> = ({ attendance, onClick }) => {
  const isYes = attendance === "yes";

  return (
    <div className="py-8 text-center">
      <div className="vb-arch" />
      <p className="vb-kicker mt-8">{isYes ? "Primljeno" : "Zabeleženo"}</p>
      <h3 className="vb-script-sm mt-5">
        {isYes ? "Jedva čekamo da Vas vidimo." : "Hvala što ste javili."}
      </h3>
      <p className="vb-body mx-auto mt-5 max-w-md">
        {isYes
          ? "Vaše mesto je sačuvano. Javljamo se sa poslednjim detaljima."
          : "Nedostajaćete nam — zdravica ostaje za drugi put."}
      </p>
      <button type="button" onClick={onClick} className="vb-btn-ghost mt-10">
        Pošalji novi odgovor
      </button>
    </div>
  );
};

export default FormConfirmMessage;
