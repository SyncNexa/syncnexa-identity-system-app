"use client";
import React from "react";
import Link from "next/link";
import styles from "./style.module.css";
import { useRouter } from "next/navigation";
import SyncInput from "@/components/Input/SyncInput";
import SyncButton from "@/components/Button/SyncButton";

export default function VerifyPage() {
  const router = useRouter();
  return (
    <div className={styles.verifyContainer}>
      <h3>Verify your email!</h3>
      <p style={{ color: "var(--color-text)" }}>
        Enter the OTP sent to m****@*** to continue
      </p>

      <SyncInput
        className={styles.otpInput}
        inputType={"otp"}
        otpStyles={{
          containerStyles: {
            width: "var(--otp-container-width)",
          },
          wrapperStyles: {
            width: "var(--otp-wrapper-width)",
          },
          inputStyles: {
            flex: "var(--otp-input-flex)",
            height: "var(--otp-input-height)",
          },
        }}
      />

      <div className={styles.actions}>
        <Link
          href="/signup"
          style={{ color: "var(--color-primary)", textDecoration: "none" }}
        >
          ← Previous
        </Link>
        <SyncButton
          onClick={() => router.push("/")}
          variant="primary"
          buttonStyles={{ height: 40, width: 200 }}
          className={styles.btn}
        >
          Create account
        </SyncButton>
      </div>
    </div>
  );
}
