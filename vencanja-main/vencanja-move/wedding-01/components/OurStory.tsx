"use client";
import styles from "../css/Components.module.css";
import BorderBottom from "./BorderBottom";
import { boxShadow } from "../constants";
import { hsvaToHex } from "@uiw/react-color";
import { useInviteConfig } from "../InviteConfigContext";

const OurStory = () => {
  const { config, setConfig } = useInviteConfig();

  return (
    <div
      id="our-story"
      className={styles.cardStyle}
      style={{
        backgroundColor: hsvaToHex(config.main.secondaryColor),
        color: hsvaToHex(config.main.primaryColor),
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
            firstSection: {
              ...config.firstSection,
              title: e.currentTarget.innerText,
            },
          })
        }
      >
        {config.firstSection.title}
      </h2>
      <p
        style={{ color: hsvaToHex(config.main.primaryColor) }}
        contentEditable
        suppressContentEditableWarning
        className={`${styles.fontSizeP} ${styles.editable} ${styles.fontInviteClassic}`}
        onBlur={(e) =>
          setConfig({
            ...config,
            firstSection: {
              ...config.firstSection,
              description: e.currentTarget.innerText,
            },
          })
        }
      >
        {config.firstSection.description}
      </p>
      <BorderBottom />
    </div>
  );
};

export default OurStory;
