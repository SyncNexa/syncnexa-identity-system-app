type SyncButtonColor = "green" | "black" | "light" | "red";
type SyncButtonVariant = "primary" | "secondary" | "outline" | "text" | "light";
interface SyncButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  color?: SyncButtonColor;
  variant?: SyncButtonVariant;
  loading?: boolean;
  buttonStyles?: React.CSSProperties;
  icon?: React.ReactNode;
}

interface ActionDrop {
  onClick?: () => void;
  icon?: React.ReactNode;
  children: ActionDropChild[];
}

interface ActionDropChild {
  label: string;
  value: string;
  onClick: (value: string) => void;
}
