"use client";
import Link from "next/link";
import React from "react";
import styles from "@/layouts/navigation/sidebar/style/style.module.css";
import { usePathname } from "next/navigation";
import DashboardIcon from "@/assets/icons/Dashboard";
import UserIcon from "@/assets/icons/User";
import ApplicationIcon from "@/assets/icons/Application";
import FolderIcon from "@/assets/icons/Folder";
import SettingsIcon from "@/assets/icons/Settings";

function SideBar() {
  const pathname = usePathname();
  const tabs = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: (
        <DashboardIcon
          color={pathname === "/dashboard" ? "var(--color-primary)" : "#707070"}
        />
      ),
    },
    {
      label: "Profile",
      path: "/profile",
      icon: (
        <UserIcon
          color={pathname === "/profile" ? "var(--color-primary)" : "#707070"}
        />
      ),
    },
    {
      label: "Applications",
      path: "/applications",
      icon: (
        <ApplicationIcon
          color={
            pathname === "/applications" ? "var(--color-primary)" : "#707070"
          }
        />
      ),
    },
    {
      label: "Achievements",
      path: "/achievement",
      icon: (
        <FolderIcon
          color={
            pathname === "/achievement" ? "var(--color-primary)" : "#707070"
          }
        />
      ),
    },
    {
      label: "Settings",
      path: "/settings",
      icon: (
        <SettingsIcon
          color={pathname === "/settings" ? "var(--color-primary)" : "#707070"}
        />
      ),
    },
  ];
  return (
    <nav className={styles.nav}>
      {tabs.map((tab, i) => (
        <Link
          key={i}
          href={tab.path}
          className={pathname === tab.path ? styles.active : ""}
        >
          {tab.icon}
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}

export default SideBar;
