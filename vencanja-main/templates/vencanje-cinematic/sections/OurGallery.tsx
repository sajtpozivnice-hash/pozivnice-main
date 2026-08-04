"use client";

import { FC, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { OurGallerySection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { SceneFrame } from "../components/SceneFrame";
import { StoryReel, StoryReelSlide } from "../components/StoryReel";

type Props = {
  section: OurGallerySection;
  event: EventConfig;
  theme: ThemeConfig;
};

const OurGallery: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#d4a574";
  const images = data.images ?? [];
  const [active, setActive] = useState(0);

  const go = (dir: -1 | 1) => {
    if (images.length === 0) return;
    setActive((prev) => (prev + dir + images.length) % images.length);
  };

  const activeImage = images[active]?.url;

  return (
    <section id={id} className="w-full overflow-hidden bg-vc-void">
      {/* Desktop / large: fullscreen slideshow */}
      <div className="relative hidden min-h-[100svh] lg:block">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImage || "empty"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55 }}
            className="absolute inset-0"
          >
            <SceneFrame
              id={`${id}-slide`}
              backgroundImage={activeImage}
              className="min-h-[100svh]"
            >
              <div className="vc-stage flex min-h-[100svh] flex-col justify-between py-16">
                <div>
                  <p className="vc-eyebrow" style={{ color: accent }}>
                    Still frames
                  </p>
                  <h2 className="vc-title mt-4 max-w-xl">{data.title}</h2>
                </div>

                <div className="flex items-end justify-between gap-6">
                  <p className="text-sm text-white/50">
                    {data.description}
                    {images.length > 0
                      ? ` · ${active + 1} / ${images.length}`
                      : ""}
                  </p>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => go(-1)}
                      className="flex h-12 w-12 cursor-pointer items-center justify-center border border-white/25 text-white transition hover:bg-white/10"
                      aria-label="Previous"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => go(1)}
                      className="flex h-12 w-12 cursor-pointer items-center justify-center border border-white/25 text-white transition hover:bg-white/10"
                      aria-label="Next"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </SceneFrame>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile: horizontal snap reel */}
      <div className="lg:hidden">
        <div className="px-5 py-14 text-center sm:px-8">
          <p className="vc-eyebrow mb-4" style={{ color: accent }}>
            Still frames
          </p>
          <h2 className="vc-title text-4xl">{data.title}</h2>
          {data.description ? (
            <p className="mt-4 text-sm text-white/50">{data.description}</p>
          ) : null}
        </div>

        {images.length === 0 ? (
          <div className="px-5 pb-16 text-center text-sm text-white/40">
            Gallery coming soon.
          </div>
        ) : (
          <StoryReel className="px-5 pb-16 sm:px-8">
            {images.map((image, index) => (
              <StoryReelSlide key={`${image.url}-${index}`} image={image.url}>
                <p className="text-[10px] uppercase tracking-[0.35em] text-white/60">
                  Frame {String(index + 1).padStart(2, "0")}
                </p>
              </StoryReelSlide>
            ))}
          </StoryReel>
        )}
      </div>
    </section>
  );
};

export default OurGallery;
