"use client";
import Link from "next/link";
import { Button, Result } from "antd";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FormikValues, useFormik } from "formik";

import authService from "@services/auth";
import CookieManager from "@utils/cookieManager";
import { useNotification } from "@hooks/useNotification";
import authValidation from "@validations/auth.validation";
import { FormField, FormInput, FormLabel } from "@components/FormElements";

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
        openNotification("success", "Success", res.msg);
      }
    } catch (e: unknown) {
      const err = e as Error & { data: any };
      return openNotification("error", "Login Error", err.data);
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
                        CookieManager.setCookie("cid", item.cid);
                        setTimeout(() => push("/dashboard"), 3000);
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
            <h2 className="header-title">Login</h2>
            <hr className="titleBar-sm center" />
            <p className="header-subtitle">
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
              <div className="action-fields">
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

          <div className="auth-page_content-footer">
            <p>
              <Link href="/forgot_password">
                <strong>Forgot password? </strong>
              </Link>
            </p>
            <p className="termsAgreement">
              By continuing, you agree to accept our{" "}
              <a href="#!">Privacy & Terms of Service</a>
            </p>
          </div>
        </>
      )}
    </>
  );
}
