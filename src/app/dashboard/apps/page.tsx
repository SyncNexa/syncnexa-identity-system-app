import DashboardLayout from "@/layouts/wrapper/DashboardLayout";
import { ConnectedAppsTable } from "./ConnectedAppsTable";
import styles from "./styles/Apps.module.css";

function Apps() {
  return (
    <DashboardLayout
      pageTitle="Connected Apps"
      sub="Manage SAuth permissions across your ecosystem and third-party apps"
    >
      <div className={styles.apps}>
        <ConnectedAppsTable />
      </div>
    </DashboardLayout>
  );
}

export default Apps;
