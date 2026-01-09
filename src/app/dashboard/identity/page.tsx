"use client";
import EditPen from "@/assets/icons/EditPen";
import SyncButton from "@/components/Button";
import SectionTable from "@/components/Tables/SectionTable";
import DashboardLayout from "@/layouts/wrapper/DashboardLayout";
import styles from "./styles/Identity.module.css";
import DocumentTable from "@/components/Tables/DocumentTable";
import Modal from "@/components/Modal";
import { useState } from "react";
import SyncInput from "@/components/Input";
import PersonalDetails from "./components/PersonalDetails";
import AcademicInfo from "./components/AcademicInfo";

function Identity() {
  const [modal, setModal] = useState<{
    open: boolean;
    content: React.ReactNode | null;
    title: string;
  }>({
    open: false,
    content: null,
    title: "",
  });

  return (
    <DashboardLayout
      pageTitle="Identity Management"
      sub="Manage all personal and academic data"
    >
      <div>
        <div className={styles.grid}>
          <SectionTable
            cells={[
              { header: "Full Name", label: "John Doe" },
              { header: "Date of Birth", label: "January 1, 1990" },
              { header: "Email", label: "john.doe@example.com" },
              { header: "Phone Number", label: "+1 234 567 8901" },
              { header: "Address", label: "123 Main St, Anytown, USA" },
            ]}
            title="Personal Information"
            info="Last updated: Feb 12, 2025"
            footer={
              <div className={styles.footer}>
                <div className={styles.top}>
                  <small>National ID:</small>
                  <p>Linked</p>
                </div>
                <div className={styles.bottom}>
                  <SyncButton
                    variant="light"
                    color="light"
                    onClick={() =>
                      setModal((prev) => ({
                        ...prev,
                        open: !prev.open,
                        content: <PersonalDetails />,
                        title: "Edit Personal Information",
                      }))
                    }
                  >
                    <EditPen />
                    <span>Edit</span>
                  </SyncButton>
                </div>
              </div>
            }
          />
          <SectionTable
            cells={[
              {
                header: "Institution",
                label: "Federal University of Technology Owerri",
              },
              { header: "Department/Level", label: "Computer Science/500" },
              { header: "Program", label: "Undergraduate program" },
              { header: "Registration Number", label: "456789678" },
              { header: "Entry Year/Graduation year", label: "2021/2026" },
            ]}
            title="Academic Information"
            info="Last updated: Feb 12, 2025"
            footer={
              <div className={styles.footer}>
                <div className={styles.top}>
                  <small>Status:</small>
                  <p>Verified</p>
                </div>
                <div className={styles.bottom}>
                  <SyncButton
                    variant="light"
                    color="light"
                    onClick={() =>
                      setModal((prev) => ({
                        ...prev,
                        open: !prev.open,
                        content: <AcademicInfo />,
                        title: "Academic Information Request",
                      }))
                    }
                  >
                    <EditPen />
                    <span>Request Correction</span>
                  </SyncButton>
                </div>
              </div>
            }
          />
        </div>
        <DocumentTable
          title="Document Management"
          cells={[
            {
              id: "1",
              status: { value: "VERIFIED", label: "Verified" },
              title: "Admission Letter",
              replace: (id) => {
                alert(id);
              },
              view: (id) => {
                alert(id);
              },
              upload: (id) => {
                alert(id);
              },
            },
            {
              id: "2",
              status: { value: "VERIFIED", label: "Verified" },
              title: "School ID",
              replace: (id) => {
                alert(id);
              },
              view: (id) => {
                alert(id);
              },
              upload: (id) => {
                alert(id);
              },
            },
            {
              id: "3",
              status: { value: "PENDING", label: "Pending" },
              title: "Government ID",
              replace: (id) => {
                alert(id);
              },
              view: (id) => {
                alert(id);
              },
              upload: (id) => {
                alert(id);
              },
            },
            {
              id: "4",
              status: { value: "NOT_UPLOADED", label: "Not uploaded" },
              title: "Proof of Enroll",
              replace: (id) => {
                alert(id);
              },
              view: (id) => {
                alert(id);
              },
              upload: (id) => {
                alert(id);
              },
            },
          ]}
        />
      </div>
      <Modal
        visible={modal.open}
        title={modal.title}
        onClose={() => setModal((prev) => ({ ...prev, open: !prev.open }))}
      >
        {modal.content}
      </Modal>
    </DashboardLayout>
  );
}

export default Identity;
