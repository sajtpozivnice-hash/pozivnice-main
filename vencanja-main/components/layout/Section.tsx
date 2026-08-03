import { FC } from "react";
import styles from "./Section.module.css";
type SectionProps = {
  children: React.ReactNode;
  fullWidth?: boolean;
};

const Section: FC<SectionProps> = ({ children, fullWidth }) => {
  return (
    <section className={styles.section}>
      {fullWidth ? (
        children
      ) : (
        <div className={styles.container}>{children}</div>
      )}
    </section>
  );
};

export default Section;
