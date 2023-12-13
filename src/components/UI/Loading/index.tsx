import React from "react";
import style from "./style.module.css";
import { Alert, Spin } from "antd";

interface Test {
  description?: string;
  type?: string;
  spinning?: boolean;
  onClose?: () => void;
  isCloseable?: boolean;
  size?: "regular" | "fullscreen";
}
const Loading = ({
  size = "regular",
  description,
  onClose,
  isCloseable,
}: Test) => {
  return (
    <div
      className={`${style.loading_regular} ${
        size === "fullscreen" && style.loading_fullscreen
      }`}
    >
      <Spin size={"small"}>
        <Alert
          description={description ? description : "Loading...."}
          type="info"
          onClose={onClose}
          closable={isCloseable || false}
        />
      </Spin>
    </div>
  );
};

export default Loading;
