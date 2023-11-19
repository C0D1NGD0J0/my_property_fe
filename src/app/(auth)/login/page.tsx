"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FormikValues, useFormik } from "formik";
import { useRouter } from "next/navigation";

import authService from "@services/auth";
import { useNotification } from "@contexts/notification";
import FormInput from "@components/ui/FormElements/FormInput";
import FormLabel from "@components/ui/FormElements/FormLabel";
import FormField from "@components/ui/FormElements/FormField";
import authValidation from "@validations/auth.validation";
import { Button, Result } from "antd";
import CookieManager from "@utils/cookieManager";

export default function Login() {
  const { push } = useRouter();
  const { openNotification } = useNotification();
  const [isSuccess, setIsSuccess] = useState(false);
  const [accounts, setAccounts] = useState<
    {
      _id: string;
      cid: string;
      name: string;
    }[]
  >([]);

  const handleSubmit = async (values: FormikValues) => {
    try {
      const res = await authService.login({
        email: values.email,
        password: values.password,
      });
      if (res.success) {
        formik.resetForm();
        formik.setSubmitting(false);
        setAccounts(res.linkedAccounts);

        setIsSuccess(true);
        openNotification("success", "Success", res.data);
      }
    } catch (e: any) {
      return openNotification("error", "Login Error", e.data);
    }
  };

  const formik = useFormik({
    onSubmit: handleSubmit,
    initialValues: { password: "password", email: "wayne@example.com" },
    validate: async (val) => {
      const res = await authValidation.login(val);
      return res.isValid ? {} : res.errors;
    },
  });

  return (
    <>
      {isSuccess ? (
        <Result
          status="info"
          title="Select which account you wish to login into."
        >
          <div className="account-list">
            <ul>
              {accounts &&
                accounts.map((item) => {
                  return (
                    <li
                      key={item.name}
                      onClick={() => {
                        CookieManager.setCookie("clientId", item.cid);
                        push("/dashboard");
                      }}
                      style={{ padding: ".8rem", cursor: "pointer" }}
                    >
                      {item.name}
                    </li>
                  );
                })}
            </ul>
          </div>
        </Result>
      ) : (
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
            <form
              className="auth-form"
              autoComplete="false"
              onSubmit={(e) => {
                e.preventDefault();
                formik.handleSubmit(e);
              }}
            >
              <div className="form-fields">
                <FormField
                  error={{
                    msg: formik.errors.email,
                    touched: !!formik.touched.email,
                  }}
                >
                  <FormInput
                    required
                    disabled={formik.isSubmitting}
                    type="email"
                    name="email"
                    className="form-input"
                    onChange={(e) => {
                      formik.setFieldTouched("email");
                      formik.handleChange(e);
                    }}
                    value={formik.values.email}
                  />
                  <FormLabel
                    className="form-label"
                    htmlFor="email"
                    label="Email"
                  />
                </FormField>
              </div>

              <div className="form-fields">
                <FormField
                  error={{
                    msg: formik.errors.password,
                    touched: !!formik.touched.password,
                  }}
                >
                  <FormInput
                    required
                    disabled={formik.isSubmitting}
                    name="password"
                    value={formik.values.password}
                    type="password"
                    onChange={(e) => {
                      formik.setFieldTouched("password");
                      formik.handleChange(e);
                    }}
                    className="form-input"
                  />
                  <FormLabel
                    className="form-label"
                    htmlFor="password"
                    label="Password"
                  />
                </FormField>
              </div>
              <div className="auth-page_content-footer">
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? "Loading..." : "Login"}
                </Button>
              </div>
            </form>
          </div>

          <div style={{ width: "100%", textAlign: "center" }}>
            <p>
              <Link href="/forgot_password">
                <strong>Forgot password? </strong>
              </Link>
            </p>
          </div>
        </>
      )}
    </>
  );
}
