import React from "react";
import styles from "@/layouts/wrapper/style/style.module.css";

function DashboardLayout({
  pageTitle = "Page Title",
  children,
  breadcrumb,
  rightNode,
}: {
  pageTitle: string;
  rightNode?: React.ReactNode;
  breadcrumb?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={styles.dashbaord_layout}>
      <div>
        <h1>{pageTitle}</h1>
        {rightNode}
      </div>
      {breadcrumb ? <div></div> : null}

      {children}
    </section>
  );
}

export default DashboardLayout;
