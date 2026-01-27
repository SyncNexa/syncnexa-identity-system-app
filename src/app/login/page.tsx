"use client";
import React, { useState } from "react";
import styles from "./style.module.css";
import { useRouter } from "next/navigation";
import SyncInput from "@/components/Input/SyncInput";
import SyncButton from "@/components/Button/SyncButton";
import { areFieldsFilled } from "@/utils/sanitizers";
import Link from "next/link";
import { APP_ROUTES, API_ROUTES } from "@/routes/paths";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  const router = useRouter();

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
            className={styles.SyncInput}
            placeholder="e.g john.doe@example.com"
            inputType="email"
          />
        </div>
        <div className={styles.input_wrapper}>
          <SyncInput
            label="Password"
            required
            name="password"
            value={form.password}
            onChange={onChange}
            className={styles.SyncInput}
            placeholder="e.g JohN112*#"
            inputType="password"
          />
        </div>
      </div>
      <Link href={APP_ROUTES.RECOVER_PASSWORD}>Forgot password?</Link>

      <SyncButton
        className={styles.submit}
        onClick={() => router.push(API_ROUTES.LOGIN)}
        disabled={!areFieldsFilled(form)}
      >
        Login
      </SyncButton>
    </div>
  );
}
