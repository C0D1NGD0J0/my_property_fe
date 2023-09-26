"use client";
import React from "react";

const FormLabel = (props: any) => {
  return (
    <label htmlFor={props.htmlFor} className={props.className}>
      {props.label}
    </label>
  );
};

export default FormLabel;
