"use client";
import { Colorful, hsvaToHex } from "@uiw/react-color";
import { useRef, useState } from "react";
import { uploadImageToCloudinary } from "@/helpers/uploadImageToCloudinary";
import LoaderComponent from "@/app/components/shared/LoaderComponent/LoaderComponent";
import { useConfig } from "../../ConfigContext";

import SettingsIcon from "../SettingsIcon";
import FontPicker from "../FontPicker/FontPicker";
import DateFormatPicker from "../DateFormatPicker/DateFormatPicker";
import SectionToggle from "@/app/components/shared/SectionToggle/SectionToggle";
import { toInputDateFormat } from "../../helpers/formatDate";
import { DefaultConfig } from "../../jsonConfig";
import { PartyPopper } from "lucide-react";
import styles from "./SettingsApplication.module.css";
import AnimatedClose from "@/app/components/icons/AnimatedClose";

const SettingsApplication = () => {
  const { config, setConfig } = useConfig();
  const [visiblePalete, setVisiblePalete] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const bigDayCardNumbers = [1, 2, 3, 4, 5, 6];
  const backgroundImageRef = useRef<HTMLInputElement>(null);
  const hisImageRef = useRef<HTMLInputElement>(null);
  const hersImageRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const imageRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});

  const handleClick = (id: number) => {
    imageRefs.current[id]?.click();
  };

  const handleBackgroundImageUpload = () => {
    backgroundImageRef.current?.click();
  };
  const hisImageUpload = () => {
    hisImageRef.current?.click();
  };

  const hersImageUpload = () => {
    hersImageRef.current?.click();
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
        hero: {
          ...config.hero,
          heroImage: url,
        },
      });
    } catch (err) {
      console.error("Cloudinary upload failed", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDestinationImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    cardId: number,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      const url = await uploadImageToCloudinary(file);

      setConfig({
        ...config,
        destination: {
          ...config.destination,
          card: config.destination.card.map((c) =>
            c.id === cardId
              ? {
                  ...c,
                  image: url,
                }
              : c,
          ),
        },
      });
    } catch (err) {
      console.error("Cloudinary upload failed", err);
    } finally {
      setLoading(false);
    }
  };

  const handleHisImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      const url = await uploadImageToCloudinary(file);
      setConfig({
        ...config,
        ourStory: {
          ...config.ourStory,
          hisImage: url,
        },
      });
    } catch (err) {
      console.error("Cloudinary upload failed", err);
    } finally {
      setLoading(false);
    }
  };

  const handleHersImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      const url = await uploadImageToCloudinary(file);
      setConfig({
        ...config,
        ourStory: {
          ...config.ourStory,
          hersImage: url,
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
      const currentBoxes = prev.theBigDay.cards;

      if (count > currentBoxes.length) {
        const boxesToAdd: any[] = Array.from(
          { length: count - currentBoxes.length },
          (_, i) => ({
            id: Date.now() + i,
            title: "Naslov",
            description: "Opis",
            time: "Vreme",
            icon: PartyPopper,
          }),
        );
        return {
          ...prev,
          theBigDay: {
            ...prev.theBigDay,
            cards: [...currentBoxes, ...boxesToAdd],
          },
        };
      }

      if (count < currentBoxes.length) {
        return {
          ...prev,
          theBigDay: {
            ...prev.theBigDay,
            cards: currentBoxes.slice(0, count),
          },
        };
      }

      return prev;
    });
  };

  const updateLocationBoxCount = (count: number) => {
    setConfig((prev: DefaultConfig) => {
      const currentBoxes = prev.destination.card;

      if (count > currentBoxes.length) {
        const boxesToAdd: any[] = Array.from(
          { length: count - currentBoxes.length },
          (_, i) => ({
            id: currentBoxes.length + i,
            title: "Naslov",
            description: "Opis",
            location: "Lokacija",
            image: "",
          }),
        );
        return {
          ...prev,
          destination: {
            ...prev.destination,
            card: [...currentBoxes, ...boxesToAdd],
          },
        };
      }

      if (count < currentBoxes.length) {
        return {
          ...prev,
          destination: {
            ...prev.destination,
            card: currentBoxes.slice(0, count),
          },
        };
      }

      return prev;
    });
  };

  return (
    <div>
      <div
        style={{ cursor: "pointer" }}
        onClick={() => setVisiblePalete(!visiblePalete)}
      >
        <SettingsIcon
          width={52}
          height={52}
          color={hsvaToHex(config.main.primaryColor)}
        />
        <LoaderComponent isOpen={loading} text="Zamena slike u toku..." />
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
              showSection={config.ourStory.visible}
              setShowSection={() => {
                setConfig({
                  ...config,
                  ourStory: {
                    ...config.ourStory,
                    visible: !config.ourStory.visible,
                  },
                });
              }}
              sectionName={config.ourStory.title}
            />
            <SectionToggle
              showSection={config.theBigDay.visible}
              setShowSection={() => {
                setConfig({
                  ...config,
                  theBigDay: {
                    ...config.theBigDay,
                    visible: !config.theBigDay.visible,
                  },
                });
              }}
              sectionName={config.theBigDay.title}
            />
            <SectionToggle
              showSection={config.destination.visible}
              setShowSection={() => {
                setConfig({
                  ...config,
                  destination: {
                    ...config.destination,
                    visible: !config.destination.visible,
                  },
                });
              }}
              sectionName={config.destination.title}
            />
          </div>

          <div className={styles.settingsInnerContainer}>
            <h3 className={styles.groupContainerHeading}>
              Zamena Glavne slike
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
              style={{ marginBottom: "20px", display: "none" }}
            />
          </div>
          <div className={styles.settingsInnerContainer}>
            <h3 className={styles.groupContainerHeading}>Datum</h3>
            <p
              onClick={() => inputRef.current?.showPicker()}
              className={styles.imitationSelect}
            >
              Promeni datum
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
            <h3 className={styles.groupContainerHeading}>Njegova Slika</h3>
            <p onClick={hisImageUpload} className={styles.imitationSelect}>
              Izaberi Sliku
            </p>
            <input
              ref={hisImageRef}
              type="file"
              accept="image/*"
              onChange={handleHisImageUpload}
              style={{ marginBottom: "20px", display: "none" }}
            />
          </div>
          <div className={styles.settingsInnerContainer}>
            <h3 className={styles.groupContainerHeading}>Njena Slika</h3>
            <p onClick={hersImageUpload} className={styles.imitationSelect}>
              Izaberi Sliku
            </p>
            <input
              ref={hersImageRef}
              type="file"
              accept="image/*"
              onChange={handleHersImageUpload}
              style={{ marginBottom: "20px", display: "none" }}
            />
          </div>
          <div className={styles.settingsInnerContainer}>
            <h3 className={styles.groupContainerHeading}>Primarni Font</h3>
            <FontPicker
              value={config.main.primaryFont}
              onChange={(font) => {
                setConfig({
                  ...config,
                  main: {
                    ...config.main,
                    primaryFont: font,
                  },
                });
              }}
            />
          </div>
          <div className={styles.settingsInnerContainer}>
            <h3 className={styles.groupContainerHeading}>Sekundarni Font</h3>
            <FontPicker
              value={config.main.primaryFont}
              onChange={(font) => {
                setConfig({
                  ...config,
                  main: {
                    ...config.main,
                    secondaryFont: font,
                  },
                });
              }}
            />
          </div>
          <div className={styles.settingsInnerContainer}>
            <h3 className={styles.groupContainerHeading}>
              {config.theBigDay.title}: Broj Polja
            </h3>

            <div className={styles.boxFieldsContainer}>
              {bigDayCardNumbers.map((item, index) => (
                <div key={item}>
                  <p
                    className={styles.boxField}
                    onClick={() => updateBoxCount(item)}
                    style={{
                      color:
                        config.theBigDay.cards.length - 1 === index
                          ? "#2eb82e"
                          : "#fff",
                      border: `1px solid ${
                        config.theBigDay.cards.length - 1 === index
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
            <h3 className={styles.groupContainerHeading}>
              {config.destination.title}: Broj polja
            </h3>
            <div className={styles.boxFieldsContainer}>
              {bigDayCardNumbers.map((item, index) => (
                <div key={item}>
                  <p
                    className={styles.boxField}
                    onClick={() => updateLocationBoxCount(item)}
                    style={{
                      color:
                        config.destination.card.length - 1 === index
                          ? "#2eb82e"
                          : "#fff",
                      border: `1px solid ${
                        config.destination.card.length - 1 === index
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
            <div className={styles.imageFieldsContainer}>
              {config.destination.card.map((e) => (
                <div key={e.id}>
                  <h3 className={styles.groupContainerHeading}>
                    Slika {e.id}: {e.title}
                  </h3>
                  <input
                    ref={(el) => {
                      imageRefs.current[e.id] = el;
                    }}
                    type="file"
                    accept="image/*"
                    onChange={(event) =>
                      handleDestinationImageUpload(event, e.id)
                    }
                    style={{ marginBottom: "20px", display: "none" }}
                  />
                  <p
                    onClick={() => handleClick(e.id)}
                    className={styles.imitationSelect}
                  >
                    Izaberi Sliku
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.settingsInnerContainer}>
            <h3 className={styles.groupContainerHeading}>Primarna Boja</h3>
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
            <h3 className={styles.groupContainerHeading}>Sekundarna Boja</h3>
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
        </div>
      )}
    </div>
  );
};

export default SettingsApplication;
