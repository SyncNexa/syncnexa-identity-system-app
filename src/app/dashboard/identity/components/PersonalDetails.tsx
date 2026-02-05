import React from "react";
import styles from "./styles/Components.module.css";
import SyncInput, { SyncSelect } from "@/components/Input";
import SyncButton from "@/components/Button";
import { areFieldsFilled } from "@/utils/sanitizers";
function PersonalDetails({
  address,
  email,
  fullName,
  phoneNumber,
  gender,
}: Omit<PersonalInfo, "dateOfBirth">) {
  const [newInfo, setNewInfo] = React.useState<
    Omit<PersonalInfo, "dateOfBirth">
  >({
    address,
    email,
    fullName,
    phoneNumber,
    gender,
  });
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
        onClick={() => {}}
        buttonStyles={{ width: "100%", height: "3.5rem" }}
        // loading
        disabled={!areFieldsFilled(newInfo)}
      />
    </div>
  );
}

export default PersonalDetails;
