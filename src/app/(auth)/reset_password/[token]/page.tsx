"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FormikValues, useFormik } from "formik";
import { useParams, useRouter } from "next/navigation";
import { Button } from "antd";

import authService from "@services/auth";
import Loading from "@components/ui/Loading";
import { hex64Regex } from "@utils/helperFN";
import { useNotification } from "@contexts/notification";
import authValidation from "@validations/auth.validation";
import FormInput from "@components/ui/FormElements/FormInput";
import FormLabel from "@components/ui/FormElements/FormLabel";
import FormField from "@components/ui/FormElements/FormField";

export default function ResetPassword() {
  const [inputType, setInputType] = useState("password");
  const [isLoading, setIsLoading] = useState(true);
  const { openNotification } = useNotification();
  const router = useRouter();
  const params = useParams();
  const { token } = params;

  useEffect(() => {
    if (token && hex64Regex.test(token as string)) {
      setIsLoading(false);
    }
  }, [token]);

  const toggleInputType = () => {
    setInputType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  const handleSubmit = async (values: FormikValues) => {
    try {
      const res = await authService.resetPassword(
        token as string,
        values.password,
      );
      if (res.success) {
        formik.resetForm();
        formik.setSubmitting(false);
        return openNotification("success", "Password Reset", res.data);
      }
    } catch (e: any) {
      if (e.data.includes("generate a new token")) {
        return openNotification("open", "Token expiration error", e.data, {
          btnText: "Resend password reset email.",
          onClose: async () => {
            router.push("/forgot_password");
            return;
          },
        });
      }
      return openNotification("error", "Account verification Error", e.data);
    }
  };

  const formik = useFormik({
    onSubmit: handleSubmit,
    initialValues: { password: "", cpassword: "" },
    validate: async (val) => {
      const res = await authValidation.resetPassword(val);
      return res.isValid ? {} : res.errors;
    },
  });

  if (!token || isLoading) {
    return (
      <Loading
        description={
          isLoading ? "Loading..." : "Invalid url <missing token>..."
        }
      />
    );
  }

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
        <form
          className="auth-form"
          autoComplete="false"
          onSubmit={formik.handleSubmit}
        >
          <div className="form-fields">
            <FormField
              error={{
                msg: formik.errors.password,
                touched: !!formik.touched.password,
              }}
            >
              <FormInput
                required
                name="password"
                type={inputType}
                onChange={(e) => {
                  formik.setFieldTouched("password");
                  formik.handleChange(e);
                }}
                value={formik.values.password}
                className="form-input"
              />
              <small
                style={{
                  float: "right",
                  color: "#dddfff",
                  fontSize: ".7rem",
                  cursor: "pointer",
                  position: "relative",
                  top: "-26px",
                }}
                onClick={toggleInputType}
              >
                {inputType === "password" ? "view" : "hide"}
              </small>
              <FormLabel
                className="form-label"
                htmlFor="password"
                label="Password"
              />
            </FormField>
          </div>

          <div className="form-fields">
            <FormField
              error={{
                msg: formik.errors.cpassword,
                touched: !!formik.touched.cpassword,
              }}
            >
              <FormInput
                required
                name="cpassword"
                type="password"
                onChange={(e) => {
                  formik.setFieldTouched("cpassword");
                  formik.handleChange(e);
                }}
                value={formik.values.cpassword}
                className="form-input"
              />
              <FormLabel
                className="form-label"
                htmlFor="cpassword"
                label="Confirm password"
              />
            </FormField>
          </div>

          <div className="auth-page_content-footer">
            <Button
              type="primary"
              htmlType="submit"
              disabled={formik.isSubmitting}
            >
              Save new password
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
