import React from "react";
import { Alert, Spin } from "antd";

const Loading = (props: {
  description?: string;
  size?: "regular" | "fullscreen";
}) => {
  const styles: {
    fullscreen: React.CSSProperties;
    regular: React.CSSProperties;
  } = {
    fullscreen: {
      zIndex: 99,
      width: "100%",
      display: "flex",
      height: "100dvh",
      position: "fixed",
      top: 0,
      left: 0,
      backgroundColor: "rgba(239, 239, 239, 1)",
      alignItems: "center",
      justifyContent: "center",
    },
    regular: {
      width: "100%",
      height: "40rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  };

  let style = styles[props.size || "regular"];
  return (
    <div style={style}>
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
