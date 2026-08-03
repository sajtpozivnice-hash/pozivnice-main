"use client";
import styles from "./SectionToggle.module.css";

interface SectionToggleProps {
  showSection: boolean;
  setShowSection: () => void;
  sectionName: string;
}

const SectionToggle = ({
  showSection,
  setShowSection,
  sectionName,
}: SectionToggleProps) => {
  return (
    <div className={styles.container}>
      <span className={styles.title}>{sectionName}</span>

      <div
        onClick={setShowSection}
        style={{
          width: 45,
          height: 24,
          borderRadius: 50,
          background: showSection ? "#22c55e" : "#ccc",
          position: "relative",
          cursor: "pointer",
          transition: "0.3s",
        }}
      >
        <div
          style={{
            width: 18,
            height: 18,
            background: "white",
            borderRadius: "50%",
            position: "absolute",
            top: 3,
            left: showSection ? 24 : 3,
            transition: "0.3s",
          }}
        />
      </div>
    </div>
  );
};

export default SectionToggle;
