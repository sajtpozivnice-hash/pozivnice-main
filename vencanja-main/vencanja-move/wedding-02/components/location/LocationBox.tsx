import { FC } from "react";
import styles from "./Location.module.css";
import { hsvaToHex } from "@uiw/react-color";
import { useConfig } from "../../ConfigContext";
import { fonts } from "@/fontsForInvites";
import { DefaultConfig } from "../../jsonConfig";
import editable from "../GlobalCss.module.css";
type LocationBoxProps = {
  id: number;
  title: string;
  description: string;
  image: string;
};

const LocationBox: FC<LocationBoxProps> = ({
  id,
  title,
  description,
  image,
}) => {
  const { config, setConfig } = useConfig();
  const classHandler =
    id % 2 === 0
      ? `${styles.innerContainerWrapper}`
      : `${styles.innerContainerWrapperReverse}`;

  const updateBoxField = (id: number, field: keyof any, value: string) => {
    setConfig((prev: DefaultConfig) => ({
      ...prev,
      destination: {
        ...prev.destination,
        card: prev.destination.card.map((b) =>
          b.id === id ? { ...b, [field]: value } : b,
        ),
      },
    }));
  };

  return (
    <div className={classHandler}>
      <div className={styles.venueCard}>
        <div className={styles.venueImageWrapper}>
          <img
            src={image}
            className={styles.venueImage}
            alt="Venue Landscape"
          />
          <div className={styles.imageOverlay}></div>
          <div
            style={{ backgroundColor: hsvaToHex(config.main.secondaryColor) }}
            className={styles.venueInfoCard}
          >
            <p
              style={{
                color: hsvaToHex(config.main.primaryColor),
                fontFamily: fonts[config.main.primaryFont].style.fontFamily,
              }}
              className={`${styles.venueInfoCardTitle} ${editable.editable}`}
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) =>
                updateBoxField(id, "title", e.currentTarget.innerText)
              }
            >
              {title}
            </p>
            <p
              style={{
                color: hsvaToHex(config.main.primaryColor),
                fontFamily: fonts[config.main.secondaryFont].style.fontFamily,
              }}
              className={`${styles.venueInfoCardSubtitle} ${editable.editable}`}
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) =>
                updateBoxField(id, "description", e.currentTarget.innerText)
              }
            >
              {description}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.mapWrapper}>
        <iframe
          src={`https://www.google.com/maps?q=${encodeURIComponent(description)}&output=embed`}
          className={styles.mapIframe}
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default LocationBox;
