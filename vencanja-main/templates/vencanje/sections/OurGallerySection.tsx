"use client";

import { OurGallerySection } from "@/types/sections";

type Props = {
  section: OurGallerySection;
};

const OurGallery: React.FC<Props> = ({ section }) => {
  const { data, id } = section;

  return (
    <section
      id={id}
      className="relative min-h-screen flex items-center justify-center text-white"
    >
      <h1>za sada ovako OurGallery</h1>
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 text-center space-y-6 max-w-3xl px-6"></div>
    </section>
  );
};

export default OurGallery;
