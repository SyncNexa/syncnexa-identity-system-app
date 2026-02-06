"use client";
import React, { useState } from "react";
import styles from "./styles/Tab.module.css";

function Tab({ headers, contents, defaultTab }: Tab) {
  const [key, setKey] = useState(defaultTab ?? headers[0].value);
  function renderTab(contents: Tab["contents"], key: string) {
    return contents.find((con) => con.value === key) ?? null;
  }
  return (
    <section className={styles.tab}>
      <div className={styles.header}>
        {headers.map((h, i) => (
          <button
            key={i}
            onClick={() => setKey(h.value)}
            className={key === h.value ? styles.active : ""}
          >
            {h.label}
          </button>
        ))}
      </div>
      {renderTab(contents, key)?.content}
    </section>
  );
}

export default Tab;
