"use client";
import React, { useState } from "react";
import styles from "./style/style.module.css";

function ToggleButton({ turned = false }: { turned?: boolean }) {
  const [on, setOn] = useState(turned);
  return (
    <div className={styles.toggle}>
      <input type="checkbox" />
      <span className={styles.thumb} />
      <span className={styles.color} />
    </div>
  );
}

export default ToggleButton;
