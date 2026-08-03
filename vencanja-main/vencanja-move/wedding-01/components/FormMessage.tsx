"use client";

import { FC } from "react";
import Confetti from "react-confetti-boom";
import { X } from "lucide-react";

const successMessage = "Vaš dolazak je potvrđen!";
const successMessageDescription =
  "Hvala što delite ovaj poseban trenutak sa nama. Vidimo se uskoro ❤️";

const rejectMessage = "Hvala na odgovoru.";
const rejectMessageDescription =
  "Razumemo i cenimo što ste odvojili vreme da nam se javite. Šaljemo vam puno ljubavi ✨";

export enum Attendance {
  EMPTY = "",
  YES = "yes",
  NO = "no",
}

interface FormMessageProps {
  onClick: () => void;
  attendance: Attendance;
}

const FormMessage: FC<FormMessageProps> = ({ onClick, attendance }) => {
  const isComing = attendance === Attendance.YES;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xl px-6">
      {/* Premium Card */}
      <div className="relative w-full max-w-2xl p-[1px] rounded-3xl bg-gradient-to-br from-yellow-400/40 via-amber-200/20 to-yellow-500/40 shadow-[0_0_60px_rgba(255,215,0,0.15)]">
        <div className="relative rounded-3xl bg-white/5 backdrop-blur-2xl px-10 py-16 text-center overflow-hidden">
          {/* Close Button */}
          <button
            onClick={onClick}
            className="absolute top-6 right-6 text-gold-300 hover:rotate-90 transition-all duration-300 text-white/60 hover:text-white"
          >
            <X size={26} />
          </button>

          {/* Decorative Glow */}
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-yellow-400/10 blur-[120px] rounded-full" />
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-amber-300/10 blur-[120px] rounded-full" />

          {/* Icon */}
          <div className="mb-8 flex justify-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400/30 to-amber-500/30 flex items-center justify-center text-4xl shadow-lg">
              {isComing ? "💍" : "🤍"}
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-serif tracking-wide text-white mb-6">
            {isComing ? successMessage : rejectMessage}
          </h1>

          {/* Divider */}
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto mb-8" />

          {/* Description */}
          <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-xl mx-auto font-light">
            {isComing ? successMessageDescription : rejectMessageDescription}
          </p>
        </div>
      </div>

      {isComing && (
        <Confetti
          mode="fall"
          particleCount={80}
          shapeSize={28}
          fadeOutHeight={0.6}
        />
      )}
    </div>
  );
};

export default FormMessage;
