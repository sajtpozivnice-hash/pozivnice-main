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
    <div className="border-t border-b border-vi-line py-14">
      <p className="vi-caption">{isYes ? "Zabeleženo" : "Razumemo"}</p>
      <div className="vi-accent mt-4" style={{ background: accent }} />
      <h3 className="vi-display-sm mt-6">
        {isYes ? "Vaš odgovor je primljen." : "Hvala što ste nam javili."}
      </h3>
      <p className="vi-body mt-4 max-w-md">
        {isYes
          ? "Ime Vam je već na spisku — javljamo se sa detaljima pred sam dan."
          : "Nedostajaćete nam. Čuvamo Vam jednu zdravicu za neku drugu priliku."}
      </p>
      <button
        type="button"
        onClick={onClick}
        className="vi-caption mt-8 cursor-pointer border-b border-vi-ink pb-1 text-vi-ink"
      >
        Pošalji novi odgovor
      </button>
    </div>
  );
};

export default FormConfirmMessage;
