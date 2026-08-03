import styles from "../css/Components.module.css";
import BorderBottom from "./BorderBottom";
import { boxShadow } from "../constants";
import { hsvaToHex } from "@uiw/react-color";
import { useInviteConfig } from "../InviteConfigContext";

const FooterBottom = () => {
  const { config, setConfig } = useInviteConfig();

  return (
    <footer className={styles.footerWrapper}>
      <div
        className={styles.footerBox}
        style={{
          backgroundColor: hsvaToHex(config.main.secondaryColor),
          ...boxShadow(hsvaToHex(config.main.primaryColor)),
        }}
      >
        <BorderBottom />
        <h1
          className={styles.fontInviteClassic}
          style={{ color: hsvaToHex(config.main.primaryColor) }}
        >
          {config.main.header}
        </h1>
        <h3
          className={`${styles.fontSizeH3} ${styles.editable} ${styles.fontInviteClassic}`}
          style={{ color: hsvaToHex(config.main.primaryColor) }}
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) =>
            setConfig({
              ...config,
              footer: {
                ...config.footer,
                title: e.currentTarget.innerText,
              },
            })
          }
        >
          {config.footer.title}
        </h3>
        <p className={styles.fontSizeP}>❤️</p>
        <h3
          className={`${styles.fontSizeH3} ${styles.editable} ${styles.fontInviteClassic}`}
          style={{ color: hsvaToHex(config.main.primaryColor) }}
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) =>
            setConfig({
              ...config,
              footer: {
                ...config.footer,
                description: e.currentTarget.innerText,
              },
            })
          }
        >
          {config.footer.description}
        </h3>
        <BorderBottom />
      </div>
    </footer>
  );
};

export default FooterBottom;
