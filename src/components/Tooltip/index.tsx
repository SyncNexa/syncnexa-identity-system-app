import React from "react";
import styles from "./styles/Tooltip.module.css";

function Tooltip({
  content,
  position,
  node,
  className,
}: {
  content: string;
  position?: "top" | "bottom" | "left" | "right";
  node?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`${styles.tooltip} ${className}`} data-position={position}>
      {node}
      <p className={styles.tooltiptext}>{content}</p>
    </div>
  );
}

export default Tooltip;
