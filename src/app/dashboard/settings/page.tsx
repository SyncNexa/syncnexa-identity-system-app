import DashboardLayout from "@/layouts/wrapper/DashboardLayout";
import styles from "./styles/Settings.module.css";
import Tab from "@/components/Tab/Tab";
import Preferences from "./Preferences";
import Compliance from "./Compliance";

function Settings() {
  return (
    <DashboardLayout
      pageTitle="Settings"
      sub="To personalize their experience, control notifications, and understand data and legal rights"
    >
      <div className={styles.settings}>
        <Tab
          headers={[
            {
              label: "Profile Preferences",
              value: "profile-preferences",
              id: "1",
            },
            {
              label: "Legal & Compliance",
              value: "legal-compliance",
              id: "2",
            },
          ]}
          contents={[
            {
              content: <Preferences />,
              value: "profile-preferences",
              id: "1",
            },
            {
              content: <Compliance />,
              value: "legal-compliance",
              id: "2",
            },
          ]}
        />
      </div>
    </DashboardLayout>
  );
}

export default Settings;
