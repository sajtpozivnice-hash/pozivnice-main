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
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center sm:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 font-display text-4xl md:text-5xl"
            style={{ color: colors?.base?.secondary?.value }}
          >
            {data.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-display text-base opacity-60 sm:text-lg"
            style={{ color: colors?.base?.primary?.value }}
          >
            {data.subtitle}
          </motion.p>
        </div>

        <div className={`grid gap-6 sm:gap-8 lg:gap-10 ${columns}`}>
          {data.cards?.map((loc, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="flex flex-col overflow-hidden rounded-3xl border border-wedding-gold/5 bg-white shadow-xl"
            >
              {loc.image ? (
                <div className="img-1-1">
                  <img
                    src={loc.image}
                    alt={loc.title ?? "Lokacija"}
                    referrerPolicy="no-referrer"
                  />
                </div>
              ) : null}
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <div className="mb-6">
                  <span
                    style={{ color: colors?.base?.primary?.value }}
                    className="mb-2 block text-xs font-bold tracking-widest uppercase"
                  >
                    {loc.title}
                  </span>
                  <h3
                    style={{ color: colors?.base?.secondary?.value }}
                    className="mb-4 font-display text-2xl sm:text-3xl"
                  >
                    {loc.time}
                  </h3>
                  <p
                    style={{ color: colors?.base?.secondary?.value }}
                    className="mb-6 font-serif italic opacity-70"
                  >
                    {loc.text}
                  </p>
                </div>

                <div className="mt-auto space-y-4">
                  <div className="flex items-start gap-3 text-sm opacity-80">
                    <MapPin
                      color={colors?.base?.primary?.value}
                      className="mt-0.5 h-4 w-4 shrink-0"
                    />
                    <span>{loc.location}</span>
                  </div>
                  <div className="flex gap-4 pt-4 sm:pt-6">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.location ?? "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-center text-sm font-semibold text-white transition-colors duration-300 hover:opacity-90"
                      style={{
                        background: colors?.base?.secondary?.value,
                      }}
                    >
                      <MapPin className="h-4 w-4" /> Navigacija
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
