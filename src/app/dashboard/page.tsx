import AppCard from "@/components/Cards/AppCard";
import NotificationCard from "@/components/Cards/NotificationCard";
import RecentAchievements from "@/components/RecentAchievements/RecentAchievements";
import DashboardLayout from "@/layouts/wrapper/DashboardLayout";
import Section from "@/layouts/wrapper/Section";
import React from "react";
import styles from "@/app/dashboard/style/style.module.css";
import Link from "next/link";

function RootDashboard() {
  const apps = [
    {
      title: "PeerGrid",
      description:
        "Connect with millions of peers from across the globe. Find like minded individuals within your campus",
      icon: null,
      colorPallet: "linear-gradient(129deg, #0080FF 4.09%, #00060C 95.91%)",
      appLink: "https://peergrid.syncnexa.com",
    },
    {
      title: "SyncMart",
      description: "Effortlessly buy from a digital market run by your peers.",
      icon: null,
      colorPallet: " linear-gradient(129deg, #0FD 4.09%, #00060C 95.91%)",
      appLink: "https://peergrid.syncnexa.com",
    },
    {
      title: "SyncMe",
      description:
        "Access thousands of jobs from across different companies tailored for students.",
      icon: null,
      colorPallet: " linear-gradient(129deg, #FF6F00 4.09%, #00060C 95.91%)",
      appLink: "https://peergrid.syncnexa.com",
    },
  ];

  const notifications: NotificationPayload[] = [
    {
      id: "n-1",
      type: "access",
      typeLabel: "👤 Profile Access",
      message: "Your profile was viewed by John Doe from PeerGrid.",
      time: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      read: false,
      destination: "Profile",
    },
    {
      id: "n-2",
      type: "alert",
      typeLabel: "🛡️ Login Alert",
      message: "New sign-in from a new device in Lagos, Nigeria.",
      time: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
      read: false,
      destination: "Security",
    },
    {
      id: "n-3",
      type: "system",
      typeLabel: "🛠️ System Update",
      message: "Maintenance completed — services are operating normally.",
      time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
      read: true,
      destination: null,
    },
    {
      id: "n-4",
      type: "info",
      typeLabel: "🛡️ Login Alert",
      message: "Your password was changed successfully.",
      time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), // 30 days ago
      read: true,
      destination: null,
    },
  ];

  return (
    <DashboardLayout pageTitle="Overview">
      <div className={styles.overview}>
        <div>
          <Section sectionTitle="Active Apps">
            <div className={styles.apps_container}>
              {apps.map((app, i) => (
                <AppCard key={i} {...app} />
              ))}
            </div>
          </Section>
          <Section
            sectionTitle="Recent Achievements"
            rightNode={
              <Link href="#" className={styles.seeAllLink}>
                Add
              </Link>
            }
          >
            <RecentAchievements />
          </Section>
        </div>
        <Section sectionTitle="Notifications">
          <div className={styles.notifications_container}>
            {notifications.map((n) => (
              <NotificationCard key={n.id} {...n} />
            ))}
          </div>
        </Section>
      </div>
    </DashboardLayout>
  );
}

export default RootDashboard;
