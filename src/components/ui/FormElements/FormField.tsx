"use client";
import React from "react";

export default function FormField({
  children,
  error,
}: {
  children: React.ReactNode;
  error: any;
}) {
  return (
    <div className="form-field">
      {children}
      {error && error.touched && error.msg ? (
        <small className="form-field-error">{error.msg}</small>
      ) : null}
    </div>
  );
}
