"use client";
import Replace from "@/assets/icons/Replace";
import Upload from "@/assets/icons/Upload";
import View from "@/assets/icons/View";
import FormatStatus from "@/components/Status";
import styles from "./styles/DocumentTable.module.css";

function DocumentTable({ title, cells }: DocumentTable) {
  return (
    <section className={styles.document_table}>
      <p className={styles.title}>{title}</p>
      <div className={styles.wrapper}>
        {cells.map((cell) => (
          <div key={cell.id} className={styles.cell}>
            <p className={styles.label}>{cell.title}</p>
            <div className={styles.right}>
              <FormatStatus
                status={cell.status.value}
                format=""
                text={cell.status.label}
              />
              <button
                className={`${styles.btn} ${
                  cell.status.value !== "NOT_UPLOADED" ? styles.disabled : ""
                }`}
                onClick={() => cell.upload?.(cell.id)}
                disabled={cell.status.value !== "NOT_UPLOADED"}
              >
                <Upload />
              </button>
              <button
                className={`${styles.btn} ${
                  cell.status.value === "NOT_UPLOADED" ? styles.disabled : ""
                }`}
                onClick={() => cell.view?.(cell.id)}
                disabled={cell.status.value === "NOT_UPLOADED"}
              >
                <View />
              </button>
              <button
                className={`${styles.btn} ${
                  cell.status.value === "NOT_UPLOADED" ? styles.disabled : ""
                }`}
                onClick={() => cell.replace?.(cell.id)}
                disabled={cell.status.value === "NOT_UPLOADED"}
              >
                <Replace />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default DocumentTable;
