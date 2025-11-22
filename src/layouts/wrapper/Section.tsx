import React from "react";
import styles from "@/layouts/wrapper/style/style.module.css";

function Section({
  sectionTitle = "Section title",
  children,
}: {
  children: React.ReactNode;
  sectionTitle: string;
}) {
  return (
    <section className={styles.section}>
      <p className={styles.title}>{sectionTitle}</p>
      {children}
    </section>
  );
}

export default Section;
