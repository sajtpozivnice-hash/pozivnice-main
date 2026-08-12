"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import { LoveQuoteSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";

type Props = {
  section: LoveQuoteSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const LoveQuote: FC<Props> = ({ section }) => {
  const { data, id } = section;

  return (
    <section id={id} className="kg-section bg-white">
      <div className="kg-container-narrow">
        {/* Quote as a botanical margin note — vine rail with leaf marker, text offset to the right */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="kg-quote-aside"
        >
          <span className="kg-quote-rail">
            <Leaf className="h-4 w-4" />
          </span>
          <div>
            <p
              className="text-2xl leading-relaxed text-kg-ink sm:text-3xl sm:leading-snug"
              style={{ fontFamily: "var(--font-primary)" }}
            >
              {data.title}
            </p>
            {data.description ? (
              <p className="mt-5 text-sm text-kg-muted">{data.description}</p>
            ) : null}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LoveQuote;
