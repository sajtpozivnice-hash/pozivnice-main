import styles from "../css/Components.module.css";
import { boxShadow } from "../constants";
import { hsvaToHex } from "@uiw/react-color";
import { useInviteConfig } from "../InviteConfigContext";
import SettingsApplication from "./SettingsApplication/SettingsApplication";
import NavigationBackToMainWebsite from "@/app/components/shared/NavigationBackToMainWebsite/NavigationBackToMainWebsite";

const Navigation = () => {
  const { config } = useInviteConfig();
  return (
    <div
      className={styles.navigationContainer}
      style={{
        background: hsvaToHex(config.main.secondaryColor),
        ...boxShadow(hsvaToHex(config.main.primaryColor)),
      }}
    >
      <NavigationBackToMainWebsite text={"Nazad na sajt"} />
      <ul className={styles.navigationList}>
        <li>
          <a
            style={{ color: hsvaToHex(config.main.primaryColor) }}
            className={`${styles.link} ${styles.fontInviteClassic}`}
            href="#our-story"
          >
            Priča
          </a>
        </li>
        <li>
          <a
            style={{ color: hsvaToHex(config.main.primaryColor) }}
            className={`${styles.link} ${styles.fontInviteClassic}`}
            href="#lokacija"
          >
            Lokacija
          </a>
        </li>
        <li>
          <a
            style={{ color: hsvaToHex(config.main.primaryColor) }}
            className={`${styles.link} ${styles.fontInviteClassic}`}
            href="#confirmation"
          >
            Potvrda
          </a>
        </li>
        <SettingsApplication />
      </ul>
    </div>
  );
};

export default Navigation;
