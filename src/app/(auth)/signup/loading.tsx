import React from "react";
import { Alert, Space, Spin } from "antd";

function Loading() {
  return (
    <div
      style={{
        width: "100%",
        height: "20rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spin tip="Loading" />
    </div>
  );
}

export default Loading;
