import React from "react";
import styles from "./DigitalStudentID.module.css";
import Image from "next/image";
import SyncButton from "../Button";

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
          onClick={onQRCodeClick}
          label="QR CODE"
          color="light"
        />
      </div>
    </div>
  );
}
