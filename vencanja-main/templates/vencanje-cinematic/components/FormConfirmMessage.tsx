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
    <div className="border border-white/15 bg-white/5 px-6 py-14 text-center backdrop-blur-md sm:px-10">
      <p className="vc-eyebrow mb-4" style={{ color: accent }}>
        {isYes ? "Confirmed" : "Noted"}
      </p>
      <h3 className="vc-title text-3xl sm:text-4xl">
        {isYes ? "You are in this scene." : "Thank you for letting us know."}
      </h3>
      <p className="vc-body mx-auto mt-4 max-w-md text-white/55">
        {isYes
          ? "We cannot wait to share the evening with you."
          : "You will be missed — thank you for the message."}
      </p>
      <button
        type="button"
        onClick={onClick}
        className="mt-8 cursor-pointer text-[10px] uppercase tracking-[0.35em] text-white/70 underline underline-offset-4"
      >
        Reply again
      </button>
    </div>
  );
};

export default FormConfirmMessage;
