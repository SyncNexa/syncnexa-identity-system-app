"use client";
import React, { useState } from "react";
import styles from "./style.module.css";
import { useRouter } from "next/navigation";
import SyncInput from "@/components/Input/SyncInput";
import SyncButton from "@/components/Button/SyncButton";
import { areKeysEmpty } from "@/utils/sanitizers";

export default function SignupPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    state: "",
    address: "",
  });

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setForm((f) => ({ ...f, [name]: value }));
  }

  const router = useRouter();

  return (
    <div className={styles.form}>
      <div className={styles.grid}>
        <div>
          <SyncInput
            label="First Name"
            required
            name="firstName"
            value={form.firstName}
            onChange={onChange}
            className={styles.SyncInput}
            placeholder="e.g John"
            inputType="text"
          />
        </div>

        <div>
          <SyncInput
            label="Last Name"
            required
            name="lastName"
            value={form.lastName}
            onChange={onChange}
            className={styles.SyncInput}
            placeholder="e.g Doe"
            inputType="text"
          />
        </div>

        <div>
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

        <div>
          <SyncInput
            label="Phone (Optional)"
            name="phone"
            value={form.phone}
            onChange={onChange}
            className={styles.SyncInput}
            placeholder="e.g 1234 5678 90"
            inputType="phone"
          />
        </div>

        <div>
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

        <div>
          <SyncInput
            label="Confirm Password"
            required
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={onChange}
            className={styles.SyncInput}
            placeholder="e.g JohN112*#"
            inputType="password"
          />
        </div>

        <div>
          <SyncInput
            label="State/Province"
            required
            name="state"
            value={form.state}
            onChange={onChange}
            className={styles.SyncInput}
            placeholder="e.g Owerri"
            inputType="text"
          />
        </div>

        <div>
          <SyncInput
            label="Home Address"
            required
            name="address"
            value={form.address}
            onChange={onChange}
            className={styles.SyncInput}
            placeholder="e.g Abc Ave. 1100 State County"
            inputType="text"
          />
        </div>
      </div>

      <SyncButton
        className={styles.submit}
        onClick={() => router.push("/signup/verify")}
        disabled={!areKeysEmpty(form, ["phone"])}
      >
        Continue
      </SyncButton>
    </div>
  );
}
