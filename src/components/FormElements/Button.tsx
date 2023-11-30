import React, { CSSProperties } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  onClick: () => void;
  className?: string;
  ariaLabel?: string;
  style?: CSSProperties;
  icon?: React.ReactNode;
  renderChildren: boolean;
  iconPosition?: "left" | "right";
  type: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  icon,
  label,
  style,
  onClick,
  children,
  className,
  ariaLabel,
  type = "button",
  renderChildren = false,
  iconPosition = "left", // Default icon position is left
}) => {
  return (
    <button
      type={type}
      style={style}
      onClick={onClick}
      aria-label={ariaLabel || label}
      className={`btn ${className ? className : ""}`}
    >
      {renderChildren ? (
        children
      ) : (
        <>
          {icon && iconPosition === "left" && (
            <span className="btn-icon">{icon}</span>
          )}
          <span className="btn-label">{label}</span>
          {icon && iconPosition === "right" && (
            <span className="btn-icon">{icon}</span>
          )}
        </>
      )}
    </button>
  );
};

export default Button;
