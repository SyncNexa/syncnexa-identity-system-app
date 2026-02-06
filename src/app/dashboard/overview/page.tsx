"use client";
import DashboardLayout from "@/layouts/wrapper/DashboardLayout";
import Section from "@/layouts/wrapper/Section";
import VerificationProgress from "@/components/VerificationProgress/VerificationProgress";
import DigitalStudentID from "@/components/DigitalStudentID/DigitalStudentID";
import RecentActivity from "@/components/RecentActivity/RecentActivity";
import styles from "@/app/dashboard/overview/style/style.module.css";
import { useState } from "react";

function OverviewPage() {
  const [active, setActive] = useState(0);
  return (
    <DashboardLayout
      pageTitle="Overview"
      sub="Quick snapshot of identity, verification, and activity."
    >
      <div className={styles.overview}>
        <div className={styles.trigger}>
          {["Verification Progress", "Digital Student ID"].map((btn, i) => (
            <button
              key={i}
              className={active === i ? styles.active : ""}
              onClick={() => setActive(i)}
            >
              {btn}
            </button>
          ))}
        </div>
        <div className={styles.mainContent}>
          <div className={styles.small_screen}>
            {active === 1 ? (
              <Section sectionTitle="Digital Student ID">
                <DigitalStudentID />
              </Section>
            ) : (
              <Section sectionTitle="Verification Progress">
                <VerificationProgress
                  percentage={100}
                  steps={[
                    { id: "personal", label: "Personal Info", completed: true },
                    { id: "academic", label: "Academic Info", completed: true },
                    { id: "documents", label: "Documents", completed: true },
                    {
                      id: "school",
                      label: "School Verification",
                      completed: false,
                    },
                  ]}
                />
              </Section>
            )}
          </div>
          <div className={styles.big_screen}>
            <Section sectionTitle="Verification Progress">
              <VerificationProgress
                percentage={100}
                steps={[
                  { id: "personal", label: "Personal Info", completed: true },
                  { id: "academic", label: "Academic Info", completed: true },
                  { id: "documents", label: "Documents", completed: true },
                  {
                    id: "school",
                    label: "School Verification",
                    completed: false,
                  },
                ]}
              />
            </Section>

            <Section sectionTitle="Digital Student ID">
              <DigitalStudentID />
            </Section>
          </div>
        </div>
        <div className={styles.sidebar}>
          <RecentActivity />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default OverviewPage;
