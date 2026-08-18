"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Section from "../layout/Section";
import Button from "../button/Button";
import AnimatedArrowRight from "../icons/AnimatedArrowRight";
import styles from "./EventOs.module.css";

const INVITE_IMG =
  "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787046392/wedding/jeremy-wong-weddings-464ps_nOflw-unsplash.jpg";

const GUEST_PHOTOS = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=700",
  "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=700",
  "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=700",
  "https://images.unsplash.com/photo-1519225421980-715cb0215a07?auto=format&fit=crop&q=80&w=700",
];

const GUESTS = [
  { name: "Ana", status: "yes" as const },
  { name: "Marko", status: "yes" as const },
  { name: "Nikola", status: "pending" as const },
  { name: "Petar", status: "no" as const },
];

const BUDGET_ROWS = [
  { label: "Venue", amount: "€2.400" },
  { label: "Catering", amount: "€1.600" },
  { label: "Dekoracija", amount: "€820" },
];

const PLANNER_ITEMS = [
  { label: "Izabrati restoran", done: true },
  { label: "Poslati pozivnice", done: true },
  { label: "Raspored sedenja", done: false },
  { label: "Fotograf", done: false },
];

const AVATARS = ["A", "M", "J", "N", "P"];

const statusMark = (status: "yes" | "pending" | "no") => {
  if (status === "yes") return "✓";
  if (status === "pending") return "?";
  return "×";
};

