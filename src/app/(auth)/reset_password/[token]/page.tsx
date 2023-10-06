"use client";
import Link from "next/link";
import React, { useState } from "react";
import FormInput from "@components/ui/FormElements/FormInput";
import FormLabel from "@components/ui/FormElements/FormLabel";
import FormField from "@components/ui/FormElements/FormField";

export default function Signup() {
  return (
    <>
      <div className="auth-page_content-header">
        <h2>Reset Password</h2>
        <p>
          Already have an account?
          <Link href="/login">
            <strong>Login</strong>
          </Link>
        </p>
      </div>
      <div className="auth-page_content-body">
        <form className="auth-form" autoComplete="false">
          <div className="form-fields">
            <FormField error={null}>
              <FormInput
                required
                name=""
                value=""
                type="password"
                onChange={() => ""}
                className="form-input"
              />
              <FormLabel
                className="form-label"
                htmlFor="password"
                label="Password"
              />
            </FormField>
          </div>

          <div className="form-fields">
            <FormField error={null}>
              <FormInput
                required
                name=""
                value=""
                type="cpassword"
                onChange={() => ""}
                className="form-input"
              />
              <FormLabel
                className="form-label"
                htmlFor="cpassword"
                label="Confirm password"
              />
            </FormField>
          </div>
        </form>
      </div>
      <div className="auth-page_content-footer">
        <p>
          <Link href="/forgot_password">
            <strong>Forgot password? </strong>
          </Link>
        </p>
      </div>
    </>
  );
}
