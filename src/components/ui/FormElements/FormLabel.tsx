"use client";
import React from "react";

interface FormLabelProps {
  htmlFor: string;
  className?: string;
  label: string;
  required?: boolean;
}

const FormLabel: React.FC<FormLabelProps> = ({
  htmlFor,
  className,
  label,
  required = false,
}) => {
  return (
    <label htmlFor={`_${htmlFor}_`} className={className}>
      {label}
      {required && <span aria-hidden="true">*</span>}
    </label>
  );
};

export default FormLabel;
