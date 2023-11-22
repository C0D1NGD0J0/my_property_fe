"use client";
import { useEffect } from "react";
import useSWR from "swr";
import { Layout } from "antd";

import userService from "@services/user";
import CookieManager from "@utils/cookieManager";
import Sidebar from "@components/navigation/Sidebar";
import Navbar from "@components/navigation/Navbar";

const { Content } = Layout;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cid = CookieManager.getCookie("clientId");
  useEffect(() => {
    // (async () => {
    //   const res = await userService.getCurrentUser(cid);
    //   console.log(res);
    // })();
  }, []);

  return (
    <div className="container">
      {/* <Sidebar /> */}
      <main className="main">
        {/* <Navbar /> */}
        <Content>{children}</Content>
      </main>
    </div>
  );
}
