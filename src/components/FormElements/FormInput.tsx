"use client";
import React, { ChangeEvent, FC, useEffect, useState } from "react";

interface FormInputProps {
  id?: string;
  type?: "text" | "number" | "email";
  name: string;
  ariaLabel?: string;
  disabled?: boolean;
  maxLength?: number;
  className?: string;
  required?: boolean;
  placeholder?: string;
  value: string | number;
  styles?: React.CSSProperties;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: FC<FormInputProps> = ({
  id,
  type = "text",
  name,
  value,
  styles,
  onChange,
  disabled,
  maxLength,
  className,
  required,
  placeholder,
  ariaLabel,
}) => {
  const [isTouched, setIsTouched] = useState(false);

  const handleBlur = () => {
    setIsTouched(!isTouched);
  };

  return (
    <input
      id={`_${id || name}_`}
      name={name}
      type={type}
      value={value}
      style={styles}
      onChange={onChange}
      disabled={disabled || false}
      maxLength={maxLength}
      className={`${className} ${isTouched ? "touched" : "untouched"} ${
        disabled ? "input-disabled" : ""
      }`}
      required={required || false}
      placeholder={placeholder || " "}
      aria-label={ariaLabel || name}
      onFocus={handleBlur}
    />
  );
};

export default FormInput;
