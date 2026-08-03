import { FC } from "react";
import { Toast } from "./ToastContext";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./ToastsComponent.module.css";

interface ToastProps {
  toasts: Toast[];
}

const ToastComponent: FC<ToastProps> = ({ toasts }) => {
  return (
    <motion.div className={styles.container}>
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            className={styles.toast}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              style={{
                color:
                  t.type === "success"
                    ? "var(--color-success)"
                    : t.type === "error"
                      ? "var(--color-warning)"
                      : "var(--color-accent)",
              }}
            >
              {t.message}
            </motion.p>
            <motion.div className={styles.progressBar}>
              <motion.div
                style={{
                  height: "100%",
                  background:
                    t.type === "success"
                      ? "var(--color-success)"
                      : t.type === "error"
                        ? "var(--color-warning)"
                        : "var(--color-accent)",
                }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 3, ease: "linear" }}
              />
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default ToastComponent;
