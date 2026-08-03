"use client";

import { hsvaToHex } from "@uiw/react-color";
import { useInviteConfig } from "../InviteConfigContext";
import styles from "../css/Components.module.css";
import SettingsIcon from "./SettingsIcon";
import { FC } from "react";

interface ChangeSmallImageProps {
  onClick: () => void;
}

const ChangeSmallImage: FC<ChangeSmallImageProps> = ({ onClick }) => {
  const { config } = useInviteConfig();
  return (
    <div
      onClick={onClick}
      style={{
        background: hsvaToHex(config.main.secondaryColor),
        padding: "20px",
        borderRadius: 20,
        position: "absolute",
        top: 80,
        right: 10,
        cursor: "move",
      }}
    >
      <h3
        style={{ color: hsvaToHex(config.main.primaryColor) }}
        className={styles.fontSizeH3}
      >
        Zameni pozadinsku sliku
      </h3>
      <SettingsIcon
        color={hsvaToHex(config.main.primaryColor)}
        width={80}
        height={80}
      />
    </div>
  );
};

export default ChangeSmallImage;
