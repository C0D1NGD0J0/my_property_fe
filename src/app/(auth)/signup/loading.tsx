import React from "react";
import { Alert, Space, Spin } from "antd";

function Loading() {
  return (
    <div
      style={{
        width: "100%",
        height: "40rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spin>
        <Alert description="Loading...." type="info" />
      </Spin>
    </div>
  );
}

export default Loading;
