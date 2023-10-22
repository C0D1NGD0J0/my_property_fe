"use client";
import React, { ChangeEvent, FC } from "react";

interface FormInputProps {
  id?: string;
  type: string;
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
  return (
    <input
      id={`_${name}_`}
      name={name}
      type={type}
      value={value}
      style={styles}
      onChange={onChange}
      disabled={disabled || false}
      maxLength={maxLength}
      className={className}
      required={required || false}
      placeholder={placeholder || " "}
      aria-label={ariaLabel || name}
    />
  );
};

export default FormInput;
