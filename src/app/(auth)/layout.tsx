"use client";
import "./style.scss";
import React from "react";
import { Layout } from "antd";
const { Content } = Layout;

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <Layout>
      <Content>
        <div className="container">
          <main className="auth-page">
            <div className="auth-page_left-box">
              <div className="copy-text">
                <h1>Manage with ease</h1>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad,
                  aliquam dolor. Mollitia?
                </p>
              </div>
            </div>

            <div className="auth-page_right-box">
              <div className="auth-page_content">{children}</div>
            </div>
          </main>
        </div>
      </Content>
    </Layout>
  );
}
