"use client";
import React, { useState } from "react";
import styles from "./DigitalStudentID.module.css";
import Image from "next/image";
import SyncButton from "../Button";
import Modal from "../Modal";

type StudentInfo = {
  name: string;
  registrationNumber: string;
  age: number;
  sex: string;
  institution: string;
  yearOfStudy: string;
  photo?: string;
};

type Props = {
  studentInfo?: StudentInfo;
  onQRCodeClick?: () => void;
};

const defaultInfo: StudentInfo = {
  name: "Osuagwu Chikanma",
  registrationNumber: "345674589",
  age: 18,
  sex: "Female",
  institution: "Federal University of Technology Owerri",
  yearOfStudy: "500 level",
  photo: "/placeholder-avatar.svg",
};

export default function DigitalStudentID({
  studentInfo = defaultInfo,
  onQRCodeClick,
}: Props) {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.infoSection}>
          <div className={styles.photoWrapper}>
            <div className={styles.photo}>
              {studentInfo.photo && (
                <Image
                  src={studentInfo.photo}
                  alt={studentInfo.name}
                  fill
                  className={styles.photoImage}
                />
              )}
            </div>
          </div>

          <div className={styles.details}>
            <p className={styles.detail}>
              <span className={styles.label}>Name</span>
              <span className={styles.value}> : {studentInfo.name}</span>
            </p>
            <p className={styles.detail}>
              <span className={styles.label}>Registration Number</span>
              <span className={styles.value}>
                {" "}
                : {studentInfo.registrationNumber}
              </span>
            </p>
            <p className={styles.detail}>
              <span className={styles.label}>Age</span>
              <span className={styles.value}> : {studentInfo.age}</span>
            </p>
            <p className={styles.detail}>
              <span className={styles.label}>Sex</span>
              <span className={styles.value}> : {studentInfo.sex}</span>
            </p>
            <p className={styles.detail}>
              <span className={styles.label}>Institution</span>
              <span className={styles.value}> : {studentInfo.institution}</span>
            </p>
            <p className={styles.detail}>
              <span className={styles.label}>Year of study</span>
              <span className={styles.value}> : {studentInfo.yearOfStudy}</span>
            </p>
          </div>
        </div>

        <SyncButton
          variant="primary"
          buttonStyles={{ height: 40, padding: "0 1.5rem" }}
          onClick={() => {
            setOpen((prev) => !prev);
          }}
          label="QR CODE"
          color="light"
        />
      </div>
      <Modal
        visible={open}
        title="Scan to Verify Student ID"
        onClose={() => setOpen((prev) => !prev)}
      >
        <div className={styles.modal_content}>
          <Image src={"/dummy/qr_code.svg"} alt="" width={200} height={200} />
          <h3 className={styles.name}>Osuagwu Chikanma</h3>
          <p>Federal University of Technology Owerri</p>
          <SyncButton
            label="Download ID"
            buttonStyles={{ height: 40, width: "100%" }}
          />
          <small>
            Verified by <span>SyncID</span>
          </small>
        </div>
      </Modal>
    </div>
  );
}
