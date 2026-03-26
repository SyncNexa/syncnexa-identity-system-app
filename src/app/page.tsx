import Image from "next/image";
import styles from "./page.module.css";
import { redirect } from "next/navigation";
import { APP_ROUTES } from "@/routes/paths";

export default function Home() {
  return redirect(APP_ROUTES.OVERVIEW);
}
