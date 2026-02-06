"use client";
import React, { useState, Suspense } from "react";
import Link from "next/link";
import styles from "./style.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import SyncInput from "@/components/Input/SyncInput";
import SyncButton from "@/components/Button/SyncButton";
import { APP_ROUTES, API_ROUTES } from "@/routes/paths";
import usePost from "@/hooks/usePost";
import { useToast } from "@/hooks/useToast";

function VerifyPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [otp, setOtp] = useState("");
  const { showToast } = useToast();

  const { post: verifyEmail, loading: verifyLoading } =
    usePost<OTPVerification>(API_ROUTES.VERIFY_EMAIL);

  const { post: resendOtp, loading: resendLoading } = usePost(
    API_ROUTES.VERIFY_EMAIL_RESEND,
  );

  const handleOtpComplete = async (code: string) => {
    setOtp(code);
    const result = await verifyEmail({ otp: code, email });

    if (result?.verified) {
      showToast({
        message: result.message || "Email verified successfully!",
        type: "success",
        title: "Verification Successful",
      });
      router.push(APP_ROUTES.LOGIN);
    }
  };

  const handleResendOtp = async () => {
    if (!email) {
      showToast({
        message: "Email address is missing. Please go back and try again.",
        type: "error",
        title: "Cannot Resend OTP",
      });
      return;
    }
    const result = await resendOtp({ email });
    if (result) {
      showToast({
        message: "OTP resent successfully!",
        type: "success",
        title: "OTP Resent",
      });
    }
  };

  const maskEmail = (value: string) => {
    if (!value) return "m****@***";
    const [local, domain] = value.split("@");
    if (!local || !domain) return "m****@***";

    const maskedLocal =
      local.length <= 1
        ? "*"
        : `${local[0]}${"*".repeat(Math.max(local.length - 1, 4))}`;

    const [domainName, ...tldParts] = domain.split(".");
    const maskedDomain = domainName
      ? `${domainName[0]}${"*".repeat(Math.max(domainName.length - 1, 3))}`
      : "***";
    const tld = tldParts.length ? `.${tldParts.join(".")}` : "";

    return `${maskedLocal}@${maskedDomain}${tld}`;
  };

  const maskedEmail = maskEmail(email);
  return (
    <div className={styles.verifyContainer}>
      <h3>Verify your email!</h3>
      <p style={{ color: "var(--color-text)" }}>
        Enter the OTP sent to {maskedEmail} to continue
      </p>

      <SyncInput
        className={styles.otpInput}
        inputType={"otp"}
        onOtpComplete={handleOtpComplete}
        onResendOtp={handleResendOtp}
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
          href={APP_ROUTES.SIGNUP}
          style={{ color: "var(--color-primary)", textDecoration: "none" }}
        >
          ← Previous
        </Link>
        <SyncButton
          onClick={() => otp && handleOtpComplete(otp)}
          variant="primary"
          buttonStyles={{ height: 40, width: 200 }}
          className={styles.btn}
          disabled={!otp || verifyLoading}
        >
          {verifyLoading ? "Verifying..." : "Verify"}
        </SyncButton>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyPageContent />
    </Suspense>
  );
}
