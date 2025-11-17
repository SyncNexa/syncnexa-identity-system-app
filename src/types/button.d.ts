type SyncButtonColor = "green" | "black" | "light";
type SyncButtonVariant = "primary" | "secondary" | "outline" | "text";
interface SyncButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  color?: SyncButtonColor;
  variant?: SyncButtonVariant;
  loading?: boolean;
  buttonStyles?: React.CSSProperties;
}
