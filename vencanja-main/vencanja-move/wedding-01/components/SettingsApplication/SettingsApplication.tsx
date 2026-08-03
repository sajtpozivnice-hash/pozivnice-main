"use client";
import SettingsIcon from "../SettingsIcon";
import styles from "./SettingsApplication.module.css";
import { Colorful, hsvaToHex } from "@uiw/react-color";
import { useEffect, useRef, useState } from "react";
import FontPicker from "../FontPicker/FontPicker";
import DateFormatPicker from "../DateFormatPicker/DateFormatPicker";
import { useInviteConfig } from "../../InviteConfigContext";
import { uploadImageToCloudinary } from "@/helpers/uploadImageToCloudinary";
import LoaderComponent from "@/app/components/shared/LoaderComponent/LoaderComponent";
import SectionToggle from "@/app/components/shared/SectionToggle/SectionToggle";
import { formatDate, toInputDateFormat } from "@/helpers/formatDate";
import { DefaultConfig } from "../../jsonConfig";
import AnimatedClose from "@/app/components/icons/AnimatedClose";

const SettingsApplication = () => {
  const { config, setConfig } = useInviteConfig();
  const [visiblePalete, setVisiblePalete] = useState(true);
  const cardNumbers = [1, 2, 3, 4, 5, 6];
  const inputRef = useRef<HTMLInputElement>(null);

  const backgroundImageRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const handleBackgroundImageUpload = () => {
    backgroundImageRef.current?.click();
  };

  const handleBackgroundUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      const url = await uploadImageToCloudinary(file);
      setConfig({
        ...config,
        main: {
          ...config.main,
          backgroundImage: url,
        },
      });
    } catch (err) {
      console.error("Cloudinary upload failed", err);
    } finally {
      setLoading(false);
    }
  };

  const updateBoxCount = (count: number) => {
    setConfig((prev: DefaultConfig) => {
      const currentBoxes = prev.boxSection.box;

      if (count > currentBoxes.length) {
        const boxesToAdd: any[] = Array.from(
          { length: count - currentBoxes.length },
          (_, i) => ({
            id: Date.now() + i,
            title: "Naslov",
            time: "Vreme",
            description: "Opis",
          }),
        );
        return {
          ...prev,
          boxSection: {
            ...prev.boxSection,
            box: [...currentBoxes, ...boxesToAdd],
          },
        };
      }

      if (count < currentBoxes.length) {
        return {
          ...prev,
          boxSection: {
            ...prev.boxSection,
            box: currentBoxes.slice(0, count),
          },
        };
      }

      return prev;
    });
  };

  return (
    <div>
      <div
        className={styles.iconContainer}
        onClick={() => setVisiblePalete(!visiblePalete)}
      >
        <SettingsIcon
          width={52}
          height={52}
          color={hsvaToHex(config.main.primaryColor)}
        />
        <LoaderComponent
          isOpen={loading}
          text="Zamena pozadinske slike u toku..."
        />
      </div>
      {visiblePalete && (
        <div className={styles.settingsContainer}>
          <div
            onClick={() => setVisiblePalete(false)}
            className={styles.closeIconContainer}
          >
            <AnimatedClose color="#fff" size={36} />
          </div>
          <div className={styles.settingsInnerContainer}>
            <h3 className={styles.groupContainerHeading}>
              Ukloni/dodaj sekcije
            </h3>
            <SectionToggle
              showSection={config.calendar.visible}
              setShowSection={() => {
                setConfig({
                  ...config,
                  calendar: {
                    ...config.calendar,
                    visible: !config.calendar.visible,
                  },
                });
              }}
              sectionName={config.calendar.title}
            />
            <SectionToggle
              showSection={config.firstSection.visible}
              setShowSection={() => {
                setConfig({
                  ...config,
                  firstSection: {
                    ...config.firstSection,
                    visible: !config.firstSection.visible,
                  },
                });
              }}
              sectionName={config.firstSection.title}
            />
            <SectionToggle
              showSection={config.boxSection.visible}
              setShowSection={() => {
                setConfig({
                  ...config,
                  boxSection: {
                    ...config.boxSection,
                    visible: !config.boxSection.visible,
                  },
                });
              }}
              sectionName={config.boxSection.title}
            />
          </div>
          <div className={styles.settingsInnerContainer}>
            <h3 className={styles.groupContainerHeading}>
              Zamena pozadinske slike
            </h3>
            <p
              onClick={handleBackgroundImageUpload}
              className={styles.imitationSelect}
            >
              Izaberi Sliku
            </p>
            <input
              ref={backgroundImageRef}
              type="file"
              accept="image/*"
              onChange={handleBackgroundUpload}
              className={styles.hiddenInput}
            />
          </div>
          <div className={styles.settingsInnerContainer}>
            <h3 className={styles.groupContainerHeading}>Datum</h3>
            <p
              onClick={() => inputRef.current?.showPicker()}
              className={styles.imitationSelect}
            >
              {formatDate(config.main.date, "DD_DOT_MM_DOT_YYYY")}
            </p>
            <input
              ref={inputRef}
              className={styles.hiddenInput}
              type="date"
              value={toInputDateFormat(config.main.date)}
              onChange={(e: any) =>
                setConfig({
                  ...config,
                  main: {
                    ...config.main,
                    date: e.target.value,
                  },
                })
              }
            />
          </div>
          <div className={styles.settingsInnerContainer}>
            <h3 className={styles.groupContainerHeading}>Format Datuma</h3>
            <DateFormatPicker />
          </div>
          <div className={styles.settingsInnerContainer}>
            <h3 className={styles.groupContainerHeading}>Font</h3>
            <FontPicker
              value={config.main.font}
              onChange={(font) => {
                setConfig({
                  ...config,
                  main: {
                    ...config.main,
                    font: font,
                  },
                });
              }}
            />
          </div>
          <div className={styles.settingsInnerContainer}>
            <h3 className={styles.groupContainerHeading}>
              {config.boxSection.title}: Broj Polja
            </h3>

            <div className={styles.boxFieldsContainer}>
              {cardNumbers.map((item, index) => (
                <div key={item}>
                  <p
                    className={styles.boxField}
                    onClick={() => updateBoxCount(item)}
                    style={{
                      color:
                        config.boxSection.box.length - 1 === index
                          ? "#2eb82e"
                          : "#fff",
                      border: `2px solid ${
                        config.boxSection.box.length - 1 === index
                          ? "#2eb82e"
                          : "#fff"
                      }`,
                    }}
                  >
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.settingsInnerContainer}>
            <h3 className={styles.groupContainerHeading}>Boja Teksta</h3>
            <Colorful
              color={config.main.primaryColor}
              onChange={(color: any) => {
                setConfig({
                  ...config,
                  main: {
                    ...config.main,
                    primaryColor: color.hsva,
                  },
                });
              }}
              disableAlpha
            />
          </div>
          <div className={styles.settingsInnerContainer}>
            <h3 className={styles.groupContainerHeading}>Boja Kartica</h3>
            <Colorful
              color={config.main.secondaryColor}
              onChange={(color: any) => {
                setConfig({
                  ...config,
                  main: {
                    ...config.main,
                    secondaryColor: color.hsva,
                  },
                });
              }}
              disableAlpha
            />
          </div>
          <div className={styles.settingsInnerContainer}>
            <h3 className={styles.groupContainerHeading}>
              Boja i Transparentnost
              <br /> Pozadine
            </h3>
            <Colorful
              color={config.main.backgroundColor}
              onChange={(color: any) => {
                setConfig({
                  ...config,
                  main: { ...config.main, backgroundColor: color.hexa },
                });
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsApplication;
