"use client";

import React from "react";
import { SectionId } from "../types";
import { MapPin, Clock, Music } from "lucide-react";
import { useConfig } from "../ConfigContext";

export const Details: React.FC = () => {
  const { config } = useConfig();
  return (
    <section
      id={SectionId.DETAILS}
      className="py-24 bg-retro-green px-4 border-y-2 border-retro-brown"
    >
      <div className="max-w-6xl mx-auto">
        <div className="bg-retro-cream border-2 border-retro-brown shadow-hard-lg p-8 md:p-16 rounded-3xl relative">
          <h2 className="font-serif text-5xl md:text-6xl text-center mb-12 text-retro-brown">
            {config.details.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-retro-orange border-2 border-retro-brown rounded-full flex items-center justify-center text-white shadow-hard">
                <MapPin size={28} />
              </div>
              <h3 className="font-sans font-bold text-xl uppercase">
                {config.details.where.title}
              </h3>
              <p className="font-serif text-lg">
                {config.details.where.localName}
                <br />
                {config.details.where.address}
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-retro-yellow border-2 border-retro-brown rounded-full flex items-center justify-center text-retro-brown shadow-hard">
                <Clock size={28} />
              </div>
              <h3 className="font-sans font-bold text-xl uppercase">
                {config.details.when.title}
              </h3>
              <p className="font-serif text-lg">
                {config.main.date}
                <br />
                {config.details.when.description}
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-retro-pink border-2 border-retro-brown rounded-full flex items-center justify-center text-retro-brown shadow-hard">
                <Music size={28} />
              </div>
              <h3 className="font-sans font-bold text-xl uppercase">
                {config.details.concept.title}
              </h3>
              <p className="font-serif text-lg">
                {config.details.concept.title}
                <br />
                {config.details.concept.quote}
              </p>
            </div>
          </div>
          <div className="mt-12 text-center">
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer"
              className="inline-block bg-retro-brown text-retro-cream px-8 py-3 rounded-full font-sans font-bold uppercase tracking-wider hover:bg-retro-orange transition-colors shadow-hard border-2 border-transparent hover:border-retro-brown"
            >
              {config.details.navigationButtonName}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
