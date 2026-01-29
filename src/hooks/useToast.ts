import { ToastContext } from "@/components/Toast/ToastProvider";
import { useContext } from "react";

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("Please use inside of ToastProvider");
  return context;
}
