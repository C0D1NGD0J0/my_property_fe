import React from "react";
import { Alert, Space, Spin } from "antd";

const Loading = (props: { description?: string }) => {
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
        <Alert
          description={props.description ? props.description : "Loading...."}
          type="info"
        />
      </Spin>
    </div>
  );
};

export default Loading;
