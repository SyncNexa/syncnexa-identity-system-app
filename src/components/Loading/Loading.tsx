import React from "react";
import styles from "./Loading.module.css";

interface LoadingProps {
  size?: "small" | "medium" | "large";
  fullHeight?: boolean;
}

export default function Loading({
  size = "medium",
  fullHeight = false,
}: LoadingProps) {
  return (
    <div
      className={`${styles.loadingContainer} ${
        fullHeight ? styles.fullHeight : ""
      }`}
    >
      <div className={`${styles.spinner} ${styles[size]}`} />
    </div>
  );
}
