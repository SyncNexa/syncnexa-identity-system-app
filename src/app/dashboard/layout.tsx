import Stroke from "@/components/Stroke/Stroke";
import SideBar from "@/layouts/navigation/sidebar/SideBar";
import Image from "next/image";
import React from "react";
import "../globals.css";
import SyncSearch from "@/components/Input/SyncSearch";
import styles from "@/app/dashboard/overview/style/style.module.css";
import HelpIcon from "@/assets/icons/Help";

function RootDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={styles.dashboard_layout}>
      <section className={styles.top_area}>
        <div className={styles.top_area_left}>
          <Image
            src={"/logo.svg"}
            alt="SyncNexa logo"
            width={100}
            height={20}
            quality={100}
            priority
          />
          <h2>SyncNexa</h2>
        </div>
        <Stroke direction="vertical" color="var(--color-border)" size={1} />
        <div className={styles.top_area_right}>
          <SyncSearch />
          <div className={styles.top_area_right_right}>
            <button className={styles.green_button}>
              <HelpIcon width={15} height={15} />
              HELP
            </button>
          </div>
        </div>
      </section>
      <Stroke direction="horizontal" color="var(--color-border)" size={1} />
      <section className={styles.bottom_area}>
        <div className={styles.bottom_area_left}>
          <SideBar />
        </div>
        <Stroke direction="vertical" color="var(--color-border)" size={1} />
        <div className={styles.bottom_area_right}>{children}</div>
      </section>
    </main>
  );
}

export default RootDashboardLayout;
