import { FC } from "react";
import styles from "./Section.module.css";

type SectionProps = {
  children: React.ReactNode;
  fullWidth?: boolean;
  id?: string;
};

const Section: FC<SectionProps> = ({ children, fullWidth, id }) => {
  return (
    <section className={styles.section} id={id}>
      {fullWidth ? (
        children
      ) : (
        <div className={styles.container}>{children}</div>
      )}
    </section>
  );
};

export default Section;
