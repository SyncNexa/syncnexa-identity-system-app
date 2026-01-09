import styles from "./styles/Status.module.css";

function FormatStatus({
  status,
  format,
  text,
}: {
  status: string;
  format: string;
  text: string;
}) {
  return (
    <div className={styles.format_status}>
      <p className={styles[status]}>
        {format}
        {text}
      </p>
    </div>
  );
}

export default FormatStatus;
