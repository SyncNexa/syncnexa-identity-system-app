type ToastType = "success" | "error" | "warning" | "info";

type ToastPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "bottom-center";

type ToastOptions = {
  id?: string;
  title?: string;
  message: string;
  type?: ToastType;
  duration?: number;
  position?: ToastPosition;
};

type ToastItem = Required<Omit<ToastOptions, "id">> & { id: string };

type ToastContextValue = {
  showToast: (options: ToastOptions) => string;
  dismissToast: (id: string) => void;
  clearToasts: () => void;
};
