"use client";
import React, { useState } from "react";
import { FormikValues, useFormik } from "formik";
import { Button } from "antd";
import Link from "next/link";

import authService from "@services/auth";
import Loading from "@components/ui/Loading";
import { useNotification } from "@contexts/notification";
import authValidation from "@validations/auth.validation";
import FormInput from "@components/FormElements/FormInput";
import FormLabel from "@components/FormElements/FormLabel";
import FormField from "@components/FormElements/FormField";

export default function ForgotPassword() {
  const { openNotification } = useNotification();

  const handleSubmit = async (values: FormikValues) => {
    try {
      const res = await authService.forgotPassword(values.email);
      if (res.success) {
        formik.resetForm();
        formik.setSubmitting(false);
        return openNotification("success", "Password Reset", res.data);
      }
    } catch (e: any) {
      return openNotification("error", "Password Reset Error", e.data);
    }
  };

  const formik = useFormik({
    onSubmit: handleSubmit,
    initialValues: { email: "" },
    validate: async (val) => {
      const res = await authValidation.forgotPassword(val);
      return res.isValid ? {} : res.errors;
    },
  });

  return (
    <>
      <div className="auth-page_content-header">
        <h2 className="header-title">Forgot Password?</h2>
        <hr className="titleBar-sm" />
        <p className="header-subtitle">
          No worries, we will send your reset instructions to your email.
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
                msg: formik.errors.email,
                touched: !!formik.touched.email,
              }}
            >
              <FormInput
                required
                name="email"
                value={formik.values.email}
                type="email"
                onChange={(e) => {
                  formik.setFieldTouched("email");
                  formik.handleChange(e);
                }}
                className="form-input"
              />
              <FormLabel className="form-label" htmlFor="email" label="Email" />
            </FormField>
          </div>
          <div className="auth-page_content-footer">
            <Button
              type="primary"
              htmlType="submit"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Loading..." : "Send Reset Link"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
