import { COMPLIANCE } from "./compliance_data";
import renderComponent from "./helper";
import styles from "./styles/Settings.module.css";

function Compliance() {
  return (
    <section className={styles.compliance}>
      <div className={styles.wrapper}>{renderComponent(COMPLIANCE)}</div>
      <div className={styles.summary}>
        <h4>Data Usage Summary</h4>
        {[
          {
            label: "Identity data",
            value: "Stored securely",
          },
          {
            label: "Connected applications",
            value: "3",
          },
          {
            label: "Verification providers",
            value: "Government agencies, Educational institutions",
          },
          {
            label: "Last accessed",
            value: "February 12, 2025 — 10:45 AM",
          },
        ].map((item, i) => (
          <div key={i} className={styles.data_row}>
            <small>{item.label}:</small>
            <p>{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Compliance;
