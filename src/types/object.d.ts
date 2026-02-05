interface NotificationPayload {
  id: string;
  type: "access" | "alert" | "system" | "info";
  typeLabel: "👤 Profile Access" | "🛡️ Login Alert" | "🛠️ System Update";
  message: string;
  time: Date;
  read: boolean;
  destination: any;
}

interface FormatDateTimeOptions {
  hideAgo?: boolean;
  hideTime?: boolean;
  long?: boolean;
  locale?: string;
}

interface FormatNameOptions {
  /**
   * How to format the name:
   * - "full": All names as initials (J. K. D.)
   * - "half": First name full, rest as initials (John K. D.)
   * - "medium": First and middle names full, last as initial (John Kennedy D.) [default]
   */
  initials?: "full" | "half" | "medium";
}

interface AcademicDetails {
  institution: string;
  department: string;
  level: string;
  program: string;
  matricNumber: string;
  admissionYear: number;
  expectedGraduationYear: number;
}
