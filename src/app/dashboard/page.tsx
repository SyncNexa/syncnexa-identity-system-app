import { redirect } from "next/navigation";
import { APP_ROUTES } from "@/routes/paths";

export default function DashboardPage() {
  redirect(APP_ROUTES.OVERVIEW);
}
