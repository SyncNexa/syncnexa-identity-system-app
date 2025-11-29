import React from "react";
import styles from "@/layouts/wrapper/style/style.module.css";

function Section({
  sectionTitle = "Section title",
  children,
  rightNode,
}: {
  children: React.ReactNode;
  sectionTitle: string;
  rightNode?: React.ReactNode;
}) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <p className={styles.title}>{sectionTitle}</p>
        {rightNode}
      </div>
      {children}
    </section>
  );
}

export default Section;
