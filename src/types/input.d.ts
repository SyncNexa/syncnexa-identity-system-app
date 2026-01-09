interface SyncInput extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  onValueChange?: (value: string) => void;
  inputType: React.HTMLInputTypeAttribute | "otp";
  rightNode?: React.ReactNode;
  leftNode?: React.ReactNode;
  otpLength?: number;
  onOtpComplete?: (code: string) => void;
  onResendOtp?: () => void;
  resendDelay?: number;
  invalid?: boolean;
  warning?: boolean;
  info?: {
    message: string;
    type: "info" | "warning" | "error";
  };
}

interface DocumentSelector {
  formats: FileFormat[];
  onSelect: (file: File) => void;
  buffering?: () => void;
  label?: string;
}

type FileFormat = "pdf" | "png" | "jpeg" | "jpg" | "docx" | "txt";

interface SyncSelectOption {
  label: string;
  value: string;
  description?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

interface SyncSelectProps {
  label?: string;
  placeholder?: string;
  required?: boolean;
  options: SyncSelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onChange?: (value: string) => void;
  disabled?: boolean;
  invalid?: boolean;
  warning?: boolean;
  className?: string;
  name?: string;
  leftNode?: React.ReactNode;
  rightNode?: React.ReactNode;
  info?: {
    message: string;
    type: "info" | "warning" | "error";
  };
}
