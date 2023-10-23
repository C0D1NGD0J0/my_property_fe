import React, { useState, useEffect, MouseEvent } from "react";
import { Alert } from "antd";

interface TimedAlertProps {
  duration?: number;
  type: "success" | "info" | "warning" | "error" | undefined;
  message: string;
  onClose?: () => void;
}

const TimedAlert: React.FC<TimedAlertProps> = ({
  duration = 3000,
  type,
  message,
  onClose,
}) => {
  const [visible, setVisible] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <>
      {visible && (
        <Alert
          closable
          type={type}
          message={message}
          onClose={onClose}
          className="timed-alert"
        />
      )}
    </>
  );
};

export default TimedAlert;
