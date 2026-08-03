"use client";

import React, { useState } from "react";
import { SectionId, RSVPFormData } from "../types";
import FormMessage from "./FormMessage";

export enum Attendance {
  EMPTY = "",
  YES = "yes",
  NO = "no",
}

export const RSVP: React.FC = () => {
  const [formData, setFormData] = useState<RSVPFormData>({
    name: "",
    email: "",
    attending: Attendance.EMPTY,
    guests: 0,
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    guests?: string;
    attending?: string;
  }>({});
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors({ ...errors, [name]: undefined });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submitted");

    const newErrors: typeof errors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Ime i prezime je obavezno.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email adresa je obavezna.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Unesite ispravnu email adresu.";
    }

    if (formData.attending === Attendance.YES && Number(formData.guests) < 1) {
      newErrors.guests = "Morate uneti bar jednog gosta.";
    }

    if (formData.attending === Attendance.EMPTY) {
      newErrors.attending = "Morate izabrati odgovor.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      setIsSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
    } catch {
      console.log();
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <section id={SectionId.RSVP} className="py-24 px-4 bg-retro-pink">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white border-2 border-retro-brown shadow-hard-lg p-8 md:p-12 rounded-lg transform rotate-1">
          <div className="text-center mb-8">
            <h2 className="font-serif text-5xl mb-2">Potvrda Dolaska</h2>
            <p className="font-sans font-bold uppercase text-retro-orange">
              Javiti do: 01 Septembar, 2026
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div>
              <label className="block font-sans font-bold uppercase text-xs mb-2">
                Ime i prezime
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-retro-cream border-2 border-retro-brown p-3 rounded-lg focus:outline-none focus:shadow-hard transition-shadow font-serif text-xl"
                placeholder="Vaše ime i prezime"
              />
              {errors.name && (
                <span className="text-red-500">{errors.name}</span>
              )}
            </div>

            <div>
              <label className="block font-sans font-bold uppercase text-xs mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-retro-cream border-2 border-retro-brown p-3 rounded-lg focus:outline-none focus:shadow-hard transition-shadow font-serif text-xl"
                placeholder="email@example.com"
              />
              {errors.email && (
                <span className="text-red-500">{errors.email}</span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block font-sans font-bold uppercase text-xs mb-2">
                  Dolaziš?
                </label>
                <select
                  name="attending"
                  value={formData.attending}
                  onChange={handleChange}
                  className="w-full bg-retro-cream border-2 border-retro-brown p-3 rounded-lg focus:outline-none focus:shadow-hard transition-shadow font-serif text-xl appearance-none"
                >
                  <option value={Attendance.EMPTY} disabled>
                    Da li dolazis?
                  </option>
                  <option value={Attendance.YES}>Dolazim naravno!</option>
                  <option value={Attendance.NO}>Nažalost ne</option>
                </select>
                {errors.attending && (
                  <span className="text-red-500">{errors.attending}</span>
                )}
              </div>
              <div>
                <label className="block font-sans font-bold uppercase text-xs mb-2">
                  Broj Gostiju
                </label>
                <input
                  type="number"
                  name="guests"
                  min="0"
                  max="5"
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full bg-retro-cream border-2 border-retro-brown p-3 rounded-lg focus:outline-none focus:shadow-hard transition-shadow font-serif text-xl"
                />
                {errors.guests && (
                  <span className="text-red-500">{errors.guests}</span>
                )}
              </div>
            </div>

            <div>
              <label className="block font-sans font-bold uppercase text-xs mb-2">
                Poruka Slavljeniku
              </label>
              <textarea
                name="message"
                rows={2}
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-retro-cream border-2 border-retro-brown p-3 rounded-lg focus:outline-none focus:shadow-hard transition-shadow font-serif text-xl resize-none"
                placeholder="Vaša poruka"
              />
            </div>

            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full bg-retro-orange text-white font-sans font-bold uppercase text-xl py-4 rounded-lg border-2 border-retro-brown shadow-hard hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
            >
              {isSubmitting ? <div>Šalje se...</div> : <>Pošalji</>}
            </button>
          </form>
        </div>
        {submitted && (
          <FormMessage
            onClick={() => setSubmitted(false)}
            attendance={formData.attending}
          />
        )}
      </div>
    </section>
  );
};
