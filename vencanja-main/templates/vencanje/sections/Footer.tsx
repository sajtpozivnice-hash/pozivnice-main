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
      className="section-padding relative overflow-hidden border-t border-wedding-gold/10 bg-wedding-cream text-center"
    >
      {data.imageUrl ? (
        <div className="section-bg opacity-[0.08]">
          <img src={data.imageUrl} alt="" referrerPolicy="no-referrer" />
        </div>
      ) : null}

      <div className="relative z-10 mx-auto max-w-4xl">
        <h2
          style={{ color: colors?.base?.secondary?.value }}
          className="mb-4 font-display text-2xl sm:text-3xl"
        >
          Sa ljubavlju {names}
        </h2>
        <div className="mb-6 flex items-center justify-center gap-4">
          <div className="h-px w-8 bg-wedding-gold/30" />
          <Heart className="h-4 w-4 fill-wedding-gold text-wedding-gold" />
          <div className="h-px w-8 bg-wedding-gold/30" />
        </div>
        <p
          style={{ color: colors?.base?.primary?.value }}
          className="mb-8 text-sm tracking-[0.3em] uppercase opacity-60"
        >
          {formatDate(date, "DD_MMM_YYYY")}
        </p>
        {data.title ? (
          <h2
            style={{ color: colors?.base?.secondary?.value }}
            className="font-display text-2xl sm:text-3xl"
          >
            {data.title}
          </h2>
        ) : null}
      </div>
    </footer>
  );
};

export default Footer;
