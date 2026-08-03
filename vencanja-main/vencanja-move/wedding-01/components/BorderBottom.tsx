import { hsvaToHex } from "@uiw/react-color";
import styles from "../css/Components.module.css";
import { useInviteConfig } from "../InviteConfigContext";
const BorderBottom = () => {
  const { config } = useInviteConfig();
  return (
    <div
      style={{ borderColor: hsvaToHex(config.main.primaryColor) }}
      className={styles.borderBottom}
    ></div>
  );
};

export default BorderBottom;
