import SyncButton from "@/components/Button";
import Image from "next/image";
import React from "react";
import styles from "./styles/Security.module.css";

function Overview() {
  return (
    <div className={styles.overview}>
      <Image src={"/security.png"} alt="" width={1024} height={1024} />
      <div className={styles.right}>
        <div className={styles.row}>
          <div>
            <small>Password Strength:</small>
            <p>Strong</p>
          </div>
          <SyncButton
            label="Change Password"
            variant="light"
            color="light"
            buttonStyles={{ width: "12rem" }}
          />
        </div>
        <div className={styles.row}>
          <div>
            <small>Multi-Factor Auth:</small>
            <p>Enabled</p>
          </div>
          <SyncButton
            label="Manage MFA"
            variant="light"
            color="light"
            buttonStyles={{ width: "12rem" }}
          />
        </div>
        <div className={styles.row}>
          <div>
            <small>Recovery Options:</small>
            <p>Email + Backup Codes</p>
          </div>
        </div>
        <div className={styles.row}>
          <div>
            <small>Recommended Actions:</small>
            <ul>
              {["Log out inactive sessions", "Update your password"].map(
                (r, i) => (
                  <li key={i}>{r}</li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
