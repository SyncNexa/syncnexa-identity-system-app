"use client";
import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import { useRouter } from "next/navigation";
import SyncInput from "@/components/Input/SyncInput";
import SyncButton from "@/components/Button/SyncButton";
import { areFieldsFilled } from "@/utils/sanitizers";
import { SyncSelect } from "@/components/Input";
import usePost from "@/hooks/usePost";
import useFetch from "@/hooks/useFetch";
import { APP_ROUTES, API_ROUTES } from "@/routes/paths";
import {
  validateFirstName,
  validateLastName,
  validateEmail,
  validatePhone,
  validatePassword,
  validateConfirmPassword,
  validateState,
  validateAddress,
  validateMatricNo,
} from "@/utils/validators";

export default function SignupPage() {
  const router = useRouter();
  const { post, loading, error, status, message } = usePost<SignupData>(
    API_ROUTES.SIGNUP,
  );
  const {
    data: schools,
    loading: schoolsLoading,
    error: schoolsError,
    message: schoolsMessage,
  } = useFetch<SchoolList>(API_ROUTES.UNIVERSITIES);

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
      gender: "",
      country: "",
      role: "student", // Default role
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

  // Validation state
  const [validations, setValidations] = useState<{
    [key: string]: ValidationResult;
  }>({});

  // Track which fields have been touched (blurred at least once)
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  // Fetch faculties based on selected institution
  const {
    data: faculties,
    loading: facultiesLoading,
    error: facultiesError,
  } = useFetch<FacultyList>(
    form.academicInfo.institution
      ? API_ROUTES.INSTITUTION_FACULTIES(form.academicInfo.institution)
      : "",
  );

  // // Track which fields have been touched (blurred at least once)
  // const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  // Validate a specific field
  const validateField = (name: string, value: string) => {
    let result: ValidationResult = { isValid: true };

    switch (name) {
      case "firstName":
        result = validateFirstName(value);
        break;
      case "lastName":
        result = validateLastName(value);
        break;
      case "email":
        result = validateEmail(value);
        break;
      case "phone":
        result = validatePhone(value);
        break;
      case "password":
        result = validatePassword(value);
        // Also revalidate confirmPassword if it exists
        if (form.basicInfo.confirmPassword) {
          setValidations((prev) => ({
            ...prev,
            confirmPassword: validateConfirmPassword(
              value,
              form.basicInfo.confirmPassword,
            ),
          }));
        }
        break;
      case "confirmPassword":
        result = validateConfirmPassword(form.basicInfo.password, value);
        break;
      case "state":
        result = validateState(value);
        break;
      case "address":
        result = validateAddress(value);
        break;
      case "matricNo":
        result = validateMatricNo(value);
        break;
      default:
        result = { isValid: true };
    }

    setValidations((prev) => ({ ...prev, [name]: result }));
    return result;
  };

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    // Update form state
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

  // Handle form submission
  const handleSubmit = async () => {
    // Create the signup payload matching SignupData interface
    const signupPayload: SignupData = {
      firstName: form.basicInfo.firstName,
      lastName: form.basicInfo.lastName,
      email: form.basicInfo.email,
      password: form.basicInfo.password,
      phone: form.basicInfo.phone,
      role: form.basicInfo.role,
      country: form.basicInfo.country,
      state: form.basicInfo.state,
      address: form.basicInfo.address,
      gender: form.basicInfo.gender,
      academic_info: {
        institution: form.academicInfo.institution,
        matric_number: form.academicInfo.matricNo,
        program: form.academicInfo.program,
        department: form.academicInfo.department,
        faculty: form.academicInfo.faculty,
        admission_year: parseInt(form.academicInfo.admissionYear, 10),
        student_level: form.academicInfo.level,
        graduation_year: form.academicInfo.expectedGraduationYear
          ? parseInt(form.academicInfo.expectedGraduationYear, 10)
          : undefined,
      },
    };

    const result = await post(signupPayload);

    if (result) {
      // Navigate to verification page
      router.push(APP_ROUTES.SIGNUP_VERIFY);
    }
  };

  const schoolOptions =
    schools?.items?.map((school) => ({
      label: school.label,
      value: school.code,
    })) ?? [];

  const facultyOptions =
    faculties?.faculties?.map((faculty) => ({
      label: faculty.name,
      value: faculty.code,
    })) ?? [];

  const selectedFaculty = faculties?.faculties?.find(
    (faculty) => faculty.code === form.academicInfo.faculty,
  );

  const departmentOptions =
    selectedFaculty?.departments?.map((dept) => ({
      label: dept,
      value: dept,
    })) ?? [];

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
              onBlur={(e) => handleBlur("firstName", e.target.value)}
              className={styles.SyncInput}
              placeholder="e.g John"
              inputType="text"
              invalid={
                touched.firstName && validations.firstName?.type === "error"
              }
              warning={
                touched.firstName && validations.firstName?.type === "warning"
              }
              info={
                touched.firstName && validations.firstName?.message
                  ? {
                      message: validations.firstName.message,
                      type: validations.firstName.type || "info",
                    }
                  : undefined
              }
            />
          </div>

          <div>
            <SyncInput
              label="Last Name"
              required
              name="lastName"
              value={form.basicInfo.lastName}
              onChange={onChange}
              onBlur={(e) => handleBlur("lastName", e.target.value)}
              className={styles.SyncInput}
              placeholder="e.g Doe"
              inputType="text"
              invalid={
                touched.lastName && validations.lastName?.type === "error"
              }
              warning={
                touched.lastName && validations.lastName?.type === "warning"
              }
              info={
                touched.lastName && validations.lastName?.message
                  ? {
                      message: validations.lastName.message,
                      type: validations.lastName.type || "info",
                    }
                  : undefined
              }
            />
          </div>

          <div>
            <SyncInput
              label="Email"
              required
              name="email"
              value={form.basicInfo.email}
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

          <div>
            <SyncInput
              label="Phone"
              required
              name="phone"
              value={form.basicInfo.phone}
              onChange={onChange}
              onBlur={(e) => handleBlur("phone", e.target.value)}
              className={styles.SyncInput}
              placeholder="e.g 1234 5678 90"
              inputType="phone"
              invalid={touched.phone && validations.phone?.type === "error"}
              warning={touched.phone && validations.phone?.type === "warning"}
              info={
                touched.phone && validations.phone?.message
                  ? {
                      message: validations.phone.message,
                      type: validations.phone.type || "info",
                    }
                  : undefined
              }
            />
          </div>

          <div>
            <SyncInput
              label="Password"
              required
              name="password"
              value={form.basicInfo.password}
              onChange={onChange}
              onBlur={(e) => handleBlur("password", e.target.value)}
              className={styles.SyncInput}
              placeholder="e.g JohN112*#"
              inputType="password"
              invalid={
                touched.password && validations.password?.type === "error"
              }
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

          <div>
            <SyncInput
              label="Confirm Password"
              required
              name="confirmPassword"
              value={form.basicInfo.confirmPassword}
              onChange={onChange}
              onBlur={(e) => handleBlur("confirmPassword", e.target.value)}
              className={styles.SyncInput}
              placeholder="e.g JohN112*#"
              inputType="password"
              invalid={
                touched.confirmPassword &&
                validations.confirmPassword?.type === "error"
              }
              warning={
                touched.confirmPassword &&
                validations.confirmPassword?.type === "warning"
              }
              info={
                touched.confirmPassword && validations.confirmPassword?.message
                  ? {
                      message: validations.confirmPassword.message,
                      type: validations.confirmPassword.type || "info",
                    }
                  : undefined
              }
            />
          </div>

          <div>
            <SyncSelect
              options={[
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
                { label: "Other", value: "other" },
              ]}
              label="Gender"
              placeholder="Select gender"
              onChange={(val) =>
                setForm((f) => ({
                  ...f,
                  basicInfo: { ...f.basicInfo, gender: val },
                }))
              }
            />
          </div>

          <div>
            <SyncInput
              label="Country"
              name="country"
              value={form.basicInfo.country}
              onChange={onChange}
              className={styles.SyncInput}
              placeholder="e.g Nigeria"
              inputType="text"
            />
          </div>

          <div>
            <SyncInput
              label="State/Province"
              required
              name="state"
              value={form.basicInfo.state}
              onChange={onChange}
              onBlur={(e) => handleBlur("state", e.target.value)}
              className={styles.SyncInput}
              placeholder="e.g Owerri"
              inputType="text"
              invalid={touched.state && validations.state?.type === "error"}
              warning={touched.state && validations.state?.type === "warning"}
              info={
                touched.state && validations.state?.message
                  ? {
                      message: validations.state.message,
                      type: validations.state.type || "info",
                    }
                  : undefined
              }
            />
          </div>

          <div>
            <SyncInput
              label="Home Address"
              required
              name="address"
              value={form.basicInfo.address}
              onChange={onChange}
              onBlur={(e) => handleBlur("address", e.target.value)}
              className={styles.SyncInput}
              placeholder="e.g Abc Ave. 1100 State County"
              inputType="text"
              invalid={touched.address && validations.address?.type === "error"}
              warning={
                touched.address && validations.address?.type === "warning"
              }
              info={
                touched.address && validations.address?.message
                  ? {
                      message: validations.address.message,
                      type: validations.address.type || "info",
                    }
                  : undefined
              }
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
              onBlur={(e) => handleBlur("matricNo", e.target.value)}
              className={styles.SyncInput}
              placeholder="e.g 202600010023"
              inputType="text"
              invalid={
                touched.matricNo && validations.matricNo?.type === "error"
              }
              warning={
                touched.matricNo && validations.matricNo?.type === "warning"
              }
              info={
                touched.matricNo && validations.matricNo?.message
                  ? {
                      message: validations.matricNo.message,
                      type: validations.matricNo.type || "info",
                    }
                  : undefined
              }
            />
          </div>

          <div>
            <SyncSelect
              options={schoolOptions}
              label="Institution"
              required
              placeholder={
                schoolsLoading
                  ? "Loading institutions..."
                  : "e.g Federal University of Technology Ow..."
              }
              disabled={schoolsLoading}
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
              options={departmentOptions}
              label="Department"
              required
              placeholder={
                !form.academicInfo.faculty
                  ? "Select a faculty first"
                  : "e.g Information Technology"
              }
              disabled={!form.academicInfo.faculty}
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
              options={facultyOptions}
              label="Faculty"
              required
              placeholder={
                facultiesLoading
                  ? "Loading faculties..."
                  : "e.g School of Information and Comm..."
              }
              disabled={facultiesLoading || !form.academicInfo.institution}
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
          onClick={() => {
            if (activeTab === "basicInfo") {
              setActiveTab("academicInfo");
            } else {
              handleSubmit();
            }
          }}
          disabled={
            activeTab === "basicInfo"
              ? !areFieldsFilled({ ...form.basicInfo }, [
                  "confirmPassword",
                  "gender",
                  "country",
                ])
              : !areFieldsFilled({ ...form.basicInfo, ...form.academicInfo }, [
                  "expectedGraduationYear",
                  "confirmPassword",
                  "gender",
                  "country",
                ]) || form.basicInfo.password !== form.basicInfo.confirmPassword
          }
          loading={loading}
        >
          {activeTab === "basicInfo"
            ? "Next"
            : loading
              ? "Creating Account..."
              : "Submit"}
        </SyncButton>
      </div>

      {/* Display API response messages */}
      {error && (
        <div
          style={{
            color: "var(--color-error)",
            marginTop: "1rem",
            textAlign: "center",
          }}
        >
          {error.message}
        </div>
      )}
      {status === "error" && message && (
        <div
          style={{
            color: "var(--color-error)",
            marginTop: "1rem",
            textAlign: "center",
          }}
        >
          {message}
        </div>
      )}
      {schoolsError && (
        <div
          style={{
            color: "var(--color-error)",
            marginTop: "1rem",
            textAlign: "center",
          }}
        >
          {schoolsError.message}
        </div>
      )}
      {!schoolsError && schoolsMessage && (
        <div
          style={{
            color: "var(--color-warning, #e0a800)",
            marginTop: "1rem",
            textAlign: "center",
          }}
        >
          {schoolsMessage}
        </div>
      )}
    </div>
  );
}
