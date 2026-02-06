"use client";
import Ellipsis from "@/assets/icons/Ellipsis";
import React from "react";
import styles from "./style/style.module.css";

function ActionDrop({ children, onClick, icon = <Ellipsis /> }: ActionDrop) {
  const [dropped, setDropped] = React.useState(false);
  return (
    <div
      //   onMouseLeave={() => setDropped(false)}
      //   onMouseEnter={() => setDropped(true)}
      className={styles.action_drop}
      onClick={onClick}
    >
      <button
        className={styles.btn}
        onClick={() => setDropped((prev) => !prev)}
      >
        {icon}
      </button>
      {dropped && (
        <div className={styles.drop}>
          {children.map((child) => (
            <div
              key={child.value}
              onClick={() => {
                child.onClick(child.value);
                setDropped(false);
              }}
              className={styles.drop_item}
            >
              {child.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ActionDrop;
