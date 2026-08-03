"use client";

import { HeroSection } from "@/types/sections";
import { motion } from "framer-motion";
import { Calendar, ChevronDown, MapPin } from "lucide-react";
export const COUPLE_NAMES = {
  groom: "Alexander",
  bride: "Isabella",
};
type Props = {
  section: HeroSection;
};

const Hero: React.FC<Props> = ({ section }) => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://picsum.photos/seed/wedding-hero/1920/1080?blur=2"
          alt="Wedding Background"
          className="w-full h-full object-cover scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative z-10 text-center text-white px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <p className="uppercase tracking-[0.4em] text-sm mb-6 font-light">
            We are getting married
          </p>
          <h1 className="text-7xl md:text-9xl font-display mb-8 leading-tight">
            {COUPLE_NAMES.groom} <br className="md:hidden" />
            <span className="serif-italic text-wedding-gold">&</span>{" "}
            <br className="md:hidden" />
            {COUPLE_NAMES.bride}
          </h1>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 text-lg md:text-xl font-light tracking-widest">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" /> June 20, 2026
            </span>
            <span className="hidden md:block text-wedding-gold">•</span>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Tuscany, Italy
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-6 h-6 animate-bounce text-white/50" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
