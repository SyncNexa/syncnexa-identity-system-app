interface Modal {
  title: string | React.ReactNode;
  children: React.ReactNode;
  visible: boolean;
  onClose?: () => void;
}
