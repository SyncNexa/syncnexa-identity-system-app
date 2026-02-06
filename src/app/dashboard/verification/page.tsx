"use client";
import DashboardLayout from "@/layouts/wrapper/DashboardLayout";
import React, { useEffect, useState } from "react";
import styles from "./styles/Verification.module.css";
import Card from "./components/Card";
import ScanIcon from "@/assets/icons/ScanIcon";
import ContactIcon from "@/assets/icons/ContactIcon";
import DocIcon from "@/assets/icons/DocIcon";
import IDIcon from "@/assets/icons/IDIcon";
import ProgramLevelValidation from "@/assets/icons/ProgramLevelValidation";
import SessionEnrollmentCheck from "@/assets/icons/SessionEnrollmentCheck";
import ContentMatch from "@/assets/icons/ContentMatch";
import FreshnessValidation from "@/assets/icons/FreshnessValidation";
import SchoolVerification from "@/assets/icons/SchoolVerification";
import AdminAttestation from "@/assets/icons/AdminAttestation";
import useFetch from "@/hooks/useFetch";
import { API_ROUTES } from "@/routes/paths";
import Loading from "@/components/Loading";

const STATUS_LABELS: Record<Step["status"], string> = {
  not_verified: "Not Verified",
  verified: "Verified",
  failed: "Failed",
  pending: "Pending",
};

const STATUS_VALUE_MAP: Record<
  Step["status"],
  Verification["status"]["value"]
> = {
  not_verified: "NOT_VERIFIED",
  verified: "VERIFIED",
  failed: "FAILED",
  pending: "PENDING",
};

function getStepIcon(stepName: string, stepType: string) {
  const normalized = `${stepName} ${stepType}`.toLowerCase();
  if (normalized.includes("program") || normalized.includes("level")) {
    return <ProgramLevelValidation />;
  }
  if (normalized.includes("session") || normalized.includes("enrollment")) {
    return <SessionEnrollmentCheck />;
  }
  if (normalized.includes("content match") || normalized.includes("content")) {
    return <ContentMatch />;
  }
  if (normalized.includes("freshness")) {
    return <FreshnessValidation />;
  }
  if (normalized.includes("school verification")) {
    return <SchoolVerification />;
  }
  if (normalized.includes("attestation") || normalized.includes("admin")) {
    return <AdminAttestation />;
  }
  if (normalized.includes("contact") || normalized.includes("email")) {
    return <ContactIcon />;
  }
  if (normalized.includes("department") || normalized.includes("program")) {
    return <IDIcon />;
  }
  if (normalized.includes("school") || normalized.includes("enrollment")) {
    return <DocIcon />;
  }
  if (normalized.includes("government") || normalized.includes("id")) {
    return <IDIcon />;
  }
  return <ScanIcon />;
}

function getActionLabel(stepName: string, status: Step["status"]) {
  const normalized = stepName.toLowerCase();
  if (status === "failed" && normalized.includes("id")) {
    return "Fix ID Submission";
  }
  return "Verify Now!";
}

function mapStepToVerification(step: Step): Verification {
  const statusValue = STATUS_VALUE_MAP[step.status] ?? "NOT_VERIFIED";
  const statusLabel = STATUS_LABELS[step.status] ?? "Not Verified";

  return {
    id: step.id,
    type: step.step_name,
    status: {
      value: statusValue,
      label: statusLabel,
    },
    date: new Date(step.last_attempted_at || step.verified_at || Date.now()),
    requirements: step.requirement_checklist.map((req) => req.requirement),
    action: {
      icon: getStepIcon(step.step_name, step.step_type),
      label: getActionLabel(step.step_name, step.status),
      onClick: () => {},
    },
    info: step.status_message
      ? {
          label: statusLabel,
          message: step.status_message,
        }
      : {
          label: statusLabel,
        },
  };
}

function Verification() {
  const { data: verificationCenterData, loading } =
    useFetch<VerificationCenter>(API_ROUTES.USER_VERIFICATION_CENTER);
  const [verifications, setVerifications] = useState<Verification[]>([]);

  useEffect(() => {
    if (verificationCenterData?.pillars) {
      const steps = verificationCenterData.pillars.flatMap(
        (pillar) => pillar.steps,
      );
      const mappedVerifications = steps.map(mapStepToVerification);
      setVerifications(mappedVerifications);
    }
  }, [verificationCenterData]);
  return (
    <DashboardLayout
      pageTitle="Verification Center"
      sub="Transparent breakdown of all verification checks."
    >
      {loading ? (
        <Loading size="large" />
      ) : (
        <div className={styles.verification}>
          {verifications.map((v) => (
            <Card {...v} key={v.id} />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}

export default Verification;
