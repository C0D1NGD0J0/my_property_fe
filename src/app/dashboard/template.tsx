"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import userService from "@services/user";
import useActive from "@hooks/useActive";
import Loading from "@components/ui/Loading";
import CookieManager from "@utils/cookieManager";
import { useAuthStore } from "@store/auth.store";
import { useNotification } from "@hooks/useNotification";

export default function AuthTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const { push } = useRouter();
  const isIdle = useActive(20); //20mins
  const cid = CookieManager.getCookie("cid");
  const { setUser, logout, isLoggedIn } = useAuthStore();
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
      cid && logout();
      push("/login");
    }
  }, [error]);

  useEffect(() => {
    // handles user inactivity
    if (isIdle) {
      setIsIdleLoading(true);
      cid && logout();
      setTimeout(() => {
        return push("/login");
      }, 10000); //10000 = 10sec
    }
  }, [isIdle]);

  if (isLoading && !isIdleLoading) {
    return <Loading size="fullscreen" description="Authenticating..." />;
  }

  if (isIdleLoading) {
    return (
      <Loading
        size="fullscreen"
        description="Signed out due to inactivity..."
      />
    );
  }

  return <>{children}</>;
}
