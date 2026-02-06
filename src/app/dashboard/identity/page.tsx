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
import { API_ROUTES } from "@/routes/paths";
import useFetch from "@/hooks/useFetch";

function Identity() {
  const [active, setActive] = useState(0);
  const [modal, setModal] = useState<{
    open: boolean;
    content: React.ReactNode | null;
    title: string;
  }>({
    open: false,
    content: null,
    title: "",
  });

  const {
    data: personalInfo,
    loading: personalLoading,
    error: personalError,
  } = useFetch<PersonalInfo>(API_ROUTES.USER_PERSONAL_INFO);

  const {
    data: academicInfo,
    loading: academicLoading,
    error: academicError,
  } = useFetch<AcademicDetails>(API_ROUTES.USER_ACADEMIC_DETAILS);

  const loading = personalLoading || academicLoading;

  if (loading) {
    return (
      <DashboardLayout
        pageTitle="Identity Management"
        sub="Manage all personal and academic data"
      >
        <div>Loading...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      pageTitle="Identity Management"
      sub="Manage all personal and academic data"
    >
      <div className={styles.identity}>
        <div className={styles.trigger}>
          {["Personal Information", "Academic Information"].map((c, i) => (
            <button
              key={i}
              className={active === i ? styles.active : ""}
              onClick={() => setActive(i)}
            >
              {c}
            </button>
          ))}
        </div>
        <div className={styles.small_screen}>
          {active === 1 ? (
            <SectionTable
              cells={[
                {
                  header: "Institution",
                  label: academicInfo?.institution || "N/A",
                },
                {
                  header: "Department/Level",
                  label: academicInfo
                    ? `${academicInfo.department}/${academicInfo.level}`
                    : "N/A",
                },
                { header: "Program", label: academicInfo?.program || "N/A" },
                {
                  header: "Registration Number",
                  label: academicInfo?.matricNumber || "N/A",
                },
                {
                  header: "Entry Year/Graduation year",
                  label: academicInfo
                    ? `${academicInfo.admissionYear}/${academicInfo.expectedGraduationYear}`
                    : "N/A",
                },
              ]}
              title=""
              // info="Last updated: Feb 12, 2025"
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
          ) : (
            <SectionTable
              cells={[
                { header: "Full Name", label: personalInfo?.fullName || "N/A" },
                // {
                //   header: "Date of Birth",
                //   label: personalInfo?.dateOfBirth || "N/A",
                // },
                { header: "Gender", label: personalInfo?.gender || "N/A" },
                { header: "Email", label: personalInfo?.email || "N/A" },
                {
                  header: "Phone Number",
                  label: personalInfo?.phoneNumber || "N/A",
                },
                { header: "Address", label: personalInfo?.address || "N/A" },
              ]}
              title=""
              // info="Last updated: Feb 12, 2025"
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
                        personalInfo &&
                        setModal((prev) => ({
                          ...prev,
                          open: !prev.open,
                          content: <PersonalDetails {...personalInfo} />,
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
          )}
        </div>
        <div className={styles.grid}>
          <SectionTable
            cells={[
              { header: "Full Name", label: personalInfo?.fullName || "N/A" },
              // {
              //   header: "Date of Birth",
              //   label: personalInfo?.dateOfBirth || "N/A",
              // },
              { header: "Email", label: personalInfo?.email || "N/A" },
              {
                header: "Phone Number",
                label: personalInfo?.phoneNumber || "N/A",
              },
              { header: "Address", label: personalInfo?.address || "N/A" },
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
                      personalInfo &&
                      setModal((prev) => ({
                        ...prev,
                        open: !prev.open,
                        content: <PersonalDetails {...personalInfo} />,
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
                label: academicInfo?.institution || "N/A",
              },
              {
                header: "Department/Level",
                label: academicInfo
                  ? `${academicInfo.department}/${academicInfo.level}`
                  : "N/A",
              },
              { header: "Program", label: academicInfo?.program || "N/A" },
              {
                header: "Registration Number",
                label: academicInfo?.matricNumber || "N/A",
              },
              {
                header: "Entry Year/Graduation year",
                label: academicInfo
                  ? `${academicInfo.admissionYear}/${academicInfo.expectedGraduationYear}`
                  : "N/A",
              },
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
