"use client";

import { ThemeConfig } from "@/types/config";
import { UploadImagesSection } from "@/types/sections";
import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";

type Props = {
  section: UploadImagesSection;
  theme: ThemeConfig;
};

const UploadImages: React.FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const { colors } = theme;
  return (
    <section
      id={id}
      className="relative flex items-center justify-center text-white py-30 px-5"
    >
      <div className="max-w-3xl mx-auto text-center space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-black/5 flex items-center justify-center text-black/20">
              <ImageIcon size={32} strokeWidth={1} />
            </div>
          </div>
          <div className="space-y-2">
            <span
              style={{ color: colors?.base?.primary?.value }}
              className="text-[14px] uppercase tracking-[0.4em] text-black opacity-90 font-bold"
            >
              {data.subtitle}
            </span>
            <h3
              style={{ color: colors?.base?.secondary?.value }}
              className="text-4xl lg:text-6xl font-light tracking-tighter"
            >
              {data.title}
            </h3>
            <p
              style={{ color: colors?.base?.secondary?.value }}
              className="text-lg text-black opacity-90 max-w-md mx-auto"
            >
              {data.description}
            </p>
          </div>

          <div className="pt-8">
            <label
              style={{ background: colors?.base?.secondary?.value }}
              className="group cursor-pointer inline-flex items-center gap-4 bg-black text-white px-10 py-6 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:scale-[1.05] active:scale-[0.95] transition-all shadow-2xl shadow-black/20"
            >
              <ImageIcon size={20} />
              <span>Dodajte Slike i Video zapise</span>
            </label>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UploadImages;
