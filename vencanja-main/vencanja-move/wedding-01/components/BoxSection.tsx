"use client";

import styles from "../css/Components.module.css";
import BorderBottom from "./BorderBottom";
import { boxShadow } from "../constants";
import { hsvaToHex } from "@uiw/react-color";
import { DefaultConfig } from "../jsonConfig";
import { useEffect, useState } from "react";
import { useInviteConfig } from "../InviteConfigContext";

const BoxSection = () => {
  const { config, setConfig } = useInviteConfig();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const updateBoxField = (id: number, field: keyof any, value: string) => {
    setConfig((prev: DefaultConfig) => ({
      ...prev,
      boxSection: {
        ...prev.boxSection,
        box: prev.boxSection.box.map((b) =>
          b.id === id ? { ...b, [field]: value } : b,
        ),
      },
    }));
  };
  return (
    <div
      id="lokacija"
      className={styles.cardStyle}
      style={{
        color: hsvaToHex(config.main.primaryColor),
        backgroundColor: hsvaToHex(config.main.secondaryColor),
        ...boxShadow(hsvaToHex(config.main.primaryColor)),
      }}
    >
      <BorderBottom />
      <h2
        style={{ color: hsvaToHex(config.main.primaryColor) }}
        className={`${styles.fontSizeH2} ${styles.marginBottom15} ${styles.editable} ${styles.fontInviteClassic}`}
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) =>
          setConfig({
            ...config,
            boxSection: {
              ...config.boxSection,
              title: e.currentTarget.innerText,
            },
          })
        }
      >
        {config.boxSection.title}
      </h2>
      <div className={styles.whenWhereInnerContnet}>
        {config.boxSection.box.map((box) => (
          <div
            key={box.id}
            className={styles.whenWhereField}
            style={{
              ...boxShadow(hsvaToHex(config.main.primaryColor)),
            }}
          >
            <p
              className={`${styles.fontSizeP} ${styles.editable} ${styles.fontInviteClassic}`}
              style={{
                color: hsvaToHex(config.main.primaryColor),
                textTransform: "uppercase",
              }}
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) =>
                updateBoxField(box.id, "title", e.currentTarget.innerText)
              }
            >
              {box.title}
            </p>
            <h2
              style={{ color: hsvaToHex(config.main.primaryColor) }}
              className={`${styles.fontSizeH2} ${styles.editable} ${styles.fontInviteClassic}`}
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) =>
                updateBoxField(box.id, "time", e.currentTarget.innerText)
              }
            >
              {box.time}
            </h2>
            <p
              style={{ color: hsvaToHex(config.main.primaryColor) }}
              className={`${styles.fontSizeP} ${styles.editable} ${styles.fontInviteClassic}`}
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) =>
                updateBoxField(box.id, "description", e.currentTarget.innerText)
              }
            >
              {box.description}
            </p>
          </div>
        ))}
      </div>
      <BorderBottom />
    </div>
  );
};

export default BoxSection;
