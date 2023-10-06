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
      <Spin tip="Loading">
        <Alert
          description="Please be patience, data incoming...."
          type="info"
        />
      </Spin>
    </div>
  );
}

export default Loading;
