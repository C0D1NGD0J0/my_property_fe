"use client";
import React from "react";

export default function FormField({
  className = "",
  children,
  error,
}: {
  className?: string;
  children: React.ReactNode;
  error: any;
}) {
  return (
    <div className={`form-field ${className ? className : ""}`}>
      {children}
      {error && error.touched && error.msg ? (
        <small className="form-field-error">
          <i>{error.msg}</i>
        </small>
      ) : null}
    </div>
  );
}
