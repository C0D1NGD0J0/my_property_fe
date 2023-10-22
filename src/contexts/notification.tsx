"use client";
import { notification } from "antd";
import React, { createContext, useContext } from "react";

type NotificationInstance = "info" | "warning" | "error" | "success";
type NotificationContextType = {
  openNotification: (
    type: NotificationInstance,
    title: string,
    message: string,
  ) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider",
    );
  }
  return context;
};

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (
    type: NotificationInstance,
    title: string,
    description: string,
  ) => {
    api[type as NotificationInstance]({
      message: title,
      placement: "topRight",
      description: description,
    });
  };

  return (
    <NotificationContext.Provider value={{ openNotification }}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};
