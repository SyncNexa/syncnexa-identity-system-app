"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import { API_ROUTES, APP_ROUTES } from "@/routes/paths";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    const logout = async () => {
      try {
        await fetch(API_ROUTES.LOGOUT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
      } finally {
        if (isMounted) {
          router.replace(APP_ROUTES.LOGIN);
        }
      }
    };

    logout();

    return () => {
      isMounted = false;
    };
  }, [router]);

  return <Loading size="large" fullHeight />;
}
