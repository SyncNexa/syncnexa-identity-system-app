"use client";
import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import { useRouter } from "next/navigation";
import SyncInput from "@/components/Input/SyncInput";
import SyncButton from "@/components/Button/SyncButton";
import { areFieldsFilled } from "@/utils/sanitizers";
import { SyncSelect } from "@/components/Input";

export default function SignupPage() {
  const [activeTab, setActiveTab] = useState<"basicInfo" | "academicInfo">(
    "basicInfo",
  );
  const [form, setForm] = useState({
    basicInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      state: "",
      address: "",
    },
    academicInfo: {
      institution: "",
      matricNo: "",
      program: "",
      department: "",
      level: "",
      faculty: "",
      admissionYear: "",
      expectedGraduationYear: "",
    },
  });

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    if (name === "phone") {
      if (value.length > 10) {
      }
    }
    setForm((f) => {
      if (name in f.basicInfo) {
        return {
          ...f,
          basicInfo: { ...f.basicInfo, [name]: value },
        };
      } else if (name in f.academicInfo) {
        return {
          ...f,
          academicInfo: { ...f.academicInfo, [name]: value },
        };
      }
      return f;
    });
  }

  const router = useRouter();

  useEffect(() => {
    console.log(form);
  }, [form]);

  return (
    <div className={styles.form}>
      <div className={styles.tabs}>
        {[
          {
            title: "Basic Information",
            key: "basicInfo",
          },
          {
            title: "Academic Information",
            key: "academicInfo",
          },
        ].map((tab, i) => (
          <button
            key={i}
            className={activeTab === tab.key ? styles.active : ""}
            onClick={() =>
              activeTab === "basicInfo"
                ? areFieldsFilled({ ...form.basicInfo })
                  ? setActiveTab(tab.key as "basicInfo" | "academicInfo")
                  : null
                : setActiveTab(tab.key as "basicInfo" | "academicInfo")
            }
          >
            <span>{i + 1}</span>
            <span>{tab.title}</span>
          </button>
        ))}
      </div>
      {activeTab === "basicInfo" ? (
        <div className={styles.grid}>
          <div>
            <SyncInput
              label="First Name"
              required
              name="firstName"
              value={form.basicInfo.firstName}
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
              value={form.basicInfo.lastName}
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
              value={form.basicInfo.email}
              onChange={onChange}
              className={styles.SyncInput}
              placeholder="e.g john.doe@example.com"
              inputType="email"
            />
          </div>

          <div>
            <SyncInput
              label="Phone"
              required
              name="phone"
              value={form.basicInfo.phone}
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
              value={form.basicInfo.password}
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
              value={form.basicInfo.confirmPassword}
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
              value={form.basicInfo.state}
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
              value={form.basicInfo.address}
              onChange={onChange}
              className={styles.SyncInput}
              placeholder="e.g Abc Ave. 1100 State County"
              inputType="text"
            />
          </div>
        </div>
      ) : (
        <div className={styles.grid}>
          <div>
            <SyncInput
              label="Matric Number"
              required
              name="matricNo"
              value={form.academicInfo.matricNo}
              onChange={onChange}
              className={styles.SyncInput}
              placeholder="e.g 202600010023"
              inputType="text"
            />
          </div>

          <div>
            <SyncSelect
              options={[
                {
                  label: "Federal University of Technology Owerri",
                  value: "federal-university-of-technology-owerri",
                },
              ]}
              label="Institution"
              required
              placeholder="e.g Federal University of Technology Ow..."
              onChange={(val) =>
                setForm((f) => ({
                  ...f,
                  academicInfo: { ...f.academicInfo, institution: val },
                }))
              }
            />
          </div>

          <div>
            <SyncSelect
              options={[
                {
                  label: "Bachelor of Technology",
                  value: "b.tech",
                },
                {
                  label: "Master of Technology",
                  value: "m.tech",
                },
                {
                  label: "Doctor of Philosophy",
                  value: "phd",
                },
              ]}
              label="Program"
              required
              placeholder="e.g B. Tech"
              onChange={(val) =>
                setForm((f) => ({
                  ...f,
                  academicInfo: { ...f.academicInfo, program: val },
                }))
              }
            />
          </div>

          <div>
            <SyncSelect
              options={[
                {
                  label: "Information Technology",
                  value: "information-technology",
                },
                {
                  label: "Computer Science",
                  value: "computer-science",
                },
              ]}
              label="Department"
              required
              placeholder="e.g Information Technology"
              onChange={(val) =>
                setForm((f) => ({
                  ...f,
                  academicInfo: { ...f.academicInfo, department: val },
                }))
              }
            />
          </div>

          <div>
            <SyncSelect
              options={[
                {
                  label: "School of Information and Communication Technology",
                  value: "school-of-information-and-communication-technology",
                },
              ]}
              label="Faculty"
              required
              placeholder="e.g School of Information and Comm..."
              onChange={(val) =>
                setForm((f) => ({
                  ...f,
                  academicInfo: { ...f.academicInfo, faculty: val },
                }))
              }
            />
          </div>

          <div>
            <SyncSelect
              options={[
                {
                  label: "100 Level",
                  value: "100",
                },
              ]}
              label="Level"
              required
              placeholder="e.g 100"
              onChange={(val) =>
                setForm((f) => ({
                  ...f,
                  academicInfo: { ...f.academicInfo, level: val },
                }))
              }
            />
          </div>

          <div>
            <SyncSelect
              options={[
                {
                  label: "2020",
                  value: "2020",
                },
              ]}
              label="Admission Year"
              required
              placeholder="e.g 2020"
              onChange={(val) =>
                setForm((f) => ({
                  ...f,
                  academicInfo: { ...f.academicInfo, admissionYear: val },
                }))
              }
            />
          </div>

          <div>
            <SyncSelect
              options={[
                {
                  label: "2024",
                  value: "2024",
                },
              ]}
              label="Expected Graduation Year"
              placeholder="e.g 2024"
              onChange={(val) =>
                setForm((f) => ({
                  ...f,
                  academicInfo: {
                    ...f.academicInfo,
                    expectedGraduationYear: val,
                  },
                }))
              }
            />
          </div>
        </div>
      )}

      <div className={styles.actions}>
        {activeTab === "basicInfo" ? (
          <span></span>
        ) : (
          <SyncButton
            variant="outline"
            onClick={() => setActiveTab("basicInfo")}
          >
            Prev
          </SyncButton>
        )}

        <SyncButton
          variant="outline"
          onClick={() =>
            activeTab === "basicInfo"
              ? setActiveTab("academicInfo")
              : areFieldsFilled({ ...form.basicInfo, ...form.academicInfo }, [
                    "expectedGraduationYear",
                  ])
                ? router.push("/signup/verify")
                : setActiveTab("academicInfo")
          }
          disabled={
            activeTab === "basicInfo"
              ? !areFieldsFilled({ ...form.basicInfo })
              : !areFieldsFilled({ ...form.basicInfo, ...form.academicInfo }, [
                  "expectedGraduationYear",
                ])
          }
        >
          Next
        </SyncButton>
      </div>
    </div>
  );
}
