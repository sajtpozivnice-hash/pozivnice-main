"use client";

import React from "react";
import styles from "./OurStory.module.css";
import { hsvaToHex } from "@uiw/react-color";
import { useConfig } from "../../ConfigContext";
import { fonts } from "@/fontsForInvites";
import editable from "../GlobalCss.module.css";

const OurStory: React.FC = () => {
  const { config, setConfig } = useConfig();

  return (
    <section
      id="story"
      className={styles.section}
      style={{ backgroundColor: hsvaToHex(config.main.secondaryColor) }}
    >
      <div className={styles.container}>
        <div className={styles.header}>
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
                ourStory: {
                  ...config.ourStory,
                  title: e.currentTarget.innerText,
                },
              })
            }
          >
            {config.ourStory.title}
          </h2>
          <div
            style={{
              backgroundColor: hsvaToHex(config.main.primaryColor),
            }}
            className={styles["header-line"]}
          />
        </div>

        <div className={styles["flex-row"]}>
          <div className={`${styles.person} ${styles["person-left"]}`}>
            <img src={config.ourStory.hisImage} />
          </div>

          <div className={styles.story}>
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
                  ourStory: {
                    ...config.ourStory,
                    firstText: e.currentTarget.innerText,
                  },
                })
              }
            >
              {config.ourStory.firstText}
            </p>
            <div className={styles.dots}>
              <div
                style={{
                  backgroundColor: hsvaToHex(config.main.primaryColor),
                }}
              ></div>
              <div
                style={{
                  backgroundColor: hsvaToHex(config.main.primaryColor),
                }}
              ></div>
              <div
                style={{
                  backgroundColor: hsvaToHex(config.main.primaryColor),
                }}
              ></div>
            </div>
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
                  ourStory: {
                    ...config.ourStory,
                    quote: e.currentTarget.innerText,
                  },
                })
              }
            >
              {config.ourStory.quote}
            </p>
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
                  ourStory: {
                    ...config.ourStory,
                    bottomText: e.currentTarget.innerText,
                  },
                })
              }
            >
              {config.ourStory.bottomText}
            </p>
          </div>

          <div className={`${styles.person} ${styles["person-right"]}`}>
            <img src={config.ourStory.hersImage} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
