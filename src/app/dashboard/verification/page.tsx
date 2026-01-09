"use client";
import DashboardLayout from "@/layouts/wrapper/DashboardLayout";
import React from "react";
import styles from "./styles/Verification.module.css";
import Card from "./components/Card";
import ScanIcon from "@/assets/icons/ScanIcon";
import ContactIcon from "@/assets/icons/ContactIcon";
import DocIcon from "@/assets/icons/DocIcon";
import IDIcon from "@/assets/icons/IDIcon";

function Verification() {
  const verifications: Verification[] = [
    {
      id: "1",
      type: "Face Match",
      date: new Date(),
      status: { value: "NOT_VERIFIED", label: "Not Verified" },
      requirements: [
        "Clear selfie photo",
        "Good lighting",
        "Neutral facial expression",
        "Face must match government ID photo",
      ],
      action: {
        icon: <ScanIcon />,
        label: "Verify Now!",
        onClick: () => {},
      },
    },
    {
      id: "2",
      type: "Contact Verification",
      date: new Date(),
      status: { value: "VERIFIED", label: "Verified" },
      requirements: [
        "Active phone number",
        "Active email address",
        "OTP confirmation",
      ],
      action: {
        icon: <ContactIcon />,
        label: "Verify Now!",
        onClick: () => {},
      },
      info: {
        label: "Phone and email confirmed",
      },
    },
    {
      id: "3",
      type: "Department Verification",
      date: new Date(),
      status: { value: "PENDING", label: "Pending" },
      requirements: [
        "Department listed by institution",
        "Program must match admission record",
        "Correct academic session",
      ],
      action: {
        icon: <IDIcon />,
        label: "Verify Now!",
        onClick: () => {},
      },
      info: {
        label: "Under departmental review",
      },
    },
    {
      id: "4",
      type: "School Enrollment",
      date: new Date(),
      status: { value: "NOT_VERIFIED", label: "Not Verified" },
      requirements: [
        "Admission letter or proof of enrollment",
        "Valid matric number",
        "Institution name must match profile",
      ],
      action: {
        icon: <DocIcon />,
        label: "Verify Now!",
        onClick: () => {},
      },
    },
    {
      id: "5",
      type: "Government ID",
      date: new Date(),
      status: { value: "FAILED", label: "Failed" },
      requirements: [
        "Valid government-issued ID",
        "Clear, readable image",
        "Supported formats: PDF / JPG",
      ],
      action: {
        icon: <IDIcon />,
        label: "Fix ID Submission",
        onClick: () => {},
      },
      info: {
        label: "ID number mismatch",
        message:
          "Upload a clear image of your ID. Ensure names and numbers are not cropped or blurred.",
      },
    },
  ];
  return (
    <DashboardLayout
      pageTitle="Verification Center"
      sub="Transparent breakdown of all verification checks."
    >
      <div className={styles.verification}>
        {verifications.map((v) => (
          <Card {...v} key={v.id} />
        ))}
      </div>
    </DashboardLayout>
  );
}

export default Verification;