const EventOs = () => {
  return (
    <div className={styles.wrapper}>
      <Section>
        <motion.div
          className={styles.hero}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className={styles.step}>01</p>
          <h2 className={styles.megaTitle}>Nije samo pozivnica.</h2>
          <p className={styles.heroLead}>
            Jednom je napravite. Posle toga je koristite kao svoj digitalni
            centar za organizaciju događaja.
          </p>

          <div className={styles.inviteStage}>
            <motion.div
              className={styles.inviteCard}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              <img
                src={INVITE_IMG}
                alt=""
                className={styles.inviteImage}
                referrerPolicy="no-referrer"
              />
              <div className={styles.inviteOverlay}>
                <span className={styles.inviteNames}>Ana &amp; Marko</span>
                <span className={styles.inviteMeta}>Vaša digitalna pozivnica</span>
              </div>
            </motion.div>
            <p className={styles.transformLabel}>pozivnica → centar događaja</p>
          </div>
        </motion.div>

        <motion.div
          className={styles.blockHeader}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.45 }}
        >
          <p className={styles.step}>02</p>
          <h3 className={styles.blockTitle}>Vaš događaj. Na jednom mestu.</h3>
        </motion.div>

        <div className={styles.dashboard}>
          <motion.article
            className={`${styles.panel} ${styles.rsvp}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.4 }}
          >
            <div className={styles.panelTop}>
              <span className={styles.panelLabel}>RSVP</span>
            </div>
            <p className={styles.bigStat}>
              84 <span className={styles.bigStatMuted}>/ 120</span>
            </p>
            <div className={styles.progressTrack} aria-hidden>
              <motion.div
                className={styles.progressFill}
                initial={{ width: 0 }}
                whileInView={{ width: "70%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
              />
            </div>
            <div className={styles.avatarRow} aria-hidden>
              {AVATARS.map((letter, i) => (
                <span
                  key={letter}
                  className={styles.avatar}
                  style={{ animationDelay: `${i * 0.12}s` }}
                >
                  {letter}
                </span>
              ))}
            </div>
            <h4 className={styles.panelTitle}>Znajte ko dolazi.</h4>
            <p className={styles.panelBody}>
              Gosti potvrđuju dolazak direktno preko pozivnice.
            </p>
          </motion.article>

          <motion.article
            className={`${styles.panel} ${styles.guests}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            <div className={styles.panelTop}>
              <span className={styles.panelLabel}>Gosti</span>
            </div>
            <div className={styles.filters} aria-hidden>
              <span className={`${styles.filter} ${styles.filterActive}`}>
                Svi
              </span>
              <span className={styles.filter}>Potvrđeni</span>
              <span className={styles.filter}>Čekaju</span>
            </div>
            <ul className={styles.guestList}>
              {GUESTS.map((guest) => (
                <li key={guest.name} className={styles.guestRow}>
                  <span
                    className={`${styles.guestMark} ${styles[`guest_${guest.status}`]}`}
                  >
                    {statusMark(guest.status)}
                  </span>
                  <span>{guest.name}</span>
                </li>
              ))}
            </ul>
            <h4 className={styles.panelTitle}>Svi gosti na jednom mestu.</h4>
            <p className={styles.panelBody}>
              Pratite ko je potvrdio, ko čeka i ko ne dolazi.
            </p>
          </motion.article>

          <motion.article
            className={`${styles.panel} ${styles.budget}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            <div className={styles.panelTop}>
              <span className={styles.panelLabel}>Budžet</span>
            </div>
            <div className={styles.budgetLayout}>
              <div>
                <p className={styles.bigStat}>€4.820</p>
                <p className={styles.budgetOf}>od €6.000</p>
              </div>
              <div className={styles.ring} aria-hidden>
                <svg viewBox="0 0 80 80" className={styles.ringSvg}>
                  <circle cx="40" cy="40" r="32" className={styles.ringTrack} />
                  <motion.circle
                    cx="40"
                    cy="40"
                    r="32"
                    className={styles.ringFill}
                    initial={{ strokeDashoffset: 201 }}
                    whileInView={{ strokeDashoffset: 40 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
                  />
                </svg>
                <span className={styles.ringLabel}>80%</span>
              </div>
            </div>
            <ul className={styles.budgetRows}>
              {BUDGET_ROWS.map((row) => (
                <li key={row.label}>
                  <span>{row.label}</span>
                  <span>{row.amount}</span>
                </li>
              ))}
            </ul>
            <h4 className={styles.panelTitle}>Znajte gde odlazi novac.</h4>
          </motion.article>

          <motion.article
            className={`${styles.panel} ${styles.planner}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.4, delay: 0.08 }}
          >
            <div className={styles.panelTop}>
              <span className={styles.panelLabel}>Planer</span>
            </div>
            <p className={styles.bigStat}>
              7 <span className={styles.bigStatMuted}>od 12</span>
            </p>
            <ul className={styles.checkList}>
              {PLANNER_ITEMS.map((item) => (
                <li
                  key={item.label}
                  className={item.done ? styles.checkDone : styles.checkOpen}
                >
                  <span aria-hidden>{item.done ? "✓" : "○"}</span>
                  {item.label}
                </li>
              ))}
            </ul>
            <h4 className={styles.panelTitle}>Znajte šta je sledeće.</h4>
          </motion.article>

          <motion.article
            className={`${styles.panel} ${styles.seating}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.45 }}
          >
            <div className={styles.panelTop}>
              <span className={styles.panelLabel}>Raspored sedenja</span>
            </div>
            <div className={styles.seatingLayout}>
              <div className={styles.seatingCopy}>
                <h4 className={styles.seatingTitle}>Raspored bez papira.</h4>
                <p className={styles.panelBody}>
                  Organizujte stolove, rasporedite goste i preuzmite gotov
                  raspored.
                </p>
              </div>
              <div className={styles.floorPlan} aria-hidden>
                <div className={`${styles.table} ${styles.tableTop}`}>
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <div className={styles.floorMid}>
                  <div className={styles.table}>
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className={styles.couple}>
                    <span className={styles.coupleDot} />
                    <span>Mlada</span>
                    <span>Mladoženja</span>
                  </div>
                  <div className={styles.table}>
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
            </div>
          </motion.article>
        </div>

        <motion.div
          className={styles.photos}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.45 }}
        >
          <div className={styles.photosCopy}>
            <p className={styles.step}>07</p>
            <h3 className={styles.photosTitle}>
              Vaš dan, iz svih perspektiva.
            </h3>
            <p className={styles.panelBody}>
              Gosti dele fotografije direktno preko pozivnice.
            </p>
            <p className={styles.photoCounter}>248 fotografija od 63 gosta</p>
          </div>

          <div className={styles.collage}>
            {GUEST_PHOTOS.map((src, index) => (
              <div
                key={src}
                className={`${styles.collageItem} ${styles[`photo${index + 1}`]}`}
              >
                <img src={src} alt="" referrerPolicy="no-referrer" />
              </div>
            ))}
          </div>
        </motion.div>

        <div className={styles.actions}>
          <Button icon={AnimatedArrowRight} maxWidth={280}>
            <Link href="/pozivnice" className="white-color">
              Pogledaj kako radi
            </Link>
          </Button>
        </div>
      </Section>
    </div>
  );
};

export default EventOs;
