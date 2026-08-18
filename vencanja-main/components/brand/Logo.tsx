import Link from "next/link";
import styles from "./Logo.module.css";

type LogoProps = {
  variant?: "full" | "mark";
  href?: string | null;
  className?: string;
  /** Soft mark on light UI (default) or solid hot mark for dark/contrast surfaces */
  tone?: "soft" | "solid";
  size?: "sm" | "md" | "lg";
};

const Mark = ({ tone }: { tone: "soft" | "solid" }) => {
  const soft = tone === "soft";
  const ink = soft ? "var(--color-hot)" : "#fff";

  return (
    <svg
      className={styles.mark}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect
        width="48"
        height="48"
        rx="12"
        fill={soft ? "var(--color-primary)" : "var(--color-hot)"}
      />
      {soft ? (
        <rect
          x="1.25"
          y="1.25"
          width="45.5"
          height="45.5"
          rx="10.75"
          stroke="var(--color-hot)"
          strokeOpacity="0.28"
          strokeWidth="1.5"
        />
      ) : null}
      {/* V */}
      <path
        d="M9.5 13L16.75 34.5L24 13"
        stroke={ink}
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.25 13h4.5M21.5 13h4.5"
        stroke={ink}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* D */}
      <path
        d="M27.5 13v21.5"
        stroke={ink}
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <path
        d="M27.5 13h3.2c6.2 0 10.3 4.7 10.3 10.75S36.9 34.5 30.7 34.5H27.5"
        stroke={ink}
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const Logo = ({
  variant = "full",
  href = "/",
  className = "",
  tone = "soft",
  size = "md",
}: LogoProps) => {
  const content = (
    <span
      className={`${styles.root} ${styles[size]} ${variant === "mark" ? styles.markOnly : ""} ${className}`}
    >
      <Mark tone={tone} />
      {variant === "full" ? (
        <span className={styles.wordmark}>Vaš događaj</span>
      ) : (
        <span className={styles.visuallyHidden}>Vaš događaj</span>
      )}
    </span>
  );

  if (href === null) {
    return content;
  }

  return (
    <Link href={href} className={styles.link} aria-label="Vaš događaj — početna">
      {content}
    </Link>
  );
};

export default Logo;
