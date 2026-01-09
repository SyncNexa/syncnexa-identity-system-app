interface Verification {
  id: string;
  type: string;
  status: {
    value: "NOT_VERIFIED" | "VERIFIED" | "FAILED" | "PENDING";
    label: string;
  };
  date: Date;
  requirements: string[];
  action: {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
  };
  info?: {
    message?: string;
    label: string;
  };
}
