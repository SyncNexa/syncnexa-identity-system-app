interface NotificationPayload {
  id: string;
  type: "access" | "alert" | "system" | "info";
  typeLabel: "Profile Access" | "Login Alert";
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
