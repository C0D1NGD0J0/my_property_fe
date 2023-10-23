"use client";
import Link from "next/link";
import React, { useState } from "react";
import FormInput from "@components/ui/FormElements/FormInput";
import FormLabel from "@components/ui/FormElements/FormLabel";
import FormField from "@components/ui/FormElements/FormField";

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
            {/* <FormField error={null}>
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
             */}
            <FormField error={null}>
              <FormInput
                required
                type="email"
                name="email"
                className="form-input"
                onChange={(e) => {
                  // setFieldTouched("email");
                  // handleChange(e);
                }}
                value={"formValues.email"}
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
