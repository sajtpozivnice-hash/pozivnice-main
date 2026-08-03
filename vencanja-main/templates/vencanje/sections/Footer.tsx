"use client";

import { formatDate } from "@/helpers/formatDate";
import { EventConfig, ThemeConfig } from "@/types/config";
import { FooterSection } from "@/types/sections";
import { Heart } from "lucide-react";

type Props = {
  section: FooterSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Footer: React.FC<Props> = ({ section, event, theme }) => {
  const { id, data } = section;
  const { names, date } = event;
  const { colors } = theme;
  return (
    <footer
      id={id}
      className="py-12 px-6 bg-wedding-cream text-center border-t border-wedding-gold/10"
    >
      <div className="max-w-4xl mx-auto">
        <h2
          style={{ color: colors?.base?.secondary?.value }}
          className="text-3xl font-display mb-4"
        >
          Sa ljubavlju {names}
        </h2>
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-[1px] w-8 bg-wedding-gold/30" />
          <Heart className="text-wedding-gold fill-wedding-gold w-4 h-4" />
          <div className="h-[1px] w-8 bg-wedding-gold/30" />
        </div>
        <p
          style={{ color: colors?.base?.primary?.value }}
          className="text-sm uppercase tracking-[0.3em] opacity-60 mb-8"
        >
          {formatDate(date, "DD_MMM_YYYY")}
        </p>
        <h2
          style={{ color: colors?.base?.secondary?.value }}
          className="text-3xl font-display mb-4"
        >
          {data.title}
        </h2>
      </div>
    </footer>
  );
};

export default Footer;
