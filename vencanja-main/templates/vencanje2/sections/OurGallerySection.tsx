"use client";

import { EditableText } from "@/components/editor/EditableText";
import {
  CalendarSection,
  CountdownSection,
  OurGallerySection,
} from "@/types/sections";

type Props = {
  section: OurGallerySection;
  mode: "editor" | "view";
  onChange?: (sectionId: string, newData: OurGallerySection["data"]) => void;
};

const OurGallery: React.FC<Props> = ({ section, mode, onChange }) => {
  const { data, id } = section;

  const isEditor = mode === "editor";

  function update<K extends keyof OurGallerySection["data"]>(
    key: K,
    value: OurGallerySection["data"][K],
  ) {
    onChange?.(id, { ...data, [key]: value });
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center text-white">
      <h1>za sada ovako OurGallery</h1>
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 text-center space-y-6 max-w-3xl px-6"></div>
    </section>
  );
};

export default OurGallery;
