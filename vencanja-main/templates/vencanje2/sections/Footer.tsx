"use client";
export const COUPLE_NAMES = {
  groom: "Alexander",
  bride: "Isabella",
};

import { EditableText } from "@/components/editor/EditableText";
import {
  CalendarSection,
  CountdownSection,
  FooterSection,
  OurStorySection,
  RSVPSection,
} from "@/types/sections";
import { Camera, Info, Mail } from "lucide-react";

type Props = {
  section: FooterSection;
  mode: "editor" | "view";
  onChange?: (sectionId: string, newData: FooterSection["data"]) => void;
};

const Footer: React.FC<Props> = ({ section, mode, onChange }) => {
  const { data, id } = section;

  const isEditor = mode === "editor";

  function update<K extends keyof FooterSection["data"]>(
    key: K,
    value: FooterSection["data"][K],
  ) {
    onChange?.(id, { ...data, [key]: value });
  }

  return (
    <footer className="py-20 px-6 bg-wedding-ink text-white text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl md:text-7xl font-display mb-8">
          {COUPLE_NAMES.groom}{" "}
          <span className="serif-italic text-wedding-gold">&</span>{" "}
          {COUPLE_NAMES.bride}
        </h2>
        <p className="uppercase tracking-[0.5em] text-sm text-white/40 mb-12">
          See you in Tuscany
        </p>

        <div className="flex justify-center gap-8 mb-12">
          <a
            href="#"
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-wedding-ink transition-all"
          >
            <Camera className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-wedding-ink transition-all"
          >
            <Mail className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-wedding-ink transition-all"
          >
            <Info className="w-5 h-5" />
          </a>
        </div>

        <p className="text-[10px] uppercase tracking-widest text-white/20">
          Designed with love for our friends and family
        </p>
      </div>
    </footer>
  );
};

export default Footer;
