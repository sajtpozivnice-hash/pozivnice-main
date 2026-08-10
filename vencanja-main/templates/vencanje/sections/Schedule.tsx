"use client";

import { ScheduleSection } from "@/types/sections";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Music, Utensils } from "lucide-react";
import { ReactNode } from "react";

type Props = {
  section: ScheduleSection;
};

type ScheduleDisplayItem = {
  time: string;
  event: string;
  location: string;
  icon: ReactNode;
};

const fallbackSchedule: ScheduleDisplayItem[] = [
  {
    time: "4:00 PM",
    event: "Ceremonija",
    location: "Villa del Sol Garden",
    icon: <Calendar className="w-5 h-5" />,
  },
  {
    time: "5:30 PM",
    event: "Cocktail Hour",
    location: "The Olive Grove",
    icon: <Utensils className="w-5 h-5" />,
  },
  {
    time: "7:00 PM",
    event: "Dinner & Toasts",
    location: "Grand Ballroom",
    icon: <Utensils className="w-5 h-5" />,
  },
  {
    time: "9:00 PM",
    event: "Dancing",
    location: "Grand Ballroom",
    icon: <Music className="w-5 h-5" />,
  },
];

const fallbackIcons = [
  <Calendar key="calendar" className="w-5 h-5" />,
  <Utensils key="utensils" className="w-5 h-5" />,
  <Music key="music" className="w-5 h-5" />,
  <Clock key="clock" className="w-5 h-5" />,
];

const Schedule: React.FC<Props> = ({ section }) => {
  const { data, id } = section;
  const configItems = data.items ?? [];

  const schedule: ScheduleDisplayItem[] =
    configItems.length > 0
      ? configItems.map((item, index) => ({
          time: item.time,
          event: item.title,
          location: item.description || "",
          icon: fallbackIcons[index % fallbackIcons.length],
        }))
      : fallbackSchedule;

  return (
    <section id={id} className="section-padding relative overflow-hidden bg-white">
      {data.imageUrl ? (
        <div className="section-bg opacity-[0.08]">
          <img src={data.imageUrl} alt="" referrerPolicy="no-referrer" />
        </div>
      ) : null}

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-16 text-center md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 font-display text-4xl md:text-5xl"
          >
            {data.title || "The Big Day"}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-serif text-lg italic opacity-60"
          >
            {data.subtitle ||
              "Everything you need to know about our celebration"}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-3xl font-display border-b border-wedding-gold/20 pb-4 mb-8">
              Schedule
            </h3>
            {schedule.map((item, index) => (
              <div key={index} className="flex gap-3 items-start group">
                <div className="mt-1 p-3 rounded-full bg-wedding-cream text-wedding-gold group-hover:bg-wedding-gold group-hover:text-white transition-colors duration-300">
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-wedding-gold uppercase tracking-widest mb-1">
                    {item.time}
                  </p>
                  <h4 className="text-xl font-display">{item.event}</h4>
                  {item.location ? (
                    <p className="text-sm opacity-60 flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" /> {item.location}
                    </p>
                  ) : null}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Schedule;
