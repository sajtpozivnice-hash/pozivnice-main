"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./Button.module.css";
import { AnimatedIconProps } from "@/types/general";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps {
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  type?: "button" | "submit" | "reset";
  maxWidth?: string | number;
  id?: string;
  className?: string;
  icon?: React.FC<AnimatedIconProps>;
  iconSize?: number;
  iconDelay?: number;
  buttonDelay?: number;
  buttonDuration?: number;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  loading = false,
  disabled = false,
  children,
  onClick,
  type = "button",
  maxWidth,
  id,
  className = "",
  icon: Icon,
  iconSize,
  iconDelay,
  buttonDelay = 0,
  buttonDuration = 0.5,
}) => {
  const combinedClassName = `${styles.button} ${styles[`button-${variant}`]} ${className}`;

  return (
    <motion.button
      id={id}
      type={type}
      onClick={onClick}
      className={combinedClassName}
      disabled={disabled || loading}
      style={{
        maxWidth,
        width: maxWidth ? maxWidth : "100%",
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: buttonDelay,
        duration: buttonDuration,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={
        !disabled && !loading
          ? { scale: 1.05, transition: { duration: 0.2, ease: "easeOut" } }
          : {}
      }
      whileTap={
        !disabled && !loading
          ? { scale: 0.97, transition: { duration: 0.1 } }
          : {}
      }
    >
      {loading && <span className={styles.spinner}></span>}

      <div style={{ opacity: loading ? 0.6 : 1 }}>
        <div className={styles.contentContainer}>
          {children}
          {Icon && <Icon size={iconSize} delay={iconDelay} />}
        </div>
      </div>
    </motion.button>
  );
};

export default Button;
