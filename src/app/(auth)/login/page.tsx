"use client";
import Link from "next/link";
import React, { useState } from "react";
import FormInput from "@components/FormElements/Input";
import FormLabel from "@components/FormElements/Label";
import FormField from "@components/FormElements/FormField";

export default function Login() {
  return (
    <>
      <div className="auth-page_content-header">
        <h2>Login</h2>
        <p>
          You dont have an account yet?
          <Link href="/signup">
            <strong>Signup</strong>
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
                type="email"
                onChange={() => ""}
                className="form-input"
              />
              <FormLabel className="form-label" htmlFor="email" label="Email" />
            </FormField>
          </div>

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
