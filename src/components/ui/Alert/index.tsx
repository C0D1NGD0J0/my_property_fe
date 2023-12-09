import React, { useState, useEffect, MouseEvent } from "react";
import { Alert } from "antd";

interface TimedAlertProps {
  duration?: number;
  type: "success" | "info" | "warning" | "error" | undefined;
  message: string;
  onClose?: () => void;
}

const TimedAlert: React.FC<TimedAlertProps> = ({
  duration,
  type,
  message,
  onClose,
}) => {
  const [visible, setVisible] = useState<boolean>(true);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (duration) {
      timer = setTimeout(() => {
        setVisible(false);
      }, duration);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [duration]);

  return (
    <>
      {visible && (
        <Alert
          closable
          type={type}
          message={message}
          onClose={onClose}
          showIcon
          className="timed-alert"
        />
      )}
    </>
  );
};

export default TimedAlert;
