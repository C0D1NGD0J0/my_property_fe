"use client";
import React from "react";

const FormLabel = (props: any) => {
  return (
    <label htmlFor={props.htmlFor} className={props.className}>
      {props.label}
      {props.required && <span aria-hidden="false">*12</span>}
    </label>
  );
};

FormLabel.defaultProps = {
  required: true,
};

export default FormLabel;
