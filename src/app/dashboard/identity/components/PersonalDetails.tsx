import React from "react";
import styles from "./styles/Components.module.css";
import SyncInput, { SyncSelect } from "@/components/Input";
import SyncButton from "@/components/Button";
import { areFieldsFilled } from "@/utils/sanitizers";
import { API_ROUTES, APP_ROUTES } from "@/routes/paths";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";

function PersonalDetails({
  address,
  email,
  fullName,
  phoneNumber,
  gender,
}: Omit<PersonalInfo, "dateOfBirth">) {
  const { showToast } = useToast();
  const router = useRouter();
  const [newInfo, setNewInfo] = React.useState<
    Omit<PersonalInfo, "dateOfBirth">
  >({
    address,
    email,
    fullName,
    phoneNumber,
    gender,
  });
  const [loading, setLoading] = React.useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_ROUTES.USER_PERSONAL_INFO, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newInfo),
      });

      // Handle 202 Accepted - email verification required
      if (response.status === 202) {
        showToast({
          title: "Verification Required",
          message: "Please verify your new email address",
          type: "info",
        });
        // Redirect to email verification page with the new email
        const emailParam = encodeURIComponent(newInfo.email);
        router.push(`${APP_ROUTES.SIGNUP_VERIFY}?email=${emailParam}`);
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to save personal information");
      }

      showToast({
        title: "Success",
        message: "Personal information updated successfully",
        type: "success",
      });
    } catch (error) {
      showToast({
        title: "Error",
        message:
          error instanceof Error ? error.message : "Failed to save changes",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={styles.personal_info}>
      <div className={styles.inner}>
        <SyncInput
          inputType="text"
          label="Full Name"
          required
          value={newInfo.fullName}
          onChange={(e) =>
            setNewInfo((f) => ({ ...f, fullName: e.target.value }))
          }
        />
      </div>
      <div className={styles.inner}>
        <SyncSelect
          options={[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
            { label: "Other", value: "other" },
          ]}
          label="Gender"
          placeholder="Select gender"
          defaultValue={newInfo.gender}
          onChange={(val) =>
            setNewInfo((f) => ({
              ...f,
              gender: val as "male" | "female" | "other",
            }))
          }
        />
      </div>
      <div className={styles.inner}>
        <SyncInput
          inputType="phone"
          label="Phone Number"
          value={newInfo.phoneNumber}
          onChange={(e) =>
            setNewInfo((f) => ({ ...f, phoneNumber: e.target.value }))
          }
        />
      </div>
      <div className={styles.inner}>
        <SyncInput
          inputType="email"
          label="Email Address"
          value={newInfo.email}
          onChange={(e) => setNewInfo((f) => ({ ...f, email: e.target.value }))}
        />
      </div>
      <SyncButton
        label="Save"
        color="green"
        onClick={handleSave}
        buttonStyles={{ width: "100%", height: "3.5rem" }}
        loading={loading}
        disabled={!areFieldsFilled(newInfo) || loading}
      />
    </div>
  );
}

export default PersonalDetails;
