import React from "react";
import styles from "@/components/Cards/styles/styles.module.css";

function AppCard({
  title,
  description,
  colorPallet,
  icon,
  appLink,
}: {
  title: string;
  description: string;
  colorPallet: string;
  icon: string | null;
  appLink: string;
}) {
  return (
    <div className={styles.app_card}>
      <div>
        {icon ?? (
          <span
            style={{
              background: colorPallet,
            }}
          >
            {title.charAt(0).toUpperCase()}
          </span>
        )}{" "}
        <h4>{title}</h4>
      </div>
      <small>{description}</small>
      <a href={appLink} target="_blank">
        Launch
      </a>
    </div>
  );
}

export default AppCard;
