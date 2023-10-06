"use client";
import Link from "next/link";
import React, { useState } from "react";
import FormInput from "@components/ui/FormElements/FormInput";
import FormLabel from "@components/ui/FormElements/FormLabel";
import FormField from "@components/ui/FormElements/FormField";

export default function ForgotPassword() {
  return (
    <>
      <div className="auth-page_content-header">
        <h2>Forgot Password</h2>
        <p>Enter the email address associated with your account</p>
      </div>
      <div className="auth-page_content-body">
        <form className="auth-form" autoComplete="false">
          <div className="form-fields">
            <FormField error={null}>
              <FormInput
                required
                name=""
                value=""
                type="email"
                onChange={() => ""}
                className="form-input"
              />
              <FormLabel className="form-label" htmlFor="email" label="Email" />
            </FormField>
          </div>
        </form>
      </div>
      <div className="auth-page_content-footer">
        <p>
          <Link href="/login">
            <strong>Login </strong>
          </Link>
        </p>
      </div>
    </>
  );
}
