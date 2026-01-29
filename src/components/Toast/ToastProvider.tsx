"use client";

import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./Toast.module.css";

const DEFAULT_DURATION = 5000;
const DEFAULT_POSITION: ToastPosition = "top-right";

export const ToastContext = createContext<ToastContextValue | null>(null);

const positionClassMap: Record<ToastPosition, string> = {
  "top-left": styles.topLeft,
  "top-right": styles.topRight,
  "bottom-left": styles.bottomLeft,
  "bottom-right": styles.bottomRight,
  "top-center": styles.topCenter,
  "bottom-center": styles.bottomCenter,
};

const positions: ToastPosition[] = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
];

function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const counterRef = useRef(0);
  const timersRef = useRef<Map<string, number>>(new Map());

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
    const timer = timersRef.current.get(id);
    if (timer) {
      window.clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);

  const clearToasts = useCallback(() => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current.clear();
    setToasts([]);
  }, []);

  const showToast = useCallback(
    (options: ToastOptions) => {
      const id =
        options.id ||
        `toast-${Date.now()}-${(counterRef.current += 1).toString(36)}`;
      const toast: ToastItem = {
        id,
        title: options.title ?? "",
        message: options.message,
        type: options.type ?? "info",
        duration: options.duration ?? DEFAULT_DURATION,
        position: options.position ?? DEFAULT_POSITION,
      };

      setToasts((prev) => [...prev, toast]);

      if (toast.duration > 0) {
        const timer = window.setTimeout(() => dismissToast(id), toast.duration);
        timersRef.current.set(id, timer);
      }

      return id;
    },
    [dismissToast],
  );

  useEffect(() => () => clearToasts(), [clearToasts]);

  const value = useMemo(
    () => ({ showToast, dismissToast, clearToasts }),
    [showToast, dismissToast, clearToasts],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className={styles.toastRoot} aria-live="polite" aria-atomic="true">
        {positions.map((position) => {
          const grouped = toasts.filter((toast) => toast.position === position);
          if (!grouped.length) return null;

          return (
            <div
              key={position}
              className={`${styles.toastContainer} ${positionClassMap[position]}`}
            >
              {grouped.map((toast) => (
                <div
                  key={toast.id}
                  className={`${styles.toast} ${styles[toast.type]}`}
                  role={toast.type === "error" ? "alert" : "status"}
                >
                  <div className={styles.iconWrap} aria-hidden>
                    <ToastIcon type={toast.type} />
                  </div>
                  <div className={styles.content}>
                    {toast.title ? (
                      <p className={styles.title}>{toast.title}</p>
                    ) : null}
                    <p className={styles.message}>{toast.message}</p>
                  </div>
                  <button
                    className={styles.closeButton}
                    aria-label="Dismiss notification"
                    onClick={() => dismissToast(toast.id)}
                  >
                    <svg viewBox="0 0 20 20" aria-hidden>
                      <path d="M5.5 5.5l9 9m0-9l-9 9" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

function ToastIcon({ type }: { type: ToastType }) {
  switch (type) {
    case "success":
      return (
        <svg viewBox="0 0 24 24" aria-hidden>
          <path d="M9.2 16.2l-3.4-3.4-1.4 1.4 4.8 4.8 10-10-1.4-1.4-8.6 8.6z" />
        </svg>
      );
    case "error":
      return (
        <svg viewBox="0 0 24 24" aria-hidden>
          <path d="M6.3 6.3l11.4 11.4m0-11.4L6.3 17.7" />
        </svg>
      );
    case "warning":
      return (
        <svg viewBox="0 0 24 24" aria-hidden>
          <path d="M12 3l10 18H2L12 3zm0 6.5v5m0 3.5h.01" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" aria-hidden>
          <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 6.5a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4zM11 12h2v6h-2z" />
        </svg>
      );
  }
}

export default ToastProvider;
