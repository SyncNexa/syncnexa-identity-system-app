import { NavigationContext } from "@/contexts/NavigationContext";
import { useContext } from "react";

export function useCustomNavigation() {
  const context = useContext(NavigationContext);

  if (!context) throw new Error("Please use inside of provider");
  return context;
}
