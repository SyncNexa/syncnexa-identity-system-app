import React from "react";
import styles from "./RecentAchievements.module.css";
import { formatDateTime } from "@/utils/formatters";

type AchvItem = {
  id: string;
  title: string;
  message: string;
  time: Date;
};

const mockItems: AchvItem[] = [
  {
    id: "a-1",
    title: "New Badge",
    message: "You obtained a new badge - Keep soaring high, champ.",
    time: new Date(2025, 10, 29, 12, 30),
  },
  {
    id: "a-2",
    title: "New Badge",
    message: "You obtained a new badge - Keep soaring high, champ.",
    time: new Date(2025, 10, 28, 9, 15),
  },
  {
    id: "a-3",
    title: "New Badge",
    message: "You obtained a new badge - Keep soaring high, champ.",
    time: new Date(2025, 10, 27, 15, 5),
  },
  {
    id: "a-4",
    title: "New Badge",
    message: "You obtained a new badge - Keep soaring high, champ.",
    time: new Date(2025, 10, 26, 8, 45),
  },
];

type Props = {
  items?: AchvItem[];
};

export default function RecentAchievements({ items = mockItems }: Props) {
  return (
    <div
      className={styles.wrapper}
      role="region"
      aria-label="Recent Achievements"
    >
      <ul className={styles.list}>
        {items.map((it) => (
          <li key={it.id} className={styles.item}>
            <div className={styles.badge} aria-hidden>
              🏅
            </div>

            <div className={styles.body}>
              <div className={styles.rowTop}>
                <p className={styles.itemTitle}>{it.title}</p>
              </div>

              <p className={styles.message}>{it.message}</p>

              <small className={styles.time}>
                {formatDateTime(it.time, {
                  hideAgo: false,
                  hideTime: false,
                  long: false,
                })}
              </small>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
