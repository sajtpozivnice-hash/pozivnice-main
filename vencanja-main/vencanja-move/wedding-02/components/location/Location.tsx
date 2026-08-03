"use client";

import { fonts } from "@/fontsForInvites";
import { useConfig } from "../../ConfigContext";
import styles from "./Location.module.css";
import LocationBox from "./LocationBox";
import { hsvaToHex } from "@uiw/react-color";
import editable from "../GlobalCss.module.css";

const Location = () => {
  const { config, setConfig } = useConfig();
  return (
    <section
      id="location"
      className={styles.locationSection}
      style={{ backgroundColor: hsvaToHex(config.main.secondaryColor) }}
    >
      <div className={styles.innerContainer}>
        <div className={styles.header}>
          <h2
            className={`${styles.headerTitle} ${editable.editable}`}
            style={{
              color: hsvaToHex(config.main.primaryColor),
              fontFamily: fonts[config.main.primaryFont].style.fontFamily,
            }}
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) =>
              setConfig({
                ...config,
                destination: {
                  ...config.destination,
                  title: e.currentTarget.innerText,
                },
              })
            }
          >
            {config.destination.title}
          </h2>
          <div
            className={styles.headerLine}
            style={{ backgroundColor: hsvaToHex(config.main.primaryColor) }}
          ></div>
        </div>
        <div className={styles.contentContainer}>
          {config.destination.card.map((card) => (
            <LocationBox key={card.id} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Location;
