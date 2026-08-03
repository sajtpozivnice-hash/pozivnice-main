"use client";

import React, { useState } from "react";
import styles from "./Rsvp.module.css";
import { Send, Loader2 } from "lucide-react";
import { hsvaToHex } from "@uiw/react-color";
import { useConfig } from "../../ConfigContext";
import { fonts } from "@/fontsForInvites";
import editable from "../GlobalCss.module.css";
import FormMessage from "./FormMessage";

export enum Attendance {
  EMPTY = "",
  YES = "yes",
  NO = "no",
}

const RSVP: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    attending: Attendance.EMPTY,
    guests: "1",
    message: "",
  });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    guests?: string;
    attending?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { config, setConfig } = useConfig();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submitted");

    const newErrors: typeof errors = {};

    if (!formData.name.trim()) {
      console.log("nema ime");
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

  const placeholderStyle = `
    .dynamic-input {
      font-size: 16px;
    }
    .dynamic-input::placeholder {
      color: ${hsvaToHex(config.main.primaryColor)};
      font-family: ${fonts[config.main.secondaryFont].style.fontFamily};
      font-size: 16px;
    }
  `;

  return (
    <section
      id="rsvp"
      className={styles.rsvpSection}
      style={{ backgroundColor: hsvaToHex(config.main.primaryColor) }}
    >
      <div className={styles.container}>
        <div className={styles.card}>
          <div
            className={styles.cardHeader}
            style={{
              backgroundColor: hsvaToHex(config.main.secondaryColor),
              borderBottom: `1px solid ${hsvaToHex(config.main.primaryColor)}`,
            }}
          >
            <h2
              style={{
                color: hsvaToHex(config.main.primaryColor),
                fontFamily: fonts[config.main.primaryFont].style.fontFamily,
              }}
              className={editable.editable}
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) =>
                setConfig({
                  ...config,
                  rsvp: {
                    ...config.rsvp,
                    title: e.currentTarget.innerText,
                  },
                })
              }
            >
              {config.rsvp.title}
            </h2>
            <p
              style={{
                color: hsvaToHex(config.main.primaryColor),
                fontFamily: fonts[config.main.secondaryFont].style.fontFamily,
              }}
              className={editable.editable}
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) =>
                setConfig({
                  ...config,
                  rsvp: {
                    ...config.rsvp,
                    subtitle: e.currentTarget.innerText,
                  },
                })
              }
            >
              {config.rsvp.subtitle}
            </p>
          </div>

          <div
            className={styles.cardForm}
            style={{ background: hsvaToHex(config.main.secondaryColor) }}
          >
            <style>{placeholderStyle}</style>
            <form onSubmit={handleSubmit} noValidate>
              <div className={`${styles.grid2} ${styles.grid2Cols}`}>
                <div className={styles.field}>
                  <label
                    style={{
                      fontFamily:
                        fonts[config.main.secondaryFont].style.fontFamily,
                    }}
                  >
                    Ime i prezime
                  </label>
                  <input
                    name="name"
                    required
                    className={`${styles.input} dynamic-input`}
                    type="text"
                    placeholder="Unesite Vase ime i Prezime"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      setErrors({ ...errors, name: undefined });
                    }}
                  />
                  {errors.name && (
                    <span className={styles.error}>{errors.name}</span>
                  )}
                </div>

                <div className={styles.field}>
                  <label
                    style={{
                      fontFamily:
                        fonts[config.main.secondaryFont].style.fontFamily,
                    }}
                  >
                    Email Adresa
                  </label>
                  <input
                    name="email"
                    required
                    className={`${styles.input} dynamic-input`}
                    type="email"
                    placeholder="Unesite vas email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      setErrors({ ...errors, email: undefined });
                    }}
                    style={{ padding: "15px", borderRadius: "10px" }}
                  />
                  {errors.email && (
                    <span className={styles.error}>{errors.email}</span>
                  )}
                </div>
              </div>

              <div
                className={`${styles.grid2} ${styles.grid2Cols}`}
                style={{ marginTop: "1.5rem" }}
              >
                <div className={styles.field}>
                  <label
                    style={{
                      fontFamily:
                        fonts[config.main.secondaryFont].style.fontFamily,
                    }}
                  >
                    Da li se vidimo?
                  </label>
                  <select
                    className={`${styles.select} dynamic-input`}
                    value={formData.attending}
                    onChange={(e) => {
                      const value = e.target.value as Attendance;
                      setFormData({
                        ...formData,
                        attending: value,
                        guests: value === Attendance.NO ? "0" : "1",
                      });
                      setErrors({ ...errors, attending: undefined });
                    }}
                    style={{
                      fontFamily:
                        fonts[config.main.secondaryFont].style.fontFamily,
                    }}
                  >
                    <option
                      disabled
                      style={{
                        fontFamily:
                          fonts[config.main.secondaryFont].style.fontFamily,
                      }}
                      value={Attendance.EMPTY}
                    >
                      Izaberite Odgovor
                    </option>
                    <option
                      style={{
                        fontFamily:
                          fonts[config.main.secondaryFont].style.fontFamily,
                      }}
                      value={Attendance.YES}
                    >
                      Da, vidimo se
                    </option>
                    <option
                      style={{
                        fontFamily:
                          fonts[config.main.secondaryFont].style.fontFamily,
                      }}
                      value={Attendance.NO}
                    >
                      Nazalost, ne dolazimo
                    </option>
                  </select>
                  {errors.attending && (
                    <span className={styles.error}>{errors.attending}</span>
                  )}
                </div>

                <div className={styles.field}>
                  <label
                    style={{
                      fontFamily:
                        fonts[config.main.secondaryFont].style.fontFamily,
                    }}
                  >
                    Broj Gostiju
                  </label>
                  <input
                    style={{
                      fontFamily:
                        fonts[config.main.secondaryFont].style.fontFamily,
                    }}
                    type="number"
                    min="1"
                    max="10"
                    className={`${styles.input} dynamic-input`}
                    value={formData.guests}
                    onChange={(e) => {
                      setFormData({ ...formData, guests: e.target.value });
                      setErrors({ ...errors, guests: undefined });
                    }}
                  />
                  {errors.guests && (
                    <span className={styles.error}>{errors.guests}</span>
                  )}
                </div>
              </div>

              <div className={styles.field} style={{ marginTop: "1.5rem" }}>
                <label
                  style={{
                    fontFamily:
                      fonts[config.main.secondaryFont].style.fontFamily,
                  }}
                >
                  Poruka Mladencima
                </label>
                <textarea
                  className={`${styles.textarea} dynamic-input`}
                  placeholder="Napisite vasu poruku Mladencima"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.submitBtn}
                style={{
                  marginTop: "1.5rem",
                  backgroundColor: hsvaToHex(config.main.primaryColor),
                  fontFamily: fonts[config.main.primaryFont].style.fontFamily,
                }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Šalje se...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Pošalji
                  </>
                )}
              </button>
            </form>
          </div>
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

export default RSVP;
