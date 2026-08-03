"use client";

import React from "react";
import styles from "./Schedule.module.css";
import { hsvaToHex } from "@uiw/react-color";
import { useConfig } from "../../ConfigContext";
import { fonts } from "@/fontsForInvites";
import editable from "../GlobalCss.module.css";
import { DefaultConfig } from "../../jsonConfig";

const Schedule: React.FC = () => {
  const { config, setConfig } = useConfig();

  const updateBoxField = (id: number, field: keyof any, value: string) => {
    setConfig((prev: DefaultConfig) => ({
      ...prev,
      theBigDay: {
        ...prev.theBigDay,
        cards: prev.theBigDay.cards.map((b) =>
          b.id === id ? { ...b, [field]: value } : b,
        ),
      },
    }));
  };

  return (
    <section
      id="schedule"
      className={styles.section}
      style={{ backgroundColor: hsvaToHex(config.main.primaryColor) }}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <h2
            style={{
              color: hsvaToHex(config.main.secondaryColor),
              fontFamily: fonts[config.main.primaryFont].style.fontFamily,
            }}
            className={editable.editable}
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) =>
              setConfig({
                ...config,
                theBigDay: {
                  ...config.theBigDay,
                  title: e.currentTarget.innerText,
                },
              })
            }
          >
            {config.theBigDay.title}
          </h2>
          <p
            style={{
              color: hsvaToHex(config.main.secondaryColor),
              fontFamily: fonts[config.main.secondaryFont].style.fontFamily,
            }}
            className={editable.editable}
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) =>
              setConfig({
                ...config,
                theBigDay: {
                  ...config.theBigDay,
                  titleDescription: e.currentTarget.innerText,
                },
              })
            }
          >
            {config.theBigDay.titleDescription}
          </p>
          <div
            style={{ backgroundColor: hsvaToHex(config.main.secondaryColor) }}
            className={styles["header-line"]}
          ></div>
        </div>

        <div className={styles.timeline}>
          <div
            style={{ backgroundColor: hsvaToHex(config.main.secondaryColor) }}
            className={styles["vertical-line"]}
          ></div>

          <div className={styles.innerWrapper}>
            {config.theBigDay.cards.map((event, idx) => {
              const Icon = event.icon;
              return (
                <div
                  key={idx}
                  className={`${styles.event} ${idx % 2 === 0 ? styles.reverse : ""}`}
                >
                  <div
                    style={{
                      color: hsvaToHex(config.main.secondaryColor),
                      fontFamily:
                        fonts[config.main.primaryFont].style.fontFamily,
                    }}
                    className={`${styles.time} ${
                      idx % 2 === 0 ? styles.left : styles.right
                    } ${editable.editable}`}
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) =>
                      updateBoxField(
                        event.id,
                        "time",
                        e.currentTarget.innerText,
                      )
                    }
                  >
                    {event.time}
                  </div>

                  <div
                    style={{
                      color: hsvaToHex(config.main.secondaryColor),
                      border: `2px solid ${hsvaToHex(config.main.secondaryColor)}`,
                    }}
                    className={styles["icon-circle"]}
                  >
                    <Icon />
                  </div>

                  <div
                    className={styles.content}
                    style={{
                      background: hsvaToHex(config.main.secondaryColor),
                    }}
                  >
                    <div
                      style={{
                        color: hsvaToHex(config.main.secondaryColor),
                        fontFamily:
                          fonts[config.main.primaryFont].style.fontFamily,
                      }}
                      className={`${styles["mobile-time"]} ${editable.editable}`}
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) =>
                        updateBoxField(
                          event.id,
                          "time",
                          e.currentTarget.innerText,
                        )
                      }
                    >
                      {event.time}
                    </div>
                    <h3
                      className={editable.editable}
                      style={{
                        color: hsvaToHex(config.main.primaryColor),
                        fontFamily:
                          fonts[config.main.primaryFont].style.fontFamily,
                      }}
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) =>
                        updateBoxField(
                          event.id,
                          "title",
                          e.currentTarget.innerText,
                        )
                      }
                    >
                      {event.title}
                    </h3>
                    <p
                      style={{
                        color: hsvaToHex(config.main.primaryColor),
                        fontFamily:
                          fonts[config.main.secondaryFont].style.fontFamily,
                      }}
                      className={`${styles.fontInviteClassic} ${editable.editable}`}
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) =>
                        updateBoxField(
                          event.id,
                          "description",
                          e.currentTarget.innerText,
                        )
                      }
                    >
                      {event.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Schedule;
