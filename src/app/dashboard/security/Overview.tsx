"use client";
import SyncButton from "@/components/Button";
import Loading from "@/components/Loading/Loading";
import { API_ROUTES } from "@/routes/paths";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./styles/Security.module.css";

function Overview() {
  const [securityInfo, setSecurityInfo] = useState<SecurityInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSecurityInfo = async () => {
      try {
        const res = await fetch(API_ROUTES.USER_SECURITY);
        if (res.ok) {
          const result = await res.json();
          setSecurityInfo(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch security info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSecurityInfo();
  }, []);

  if (loading) {
    return <Loading size="medium" />;
  }

  return (
    <div className={styles.overview}>
      <Image src={"/security.png"} alt="" width={1024} height={1024} />
      <div className={styles.right}>
        <div className={styles.row}>
          <div>
            <small>Password Strength:</small>
            <p>{securityInfo?.password_strength.label || "Unknown"}</p>
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
            <p>{securityInfo?.mfa_status.enabled ? "Enabled" : "Disabled"}</p>
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
                ),
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
