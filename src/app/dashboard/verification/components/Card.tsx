"use client";
import SyncButton from "@/components/Button";
import FormatStatus from "@/components/Status";
import styles from "../styles/Verification.module.css";
import Verified from "@/assets/icons/Verified";
import Pending from "@/assets/icons/Pending";
import Tooltip from "@/components/Tooltip";
import Info from "@/assets/icons/Info";

function Card({
  action,
  date,
  id,
  requirements,
  status,
  type,
  info,
}: Verification) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div>
          <p className={styles.label}>{type}</p>
          <FormatStatus format="" status={status.value} text={status.label} />
        </div>
        <small>{date.toDateString()}</small>
      </div>
      <div className={styles.body}>
        <p className={styles.label}>Requirements</p>
        <ul>
          {requirements.map((req, i) => (
            <li key={i}>{req}</li>
          ))}
        </ul>
      </div>
      {info && (
        <div className={styles.info_wrapper}>
          {status.value === "VERIFIED" ? (
            <div className={styles.right}>
              <Verified />
              <em>{info.label}</em>
            </div>
          ) : status.value === "FAILED" ? (
            <div className={styles.left}>
              <em>{info.label}</em>
              <Tooltip
                content={info.message!}
                node={<Info />}
                className={styles.tooltip}
              />
            </div>
          ) : (
            <div className={styles.right}>
              <Pending />
              <em>{info.label}</em>
            </div>
          )}
        </div>
      )}

      {status.value !== "VERIFIED" && status.value !== "PENDING" && (
        <div className={styles.bottom}>
          <SyncButton
            onClick={action.onClick}
            variant="light"
            buttonStyles={{ height: "3rem" }}
            color="light"
          >
            {action.icon}
            {action.label}
          </SyncButton>
        </div>
      )}
    </div>
  );
}

export default Card;
