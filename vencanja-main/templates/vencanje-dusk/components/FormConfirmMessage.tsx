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
    <div className="vd-form text-center">
      <p className="vd-eyebrow">{isYes ? "Vidimo se u sumrak" : "Hvala Vam"}</p>
      <h3 className="vd-title">
        {isYes
          ? "Vaša potvrda je zabeležena."
          : "Hvala što ste nas obavestili."}
      </h3>
      <p className="vd-body mx-auto max-w-md">
        {isYes
          ? "Sačuvaćemo Vam mesto za stolom i čašu uz svetlost sveća."
          : "Biće nam žao što te večeri niste sa nama."}
      </p>
      <div>
        <button type="button" onClick={onClick} className="vd-btn vd-btn--ghost">
          Pošalji novu potvrdu
        </button>
      </div>
    </div>
  );
};

export default FormConfirmMessage;
