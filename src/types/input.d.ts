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
