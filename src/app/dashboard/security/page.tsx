import DashboardLayout from "@/layouts/wrapper/DashboardLayout";
import styles from "./styles/Security.module.css";
import SessionListTable from "./SessionListTable";
import Overview from "./Overview";

function Security() {
  return (
    <DashboardLayout
      pageTitle="Security"
      sub="Give students full control of account safety."
    >
      <div className={styles.security}>
        <section className={styles.section}>
          <p className={styles.title}>Security Overview</p>
          <Overview />
        </section>
        <section className={styles.section}>
          <p className={styles.title}>Sessions List</p>
          <SessionListTable />
        </section>
      </div>
    </DashboardLayout>
  );
}

export default Security;
