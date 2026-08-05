"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { EventType } from "@/types/config";
import { EVENT_TYPE_LABELS } from "@/types/catalog";
import styles from "./PackageToggle.module.css";

type SwitchToggleProps = {
  selected: EventType | "";
  onChange: (value: EventType | "") => void;
};

const OPTIONS: { label: string; value: EventType | "" }[] = [
  { label: "Svi šabloni", value: "" },
  { label: EVENT_TYPE_LABELS.wedding, value: "wedding" },
  { label: EVENT_TYPE_LABELS.birthday, value: "birthday" },
  { label: EVENT_TYPE_LABELS.baptism, value: "baptism" },
];

const SwitchToggle: FC<SwitchToggleProps> = ({ selected, onChange }) => {
  return (
    <div className={styles.container}>
      <motion.div
        className={styles.innerContainer}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {OPTIONS.map(({ label, value }) => {
          const isActive = selected === value;
          return (
            <motion.button
              key={value || "all"}
              type="button"
              className={styles.action}
              onClick={() => onChange(value)}
              initial={false}
              animate={{
                backgroundColor: isActive
                  ? "var(--color-hot)"
                  : "rgba(250,218,221,0)",
                fontWeight: isActive ? 900 : 400,
                opacity: isActive ? 1 : 0.55,
                color: isActive ? "var(--color-bg)" : "var(--color-text)",
              }}
              transition={{ duration: 0.35 }}
            >
              {label}
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
};

export default SwitchToggle;
