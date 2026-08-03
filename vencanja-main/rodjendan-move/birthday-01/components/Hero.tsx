"use client";

import React from "react";
import { SectionId } from "../types";
import { ArrowDown, Heart } from "lucide-react";
import { useConfig } from "../ConfigContext";

export const Hero: React.FC = () => {
  const { config } = useConfig();
  return (
    <section
      id={SectionId.HERO}
      className="relative min-h-screen w-full flex flex-col items-center justify-between py-12 px-4 bg-retro-cream border-x-8 border-retro-orange mx-auto max-w-[1400px]"
    >
      <div className="w-full flex justify-between items-center border-b-2 border-retro-brown pb-4">
        <div className="flex gap-2">
          <Heart className="fill-retro-orange text-retro-orange animate-bounce" />
          <Heart className="fill-retro-yellow text-retro-yellow animate-bounce delay-100" />
          <Heart className="fill-retro-green text-retro-green animate-bounce delay-200" />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center flex-grow relative z-10 w-full">
        <div className="relative">
          <h1 className="font-serif text-[12vw] md:text-[10rem] leading-[0.8] text-retro-brown text-center z-10 relative mix-blend-multiply">
            <span className="text-retro-orange font-serif italic">
              {config.main.name}
            </span>
            <br />
            {config.hero.description}
          </h1>

          <div className="absolute top-0 right-0 w-32 h-32 bg-retro-yellow rounded-full -z-10 mix-blend-multiply opacity-80 animate-float" />
          <div className="absolute bottom-0 left-10 w-40 h-40 bg-retro-green rounded-full -z-10 mix-blend-multiply opacity-80 animate-float delay-500" />
        </div>
      </div>

      <div className="text-center space-y-6 pb-12">
        <div className="inline-block bg-retro-pink border-2 border-retro-brown px-8 py-2 rounded-full shadow-hard transform -rotate-2">
          <p className="font-sans font-bold text-lg text-retro-brown">
            OKTOBAR 25, 2026
          </p>
        </div>

        <p className="font-serif text-2xl md:text-3xl italic text-retro-brown max-w-lg mx-auto">
          {config.hero.bottomDescription}
        </p>

        <button
          //   onClick={() => document.getElementById(SectionId.STORY)?.scrollIntoView({ behavior: 'smooth' })}
          className="mx-auto block p-4 bg-retro-brown text-retro-cream rounded-full hover:bg-retro-orange transition-colors"
        >
          <ArrowDown size={24} />
        </button>
      </div>
    </section>
  );
};
