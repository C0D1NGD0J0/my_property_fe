"use client";
import { useEffect, useState } from "react";
import { Layout } from "antd";

import userService from "@services/user";
import CookieManager from "@utils/cookieManager";
import { useAuthStore } from "@store/auth.store";
import Navbar from "@components/navigation/Navbar";
import Sidebar from "@components/navigation/Sidebar";
import { useRouter } from "next/navigation";
import { useNotification } from "@contexts/notification";
import Loading from "@components/ui/Loading";
import { ErrorResponse } from "@utils/errorHandler";

const { Content } = Layout;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const cid = CookieManager.getCookie("cid");
  const { openNotification } = useNotification();
  const { setUser, isLoggedIn, logout } = useAuthStore();
  const { push } = useRouter();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await userService.getCurrentUser(cid);
        setUser(res.data);
        setLoading(false);
      } catch (error: unknown) {
        const err = error as ErrorResponse;
        console.log(error);
        if (err?.data) {
          openNotification("error", err.data, "Please login to proceed.");
        }
        logout();
        push("/login");
        setLoading(false);
      }
    };
    getUser();
  }, [cid]);

  if (loading || !cid) {
    return <Loading description="Loading assets..." />;
  }

  return (
    <div className="container">
      <Sidebar />
      <main className="main">
        <Navbar />
        <Content>{children}</Content>
      </main>
    </div>
  );
}
