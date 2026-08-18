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
    <div className="py-10">
      <div className="va-rule-thin mb-8" />
      <p className="va-caption">{isYes ? "Primljeno" : "Zabeleženo"}</p>
      <h3 className="va-display mt-4">
        {isYes ? "Hvala — vidimo se." : "Hvala što ste javili."}
      </h3>
      <p className="va-body mt-4 max-w-sm">
        {isYes
          ? "Vaše ime je na spisku. Javljamo se pred dan."
          : "Nedostajaćete nam. Čuvamo Vam zdravicu za drugi put."}
      </p>
      <button type="button" onClick={onClick} className="va-btn mt-8">
        Novi odgovor
      </button>
    </div>
  );
};

export default FormConfirmMessage;
