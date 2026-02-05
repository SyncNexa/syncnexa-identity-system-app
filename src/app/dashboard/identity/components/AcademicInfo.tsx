import React from "react";
import styles from "./styles/Components.module.css";
import SyncInput from "@/components/Input";
import SyncButton from "@/components/Button";
import DocumentSelector from "@/components/Input/DocumentSelector";
import { API_ROUTES } from "@/routes/paths";
import { useToast } from "@/hooks/useToast";

function AcademicInfo() {
  const { showToast } = useToast();
  const [loading, setLoading] = React.useState(false);
  const [reason, setReason] = React.useState("");
  const [document, setDocument] = React.useState<File | null>(null);

  const handleSubmit = async () => {
    if (!reason.trim()) {
      showToast({
        title: "Validation Error",
        message: "Please provide a reason for correction",
        type: "error",
      });
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("reason", reason);
      if (document) {
        formData.append("document", document);
      }

      const response = await fetch(API_ROUTES.USER_ACADEMIC_DETAILS, {
        method: "PATCH",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit academic correction request");
      }

      showToast({
        title: "Success",
        message: "Correction request submitted successfully",
        type: "success",
      });

      // Reset form
      setReason("");
      setDocument(null);
    } catch (error) {
      showToast({
        title: "Error",
        message:
          error instanceof Error ? error.message : "Failed to submit request",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.academic_info}>
      <div className={styles.big}>
        <SyncInput
          label="Reason for correction"
          placeholder="Enter Reason"
          inputType="textarea"
          value={reason}
          onValueChange={setReason}
        />
      </div>
      <div className={styles.big}>
        <DocumentSelector
          formats={["pdf", "png", "docx"]}
          label="Supporting document"
          onSelect={setDocument}
        />
      </div>
      <SyncButton
        label="Submit"
        onClick={handleSubmit}
        buttonStyles={{ width: "100%", height: "3.5rem" }}
        color="green"
        loading={loading}
        disabled={!reason.trim() || loading}
      />
    </div>
  );
}

export default AcademicInfo;
