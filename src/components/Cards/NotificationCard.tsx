import { formatDateTime } from "@/utils/formatters";
import React from "react";
import styles from "@/components/Cards/styles/styles.module.css";

function NotificationCard({
  destination,
  id,
  message,
  read,
  time,
  type,
  typeLabel,
}: NotificationPayload) {
  const initial =
    (destination && String(destination).trim().charAt(0).toUpperCase()) ||
    (type && String(type).trim().charAt(0).toUpperCase()) ||
    "N";

  return (
    <div
      className={`${styles.notification_card} ${read ? "" : styles.unread}`}
      role="article"
      aria-labelledby={`notification-${id}-title`}
    >
      <div className={styles.content}>
        <div className={styles.header}>
          <p id={`notification-${id}-title`} className={styles.title}>
            {typeLabel}
          </p>
          {!read && <span className={styles.unread_dot} aria-hidden />}
        </div>

        <p className={styles.message}>{message}</p>

        <small className={styles.time}>
          {formatDateTime(time, {
            hideAgo: false,
            hideTime: false,
            long: false,
          })}
        </small>
      </div>
    </div>
  );
}

export default NotificationCard;
