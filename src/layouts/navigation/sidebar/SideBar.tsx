"use client";
import Link from "next/link";
import React from "react";
import styles from "@/layouts/navigation/sidebar/style/style.module.css";
import { usePathname } from "next/navigation";
import DashboardIcon from "@/assets/icons/Dashboard";
import UserIcon from "@/assets/icons/User";
import SettingsIcon from "@/assets/icons/Settings";
import { APP_ROUTES } from "@/routes/paths";
import IdentityIcon from "@/assets/icons/Identity";
import VerificationIcon from "@/assets/icons/Verification";
import DocumentIcon from "@/assets/icons/Document";
import LinkIcon from "@/assets/icons/Link";
import SecurityIcon from "@/assets/icons/Security";
import Image from "next/image";

function SideBar() {
  const pathname = usePathname();
  const upTabs = [
    {
      label: "Overview",
      path: APP_ROUTES.OVERVIEW,
      icon: (
        <DashboardIcon
          color={
            pathname === APP_ROUTES.OVERVIEW
              ? "var(--color-white)"
              : "var(--color-title)"
          }
        />
      ),
    },
    {
      label: "Identity Management",
      path: APP_ROUTES.IDENTITY,
      icon: (
        <IdentityIcon
          color={
            pathname === APP_ROUTES.IDENTITY
              ? "var(--color-white)"
              : "var(--color-title)"
          }
        />
      ),
    },
    {
      label: "Verification",
      path: APP_ROUTES.VERIFICATION,
      icon: (
        <VerificationIcon
          color={
            pathname === APP_ROUTES.VERIFICATION
              ? "var(--color-white)"
              : "var(--color-title)"
          }
        />
      ),
    },
    {
      label: "Documents",
      path: APP_ROUTES.DOCUMENTS,
      icon: (
        <DocumentIcon
          color={
            pathname === APP_ROUTES.DOCUMENTS
              ? "var(--color-white)"
              : "var(--color-title)"
          }
        />
      ),
    },
    {
      label: "Connected Apps",
      path: APP_ROUTES.APPS,
      icon: (
        <LinkIcon
          color={
            pathname === APP_ROUTES.APPS
              ? "var(--color-white)"
              : "var(--color-title)"
          }
        />
      ),
    },
    {
      label: "Security",
      path: APP_ROUTES.SECURITY,
      icon: (
        <SecurityIcon
          color={
            pathname === APP_ROUTES.SECURITY
              ? "var(--color-white)"
              : "var(--color-title)"
          }
        />
      ),
    },
  ];
  const downTabs = [
    {
      label: "Settings",
      path: APP_ROUTES.SETTINGS,
      icon: (
        <SettingsIcon
          color={
            pathname === APP_ROUTES.SETTINGS
              ? "var(--color-white)"
              : "var(--color-title)"
          }
        />
      ),
    },
    {
      label: "Logout",
      path: APP_ROUTES.LOGOUT,
      icon: (
        <UserIcon
          color={
            pathname === APP_ROUTES.LOGOUT
              ? "var(--color-white)"
              : "var(--color-title)"
          }
        />
      ),
    },
  ];
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        {upTabs.map((tab, i) => (
          <Link
            key={i}
            href={tab.path}
            className={pathname === tab.path ? styles.active : ""}
          >
            {tab.icon}
            {tab.label}
          </Link>
        ))}
      </div>
      <div className={styles.container}>
        {downTabs.map((tab, i) => (
          <Link
            key={i}
            href={tab.path}
            className={pathname === tab.path ? styles.active : ""}
          >
            {tab.icon}
            {tab.label}
          </Link>
        ))}
        <div className={styles.user_profile}>
          <Image
            src={"/next.svg"}
            alt=""
            width={50}
            height={50}
            quality={100}
          />
          <div>
            <b>Osuagwu C.F</b>
            <small>Student</small>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default SideBar;
