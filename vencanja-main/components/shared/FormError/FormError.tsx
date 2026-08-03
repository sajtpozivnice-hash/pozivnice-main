import { FC } from "react";
import styles from "./FormError.module.css";

interface FormErrorProps {
  message?: string;
}

const FormError: FC<FormErrorProps> = ({ message }) => {
  if (!message) return null;

  return <p className={styles.error}>{message}</p>;
};

export default FormError;
