import React from "react";
import styles from "./styles/Components.module.css";
import SyncInput from "@/components/Input";
import SyncButton from "@/components/Button";
import DocumentSelector from "@/components/Input/DocumentSelector";

function AcademicInfo() {
  return (
    <div className={styles.academic_info}>
      <div className={styles.big}>
        <SyncInput
          label="Reason for correction"
          placeholder="Enter Reason"
          inputType="textarea"
        />
      </div>
      <div className={styles.big}>
        <DocumentSelector
          formats={["pdf", "png", "docx"]}
          label="Supporting document"
          onSelect={() => {}}
        />
      </div>
      <SyncButton
        label="Submit"
        onClick={() => {}}
        buttonStyles={{ width: "100%", height: "3.5rem" }}
        color="green"
      />
    </div>
  );
}

export default AcademicInfo;
