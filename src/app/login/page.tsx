"use client";
import React, { useState } from "react";
import styles from "./style.module.css";
import { useRouter } from "next/navigation";
import SyncInput from "@/components/Input/SyncInput";
import SyncButton from "@/components/Button/SyncButton";
import { areFieldsFilled } from "@/utils/sanitizers";
import Link from "next/link";
import { APP_ROUTES, API_ROUTES } from "@/routes/paths";
import usePost from "@/hooks/usePost";
import { useToast } from "@/hooks/useToast";
import { validateEmail, validatePassword } from "@/utils/validators";

export default function LoginPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const { post, loading } = usePost<LoginResponseData>(API_ROUTES.LOGIN);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Validation state
  const [validations, setValidations] = useState<{
    [key: string]: ValidationResult;
  }>({});

  // Track which fields have been touched (blurred at least once)
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  // Validate a specific field
  const validateField = (name: string, value: string) => {
    let result: ValidationResult = { isValid: true };

    switch (name) {
      case "email":
        result = validateEmail(value);
        break;
      case "password":
        result = validatePassword(value);
        break;
      default:
        result = { isValid: true };
    }

    setValidations((prev) => ({ ...prev, [name]: result }));
    return result;
  };

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));

    // Live validation - only show errors/warnings after field has been touched
    if (touched[name]) {
      validateField(name, value);
    }
  }

  // Handle blur - mark field as touched and validate
  const handleBlur = (name: string, value: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const handleLogin = async () => {
    const result = await post(form);
    if (result) {
      // Store tokens in secure httpOnly cookies
      await fetch("/api/auth/set-tokens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
          role: result.role,
        }),
      });

      showToast({
        message: "Login successful! Redirecting...",
        type: "success",
        title: "Welcome",
      });
      router.push(APP_ROUTES.OVERVIEW);
    }
  };

  return (
    <div className={styles.form}>
      <div className={styles.non_grid}>
        <div className={styles.input_wrapper}>
          <SyncInput
            label="Email"
            required
            name="email"
            value={form.email}
            onChange={onChange}
            onBlur={(e) => handleBlur("email", e.target.value)}
            className={styles.SyncInput}
            placeholder="e.g john.doe@example.com"
            inputType="email"
            invalid={touched.email && validations.email?.type === "error"}
            warning={touched.email && validations.email?.type === "warning"}
            info={
              touched.email && validations.email?.message
                ? {
                    message: validations.email.message,
                    type: validations.email.type || "info",
                  }
                : undefined
            }
          />
        </div>
        <div className={styles.input_wrapper}>
          <SyncInput
            label="Password"
            required
            name="password"
            value={form.password}
            onChange={onChange}
            onBlur={(e) => handleBlur("password", e.target.value)}
            className={styles.SyncInput}
            placeholder="e.g JohN112*#"
            inputType="password"
            invalid={touched.password && validations.password?.type === "error"}
            warning={
              touched.password && validations.password?.type === "warning"
            }
            info={
              touched.password && validations.password?.message
                ? {
                    message: validations.password.message,
                    type: validations.password.type || "info",
                  }
                : undefined
            }
          />
        </div>
      </div>
      <Link href={APP_ROUTES.RECOVER_PASSWORD}>Forgot password?</Link>

      <SyncButton
        className={styles.submit}
        onClick={handleLogin}
        disabled={!areFieldsFilled(form)}
        loading={loading}
      >
        Login
      </SyncButton>
    </div>
  );
}
