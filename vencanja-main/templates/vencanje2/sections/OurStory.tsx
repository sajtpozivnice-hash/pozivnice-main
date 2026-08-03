"use client";

import { EditableText } from "@/components/editor/EditableText";
import {
  CalendarSection,
  CountdownSection,
  OurStorySection,
} from "@/types/sections";
import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

type Props = {
  section: OurStorySection;
  mode: "editor" | "view";
  onChange?: (sectionId: string, newData: OurStorySection["data"]) => void;
};

const OurStory: React.FC<Props> = ({ section, mode, onChange }) => {
  const { data, id } = section;

  const isEditor = mode === "editor";

  function update<K extends keyof OurStorySection["data"]>(
    key: K,
    value: OurStorySection["data"][K],
  ) {
    onChange?.(id, { ...data, [key]: value });
  }

  return (
    <section id="story" className="py-24 px-6 bg-wedding-cream">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title="Our Story" subtitle="How it all began" />

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[3/4] rounded-[40px] overflow-hidden shadow-2xl rotate-[-2deg]">
              <img
                src="https://picsum.photos/seed/couple1/800/1200"
                alt="Couple"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 rounded-full border-8 border-wedding-cream overflow-hidden shadow-xl rotate-[5deg] hidden md:block">
              <img
                src="https://picsum.photos/seed/couple2/400/400"
                alt="Couple small"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-display">A Journey of Love</h3>
            <p className="text-lg leading-relaxed text-wedding-ink/80">
              It started with a simple "hello" in a crowded coffee shop five
              years ago. What began as a shared love for vintage cameras and
              rainy afternoons blossomed into a beautiful journey across
              continents and through life's many seasons.
            </p>
            <p className="text-lg leading-relaxed text-wedding-ink/80">
              From our first hike in the Alps to the quiet moments in our small
              apartment, every step has led us here. We are so excited to start
              this new chapter and share our joy with the people we love most.
            </p>
            <div className="pt-4">
              <p className="serif-italic text-2xl text-wedding-gold">
                "I have found the one whom my soul loves."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
