"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import userService from "@services/user";
import Loading from "@components/ui/Loading";
import CookieManager from "@utils/cookieManager";
import { useAuthStore } from "@store/auth.store";
import { useNotification } from "@hooks/notification";

export default function AuthTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const cid = CookieManager.getCookie("cid");
  const { openNotification } = useNotification();
  const { setUser, isLoggedIn, logout } = useAuthStore();
  const { push } = useRouter();

  const { data, error, isLoading } = useQuery({
    queryKey: ["currentuser", cid],
    queryFn: async () => await userService.getCurrentUser(cid),
    enabled: !!cid,
    retry: false,
  });

  useEffect(() => {
    if (data) {
      setUser(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (error || !cid) {
      const errMessage = error
        ? (error as unknown as any).data
        : "An error occurred";
      openNotification("error", errMessage, "Please login to proceed.");
      logout();
      push("/login");
    }
  }, [error, cid]);

  if (isLoading || !cid) {
    return <Loading size="fullscreen" description="Authenticating..." />;
  }

  return <>{children}</>;
}
