import AppIcon from "@/assets/icons/AppIcon";
import AuditIcon from "@/assets/icons/AuditIcon";
import SyncButton from "@/components/Button";
import Modal from "@/components/Modal";
import React from "react";
import styles from "./styles/Apps.module.css";
import Table from "@/components/Tables/Table";
import QuestionMarkGreen from "@/assets/icons/QuestionMarkGreen";

export function DetailsModal({
  id,
  visibility,
  setVisibility,
  auditTrigger,
}: {
  id: string;
  visibility: boolean;
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  auditTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const trails = [
    {
      id: "1",
      title: "App Overview",
      mode: null,
      data: [
        {
          label: "Developer",
          value: "SyncNexa",
        },
        {
          label: "App Description",
          value: "Digital portfolio for verified students",
        },
        {
          label: "App Status",
          value: "Reviewed & Approved",
        },
        {
          label: "First Connected",
          value: "Jan 18, 2025",
        },
      ],
    },
    {
      id: "2",
      title: "Permissions Granted",
      mode: "Read only",
      data: [
        {
          label: "Basic Profile",
          value: "Name, photo, SyncID",
        },
        {
          label: "Academic Information",
          value: "Institution, department, level",
        },
        {
          label: "Verification Status",
          value: "Verified / Pending indicators",
        },
        {
          label: "Documents",
          value: "Admission letter, School ID",
        },
      ],
    },
    {
      id: "3",
      title: "Data Access Scope",
      mode: null,
      data: [
        {
          label: "Identity Data",
          value: "Full name, SyncID ID",
        },
        {
          label: "Academic Data",
          value: "Department, level, matric number",
        },
        {
          label: "Verification Data",
          value: "Enrollment verification status",
        },
        {
          label: "Documents",
          value: "Uploaded admission letter",
        },
      ],
    },
    {
      id: "4",
      title: "Data This App Can Update",
      mode: null,
      data: [
        {
          label: "Profile Photo",
          value: "Update display photo in SyncFolio only",
        },
        {
          label: "Portfolio Data",
          value: "Add portfolio metadata (non-core identity)",
        },
        {
          label: "Core Identity",
          value: "Not permitted",
        },
      ],
    },
  ];
  return (
    <Modal
      visible={visibility}
      title={
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <AppIcon />
          <h4>PeerGrid</h4>
        </div>
      }
      onClose={() => setVisibility((prev) => !prev)}
    >
      <div className={styles.details}>
        <div className={styles.header}>
          <SyncButton
            variant="light"
            buttonStyles={{ color: "var(--color-text)" }}
            onClick={() => {
              auditTrigger((prev) => !prev);
              setVisibility((prev) => !prev);
            }}
          >
            <AuditIcon />
            <span>Audit Trail</span>
          </SyncButton>
        </div>

        <div className={styles.trails}>
          {trails.map((trail) => (
            <div className={styles.section}>
              <div className={styles.section_header}>
                <p className={styles.section_title}>{trail.title}</p>
                {trail.mode && <span>({trail.mode})</span>}
              </div>
              <div className={styles.content}>
                {trail.data.map((d, i) => (
                  <div className={styles.row}>
                    <span>{d.label}:</span>
                    <span>{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}

export function AuditTrailModal({
  id,
  visibility,
  setVisibility,
}: {
  id: string;
  visibility: boolean;
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const tableHeaders = [
    { key: "timestamp", label: "Timestamp" },
    { key: "actionPerformed", label: "Action Performed" },
    { key: "ip_device", label: "IP / Device" },
    { key: "result", label: "Result" },
  ];
  const appsData: AuditTrail[] = [
    {
      id: "1",
      timestamp: "Feb 12, 2025 – 10:45 AM0",
      actionPerformed: "Read Academic Info",
      ip_device: "Chrome / Windows",
      result: "Success",
    },
    {
      id: "2",
      timestamp: "Feb 11, 2025 – 01:30 PM",
      actionPerformed: "Read Verification Status",
      ip_device: "Mobile App / Android",
      result: "Success",
    },
    {
      id: "3",
      timestamp: "Feb 10, 2025 – 08:55 AM",
      actionPerformed: "Read Documents",
      ip_device: "Firefox / Windows",
      result: "Success",
    },
  ];
  return (
    <Modal
      visible={visibility}
      title={
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <AppIcon />
          <h4>PeerGrid - Audit Trail</h4>
        </div>
      }
      onClose={() => setVisibility((prev) => !prev)}
    >
      <div className={styles.audit}>
        <Table headers={tableHeaders} data={appsData} rowKey="id" />
      </div>
    </Modal>
  );
}

export function RevokeModal({
  id,
  visibility,
  setVisibility,
}: {
  id: string;
  visibility: boolean;
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Modal
      visible={visibility}
      title={"Revoke"}
      onClose={() => setVisibility((prev) => !prev)}
    >
      <div className={styles.revoke}>
        <QuestionMarkGreen />
        <h4>Are you sure you want to Revoke Access</h4>
        <div className={styles.btns}>
          <SyncButton
            variant="outline"
            label="No, Don’t Revoke"
            onClick={() => {}}
            buttonStyles={{ width: "12rem" }}
          />
          <SyncButton
            variant="primary"
            label="Yes, Revoke"
            onClick={() => {}}
            buttonStyles={{ width: "12rem" }}
          />
        </div>
      </div>
    </Modal>
  );
}
