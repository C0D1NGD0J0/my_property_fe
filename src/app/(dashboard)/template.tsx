"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import userService from "@services/user";
import useActive from "@hooks/useActive";
import Loading from "@components/UI/Loading";
import CookieManager from "@utils/cookieManager";
import { useAuthStore } from "@store/auth.store";
import { useNotification } from "@hooks/useNotification";
import PageTransition from "@utils/PageTransition";

export default function AuthTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const { push, refresh } = useRouter();
  const isIdle = useActive(780); //20mins
  const cid = CookieManager.getCookie("cid");
  const { setUser, logout, isLoggedIn, user } = useAuthStore();
  const { openNotification } = useNotification();
  const [isIdleLoading, setIsIdleLoading] = useState(false);

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
    // handle error from getcurrentuser request
    if (error) {
      const errMessage = error
        ? (error as unknown as any).data
        : "An error occurred";
      openNotification("error", errMessage, "Please login to proceed.");
      logout();
      refresh();
      return push("/login");
    }
  }, [error]);

  useEffect(() => {
    // handles user inactivity
    if (isIdle || !cid) {
      setIsIdleLoading(true);
      logout(true);
      setTimeout(() => {
        refresh();
        return push("/login");
      }, 8000); //10000 = 10sec
    }
  }, [isIdle, cid]);

  if (isLoading && !isIdleLoading) {
    return <Loading size="fullscreen" description="Authenticating..." />;
  }

  if (isIdleLoading) {
    let msg = !cid ? "Signing out..." : "Signed out due to inactivity...";
    return <Loading size="fullscreen" description={msg} />;
  }

  return <>{children}</>;
}
