import { FC } from "react";
import AnimatedArrowLeft from "../../icons/AnimatedArrowLeft";
import styles from "./NavigationBackToMainWebsite.module.css";
import { useRouter } from "next/navigation";

interface NavigationBackToMainWebsiteProps {
  text: string;
}

const NavigationBackToMainWebsite: FC<NavigationBackToMainWebsiteProps> = ({
  text,
}) => {
  const router = useRouter();

  return (
    <p className={styles.container} onClick={() => router.push("/pozivnice")}>
      <AnimatedArrowLeft color="var(--color-hot)" />
      {text}
    </p>
  );
};

export default NavigationBackToMainWebsite;
