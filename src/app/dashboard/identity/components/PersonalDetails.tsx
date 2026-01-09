import React from "react";
import styles from "../styles/Identity.module.css";
import SyncInput from "@/components/Input";
import SyncButton from "@/components/Button";
function PersonalDetails() {
  return (
    <div className={styles.modal_wrapper}>
      <div className={styles.inner}>
        <SyncInput inputType="text" label="Full Name" required />
      </div>
      <div className={styles.inner}>
        <SyncInput inputType="date" label="Date of Birth" required />
      </div>
      <div className={styles.inner}>
        <SyncInput inputType="select" label="Gender" />
      </div>
      <div className={styles.inner}>
        <SyncInput inputType="tel" label="Phone Number" />
      </div>
      <div className={styles.inner}>
        <SyncInput inputType="email" label="Email Address" />
      </div>

      <SyncButton
        label="Save"
        color="green"
        onClick={() => {}}
        buttonStyles={{ width: "100%", height: "3.5rem" }}
        // loading
      />
    </div>
  );
}

export default PersonalDetails;
