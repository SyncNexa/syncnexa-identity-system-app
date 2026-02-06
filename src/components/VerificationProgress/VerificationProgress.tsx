import React from "react";
import styles from "./VerificationProgress.module.css";
import CheckMark from "@/assets/icons/CheckMark";
import SyncButton from "../Button";

type VerificationStep = {
  id: string;
  label: string;
  completed: boolean;
};

type Props = {
  percentage?: number;
  steps?: VerificationStep[];
};

export default function VerificationProgress({
  percentage = 25,
  steps = [],
}: Props) {
  // Calculate stroke dash offset for circular progress
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const color =
    percentage < 30 ? "#ff0000" : percentage < 60 ? "#FFB800" : "#04D69D";

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.progressSection}>
          <div className={styles.circularProgress}>
            <svg className={styles.progressRing} width="161" height="161">
              <circle
                className={styles.progressRingBg}
                stroke="#E3E5E5"
                strokeWidth={15}
                fill="transparent"
                r={radius}
                cx="80.5"
                cy="80.5"
              />
              <circle
                className={styles.progressRingCircle}
                stroke={color}
                strokeWidth={15}
                fill="transparent"
                r={radius}
                cx="80.5"
                cy="80.5"
                strokeDasharray={`${circumference} ${circumference}`}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
            <div className={styles.progressText}>
              <p className={styles.percentage}>{percentage}%</p>
            </div>
          </div>
          <p className={styles.verificationStatus}>
            <span className={styles.statusPrefix}>You're</span>{" "}
            <span className={styles.statusPercentage} style={{ color }}>
              {percentage}%
            </span>{" "}
            <span className={styles.statusSuffix}>Verified</span>
          </p>
        </div>

        <div className={styles.stepsSection}>
          {steps.map((step) => (
            <div
              key={step.id}
              className={`${styles.step} ${
                step.completed ? styles.completed : ""
              }`}
            >
              <p
                className={`${styles.stepLabel} ${
                  step.completed ? styles.completed : ""
                }`}
              >
                {step.label}
              </p>
              <div className={styles.stepIcon}>
                <CheckMark color={step.completed ? "#04D69D" : "#DFDFDF"} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <SyncButton
        className={styles.continueButton}
        label="Continue Verification"
        variant="primary"
        buttonStyles={{ height: 50, width: "100%" }}
        color="green"
      />
    </div>
  );
}
