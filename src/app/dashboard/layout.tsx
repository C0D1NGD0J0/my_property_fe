"use client";
import { useEffect } from "react";
import useSWR from "swr";

import userService from "@services/user";
import CookieManager from "@utils/cookieManager";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cid = CookieManager.getCookie("clientId");
  useEffect(() => {
    (async () => {
      const res = await userService.getCurrentUser(cid);
      console.log(res);
    })();
  }, []);

  return <section>{children}</section>;
}
