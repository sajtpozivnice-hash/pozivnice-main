"use client";

import { ThemeConfig } from "@/types/config";
import { LocationsSection } from "@/types/sections";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

type Props = {
  section: LocationsSection;
  theme: ThemeConfig;
};

const Locations: React.FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const { colors } = theme;
  const columns =
    data.cards?.length === 4
      ? "grid-cols-2"
      : "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3";

  return (
    <section id={id} className="section-padding bg-wedding-cream/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-display mb-4"
            style={{ color: colors?.base?.secondary?.value }}
          >
            {data.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg opacity-60 font-display"
            style={{ color: colors?.base?.primary?.value }}
          >
            {data.subtitle}
          </motion.p>
        </div>

        <div className={`grid gap-12 ${columns}`}>
          {data.cards?.map((loc, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-3xl overflow-hidden shadow-xl border border-wedding-gold/5 flex flex-col"
            >
              <div className="p-8 flex-1 flex flex-col">
                <div className="mb-6">
                  <span
                    style={{ color: colors?.base?.primary?.value }}
                    className="text-xs font-bold uppercase tracking-widest text-wedding-gold mb-2 block"
                  >
                    {loc.title}
                  </span>
                  <h3
                    style={{ color: colors?.base?.secondary?.value }}
                    className="text-3xl font-display mb-4"
                  >
                    {loc.time}
                  </h3>
                  <p
                    style={{ color: colors?.base?.secondary?.value }}
                    className="opacity-70 font-serif italic mb-6"
                  >
                    {loc.text}
                  </p>
                </div>

                <div className="mt-auto space-y-4">
                  <div className="flex items-start gap-3 text-sm opacity-80">
                    <MapPin
                      color={colors?.base?.primary?.value}
                      className="w-4 h-4 text-wedding-gold shrink-0 mt-0.5"
                    />
                    <span>{loc.location}</span>
                  </div>
                  <div className="pt-6 flex gap-4">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.location ?? "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-wedding-dark text-white text-center py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-wedding-gold transition-colors duration-300"
                      style={{
                        background: colors?.base?.secondary?.value,
                      }}
                    >
                      <MapPin className="w-4 h-4" /> Navigacija
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Locations;
