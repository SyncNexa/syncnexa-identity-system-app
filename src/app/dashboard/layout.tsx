"use client";
import Stroke from "@/components/Stroke/Stroke";
import SideBar from "@/layouts/navigation/sidebar/SideBar";
import React from "react";
import "../globals.css";
import styles from "@/app/dashboard/overview/style/style.module.css";

import NavigationProvider from "@/contexts/NavigationContext";
import UserProvider from "@/contexts/UserContext";
import TopBar from "./TopBar";

function RootDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const windowSize = useWindow();
  // alert("Window size is: " + windowSize.width);

  return (
    <UserProvider>
      <NavigationProvider>
        <main className={styles.dashboard_layout}>
          <TopBar />
          <Stroke direction="horizontal" color="var(--color-border)" size={1} />
          <section className={styles.bottom_area}>
            <div className={styles.bottom_area_left}>
              <SideBar />
            </div>
            <Stroke direction="vertical" color="var(--color-border)" size={1} />
            <div className={styles.bottom_area_right}>{children}</div>
          </section>
        </main>
      </NavigationProvider>
    </UserProvider>
  );
}

export default RootDashboardLayout;
