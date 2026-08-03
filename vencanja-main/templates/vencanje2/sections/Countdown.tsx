"use client";

import { CountdownSection } from "@/types/sections";
import { CountdownTimer } from "./CountdownTimer";

type Props = {
  section: CountdownSection;
};

const Countdown: React.FC<Props> = () => {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <p className="serif-italic text-2xl text-wedding-ink/60 mb-4">
          Counting down to the big day
        </p>
        <CountdownTimer />
      </div>
    </section>
  );
};

export default Countdown;
