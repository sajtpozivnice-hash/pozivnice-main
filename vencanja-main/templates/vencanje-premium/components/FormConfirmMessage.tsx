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
        {isYes ? "Thank you" : "We understand"}
      </p>
      <h3 className="vp-display text-3xl sm:text-4xl">
        {isYes
          ? "Your reply has been received."
          : "Thank you for letting us know."}
      </h3>
      <p className="vp-body mx-auto mt-4 max-w-md text-vp-muted">
        {isYes
          ? "We cannot wait to celebrate with you."
          : "You will be missed — thank you for the message."}
      </p>
      <button
        type="button"
        onClick={onClick}
        className="mt-8 cursor-pointer text-xs uppercase tracking-[0.28em] text-vp-ink underline underline-offset-4"
      >
        Send another reply
      </button>
    </div>
  );
};

export default FormConfirmMessage;
