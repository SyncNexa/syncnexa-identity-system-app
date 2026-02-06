import React from "react";
import styles from "@/layouts/wrapper/style/style.module.css";

function DashboardLayout({
  pageTitle = "Page Title",
  children,
  breadcrumb,
  rightNode,
  sub,
}: {
  pageTitle: string;
  rightNode?: React.ReactNode;
  breadcrumb?: string;
  children: React.ReactNode;
  sub?: string;
}) {
  return (
    <section className={styles.dashbaord_layout}>
      <div>
        <h1>{pageTitle}</h1>
        {rightNode}
      </div>
      {breadcrumb || sub ? (
        <div>
          {sub ? <span className={styles.sub}>{sub}</span> : null}
          {breadcrumb ? (
            <span className={styles.breadcrumb}>{breadcrumb}</span>
          ) : null}
        </div>
      ) : null}

      {children}
    </section>
  );
}

export default DashboardLayout;
