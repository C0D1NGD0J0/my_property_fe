"use client";
import React from "react";
import { Layout } from "antd";
import { usePathname } from "next/navigation";
const { Content } = Layout;

interface MetaInfo {
  title?: string;
  description: string;
  icon?: string;
}

interface BoxOrderMapping {
  [key: string]: {
    position: ("left" | "right")[];
    meta: MetaInfo;
  };
}
interface LeftBoxProps {
  meta: MetaInfo;
}

interface RightBoxProps {
  children: React.ReactNode;
}

// Define the mapping between routes and box order
const routeToBoxOrder: BoxOrderMapping = {
  "/login": {
    position: ["left", "right"],
    meta: {
      title: "",
      description: "",
      icon: "",
    },
  },
  "/signup": {
    position: ["left", "right"],
    meta: {
      title: "",
      description: "",
      icon: "",
    },
  },
  "/reset_password": {
    position: ["right", "left"],
    meta: {
      title: "",
      description: "",
      icon: "",
    },
  },
  "/forgot_password": {
    position: ["right", "left"],
    meta: {
      title: "",
      description: "",
      icon: "",
    },
  },
  "/account_activation": {
    position: ["left", "right"],
    meta: {
      title: "",
      description: "",
      icon: "",
    },
  },
};
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const LeftBox: React.FC<LeftBoxProps> = ({ meta }) => (
    <div className="auth-page_left-box">
      <div className="copy-text">
        <h1>Manage with ease</h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad, aliquam
          dolor. Mollitia?
        </p>
      </div>
    </div>
  );

  const RightBox: React.FC<RightBoxProps> = ({ children }) => (
    <div className="auth-page_right-box">
      <div className="auth-page_content">{children}</div>
    </div>
  );

  const currentConfig = routeToBoxOrder[
    pathname.match(/^\/[^/]+/)?.[0] || ""
  ] || {
    position: ["left", "right"],
  };
  const boxOrder = currentConfig.position;
  const boxes = {
    left: <LeftBox meta={currentConfig.meta} />,
    right: <RightBox>{children}</RightBox>,
  };

  return (
    <Layout>
      <Content>
        <div className="container">
          <main className="auth-page">
            {boxOrder.map((boxKey, index) => (
              <React.Fragment key={index}>{boxes[boxKey]}</React.Fragment>
            ))}
          </main>
        </div>
      </Content>
    </Layout>
  );
};

export default AuthLayout;
