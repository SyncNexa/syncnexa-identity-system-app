"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SyncButton from "@/components/Button";
import { APP_ROUTES } from "@/routes/paths";
import styles from "./style.module.css";

export default function SessionExpired() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (countdown <= 0) {
      router.push(APP_ROUTES.LOGIN);
    }
  }, [countdown, router]);

  const handleLoginNow = () => {
    router.push(APP_ROUTES.LOGIN);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.iconWrapper}>
          <svg
            className={styles.icon}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
              fill="currentColor"
            />
          </svg>
        </div>

        <h1 className={styles.title}>Session Expired</h1>

        <p className={styles.description}>
          Your session has expired due to inactivity. For your security, please
          log in again to continue.
        </p>

        <div className={styles.actions}>
          <SyncButton
            label="Log In Now"
            onClick={handleLoginNow}
            variant="primary"
            color="green"
          />
        </div>

        <p className={styles.countdown}>
          Redirecting to login in{" "}
          <span className={styles.timer}>{countdown}</span> seconds...
        </p>
      </div>
    </div>
  );
}
