import React from "react";
import styles from "./RecentActivity.module.css";
import { formatDateTime } from "@/utils/formatters";
import Section from "@/layouts/wrapper/Section";

type ActivityItem = {
  id: string;
  icon: string;
  title: string;
  message: string;
  time: Date;
  isUnread?: boolean;
};

type Props = {
  activities?: ActivityItem[];
  onFilterClick?: () => void;
};

const defaultActivities: ActivityItem[] = [
  {
    id: "1",
    icon: "👤",
    title: "Profile Access",
    message:
      "An app accessed your profile on Tuesday 10th, November 2025 4:50 PM. Review this now if you did not authorize this action.",
    time: new Date(2025, 10, 10, 16, 50),
    isUnread: true,
  },
  {
    id: "2",
    icon: "👤",
    title: "Profile Access",
    message:
      "An app accessed your profile on Tuesday 10th, November 2025 4:50 PM. Review this now if you did not authorize this action.",
    time: new Date(2025, 10, 10, 12, 30),
    isUnread: false,
  },
  {
    id: "3",
    icon: "🛡️",
    title: "Login Alert",
    message:
      "An app accessed your profile on Tuesday 10th, November 2025 4:50 PM. Review this now if you did not authorize this action.",
    time: new Date(2025, 10, 10, 12, 30),
    isUnread: false,
  },
  {
    id: "4",
    icon: "🛡️",
    title: "Login Alert",
    message:
      "An app accessed your profile on Tuesday 10th, November 2025 4:50 PM. Review this now if you did not authorize this action.",
    time: new Date(2025, 10, 10, 12, 30),
    isUnread: false,
  },
  {
    id: "5",
    icon: "📱",
    title: "Connection Request",
    message:
      "An app accessed your profile on Tuesday 10th, November 2025 4:50 PM. Review this now if you did not authorize this action.",
    time: new Date(2025, 10, 10, 12, 30),
    isUnread: false,
  },
];

export default function RecentActivity({
  activities = defaultActivities,
  onFilterClick,
}: Props) {
  return (
    <Section
      sectionTitle={"Recent Activity"}
      rightNode={
        <button className={styles.filterButton} onClick={onFilterClick}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M2 4H14M2 8H14M2 12H14"
              stroke="#4E4D4D"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <span>Filter</span>
        </button>
      }
    >
      <div className={styles.list}>
        {activities.map((activity) => (
          <div
            key={activity.id}
            className={`${styles.activityCard} ${
              activity.isUnread ? styles.unread : ""
            }`}
          >
            <p className={styles.activityTitle}>
              {activity.icon} {activity.title}
            </p>
            <p className={styles.activityMessage}>{activity.message}</p>
            <small className={styles.activityTime}>
              {formatDateTime(activity.time, {
                hideAgo: false,
                hideTime: false,
                long: false,
              })}
            </small>
          </div>
        ))}
      </div>
    </Section>
  );
}
