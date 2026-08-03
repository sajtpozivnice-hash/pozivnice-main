"use client";

import { CalendarSection, CountdownSection } from "@/types/sections";

type Props = {
  section: CalendarSection;
  onChange?: (sectionId: string, newData: CalendarSection["data"]) => void;
};

const Calendar: React.FC<Props> = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-white">
      <h1>za sada ovako Calendar</h1>
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 text-center space-y-6 max-w-3xl px-6"></div>
    </section>
  );
};

export default Calendar;
