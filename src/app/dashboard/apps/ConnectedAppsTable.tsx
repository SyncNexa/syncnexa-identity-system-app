"use client";
import styles from "./styles/Apps.module.css";
import AppIcon from "@/assets/icons/AppIcon";
import Ellipsis from "@/assets/icons/Ellipsis";
import ActionDrop from "@/components/Button/ActionDrop";
import Table from "@/components/Tables/Table";
import { AuditTrailModal, DetailsModal, RevokeModal } from "./Modals";
import { useState } from "react";

const appsData: App[] = [
  {
    id: "1",
    appName: (
      <div className={styles.app_name}>
        <AppIcon /> <span>PeerGrid</span>
      </div>
    ),
    developer: "SyncNexa",
    permissionCount: 6,
    permissionSummary: "Profile, Academic Info",
    lastAccessed: "Today – 09:42 AM",
  },
  {
    id: "2",
    appName: (
      <div className={styles.app_name}>
        <AppIcon /> <span>SyncFolio</span>
      </div>
    ),
    developer: "SyncNexa",
    permissionCount: 4,
    permissionSummary: "Profile, Documents, Verification Status",
    lastAccessed: "Yesterday – 06:15 PM",
  },
  {
    id: "3",
    appName: (
      <div className={styles.app_name}>
        <AppIcon /> <span>CampusPay</span>
      </div>
    ),
    developer: "Third-party",
    permissionCount: 5,
    permissionSummary: "Name, Matric No, Enrollment Status",
    lastAccessed: "Feb 11, 2025 – 01:30 PM",
  },
  {
    id: "4",
    appName: (
      <div className={styles.app_name}>
        <AppIcon /> <span>HostelHub</span>
      </div>
    ),
    developer: "Third-party",
    permissionCount: 2,
    permissionSummary: "Name, Active Student Status",
    lastAccessed: "Feb 10, 2025 – 08:55 AM",
  },
  {
    id: "5",
    appName: (
      <div className={styles.app_name}>
        <AppIcon /> <span>Scholarship</span>
      </div>
    ),
    developer: "NGO Partner",
    permissionCount: 1,
    permissionSummary: "Profile, Academic Level, Documents",
    lastAccessed: "Feb 08, 2025 – 04:20 PM",
  },
];

export function ConnectedAppsTable() {
  const [dop, setDop] = useState(false);
  const [triggerAudit, setTriggerAudit] = useState(false);
  const [revoke, setRevoke] = useState(false);
  const [dId, setDId] = useState("");
  const tableHeaders = [
    { key: "appName", label: "App Name" },
    { key: "developer", label: "Developer" },
    { key: "permissionCount", label: "Permission Count" },
    { key: "permissionSummary", label: "Permission Summary" },
    { key: "lastAccessed", label: "Last Accessed" },
    {
      key: "id",
      label: "Action",
      render: (value: any, row: any) => (
        <ActionDrop
          children={[
            {
              label: "View Details",
              value: "view-details",
              onClick: (val) => {
                console.log("View details for app:", row.id, val);
                setDop((prev) => !prev);
                setDId(row.id);
              },
            },
            {
              label: "Open App",
              value: "open-app",
              onClick: (val) => {
                console.log("Open app:", row.id, val);
              },
            },
            {
              label: "Revoke",
              value: "revoke",
              onClick: (val) => {
                console.log("Revoke app:", row.id, val);
                setDId(row.id);
                setRevoke((prev) => !prev);
              },
            },
          ]}
        />
      ),
    },
  ];
  return (
    <div>
      <Table headers={tableHeaders} data={appsData} rowKey="id" />
      <DetailsModal
        id={dId}
        setVisibility={setDop}
        visibility={dop}
        auditTrigger={setTriggerAudit}
      />
      <AuditTrailModal
        id={dId}
        setVisibility={setTriggerAudit}
        visibility={triggerAudit}
      />
      <RevokeModal id={dId} setVisibility={setRevoke} visibility={revoke} />
    </div>
  );
}
