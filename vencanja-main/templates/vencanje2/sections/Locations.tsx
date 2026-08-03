"use client";

import { EditableText } from "@/components/editor/EditableText";
import { LocationsSection } from "@/types/sections";
import { SectionHeader } from "./SectionHeader";
import { Clock, MapPin, Music } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  section: LocationsSection;
  mode: "editor" | "view";
  onChange?: (sectionId: string, newData: LocationsSection["data"]) => void;
};

const Locations: React.FC<Props> = ({ section, mode, onChange }) => {
  const { data, id } = section;

  const isEditor = mode === "editor";

  function update<K extends keyof LocationsSection["data"]>(
    key: K,
    value: LocationsSection["data"][K],
  ) {
    onChange?.(id, { ...data, [key]: value });
  }

  return (
    <section id="details" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title="Wedding Details" subtitle="When & Where" />

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Clock className="w-8 h-8" />,
              title: "Ceremony",
              time: "4:00 PM",
              desc: "The exchange of vows will take place in the garden.",
            },
            {
              icon: <Music className="w-8 h-8" />,
              title: "Reception",
              time: "6:00 PM",
              desc: "Dinner, drinks, and dancing to follow the ceremony.",
            },
            {
              icon: <MapPin className="w-8 h-8" />,
              title: "Location",
              time: "Villa del Sole",
              desc: "Via Roma 123, 53100 Siena SI, Italy",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-10 rounded-3xl border border-wedding-gold/20 text-center hover:shadow-xl transition-all group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-wedding-cream text-wedding-gold mb-6 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h4 className="text-2xl font-display mb-2">{item.title}</h4>
              <p className="font-bold text-wedding-gold tracking-widest uppercase text-xs mb-4">
                {item.time}
              </p>
              <p className="text-wedding-ink/60 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Locations;
