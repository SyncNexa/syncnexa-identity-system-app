"use client";
import DashboardLayout from "@/layouts/wrapper/DashboardLayout";
import Section from "@/layouts/wrapper/Section";
import VerificationProgress from "@/components/VerificationProgress/VerificationProgress";
import DigitalStudentID from "@/components/DigitalStudentID/DigitalStudentID";
import RecentActivity from "@/components/RecentActivity/RecentActivity";
import styles from "@/app/dashboard/overview/style/style.module.css";

function OverviewPage() {
  return (
    <DashboardLayout pageTitle="Overview">
      <div className={styles.overview}>
        <div className={styles.mainContent}>
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
        <div className={styles.sidebar}>
          <RecentActivity />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default OverviewPage;
